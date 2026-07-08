# Claude Code Custom MCP 서버 만들기 | 제대로 배우기

Part 2 · Claude 확장하기Chapter 7 · 외부 연결

# 내 시스템을 Claude에 연결하기 | Custom MCP 서버 만들기

MCP Builder Skill로 날씨 API를 감싸는 MCP 서버를 직접 만들고, Tool 정의의 핵심 구조를 이해합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 8.

## [Overview](#overview)

앞 레슨에서 Claude in Chrome을 붙여봤습니다. 공개된 MCP는 대부분 이렇게 설치만으로 바로 쓸 수 있습니다. 그런데 사내 API나 자체 데이터베이스처럼 세상에 공개된 MCP 서버가 없는 경우는 어떻게 할까요?

이번 레슨은 Anthropic의 **MCP Builder Skill** 로 MCP 서버 프로젝트를 자동 생성하고, 생성된 Tool 정의를 읽어보며 MCP 서버의 세 가지 핵심 원칙을 직접 익힙니다.

### [학습 목표](#학습-목표)

*   MCP Builder Skill로 MCP 서버 프로젝트를 생성할 수 있습니다
*   Tool 정의의 세 요소 (이름 · description · 입력 스키마) 를 읽고 이해합니다
*   직접 만든 MCP 서버를 Claude Code에 연결하고 동작을 확인합니다

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   Node.js 20 이상 + Bun 설치 (`bun --version`)
*   Claude Code 인증 완료 (`claude --version`)
*   이 실습은 기존 강의 프로젝트와 무관한 **독립 프로젝트** 로 시작합니다. 새 폴더에서 진행합니다

## [Step 1: 프로젝트 폴더 준비하기](#step-1-프로젝트-폴더-준비하기)

MCP 서버는 자체 `package.json` 과 의존성을 갖춘 독립 프로세스입니다. 지금까지 쓰던 강의 프로젝트 (Todo 앱) 와 분리된 새 폴더에서 시작합니다.

1.  **찾기 쉬운 위치에 `weather-mcp` 폴더 생성**
    *   macOS: Finder에서 홈 디렉토리 · 바탕화면 등에 `⌘+⇧+N` 으로 새 폴더
    *   Windows: 탐색기에서 우클릭 → 새 폴더
2.  **VS Code에서 폴더 열기**: `File > Open Folder` (단축키: macOS `⌘+O`, Windows `Ctrl+K Ctrl+O`) → 방금 만든 `weather-mcp` 폴더 선택
3.  **VS Code 터미널 열기**: `⌃+` (백틱) 또는 메뉴의 `Terminal > New Terminal`

이제 이 폴더에서 MCP Builder Skill 설치와 Claude Code 실행을 이어갑니다.

## [Step 2: MCP Builder Skill 설치하기](#step-2-mcp-builder-skill-설치하기)

MCP Builder는 Anthropic의 공식 Skills 저장소에서 Plugin으로 설치할 수 있는 Skill입니다. Claude Code에서 Plugin 마켓플레이스를 추가하고, `example-skills` 플러그인을 설치합니다.

```
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
```

설치 직후에는 새 플러그인이 현재 세션에 바로 잡히지 않을 수 있습니다. `/reload-plugins` 로 다시 읽어옵니다. 이제 `example-skills` 플러그인 안의 `mcp-builder` Skill을 Claude Code에서 `/mcp-builder` 로 호출할 수 있습니다.

## [Step 3: MCP 서버 프로젝트 생성 요청하기](#step-3-mcp-서버-프로젝트-생성-요청하기)

터미널에서 `claude` 로 Claude Code를 시작하고 다음과 같이 요청합니다.

```
/mcp-builder 도시 이름을 입력하면 현재 날씨 정보 (기온, 풍속, 습도) 를 반환하는 MCP 서버를 TypeScript 로 만들어줘. 프로젝트 폴더명은 weather-mcp-server 로 해줘. Open-Meteo API 를 사용하고 API 키 없이 동작해야 해.
```

MCP Builder Skill이 지침을 따라 프로젝트를 자동으로 만듭니다. 결과 구조는 대략 이렇습니다.

weather-mcp

weather-mcp-server

package.json

src

index.ts

README.md

`src/index.ts`가 MCP 서버 메인 파일입니다.

결과가 매번 다를 수 있습니다

AI가 생성하는 코드는 실행마다 세부 사항이 달라질 수 있습니다. 파일 구조나 변수 이름이 아래 예시와 달라도 정상입니다. 핵심 구조(Tool 정의 · 입출력 스키마 · 서버 연결)가 동일한지가 중요합니다.

## [Step 4: 생성된 Tool 정의 읽기](#step-4-생성된-tool-정의-읽기)

`src/index.ts` 의 Tool 정의가 MCP 서버의 핵심입니다.

