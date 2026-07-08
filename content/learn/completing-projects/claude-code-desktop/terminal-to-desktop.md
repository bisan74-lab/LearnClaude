# Claude Code Desktop | 제대로 배우기

Part 3 · 프로젝트 완성하기Chapter 9 · Claude Code Desktop

# 쓰던 그대로, 앱에서 | Claude Code Desktop

Claude Desktop의 Code 탭에서 세션을 만들고, 터미널에서 배운 조작과 설정을 같은 방식으로 씁니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

Claude Code Desktop은 터미널에서 하던 Claude Code 작업을 앱 화면으로 제공합니다. 명령어를 하나씩 떠올리지 않아도 세션을 만들고, 권한 모드를 고르고, 변경 내역과 실행 화면을 확인할 수 있습니다.

### [학습 목표](#학습-목표)

*   개발 작업을 Code 탭에서 시작합니다.
*   새 세션에서 프로젝트 폴더와 권한 모드를 고릅니다.
*   터미널에서 쓰던 조작을 Desktop의 버튼과 화면에서 찾습니다.

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   Claude Desktop 설치와 Code 탭 로그인 ([사전 준비사항](/learn/prerequisites) 9번 항목)
*   Part 1에서 만든 본인 Todo 앱 또는 Claude Code로 열어 볼 로컬 프로젝트

## [Claude Desktop에서 Code 탭 고르기](#claude-desktop에서-code-탭-고르기)

Claude Desktop에는 Chat, Cowork, Code 세 탭이 있습니다. Chat은 일반 대화에 쓰고, Cowork는 코드 밖의 긴 업무를 맡길 때 씁니다. 로컬 저장소를 읽고 파일을 고치며 실행 결과까지 확인하는 개발 작업은 Code 탭에서 시작합니다.

![Claude Desktop에서 Code 탭이 선택된 화면](/images/code-tab.2g2c-ybabhkxg.png)

이 챕터에서는 Code 탭만 씁니다. 세션을 만들고, 변경 내용을 보고, 실행 화면과 터미널을 같은 창에 놓고 검토하는 흐름을 익힙니다.

### [새 세션 시작 전 확인할 것](#새-세션-시작-전-확인할-것)

터미널에서는 프로젝트 폴더로 이동해 `claude` 를 실행하고, 필요하면 `Shift+Tab` 으로 권한 모드를 바꿨습니다. Desktop에서는 같은 준비가 입력창 주변의 버튼과 드롭다운으로 바뀝니다.

![Claude Code Desktop 새 세션 입력창 주변의 확인 항목](/images/new-session-controls.0ohal0awqmhrv.png)

번호를 따라 보면 이렇게 나뉩니다.

1.  **실행 환경**: Claude를 어디서 실행할지 고릅니다. 이 레슨에서는 내 컴퓨터에서 도는 Local로 시작합니다.
2.  **프로젝트 폴더**: Claude가 읽고 고칠 저장소 폴더입니다.
3.  **브랜치와 worktree**: 현재 브랜치와 세션별 작업 공간입니다. worktree는 [병렬 작업 챕터](/learn/completing-projects/parallel-work/git-worktree-isolation)에서 배웁니다.
4.  **권한 모드**: 파일 수정과 명령 실행을 얼마나 자동으로 허용할지 정합니다.
5.  **모델**: 이번 세션에서 쓸 모델을 고릅니다.
6.  **추론 강도**: 모델이 답하기 전에 얼마나 깊이 생각할지 정합니다.
7.  **토큰 사용량**: 현재 세션이 지금까지 쓴 사용량입니다.

### [작업 화면 구성](#작업-화면-구성)

세션 안에서는 필요한 패널을 옆에 붙여 씁니다. 기본은 가운데 Chat입니다.

![Preview와 내장 터미널을 함께 연 Claude Code Desktop 작업 화면](/images/workspace-preview-terminal.1y8y7_kh35hod.png)

오른쪽 위에서 Preview와 터미널을 열 수 있습니다.

1.  **Preview**: 앱의 실행 화면을 세션 안에서 보는 패널입니다. Preview 버튼으로 엽니다.
2.  **내장 터미널**: 터미널 버튼을 눌러 같은 작업 폴더의 터미널을 엽니다.

또 하나 자주 여는 화면은 파일 트리입니다.

![Claude Code Desktop에서 프로젝트 파일 트리를 보는 화면](/images/file-tree.3k8329aww8o_h.png)

오른쪽 위 메뉴에서 Files를 열 수 있습니다.

1.  **더보기 메뉴**: 오른쪽 위 Preview 버튼 옆 더보기 메뉴를 엽니다.
2.  **Files**: 메뉴에서 Files를 고릅니다.

터미널에서는 `ls`, `tree`, `rg --files` 같은 명령으로 폴더 구조를 확인하지만, Desktop에서는 프로젝트의 폴더와 파일을 펼쳐 보며 전체 구조를 파악할 수 있습니다. 필요한 파일은 파일 트리에서 바로 열어 확인합니다.

Claude가 파일을 고치면 Diff 화면도 열 수 있습니다.

![Diff 화면에서 변경된 파일과 줄을 보는 Claude Code Desktop 화면](/images/diff-screen-overview.1k76994i54d44.png)

