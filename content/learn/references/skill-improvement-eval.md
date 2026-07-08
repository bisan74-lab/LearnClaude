# Claude Code Skill 개선과 Eval | 제대로 배우기

참고 자료

# Skill 개선과 Eval

Skill을 고쳤을 때 실제로 더 좋아졌는지 확인하는 Eval을 Skill Creator로 돌리고, 수정 전·후를 객관적으로 비교합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

Skill 을 한두 번 돌려보고 "잘 되는 것 같은데" 로 넘긴 뒤, description 을 다듬거나 단계를 재배열했을 때 정말로 나아졌는지 판단하기 어렵습니다. 모델 출력이 매번 달라지기 때문입니다.

이 페이지는 Skill Creator 의 Eval(평가 테스트) 로 Skill 품질을 숫자로 재고, 수정 전·후를 같은 시나리오에 돌려 통과율·토큰·시간을 나란히 비교하는 방법을 정리합니다. 팀이 함께 쓰는 Skill 을 다듬거나 한 Skill 을 여러 차례 고칠 계획이라면 참고하세요. [Skill 만들기](/learn/extending-claude/adding-knowledge/creating-skills) 의 `commit` Skill 을 기준으로 설명합니다.

## ["잘 되는 것 같은데"의 함정](#잘-되는-것-같은데의-함정)

commit Skill을 만든 직후 한두 번 돌려봤더니 잘 됩니다. 그래서 다른 Skill 작업으로 넘어갑니다. 며칠 뒤 동료가 묻습니다. "description이 좁아 보이는데 '변경사항 반영해줘'라고 해도 호출이 될까요?" 갑자기 막힙니다.

Skill 품질 평가가 까다로운 이유는 출력이 매번 달라지기 때문입니다. 같은 프롬프트에도 모델이 10번 중 9번은 원하는 결과를, 한 번은 엉뚱한 결과를 낼 수 있습니다. 몇 번 돌려보고 "잘 된다"고 판단하면 확률에 기댄 결론입니다.

더 중요한 상황은 Skill을 수정할 때입니다. description을 다듬고, 참조 파일을 추가하고, 단계를 재배열합니다. 고친 뒤 "전보다 나아진 건가?" 머릿속 비교로는 답이 안 나옵니다.

## [Eval: 세 조각으로 이루어진 객관적 판정](#eval-세-조각으로-이루어진-객관적-판정)

Eval(평가)은 Skill이 기대대로 동작하는지 확인하는 테스트입니다. 소프트웨어 단위 테스트와 같은 개념이지만, 검사 대상이 코드가 아니라 Skill의 출력입니다. 한 번의 Eval은 세 조각으로 이루어집니다.

1.  테스트 프롬프트: Skill에 보낼 입력. "이 변경사항을 커밋해줘"
2.  기대 결과: 좋은 결과의 기준. "Conventional Commit 형식이어야 하고, scope가 포함돼야 한다"
3.  판정: Skill이 만든 결과가 기준을 충족하는지 자동으로 확인

여러 Eval을 모아두면 Skill을 수정할 때마다 전부 다시 돌려서 "10개 중 10개 통과" 또는 "3번이 깨졌다"를 즉시 확인할 수 있습니다.

## [Skill Creator로 Eval 작성하기](#skill-creator로-eval-작성하기)

Skill Creator 플러그인을 설치하고 시작합니다. commit Skill 의 Eval 을 Skill Creator 로 작성합니다.

```
/skill-creator commit Skill 에 대한 Eval 을 작성해줘. 정상 커밋, 여러 파일 수정, 부정 트리거 시나리오를 포함해줘.
```

Skill Creator가 SKILL.md를 분석해 다음 시나리오를 제안합니다.

*   **시나리오 1 (정상)**: 단일 파일 수정 후 커밋 요청 → type·scope가 포함된 Conventional Commit 형식인가?
*   **시나리오 2 (범위 판단)**: 여러 파일 수정 후 커밋 요청 → 변경 범위에 맞는 scope를 선택했는가?
*   **시나리오 3 (부정 트리거)**: "git rebase가 뭐야?" 질문 → Skill이 트리거되지 않는가?

각 시나리오는 "테스트 프롬프트 + 기대 결과" 쌍으로 저장해 둡니다. 실행하면 각 시나리오의 통과·실패, 소요 시간, 토큰 사용량을 확인할 수 있습니다.

시나리오를 몇 개나 만들어야 할까

정상 흐름 1-2개, 경계 케이스 (예상 밖 입력) 1-2개, 부정 트리거 1개. 다섯 개 정도면 충분한 출발점입니다. 실제 사용 중 예상과 다른 결과가 나오면 그 상황을 시나리오로 추가합니다.

