# Claude Code Hooks | 제대로 배우기

Part 2 · Claude 확장하기Chapter 8 · 실행 제어

# 권고가 아니라 강제 | Hooks

CLAUDE.md 지침을 AI가 건너뛰는 상황에서 Hook으로 강제 실행하는 원리를 이해하고, PostToolUse Hook으로 ESLint를 자동화합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

[Skill](/learn/extending-claude/adding-knowledge/skills)과 [MCP](/learn/extending-claude/external-connection/mcp-connection)로 AI에게 도구를 주는 방법을 배웠습니다. AI가 필요하다고 판단할 때만 실행됩니다. 그런데 AI가 그 판단을 빠뜨리면 어떻게 될까요?

CLAUDE.md에 "파일 수정 후 ESLint를 실행하라"고 써두어도, 컨텍스트가 길어지거나 급한 수정이 이어지면 AI가 생략합니다. 이번 레슨에서는 AI의 판단과 무관하게 특정 시점에 **항상 실행되는 장치**인 Hook을 배웁니다.

### [학습 목표](#학습-목표)

*   CLAUDE.md 지침(권고)과 Hook(강제)의 차이를 구별합니다
*   Hook의 세 요소(Event, Matcher, Handler)를 이해합니다
*   PostToolUse Hook을 직접 작성해 파일 수정 후 검증을 자동화합니다
*   Hook이 적합한 상황과 오히려 방해가 되는 상황을 판단합니다

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   Claude Code 설치 완료 (`claude --version`)
*   프로젝트에 `.claude/` 폴더 존재

## [CLAUDE.md 지침의 한계](#claudemd-지침의-한계)

CLAUDE.md에 이런 규칙을 써두었다고 합시다.

> "TypeScript 파일을 수정한 뒤에는 반드시 `bunx eslint --fix`를 실행하세요."

Lint(린트)란?

코드의 문법 오류, 스타일 위반, 잠재적 버그를 자동으로 찾아주는 도구입니다. 맞춤법 검사기가 글의 오타를 찾듯, Lint는 코드의 문제를 찾습니다. ESLint는 JavaScript/TypeScript용 Lint 도구입니다.

처음 몇 번은 잘 따라옵니다. AI가 `Edit` 도구로 파일을 고친 다음 `Bash` 도구로 ESLint를 돌립니다.

그런데 한 세션에서 파일을 10개 넘게 연속으로 고치다 보면, AI가 ESLint 실행을 한두 번씩 빼먹기 시작합니다. 컨텍스트가 길어지면서 "이번엔 괜찮겠지"라는 판단이 끼어들거나, 다른 맥락에 집중하다 빠뜨립니다.

CLAUDE.md 지침은 AI가 읽고 판단하는 "부탁"입니다. AI가 따를지 말지를 스스로 결정합니다. 개발자가 매번 "lint 돌렸어?"라고 챙기지 않으면, lint가 빠진 커밋이 어느새 쌓여 갑니다.

## [Hook: AI 판단을 거치지 않는 자동 실행 장치](#hook-ai-판단을-거치지-않는-자동-실행-장치)

파일 수정 (Edit)

AI 가 지침을 읽음

따름

건너뜀

실행 여부가 AI 판단에 달려 있습니다

파일 수정 (Edit)

Claude Code 런타임이 가로챔

스크립트 강제 실행

판단 없이 매번 실행됩니다

지침은 AI가 건너뛸 수 있지만, Hook은 런타임이 무조건 실행합니다

**Hook(훅)**은 AI가 도구를 쓰거나 작업을 마칠 때, 지정된 스크립트를 Claude Code가 자동으로 실행하는 장치입니다. AI의 판단이 끼어들지 않습니다. `Edit` 도구가 호출되면 스크립트가 무조건 실행됩니다.

CLAUDE.md가 "잊지 말아줘"에 가깝다면, Hook은 "이 순간엔 무조건 실행해"에 가깝습니다.

CLAUDE.md 지침

Hook

실행 주체

AI가 읽고 판단

Claude Code 런타임이 실행

실행 보장

AI가 건너뛸 수 있음

매번 100% 실행

실패 시 반응

개발자가 직접 발견해야 함

스크립트가 에러를 Claude에게 피드백

## [Hook의 3 요소](#hook의-3-요소)

Hook은 세 가지 질문에 답하는 설정입니다. 언제 실행할지(Event), 어떤 조건에서 실행할지(Matcher), 뭘 실행할지(Handler)입니다.

① Event언제 발동?예시PostToolUseStopPreToolUse② Matcher어떤 조건?예시"Write|Edit""Bash"(생략 = 모두)③ Handler무엇을 실행?예시commandprompthttp · mcp\_tool

Hook 은 세 요소의 조합으로 정의됩니다

