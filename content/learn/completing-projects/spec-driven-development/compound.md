# Claude Code Compound | 제대로 배우기

Part 3 · 프로젝트 완성하기Chapter 10 · 스펙 주도 개발

# 신호를 도구로 만들기 | Compound

한 사이클에서 만난 강한 신호는 그 자리에서, 약한 신호는 여러 사이클에 걸쳐 쌓인 뒤 Skill·Hook·Rule·CLAUDE.md로 만들어집니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

`push` 하고 Vercel 자동 배포까지 끝났고, 한 사이클의 판단·실패·우회 흔적이 `artifacts/feedme/learnings.md`에 기록됐습니다. 이번 레슨은 SDD 6단계의 마지막인 Compound, 한 사이클에서 얻은 학습이 다음 사이클의 도구가 되는 과정을 살펴봅니다. 한 사이클만 돌렸으므로 도구 갱신을 직접 해보기보다 개념과 시뮬레이션으로 다룹니다.

### [학습 목표](#학습-목표)

*   `/compound` 호출 시점, 패턴 후보 검토, 승격 방식 선택, 이 세 가지 결정 지점을 구별합니다.
*   강한 신호와 약한 신호를 구별해 즉시 승격할지 누적할지 가릅니다.
*   반복 유형을 보고 Rule·Hook·Skill·CLAUDE.md 중 어느 방식으로 만들지 판단합니다.

## [Compound가 만드는 가속](#compound가-만드는-가속)

Compound는 한 장의 그림으로 정리됩니다.

시간 →Cycle 1Cycle 2Cycle 3…learningslearningslearnings\+ Rule\+ Skill\+ Hook

사이클이 도구를 만들고, 도구가 다음 사이클을 짧게 줄입니다

사이클마다 learnings에서 도구(Rule·Hook·Skill·CLAUDE.md)를 만들어 두면, 다음 사이클에서 같은 실수를 미리 막을 수 있습니다. 사이클이 반복될수록 도구는 쌓이고, 사이클은 짧아집니다. 이 자기강화 루프가 Compound Engineering의 정신입니다.

## [두 종류의 학습: 즉시 승격과 누적 회고](#두-종류의-학습-즉시-승격과-누적-회고)

`learnings.md`에 들어가는 학습은 신호의 강도에 따라 두 갈래로 갈립니다.

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

즉시 승격은 강한 인사이트 1개로 충분합니다. 같은 에러를 두 번 만났다면 다음에도 일어나기 쉬우므로, 그 자리에서 Rule이나 Hook으로 만듭니다. `/execute-plan` Step 6에서 자동으로 실행됩니다.

누적 회고는 약한 신호가 패턴으로 굳을 때까지 기다립니다. 한 번만 보인 어색함은 우연일 수 있지만, 3~5개 사이클에 걸쳐 같은 형태로 반복되면 도구로 만들 만한 신호입니다. `/compound`가 쌓인 약한 신호를 한꺼번에 분석합니다.

## [약한 신호의 정의](#약한-신호의-정의)

`/compound`가 1차로 분석하는 입력은 모든 `artifacts/*/learnings.md`의 `applied: not-yet` 항목입니다. 즉시 도구로 만들어진 항목(`applied: rule`)은 이미 반영되었고, 일회성으로 판정된 항목(`applied: discarded`)은 의도적으로 제외됩니다.

`not-yet` 외에도 다음도 약한 신호에 해당합니다. AI가 매끄럽게 끝내지 못해 사람이 한 번 더 손댄 부분이 모두 약한 신호입니다.

신호

의미

복구 경로를 거친 실패

빌드/테스트 실패 → 우회 → 재시도, 우회 자체가 학습 대상

같은 에러에 두 번 이상 걸림

한 번이면 우연, 두 번이면 패턴

Human Review에서 반복 지적된 패턴

사용자가 같은 형태의 코드를 매번 고친다면 규칙 후보

수동 개입이 필요했던 상황

AI가 끝내지 못해 사용자가 손댄 부분

이 신호가 누적되면 한 사이클로는 보이지 않던 패턴이 보이기 시작합니다.

## [4가지 승격 방식: Rule · Hook · Skill · CLAUDE.md](#4가지-승격-방식-rule--hook--skill--claudemd)

같은 반복이라도 어떤 방식으로 도구화하느냐에 따라 비용이 달라집니다. **기준은 어떤 방식이 가장 적은 비용으로 재발을 막느냐입니다.**

반복 유형

승격 대상

예시

같은 제약 위반이 반복됨

**Rule**

`.tsx에서 px 단위 금지`, `components/ui/* 직접 수정 금지`

100% 기계적으로 잡아야 하는 것

**Hook**

git commit 직전 `bun run build`(`PreToolUse`), Claude가 파일을 편집한 직후 linter 자동 실행(`PostToolUse`)

잘못된 사용 패턴(올바른 방법을 가르쳐야 함)

**Skill**

shadcn 컴포넌트 설치·조합법, 특정 라이브러리 도입 가이드

아키텍처 결정 변경

**CLAUDE.md**

순방향 의존성 순서, 패키지 매니저 결정

새 Skill은 라이브러리·도구 단위로 만듭니다. 더 작게 쪼개면 Skill이 쌓여 검색·관리 비용이 커지고, 더 크게 묶으면 description으로 트리거하기 어려워집니다.

## [시뮬레이션: 누적 learnings의 패턴 도출](#시뮬레이션-누적-learnings의-패턴-도출)

