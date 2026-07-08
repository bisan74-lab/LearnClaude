# Claude Code 토큰 소진 시 Copilot CLI 로 이어가기 | 제대로 배우기

참고 자료

# 토큰 소진 시 Copilot CLI 로 이어가기

Claude Pro 토큰을 다 썼을 때 GitHub Copilot CLI 로 개인 프로젝트를 이어가는 방법을 안내합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

강의 후반부 개인 프로젝트 시간에 Claude Pro 5시간 한도를 다 써서 진도가 막힐 때가 자주 있습니다. 회사에서 GitHub Copilot 구독을 이미 쓰고 있는 분이라면, 같은 프로젝트 디렉터리에서 GitHub Copilot CLI 로 갈아타 실습을 계속할 수 있습니다.

이 페이지는 토큰이 고갈된 자리에서 빠르게 갈아타는 방법을 안내합니다. 핵심은 두 가지입니다.

*   프로젝트 루트의 `CLAUDE.md` 와 `.claude/skills/` 는 Copilot CLI 가 그대로 인식합니다
*   `.claude/agents/` 와 `.claude/commands/` 는 인식 경로가 다르므로 한 번씩 옮겨두면 됩니다

## [빠른 시작](#빠른-시작)

터미널에서 다음 한 줄로 설치합니다. Node 22 이상이 필요합니다.

```
npm install -g @github/copilot
```

설치되면 `copilot` 으로 실행하고, 첫 화면에서 `/login` 을 입력해 회사에서 Copilot 구독을 받은 GitHub 계정으로 로그인합니다. 개인 계정으로 로그인하면 회사 구독이 적용되지 않으니, 두 계정을 같이 쓰고 있다면 회사 계정을 골라 로그인합니다.

```
copilot
```

패키지 매니저로도 설치할 수 있습니다.

```
# macOS
brew install copilot-cli

# Windows
winget install GitHub.Copilot
```

강의 자료 디렉터리로 이동한 뒤 `copilot` 을 실행하면 됩니다.

## [그대로 동작하는 것](#그대로-동작하는-것)

Claude Code 자료를 거의 그대로 재사용할 수 있습니다

프로젝트 루트의 `CLAUDE.md` 와 `.claude/skills/` 는 GitHub Copilot CLI 의 공식 인식 경로에 포함되어 있어 별도 변환 없이 동작합니다.

기능

Copilot CLI 에서의 동작

프로젝트 `CLAUDE.md`

자동 로드

`.claude/skills/<name>/SKILL.md`

자동 로드 ([공식 문서](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills) 에 인식 경로 명시)

MCP 서버

`~/.copilot/mcp-config.json` 에 정의, `/mcp add` 로 추가

Plan Mode

Shift+Tab 으로 토글

세션 재개

`--resume`, `--continue`, `/resume`

IDE 연결

`/ide`

모델 선택

`/model` 또는 `--model` 로 선택 (예: Opus 4.5~4.8, Sonnet 4.5/4.6, Haiku 4.5, Fable 5. 목록은 수시로 바뀜)

## [주의해야 할 차이](#주의해야-할-차이)

### [1\. 커스텀 슬래시 커맨드 (`.claude/commands/`): 미지원](#1-커스텀-슬래시-커맨드-claudecommands-미지원)

Copilot CLI 는 사용자 정의 슬래시 커맨드 메커니즘이 없습니다. 강의에서 만든 `.claude/commands/<name>.md` 파일은 그대로 두면 인식되지 않습니다.

대신 Skill 로 변환합니다. `.claude/skills/` 는 Copilot CLI 의 공식 인식 경로이므로 다음 형태로 옮기면 같은 효과가 납니다.

```
# 변환 전: .claude/commands/review-pr.md
# 변환 후: .claude/skills/review-pr/SKILL.md
mkdir -p .claude/skills/review-pr
mv .claude/commands/review-pr.md .claude/skills/review-pr/SKILL.md
```

호출 방식도 동일하게 `/review-pr` 입니다. SKILL.md 의 frontmatter 에 `name`, `description`, `allowed-tools` 가 들어가는지만 점검합니다.

### [2\. 서브에이전트 (`.claude/agents/`): 인식 안 됨](#2-서브에이전트-claudeagents-인식-안-됨)

Copilot CLI 의 에이전트 인식 경로는 `.github/agents/` 와 `~/.copilot/agents/` 두 곳입니다. `.claude/agents/` 는 공식 문서 어디에도 등장하지 않으며, 실제 동작도 하지 않습니다.

명령어 한 줄로 옮깁니다. Copilot CLI 의 에이전트 파일은 `.agent.md` 확장자를 쓰므로, 옮기면서 이름을 바꿉니다.

```
mkdir -p .github/agents
for f in .claude/agents/*.md; do
  cp "$f" ".github/agents/$(basename "${f%.md}").agent.md"
done
```

호출은 `/agent <name>` 또는 자연어 위임으로 동일합니다.

### [3\. Hooks (`.claude/settings.json`): 스키마 다름](#3-hooks-claudesettingsjson-스키마-다름)

Hooks 기능 자체는 양쪽에 있으나, 파일 위치·이벤트명·스키마 구조가 모두 달라 그대로 쓸 수 없습니다. 강의에서 Hooks 를 만들었다면 새로 작성해야 합니다.

항목

Claude Code

Copilot CLI

파일 위치

`.claude/settings.json` 의 `hooks` 블록

`.github/hooks/*.json` 디렉터리 또는 `.github/copilot/settings.json` 의 `hooks` 블록

이벤트명 표기

PascalCase (`PreToolUse`, `SessionStart`)

camelCase (`preToolUse`, `sessionStart`)

이벤트 종류

약 29개

13개 (`sessionStart`, `sessionEnd`, `userPromptSubmitted`, `preToolUse`, `postToolUse`, `postToolUseFailure`, `preCompact`, `agentStop`, `subagentStart`, `subagentStop`, `errorOccurred`, `notification`, `permissionRequest`)

스키마 구조

matcher 그룹 중첩

평탄한 hook 배열

셸 명령 필드

`command`

`bash` 또는 `powershell`

타임아웃 필드

`timeout`

`timeoutSec`

훅 타입

`command` / `http` / `mcp_tool` / `prompt` / `agent`

`command` 만

이름이 비슷해 보여도 이벤트가 발생하는 시점·전달 데이터가 달라, 표를 보고 한 줄씩 다시 매핑해야 합니다. 개인 프로젝트 시간에는 Hooks 를 수정할 일이 거의 없으니 넘어가도 되지만, Hooks 에 의존하는 워크플로우가 있다면 위 표를 참고해 다시 작성하면 됩니다.

## [공식 출처](#공식-출처)

*   [Supported AI models](https://docs.github.com/en/copilot/reference/ai-models/supported-models)
*   [Create custom agents for CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli)
*   [Add skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
*   [Hooks configuration](https://docs.github.com/en/copilot/reference/hooks-configuration)
*   [Add MCP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers)
*   [Add custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
*   [CLI config directory reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference)

피드백 남기기

[

Skill 개선과 Eval

Skill을 고쳤을 때 실제로 더 좋아졌는지 확인하는 Eval을 Skill Creator로 돌리고, 수정 전·후를 객관적으로 비교합니다

](/learn/references/skill-improvement-eval)[

링크 모음

Claude Code 강의에서 언급한 외부 자료, 도구, 결과물 공유 채널을 한곳에 모았습니다

](/learn/references/links)

---
Source: https://docs.claude-hunt.com/learn/references/copilot-cli-fallback