```
server.registerTool(
  "get-weather",
  {
    title: "Get Weather",
    description: "도시 이름으로 현재 날씨를 조회합니다",
    inputSchema: {
      city: z.string().describe("도시 이름 (예: Seoul, Tokyo, New York)"),
    },
  },
  async ({ city }) => {
    // 1. 도시 이름 → 좌표 변환 (Geocoding)
    // 2. 좌표 → 날씨 데이터 조회
    // 3. content 배열로 결과 반환
  }
);
```

①

### Tool 이름

"get-weather"

Claude 가 이 도구를 식별하는 ID

동사 + 명사 형태로 명확하게

②

### 설정 객체

{ description, inputSchema }

Tool 선택 기준과 입력 형식

description 이 가장 중요

③

### 실행 함수

async ({ city }) => { ... }

실제 API 호출 · 데이터 가공

{ content: \[...\] } 표준 형식 반환

`server.registerTool()` 의 세 인자가 Tool 의 품질을 결정합니다

`server.registerTool()` 은 세 개의 인자를 받습니다.

인자

역할

이름

Claude가 이 도구를 식별하는 ID (`get-weather`)

설정 객체

`title` · `description` · `inputSchema` 를 담은 메타데이터

실행 함수

실제 동작. API 호출, 데이터 가공 후 결과 반환

Tool 정의의 세 요소가 품질을 결정합니다.

*   **`description`**: 이 Tool을 언제 호출할지 알려주는 한 줄 설명입니다. "데이터를 가져옵니다" 처럼 모호하면 Claude가 잘못된 Tool을 고릅니다. "도시 이름으로 현재 날씨를 조회합니다" 처럼 구체적이어야 합니다.
*   **`inputSchema`**: Tool이 받을 입력 형태를 미리 선언하는 필드입니다. Zod는 TypeScript에서 입력값의 형태를 코드로 정의하고 검사하는 라이브러리입니다. `.describe()` 에 예시까지 넣으면 Claude가 자연어에서 올바른 값을 더 잘 추출합니다.
*   **실행 함수의 반환**: 반드시 `{ content: [{ type: "text", text: "..." }] }` 형식이어야 합니다. 이 표준 형식 덕분에 모든 MCP 서버의 응답을 Claude Code가 같은 방식으로 처리합니다.

## [Step 5: Claude Code에 MCP 서버 등록하기](#step-5-claude-code에-mcp-서버-등록하기)

MCP 서버 파일을 만들었지만, Claude Code는 아직 이 파일의 존재를 모릅니다. 한 번 등록해두면, Claude Code가 시작될 때마다 `.mcp.json` 에 적힌 명령어로 이 파일을 백그라운드에서 자동으로 실행해 둡니다. 이후 Tool을 호출할 때 Claude가 이 프로세스에 요청을 보내고, 돌려받은 응답을 사용합니다. Claude in Chrome 같은 공개 MCP와 작동 원리는 같고, 차이는 내 로컬 파일이라는 점 하나입니다.

다음과 같이 등록합니다.

```
claude mcp add weather -s project -- bun run "$(pwd)/weather-mcp-server/src/index.ts"

위 명령어로 현재 프로젝트에 MCP 서버를 등록해줘.
```

명령어가 6 개 부분으로 나뉩니다.

부분

의미

`claude mcp add`

Claude Code에 MCP 서버를 등록하는 명령

`weather`

서버 이름. `/mcp` 에 이 이름으로 표시됨

`-s project`

스코프. `project` = 현재 프로젝트 루트의 `.mcp.json` 에 저장

`--`

구분자. 이 뒤가 서버 실행 명령어

`bun run`

Bun 런타임으로 파일 실행. TypeScript를 컴파일 없이 바로 돌림

`"$(pwd)/weather-mcp-server/src/index.ts"`

서버 소스 파일 절대 경로 (`$(pwd)` 는 현재 폴더로 치환)

Claude가 명령어를 실행하면 `.mcp.json` 에 서버 정보가 저장됩니다.

## [Step 6: 연결 확인하고 날씨 조회 테스트하기](#step-6-연결-확인하고-날씨-조회-테스트하기)

Claude Code는 MCP 설정을 세션이 시작될 때 한 번만 읽습니다. Step 5에서 등록한 `weather` 서버를 새로 인식시키려면 세션을 껐다 켜야 합니다. `/exit` 로 나간 뒤 다시 `claude` 를 실행합니다.

```
/mcp
```

`weather` 서버가 "Connected" 상태면 성공입니다.

이제 Claude에게 날씨를 물어봅니다.

```
서울 날씨 어때?
```

Claude가 `get-weather` Tool을 호출해서 Open-Meteo API에서 실시간 데이터를 가져옵니다. 응답에 기온·풍속·습도가 포함되면 성공입니다.

한 단계 더 나아가 여러 도시를 비교합니다.

```
도쿄랑 뉴욕 날씨 비교해줘
```

