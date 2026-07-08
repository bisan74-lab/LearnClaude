# Claude Code 설치와 실행 | 제대로 배우기

Part 1 · 대화 시작하기Chapter 2 · Claude Code 입문

# 첫 대화 시작하기 | Claude Code 설치와 실행

Claude Code를 설치·로그인하고 요금제와 사용량 한도를 이해한 뒤 Opus·Sonnet·Haiku 모델을 골라 첫 대화를 시작합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

[Chapter 1 의 마지막 레슨](/learn/starting-conversations/llm-basics/agentic-coding-and-claude-code#claude-code-axes)에서 Claude Code가 Terminal-native이고 프로그래밍 가능한 Agent 임을 살펴봤습니다. 이제 이 Agent를 내 컴퓨터에서 직접 실행해볼 차례입니다.

설치와 로그인부터 요금제별 사용량 차이, Opus·Sonnet·Haiku 세 모델을 작업에 맞춰 고르는 법까지 익히고 첫 대화를 시작합니다.

### [학습 목표](#학습-목표)

*   Claude Code를 설치하고 Anthropic 계정으로 로그인합니다.
*   내 요금제가 Claude Code를 어떻게 제공하는지, 사용량 한도가 어떻게 작동하는지 파악합니다.
*   Opus·Sonnet·Haiku 세 모델의 성격을 구별하고, 작업에 맞춰 골라 씁니다.

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   VS Code 설치 ([https://code.visualstudio.com](https://code.visualstudio.com))
*   터미널 (macOS Terminal, Windows PowerShell, Linux Terminal)
*   지원 OS: macOS 13.0+, Ubuntu 20.04+, Windows 10 1809+
*   Anthropic 계정 ([사전 준비사항](/learn/prerequisites) 참조)

## [설치와 첫 실행](#설치와-첫-실행)

### [Step 1: 터미널 열기](#step-1-터미널-열기)

VS Code에서 따라 한다면 상단 메뉴에서 `Terminal` > `New Terminal`을 선택합니다. 단축키는 `` Ctrl+` `` 입니다.

Windows에서는 터미널 탭에 `PowerShell` 또는 `pwsh`가 보이는지 확인합니다. `cmd`가 열렸다면 터미널 오른쪽 위 드롭다운에서 PowerShell을 선택합니다.

### [Step 2: Claude Code 설치하기](#step-2-claude-code-설치하기)

사용하는 OS에 맞는 설치 명령을 터미널에 붙여 넣고 실행합니다.

macOSWindows

Linux·WSL도 같은 명령을 씁니다. 터미널에서 설치 스크립트를 실행합니다.

```
curl -fsSL https://claude.ai/install.sh | bash
```

Homebrew를 쓰고 있다면 이 방법도 됩니다.

```
brew install --cask claude-code
```

PowerShell에서 설치 스크립트를 실행합니다.

```
irm https://claude.ai/install.ps1 | iex
```

WinGet을 쓰고 있다면 이 방법도 됩니다.

```
winget install Anthropic.ClaudeCode
```

### [Step 3: 설치 확인하기](#step-3-설치-확인하기)

설치가 끝나면 버전을 확인합니다.

```
claude --version
```

### [Step 4: 첫 실행과 로그인](#step-4-첫-실행과-로그인)

터미널에서 `claude` 를 입력해 세션을 엽니다.

```
claude
```

처음 실행하면 브라우저가 자동으로 열립니다. 사전 준비에서 등록한 Anthropic 계정으로 로그인하면 인증이 끝납니다. 이 과정은 처음 한 번만 필요합니다. 이후에는 로그인 상태가 유지됩니다.

로그인이 끝나면 터미널로 돌아오고, Claude Code 입력창이 뜹니다. 이제 첫 메시지를 입력하면 됩니다.

## [요금제별 Claude Code](#요금제별-claude-code)

Claude Code는 Anthropic 계정 권한 안에서 동작합니다. 같은 `claude` 명령이라도 요금제에 따라 사용 가능한 모델, 사용량 한도, 팀원 관리 방식이 다릅니다.

### [세 가지 요금제](#세-가지-요금제)

*   **Pro**: 개인 개발자용. Claude Code를 쓸 수 있고, Opus는 한도가 넉넉하지 않아 주로 Sonnet으로 작업하게 됩니다.
*   **Max**: 고빈도 사용자용. Opus 한도가 넉넉해 매일 오래 쓰는 분에게 맞습니다.
*   **Team**: 조직 단위. 관리자가 멤버를 초대하고 멤버별 사용량을 관리합니다.

가볍게 쓰는 개인은 Pro, 매일 본격적으로 쓰는 개인은 Max, 회사 단위 도입은 Team을 선택합니다.

### [사용량 한도 관리](#사용량-한도-관리)

Claude Code는 두 가지 한도를 함께 적용합니다.

*   **세션 한도**: 5시간 단위로 누적됩니다. 토큰을 쓴 시점부터 정확히 5시간 후 그 토큰부터 차례로 풀립니다.
*   **주간 한도**: 7일 단위로 누적됩니다. Sonnet과 Opus가 별도로 측정되므로 Opus를 많이 쓰면 Sonnet 한도가 남아 있어도 Opus만 먼저 막힐 수 있습니다.

정확한 수치는 빠르게 바뀌므로 [Anthropic 공식 문서](https://support.claude.com/en/articles/9797557-usage-limit-best-practices)를 참조하세요.

## [Opus·Sonnet·Haiku 세 모델](#opussonnethaiku-세-모델)

Haiku단순 수정 · 빠른 질문Sonnet일반 개발 작업Opus아키텍처 · 깊은 추론빠르고 저렴깊고 강력

작업 난이도에 맞춰 모델을 바꾸면 비용과 품질을 함께 조절할 수 있습니다

Claude Code는 세 모델을 제공합니다. 모든 작업에 가장 비싼 모델을 쓸 필요는 없습니다. 작업 난이도에 따라 모델을 바꿔 가며 쓰면 품질과 비용을 함께 챙길 수 있습니다. Opus는 시니어 컨설턴트, Sonnet은 숙련된 개발자, Haiku는 빠른 어시스턴트입니다.

### [Opus: 아키텍처 설계와 대규모 리팩토링](#opus-아키텍처-설계와-대규모-리팩토링)

Opus는 가장 강력한 모델입니다. 여러 파일에 걸친 어려운 버그, 큰 구조 변경, 설계 결정이 섞여 있는 작업처럼 깊은 추론이 필요한 자리에 씁니다. 속도가 상대적으로 느리고 비용이 높으므로, 단순한 작업에 쓰면 낭비가 됩니다.

### [Sonnet: 성능과 비용의 균형점](#sonnet-성능과-비용의-균형점)

Sonnet은 성능과 비용의 균형이 잘 잡힌 모델입니다. 일반적인 기능 구현, 코드 리뷰, 테스트 작성 같은 일상 개발 작업에 두루 잘 맞습니다.

### [Haiku: 단순 수정과 빠른 질문](#haiku-단순-수정과-빠른-질문)

Haiku는 가장 빠르고 저렴한 모델입니다. 파일 이름 변경, 짧은 코드 수정, 간단한 질문처럼 복잡한 추론이 필요 없는 작업에 적합합니다. 응답 속도가 매우 빠르지만, 복잡한 문제에서는 품질이 떨어집니다.

### [모델 전환: `/model`, `--model`](#모델-전환-model---model)

세션 도중에 모델을 바꾸려면 `/model` 명령을 씁니다.

```
/model sonnet
/model opus
/model haiku
```

세션을 시작할 때 처음부터 특정 모델로 들어갈 수도 있습니다.

```
claude --model opus
```

**모델을 바꿔도 이전 대화 맥락(Context)은 그대로 이어집니다.** 같은 세션에서 "설계 단계는 Opus, 구현 단계는 Sonnet"처럼 바꿔 쓸 수 있습니다.

## [요금제별 모델 선택](#요금제별-모델-선택)

세 모델을 매번 손으로 바꿔 가며 쓰기는 번거롭습니다. 어떤 모델을 기본으로 둘지는 Opus 한도에 따라 갈립니다.

*   **Max**: Opus를 쓰세요. Opus 한도가 넉넉해 계속 써도 잘 걸리지 않습니다. 아끼려고 모델을 바꿀 이유가 없습니다.
*   **Pro**: `opusplan`과 `/advisor`를 함께 쓰세요. Opus 한도가 넉넉하지 않으니 한도를 중요한 곳에 몰아 써야 합니다. 둘 다 평소엔 Sonnet으로 진행하다 꼭 필요한 순간에만 Opus를 부르는 도구입니다.
    *   `opusplan` (단계 기반): 계획을 세울 때(Plan Mode)만 Opus, 구현은 Sonnet으로 자동 전환합니다. 계획에서 방향이 틀어지면 이후 구현이 전부 어긋나므로, 가장 중요한 계획 단계에 Opus를 집중하는 셈입니다.
    *   `/advisor` (판단 기반, experimental): 복잡한 결정이나 반복 오류처럼 판단이 어려운 순간에 Claude가 스스로 Opus를 자문역으로 부릅니다.

정리하면 `opusplan`은 정해진 계획 단계에 Opus를 켜고, `/advisor`는 Claude가 필요하다고 판단할 때 Opus를 부릅니다. Plan Mode는 [Chapter 4](/learn/starting-conversations/todo-app/plan-mode)에서 자세히 다룹니다.

## [FAQ](#faq)

### 사용량 제한에 걸리면 어떻게 되나요?

### 모델을 대화 중간에 바꿀 수 있나요?

### 터미널, VS Code, 데스크톱 앱 중 무엇을 쓰면 되나요?

### Opus가 더 깊이 생각하게 만드는 옵션도 있나요?

### Opus보다 뛰어난 모델도 있나요?

## [이어서 배울 내용](#이어서-배울-내용)

Claude Code 설치와 로그인, 요금제 이해, 모델 선택까지 마쳤습니다. 대화 한 줄로 코드가 어떻게 바뀌는지는 직접 써 봐야 알 수 있습니다. 다음 레슨에서는 Todo 앱을 받아 다섯 번의 대화로 첫 개발 흐름을 처음부터 끝까지 따라가 봅니다.

*   첫 개발 흐름: 읽기 → `@` 파일 첨부 → README 수정 → 실수 복구 → git 커밋
*   권한 승인 흐름과 `Always allow` 옵션 다루기
*   `Esc+Esc` 와 Checkpoint로 잘못된 변경 되돌리기

피드백 남기기

[

지시 대신 위임하는 방식 | Agentic Coding

AI 코딩 도구가 자동완성에서 Agentic 코딩으로 넓혀 온 흐름과 Claude Code가 그중 무엇에 집중하는지 배웁니다

](/learn/starting-conversations/llm-basics/agentic-coding-and-claude-code)[

읽고, 고치고, 커밋까지 | Claude와 첫 대화

다섯 번의 대화로 코드 읽기부터 파일 수정·실수 복구·git 커밋까지 첫 개발 흐름을 처음부터 끝까지 따라가며 권한 흐름을 체험합니다

](/learn/starting-conversations/getting-started/first-conversation)

---
Source: https://docs.claude-hunt.com/learn/starting-conversations/getting-started/setup-and-first-run
