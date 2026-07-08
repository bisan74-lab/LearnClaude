# Claude Code Sketch | 제대로 배우기

Part 3 · 프로젝트 완성하기Chapter 10 · 스펙 주도 개발

# 레이아웃을 확정하기 | Sketch

/sketch-wireframe 3단계로 기본 레이아웃과 시나리오별 화면을 한 wireframe.html에서 비교합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

[Specify 단계](/learn/completing-projects/spec-driven-development/writing-spec)에서 spec.md를 확정했습니다. spec은 "무엇을" 정의하지만, "어떻게 보이는가"는 정의하지 않습니다. 이 빈칸을 코드 작성 전에 채우는 단계가 **Sketch**입니다.

`/sketch-wireframe`은 spec.md를 읽고 HTML 와이어프레임 한 파일을 생성합니다. AI가 만든 wireframe.html을 브라우저에서 보면서 자연어 피드백으로 3단계에 걸쳐 다듬어 확정합니다.

### [학습 목표](#학습-목표)

*   AI가 만든 wireframe을 검토하고 자연어 피드백으로 다듬는 루프를 이해합니다
*   검토 시 봐야 할 4가지 기준 (시나리오 반영·컴포넌트 구조·예시 데이터·Screen Notes 경계)을 적용합니다
*   이 단계에서 결정할 것과 다음 단계로 미룰 것의 경계를 구분합니다

## [결정 범위 정하기](#결정-범위-정하기)

검토할 때 어디까지 따져야 하는지 경계를 먼저 잡습니다.

### [이번 단계에서 결정할 것](#이번-단계에서-결정할-것)

*   화면 단위 분해 (시나리오 → 화면 매핑)
*   화면별 레이아웃 (요소 배치·정보 계층)
*   화면 흐름 (진입·인터랙션·전환)

### [다음 단계로 미룰 것](#다음-단계로-미룰-것)

*   시각 디자인 (색·폰트·간격·아이콘)
*   구현 방법 (라이브러리·컴포넌트 선택)
*   내부 상태·데이터 구조

미루는 항목의 피드백("버튼 색을 파랗게", "이건 React Hook Form으로")이 떠오르면 다음 단계로 메모만 남기고 wireframe에서는 다루지 않습니다.

## [Step 1: 기존 화면과 참조 자료 확인하기](#step-1-기존-화면과-참조-자료-확인하기)

```
/sketch-wireframe feedme
```

AI는 곧장 화면을 그리지 않고 두 가지를 먼저 확인합니다.

입력

읽는 대상

코드베이스의 관련 컴포넌트

기존 레이아웃 구조: 새 화면이 어디에 얹힐지

`artifacts/feedme/references/`

참조 이미지가 있으면 구조·정보 계층만 추출 (시각 디자인은 무시)

기존 화면 위에 요소를 추가하는 케이스라면 그 레이아웃을 바탕으로 와이어프레임을 만듭니다. 첫 사이클이라면 spec.md만 가지고 Step 2로 갑니다.

## [Step 2: 기본 레이아웃 먼저 확정하기](#step-2-기본-레이아웃-먼저-확정하기)

AI가 spec.md 시나리오를 화면 단위로 묶고, 첫 화면인 **base 화면**의 HTML 와이어프레임을 생성합니다.

```
3개 화면으로 구성합니다:
1. 기본 화면 (시나리오에 매핑되지 않음, 대표 데이터로 채움)
2. 변환 완료: FEEDME-001, FEEDME-002
3. 변환 실패: FEEDME-003
```

base 화면은 입력창·결과 영역 같은 레이아웃 골격을 대표 데이터로 채워둔 상태입니다. 시나리오에 매핑되는 화면은 다음 단계에서 추가합니다.

```
Screen: feedme [col]
├── Header [row]: 로고, 다크모드 토글
├── URL Input [row]: 입력창, 변환 버튼, 지우기 버튼
├── Result [col]: 페이지 제목·저자, 렌더링된 Markdown
└── Actions [row]: 복사, 다운로드, ChatGPT·Claude로 열기
```

AI가 Vite dev server를 백그라운드로 실행하고 브라우저 URL을 알려줍니다.

```
http://localhost:3456/wireframe.html
```

상단 nav에는 화면 전환 버튼과 Mobile / Desktop 뷰포트 토글이 함께 들어갑니다. 두 뷰포트 모두에서 레이아웃이 깨지지 않는지 확인합니다.

### [피드백 루프](#피드백-루프)

레이아웃이 마음에 들지 않으면 자연어로 수정해 달라고 합니다.

```
입력창이 너무 좁다. 변환 버튼을 입력창 안쪽 오른쪽 끝으로 옮겨줘.
```

AI가 wireframe.html을 수정하면 Vite가 변경을 즉시 반영합니다. base 화면이 확정될 때까지 이 루프를 반복합니다.

## [Step 3: 시나리오별 화면 추가하기](#step-3-시나리오별-화면-추가하기)

