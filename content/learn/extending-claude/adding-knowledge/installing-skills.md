# Claude Code Skill 설치하기 | 제대로 배우기

Part 2 · Claude 확장하기Chapter 6 · Rules와 Skills

# 기존 Skill 가져다 쓰기 | Skill 설치하기

기본 번들 Skill과 Plugin·skills.sh로 가져오는 외부 Skill을 다뤄 직접 만들 때와 가져다 쓸 때를 구분하는 법을 익힙니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 8.

## [Overview](#overview)

앞 레슨에서 내 Skill을 직접 만들어 봤지만, shadcn·PDF 처리·브라우저 자동화 같은 범용 기능은 이미 누군가 만들어 둔 것을 가져다 쓰는 편이 빠릅니다. 이번 레슨에서는 Claude Code 기본 번들 Skill을 호출해 보고, Plugin으로는 번들을, skills.sh로는 개별 Skill을 설치합니다. 세 경로를 한자리에서 비교하고, "언제 직접 만들고 언제 가져다 쓰는가"의 판단 기준까지 잡습니다.

### [학습 목표](#학습-목표)

*   설치 없이 쓰는 기본 번들 Skill을 호출해 봅니다.
*   Plugin으로 번들을, skills.sh로 개별 Skill을 설치합니다.
*   직접 만들 때와 가져다 쓸 때를 상황별로 구분합니다.

## [\[미션\] 기본 Skill로 코드 리뷰 돌려보기](#미션-기본-skill로-코드-리뷰-돌려보기)

세 가지 중 첫째는 Claude Code 패키지 안에 이미 들어 있는 번들 Skill입니다. 별도 설치 없이 바로 호출해, "Skill이 어떤 모양인지" 가장 빠르게 체감할 수 있습니다.

`ch06-05` 브랜치가 이 미션의 시작점입니다. 앞 레슨 결과물이 그대로 이어집니다.

```
git fetch origin
git checkout ch06-05
```

명령어

무엇을 하는가

언제 쓰면 좋은가

`/code-review`

현재 변경 사항(diff)을 여러 에이전트가 병렬 분석해 정합성 버그를 리포트

PR을 올리기 전 변경에 숨은 버그를 점검할 때

`/debug`

디버그 로깅을 켜고 세션 로그를 분석

Claude의 동작이 이상해 원인을 보고 싶을 때

### [Step 1: main 기준으로 리뷰 요청하기](#step-1-main-기준으로-리뷰-요청하기)

`/code-review` 는 전체 앱을 막연히 훑는 명령이 아니라 diff를 리뷰합니다. 이번 실습에서는 앞 챕터부터 현재 브랜치까지 쌓인 변경을 보려고, `main` 브랜치와 현재 브랜치의 차이를 기준으로 리뷰를 요청합니다.

```
/code-review main 브랜치와 현재 브랜치의 차이를 리뷰해줘
```

여러 리뷰 에이전트가 각자 다른 각도에서 diff를 살펴본 뒤 정합성 버그를 추려 리포트합니다. Skill을 직접 만들거나 외부에서 가져오지 않아도 바로 쓸 수 있습니다.

## [\[미션\] Plugin으로 document-skills 설치하고 PPT 만들기](#미션-plugin으로-document-skills-설치하고-ppt-만들기)

Plugin은 Claude Code 전용 확장 패키지입니다. Skill 하나가 아니라 여러 확장을 한 묶음으로 배포합니다.

Plugin = 번들

team-toolkit

Anthropic 공식 Plugin

`/plugin`

Skills

`/code-style`

Commands

`/run-eval`

MCP 서버

`team-db`

Hooks

`pre-commit`

하나의 Plugin 에 Skills · Commands · MCP · Hooks 가 함께 번들됩니다 (skills.sh 는 SKILL.md 파일 하나만 설치)

Plugin은 Skill뿐 아니라 Commands·MCP 서버·Hooks까지 하나의 번들로 묶습니다. 예를 들어 `team-toolkit` 같은 Plugin을 쓰면 팀의 Skill·Command·MCP·Hooks 설정을 한 번에 배포할 수 있습니다. Plugin 하나를 설치하면 그 안에 담긴 항목이 함께 따라옵니다.

Claude Code 안에서 `/plugin` 을 입력하면 Plugin 관리 화면이 열립니다. Anthropic 공식 마켓플레이스(`claude-plugins-official`)가 기본으로 등록돼 있고, 공식 외에도 GitHub 저장소로 만든 마켓플레이스를 추가할 수 있습니다.

```
/plugin
```

### [Step 1: document-skills 설치하기](#step-1-document-skills-설치하기)

document-skills는 PowerPoint·Word·Excel·PDF를 만드는 네 Skill을 묶은 Anthropic 공식 번들입니다. 공식 마켓에는 없으니 `anthropics/skills` 마켓을 추가한 뒤 설치합니다.

```
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
```

설치 직후에는 새 플러그인이 현재 세션에 바로 잡히지 않을 수 있습니다. `/reload-plugins` 로 다시 읽어옵니다.