Claude가 `get-weather` 를 두 번 호출해 두 도시 결과를 가져오고 비교합니다. MCP 서버는 **데이터만** 가져오고, 비교·판단·표현은 Claude가 담당합니다. 이것이 MCP 서버의 역할 경계입니다.

## [좋은 MCP 서버의 세 가지 원칙](#좋은-mcp-서버의-세-가지-원칙)

### [description이 Tool 선택을 결정하기](#description이-tool-선택을-결정하기)

사용자 질문: "서울 날씨 어때?"

각 Tool 의 description 을 비교

Read"파일 읽기"

Bash"셸 명령 실행"

WebSearch"웹 검색"

screenshot"현재 탭 스크린샷 (Claude in Chrome)"

get-weather"도시 이름으로 현재 날씨를 조회합니다"← 매칭

description 매칭 → 호출

get-weather({ city: "Seoul" })

Tool 은 이름이 아니라 description 으로 매칭됩니다 — 내가 만든 Tool 도 같은 목록에서 함께 경쟁합니다

Claude는 사용자 질문과 여러 Tool의 `description` 을 비교해서 무엇을 호출할지 판단합니다. 내가 만든 `get-weather` 도 내장 Tool · 다른 MCP의 Tool과 같은 목록에서 함께 경쟁합니다. description에 "날씨" 라는 단어가 있어야 "서울 날씨 어때?" 에 이 Tool이 선택됩니다. 그래서 설명을 구체적으로 적을수록 올바른 Tool이 선택됩니다.

### [입력 스키마: Claude 와의 계약](#입력-스키마-claude-와의-계약)

`z.string().describe("도시 이름")` 이라고 정의하면, Claude는 사용자의 자연어에서 도시 이름을 추출해 문자열로 전달합니다. 스키마가 명확할수록 추출 정확도가 올라갑니다. `.describe("도시 이름 (예: Seoul, Tokyo)")` 처럼 예시까지 넣으면 추출 정확도가 더 올라갑니다.

### [복잡성은 서버 안에 숨기기](#복잡성은-서버-안에-숨기기)

날씨 MCP는 내부적으로 API를 두 번 호출합니다 (Geocoding → Weather). 그러나 Claude가 보는 인터페이스는 `city` 하나뿐입니다. **좋은 MCP 서버는 외부 시스템의 복잡성(좌표 변환 · 호출 순서 · 에러 처리)을 감추고 Claude에게 단순한 인터페이스만 노출합니다.**

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **MCP Builder Skill로 자동 생성**: 만들고 싶은 서버를 설명하면 Claude가 프로젝트 구조 · SDK 설정 · Tool 정의까지 전체를 만듭니다. 개발자는 설계 의도만 전달합니다.
2.  **Tool 정의의 세 요소**: `description`(Claude 선택 근거) · `inputSchema`(Claude 와의 계약) · `content` 배열 출력(MCP 표준 형식) 이 셋이 명확할수록 Claude의 호출 정확도가 올라갑니다.
3.  **`claude mcp add` 한 줄로 연결**: 절대 경로로 등록하고 새 세션에서 확인합니다. `.mcp.json` 에 저장되므로 팀원이 저장소를 받으면 같은 설정이 즉시 동작합니다.

## [FAQ](#faq)

### MCP Builder Skill 없이 직접 코드를 작성해도 되나요?

### 하나의 MCP 서버에 Tool을 여러 개 넣을 수 있나요?

### API 키가 필요한 서비스를 감싸려면 어떻게 하나요?

### 직접 만든 MCP와 공개 MCP의 차이가 있나요?

## [이어서 배울 내용](#이어서-배울-내용)

CLI, MCP, Custom MCP로 외부 시스템에 닿는 세 가지 길을 다 배웠습니다. 그런데 도구에 접근할 수 있는 것과, 그 도구를 **매번 같은 방식으로 쓰는 것** 은 다른 문제입니다. 다음 레슨에서는 외부 도구에 Skill을 결합해서 반복 워크플로우를 일관되게 만드는 방법을 배웁니다.

*   도구 (Capability) 와 사용법 (Procedure) 의 분리
*   CLI + Skill 결합 워크플로우 사례
*   MCP + Skill 결합 워크플로우 사례

피드백 남기기

[

MCP로 Claude의 Tool 늘리기 | MCP 연결

Claude in Chrome으로 내 Chrome 세션에 접근해 Claude가 쓸 수 있는 Tool을 확장합니다

](/learn/extending-claude/external-connection/mcp-connection)[

도구는 가능성, Skill은 일관성 | CLI·MCP

CLI와 MCP는 외부 시스템에 닿는 가능성을, Skill은 매번 같은 방식으로 쓰는 일관성을 담당합니다

](/learn/extending-claude/external-connection/tools-and-skills)

---
Source: https://docs.claude-hunt.com/learn/extending-claude/external-connection/building-mcp-server