본 챕터에서는 feedme.wiki 한 사이클만 돌렸지만, 4개 사이클이 쌓인 상태라면 `/compound`가 어떤 패턴을 발견하는지 살펴봅니다. 다음은 가상으로 쌓인 learnings 입니다.

```
artifacts/feedme/learnings.md:
- "변환 결과 영역에 px 단위로 hardcoded margin 발견 → spacing token으로 수정"

artifacts/share-link/learnings.md:
- "복사 버튼에 px hardcoded → spacing token으로 수정"

artifacts/comments/learnings.md:
- "댓글 카드 padding이 px → spacing token으로 수정"

artifacts/profile/learnings.md:
- "프로필 헤더 margin이 px → spacing token으로 수정"
```

`/compound`가 분석한 결과는 다음과 같습니다.

```
패턴: .tsx에서 px 단위가 4개 feature에 걸쳐 반복 발견됨
승격 대상: Rule (제약 위반의 반복)
제안: .claude/rules/no-px-in-tsx.md 생성

  description: tsx/jsx에서 px 단위 사용 금지
  paths:
    - "**/*.tsx"
    - "**/*.jsx"
  내용: spacing token (gap-2, p-4 등) 또는 CSS variable을 사용한다.

→ 사용자 승인 후 적용. 이후 사이클부터 AI가 자동으로 이 규칙을 따른다.
```

비슷한 패턴을 100% 기계적으로 잡을 수 있다면 Hook(예: lint 규칙 추가), 잘못된 사용법이라면 Skill, 아키텍처 결정이라면 CLAUDE.md로 만듭니다. 사용자가 어느 방식으로 만들지 최종 결정합니다.

## [패턴 후보 검토 기준](#패턴-후보-검토-기준)

`/compound`가 제안한 패턴 후보를 검토할 때는 네 가지 기준을 봅니다.

1.  신호 누적량이 충분한가? 3~5개 사이클 미만이면 보류하고 더 쌓습니다.
2.  반복 유형이 네 가지 중 어디에 해당하는가? 분류가 모호하면 `applied: not-yet`으로 두고 다음 사이클을 기다립니다.
3.  제안된 방식이 반복 유형과 매칭되는가? Rule·Hook·Skill·CLAUDE.md 매칭은 위 표를 따릅니다.
4.  패턴이 spec 범위 안에 있는가? 범위를 벗어난 패턴은 거부하고 근거를 `learnings.md`에 남깁니다.

## [한 사이클로는 보이지 않는 이유](#한-사이클로는-보이지-않는-이유)

본 챕터에서 만든 `learnings.md` 한 개로는 `/compound`의 가치가 잘 보이지 않습니다. 신호가 한 사이클에 한 번만 나타나면 패턴인지 우연인지 구분하기 어렵습니다.

Compound는 다음 feature 사이클부터 가치가 드러납니다. 같은 프로젝트에서 두 번째, 세 번째 feature를 SDD 사이클로 만들고 나면, 첫 사이클에서 못 보던 반복이 보이기 시작합니다. 그때 `/compound`를 호출하면, 쌓인 약한 신호가 한꺼번에 도구로 만들어집니다.

도구가 갱신되면 다음 사이클은 더 빠릅니다. Rule을 추가해 같은 에러를 미리 막고, Skill을 추가해 같은 라이브러리 사용법을 다시 설명하지 않아도 됩니다. [Compound가 만드는 가속](#compound%EA%B0%80-%EB%A7%8C%EB%93%9C%EB%8A%94-%EA%B0%80%EC%86%8D)에서 본 플라이휠이 두 번째 사이클부터 돌기 시작합니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **두 종류의 학습**: 강한 신호는 `/execute-plan` Step 6에서 즉시 도구로 만들어지고, 약한 신호는 `/compound`에서 쌓인 뒤 만들어집니다.
2.  **약한 신호 = 사람 손이 닿은 흔적**: 우회·재시도·반복 지적·수동 개입이 모두 약한 신호입니다. 한 번이면 우연, 여러 번이면 패턴입니다
3.  **4가지 승격 방식**: 제약 위반 → Rule, 기계적 검사 → Hook, 잘못된 사용법 → Skill, 아키텍처 결정 → CLAUDE.md
4.  **누적이 핵심**: 한 사이클로는 보이지 않습니다. 3~5개 사이클이 쌓여야 약한 신호가 패턴으로 드러나고, 그때 도구로 만들어집니다.

## [FAQ](#faq)

### 한 사이클만 돈 지금, /compound를 호출하면 어떻게 되나요?

### applied: discarded는 무엇인가요?

### 같은 패턴을 Rule로 할지 Hook으로 할지 애매하면?

## [이어서 배울 내용](#이어서-배울-내용)

SDD 6단계 흐름을 처음부터 끝까지 살펴봤습니다. 다음 챕터부터는 한 Claude 사이클을 둘 이상 동시에 돌리는 단계로 넘어갑니다. 먼저 git worktree로 각 Claude에게 독립된 작업 폴더를 주는 격리 방법을 익히고, 이어 여러 Claude가 직접 협업하는 Agent Teams를 배웁니다.

피드백 남기기

[

한 Task씩 구현하기 | Build

/execute-plan이 TDD 구현·code-reviewer 리뷰·learnings.md 기록을 한 사이클로 묶습니다

](/learn/completing-projects/spec-driven-development/implementing)[

한 폴더, 한 브랜치 | Git Worktree 격리

git worktree로 여러 Claude에게 독립 작업 폴더를 주고, claude -w로 worktree 생성부터 정리까지 자동화합니다

](/learn/completing-projects/parallel-work/git-worktree-isolation)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/spec-driven-development/compound