settings.json으로 보면 세 요소가 어디에 들어가는지 명확합니다.

```
{
  "hooks": {
    "PostToolUse": [                     // ① Event: 도구 실행 직후
      {
        "matcher": "Write|Edit|MultiEdit", // ② Matcher: Write·Edit·MultiEdit 도구일 때
        "hooks": [
          {
            "type": "command",             // ③ Handler 타입
            "command": "lint.sh"           // ③ 실행할 명령
          }
        ]
      }
    ]
  }
}
```

### [Event: 언제 발동할지](#event-언제-발동할지)

Claude Code는 여러 시점에 Hook을 걸 수 있습니다. 이번 레슨에서는 **PostToolUse**로 실습합니다.

Event

시점

대표 용도

`PreToolUse`

도구 실행 **직전**

위험한 명령 차단

`PostToolUse`

도구 실행 **직후**

수정 결과 검증

`Stop`

AI가 응답을 마치려 할 때

작업 완료 여부 최종 점검

`UserPromptSubmit`

사용자 입력 직후

프롬프트 로깅·보강

### [Matcher: 어떤 조건에서 실행할지](#matcher-어떤-조건에서-실행할지)

Matcher는 도구 이름을 필터링합니다. `"Write|Edit|MultiEdit"`는 세 도구 중 하나가 호출됐을 때만 반응합니다. `Bash`, `Read` 같은 다른 도구는 무시합니다.

Matcher는 도구 이름을 봅니다

Matcher는 도구 이름을 대상으로 합니다. Hook을 걸 도구를 `"Write|Edit|MultiEdit"`처럼 모두 명시하세요.

### [Handler: 무엇을 실행할지](#handler-무엇을-실행할지)

Handler는 네 가지 타입이 있습니다. 가장 많이 쓰는 건 `command`(셸 스크립트)입니다.

타입

실행 방식

적합한 상황

`command`

셸 스크립트 실행

lint, 빌드, 테스트처럼 코드로 판정 가능한 검증

`prompt`

LLM에게 1회 질의

의도 파악 등 코드로 판정하기 어려운 검증

`http`

HTTP POST 전송

외부 서비스 연동 (Slack 알림, 감사 로그)

`mcp_tool`

연결된 MCP 서버의 도구 호출

MCP로 이미 연결된 외부 시스템에 검증 위임

이 레슨에서는 `command` 타입으로 실습합니다.

## [\[미션\] 파일 수정 후 ESLint 실행 Hook 만들기](#미션-파일-수정-후-eslint-실행-hook-만들기)

AI가 TypeScript 파일을 수정할 때마다 ESLint가 자동 실행되는 PostToolUse Hook을 만듭니다.

`ch08-01` 브랜치에는 ESLint가 미리 설정되어 있습니다.

```
git fetch origin
git checkout ch08-01
```

### [Step 1: jq 설치](#step-1-jq-설치)

이 미션의 Hook 스크립트는 JSON 입력에서 수정된 파일 경로를 꺼내야 합니다. `jq`는 JSON에서 필요한 값만 꺼내는 CLI 도구입니다. 터미널에서 설치 여부를 확인합니다.

```
jq --version
```

`jq-1.7.1` 처럼 버전 번호가 출력되면 다음 Step으로 넘어갑니다. 명령을 찾을 수 없다면 아래 절차로 설치합니다.

