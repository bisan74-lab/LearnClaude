# Claude Code CLI·MCP | 제대로 배우기

Part 2 · Claude 확장하기Chapter 7 · 외부 연결

# 도구는 가능성, Skill은 일관성 | CLI·MCP

CLI와 MCP는 외부 시스템에 닿는 가능성을, Skill은 매번 같은 방식으로 쓰는 일관성을 담당합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

[CLI 연결](/learn/extending-claude/external-connection/cli-connection)·[MCP 연결](/learn/extending-claude/external-connection/mcp-connection)·[Custom MCP](/learn/extending-claude/external-connection/building-mcp-server) 세 레슨을 거치며 Claude를 외부 시스템과 연결하는 세 가지 방법을 익혔습니다. gh CLI, Claude in Chrome, 직접 만든 날씨 MCP입니다. Claude는 이제 이슈를 조회하고, 내 Chrome 세션을 관찰하고, 사내 API를 호출할 수 있습니다. 접근 경로는 생겼지만, 어떤 순서와 기준으로 쓸지는 아직 정해지지 않았습니다.

그런데 같은 작업을 시킬 때마다 결과가 다릅니다. "이 PR 리뷰해줘", "이 페이지 어디가 이상해" 라고만 시키면 어떤 날은 세세한 문제까지 짚고, 어떤 날은 큰 문제만 훑고, 포맷도 들쭉날쭉합니다. 접근할 수 있는 것과 매번 같은 방식으로 쓰는 것은 다른 문제입니다.

외부 도구(CLI · MCP)에 Skill을 결합해 반복 워크플로우를 일관되게 만드는 원리와 두 가지 사례를 다룹니다.

### [학습 목표](#학습-목표)

*   도구 (Capability) 와 Skill (Procedure) 의 역할 차이를 구분합니다
*   외부 도구 + Skill 결합이 어떻게 일관성을 만드는지 이해합니다
*   CLI+Skill, MCP+Skill 각각의 실전 구성을 설계할 수 있습니다

## [도구와 Skill의 역할 나누기](#도구와-skill의-역할-나누기)

*   gh CLI
    
    GitHub 접근
    
*   Claude in Chrome
    
    내 Chrome 세션
    
*   Weather MCP
    
    내 API 감싸기
    

+

*   code-review Skill
    
    검사 항목 · 심각도
    
*   ui-bug-report Skill
    
    리포트 템플릿
    
*   기타 워크플로우 Skill
    
    팀 기준 · 형식
    

도구가 접근을 제공하고 Skill 이 매번 같은 절차를 정의합니다 — 둘이 합쳐져야 반복 워크플로우가 일관됩니다

망가진 캐비닛을 고치러 철물점에 갔다고 해봅니다. 작업대 위에는 접착제·클램프·경첩·전동 드릴이 전부 준비돼 있습니다. 도구가 어디서 왔는지는 중요하지 않습니다. 매대에서 새로 사 온 것이든, 집에서 가져온 것이든 작업대 위에 올라오는 순간 그냥 도구입니다.

그런데 도구가 아무리 많아도, 어떤 순서로 써야 하는지 모르면 캐비닛은 고쳐지지 않습니다. 옆에 있는 숙련된 직원이 순서를 안내해야 비로소 작업이 시작됩니다.

이것이 이 레슨의 핵심 구분입니다.

*   **도구 (Capability Layer)**: CLI와 MCP. "Claude가 무엇에 접근할 수 있는가"를 결정합니다. gh CLI가 있으면 GitHub에 닿고, Claude in Chrome이 있으면 내 실제 Chrome 세션에 닿습니다.
*   **절차 (Procedure Layer)**: Skill. "그 도구를 어떤 순서로 · 어떤 기준으로 · 어떤 형식으로 쓸지"를 정의합니다.

도구 없이는 일을 시작할 수 없고, 절차 없이는 매번 결과가 달라집니다.

## [CLI + Skill로 코드 리뷰 일관되게 만들기](#cli--skill로-코드-리뷰-일관되게-만들기)

Skill탐색기준·체크리스트 로드Tool접근데이터·상태 수집Skill조율분석·구조화·포맷Tool실행리뷰 등록·리포트 제출Skill 과 Tool 이 번갈아가며 작동 — 매번 같은 흐름, 같은 형식의 결과

코드 리뷰든 버그 리포트든 결합 패턴은 동일합니다 — 도구가 접근, Skill 이 절차

