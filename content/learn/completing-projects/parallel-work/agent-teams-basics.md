# Claude Code Agent Teams 기초 | 제대로 배우기

Part 3 · 프로젝트 완성하기Chapter 11 · 병렬 작업

# 격리에서 협업으로 | Agent Teams 기초

각 팀원이 독립 Context에서 병렬로 돌면서 서로 직접 대화하는 Agent Teams의 구조와 쓰임새를 배웁니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

격리된 Claude 둘은 같은 파일을 건드리지 않는 대신 서로의 존재를 모릅니다. 같은 문제를 다각도로 보거나 구현 중 결정을 즉시 공유해야 할 때는 격리만으로 부족합니다. Anthropic Agent Teams로 여러 Claude가 독립 Context에서 병렬로 돌면서 서로 직접 대화하는 구조를 다룹니다.

### [학습 목표](#학습-목표)

*   Agent Teams의 기본 구조(리더 · 팀원 · 공유 Task · 직접 메시지)를 설명합니다.
*   Agent Teams가 잘 맞는 세 가지 상황과, 맞지 않는 상황을 구별합니다.
*   Subagent와 Agent Teams의 차이를 한 문장으로 판단할 수 있습니다.

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   Claude Code 최신 버전. `claude --version`으로 확인합니다
*   [SDD 사이클](/learn/completing-projects/spec-driven-development/sdd#sdd-cycle)을 완주한 본인 feedme repo의 `main` 브랜치에서 시작합니다

## [격리만으로는 부족한 순간](#격리만으로는-부족한-순간)

worktree로 두 Agent를 따로 돌리는 것만으로 풀리지 않는 두 가지 상황이 있습니다.

### [한 문제를 여러 관점으로 동시 검토하기](#한-문제를-여러-관점으로-동시-검토하기)

Todo 앱 하나를 보안, 성능, 접근성 관점에서 리뷰해야 한다고 해보겠습니다. Claude 하나에게 순차로 시키면 시간이 세 배로 늘고, 뒤에 나온 리뷰가 앞선 피드백에 무의식적으로 끌려갑니다. worktree로 세 Claude를 따로 돌려도, 각자 자기 리포트만 남기고 끝납니다. 세 관점이 서로의 발견을 교차 검증할 수 없습니다.

### [구현 중 Agent 간 직접 대화하기](#구현-중-agent-간-직접-대화하기)

DB Agent가 `users` 테이블의 `id`를 UUID로 확정했다고 해보겠습니다. 그 순간 Backend Agent가 `user_id` 타입을 UUID로 바꾸지 않으면, 통합 시점에 두 코드가 충돌합니다.

> DB Subagent가 `id`를 UUID로 설계합니다. 동시에 Backend Subagent는 `user_id`를 integer로 가정하고 API를 구현합니다. 두 Subagent는 서로의 존재를 모릅니다. 작업이 끝나고 결과를 합쳐야 충돌을 발견합니다.

Subagent는 결과만 반환하고 종료됩니다. 작업 도중에 옆 Subagent에게 "user\_id 타입이 뭐야?"라고 물어볼 창구가 없습니다. 두 상황 모두 팀원끼리 직접 대화할 채널이 필요합니다.

통신 불가DB Subagentid: UUIDBackend Subagentuser\_id: integerMerge⚠ 통합 시점에 충돌 발견

두 Subagent는 작업 도중에 서로 대화할 채널이 없어, 통합 시점에야 인터페이스 충돌을 발견합니다

## [Agent Teams: 독립 Context와 직접 대화](#agent-teams-독립-context와-직접-대화)

Anthropic 공식 문서는 Agent Teams를 이렇게 정의합니다.

> 팀원은 각자 자기 Context Window 안에서 독립적으로 일하며, 서로 직접 소통합니다.

각 팀원은 자기 Context Window를 갖춘 별도 Claude Code 인스턴스입니다. 공유 Task 리스트로 작업을 나눠 맡고, 필요하면 리더를 거치지 않고 서로 직접 메시지를 주고받습니다. 세 가지 요소로 작동합니다.

Task 생성 / 할당메시지메시지Team Lead조율 전담 (메인 세션)공유 Task 리스트~/.claude/tasks/{team-name}/모든 팀원이 동일 디렉토리 공유DB AgentTeammate · 독립 ContextBackend AgentTeammate · 독립 ContextFrontend AgentTeammate · 독립 Contextpeer-to-peer 메시지 (양방향)Task 연결 (공유 리스트)

각 팀원이 독립 Context 에서 돌면서, 공유 Task 와 팀원 간 직접 메시지로 조율합니다

### [팀 구조: 리더와 팀원](#팀-구조-리더와-팀원)

Agent Teams는 팀 리더(team lead)와 팀원(teammates)으로 구성됩니다.

*   **팀 리더**: 팀을 만들고 Task를 쪼개 팀원에게 할당합니다. 직접 구현하지 않고 조율에 집중합니다. 메인 Claude Code 세션이 리더 역할을 맡습니다.
*   **팀원**: 할당된 Task를 처리합니다. 다른 팀원에게 직접 메시지를 보낼 수 있고, 작업이 끝나면 리더에게 보고합니다. 각자 별도 Claude Code 인스턴스로 실행됩니다.

팀은 세션 단위

Agent Teams는 현재 세션 동안만 유지됩니다. 세션을 종료하면 팀원도 함께 종료됩니다.

### [공유 Task 리스트](#공유-task-리스트)

Task 시스템 자체는 Single Agent에서 쓰던 것과 같습니다. 차이는 여러 Agent가 같은 Task 디렉토리를 공유한다는 점입니다. 팀을 만들면 `~/.claude/tasks/{team-name}/` 디렉토리가 생기고, 모든 팀원이 이 디렉토리를 함께 봅니다.

Agent A가 Task 1을 완료 표시하면, Agent B는 즉시 변경을 확인하고 `blockedBy`가 풀린 다음 Task를 가져갑니다. 여러 Agent가 같은 Task 시스템을 공유하며 조율 레이어로 씁니다.

### [팀원 간 직접 메시지](#팀원-간-직접-메시지)

Task 리스트만으로는 인터페이스 합의 같은 실시간 조율이 어렵습니다. Agent Teams는 팀원끼리 리더를 거치지 않고 메시지를 주고받는 채널을 제공합니다.

*   **특정 팀원에게**: 팀원 이름을 지정해 메시지를 보냅니다. DB 팀원이 스키마를 확정하면 Backend 팀원에게 "`user_id`는 UUID입니다"라고 직접 알립니다.
*   **팀 전체에**: 전원에게 알려야 할 때는 각 수신자에게 메시지를 보냅니다. "API 응답 형식이 변경됐습니다"처럼 팀 전체가 반영해야 하는 결정이 여기에 해당합니다.

메시지는 수신 팀원에게 자동으로 전달됩니다. **팀원끼리 직접 메시지를 주고받는 이 채널이 Subagent와 Agent Teams의 핵심 차이입니다.**

## [Agent Teams가 빛나는 세 상황](#agent-teams가-빛나는-세-상황)

Anthropic 공식 문서가 Agent Teams의 대표 유스케이스로 꼽는 세 가지입니다. 세 상황 모두 병렬 탐색과 직접 조율이 핵심 가치입니다.

### [다각도 리뷰: 병렬 탐색](#다각도-리뷰-병렬-탐색)

여러 팀원이 같은 코드베이스를 다른 관점으로 동시에 검토합니다. 각 팀원은 서로 영향을 주지 않고 독립 리포트를 작성하며, 리더가 이를 종합합니다.

```
> Todo 앱을 다각도로 리뷰하는 에이전트 팀을 구성해줘.

  팀원:
    - security-reviewer: 인증 로직과 사용자 입력 처리에서 보안 취약점 확인
    - perf-reviewer: 리렌더링, 메모이제이션, 상태관리 비효율 분석
    - a11y-reviewer: ARIA, 키보드 내비게이션, 스크린리더 지원 확인

  각 리뷰어가 이슈를 리포트하고, 리드가 종합해 우선순위를 매겨줘.
```

### [경합 가설 디버깅: 상호 반박](#경합-가설-디버깅-상호-반박)

원인을 모르는 버그를 여러 팀원이 서로 다른 가설로 동시에 조사합니다. 한 팀원이 근거를 수집하면서 나온 데이터로 다른 팀원의 가설을 검증하거나 반증할 수 있습니다. 팀원끼리 메시지로 서로 반박합니다.

```
> 배포 후 특정 API 응답이 간헐적으로 느려지는 버그를 조사하는 팀을 구성해줘.

  팀원:
    - db-hypothesis: 쿼리 플랜과 인덱스 사용률 조사
    - network-hypothesis: 네트워크 레이턴시와 타임아웃 패턴 조사
    - cache-hypothesis: 캐시 miss와 TTL 설정 조사

  각자 증거를 수집하고, 다른 팀원의 가설을 반증할 데이터가 나오면
  바로 해당 팀원에게 메시지로 공유해줘.
```

### [크로스레이어 구현: 직접 조율](#크로스레이어-구현-직접-조율)

하나의 기능을 DB · Backend · Frontend 레이어로 쪼개 각 팀원이 한 레이어를 소유합니다. 레이어 간 인터페이스는 메시지로 실시간 확정됩니다.

```
> 사용자 프로필 편집 기능을 구현하는 팀을 구성해줘.

  팀원:
    - schema-agent: DB 스키마 변경
    - api-agent: REST 엔드포인트 구현
    - ui-agent: 편집 폼 컴포넌트 구현
    - test-agent: 위 세 레이어의 통합 테스트 작성

  schema-agent가 스키마를 확정하면 api-agent에게 즉시 메시지.
  api-agent가 응답 형식을 확정하면 ui-agent에게 즉시 메시지.
```

토큰 비용

Agent Teams는 Single Agent보다 훨씬 많은 토큰을 씁니다. 각 팀원이 독립 Context Window를 갖기 때문입니다. 팀은 위 세 상황처럼 "Single Agent로는 구조가 나오지 않는 작업"에 씁니다. Single Agent로도 되는 작업이라면 팀 없이 가는 편이 비용을 아낍니다.

## [\[미션\] 상태관리를 두 갈래로 리팩토링하기](#미션-상태관리를-두-갈래로-리팩토링하기)

실제 팀 구성 프롬프트를 한 사례로 살펴봅니다.

### [Step 1: Agent Teams 활성화하기](#step-1-agent-teams-활성화하기)

Agent Teams는 실험 기능이라 환경 변수로 활성화합니다.

```
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

또는 `.claude/settings.json`에 기록해두면 세션마다 자동 활성화됩니다.

```
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### [Step 2: 팀 구성 프롬프트 작성하기](#step-2-팀-구성-프롬프트-작성하기)

두 접근법을 각각 별도 worktree에서 구현하고, 구현자끼리 토론한 뒤 리더가 최종 선택하는 시나리오입니다.

```
> 상태관리 개선을 위한 에이전트 팀을 구성해줘.

  팀원:
    - zustand-agent: Zustand로 마이그레이션
    - context-agent: React Context + useReducer 패턴으로 변환

  각 팀원은 반드시 별도 worktree에서 독립적으로 구현하고,
  서로 간섭하지 않도록 환경을 분리해.
  구현이 끝나면 팀원끼리 메시지로 장단점을 토론해줘.
  테스트를 통과한 구현만 유효한 것으로 보고, 리드가 최종 선택해줘.
```

팀 리더 Claude가 Task를 만들고 두 팀원을 각각 worktree에 spawn합니다. 두 팀원은 격리된 환경에서 동시에 구현하고, 완료 후 서로 직접 메시지로 장단점을 주고받습니다. 리더는 테스트 결과와 토론 내용을 종합해 최종 접근법을 선택합니다.

### [Step 3: Devil's Advocate 추가하기](#step-3-devils-advocate-추가하기)

같은 팀에 **Devil's Advocate(악마의 변호인)** 역할을 더합니다. 직접 구현하지 않고 두 구현의 설계를 의도적으로 비판하는 팀원입니다.

```
> 위 팀에 devils-advocate 팀원을 추가해줘.

    - devils-advocate: 두 구현의 설계를 비판. 엣지 케이스, 성능 병목,
      팀 컨벤션과의 충돌을 지적. 직접 구현하지 않음.

  구현이 끝나면 devils-advocate가 양쪽 구현을 검토해 약점을 메시지로 전달.
  각 팀원은 반론을 반영해 수정한 뒤, 리드가 최종 선택.
```

구현을 맡은 팀원은 자기 접근법의 장점에 치우치기 쉽습니다. Devil's Advocate는 "왜 Zustand여야 하나? Context로 충분하지 않나?"처럼 전제 자체를 흔드는 질문을 던져 설계 단계에서 약점을 찾아냅니다.

공식 문서의 Devil's Advocate

Anthropic의 [Agent Teams 문서](https://code.claude.com/docs/en/agent-teams)도 Devil's Advocate를 팀 구성 패턴으로 소개합니다. UX · 기술 아키텍처 · Devil's Advocate 세 역할로 팀을 꾸려 설계의 위험을 사전에 드러내는 예시를 다룹니다.

## [Subagent vs Agent Teams: 선택 기준](#subagent-vs-agent-teams-선택-기준)

두 기능 모두 여러 Claude를 쓴다는 점은 같지만, 근본 구조가 다릅니다.

Subagent상위-하위 · 위임Agent Teams동료 · 협업위임위임통신 불가Main AgentSubagent ASubagent B· 단방향 · 작업 끝나면 종료· Task 공유 없음 · 비용 낮음팀원 간 직접 메시지Team LeadTeammate ATeammate B· 양방향 · 세션 동안 지속· Task 공유 · 비용 높음

Subagent 는 결과만 반환하고 종료, Agent Teams 는 팀원끼리 직접 메시지를 주고받으며 세션 동안 지속합니다

기준

Subagent

Agent Teams

**관계**

상위-하위 (위임)

동료 (협업)

**통신**

결과만 반환 (단방향)

팀원 간 직접 메시지 (양방향)

**수명**

작업 끝나면 종료

세션 동안 지속

**Context**

별도 (격리)

독립 + 공유 Task

**팀원 간 소통**

불가

가능

**비용**

낮음

Agent당 독립 Context로 훨씬 큼

핵심 판단 기준은 한 문장입니다.

> "팀원끼리 구현 중에 서로 대화해야 하는가?"

"아니요"라면 Subagent가 맞습니다. 코드 리뷰 한 건, 코드베이스 탐색, 테스트 결과 분석처럼 결과만 돌려받으면 되는 작업에 씁니다.

"예"라면 Agent Teams가 맞습니다. 같은 문제를 다각도로 동시에 탐색하거나, 한 팀원의 발견이 다른 팀원의 작업을 실시간으로 바꾸거나, 인터페이스를 구현 도중에 맞춰야 하는 작업입니다.

Agent Teams가 오히려 과한 경우

Anthropic 공식 문서는 순차 작업, 같은 파일을 편집하는 작업, 의존성이 많아 직렬에 가까운 작업에는 Single Agent나 Subagent가 더 효과적이라고 밝힙니다. 팀원 수가 늘어난다고 언제나 빠른 것은 아닙니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **Agent Teams**: 각 팀원이 자기 Context Window에서 병렬로 돌면서, 리더를 거치지 않고 서로 peer-to-peer로 대화합니다.
2.  **대표 유스케이스**: 다각도 리뷰(병렬 탐색), 경합 가설 디버깅(상호 반박), 크로스레이어 구현(직접 조율). 이 세 상황은 Subagent만으로는 구조적으로 풀기 어렵습니다.
3.  **판단 기준**: "팀원끼리 구현 중에 서로 대화해야 하는가?" 아니라면 Subagent, 맞다면 Agent Teams.

## [FAQ](#faq)

### 팀원끼리 같은 파일을 동시에 수정하면 어떻게 되나요?

### Agent Teams에 몇 명까지 넣을 수 있나요?

### Agent Teams를 쓰면 Task 시스템 자체가 달라지나요?

## [이어서 배울 내용](#이어서-배울-내용)

격리(worktree)와 협업(Agent Teams), 두 가지를 모두 다뤘습니다. 다음 챕터에서는 지금까지 배운 도구를 결합해 개인 프로젝트를 기획하고 처음부터 끝까지 구현합니다.

*   개인 프로젝트 주제 선정과 Spec 작성
*   worktree와 Agent Teams를 결합한 병렬 구현

피드백 남기기

[

여러 세션 한눈에 보기 | Agent View

\`claude agents\`로 백그라운드 세션 여러 개를 한 화면에서 띄우고, 들여다보며, PR 머지까지 가는 흐름을 익힙니다

](/learn/completing-projects/parallel-work/agent-view)[

템플릿으로 첫 화면 띄우기 | 프로젝트 셋업

harness 템플릿을 본인 GitHub 저장소에 복제하고 로컬과 Vercel에서 같은 화면이 뜨는 빈 프로젝트를 갖춥니다

](/learn/completing-projects/personal-project/setup)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/parallel-work/agent-teams-basics
