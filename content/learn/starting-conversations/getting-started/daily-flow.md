# Claude Code 세션과 권한 모드 | 제대로 배우기

Part 1 · 대화 시작하기Chapter 2 · Claude Code 입문

# 매일 쓰는 명령 | 세션과 권한 모드

세션 관리 명령으로 이전 세션을 다시 열고 Context를 비우며, 권한 모드 4가지로 자동 허용 범위를 조절합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

이전 세션을 이어 가고 싶거나, 매번 권한을 묻는 흐름이 번거로울 때가 있습니다.

자주 마주치는 이 두 상황을 다루는 명령을 정리합니다. 세션 관리로 대화를 다시 열고 비우는 법, 권한 모드로 자동 허용 범위를 조절하는 법을 익힙니다.

### [학습 목표](#학습-목표)

*   `claude --continue`, `claude --resume` 으로 이전 세션을 다시 열고 `/clear` 와 `/compact` 의 차이를 구별합니다.
*   `Shift+Tab` 으로 권한 모드 4가지를 순환하며 상황에 맞게 고릅니다.
*   Auto mode의 분류기 동작과 `--dangerously-skip-permissions` 의 위험을 판단합니다.

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   첫 대화 실습 완료 ([읽고, 고치고, 커밋까지](/learn/starting-conversations/getting-started/first-conversation))
*   권한 승인과 `Always allow` 흐름을 한 번 경험

## [세션 관리: 다시 열기와 비우기](#세션-관리-다시-열기와-비우기)

/clear — Context 만 비움 · 같은 세션 유지claudeSession 시작Context 비어 있음대화 시작대화 진행Context 누적/exit세션 종료

Context 가 차오르면 /clear 로 비우거나 /exit 로 종료 — 두 갈래만 기억하면 됩니다

Claude Code에서 **세션(Session)** 은 하나의 대화 단위입니다. 세션 안에서 주고받은 모든 대화가 Claude의 Context에 쌓이고, 세션을 어떻게 관리하느냐에 따라 응답 품질과 사용량이 달라집니다.

### [이전 세션 다시 열기](#이전-세션-다시-열기)

새 터미널에서 `claude` 를 입력하면 빈 세션이 시작됩니다. 이전 작업 맥락을 이어 가고 싶다면 다음 두 가지 명령을 씁니다.

```
claude --continue   # 마지막 세션을 바로 다시 열기 (-c)
claude --resume     # 이전 세션 목록에서 골라 다시 열기 (-r)
```

`--continue` 는 가장 최근 세션 하나를 바로 불러옵니다. `--resume` 은 여러 세션 중 골라야 할 때, 또는 며칠 전 작업으로 돌아갈 때 씁니다.

세션을 닫을 때는 `/exit` 또는 `Ctrl+D` 를 누릅니다.

### [`/clear`와 `/compact` 비교하기](#clear-vs-compact)

대화가 길어지면 Context가 가득 차 응답 품질이 떨어지거나 사용량 한도를 초과합니다. 이때 두 가지 선택이 있습니다.

*   **`/clear`**: 대화를 통째로 비웁니다. Claude는 새로 시작한 것처럼 이전 내용을 모릅니다.
*   **`/compact`**: 대화를 요약해 압축합니다. 토큰을 줄이지만, 요약하는 과정에서 미묘한 뉘앙스와 결정 이유가 빠지기 쉽습니다.

`/compact` 는 대화가 너무 길어 맥락을 압축해서라도 이어가야 할 때 씁니다. **다만 요약이 무엇을 버리는지 예측하기 어려워, 평소에는 `/clear` 를 기본으로 삼는 편이 안전합니다.** 맥락을 다시 주고 싶다면 `/clear` 후 필요한 파일만 `@` 로 첨부하는 편이 더 깔끔합니다.

## [권한 모드: Shift+Tab으로 4가지](#권한-모드-shifttab으로-4가지)

AI 가 행동 요청사용자 선택Yes (y)Always (a)No (n)이번 한 번만 실행이번 호출만 허용이후 자동 허용settings.json 에 저장차단AI 가 다른 방법 모색

한 번만 허용할지, 앞으로도 자동 허용할지 — 매 prompt 마다 한 번씩 결정합니다

Claude Code는 파일 수정이나 셸 명령 실행 전에 승인을 묻습니다. 매번 승인을 눌러야 할 때 권한 모드를 바꾸면 자동 허용 범위가 달라집니다.