base 화면이 확정되면 AI가 spec.md의 나머지 시나리오를 화면으로 추가합니다. 모든 시나리오 화면을 같은 wireframe.html 한 파일에 넣어, 한 페이지에서 좌우로 비교하며 검토할 수 있습니다.

각 화면에 spec의 성공 기준에서 가져온 실제 예시 데이터를 넣습니다. "카드 항목" 같은 자리표시자 대신, 실제 URL과 변환된 Markdown 샘플을 넣어 진짜 데이터로 검토할 수 있습니다.

레이아웃이나 화면 구성이 마음에 들지 않으면 Step 2와 동일한 피드백 루프로 다듬습니다. ("이 두 화면은 같은 화면이어도 됩니다", "변환 실패는 별도 화면으로 빼주세요"처럼 자연어로 요청합니다.)

각 화면 아래에는 **Screen Notes** 메모가 함께 붙습니다. 화면 진입·인터랙션·전환을 자연어로 짧게 적은 메모로, 다음 단계인 검토에서 화면 흐름까지 같이 점검합니다.

## [Wireframe 검토하기](#wireframe-검토하기)

확정된 wireframe은 `artifacts/feedme/wireframe.html`에 저장됩니다. 사용자가 네 가지를 검토합니다.

1.  모든 spec 시나리오의 UI가 모두 반영됐는가? spec의 시나리오 ID가 어느 .screen의 `data-scenario`에든 등장하는지 확인합니다.
2.  컴포넌트 구조가 명확한가? 입력 영역·결과 영역·액션 영역의 경계가 시각적으로 구분되는지 확인합니다.
3.  실제 예시 데이터가 들어가 있는가? "카드 항목" 같은 자리표시자가 아니라 실제 URL과 Markdown 샘플이 들어가 있는지 확인합니다.
4.  Screen Notes에 비즈니스 로직이 섞여 있지 않은가? 유효성 규칙(예: "URL이 빈 값이면 에러")이 섞여 있다면 spec.md로 옮겨달라고 요청합니다.

Screen Notes는 화면을 정적 스냅샷이 아니라 흐름으로 기록합니다. 자연어로 적어 두면 다음 단계인 Plan에서 task 분해 입력으로 바로 쓰이고, spec.md(무엇을)와 wireframe(어떻게 보이는가) 사이에 비어 있던 화면 흐름을 채울 수 있습니다.

다만 자연어라 표준화가 약하고, 유효성·에러 같은 비즈니스 로직이 섞이기 쉽습니다. **트리거·인터랙션·전환 세 축으로 라벨을 고정하고, 로직은 spec.md로 옮깁니다.**

### [Screen Notes: 좋은 예와 나쁜 예](#screen-notes-좋은-예와-나쁜-예)

좋은 예

```
트리거: 메인 화면에서 URL 입력 후 변환 버튼 클릭
인터랙션: 결과 영역에 Markdown 표시 → 복사 / 다운로드 / 외부 LLM 버튼
전환: "외부 LLM 열기" 클릭 → 외부 LLM 모달 화면
```

나쁜 예 (비즈니스 로직이 섞임)

```
트리거: 메인 화면에서 URL 입력 후 변환 버튼 클릭
인터랙션: URL이 빈 값이면 에러, 잘못된 URL이면 에러, 변환 실패 시 재시도
```

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **base 화면 먼저 확정**: 레이아웃 골격을 대표 데이터로 채운 첫 화면을 브라우저 피드백 루프로 다듬은 뒤, 시나리오 화면을 그 위에 쌓습니다.
2.  **시나리오 화면 한 파일 통합**: spec.md 시나리오마다 화면을 추가해, 한 페이지에서 좌우로 비교하며 검토할 수 있습니다.
3.  **자연어 피드백 루프**: 레이아웃·화면 구성이 마음에 들지 않으면 Step 2와 같은 루프로 자연어 요청을 반복합니다.
4.  **Screen Notes 로직 분리**: 화면 흐름만 담겨 있어야 합니다. 유효성 규칙이 섞여 있다면 spec.md로 옮겨달라고 요청합니다

## [FAQ](#faq)

### 모든 기능에 wireframe이 필요한가요?

### Figma 디자인이 있으면 wireframe 단계를 건너뛸 수 있나요?

## [이어서 배울 내용](#이어서-배울-내용)

spec.md와 wireframe.html을 모두 확정했습니다. 다음 레슨인 [Plan](/learn/completing-projects/spec-driven-development/writing-plan)에서는 두 문서를 가지고 어떤 순서로, 어떤 단위로, 어떻게 검증하며 만들지 Task 단위 계획을 세웁니다.

피드백 남기기

[

추측을 드러내기 | Specify

/write-spec 4단계로 가정·모호함·미결정을 코드 전에 드러내고 WHAT만 담은 spec.md를 만듭니다

](/learn/completing-projects/spec-driven-development/writing-spec)[

실행 단위로 쪼개기 | Plan

/draft-plan으로 spec과 wireframe을 Vertical Task로 쪼개고 plan-reviewer로 검증합니다

](/learn/completing-projects/spec-driven-development/writing-plan)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/spec-driven-development/sketching-wireframe