`/plugin` 의 Installed 탭을 열면 pptx·docx·xlsx·pdf가 한꺼번에 들어온 것을 볼 수 있습니다. `document-skills` 를 설치하면 pptx·docx·xlsx·pdf Skill 네 개가 함께 설치됩니다.

### [Step 2: 프로젝트 소개 PPT 만들기](#step-2-프로젝트-소개-ppt-만들기)

자연어로 발표 자료를 요청하면 pptx Skill이 작동합니다.

```
이 프로젝트 소개 발표 자료를 PPT로 만들어줘
```

Claude가 코드와 README를 읽어 슬라이드 구성을 잡고 `.pptx` 파일을 생성합니다. "이 Skill 써줘"라고 따로 지정하지 않아도 요청 내용만으로 알맞은 Skill이 붙습니다.

## [\[미션\] skills.sh로 shadcn Skill 설치하고 UI 다듬기](#미션-skillssh로-shadcn-skill-설치하고-ui-다듬기)

[skills.sh](https://skills.sh)는 Vercel이 운영하는 Skill 디렉토리입니다. Anthropic 공식 Skill부터 커뮤니티 Skill까지 검색하고 설치할 수 있습니다. Plugin이 번들을 통째로 가져온다면, skills.sh는 개별 Skill 단위로 설치합니다.

### [Step 1: shadcn Skill 설치하기](#step-1-shadcn-skill-설치하기)

shadcn/ui 컴포넌트를 Todo 앱에 적용하는 `shadcn` Skill을 설치합니다.

```
bunx skills add https://github.com/shadcn-ui/ui --skill shadcn
```

명령을 실행하면 설치 대상을 고르는 화면이 열립니다. `Universal (.agents/skills)` 항목은 항상 포함되는 공통 위치입니다. 아래 `Additional agents` 영역에서 `Claude Code (.claude/skills)` 를 스페이스바로 체크한 뒤 Enter를 누릅니다.

![Claude Code 에이전트를 선택하는 skills.sh 설치 화면](images/shadcn-skill-agent-select.0yyo1-0fs4ucq.png)

다음 화면에서 설치 범위는 `Project` 를 선택합니다. 현재 프로젝트의 Skill 폴더에 설치되어 이 레슨 실습 안에서만 사용할 수 있습니다.

![Project 설치 범위를 선택하는 skills.sh 설치 화면](images/shadcn-skill-project-scope.0vwnp3zw08tc5.png)

설치 방법은 `Copy to all agents` 를 선택합니다. `Symlink` 는 여러 에이전트가 같은 Skill 본체를 공유할 때 편리해서 추천값으로 표시됩니다. 이번 실습에서는 설치 결과를 프로젝트 안에서 바로 확인하려고 `Copy to all agents` 를 사용합니다.

![Copy to all agents 설치 방법을 선택하는 skills.sh 설치 화면](images/shadcn-skill-copy-method.33ga93xcz3697.png)

설치가 끝나면 Claude Code용 복사본이 `.claude/skills/shadcn/` 에 생기고, `skills-lock.json` 에 설치 출처와 해시가 기록됩니다.

### [Step 2: Todo 입력 영역 다듬기](#step-2-todo-입력-영역-다듬기)

설치 후 Claude에게 자연어로 요청하면 shadcn Skill이 자동으로 켜집니다.

```
shadcn Skill을 참고해서 Todo 입력 영역을 Input, Button, Card 조합으로 다듬어줘.
```

Skill이 로드되면 Claude는 shadcn 컴포넌트의 원칙(디자인 토큰, 컴포지션 규칙)을 따라 제안합니다. 컴포넌트 조합을 요청할 때마다 "이 스타일을 따라줘"라고 말할 필요가 없습니다.

### [Step 3: 커뮤니티 Registry로 컴포넌트 탐색하기](#step-3-커뮤니티-registry로-컴포넌트-탐색하기)

커뮤니티 registry를 추가하면 Claude가 탐색할 수 있는 컴포넌트 풀이 넓어집니다. 공식 컴포넌트만 쓸 때보다 선택지가 늘어납니다.

shadcn의 registry 란?

shadcn/ui는 복사해서 쓰는 UI 컴포넌트 모음입니다. **Registry**는 이 컴포넌트들이 등록된 저장소로, shadcn 공식 외에도 커뮤니티가 만든 registry가 많습니다. 커뮤니티 registry를 쓰려면 `components.json` 에 별도로 등록해야 합니다.

대표적인 커뮤니티 registry인 magicui를 추가해 봅니다.

```
bunx --bun shadcn@latest registry add @magicui
```

별도 선택지 없이 `components.json` 에 `@magicui` 한 줄이 추가됩니다. 다른 registry도 같은 방식으로 추가할 수 있고, 후보는 [shadcn registry 카탈로그](https://ui.shadcn.com/docs/directory)에서 확인합니다.

registry가 등록되면 Claude에게 탐색까지 맡길 수 있습니다.

```
magic ui registry를 탐색해서 이 프로젝트에 맞는 컴포넌트를 찾고 todo title 을 개선해줘
```

### [같은 방식으로 설치할 수 있는 커뮤니티 Skill](#같은-방식으로-설치할-수-있는-커뮤니티-skill)

Skill

하는 일

추천 프롬프트

[`find-skills`](https://www.skills.sh/vercel-labs/skills/find-skills)

필요한 작업에 맞는 Skill 검색·설치 후보 추천

"이 작업에 맞는 Skill 찾아줘"

[`vercel-react-best-practices`](https://www.skills.sh/vercel-labs/agent-skills/vercel-react-best-practices)

Vercel이 관리하는 React/Next.js 모범 사례

"React Best Practice 참고해서 컴포넌트 구조 개선해줘"

[`web-design-guidelines`](https://www.skills.sh/vercel-labs/agent-skills/web-design-guidelines)

타이포그래피·색상·레이아웃 원칙

"웹 디자인 가이드라인 참고해서 랜딩 페이지 만들어줘"

[`defuddle`](https://www.skills.sh/kepano/obsidian-skills/defuddle)

웹 페이지에서 광고·네비게이션 제거하고 본문만 Markdown으로 추출

"이 URL 내용 정리해줘"

## [Plugin vs skills.sh: 5가지 차이](#plugin-vs-skillssh-5가지-차이)

Plugin (`/plugin`)

skills.sh (`bunx skills add`)

**제공 방식**

Claude Code Plugin 마켓플레이스

Vercel의 Skill 디렉토리

**대상 에이전트**

Claude Code 전용

Claude Code·Cursor·Codex 등 다수

**설치 단위**

번들 (Skills + Commands + MCP + Hooks)

개별 Skill

**설치 방식**

Claude Code 안에서 `/plugin`

터미널에서 `bunx skills add`

**업데이트**

`/plugin` 에서 Installed 항목 재설치

`bunx skills add` 재실행

Plugin은 Skill 외 확장(Command·MCP·Hooks)까지 묶을 수 있는 Claude Code 전용 패키지입니다. 팀이 쓰는 Skill·Command·MCP·Hooks를 한 번에 배포하고 싶을 때 적합합니다.

skills.sh는 개별 Skill만 설치합니다. shadcn처럼 특정 프레임워크의 모범 사례를 담은 단일 지침에 적합합니다.

## [직접 만들기 vs 가져다 쓰기](#직접-만들기-vs-가져다-쓰기)

상황

선택

프로젝트 고유의 규칙 (배포 절차, 코드 컨벤션)

직접 만들기

범용 기능 (PDF 처리, 문서 생성, 브라우저 자동화)

가져다 쓰기

팀 내부 워크플로우 (리뷰 절차, 릴리스 체크리스트)

직접 만들기

프로젝트에 특화된 지식은 직접 만들 수밖에 없습니다. **범용 기능은 공식 Plugin이나 skills.sh를 먼저 찾아본 뒤, 없을 때만 직접 만드는 편이 낫습니다.**

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **Skill을 가져다 쓰는 세 가지 방법**: 설치 없이 쓰는 기본 번들, 번들을 묶어 주는 Plugin, 개별 Skill을 설치하는 skills.sh입니다.
2.  **가져다 쓸 때는 범용 / 직접 만들 때는 고유**: 프로젝트 고유 규칙·팀 워크플로우는 직접, 범용 기능은 가져다 씁니다.

## [FAQ](#faq)

### Plugin과 skills.sh 둘 다 같은 Skill을 제공하면요?

### 설치한 Skill이 자동 로드되지 않는데요?

## [이어서 배울 내용](#이어서-배울-내용)

이번 Chapter에서 Claude의 지식을 넓히는 세 가지 방법(Rules · Custom Command · Skill) 을 살펴봤습니다. 지금까지는 Claude가 로컬 파일과 내장 도구 안에서 움직였습니다. 다음 Chapter 에서는 GitHub 이슈, 사내 API, 실행 중인 브라우저 같은 외부 시스템까지 접근 범위를 넓히는 세 가지 경로를 배웁니다.

*   개발자가 이미 쓰던 터미널 도구를 Claude에게 빌려주기 (CLI 연결)
*   표준 프로토콜로 외부 SaaS · 실행 중인 앱 세션에 연결하기 (MCP)
*   공개된 MCP가 없는 내부 시스템에 맞는 MCP 서버 만들기 (Custom MCP)

Skill을 고쳤을 때 실제로 나아졌는지 객관적으로 확인하고 싶다면 [참고 자료 · Skill 개선과 Eval](/learn/references/skill-improvement-eval) 페이지를 참고합니다.

피드백 남기기

[

반복 프롬프트를 자동 호출로 | Skill 만들기

commit Command를 수동으로 Skill로 옮겨 보고, 작성 중에 부딪힌 막막함을 Skill Creator로 풀어보는 흐름을 체험합니다

](/learn/extending-claude/adding-knowledge/creating-skills)[

Claude에게 터미널 도구 빌려주기 | CLI 연결

gh CLI를 Claude에게 연결해 실시간 GitHub 데이터를 가져오는 방법과 CLI가 AI와 잘 맞는 구조적 이유를 이해합니다

](/learn/extending-claude/external-connection/cli-connection)

---
Source: https://docs.claude-hunt.com/learn/extending-claude/adding-knowledge/installing-skills
