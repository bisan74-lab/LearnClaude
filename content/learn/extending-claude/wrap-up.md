# Claude Code Part 2 정리 | 제대로 배우기

Part 2 · Claude 확장하기

# Part 2 정리

Part 2에서 배운 What vs How, Context 품질 도구(Rules/Commands/Skills), 외부 연결(CLI/MCP), 실행 제어(Hooks/Custom Agent)를 정리합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [AI에게 일을 맡기는 구조](#ai에게-일을-맡기는-구조)

### [What vs How, 그리고 자율 루프](#what-vs-how-그리고-자율-루프)

사람: "X 하고 Y 해줘"

AI: 한 단계 실행

사람: 검증 → 다음 단계 지시

매 단계마다 사람이 다시 지시합니다

사람: "이 입력이면 이 출력"

AI 자율 루프

시도실행확인실패 시 반복

사람: 최종 결과만 확인

AI 가 스스로 닫습니다

How 는 사람이 매 단계 개입하고, What 은 AI 가 자율 루프로 닫습니다

Part 1의 수동 체크리스트를 코드로 바꾸면서 Part 2가 시작되었습니다. 핵심은 "어떻게 하라"에서 "무엇이 되어야 한다"로 옮겨가는 것입니다.

*   **What vs How**: How는 단계를 하나하나 지시합니다. What은 목적지만 알려줍니다. AI가 막혔을 때 스스로 다른 방법을 시도할 수 있으려면 What이어야 합니다.
*   **테스트 기반 검증**: 수동 체크리스트를 테스트 코드로 변환하면, AI가 코드 변경 후에도 기존 기능이 정상인지 자동으로 확인합니다. `bun run test` 한 번이 브라우저 수동 클릭을 대체합니다.
*   **성공 기준**: "잘 동작해야 한다"가 아니라 "이 입력이면 이 출력"입니다. 구체적 입출력이 있어야 AI가 스스로 검증할 수 있습니다.
*   **자율 루프**: 테스트가 있으면 AI가 시도 -> 확인 -> 수정을 스스로 반복합니다. 코드는 실행하면 맞다/틀리다가 즉시 나오는 매체이기 때문에 가능합니다.

### [계획과 작업의 연결](#계획과-작업의-연결)

성공 기준은 테스트 코드뿐 아니라 계획에도 씁니다. 계획은 context overflow와 auto-compact를 거쳐도 살아 있어야 합니다.

*   **성공 기준과 Red Green Refactor**: 요구사항 + 성공 기준 + 범위 제한으로 계획을 세우고, 성공 기준 목록에서 하나씩 테스트로 검증하며 구현합니다. Plan -> 실행 -> 발견 -> 다시 Plan 사이클로 기능을 정교하게 다듬습니다.
*   **Task 시스템**: 작업 목록을 `~/.claude/tasks/`에 JSON으로 저장합니다. auto-compact가 대화를 요약해도 파일의 진행 상황은 그대로 남습니다. blockedBy/blocks로 의존성을 설정하면 독립 작업을 병렬로 실행할 수 있습니다.

## [Context 품질을 지키는 도구](#context-품질을-지키는-도구)

활성화 방식

paths 경로 매칭

Context 로드 시점

매 세션 (해당 경로만)

쓰임

경로별 코딩 규칙

활성화 방식

사용자가 / 호출

Context 로드 시점

호출 직후

쓰임

프롬프트 단축키

활성화 방식

description 자동 매칭

Context 로드 시점

호출 시 본문 → 필요 시 references

쓰임

다단계 워크플로우

세 도구 모두 CLAUDE.md 대신 필요한 자리에서 필요한 만큼만 Context 에 로드합니다

CLAUDE.md에 모든 규칙을 넣으면 작업과 무관한 규칙까지 매번 로드됩니다. 반복되는 프롬프트도 Context를 낭비합니다. Rules, Commands, Skills 세 도구가 이를 해결합니다.

*   **Rules**: `.claude/rules/` 에 주제별 파일로 규칙을 분리합니다. `paths` frontmatter로 특정 경로에서만 활성화할 수 있어서, 프론트엔드 규칙이 백엔드 작업 중에 로드되지 않습니다.
*   **Custom Commands**: `.claude/commands/` 에 마크다운 파일 하나 = 슬래시 한 단어로 호출. `$ARGUMENTS` 로 입력을 받고, `allowed-tools` 로 승인을 생략할 수 있습니다.
*   **Skills**: 호출할 때만 로드되는 전문 지침입니다. Progressive Disclosure 원리에 따라 이름표 → 본문 → 참조 파일 순서로 필요한 만큼만 단계적으로 로드합니다.
*   **Command vs Skill**: Command는 사용자가 수동 호출하는 프롬프트 단축키, Skill은 Claude가 description을 보고 자동 로드하는 다단계 워크플로우입니다.
*   **Skill 만들기와 설치**: SKILL.md의 `description` 이 Claude의 자동 호출 판단 기준입니다. 직접 만들거나 Skill Creator로 자동 생성할 수 있고, Anthropic 공식 Plugin과 skills.sh (`npx skills add`) 에서 커뮤니티 Skill을 설치할 수 있습니다.
*   **Skill 개선하기**: 수정한 Skill이 실제로 나아졌는지 감으로 판단하지 않습니다. Skill Creator의 Eval로 "수정 전 vs 수정 후" 를 같은 시나리오에 돌려 통과율·토큰·시간을 나란히 비교하면, 개선을 수치로 확인할 수 있습니다. ([참고 자료에서 자세히 보기](/learn/references/skill-improvement-eval))

## [Claude의 범위를 확장하는 외부 도구](#claude의-범위를-확장하는-외부-도구)

Commands와 Skills는 Claude의 지식을 확장합니다. 하지만 Claude가 접근할 수 있는 범위 자체는 로컬 파일과 내장 도구에 묶여 있습니다. CLI와 MCP는 외부 시스템에 접근할 권한을 줍니다.

*   **CLI**: 개발자가 이미 쓰던 터미널 도구를 Claude에게 그대로 빌려줍니다. `gh`·`aws`·`kubectl` 같은 유명 CLI는 Claude가 이미 학습해서 바로 호출합니다. 결과를 파이프로 가공하고, 실행한 명령어를 개발자가 터미널에서 직접 재현할 수 있습니다.
*   **MCP**: MCP를 하나 붙일 때마다 Claude의 Tool 상자가 커집니다. CLI가 주류인 지금도 MCP가 더 유리한 상황은 세 가지입니다. 실행 중인 내 앱 세션에 접근할 때 (Claude in Chrome·Playwright MCP), 공식 CLI가 없는 SaaS에 붙을 때 (Figma·Notion·Linear), `.mcp.json` 을 팀과 공유할 때입니다. Claude Code (Host + Client) 가 서버 프로세스를 띄워 stdio로 통신합니다
*   **Custom MCP**: 공개된 MCP가 없는 내부 시스템은 직접 만들어 연결합니다. MCP Builder Skill을 쓰면 프로젝트 구조·SDK 설정·Tool 정의까지 자동 생성됩니다. Tool의 품질은 `description` (Claude 선택 근거) · `inputSchema` (Claude와의 계약) · 표준 `content` 반환 형식으로 결정됩니다.
*   **Capability vs Procedure**: CLI·MCP는 "Claude가 무엇에 닿을 수 있는가" 를 결정하는 Capability Layer, Skill은 "그 도구를 어떤 순서·기준·형식으로 쓸지" 를 정의하는 Procedure Layer입니다. 결합하면 코드 리뷰 (gh CLI + code-review Skill)·UI 버그 리포트 (Claude in Chrome + ui-bug-report Skill) 같은 반복 워크플로우가 매번 같은 형식으로 나옵니다.

## [실행을 제어하는 도구](#실행을-제어하는-도구)

CLAUDE.md 지침은 AI가 읽고 판단하는 권고이므로 건너뛸 수 있습니다. Hooks와 Custom Agent가 이 한계를 보완합니다. Hook으로 권고를 강제하고, 대량 탐색은 Custom Agent로 별도 컨텍스트에 격리합니다.

*   **Hooks**: CLAUDE.md 지침이 AI가 건너뛸 수 있는 권고라면, Hook은 Claude Code 런타임이 매번 강제로 실행하는 스크립트입니다. Event (언제) · Matcher (어떤 조건) · Handler (무엇을) 세 요소로 구성되고, 세 가지 타이밍 중에서 고릅니다. 실행 전 수정·차단 (PreToolUse), 실행 후 단일 파일 검증 (PostToolUse), 작업 완료 시 통합 검증 (Stop)
*   **Custom Agent**: `.claude/agents/` 에 정의한 전문 Subagent입니다. 핵심은 역할 분담이 아니라 컨텍스트 오염 방지입니다. 대량 탐색·테스트 로그 분석처럼 입력은 방대하지만 결론은 짧은 작업을 별도 컨텍스트에서 처리하고, 메인에는 요약만 돌아와 본 대화의 Context Window를 지킵니다.

## [이어서 배울 내용](#이어서-배울-내용)

Part 2에서 개별 도구를 모두 배웠습니다. Part 3에서는 먼저 [Claude Code Desktop](/learn/completing-projects/claude-code-desktop/terminal-to-desktop)으로 작업 화면을 넓히고, 이 도구를 하나의 사이클로 연결하는 SDD 프레임워크를 배우고, Agent Teams로 확장하고, 개인 프로젝트를 완성합니다.

피드백 남기기

[

Todo 앱 배포하기 | Vercel 배포

강의 저장소에서 clone한 Todo를 본인 GitHub 저장소로 옮기고 Vercel에 연결해 누구나 접속하는 주소로 배포합니다

](/learn/extending-claude/deploy-todo)[

쓰던 그대로, 앱에서 | Claude Code Desktop

Claude Desktop의 Code 탭에서 세션을 만들고, 터미널에서 배운 조작과 설정을 같은 방식으로 씁니다

](/learn/completing-projects/claude-code-desktop/terminal-to-desktop)

---
Source: https://docs.claude-hunt.com/learn/extending-claude/wrap-up
