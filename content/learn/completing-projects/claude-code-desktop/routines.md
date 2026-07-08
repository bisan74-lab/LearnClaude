# Claude Code Routines | 제대로 배우기

Part 3 · 프로젝트 완성하기Chapter 9 · Claude Code Desktop

# 정해둔 시간에 알아서 | Routines

프롬프트와 저장소를 한 번 저장해두고 정해진 때에 스스로 도는 Cloud 루틴을 만들어 즉시 실행해 봅니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 7.

## [Overview](#overview)

Cloud 세션을 매번 손으로 여는 건 반복될수록 번거롭습니다. 루틴은 프롬프트와 저장소를 한 번 저장해두면 정해진 때마다 같은 작업을 자동으로 돌립니다. 이 레슨을 읽으면 스케줄 Cloud 루틴을 만들어 즉시 실행하고, 로컬·Cloud·`/loop`의 차이를 구별할 수 있게 됩니다.

### [학습 목표](#학습-목표)

*   루틴이 무엇이고 Cloud 세션과 어떻게 이어지는지 설명합니다.
*   로컬 루틴·Cloud 루틴·`/loop`을 구별합니다.
*   스케줄 Cloud 루틴을 만들어 즉시 실행합니다.

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   레슨 3에서 끝낸 [Cloud 세션](/learn/completing-projects/claude-code-desktop/remote-sessions) 셋업 (Pro·Max·Team 구독 + GitHub 연결). 루틴은 같은 기반에서 동작합니다.

## [루틴이란](#루틴이란)

루틴은 저장해둔 Claude Code 설정(프롬프트·저장소·커넥터)을 정해진 때마다 자동으로 실행하는 기능입니다. 매 실행이 새 세션 하나로 열려, 세션을 손으로 여는 일을 정해진 때에 대신합니다.

정해진 때마다 다시 실행트리거정해진 때세션 실행Local·Cloud결과PR · 보고

한 번 저장해두면, 정해진 때마다 스스로 도는 루프입니다

핵심은 **반복 루프**입니다. 트리거가 정해진 때에 세션을 엽니다. 세션이 작업을 끝내면 결과를 남기고, 다시 다음 때를 기다립니다. 한 번 잘 짜두면 같은 작업이 스스로 돕니다.

루틴은 실행 중에 권한을 묻지 않는 **자율 실행**입니다. 승인해줄 사람이 없으므로, 프롬프트에 할 일과 완료 기준을 함께 적습니다.

research preview

