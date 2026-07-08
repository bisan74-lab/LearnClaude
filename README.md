# LearnClaude

`https://docs.claude-hunt.com/learn` 강의 자료를 로컬에 백업한 프로젝트입니다.

- **콘텐츠**: `content/` — 사이트 URL 구조를 그대로 따르는 Markdown 파일 54개
- **이미지**: `images/` — 본문에 포함된 이미지 62개 (Markdown에서 상대경로로 참조)
- **스크립트**: `scripts/download.js` — 다운로드/재다운로드용 스크립트

## 다시 받고 싶을 때 (사이트 내용이 갱신된 경우)

```bash
node scripts/download.js
```

`sitemap.xml`을 매번 새로 읽어오기 때문에 사이트에 페이지가 추가/변경돼도 그대로 반영됩니다.
개별 페이지 다운로드가 실패해도 나머지는 계속 진행되며, 실패 목록은 `download-failures.json`에 남습니다
(이미 받아둔 파일은 실패 시 덮어쓰지 않으므로 이전 내용이 유지됩니다).

## 시작 페이지

`content/learn.md` 부터 읽으면 됩니다.

---
다운로드 일시: 2026-07-09
