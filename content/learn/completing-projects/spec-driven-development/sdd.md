# Claude Code 스펙 주도 개발(SDD) | 제대로 배우기

Part 3 · 프로젝트 완성하기Chapter 10 · 스펙 주도 개발

# 명세가 결정하는 6단계 사이클 | SDD

Part 2 도구를 하나의 사이클로 묶는 SDD 6단계와 Spec이 나머지를 결정하는 이유를 살펴봅니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

Part 2에서 Plan/Task, Rules, Skills, MCP, Hooks, Custom Agent를 배웠습니다. 도구는 강력하지만, 이 도구를 부르는 시작점, "무엇을 만들 것인가"를 정의하는 단계는 여전히 손으로 해야 했습니다.

이 레슨에서는 Part 2의 도구를 하나의 사이클로 묶는 SDD(Specification-Driven Development) 6단계를 다룹니다.

### [학습 목표](#학습-목표)

*   위임 범위가 커질수록 명세가 필요한 이유를 설명합니다
*   SDD 6단계 사이클과 각 단계의 입출력을 구별합니다
*   SDD에서 개발자가 가장 주의를 쏟아야 할 단계가 어디인지 판단합니다

## [도구는 모았지만 시작점이 비어 있는 이유](#도구는-모았지만-시작점이-비어-있는-이유)

[테스트 기반 검증 레슨](/learn/extending-claude/plan-task/test-based-verification)에서 테스트를 정답지로 활용했습니다. 테스트 몇 개를 정답지로 주면 함수 하나는 AI에게 맡길 수 있었습니다. AI가 정답지를 보고 스스로 검증하며 구현했기 때문입니다.

위임의 범위가 커지면 이야기가 달라집니다. "결제 흐름을 통째로 만들어줘"처럼 여러 화면이 연결되고 사용자 시나리오가 3개 이상인 기능을 한 번에 맡기려면, 테스트 몇 개로는 부족합니다. AI가 정해야 할 사항이 너무 많고, 정답지 없는 빈칸을 추측으로 채울 수밖에 없습니다.

경계 두께 ↑위임 단위 →1\. 함수 한 개단위 · 입출력 정의경계 · 테스트 몇 개Plan / Task + 테스트2\. 화면 · 컴포넌트단위 · 시나리오 3~5개경계 · 성공 기준 + UI 구조Plan / Task + Skill3\. 기능 전체단위 · 여러 화면 · 시스템 연결경계 · spec.md (명세)SDD 6단계 사이클

위임 단위가 커질수록 경계가 더 단단해져야 합니다

선반 하나를 만들 때는 치수 메모면 충분하지만, 3층 건물을 올리려면 설계도가 필요합니다. 위임 단위가 커질수록 경계, 즉 명세가 더 단단해져야 합니다.

## [SDD: 명세를 기반으로 개발하기](#sdd-cycle)

**SDD(Specification-Driven Development)**는 명세를 먼저 쓰고, 그 명세를 바탕으로 코드를 만드는 개발 사이클입니다.

다음 사이클의 도구 갱신1\. Ideateidea.md2\. Specifyspec.md3\. Sketchwireframe.html4\. Planplan.md5\. Build코드 + learnings.md6\. CompoundSkill · Hook 갱신

각 단계의 출력이 다음의 입력 — Compound가 다음 사이클의 도구를 갱신합니다

단계

정의하는 것

산출물

**Ideate**

모호한 아이디어를 추진할 형태로 정리

`idea.md` (선택)

**Specify**

"무엇을": 시나리오, 성공 기준, 미결정 사항

`spec.md`

**Sketch**

"어떻게 보이는가": 화면 구조, 컴포넌트 배치

`wireframe.html`

**Plan**

"어떻게 만드는가": Task 분해, 의존성 순서

`plan.md`

**Build**

코드 작성, 수용 기준으로 검증

코드 + 커밋 + `learnings.md`

**Compound**

누적된 약한 신호를 원칙으로 승격

Skill·Hook·Rule·CLAUDE.md 갱신

각 단계의 출력이 다음 단계의 입력이 됩니다. Specify의 spec.md가 Sketch로 들어가고, spec.md와 wireframe.html이 Plan으로 들어가며, plan.md가 Build로 들어갑니다. Build의 결과는 Specify가 정한 성공 기준으로 검증되고, 그 과정에서 배운 것은 Compound에 쌓여 다음 사이클의 시작 조건을 바꿉니다.

## [지금 SDD가 가능한 이유](#지금-sdd가-가능한-이유)

명세를 먼저 쓰는 방법론 자체는 새롭지 않습니다. 전통적으로는 명세를 사람이 쓰고, 사람이 코드로 옮겼습니다. AI가 자연어 명세를 읽고 구현할 수 있게 되면서, 명세 자체가 실행 가능한 입력이 됩니다.

변경이 필요하면 코드 대신 명세를 고치고 다시 생성합니다. 코드를 고치는 것보다 문서를 고치는 비용이 낮으므로, 사이클 전체가 더 자주 돌 수 있습니다.