Routines는 아직 research preview입니다. 세부 동작과 한도(간격·트리거 등)는 바뀔 수 있으니, 화면 안내가 본문과 다르면 [공식 문서](https://code.claude.com/docs/en/routines)를 확인합니다.

## [로컬 · Cloud · `/loop` 구분](#로컬--cloud--loop-구분)

Desktop의 Routines 페이지에서 New routine을 누르면 **로컬**과 **Cloud** 두 갈래가 나옵니다. 로컬은 내 컴퓨터에서 도는 예약 작업, Cloud는 클라우드에서 도는 루틴입니다. CLI의 `/loop`까지 더하면 스케줄 방법은 셋입니다.

Cloud 루틴

로컬 예약 작업

`/loop`

실행 위치

Anthropic 클라우드

내 컴퓨터

내 컴퓨터

컴퓨터 꺼져도

계속

멈춤

멈춤

세션 열려 있어야

아니오

아니오

예

로컬 파일 접근

아니오 (새 clone)

예

예

트리거

스케줄·API·GitHub

스케줄

세션 중 간격

최소 간격

1시간

1분

1분

고르는 기준은 간단합니다.

*   **Cloud 루틴**: 컴퓨터가 꺼져 있어도 안정적으로 돌려야 할 때 씁니다.
*   **로컬 예약 작업**: 커밋되지 않은 로컬 파일이나 내 컴퓨터의 도구에 접근해야 할 때 씁니다.
*   **`/loop`**: 세션을 열어둔 채 배포나 CI를 짧게 지켜볼 때 씁니다.

이 레슨의 미션에서는 컴퓨터를 꺼도 도는 **Cloud 루틴**을 만듭니다.

## [\[미션\] 스케줄 Cloud 루틴 만들기](#미션-스케줄-cloud-루틴-만들기)

레슨 3에서 손으로 하던 README 점검을, 이번엔 정해진 때마다 자동으로 도는 Cloud 루틴으로 만들어 봅니다. 트리거는 스케줄·GitHub·API 세 가지가 있는데, 여기서는 가장 단순한 스케줄만 씁니다.

### [Step 1: New routine에서 Cloud 고르기](#step-1-new-routine에서-cloud-고르기)

왼쪽 사이드바에서 Routines를 열고, 오른쪽 위 New routine에서 **Cloud**를 고릅니다.

![Routines 페이지에서 New routine의 Local·Cloud 선택](images/routines-local-cloud.3jw_snl0o16ng.png)

### [Step 2: 프롬프트와 저장소, 스케줄 설정하기](#step-2-프롬프트와-저장소-스케줄-설정하기)

새 루틴 폼에서 이름, 프롬프트, 저장소를 채우고 트리거로 Schedule을 고릅니다.

![New routine 폼의 저장소·환경·모델·이름·Instructions·트리거](images/new-routine-form.3fsncpt5h6j22.png)

화면의 번호를 따라 보면 이렇게 채웁니다.

1.  **저장소**: 본인 Todo 저장소(`todo-tutorial`)를 고릅니다.
2.  **환경**: Default Cloud Environment를 그대로 둡니다.
3.  **모델**: 이번 루틴에서 쓸 모델을 고릅니다.
4.  **이름**: 루틴을 알아볼 이름을 적습니다 (예: `README 점검`).
5.  **Instructions**: 매 실행에서 Claude가 할 일을 적습니다. 자율 실행이라 성공 조건까지 담습니다.
6.  **트리거**: Schedule을 골라 반복 주기를 정합니다 (예: 매일 오전 9시).

Instructions에는 이렇게 적습니다.

```
이 저장소의 README.md가 현재 코드와 맞는지 점검해줘.
어긋난 부분이 있으면 고쳐 커밋하고 PR을 만들어줘.
이미 최신이면 변경 없이 이유만 알려줘.
```

### [Step 3: Run now로 즉시 실행하기](#step-3-run-now로-즉시-실행하기)

Create로 루틴을 저장하면 다음 스케줄 때 실행됩니다. 기다리지 않고 바로 확인하려면 루틴 상세 화면에서 Run now를 누릅니다.

![저장된 루틴 상세 화면과 Run now 버튼](images/routine-detail-run-now.29z8m98ok93bf.png)

실행이 시작되면 세션 하나가 새로 열립니다. 이 세션에서 Claude가 한 일과 만든 PR을 [레슨 3에서 배운 방식](/learn/completing-projects/claude-code-desktop/remote-sessions)으로 검토합니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **루틴**: 저장한 프롬프트·저장소를 정해진 때마다 세션으로 자동 실행하는 기능입니다.
2.  **세 갈래**: 컴퓨터 없이 돌리면 Cloud, 로컬 파일이 필요하면 로컬, 세션 중 폴링은 `/loop`입니다.
3.  **완결된 프롬프트**: 자율 실행이므로 할 일과 성공 조건을 프롬프트에 함께 적습니다.
4.  **Run now**: 스케줄을 기다리지 않고 즉시 실행해 검증합니다. 초록불은 인프라 성공만 뜻하므로, 세션을 열어 실제 결과를 확인합니다.

## [FAQ](#faq)

### CLI에서도 루틴을 만들 수 있나요?

### 루틴이 만든 변경은 어디로 가나요?

### 실행 목록에 초록불이 뜨면 작업이 성공한 건가요?

### 루틴이 팀원과 공유되나요?

## [이어서 배울 내용](#이어서-배울-내용)

이 챕터에서 Desktop의 작업 화면, Cloud 실행, 자동화까지 갖췄습니다. 다음 챕터부터는 그 위에서 프로젝트를 완성합니다. [스펙 주도 개발](/learn/completing-projects/spec-driven-development/sdd)에서 아이디어를 스펙으로 만들고 구현까지 한 사이클로 이어 가는 방법을 배웁니다.

피드백 남기기

[

노트북을 덮어도 계속되는 세션 | Cloud 세션

이미 배포한 내 저장소로 Cloud 세션을 열어 README를 수정하고 PR을 만들어 봅니다

](/learn/completing-projects/claude-code-desktop/remote-sessions)[

명세가 결정하는 6단계 사이클 | SDD

Part 2 도구를 하나의 사이클로 묶는 SDD 6단계와 Spec이 나머지를 결정하는 이유를 살펴봅니다

](/learn/completing-projects/spec-driven-development/sdd)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/claude-code-desktop/routines