공식 문서: [jqlang.org](https://jqlang.org)

macOSWindows

```
brew install jq
```

VS Code 터미널에서 실행합니다.

```
winget install jqlang.jq
```

설치가 끝나면 VS Code 터미널을 닫았다가 다시 열고 `jq --version` 으로 확인합니다.

설치 직후 jq를 찾을 수 없다면

터미널을 닫았다가 다시 열어 보세요. 새 터미널을 열면 PATH가 갱신됩니다.

### [Step 2: Hook 스크립트 작성](#step-2-hook-스크립트-작성)

`.claude/hooks/lint.sh`를 생성합니다.

```
#!/bin/bash
FILE_PATH=$(jq -r '.tool_input.file_path')
bunx eslint --fix "$FILE_PATH"
```

각 줄이 하는 일입니다.

*   **`jq -r '.tool_input.file_path'`**: Hook은 호출된 도구의 입력값을 JSON으로 stdin에 전달합니다. `jq`로 그 중 수정된 파일 경로를 꺼냅니다.
*   **`bunx eslint --fix`**: 꺼낸 경로를 ESLint에 넘겨 자동 수정 가능한 문제(세미콜론, import 순서 등)를 바로 고칩니다.

운영체제에 맞게 다음 단계를 진행합니다.

macOS/LinuxWindows

```
chmod +x .claude/hooks/lint.sh
```

Windows는 파일 실행 권한 체계가 달라 `chmod` 없이도 Hook이 정상 동작합니다. 이 단계는 건너뜁니다.

### [Step 3: settings.json에 Hook 등록](#step-3-settingsjson에-hook-등록)

`.claude/settings.json`에 다음을 추가합니다.

```
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "\"$(git rev-parse --show-toplevel)\"/.claude/hooks/lint.sh"
          }
        ]
      }
    ]
  }
}
```

*   **`"matcher": "Write|Edit|MultiEdit"`**: 파일 생성·단일 편집·다중 편집 세 도구 모두에 반응합니다.
*   **`git rev-parse --show-toplevel`**: 프로젝트 루트 경로를 자동으로 찾습니다. 어느 디렉토리에서 실행되든 올바른 스크립트 경로를 가리킵니다.
*   **`.sh` 파일 분리**: `.sh` 파일로 분리하면 `settings.json`에는 실행할 스크립트 경로만 남습니다. 조건이 늘어나도 Hook 로직을 한 파일에서 관리할 수 있습니다.

기존 settings.json이 있다면

이미 다른 설정이 있다면 `hooks` 키만 추가합니다. 전체 파일을 덮어쓰지 않도록 주의합니다.

### [Step 4: Hook이 동작하는지 확인](#step-4-hook이-동작하는지-확인)

Claude Code를 실행한 뒤 AI에게 간단한 수정을 요청합니다.

> "app/page.tsx에 제목을 let으로 할당해줘"

AI가 `let title = "Todo"`처럼 변수를 선언합니다. `let`이지만 재할당되지 않으므로 ESLint의 `prefer-const` 규칙에 걸립니다. 이 규칙은 `--fix`로 자동 수정이 가능하므로, Hook이 실행되는 순간 `let`이 `const`로 즉시 바뀝니다.

"lint 돌려줘"라고 지시한 적이 없는데도 Hook이 파일 수정을 감지해 자동으로 실행한 것입니다.

그럼 자동 수정이 불가능한 에러는 어떻게 될까요?

### [Step 5: 자동 수정 불가 에러 발견](#step-5-자동-수정-불가-에러-발견)

이어서 이렇게 요청해봅니다.

> "title에 any 타입을 붙여줘"

AI가 `const title: any = "Todo"`로 수정합니다. `@typescript-eslint/no-explicit-any` 규칙은 `any` 사용을 금지하는데, 기본 설정에서는 `--fix`로 자동 수정되지 않습니다. ESLint는 고칠 수 없는 lint 에러를 만나면 exit 1로 끝납니다. 이 값만으로는 Claude가 에러 내용을 읽고 고칠 수 없습니다.

그런데 AI는 이 에러를 모른 채 다음 작업으로 넘어갑니다. 왜 그럴까요?

### [Step 6: exit code로 에러 전달](#step-6-exit-code로-에러-전달)

문제 없음stderr 전달stderr 전달Hook 스크립트exit code 반환exit 0exit 2기타 (1, 3…)통과Claude는 계속 진행Claude에게 피드백에러 인식 → 자동 수정사용자에게만 표시Claude는 피드백 못 받음

Claude에게 에러를 전달하려면 스크립트가 exit 2로 끝나야 합니다

Hook은 **스크립트의 exit code**로 결과를 판단합니다.

exit code

의미

피드백 대상

`0`

성공

(없음)

`2`

차단(Block)

**Claude에게 stderr 피드백** → 자동 수정 시도

그 외 (`1`, `3` ...)

비차단 에러

사용자에게만 알림 (Claude는 모름)

여기에 함정이 있습니다. ESLint는 린트 에러가 있으면 관습적으로 **exit 1**을 반환합니다. 그런데 Hook 입장에서 exit 1은 "비차단 에러"입니다. 사용자 터미널에만 출력되고 Claude에게는 전달되지 않습니다. 그래서 AI는 에러가 있었는지조차 모르고 다음 단계로 넘어갑니다.

해결책은 ESLint의 exit 1을 Hook의 exit 2로 변환하는 것입니다. `lint.sh`를 다음과 같이 교체합니다.

```
#!/bin/bash
FILE_PATH=$(jq -r '.tool_input.file_path')

if [[ ! "$FILE_PATH" =~ \.(js|jsx|ts|tsx|mjs)$ ]]; then
  exit 0
fi

RESULT=$(bunx eslint --fix "$FILE_PATH" 2>&1)
ESLINT_EXIT=$?

if [ $ESLINT_EXIT -eq 0 ]; then
  exit 0
elif [ $ESLINT_EXIT -eq 1 ]; then
  echo "$RESULT" >&2
  exit 2
else
  exit 1
fi
```

핵심만 짚으면 다음과 같습니다.

*   **확장자 필터링**: `.ts`, `.tsx` 같은 JS/TS 파일이 아니면 ESLint를 돌릴 이유가 없으니 즉시 exit 0
*   **`RESULT=$(... 2>&1)`**: ESLint 출력(stdout + stderr)을 변수에 캡처
*   **`ESLINT_EXIT=$?`**: 직전 명령의 exit code (ESLint는 0=깨끗함, 1=린트 에러, 2=설정 오류)
*   **`echo "$RESULT" >&2; exit 2`**: 린트 에러일 때 전체 결과를 stderr로 내보내고 Hook exit code를 2로 바꿈 → Claude에게 "이 에러들 고쳐"라고 전달

스크립트를 교체한 뒤 같은 요청을 다시 보냅니다.

> "title에 any 타입을 붙여줘"

이번엔 Hook이 ESLint의 exit 1을 exit 2로 바꾸면서 `no-explicit-any` 에러 메시지를 Claude에게 넘깁니다. 이제 에러 메시지가 Claude에게 전달됩니다. Claude는 `any`가 금지된 이유를 읽고, 더 구체적인 타입으로 고치거나 사용자에게 확인을 요청합니다.

## [Hook을 피해야 하는 경우](#hook을-피해야-하는-경우)

Hook은 강력하지만, 모든 규율을 Hook으로 바꾸면 오히려 역효과가 납니다.

CLAUDE.md로 충분한 경우는 Hook으로 옮기지 않습니다. "주석은 한국어로 써달라"처럼 AI가 대부분 따라오는 스타일 권장은 지침으로 남겨둡니다. **Hook은 "한 번만 빠져도 문제가 생기는 작업"에 씁니다.** lint, 시크릿 파일 접근 차단, 빌드 검증 등입니다.

매 도구 호출마다 실행되므로 무거운 작업은 PostToolUse에 넣지 않는 편이 좋습니다. 전체 빌드나 E2E 테스트 같은 수십 초짜리 작업을 넣으면, AI가 파일을 수정할 때마다 긴 지연이 생깁니다. 이런 검증은 `Stop` Hook(작업 완료 시)이나 CI에 맡기는 편이 낫습니다.

예를 들어 "이 변경이 설계 의도에 맞는가"처럼 코드 실행만으로 판정할 수 없는 질문은 `command` Hook에 맞지 않습니다. 이런 판단에는 `prompt` Hook을 쓸 수 있지만, 매번 모델을 호출하므로 비용과 지연이 생깁니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **CLAUDE.md는 권고, Hook은 강제**: 지침은 AI가 판단해 건너뛸 수 있지만, Hook은 지정된 시점에 Claude Code 런타임이 무조건 실행합니다.
2.  **Event·Matcher·Handler 세 요소**: 언제 발동할지(Event), 어떤 조건에서(Matcher), 뭘 실행할지(Handler)를 조립해 Hook을 구성합니다.
3.  **exit code가 소통 언어**: `0`은 성공, `2`는 Claude에게 에러 피드백, 그 외는 Claude에게 전달되지 않습니다. 외부 도구의 exit code를 Hook의 exit code로 변환하는 스크립트를 작성해야 Claude가 에러를 인식합니다.

## [FAQ](#faq)

### Hook이 너무 많아지면 전체 속도가 느려지지 않나요?

### 스크립트가 에러로 죽으면 AI 작업이 전부 중단되나요?

### CLAUDE.md에 "파일 수정 후 ESLint 실행"이라고 써두면 충분하지 않나요?

## [이어서 배울 내용](#이어서-배울-내용)

Hook으로 AI의 행동을 강제로 제어하는 방법을 배웠습니다. 다음 레슨에서는 반대 방향의 문제를 다룹니다. AI가 너무 많은 파일을 읽어서 컨텍스트가 오염될 때, 작업을 별도 컨텍스트로 격리하는 Custom Agent입니다.

*   Subagent의 컨텍스트 격리 원리
*   `.claude/agents/`에 Custom Agent 정의하기
*   컨텍스트 오염이 큰 작업을 Agent로 분리하는 기준

피드백 남기기

[

도구는 가능성, Skill은 일관성 | CLI·MCP

CLI와 MCP는 외부 시스템에 닿는 가능성을, Skill은 매번 같은 방식으로 쓰는 일관성을 담당합니다

](/learn/extending-claude/external-connection/tools-and-skills)[

역할이 아니라 컨텍스트 격리 | Custom Agent

서브에이전트가 역할 분담이 아니라 컨텍스트 오염을 격리하는 도구임을 이해하고, \`.claude/agents/\`에 test-planner를 직접 만들어 봅니다

](/learn/extending-claude/execution-control/custom-agent)

---
Source: https://docs.claude-hunt.com/learn/extending-claude/execution-control/hooks