### [4가지 권한 모드 순환하기](#4가지-권한-모드-순환하기)

`Shift+Tab` 을 누르면 권한 모드 4가지가 순환합니다.

모드

화면 표시

의미

`default`

(인디케이터 없음)

매번 확인 (기본값)

`acceptEdits`

`accept edits on`

파일 편집은 자동 허용, 나머지는 확인 (단, 코드를 실행할 수 있는 보호 파일은 예외)

`plan`

`plan mode on`

코드 수정 없이 계획만 제안 ([Plan Mode](/learn/starting-conversations/todo-app/plan-mode)에서 상세)

`auto`

`auto mode on`

분류기가 매 행동을 사전 검토해 자동 실행

화면 아래 인디케이터에 현재 모드가 표시됩니다.

### [권한 확인 끄기](#권한-확인-끄기)

```
claude --dangerously-skip-permissions
```

권한 확인 자체를 끕니다. 어떤 파일 수정도, 어떤 셸 명령도 묻지 않고 그대로 실행합니다. 매번 묻는 흐름이 번거로울 때 자주 쓰지만, 모든 명령이 검토 없이 실행된다는 점은 알고 써야 합니다.

### [Auto mode 분류기 살펴보기](#auto-mode-분류기-살펴보기)

`auto` 는 `--dangerously-skip-permissions` 와 결이 다릅니다. `--dangerously-skip-permissions` 가 검토 없이 전부 실행하는 반면, `auto` 는 **분류기(classifier)** 모델이 매 행동을 읽고 안전·위험 여부를 판단합니다. 공항 보안 검색대가 위험물만 걸러내듯, 위험한 행동만 골라 막습니다.

*   기본 허용: 로컬 파일 작업, 의존성 설치, 읽기 전용 HTTP, 시작 브랜치에 push
*   기본 차단: `curl | bash`, 시크릿 유출, prod 배포, `main` 에 force push, 대량 삭제

활성화는 `Shift+Tab` 순환 또는 시작 시 플래그로 지정합니다.

```
claude --permission-mode auto
```

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **세션 다시 열기**: `claude --continue` 는 마지막 세션을 한 번에, `claude --resume` 은 목록에서 골라 다시 엽니다.
2.  **Context 비우기**: `/clear` 를 기본으로 삼고, `/compact` 는 맥락을 압축해서라도 이어가야 할 때만 씁니다.
3.  **권한 모드 4가지**: `Shift+Tab` 으로 `default`·`acceptEdits`·`plan`·`auto` 를 순환합니다. Auto는 분류기가 매 행동을 사전 검토하고, `--dangerously-skip-permissions` 는 그마저 끄는 마지막 수단입니다.

## [FAQ](#faq)

### /clear 와 /compact 중 뭘 써야 하나요?

### Auto와 --dangerously-skip-permissions 중 어느 쪽이 더 안전한가요?

### Always allow로 잘못 허용한 도구는 어떻게 되돌리나요?

## [이어서 배울 내용](#이어서-배울-내용)

한 세션을 길게 이어가면 어느 순간 Claude의 응답 품질이 떨어집니다. Claude가 한 번에 볼 수 있는 Context 양에 한계가 있기 때문입니다. 다음 [Chapter 3 · 컨텍스트 관리](/learn/starting-conversations/context-management/context-window)에서는 이 한계를 다루는 도구를 정리합니다.

*   Context Window: AI가 한 번에 볼 수 있는 범위와 그 한계
*   CLAUDE.md: 프로젝트 정보를 한 번만 적고 매번 자동 제공하기
*   Memory: 대화가 끊겨도 학습한 내용을 유지하는 시스템
*   Task Sizing: 대화를 끊는 기술로 품질 유지

피드백 남기기

[

읽고, 고치고, 커밋까지 | Claude와 첫 대화

다섯 번의 대화로 코드 읽기부터 파일 수정·실수 복구·git 커밋까지 첫 개발 흐름을 처음부터 끝까지 따라가며 권한 흐름을 체험합니다

](/learn/starting-conversations/getting-started/first-conversation)[

긴 대화에서 답이 어긋나는 이유 | Context Window

AI의 작업 책상 Context Window의 구조와 짧게 유지해야 하는 이유, 모듈형 프롬프트 원칙을 이해합니다

](/learn/starting-conversations/context-management/context-window)

---
Source: https://docs.claude-hunt.com/learn/starting-conversations/getting-started/daily-flow