상단 툴바에서 Diff 화면을 열 수 있습니다.

1.  **변경사항 버튼**: 파일이 바뀌면 상단 툴바의 변경사항 버튼을 눌러 Diff 화면을 엽니다.

오른쪽에 `working tree` 패널이 열리고, 파일별 추가·삭제 줄 수와 실제 변경된 줄이 보입니다. 다음 레슨에서는 이 줄에 직접 코멘트를 달아 다시 요청합니다.

## [터미널에서 배운 것 그대로 쓰기](#터미널에서-배운-것-그대로-쓰기)

Part 1–2에서 익힌 조작은 버려지지 않습니다. 대부분 이름이 같거나, 버튼과 화면으로 위치만 바뀝니다.

터미널에서 배운 조작

Desktop에서는

폴더로 이동해 `claude` 실행

새 세션에서 프로젝트 폴더 선택

`Shift+Tab` 권한 모드 순환

입력창 옆에서 권한 모드 선택

권한 요청에 `y` 또는 `n` 응답

허용 또는 거절 버튼

Plan Mode 계획 승인

계획 카드의 승인 버튼

`claude --continue`, `claude --resume`

사이드바에서 세션 클릭

`/model` 모델 변경

입력창 옆 모델 선택

`@` 파일 첨부

`@` 자동완성, 이미지와 PDF는 드래그

`ls`, `tree`, `rg --files` 로 구조 확인

파일 트리에서 폴더와 파일 확인

`!` 셸 명령

내장 터미널

`/clear`, `/compact`, Skill 실행

같은 입력창에서 `/` 입력

### [권한 모드와 승인: 버튼으로 바꾸기](#권한-모드와-승인-버튼으로-바꾸기)

[권한 모드 4가지](/learn/starting-conversations/getting-started/daily-flow)는 그대로 있습니다. `Shift+Tab` 순환 대신 입력창 옆에서 모드를 고르고, 파일 수정과 명령 실행 요청은 대화 안의 버튼으로 승인하거나 거절합니다. [Plan Mode](/learn/starting-conversations/todo-app/plan-mode)도 같습니다. 계획이 카드로 표시되고, 승인하면 구현이 시작됩니다.

### [세션 복귀: 사이드바에서 고르기](#세션-복귀-사이드바에서-고르기)

Desktop에서 만든 세션은 왼쪽 사이드바에 남습니다. 터미널에서 `claude --continue` 와 `claude --resume` 으로 돌아가던 일을 Desktop에서는 세션 목록 클릭으로 처리합니다. 새 작업은 새 세션으로 시작하고, 같은 작업의 맥락을 줄이고 싶을 때는 입력창에서 `/compact` 를 실행합니다.

### [설정: 같은 파일 그대로 쓰기](#설정-같은-파일-그대로-쓰기)

Desktop과 터미널은 `CLAUDE.md`, Rules, Skills, Hooks, MCP 서버, settings를 공유합니다. 같은 저장소를 열면 Part 2에서 만든 자동화와 지침을 다시 설정할 필요가 없습니다. MCP와 플러그인은 화면 메뉴(Connectors, Plugins)로도 관리할 수 있습니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **Code 탭**: 로컬 저장소를 읽고 고치는 개발 작업은 Claude Desktop의 Code 탭에서 시작합니다.
2.  **새 세션 확인 항목**: Local, 프로젝트 폴더, 권한 모드, 모델을 먼저 확인합니다.
3.  **작업 화면**: Chat, 파일 트리, Diff, Preview, 내장 터미널을 한 세션 안에서 나란히 씁니다.
4.  **설정 공유**: `CLAUDE.md`·Rules·Skills·Hooks·MCP 설정은 Desktop과 터미널에서 함께 씁니다.

## [FAQ](#faq)

### 이제 터미널 대신 Desktop만 쓰면 되나요?

### 터미널에만 있는 기능은 무엇인가요?

### 터미널에서 하던 세션을 Desktop으로 옮길 수 있나요?

### VS Code 확장과는 무엇이 다른가요?

### Linux에서도 쓸 수 있나요?

## [이어서 배울 내용](#이어서-배울-내용)

Claude Code Desktop을 쓰는 가장 큰 이유는 변경 내용을 눈으로 보며 검토하기 쉽기 때문입니다. 다음 [Diff와 Preview 레슨](/learn/completing-projects/claude-code-desktop/diff-and-preview)에서는 Claude가 고친 줄에 코멘트를 달아 다시 요청하고, Preview로 실행 화면까지 확인하는 검토 흐름을 익힙니다.

피드백 남기기

[

Part 2 정리

Part 2에서 배운 What vs How, Context 품질 도구(Rules/Commands/Skills), 외부 연결(CLI/MCP), 실행 제어(Hooks/Custom Agent)를 정리합니다

](/learn/extending-claude/wrap-up)[

변경사항 바로 확인하기 | Diff와 Preview

Claude가 고친 줄에 라인 코멘트로 다시 요청하고, Preview로 실행 화면까지 세션 안에서 확인합니다

](/learn/completing-projects/claude-code-desktop/diff-and-preview)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/claude-code-desktop/terminal-to-desktop