## [Spec이 나머지를 결정하는 이유](#spec이-나머지를-결정하는-이유)

올바른 방향SpecifySketchPlanBuildCompoundSpec의 작은 오차 → 후속 단계로 갈수록 빠르게 커짐

AI는 사고를 증폭합니다 — Spec이 잘못되면 후속 4단계가 같은 방향으로 잘못됩니다

AI는 사람의 판단을 증폭합니다. 그래서 Spec이 잘못되면 Sketch, Plan, Build, Compound가 같은 방향으로 빠르게 잘못됩니다. **SDD에서 개발자가 가장 주의를 쏟아야 할 단계는 Specify입니다.** Sketch부터는 자동화 비율이 올라가지만, "무엇을 만들 것인가"를 정의하는 일은 사람의 판단이 결과를 가장 크게 가릅니다.

## [다양한 SDD 접근법](#다양한-sdd-접근법)

명세를 중심으로 AI와 협업하는 아이디어는 같지만, 커뮤니티에서 다양한 워크플로우가 등장했습니다.

**spec-kit**(GitHub)은 Spec 중심 접근법입니다. `specify init`으로 프로젝트를 초기화한 뒤 `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement` 슬래시 커맨드로 단계를 실행합니다. Claude Code, Copilot, Gemini 등 30종 이상의 코딩 에이전트와 연동됩니다.

**Superpowers**(obra)는 방법론 중심 접근법입니다. Brainstorming → Planning → TDD → Code Review → Finishing 사이클을 따르며, 엄격한 Red-Green-Refactor와 Subagent 기반 개발을 강조합니다. Claude Code를 비롯해 Codex, Cursor, Gemini CLI, OpenCode 등 여러 에이전트를 지원합니다.

**oh-my-claudecode**(Yeachan-Heo)는 오케스트레이션 중심 접근법입니다. Team, Autopilot, Ultrawork, Ralph 등 7가지 실행 모드와 19개의 특화 에이전트, 스마트 모델 라우팅을 제공합니다. 대규모 병렬 작업에 특화되어 있습니다.

이 강의에서는 각 접근법의 핵심을 조합해 6단계로 정리했습니다. 이 챕터의 워크플로우는 그 조합의 한 형태입니다.

## [워크플로우 커스터마이징](#워크플로우-커스터마이징)

Claude Code에서는 Skills, Rules, Hooks를 손봐 자신만의 워크플로우를 만들 수 있습니다. 이 강의에서 쓰는 6단계가 정답은 아닙니다.

완주 먼저, 커스텀은 다음입니다. 이 챕터에서 SDD 사이클을 처음부터 끝까지 경험한 뒤, 자신의 프로젝트에 맞게 단계를 더하거나 빼는 것을 권합니다. 한 사이클에서 배운 것을 Compound 단계에서 Skill·Hook·Rule·CLAUDE.md에 저장해두면, 다음 사이클은 새로워진 도구로 시작합니다. 워크플로우를 자기 것으로 다듬는 자리가 바로 Compound입니다.

수강생 프로젝트 공유 사이트 [claude-hunt.com](https://claude-hunt.com)도 이 6단계 사이클로 만들었습니다. spec, plan, learnings 같은 SDD 산출물이 그대로 [저장소](https://github.com/toy-crane/claude-hunt)에 남아 있어, 사이클을 한 번 완주한 결과물이 실제로 어떻게 보이는지 참고할 수 있습니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **위임 범위와 경계**: 함수 위임은 테스트 몇 개로 충분하지만, 기능 전체 위임에는 명세라는 더 단단한 경계가 필요합니다.
2.  **SDD 6단계 사이클**: Ideate → Specify → Sketch → Plan → Build → Compound 순으로 이어지며, 각 출력이 다음 단계 입력이 되고 학습은 Compound로 누적됩니다.
3.  **Spec이 가장 중요한 단계**: AI가 사고를 증폭하므로 Specify의 빈칸과 추측이 후속 단계 전체로 퍼지며, 사람의 판단이 가장 크게 필요한 자리입니다.

## [FAQ](#faq)

### 작은 기능에도 SDD를 써야 하나요?

### 요구사항 문서를 AI가 대신 작성하면, 결국 AI가 추측하는 것 아닌가요?

## [이어서 배울 내용](#이어서-배울-내용)

다음 레슨에서는 SDD 6단계 사이클이 미리 갖춰진 엔지니어링 템플릿을 클론하고, 각 도구가 어떤 단계를 맡는지 확인합니다.

피드백 남기기

[

정해둔 시간에 알아서 | Routines

프롬프트와 저장소를 한 번 저장해두고 정해진 때에 스스로 도는 Cloud 루틴을 만들어 즉시 실행해 봅니다

](/learn/completing-projects/claude-code-desktop/routines)[

템플릿으로 SDD 6단계 시작하기 | 프로젝트 셋업

엔지니어링 템플릿을 클론하고 도구 구성과 Vercel 배포까지 한 번에 갖춰 SDD 사이클 시작 환경을 만듭니다

](/learn/completing-projects/spec-driven-development/project-setup)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/spec-driven-development/sdd