`gh` CLI로 PR diff를 가져오려면 명령 한 줄이면 됩니다. 그런데 "이 PR 리뷰해줘" 라고만 하면 매번 리뷰 범위 · 형식 · 심각도 기준이 달라집니다. 여기에 **pr-review Skill** 을 붙이면 달라집니다.

### [역할 분담](#역할-분담)

*   **gh CLI (Capability)**: PR diff 조회, 파일 목록 확인, 리뷰 코멘트 등록
*   **pr-review Skill (Procedure)**: 검사 항목(네이밍 · 에러 처리 · 테스트 커버리지), 리뷰 형식, 심각도 기준 정의

### [돌아가는 순서](#돌아가는-순서)

1.  탐색 (Skill): 리뷰 대상 PR을 확인하고 팀 검사 항목을 불러옵니다.
2.  접근 (CLI): `gh pr diff` 로 변경 사항을 가져옵니다.
3.  조율 (Skill): 팀 컨벤션 기준으로 코드를 분석하고 피드백을 정리합니다.
4.  실행 (CLI): `gh pr review` 로 구조화된 리뷰 코멘트를 등록합니다.

Skill 없이 CLI만 있으면 diff는 볼 수 있지만 리뷰 기준이 매번 달라집니다. CLI 없이 Skill만 있으면 기준은 완벽해도 PR 데이터에 닿지 못합니다. CLI + Skill 결합이 있어야 "같은 기준으로 매번 같은 형식의 리뷰" 가 나옵니다.

## [MCP + Skill로 버그 리포트 형식 통일하기](#mcp--skill로-버그-리포트-형식-통일하기)

두 번째 사례에서는 MCP를 씁니다. Claude in Chrome으로 내 Chrome 세션을 볼 수 있지만, "이 페이지 이상해" 라고만 하면 Claude는 감으로 몇 가지를 확인할 뿐입니다. **ui-bug-report Skill** 을 붙이면 매번 같은 형식의 리포트가 나옵니다.

### [역할 분담](#역할-분담-1)

*   **Claude in Chrome (Capability)**: 현재 탭의 콘솔 · 네트워크 · DOM · 스크린샷 수집
*   **ui-bug-report Skill (Procedure)**: 심각도 분류 기준, 리포트 템플릿, 재현 스텝 형식 정의

### [돌아가는 순서](#돌아가는-순서-1)

1.  접근 (MCP): 현재 탭에서 `read_console` · 네트워크 요청 로그로 에러 · 실패 요청을 수집합니다.
2.  조율 (Skill): critical / major / minor 기준으로 분류합니다.
3.  조율 (Skill): 재현 스텝 · 환경 정보 · 영향 범위를 팀 버그 리포트 템플릿에 채웁니다.
4.  접근 (MCP): `screenshot` 으로 현재 탭을 찍어 리포트에 첨부합니다.

패턴이 같습니다. **CLI든 MCP든 도구가 접근을 제공하고 Skill이 절차를 정의합니다.** 도구를 바꿔도 Skill이 유지되고, Skill을 개선해도 도구 연결은 그대로입니다.

## [\[미션\] ui-bug-report로 버그 리포트 만들기](#미션-ui-bug-report로-버그-리포트-만들기)

MCP + Skill 결합을 직접 만들어 봅니다.

`ch07-04` 브랜치가 이 미션의 시작점입니다.

```
git fetch origin
git checkout ch07-04
```

### [Step 1: ui-bug-report Skill 작성](#step-1-ui-bug-report-skill-작성)

프로젝트 루트에 `.claude/skills/ui-bug-report/SKILL.md` 파일을 생성하고 아래 내용을 넣습니다.

```
---
name: ui-bug-report
description: 열린 Chrome 탭의 콘솔 · 네트워크 · DOM 상태를 수집해 팀 버그 리포트 템플릿으로 정리한다. "버그 리포트 만들어줘", "이 페이지 이상한 것 좀 정리해줘" 같은 요청에 호출.
---

# UI Bug Report Skill

열려 있는 Chrome 탭을 조사해 아래 템플릿에 맞춰 버그 리포트를 작성한다.

## 심각도 분류

- **critical** — 페이지 동작 불가, 5xx 에러
- **major** — 일부 기능 실패, 4xx 에러, 주요 UI 깨짐
- **minor** — 콘솔 경고, 사소한 이슈

## 리포트 템플릿

- **URL**: 대상 페이지
- **심각도**: critical | major | minor
- **증상**: 한 줄 요약
- **콘솔 에러**: 원문
- **네트워크 실패**: URL · 상태 코드
- **재현 스텝**: 1) ... 2) ...
- **환경**: 브라우저 / OS / 뷰포트
- **스크린샷**: 첨부
```

