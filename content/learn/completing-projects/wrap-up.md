# Claude Code Part 3 정리 | 제대로 배우기

Part 3 · 프로젝트 완성하기

# Part 3 정리

Part 3에서 배운 Claude Code Desktop, SDD 6단계 사이클, 단계별 검증 도구, Compound 승격, Git Worktree·Agent Teams를 정리합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Claude Code Desktop: 두 번째 화면](#claude-code-desktop-두-번째-화면)

터미널로 배운 Claude Code를 앱 화면에서도 이어 씁니다. 조작과 설정은 그대로 이어지고, 검토와 실행 환경이 넓어집니다.

*   **Code 탭으로 시작**: 권한 모드·세션 복귀·Skill 실행이 버튼·사이드바·입력창으로 이어지고, `CLAUDE.md`·Skills·Hooks·MCP 설정을 같은 파일에서 공유합니다. CLI 세션을 Desktop에서 이어 보고 싶을 때는 `/desktop` 을 실행합니다.
*   **눈으로 하는 검증**: diff 라인 코멘트로 수정 위치를 정확히 다시 요청하고, Review code로 신호 큰 문제를 거른 뒤, Preview·내장 터미널로 실행 결과까지 세션 안에서 확인합니다.
*   **컴퓨터를 벗어난 세션**: 실행 환경은 Local·Cloud·SSH 세 가지입니다. Cloud 세션은 앱을 꺼도 계속되고 웹과 폰에서 이어받으며, 반복 작업은 예약 작업으로 자동 실행합니다.

## [SDD: 도구를 하나의 사이클로 묶기](#sdd-도구를-하나의-사이클로-묶기)

Part 2에서 익힌 도구가 6단계 사이클의 부품으로 들어옵니다. SDD는 아이디어부터 배포까지를 6단계로 이어 가는 프레임워크입니다.

### [6단계와 도구 배치](#6단계와-도구-배치)

다음 사이클의 도구 갱신1\. Ideateidea.md2\. Specifyspec.md3\. Sketchwireframe.html4\. Planplan.md5\. Build코드 + learnings.md6\. CompoundSkill · Hook 갱신

각 단계의 출력이 다음의 입력 — Compound가 다음 사이클의 도구를 갱신합니다

*   **6단계 사슬**: Ideate → Specify → Sketch → Plan → Build → Compound. 각 단계 산출물 (idea.md → spec.md → wireframe.html → plan.md → 코드·커밋 → learnings.md)이 다음 단계 입력으로 이어집니다.
*   **슬래시 커맨드로 단계 실행**: `/idea-refine`·`/write-spec`·`/sketch-wireframe`·`/draft-plan`·`/execute-plan`·`/compound`가 6단계에 1:1 로 대응합니다. Skills·Agents·Hooks·Rules·CLAUDE.md 다섯 layer가 단계마다 미리 자리를 잡습니다.
*   **Spec이 사이클 전체를 결정**: 같은 도구라도 Spec이 모호하면 결과가 흔들립니다. 변경 비용이 큰 결정 (인증, 데이터 모델, 외부 API)은 Spec에서 먼저 드러내고, 색상·버튼 문구는 기본값에 맡깁니다.
*   **What과 How의 분리**: spec.md는 "사용자가 무엇을 보게 되는가" 만, plan.md가 "어떻게 구현하는가" 를 맡습니다. 한 문서에 섞으면 양쪽 검토가 모두 약해집니다.

### [단계마다 다른 검증 장치](#단계마다-다른-검증-장치)

각 단계마다 자기 산출물을 검증하는 도구가 따로 있습니다.

*   **wireframe.html로 레이아웃 먼저**: spec 다음에 코드를 바로 작성하지 않고 한 HTML 파일에 base 화면과 시나리오별 화면을 모아 좌우로 비교합니다. Screen Notes에는 화면 흐름만 적고 비즈니스 로직은 plan으로 미룹니다.
*   **수용 기준이 자동 테스트로**: spec의 수용 기준을 RED → GREEN 테스트로 변환해 Build 사이클을 이끕니다. 관찰 가능한 동작은 자동으로 검증하고, 디자인·접근성처럼 사람 판단이 필요한 부분만 Human review로 남깁니다.
*   **plan-reviewer의 4축 정합성**: `Coverage` (spec 시나리오 → plan Task 매핑) · `plan 내부 정합성` · `wireframe 일관성` · `불변 규칙 커버리지` 네 축으로 plan.md를 머지 전에 점검합니다.
*   **code-reviewer의 5차원 리뷰**: 정확성·가독성·아키텍처·보안·성능 다섯 축으로 코드를 검토합니다. Critical은 즉시 고친 뒤 영향 테스트를 다시 돌리고, Important는 사용자가 판단하며, Suggestion은 다음 사이클로 미룹니다.
*   **Vercel + GitHub으로 push가 곧 배포**: 한 번 Import 하면 이후 push마다 자동 빌드, PR마다 Preview URL이 생성됩니다. 빌드 실패 시 로컬 `bun run build` 재현 여부로 코드 문제와 환경변수 누락을 가릅니다.

### [강한 신호는 즉시, 약한 신호는 누적](#강한-신호는-즉시-약한-신호는-누적)

언제

*   /execute-plan Step 6 (구현 도중 발견)

applied 상태

*   rule (즉시 적용)

예시

*   같은 에러를 두 번 만남
*   plan에 빠진 규약을 발견
*   명백한 보안·데이터 손실 위험

언제

*   /compound (3~5 사이클 누적 후)

applied 상태

*   not-yet (누적 대기) → rule (승격 후)

예시

*   PR마다 반복되는 코드 톤 지적
*   매번 재발견되는 디렉터리 패턴
*   여러 feature에서 반복된 우회

강한 신호는 한 사이클 안에서 즉시 승격, 약한 신호는 여러 사이클 누적 후 승격됩니다

같은 사이클을 여러 번 돌리면 두 종류의 학습이 쌓입니다.

*   **강한 신호는 즉시 승격**: `/execute-plan` 중 사용자가 손으로 고친 적이 있는 패턴은 끝나는 자리에서 learnings.md에 `applied: rule`로 표시되며 바로 도구로 올라옵니다.
*   **약한 신호는 누적 후 Compound**: 한 사이클에서는 우연처럼 보이지만 3~5 사이클 쌓이면 패턴이 드러납니다. `applied: not-yet`으로 모아 두면 `/compound`가 회고 단계에서 꺼냅니다.
*   **승격 자리는 네 곳**: 제약 위반은 Rule, 기계적 검사는 Hook, 잘못된 사용법은 Skill, 아키텍처 결정은 CLAUDE.md. 분기 기준이 정해져 있어 같은 신호가 두 자리에 중복되지 않습니다.

## [병렬 작업: 격리와 협업](#병렬-작업-격리와-협업)

한 명의 Claude로 충분하지 않은 순간이 옵니다. 두 갈래 가설을 동시에 시도하거나 서로 다른 레이어를 동시에 손대야 할 때, 격리와 협업에는 서로 다른 도구가 필요합니다.

### [Git Worktree: 폴더 단위 격리](#git-worktree-폴더-단위-격리)

*   **브랜치만으로는 부족**: 한 폴더에는 브랜치가 하나뿐이어서 같은 작업 공간에서 두 Claude가 일하면 파일이 충돌합니다. git worktree는 `.git`을 공유하면서 작업 폴더만 분리해, 같은 파일을 동시에 수정해도 서로 영향이 없습니다.
*   **`claude -w <name>` 한 줄로 생명주기 자동화**: 워크트리 생성 (`.claude/worktrees/<name>/`), 브랜치 생성 (`worktree-<name>`), 진입, 세션 종료 시 Keep / Remove 정리까지 한 명령에 묶입니다. 중단된 작업은 워크트리만 남겨 두면 `--continue`로 그대로 이어갑니다.

### [Subagent와 Agent Teams의 분기](#subagent와-agent-teams의-분기)

Subagent상위-하위 · 위임Agent Teams동료 · 협업위임위임통신 불가Main AgentSubagent ASubagent B· 단방향 · 작업 끝나면 종료· Task 공유 없음 · 비용 낮음팀원 간 직접 메시지Team LeadTeammate ATeammate B· 양방향 · 세션 동안 지속· Task 공유 · 비용 높음

Subagent 는 결과만 반환하고 종료, Agent Teams 는 팀원끼리 직접 메시지를 주고받으며 세션 동안 지속합니다

*   **분기 기준은 한 문장**: "팀원끼리 구현 중 직접 대화해야 하는가". 다각도 병렬 리뷰, 경합 가설 디버깅, 크로스레이어 구현이 그 대화가 필요한 대표 상황입니다. 그 외에는 Subagent로 충분합니다.
*   **Agent Teams 구성**: 실험 플래그 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`로 켭니다. 리더 + 팀원 2~4 명이 각자의 worktree와 독립 Context에서 일하면서 `~/.claude/tasks/<team>/` 공유 Task 리스트와 peer-to-peer 메시지로 협업합니다.

## [이어서 배울 내용](#이어서-배울-내용)

[전체 코스 정리](/learn/wrap-up)에서 Part 1·2·3을 한 페이지로 압축합니다. 이후 학습 방향으로는 Compound Engineering과 Conductor·Subagent + Worktree로 하는 병렬 작업 확장을 다룹니다.

피드백 남기기

[

내 아이디어 구현하기 | Practice

SDD 6단계 사이클을 본인 아이디어에 직접 적용해 Spec 작성부터 Vercel 배포까지 한 사이클을 완주합니다

](/learn/completing-projects/personal-project/practice)[

전체 코스 정리

Claude Code 전체 코스를 간결하게 요약하고, Compound Engineering과 비동기·병렬 에이전트 등 이후 학습 방향을 안내합니다

](/learn/wrap-up)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/wrap-up
