# Claude Code MCP 연결 | 제대로 배우기

Part 2 · Claude 확장하기Chapter 7 · 외부 연결

# MCP로 Claude의 Tool 늘리기 | MCP 연결

Claude in Chrome으로 내 Chrome 세션에 접근해 Claude가 쓸 수 있는 Tool을 확장합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

앞 레슨에서 gh CLI로 Claude가 실시간 GitHub 데이터를 가져오게 했습니다. 그래도 CLI만으로는 채워지지 않는 영역이 있었습니다. 지금 열어둔 Chrome 탭 상태 같은 영역입니다.

이런 영역은 **MCP**로 해결합니다. Claude Code에 이미 들어 있는 Claude in Chrome으로 내 실제 브라우저 세션에 접근해, Claude가 쓸 수 있는 Tool이 늘어나는 걸 직접 체험합니다.

### [학습 목표](#학습-목표)

*   MCP가 CLI로 대체되기 어려운 세 가지 상황을 구분합니다
*   MCP의 Server · Client · Host 구조를 이해합니다
*   Claude in Chrome을 붙여 Claude의 Tool을 직접 확장해봅니다

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   Chrome 또는 Microsoft Edge 사용 (Brave · Arc 등 Chromium 변형은 미지원)
*   Claude in Chrome 확장 설치 + Claude 계정 로그인 완료
    *   미설치 시 [사전 준비사항](/learn/prerequisites#claude-in-chrome) 의 Claude in Chrome 항목 참조

## [CLI로 닿지 않는 영역](#cli로-닿지-않는-영역)

"지금 로그인된 대시보드의 콘솔 에러 좀 봐줘." 이 한 문장이 CLI의 한계를 드러냅니다.

CLI는 항상 **새 프로세스로 시작** 합니다. `curl` 이든 헤드리스 브라우저 CLI든 내 실제 Chrome에는 붙지 못합니다. 방금 내가 로그인해서 보고 있는 대시보드의 에러를 CLI로 확인하려면 새 브라우저를 띄우고 로그인을 다시 해야 합니다.

CLI가 새 프로세스에서 다시 시작한다면, MCP는 내가 이미 로그인해 보고 있는 앱 상태에 붙습니다.

## [MCP가 여전히 더 나은 세 가지 상황](#mcp가-여전히-더-나은-세-가지-상황)

내장 Tool

ReadWriteEditBashGrepGlobWebFetchWebSearch

`claude --chrome`+`claude mcp add figma`

내장 Tool

ReadWriteEditBashGrepGlobWebFetchWebSearch

\+ Claude in Chrome

list\_tabsopen\_urlclicktyperead\_consolescreenshot

\+ Figma MCP

write\_to\_canvasextract\_design\_contextget\_design\_tokens

MCP 를 붙일 때마다 Claude 가 쓸 수 있는 Tool 이 늘어납니다

MCP는 외부 시스템을 Claude가 쓸 수 있는 **Tool** 로 감싸는 표준 프로토콜입니다. MCP 서버를 하나 연결하면 그 서버가 노출하는 Tool을 Claude가 내장 도구처럼 호출합니다. MCP를 하나 붙이면 그만큼 Claude의 Tool 목록이 늘어납니다.

CLI가 있어도 MCP가 더 나은 상황은 세 가지입니다.

### [실행 중인 앱 세션 접근](#실행-중인-앱-세션-접근)

Chrome에서 방금 로그인해 둔 대시보드, Figma 데스크톱 앱의 열린 파일이 전부 이미 실행 중인 앱 내부의 세션입니다. CLI는 프로세스 밖에서만 동작하므로 이 안에는 들어가지 못합니다. Claude in Chrome은 이 세션에 직접 붙습니다.

### [공식 CLI가 없는 SaaS](#공식-cli가-없는-saas)

Figma · Linear 같은 일부 SaaS는 공식 CLI를 제공하지 않습니다. 공식 MCP 서버가 있다면 별도 우회 없이 공식 인증과 공식 Tool로 그 서비스를 쓸 수 있습니다.

### [팀 공유 설정 (`.mcp.json`)](#팀-공유-설정-mcpjson)

MCP 설정을 `.mcp.json` 파일에 넣고 커밋하면, 팀원이 저장소를 받는 순간 **같은 MCP를 같은 설정으로** 쓸 수 있습니다. CLI는 각자 `brew install` · `PATH` · `alias` 를 맞춰야 하지만, MCP는 파일 하나가 설정의 단일 출처입니다.

## [MCP의 동작 방식: Server · Client · Host](#mcp의-동작-방식-server--client--host)

MCP HostClaude CodeMCP ClientTool 호출 담당사용자가 쓰는AI 코딩 앱MCP Serverclaude-in-chrome(Tool 여러 개 노출)Chrome렌더링된 페이지DOM · 콘솔 · 네트워크stdio · JSONCDP

Host 가 Client 를 품고, Client 가 MCP Server 를 통해 외부 시스템에 닿습니다

MCP는 세 개의 역할로 나뉩니다.

비유하면 Host는 내가 쓰는 앱, Client는 그 앱 안의 연결 담당자, Server는 외부 시스템을 Tool로 바꿔주는 어댑터입니다.

*   **MCP Server**: 외부 시스템을 Claude가 호출할 수 있는 Tool로 바꿔 노출합니다. 예를 들어 `claude-in-chrome` 서버는 Chrome 탭을 열고, 콘솔 로그를 읽고, 스크린샷을 찍는 Tool을 제공합니다.
*   **MCP Client**: Host 안에서 Server 하나와 연결을 유지하는 담당자입니다. Claude Code는 `claude-in-chrome` 서버에 요청을 보낼 때 이 Client를 통해 `read_console` 같은 Tool을 호출합니다.
*   **MCP Host**: 사용자가 실제로 여는 AI 앱입니다. Claude Code는 Host로서 여러 Server 연결을 관리하고, 각 Server에서 받은 Tool을 Claude가 쓸 수 있게 합니다.

사용자 입장에서는 내장 Tool과 MCP Tool이 똑같이 "Claude가 쓸 수 있는 도구"로 보입니다. 둘의 차이를 따로 느낄 일이 없습니다.

## [\[미션\] Claude in Chrome으로 내 세션 관찰하기](#미션-claude-in-chrome으로-내-세션-관찰하기)

Claude Code는 이미 `--chrome` 플래그로 Claude in Chrome이라는 MCP를 지원합니다. 이걸 켜면 Claude가 내 실제 Chrome 탭을 볼 수 있습니다.

이 미션은 [사전 준비사항](/learn/prerequisites#claude-in-chrome) 의 Claude in Chrome 설치와 로그인을 마친 상태에서 시작합니다.

`ch07-02` 브랜치가 이 미션의 시작점입니다.

```
git fetch origin
git checkout ch07-02
```

### [Step 1: Claude Code에서 Chrome 활성화](#step-1-claude-code에서-chrome-활성화)

새 세션을 켤 때는 `--chrome` 플래그를 함께 씁니다.

```
claude --chrome
```

이미 열어둔 세션에서 켜려면 `/chrome` 을 입력합니다.

```
/chrome
```

첫 셋팅에서 확장이 인식되지 않을 때

처음 `--chrome` 또는 `/chrome` 을 켜면 Claude Code가 네이티브 메시징 호스트 설정 파일을 새로 설치합니다. Chrome은 이 파일을 시작 시점에만 읽으므로, 첫 시도에서 확장이 인식되지 않으면 Chrome을 한 번 종료했다가 다시 켠 뒤 명령을 다시 실행합니다.

### [Step 2: `/chrome` 으로 연결 상태 확인](#step-2-chrome-으로-연결-상태-확인)

```
/chrome
```

![Claude in Chrome 상태 화면](https://bisan74-lab.github.io/LearnClaude/images/claude-in-chrome-status.1rcb7a0kwgzt8.png)

이미지에서 확인할 지점은 두 가지입니다.

1.  **연결 상태**: `Status: Enabled`, `Extension: Installed`, `Browser: Browser 1`이 보이면 Claude Code가 Chrome 확장을 감지했고, 이번 세션에서 브라우저 Tool을 쓸 수 있습니다. `Status`가 `Disabled`라면 `/chrome` 화면에서 활성화하거나 `claude --chrome`으로 세션을 다시 엽니다.
2.  **기본 활성화 설정**: `Enabled by default: Yes`는 `/chrome` 화면에서 `Enabled by default`를 선택해 켜는 사용자 설정입니다. `Yes`라면 다음 Claude Code CLI 세션부터 Chrome이 기본으로 켜집니다. `No`라면 세션마다 `claude --chrome`으로 시작하거나, 이미 열린 세션에서 `/chrome`으로 켭니다. 브라우저 검증을 자주 한다면 `Yes`로 둘 수 있지만, 공식 문서는 CLI에서 이 설정을 켜면 브라우저 Tool이 항상 로드되어 Context 사용량이 늘어난다고 안내합니다.

Chrome을 활성화한 뒤 `/mcp` 를 열면 MCP 서버 목록에서도 연결 상태를 확인할 수 있습니다.

```
/mcp
```

![MCP 목록에 표시된 claude-in-chrome](https://bisan74-lab.github.io/LearnClaude/images/claude-in-chrome-mcp-list.0q7zx_eut2vhd.png)

`Built-in MCPs` 아래에 `claude-in-chrome · connected · 22 tools`처럼 보이면 Chrome MCP가 연결된 상태입니다. 뒤에 붙는 Tool 개수는 Claude Code 버전에 따라 달라질 수 있습니다. 정리하면 `/chrome`은 Chrome 활성화 상태를 보는 화면이고, `/mcp`는 Claude Code에 붙어 있는 MCP 서버 목록을 보는 화면입니다.

### [Step 3: Todo 앱 직접 검증 요청](#step-3-todo-앱-직접-검증-요청)

Todo 앱 개발 서버(`bun run dev`) 를 띄운 뒤 Claude에게 요청합니다.

```
localhost:3000 으로 가서 Todo 앱의 핵심 동작을 직접 확인해줘.

1. "장보기"를 입력하고 Enter 를 누르면 목록 맨 위에 추가되는지 확인해줘.
2. 빈 입력 상태에서 Enter 를 눌러도 Todo 가 추가되지 않는지 확인해줘.
3. 체크박스를 클릭하면 완료 표시가 되는지 확인해줘.
4. 삭제 버튼을 누르면 항목이 사라지는지 확인해줘.
5. 페이지를 새로고침해도 Todo 목록이 유지되는지 확인해줘.

확인한 결과와 콘솔 에러 여부를 함께 알려줘.
```

이 요청은 [Chapter 04의 Todo 앱 검증](/learn/starting-conversations/todo-app/todo-implementation)에서 사람이 브라우저로 확인하던 체크리스트를 Claude in Chrome에게 맡기는 실습입니다. Claude는 브라우저 Tool로 페이지를 열고, 입력·체크·삭제·새로고침을 실제 화면에서 실행합니다. `curl` 로 페이지를 받으면 JS가 안 돌아간 HTML 원본만 오지만, Claude in Chrome은 내 Chrome 세션 안에서 직접 동작합니다.

마지막으로 현재 상태를 이미지로 남겨 봅니다.

```
현재 탭을 스크린샷으로 찍어줘
```

Claude가 `screenshot` Tool을 호출해 이미지를 반환합니다. 이후 우선순위·필터링 같은 기능을 추가해도 같은 방식으로 기존 동작 확인을 맡길 수 있습니다.

## [MCP를 연결할 때 치르는 비용](#mcp를-연결할-때-치르는-비용)

MCP에도 대가가 있습니다. Claude Code는 MCP Tool Search로 Tool 설명을 지연 로드합니다. 세션 시작 때 모든 Tool 설명을 한꺼번에 넣지 않고, Tool 이름과 서버 설명만 먼저 Context Window에 들어갑니다. Claude가 필요한 Tool을 찾고 호출할 때 해당 Tool 설명이 추가됩니다.

비용이 사라지는 것은 아닙니다. Tool 이름, 서버 설명, 실제로 호출한 Tool 설명, 긴 Tool 결과는 모두 Context를 씁니다. `/context` 로 현재 무엇이 Context를 쓰는지 확인하고, `/mcp` 에서 쓰지 않는 서버를 꺼 둡니다.

그래서 기본 원칙은 **"현재 작업에 필요한 MCP만 연결한다"** 입니다. `.mcp.json` 을 프로젝트별로 관리하면, 이 프로젝트엔 이 MCP만, 다른 프로젝트엔 다른 MCP만 로드되도록 깔끔하게 분리됩니다.

CLI는 명령 목록을 Tool 설명으로 추가하지 않으므로 초기 Context 비용이 더 작습니다. 대신 명령 결과가 길면 그 결과는 그대로 Context를 씁니다. **그래서 CLI로 해결되면 CLI를, MCP가 꼭 필요한 영역엔 MCP를 씁니다.**

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **MCP Tool 확장**: `--chrome` 으로 Claude in Chrome을 켜면 내 실제 Chrome 세션을 다루는 Tool이 추가됩니다. 외부 MCP도 `claude mcp add` 로 같은 방식으로 붙입니다.
2.  **MCP 적용 영역**: 실행 중 내 앱 세션, 공식 CLI 없는 SaaS, 팀 공유 설정의 세 가지 상황에서 MCP가 여전히 더 나은 선택입니다.
3.  **MCP Context 비용**: Claude Code는 MCP Tool 설명을 지연 로드하지만, Tool 이름·서버 설명·호출한 Tool 설명·긴 결과는 Context를 씁니다. `/context` 와 `/mcp` 로 확인하며 현재 작업에 쓸 MCP만 붙입니다.

## [FAQ](#faq)

### 팀원과 .mcp.json 으로 공유 가능한가요?

### MCP를 많이 붙이면 Claude가 더 똑똑해지나요?

## [이어서 배울 내용](#이어서-배울-내용)

Claude in Chrome 같은 공개 MCP는 설치만 하면 바로 씁니다. 하지만 사내 API나 자체 데이터베이스처럼 세상에 공개된 MCP 서버가 없는 경우는 어떻게 할까요? 다음 레슨에서는 MCP 서버를 직접 만드는 방법을 배웁니다.

*   MCP Builder Skill로 MCP 서버 프로젝트 자동 생성
*   Tool 정의의 세 요소 (이름 · description · 입력 스키마)
*   날씨 API를 감싸는 MCP 서버 만들어 연결하기

피드백 남기기

[

Claude에게 터미널 도구 빌려주기 | CLI 연결

gh CLI를 Claude에게 연결해 실시간 GitHub 데이터를 가져오는 방법과 CLI가 AI와 잘 맞는 구조적 이유를 이해합니다

](/learn/extending-claude/external-connection/cli-connection)[

내 시스템을 Claude에 연결하기 | Custom MCP 서버 만들기

MCP Builder Skill로 날씨 API를 감싸는 MCP 서버를 직접 만들고, Tool 정의의 핵심 구조를 이해합니다

](/learn/extending-claude/external-connection/building-mcp-server)

---
Source: https://docs.claude-hunt.com/learn/extending-claude/external-connection/mcp-connection