### [Step 2: Todo 앱 개발 서버 실행](#step-2-todo-앱-개발-서버-실행)

[Chapter 04 의 Todo 앱](/learn/starting-conversations/todo-app/todo-implementation) 디렉토리에서 개발 서버를 띄웁니다.

```
bun run dev
```

서버가 `http://localhost:3000` 에서 응답하는지 확인합니다.

### [Step 3: 페이지 열고 Skill 호출](#step-3-페이지-열고-skill-호출)

Chrome으로 `http://localhost:3000` 을 엽니다. Claude in Chrome이 활성화된 상태에서 Claude Code를 켜고 요청합니다.

```
서버를 실행하고, 해당 앱에 대해서 버그 리포트 만들어줘
```

Claude in Chrome 활성화 방법

세 가지 중 하나를 고르면 됩니다.

*   세션 시작 시 `claude --chrome` 플래그로 켜기
*   일반 `claude` 로 시작한 뒤 `/chrome` 슬래시 커맨드로 켜기
*   `/chrome` 에서 "Enabled by default" 를 선택해 매번 자동 활성화

Claude는 `ui-bug-report` 의 `description` 을 보고 Skill을 자동으로 불러와, Claude in Chrome의 Tool을 호출하고 정의된 템플릿 그대로 리포트를 출력합니다.

Skill 없이도 되는 순간

"이 URL 스크래핑해줘"·"이 이슈 목록 가져와" 처럼 한 번의 호출로 끝나는 작업은 CLI나 MCP 단독으로 충분합니다. Skill이 필요한 건 여러 단계로 이뤄지고 매번 같은 기준으로 결과를 내야 하는 반복 워크플로우입니다. 이슈 분류처럼 팀 규칙을 담는 작업, 코드 리뷰처럼 형식이 고정되어야 하는 작업이 대표적입니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **도구는 가능성, Skill은 일관성**: CLI · MCP는 Claude가 닿을 수 있는 범위를 넓히고, Skill은 그 도구를 매번 같은 방식으로 씁니다. 하나만 있으면 절반만 해결됩니다.
2.  **CLI든 MCP든 패턴은 동일**: 도구로 접근하고 Skill로 절차를 정의합니다. 코드 리뷰든 버그 리포트든, 실전 워크플로우는 전부 이 결합으로 설계됩니다.
3.  **관심사 분리가 유연성을 만든다**: 도구를 바꿔도 Skill이 유지되고, Skill을 개선해도 도구 연결은 그대로입니다. 예를 들어 리뷰 Skill의 CLI 부분만 MCP로 바꾸어도 Skill의 리뷰 기준은 그대로 작동합니다.

## [FAQ](#faq)

### MCP 서버에도 사용 지침이 포함돼 있다고 들었습니다. 그럼 Skill이 필요 없지 않나요?

### 하나의 Skill이 여러 외부 도구를 쓸 수 있나요?

### 외부 도구만 연결한 상태에서도 잘 되는 것 같은데요?

## [이어서 배울 내용](#이어서-배울-내용)

이번 Chapter에서 Claude의 접근 범위를 외부로 넓히는 세 가지 경로(CLI · MCP · Custom MCP)와 Skill 결합으로 일관된 워크플로우를 만드는 법을 배웠습니다. 하지만 Skill도 결국 Claude가 필요하다고 판단해야 실행됩니다. 다음 Chapter에서는 특정 시점에 반드시 실행되는 Hook과, 메인 대화와 분리해 작업을 맡기는 Custom Agent를 다룹니다.

*   특정 시점에 자동으로 실행되는 검증·포맷팅 규칙 걸기 (Hooks)
*   메인 대화와 분리된 컨텍스트로 작업을 위임하기 (Custom Agent)

피드백 남기기

[

내 시스템을 Claude에 연결하기 | Custom MCP 서버 만들기

MCP Builder Skill로 날씨 API를 감싸는 MCP 서버를 직접 만들고, Tool 정의의 핵심 구조를 이해합니다

](/learn/extending-claude/external-connection/building-mcp-server)[

권고가 아니라 강제 | Hooks

CLAUDE.md 지침을 AI가 건너뛰는 상황에서 Hook으로 강제 실행하는 원리를 이해하고, PostToolUse Hook으로 ESLint를 자동화합니다

](/learn/extending-claude/execution-control/hooks)

---
Source: https://docs.claude-hunt.com/learn/extending-claude/external-connection/tools-and-skills