## [수정 전·후 객관 비교하기](#수정-전후-객관-비교하기)

현재 commit Skill은 이미 staging 된 파일만 커밋하고, modified·untracked 파일은 무시합니다. 이 동작을 바꾼다고 가정해봅니다. "modified와 untracked도 자동으로 staging 해서 커밋" 하도록 만드는 것입니다.

Git 파일 상태

*   **staged**: `git add` 로 커밋 대기열에 올린 파일
*   **modified**: 수정했지만 아직 `git add` 하지 않은 파일
*   **untracked**: Git이 아직 추적하지 않는 새 파일

수정했어도 실제로 개선됐는지 직감만으로는 알 수 없습니다. Skill Creator에게 수정과 비교를 한 번에 맡깁니다.

```
/skill-creator commit Skill 을 수정하고 테스트해줘. 현재는 이미 staging 된 파일만 커밋하는데, modified 와 untracked 파일도 자동으로 staging 해서 커밋하도록 바꾸고 싶어. 수정 전후를 비교해서 실제로 개선되었는지 확인해줘.
```

Skill Creator는 세 단계를 차례로 처리합니다.

1.  수정 전 SKILL.md를 따로 보관
2.  SKILL.md를 수정
3.  같은 테스트 프롬프트로 수정 전과 수정 후를 동시에 돌려 결과 비교

같은 테스트 시나리오 3 개로 수정 전·후를 병렬 실행

*   정상 커밋통과
*   여러 파일 범위 판단통과
*   modified·untracked 자동 staging실패

통과율

2 / 3

토큰

1,200

시간

15 초

*   정상 커밋통과
*   여러 파일 범위 판단통과
*   modified·untracked 자동 staging통과

통과율

3 / 3

토큰

1,350

시간

17 초

통과율·토큰·시간을 나란히 보면 개선이 감이 아닌 근거가 됩니다

*   수정 후 통과율이 80% → 100% 로 올라갔다면 개선입니다.
*   수정 후 특정 시나리오가 깨졌다면 회귀입니다. 수정을 되돌려야 합니다.
*   토큰 사용량이 두 배가 됐다면 개선·회귀를 떠나 비용도 다시 따져봐야 합니다.

## [Eval이 효과적인 순간](#eval이-효과적인-순간)

"Skill 하나 만드는데 굳이 Eval까지?" 이 회의는 타당합니다. Eval이 효과를 발휘하는 순간은 따로 있습니다.

### [팀이 공유하는 Skill일 때](#팀이-공유하는-skill일-때)

임의로 고치면 팀원 전체에 영향을 줍니다. 수정 전·후 비교를 리뷰 근거로 씁니다.

### [Skill을 여러 번 수정할 예정일 때](#skill을-여러-번-수정할-예정일-때)

description을 이리저리 다듬거나, 참조 파일을 쪼개거나, 단계를 재배열할 계획이라면 매 수정마다 Eval을 돌려 비교합니다.

처음 만드는 Skill, 혼자 쓰는 단순 Skill에는 과할 수 있습니다. Skill이 점점 중요해질 때 Eval을 붙이면 됩니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  "잘 되는 것 같은데"는 확률적 판단: 모델 출력이 매번 달라지므로 한두 번 돌려서는 Skill 품질을 알 수 없습니다. Eval이 이걸 숫자로 바꿉니다.
2.  Eval은 세 조각: 테스트 프롬프트 / 기대 결과 / 판정. Skill Creator가 SKILL.md를 분석해 시나리오를 자동으로 제안합니다.
3.  수정 전·후 A/B가 개선의 증거: Skill을 고쳤을 때 통과율·토큰·시간이 어떻게 바뀌는지 나란히 보면, 감이 아니라 근거로 판단할 수 있습니다.

## [FAQ](#faq)

### Skill 없이 Eval을 돌리면 어떻게 되나요?

### Eval 시나리오는 몇 개가 적당한가요?

### Eval을 매번 수동으로 돌려야 하나요?

피드백 남기기

[

전체 코스 정리

Claude Code 전체 코스를 간결하게 요약하고, Compound Engineering과 비동기·병렬 에이전트 등 이후 학습 방향을 안내합니다

](/learn/wrap-up)[

토큰 소진 시 Copilot CLI 로 이어가기

Claude Pro 토큰을 다 썼을 때 GitHub Copilot CLI 로 개인 프로젝트를 이어가는 방법을 안내합니다

](/learn/references/copilot-cli-fallback)

---
Source: https://docs.claude-hunt.com/learn/references/skill-improvement-eval
