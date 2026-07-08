# Claude Code Memory | 제대로 배우기

Part 1 · 대화 시작하기Chapter 3 · 컨텍스트 관리

# 매번 다시 말하지 않기 | Memory

반복해서 말하던 요청을 다음 세션까지 이어 가는 Memory의 원리와 CLAUDE.md와의 역할 차이를 구분합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

[CLAUDE.md 레슨](/learn/starting-conversations/context-management/claude-md#claude-md)에서 CLAUDE.md를 **내가 직접 써서 건네는 업무 매뉴얼**로 설명했습니다. 매뉴얼에는 팀이 함께 따르는 규칙을 담습니다. 그런데 내가 Claude에게 매번 다시 말하는 요청은 어디에 남겨야 할까요?

Memory는 내가 쓰는 매뉴얼이 아니라 **Claude가 대화에서 내 요청과 작업 방식을 배워 다음 세션까지 이어 가는 기능**입니다. 이 레슨을 읽으면 CLAUDE.md와 Memory의 역할을 구분하고, 반복되는 요청을 어디에 남길지 판단할 수 있게 됩니다.

### [학습 목표](#학습-목표)

*   Memory가 세션을 넘어 반복 요청을 기억하는 원리를 설명합니다
*   CLAUDE.md와 Memory의 역할 차이를 구분합니다
*   Memory에 담아야 할 것과 담으면 안 되는 것을 판단합니다

## [매 세션 반복되는 같은 요청](#매-세션-반복되는-같은-요청)

Claude와 일하다 보면 같은 말을 여러 번 하게 됩니다. "답변은 한국어로 해줘", "비유보다 정의부터 말해줘", "코드 수정 후에는 테스트 결과까지 알려줘"처럼 내 작업 방식에 맞추는 요청입니다.

한 세션 안에서는 Claude가 그 요청을 따라 답합니다. 하지만 새 세션을 열면 이전 대화에서 들었던 말투와 요청을 그대로 기억하지 못합니다. [CLAUDE.md 레슨](/learn/starting-conversations/context-management/claude-md)에서 다룬 무상태(Stateless) 특성 때문입니다. LLM은 대화와 대화 사이에 아무것도 기억하지 않아서, 한 세션에서 아무리 수정 요청을 해도 다음 세션은 그 요청을 모른 채 시작합니다.

그럼 CLAUDE.md에 쓰면 될까요? 프로젝트용 CLAUDE.md는 팀과 공유하므로, 나만의 요청을 넣으면 팀원 모두에게 적용됩니다. 내 전체 프로젝트용 CLAUDE.md는 모든 프로젝트에 적용되므로, 이 요청과 무관한 프로젝트까지 영향을 받습니다.

이런 반복 요청을 남기는 곳이 Memory입니다.

## [Memory: Claude가 기억하는 내 요청](#memory-claude가-기억하는-내-요청)

팀이 공유하는 매뉴얼Claude가 기억하는 내 요청나직접 씀CLAUDE.md· 팀 합의 규칙· 아키텍처 결정 이유· 제약사항git · 팀 전체에 공유Claude스스로 씀Memory· 내 요청· 수정 요청· 작업 방식로컬 · 개인 전용

같은 두 파일처럼 보이지만 쓰는 사람과 닿는 범위가 다릅니다

차이는 분명합니다. **CLAUDE.md는 내가 쓰고, Memory는 Claude가 기억합니다.** CLAUDE.md는 내가 직접 써서 건네는 매뉴얼이고, Memory는 Claude가 대화에서 내 요청과 작업 방식을 배워 스스로 기억하는 기능입니다. 내가 "비유보다 정의부터 말해줘"라고 요청하면, Claude는 이 한 줄을 Memory에 저장해 두고 다음 세션에서 꺼내 씁니다.

CLAUDE.md

Memory

**누가 쓰는가**

내가 직접

Claude가 자동으로

**무엇을 담는가**

팀 합의·아키텍처 결정·제약사항

내 요청·수정 요청·작업 방식

**공유 범위**

git으로 팀 전체

로컬, 개인 전용

**충돌 시 우선순위**

높음

낮음

Memory는 CLAUDE.md가 다루지 않는 **내 요청과 작업 방식**을 담당합니다.

## [Memory의 동작 흐름](#memory의-동작-흐름)

Session 1사용자:"비유는 빼고 정의부터 말해줘"Claude: 요청을 관찰 → 저장Session 2 (며칠 뒤)사용자:개념 설명 요청Claude: 비유 없이 정의만MEMORY.md~/.claude/projects/(디스크에 영구 저장)① 대화 중 자동 기록② 다음 세션 시작 시 자동 로드오늘며칠 뒤

한 세션에서의 요청이 다음 세션까지 자동으로 이어집니다

Memory는 프로젝트 단위로 분리되어 `~/.claude/projects/` 아래에 저장됩니다. 프로젝트 경로를 기반으로 폴더가 생기고, 그 안에 `MEMORY.md` 인덱스와 주제별 파일이 들어갑니다.

~/.claude/projects

\-Users-username-my-project

memory

MEMORY.md

user\_preferences.md

feedback\_testing.md

`MEMORY.md`는 인덱스이고, 나머지는 주제별 기억 파일입니다.

프로젝트별 분리 덕분에 프로젝트 A의 요청이 프로젝트 B 대화에 끼어들지 않습니다. Memory는 로컬 전용이라 git에 올리지 않으며 팀원과도 공유하지 않습니다. **CLAUDE.md가 팀과 공유하는 매뉴얼이라면, Memory는 나에게만 남는 기억입니다.**

### [세 가지 동작 시점](#세-가지-동작-시점)

*   **세션 시작**: `MEMORY.md` 인덱스가 Context에 자동으로 실립니다. 각 메모리 파일은 평소엔 인덱스에 제목만 올라와 있고, 필요한 항목을 Claude가 그때그때 꺼내 읽습니다
*   **대화 중 자동 감지**: 반복되는 요청이나 작업 방식을 감지하면 Claude가 스스로 Memory에 한 줄을 추가합니다
*   **명시적 저장·삭제 요청**: "이것을 기억해"로 즉시 저장, "방금 그 메모 지워줘"로 항목을 빼도록 요청할 수 있습니다

## [\[미션\] 반복 요청 하나 기억시키기](#미션-반복-요청-하나-기억시키기)

Memory가 실제로 동작하는지 직접 확인합니다.

`ch03-03` 브랜치가 이 미션의 시작점입니다.

```
git fetch origin
git checkout ch03-03
```

### [Step 1: `/memory` 로 현재 상태 확인](#step-1-memory-로-현재-상태-확인)

Claude Code에서 `/memory` 를 입력합니다.

![Claude Code의 /memory 실행 결과와 Open auto-memory folder 항목](/LearnClaude/images/memory-command.0t42ihwt9x755.png)

이번 세션에 로드된 메모리 파일들(내 전체 프로젝트용 CLAUDE.md, 프로젝트용 CLAUDE.md 등)과 함께, 맨 아래쪽에 **Open auto-memory folder** 항목이 있습니다. 위쪽 항목들을 고르면 해당 CLAUDE.md가 에디터에서 열리고, 맨 아래 항목을 고르면 자동 Memory 폴더가 파일 탐색기에서 열립니다.

이 레슨에서 다루는 자동 Memory는 맨 아래 **Open auto-memory folder** 입니다.

자동 Memory 켜고 끄기

자동 Memory는 기본값이 켜짐입니다. 일시적으로 끄고 싶다면 `/memory` 메뉴 안에서 auto memory 토글 항목을 고르거나, 프로젝트 `.claude/settings.json` 에 `"autoMemoryEnabled": false` 를 넣어 항상 꺼둘 수 있습니다. 환경 변수 `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` 을 설정해 비활성화할 수도 있습니다.

Open auto-memory folder가 안 열리는 경우

일부 환경(특히 Windows)에서는 **Open auto-memory folder** 를 골라도 탐색기가 뜨지 않는 경우가 있습니다. 그럴 때는 파일 탐색기에서 `~/.claude/projects/` (Windows는 `%USERPROFILE%\.claude\projects\`) 아래 프로젝트 폴더의 `memory/` 디렉터리를 직접 열면 됩니다.

### [Step 2: 저장 전 답변 확인](#step-2-저장-전-답변-확인)

Claude Code에 다음과 같이 입력합니다.

```
Context Window가 뭐야?
```

아직 Memory에 요청을 저장하지 않았으므로, Claude가 평소처럼 설명합니다. 비유를 섞거나, 정의보다 배경 설명을 먼저 꺼낼 수 있습니다.

### [Step 3: 요청 저장](#step-3-요청-저장)

Claude Code에 다음과 같이 입력합니다.

```
앞으로 설명할 때 비유는 빼고 정의부터 간결하게 말해줘. 기억해
```

Claude가 이 요청을 Memory에 저장했다는 응답을 확인합니다.

### [Step 4: 새 세션에서 다시 확인](#step-4-새-세션에서-다시-확인)

`/clear` 로 세션을 초기화하거나 새 터미널에서 `claude` 를 실행합니다.

그리고 같은 질문을 다시 입력합니다.

```
Context Window가 뭐야?
```

비유 없이 정의부터 간결하게 돌아오면 Memory가 제대로 동작한 것입니다.

## [Memory에 담지 말 것](#memory에-담지-말-것)

Memory에 아무 정보나 쌓이면 오히려 방해가 됩니다. 다음 세 가지는 넣지 않습니다.

*   **민감 정보**: API 키·비밀번호·토큰. Memory는 평문으로 저장되므로 민감 정보는 환경 변수에 두어야 합니다
*   **팀 규칙**: 팀 전체가 따라야 하는 규칙은 CLAUDE.md에 넣어야 다른 팀원에게도 적용됩니다. Memory는 로컬이라 내 세션에만 작동합니다
*   **코드에서 찾을 수 있는 정보**: 기술 스택·디렉토리 구조·명령어. [CLAUDE.md의 매뉴얼 기준](/learn/starting-conversations/context-management/claude-md#manual-criterion)과 같습니다. 모델이 직접 찾을 수 있는 정보를 Memory에 넣으면 Context만 낭비됩니다

## [입력할 자리 고르기](#입력할-자리-고르기)

프로젝트용 CLAUDE.md, 내 전체 프로젝트용 CLAUDE.md, Memory 중 어디에 넣을지 헷갈릴 때, 세 질문에 차례로 답해 보면 알 수 있습니다.

입력할 지침Q1. 코드에서 모델이 직접찾을 수 있는 정보인가?Yes✗ 어디에도 적지 않음모델이 스스로 찾는 정보예: 기술 스택, 명령어NoQ2. 팀 전체가 따라야하는 규칙인가?Yes./CLAUDE.md프로젝트 · git 으로 팀 공유예: 아키텍처 결정, 커밋 규칙NoQ3. 모든 프로젝트에서똑같이 따를 내 요청인가?Yes~/.claude/CLAUDE.md개인 · 모든 프로젝트에 적용예: 응답 언어, 보안 리뷰 우선NoMemory이 프로젝트만 · 자동 저장예: 비유 빼고 정의부터 같은 요청

세 질문을 차례로 통과시키면 입력할 자리가 정해집니다

세 질문 모두 통과해서 Memory로 내려오면, [CLAUDE.md 레슨](/learn/starting-conversations/context-management/claude-md#claude-md)에서 본 프로젝트용 CLAUDE.md와 내 전체 프로젝트용 CLAUDE.md가 모두 적합하지 않다는 뜻입니다. 팀과 공유하지도, 다른 프로젝트에 가져가지도 않을 이 프로젝트 한정 요청은 Memory에 남기면 됩니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **작성 주체의 비대칭**: CLAUDE.md는 내가 팀을 위해 써두는 매뉴얼, Memory는 Claude가 나를 관찰해 스스로 기억하는 내 요청입니다
2.  **반복 요청은 Memory, 팀 규칙은 CLAUDE.md**: Memory는 프로젝트별로 분리되고 로컬 전용이라 팀 Context를 침범하지 않습니다
3.  **충돌 시 우선순위**: CLAUDE.md가 우선합니다. Memory는 CLAUDE.md가 다루지 않는 개인 영역을 보완할 뿐, 팀 규칙을 대신하지 않습니다

## [FAQ](#faq)

### Memory가 너무 많아지면 어떻게 되나요?

### 팀원과 Memory를 공유할 수 있나요?

### Memory 파일을 직접 편집해도 되나요?

## [이어서 배울 내용](#이어서-배울-내용)

CLAUDE.md와 Memory로 무엇을 세션 간에 남길지는 해결했습니다. 남은 질문은 하나의 대화를 얼마나 길게 이어가야 하는가입니다. [Smart Zone·Dumb Zone](/learn/starting-conversations/context-management/context-window#smart-dumb-zone)으로 돌아가는 질문입니다. 대화가 길어질수록 품질이 떨어지므로, 가장 효과적인 Context 관리는 적절한 시점에 끊는 것입니다.

*   새 대화를 시작해야 하는 시점과 신호
*   `/clear` 와 `/compact` 의 차이

피드백 남기기

[

첫 출근날 건네는 업무 매뉴얼 | CLAUDE.md

매 세션 자동 로드되는 CLAUDE.md를 신입 사원 업무 매뉴얼에 비유해, 무엇을 넣고 무엇을 제외할지 판단 기준을 세웁니다

](/learn/starting-conversations/context-management/claude-md)[

새 대화를 시작해야 하는 순간 | Task Sizing

작업을 끊을지 이어갈지 구분하고 \`/clear\`, 새 세션, \`/compact\` 선택 기준을 판단합니다

](/learn/starting-conversations/context-management/task-sizing)

---
Source: https://docs.claude-hunt.com/learn/starting-conversations/context-management/memory
