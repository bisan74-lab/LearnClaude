// Generates _sidebar.md for Docsify by walking content/ and reading each page's H1 title.

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const OUT_FILE = path.join(__dirname, '..', '_sidebar.md');

const FOLDER_LABELS = {
  'completing-projects': '프로젝트 완성',
  'extending-claude': 'Claude 확장',
  'starting-conversations': '대화 시작',
  references: '참고 자료',
  'claude-code-desktop': 'Claude Code Desktop',
  'parallel-work': '병렬 작업',
  'personal-project': '개인 프로젝트',
  'spec-driven-development': '스펙 주도 개발',
  'adding-knowledge': '지식 추가하기',
  'execution-control': '실행 제어',
  'external-connection': '외부 연결',
  'plan-task': '계획 및 작업',
  'context-management': '컨텍스트 관리',
  'getting-started': '시작하기',
  'llm-basics': 'LLM 기초',
  'todo-app': 'Todo 앱',
};

function titleOf(mdPath) {
  const text = fs.readFileSync(mdPath, 'utf8');
  const match = text.match(/^#\s+(.+)$/m);
  const title = match ? match[1].trim() : path.basename(mdPath, '.md');
  return title.replace(/\s*\|\s*제대로 배우기\s*$/, '');
}

function walk(dir, depth) {
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  const dirs = entries.filter((e) => e.isDirectory());
  const files = entries.filter((e) => e.isFile() && e.name.endsWith('.md'));
  let out = '';

  for (const file of files) {
    if (dirs.some((d) => d.name === path.basename(file.name, '.md'))) continue; // section index handled with its folder
    const full = path.join(dir, file.name);
    const rel = path.relative(path.join(__dirname, '..'), full).split(path.sep).join('/');
    out += `${'  '.repeat(depth)}- [${titleOf(full)}](/${rel})\n`;
  }

  for (const d of dirs) {
    const indexFile = path.join(dir, `${d.name}.md`);
    const label = fs.existsSync(indexFile) ? titleOf(indexFile) : (FOLDER_LABELS[d.name] || d.name);
    if (fs.existsSync(indexFile)) {
      const rel = path.relative(path.join(__dirname, '..'), indexFile).split(path.sep).join('/');
      out += `${'  '.repeat(depth)}- [${label}](/${rel})\n`;
    } else {
      out += `${'  '.repeat(depth)}- ${label}\n`;
    }
    out += walk(path.join(dir, d.name), depth + 1);
  }

  return out;
}

const sidebar = walk(CONTENT_DIR, 0);

fs.writeFileSync(OUT_FILE, sidebar, 'utf8');
console.log('Wrote', OUT_FILE);
