# Claude Code Rules | 제대로 배우기

Part 2 · Claude 확장하기Chapter 6 · Rules와 Skills

# 필요한 곳에서만 켜지는 규칙 | Rules

매뉴얼이 두꺼워질 때 규칙을 주제별 파일로 나누고, paths로 필요한 경로에서만 읽히는 구조를 익힙니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

[CLAUDE.md](/learn/starting-conversations/context-management/claude-md#claude-md)에 적힌 규칙이 쌓이면, 매 대화마다 컴포넌트·테스트·백엔드 규칙이 한꺼번에 로드됩니다. 작업과 무관한 규칙도 같은 Context Window를 차지하면, 지금 필요한 규칙의 신호가 약해집니다. [Context Rot](/learn/starting-conversations/context-management/context-window#context-rot)이 매번 반복되는 구조입니다.

규칙을 주제별 파일로 나누고, 작업 경로에 맞는 규칙만 읽히도록 하는 `.claude/rules/` 사용법을 익힙니다.

### [학습 목표](#학습-목표)

*   `CLAUDE.md`와 `.claude/rules/` 의 차이를 설명할 수 있습니다
*   `paths` frontmatter와 glob 패턴으로 규칙의 적용 범위를 지정할 수 있습니다
*   어떤 내용을 `CLAUDE.md`에 두고 어떤 내용을 Rules로 옮길지 판단할 수 있습니다

## [매뉴얼이 두꺼워질수록 약해지는 규칙들](#매뉴얼이-두꺼워질수록-약해지는-규칙들)

`CLAUDE.md`에 `"NEVER .env 파일 커밋"` 같은 핵심 제약사항을 적어두는 법을 다뤘습니다. 규칙이 다섯 줄일 때는 문제가 없습니다. 하지만 기능이 늘어나면 규칙도 같이 쌓입니다.

```
## Rules
- **NEVER** .env 파일 커밋
- 컴포넌트는 components/ 아래에만 생성
- Shadcn UI 컴포넌트를 우선 사용
- 테스트에서 실제 API 호출 금지, mock 사용
- API 응답은 표준 에러 형식 사용
- 데이터베이스 쿼리는 ORM 만 사용
- Plan Mode 에서 계획은 간결하게 작성
- ...
```

API 파일 하나를 수정하는 동안 "Shadcn UI 컴포넌트 우선 사용" 규칙도 같이 로드됩니다. 테스트 코드를 작성할 때 "API 응답 표준 에러 형식" 규칙도 함께 들어옵니다. Context Rot이 매 대화마다 나타납니다.

핵심 문제는 단순합니다. **`CLAUDE.md`의 규칙은 작업 경로와 무관하게 항상 전부 로드됩니다.** 매뉴얼 두께를 줄이거나, 규칙이 적용되는 조건을 따로 둬야 합니다.

## [Rules: 매뉴얼을 주제별 파일로 쪼개기](#rules-매뉴얼을-주제별-파일로-쪼개기)

해답은 매뉴얼을 더 잘 쓰는 것이 아니라 매뉴얼을 쪼개는 것입니다. 두꺼운 매뉴얼 하나 대신, 주제별로 얇은 책자를 두고 필요할 때만 펼치는 방식입니다.

`.claude/rules/` 폴더 안에 마크다운 파일을 만들면, 각 파일이 독립된 규칙 묶음 역할을 합니다.

.claude

rules

writing.md

testing.md

frontend.md

파일 하나가 한 주제를 책임집니다. `writing.md`는 문서 작성, `testing.md`는 테스트, `frontend.md`는 화면 카피와 컴포넌트 규칙을 맡습니다. 파일명만 봐도 무슨 규칙인지 드러납니다.

## [paths: 규칙이 켜지는 경로를 지정하기](#paths-규칙이-켜지는-경로를-지정하기)

쪼개는 것만으로는 부족합니다. 파일 하나를 수정하는 데 모든 Rules 파일이 같이 로드되면, 매뉴얼이 두꺼워진 결과와 같습니다. 쪼갠 다음 필요한 것만 고르는 장치가 필요합니다. 그 역할을 `paths` frontmatter가 합니다.

규칙 파일 상단에 `paths` 를 적으면, Claude가 해당 경로의 파일을 읽거나 작업할 때 그 규칙이 Context에 들어갑니다.

```
---
paths:
  - "components/ui/**"
---

# Shadcn UI

- Shadcn UI 컴포넌트(`components/ui/`)는 직접 수정하지 않는다
- 스타일이나 동작을 변경하려면 래퍼 컴포넌트를 만들어 사용한다
```

Claude가 `components/ui/` 아래 파일을 읽거나 작업할 때 이 규칙이 로드됩니다. `lib/` 나 API 라우트만 보는 작업에서는 Shadcn UI 규칙을 따로 불러오지 않습니다.

`paths` 는 glob 패턴을 따릅니다.

패턴

매칭 대상

`**/*.ts`

모든 디렉터리의 TypeScript 파일

`content/docs/**`

content/docs/ 아래 모든 파일

`**/*.test.ts`

모든 테스트 파일

`**/*.{ts,tsx}`

.ts와 .tsx 파일 모두

`paths` 가 빠진 규칙 파일은 세션 시작 시 전역으로 로드됩니다. `CLAUDE.md`처럼 경로와 무관하게 항상 필요한 규칙만 paths 없이 둡니다.

## [CLAUDE.md vs Rules 구분하기](#claudemd-vs-rules-구분하기)

둘은 강제 수준이 아니라 범위 관리 방식이 다릅니다. 둘 다 Claude가 읽고 따르려는 Context이며, 실행을 강제로 막는 장치는 아닙니다.

CLAUDE.md

`.claude/rules/`

**역할**

모든 세션에 필요한 프로젝트 기준

주제별·경로별 세부 지침

**로드 시점**

세션 시작 시 전체

paths 없으면 세션 시작 시, paths가 있으면 매칭 파일을 읽을 때

**적합한 내용**

프로젝트 목적, 아키텍처 결정, 협업 방식

문서 작성 규칙, 테스트 규칙, API 작성 규칙

판단 기준은 두 질문입니다. 새 세션 첫 순간부터 알아야 하면 `CLAUDE.md`에 둡니다. 특정 파일 유형이나 작업 영역에서만 필요하면 Rules로 나눕니다. "커밋 전 테스트가 반드시 실행되어야 한다"처럼 Claude의 판단과 무관하게 실행되어야 하는 일은 Rules가 아니라 Hook이나 설정으로 강제합니다.

## [\[미션\] CLAUDE.md의 한 규칙을 Rules로 옮기기](#미션-claudemd의-한-규칙을-rules로-옮기기)

`CLAUDE.md`에 있는 Shadcn UI 규칙을 `.claude/rules/` 로 분리하고, paths가 실제로 켜지고 꺼지는지 같은 세션에서 확인합니다.

`ch06-01` 브랜치가 이 미션의 시작점입니다. `CLAUDE.md`에 여러 규칙이 한꺼번에 쌓여 있는 상태입니다.

```
git fetch origin
git checkout ch06-01
```

### [Step 1: rules 폴더 생성](#step-1-rules-폴더-생성)

프로젝트 루트에 `.claude/rules/` 폴더를 만듭니다. `.claude/` 가 이미 있다면 `rules/` 만 추가합니다.

```
mkdir -p .claude/rules
```

### [Step 2: Shadcn UI 규칙 파일 작성](#step-2-shadcn-ui-규칙-파일-작성)

`.claude/rules/shadcn.md` 를 다음과 같이 작성합니다.

```
---
paths:
  - "components/ui/**"
---

# Shadcn UI

- Shadcn UI 컴포넌트(`components/ui/`) 는 직접 수정하지 않는다
- 스타일이나 동작을 변경하려면 래퍼 컴포넌트를 만들어 사용한다
```

`paths` 가 `components/ui/**` 이므로, 이 규칙은 `components/ui/` 아래 파일을 만지는 동안에만 활성화됩니다.

### [Step 3: 두 경로에서 적용 여부 확인](#step-3-두-경로에서-적용-여부-확인)

같은 세션에서 두 가지 작업을 순서대로 요청합니다.

먼저 `components/ui/` 안의 파일을 수정합니다.

```
components/ui/button.tsx 의 padding 을 수정해줘
```

Claude가 "원본을 직접 수정하지 말고 래퍼를 만들자" 같은 제안을 하면, Shadcn 규칙이 켜진 것입니다.

이어서 같은 세션에서 다른 경로도 요청합니다.

```
lib/todo-store.ts 에 정렬 함수를 추가해줘
```

이번에는 Shadcn 관련 언급 없이 곧장 수정합니다. 같은 세션, 같은 프로젝트인데도 작업 파일의 경로만 달라지면 적용되는 규칙이 달라집니다. 이것이 paths의 핵심 동작입니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **Rules = 주제별 매뉴얼**: CLAUDE.md 한 곳에 다 적는 대신 `.claude/rules/` 에 주제별 파일을 두면, 파일명이 곧 그 규칙 묶음의 이름표가 됩니다.
2.  **paths = 경로별 로드 조건**: `paths` frontmatter가 있으면 Claude가 매칭 파일을 읽을 때 Context에 들어가고, 없으면 전역으로 로드됩니다.
3.  **CLAUDE.md = 항상 필요한 기준, Rules = 범위를 좁힌 세부 지침**: 모든 세션에 필요한 프로젝트 기준은 CLAUDE.md에, 특정 파일 유형에서만 필요한 규칙은 Rules에 둡니다.

## [FAQ](#faq)

### CLAUDE.md와 .claude/rules/ 에 같은 내용이 있으면요?

### 규칙 파일을 몇 개까지 만들 수 있나요?

### 한 파일에 여러 paths 규칙이 매칭되면요?

### Rules에 쓰면 반드시 지켜지나요?

## [이어서 배울 내용](#이어서-배울-내용)

Rules로 규칙을 주제별·경로별로 나눌 수 있습니다. 그런데 규칙 외에도 반복되는 게 있습니다. 코드 리뷰를 요청할 때마다 같은 형식의 프롬프트를 매번 타이핑하고, 커밋할 때마다 같은 안내를 반복 입력하고 있다면, 그 시간이 낭비됩니다. 다음 레슨에서는 반복 프롬프트를 한 단어로 호출하는 **Custom Commands**를 배웁니다.

*   마크다운 파일 한 개로 슬래시 명령어 만들기
*   `$ARGUMENTS` 와 frontmatter로 재사용 가능한 프롬프트 설계하기

피드백 남기기

[

잊혀지지 않는 계획 단위 | Task 시스템

긴 작업에서 Claude가 Task List로 진행 상태를 남기고, 수강생은 현재 위치를 확인합니다

](/learn/extending-claude/plan-task/task-basics)[

반복 프롬프트를 한 단어로 | Custom Commands

자주 쓰는 프롬프트를 마크다운 파일로 저장해 슬래시 한 단어로 호출하고, $ARGUMENTS와 frontmatter로 동적 명령을 만듭니다

](/learn/extending-claude/adding-knowledge/custom-commands)

---
Source: https://docs.claude-hunt.com/learn/extending-claude/adding-knowledge/rules
