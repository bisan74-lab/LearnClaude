// Downloads all pages under docs.claude-hunt.com/learn as local Markdown + images.
// Re-run any time to refresh content (re-fetches sitemap, so new pages are picked up automatically).

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const BASE = 'https://docs.claude-hunt.com';
const SITEMAP_URL = `${BASE}/sitemap.xml`;
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const IMAGES_DIR = path.join(__dirname, '..', 'images');
const DELAY_MS = 300;

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function getLearnUrls() {
  const xml = await fetchText(SITEMAP_URL);
  const $ = cheerio.load(xml, { xmlMode: true });
  const urls = [];
  $('loc').each((_, el) => {
    const url = $(el).text().trim();
    if (url.includes('/learn')) urls.push(url);
  });
  return [...new Set(urls)];
}

function urlToFilePath(url) {
  const u = new URL(url);
  let p = u.pathname.replace(/\/$/, '');
  if (p === '') p = '/index';
  return path.join(CONTENT_DIR, `${p}.md`);
}

const CONTENT_TYPE_EXT = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
  'image/avif': '.avif',
};

// Next.js serves optimized images via /_next/image?url=<encoded-original-path>&...
// Recover the original filename (with a real extension) from that query param when present.
function realFilenameFromUrl(imgUrl) {
  const u = new URL(imgUrl);
  const innerUrl = u.searchParams.get('url');
  if (innerUrl) {
    try {
      return path.basename(decodeURIComponent(innerUrl));
    } catch {
      // fall through
    }
  }
  return path.basename(u.pathname);
}

async function downloadImage(imgUrl) {
  try {
    const res = await fetch(imgUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    let filename = realFilenameFromUrl(imgUrl);
    if (!filename || !path.extname(filename)) {
      const contentType = res.headers.get('content-type') || '';
      const ext = CONTENT_TYPE_EXT[contentType.split(';')[0].trim()] || '.bin';
      filename = `${filename || `${Date.now()}-${Math.random().toString(36).slice(2)}`}${ext}`;
    }
    let dest = path.join(IMAGES_DIR, filename);
    let counter = 1;
    while (fs.existsSync(dest) && !fs.readFileSync(dest).equals(buffer)) {
      const ext = path.extname(filename);
      const base = path.basename(filename, ext);
      dest = path.join(IMAGES_DIR, `${base}-${counter}${ext}`);
      counter++;
    }
    if (!fs.existsSync(dest)) fs.writeFileSync(dest, buffer);
    return path.basename(dest);
  } catch (err) {
    console.error(`  ! image failed: ${imgUrl} (${err.message})`);
    return null;
  }
}

async function processPage(url) {
  const html = await fetchText(url);
  const $ = cheerio.load(html);

  const main =
    $('main').first().length ? $('main').first() :
    $('article').first().length ? $('article').first() :
    $('body');

  main.find('nav, aside, header, footer, script, style').remove();

  // Docsify serves everything through the single index.html shell (hash routing),
  // so relative asset paths always resolve against the shell's location, not the
  // fetched markdown file's virtual path. A plain "images/x.png" (sibling of
  // index.html) works from every page; a computed "../../images/x.png" does not.
  const imagePrefix = 'images/';
  const imgs = main.find('img').toArray();
  for (const img of imgs) {
    const src = $(img).attr('src');
    if (!src) continue;
    const absSrc = new URL(src, url).href;
    const localName = await downloadImage(absSrc);
    if (localName) {
      $(img).attr('src', `${imagePrefix}${localName}`);
    }
    await sleep(DELAY_MS);
  }

  const title = $('title').first().text().trim();
  let markdown = turndown.turndown(main.html() || '');
  if (title) markdown = `# ${title}\n\n${markdown}`;
  markdown += `\n\n---\nSource: ${url}\n`;

  const filePath = urlToFilePath(url);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, markdown, 'utf8');
  return filePath;
}

async function main() {
  console.log('Fetching sitemap...');
  const urls = await getLearnUrls();
  console.log(`Found ${urls.length} pages under /learn`);

  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const failures = [];
  let done = 0;
  for (const url of urls) {
    try {
      const filePath = await processPage(url);
      done++;
      console.log(`[${done}/${urls.length}] OK  ${url} -> ${path.relative(process.cwd(), filePath)}`);
    } catch (err) {
      failures.push({ url, error: err.message });
      console.error(`[${done + 1}/${urls.length}] FAIL ${url} (${err.message})`);
    }
    await sleep(DELAY_MS);
  }

  console.log(`\nDone. ${done}/${urls.length} pages saved.`);
  if (failures.length) {
    console.log(`${failures.length} failures:`);
    failures.forEach((f) => console.log(`  - ${f.url}: ${f.error}`));
    fs.writeFileSync(
      path.join(__dirname, '..', 'download-failures.json'),
      JSON.stringify(failures, null, 2)
    );
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
