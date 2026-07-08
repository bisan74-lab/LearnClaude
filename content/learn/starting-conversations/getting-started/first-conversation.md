# Claude와 첫 대화 | 제대로 배우기

Part 1 · 대화 시작하기Chapter 2 · Claude Code 입문

# 읽고, 고치고, 커밋까지 | Claude와 첫 대화

다섯 번의 대화로 코드 읽기부터 파일 수정·실수 복구·git 커밋까지 첫 개발 흐름을 처음부터 끝까지 따라가며 권한 흐름을 체험합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

Claude Code를 설치하고 첫 세션까지 띄웠습니다. 자연어 한 줄로 코드가 어떻게 움직이는지는 직접 써봐야 알 수 있습니다.

작은 Todo 앱을 받아 **코드 읽기 → 한 파일에 집중하기 → README 수정 → 실수 복구 → git 커밋** 까지, 다섯 번의 대화로 첫 개발 흐름을 처음부터 끝까지 경험합니다. 매 단계에서 Claude가 어떤 도구를 쓰고 어떤 권한이 필요한지 직접 관찰합니다.

### [학습 목표](#학습-목표)

*   Claude가 답을 추측하지 않고 파일을 직접 읽으며 답하는 모습을 관찰합니다.
*   `@` 로 답변 범위를 한 파일로 좁혀 정확도를 올립니다.
*   쓰기 작업의 권한 승인 흐름과 `Always allow` 의 동작을 이해합니다.
*   `Esc+Esc` 로 Rewind 메뉴를 열어 Checkpoint 지점으로 잘못된 변경을 되돌립니다.
*   자연어로 git 커밋을 지시하고 결과를 `!` 로 확인합니다.

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   Claude Code 설치·로그인 완료 (`claude --version` 으로 확인)
*   VS Code 또는 시스템 터미널 사용 가능

## [코드 읽고 커밋까지 한 번에](#코드-읽고-커밋까지-한-번에)

### [실습 환경 준비](#실습-환경-준비)

이번 실습은 강의에서 제공하는 Todo 앱 저장소를 clone 해서 진행합니다.

![VS Code Welcome 탭의 Clone Git Repository 옵션](/images/vscode-welcome.1v0z088oy7_iq.png)

VS Code를 열고 Welcome 탭에서 Clone Git Repository...를 클릭합니다. 상단 입력창에 다음 URL을 붙여넣고 Enter를 누릅니다.

```
https://github.com/toy-crane/todo-tutorial.git
```

Welcome 탭에 옵션이 없다면

Welcome 탭이 보이지 않거나 Clone Git Repository... 항목이 없을 수 있습니다. macOS는 `Cmd+Shift+P`, Windows는 `Ctrl+Shift+P` 로 Command Palette를 열고 `Git: Clone` 을 실행하면 동일한 입력창이 뜹니다.

저장 위치를 고르면 클론이 끝나고 폴더가 자동으로 열립니다. `` Ctrl+` `` 로 통합 터미널을 열고 실습 시작 브랜치로 전환한 뒤 의존성을 설치합니다.

```
git fetch origin
git checkout ch02-02
bun install
```

마지막으로 VS Code 통합 터미널에서 Claude Code를 실행합니다.

```
claude
```

### [다섯 번의 대화 흐름](#다섯-번의-대화-흐름)

읽기승인 불필요쓰기승인 필요Step 1"프로젝트 설명해줘"Read toolStep 2"@app/page.tsx 설명해줘"Read toolStep 3"README 수정해줘"Edit toolStep 4"커밋해줘"Bash tool

읽기는 자유롭게, 쓰기·셸 실행은 승인 후 진행됩니다

읽기에서 쓰기로 한 단계씩 넘어가며, Claude가 어떤 도구를 쓰고 어떤 권한이 필요한지 직접 관찰합니다.

### [Step 1: 프로젝트가 뭐하는지 묻기](#step-1-프로젝트가-뭐하는지-묻기)

Claude Code 입력창에 다음을 입력하고 Enter를 누릅니다.

> 이 프로젝트가 뭐하는 프로젝트야?

Claude는 답을 추측하지 않습니다. README.md, package.json, 주요 소스 파일을 직접 열어 읽고 그 결과를 바탕으로 답합니다. 터미널에서 어떤 파일을 여는지 실시간으로 확인할 수 있습니다.

Chapter 1에서 개념으로 본 [Tool Use](/learn/starting-conversations/llm-basics/tool-use-and-agent)가 여기서 실제로 동작합니다. 읽기 작업은 승인 없이 자유롭게 진행됩니다.

### [Step 2: @ 로 답변 범위 좁히기](#step-2--로-답변-범위-좁히기)

전체를 훑었으니 이번에는 한 파일에 집중합니다.

> @app/page.tsx이 파일이 하는 일을 설명해줘

`@` 를 입력하면 파일 경로 자리에서 탭 자동완성이 동작합니다. 지정한 파일이 Claude의 Context로 직접 들어가므로 "page.tsx 설명해줘" 처럼 검색을 시키는 것보다 답이 더 정확하고 빠릅니다.

Claude는 함수 역할, 데이터 흐름, 다른 파일과의 관계를 정리해 답합니다.

이미지도 같은 방식으로 Context에 올릴 수 있어요

디자인 시안이나 에러 스크린샷도 입력창에 붙여넣으면 Claude가 직접 읽고 답합니다. 클립보드에 이미지가 들어 있을 때 macOS는 `Ctrl+V` (iTerm2는 `Cmd+V` 도 가능), Windows는 `Alt+V` 로 붙여넣습니다.

### [Step 3: README 수정하기](#step-3-readme-수정하기)

여기서부터 Claude가 파일을 수정합니다. 읽기와 달리 쓰기는 승인을 거칩니다.

> README 의 Contributors 섹션에 "내 이름 - Frontend Developer" 를 추가해줘

수정을 시도하면 권한 프롬프트가 나타납니다.

```
Claude wants to edit README.md

Allow?  [y] Yes  [a] Always allow  [n] No
```

세 가지 선택지의 의미는 다음과 같습니다.

*   **`y` (Yes)**: 이번 한 번만 허용합니다. 다음에 같은 도구를 쓰면 다시 묻습니다.
*   **`a` (Always allow)**: 같은 도구의 모든 호출을 앞으로도 묻지 않고 자동 허용합니다. 허용 설정은 프로젝트 `settings.json` 에 저장됩니다.
*   **`n` (No)**: 거부합니다. Claude가 다른 방법을 찾거나 다음 지시를 기다립니다.

`y` 로 이번 한 번만 허용해 봅니다. 수정이 끝나면 변경 내용이 **diff** 로 표시됩니다. 추가된 줄은 초록색, 삭제된 줄은 빨간색입니다.

Always allow는 신중하게

`Always allow` 는 그 도구 전체를 무조건 자동 허용합니다. 예를 들어 `Bash` 를 한 번 `Always allow` 로 풀어두면 그 뒤로는 어떤 셸 명령도 묻지 않고 실행됩니다. 실수로 잘못 허용했다면 `/permissions` 명령으로 허용 목록을 확인하고 제거합니다.

### [Step 4: Esc+Esc로 되돌리기](#step-4-escesc로-되돌리기)

Step 3 결과가 예상과 다를 때가 있습니다. Contributors 섹션 대신 README 맨 위에 적혔거나, "내 이름" 이 그대로 들어갔거나.

이때 입력창을 비운 채 `Esc` 를 빠르게 두 번 누르면 **Rewind** 메뉴가 열립니다. 지금까지 보낸 지시가 체크포인트 목록으로 뜨고, 그중 돌아갈 지점을 고릅니다. 방금 README 를 고치기 직전 지점을 골라 `Enter` 를 누릅니다.

![Esc 를 두 번 눌러 연 Rewind 메뉴. 체크포인트 목록에서 돌아갈 지점을 고른다](/images/rewind-menu.10l7pv_fbks6k.png)

`Enter` 를 누르면 무엇을 되돌릴지 묻습니다. 위 세 개가 되돌리기, 아래 두 개는 대화를 요약(압축)하는 선택지입니다.

![돌아갈 지점을 고른 뒤 뜨는 복원·요약 선택지](/images/rewind-restore.1de0-mtfs5xn3.png)

*   **`Restore code and conversation`**: 파일 변경과 대화를 함께 그 지점으로 되돌립니다.
*   **`Restore conversation`**: 파일은 그대로 두고 대화만 되돌립니다.
*   **`Restore code`**: 대화는 그대로 두고 파일 변경만 되돌립니다.

여기서는 README 수정을 무를 거라 `Restore code` 를 고릅니다. 되돌린 뒤 더 구체적인 지시로 다시 요청합니다.

> README 의 Contributors 섹션(맨 아래)에 "토이크레인 - Frontend Developer" 한 줄만 추가해줘

구체적인 지시일수록 원하는 결과에 가깝습니다.

### [Step 5: git 커밋하기](#step-5-git-커밋하기)

마지막은 변경사항 저장입니다.

> 변경사항 커밋해줘

Claude는 `git add` 와 `git commit` 을 실행합니다. 셸 명령어 실행에도 승인이 필요합니다.

```
Claude wants to run: git add README.md

Allow?  [y] Yes  [a] Always allow  [n] No
```

`y` 로 허용하면 Claude가 변경 내용을 분석해 커밋 메시지를 자동으로 작성합니다. 결과는 `!` Bash 모드로 빠르게 확인할 수 있습니다.

> ! git log --oneline -1

```
a1b2c3d docs: add contributor to README
```

`!` 를 입력창 맨 앞에 두면 Claude를 거치지 않고 셸 명령이 그대로 실행됩니다. 빠른 상태 확인에 유용합니다.

다섯 번의 대화로 프로젝트 이해부터 파일 수정·실수 복구·git 커밋까지 끝났습니다.

## [실수 복구 심화: Checkpoint](#실수-복구-심화-checkpoint)

Step 4에서는 바로 직전 지점으로 돌아갔습니다. 그런데 Claude가 다섯 단계쯤 진행한 뒤, 처음 지시 자체가 잘못됐다는 걸 뒤늦게 알아챌 때가 있습니다.

이때도 같은 Rewind 메뉴를 씁니다. 새 지시를 줄 때마다 **Checkpoint**(체크포인트)가 자동으로 찍히므로, 메뉴의 목록에서 한 단계 전이 아니라 더 이전 지점을 고르면 그만큼 한 번에 돌아갑니다.

`Esc` 를 빠르게 두 번 눌러 Rewind 메뉴를 열고, "그 잘못된 지시 직전" 체크포인트를 고르면 됩니다.

Rewind는 한 방향입니다

되돌린 뒤 다시 원래 상태로 돌아가는 redo는 없습니다. 되돌렸다면 새 지시로 다른 방향을 잡고 진행하는 게 일반적입니다.

커밋·셸 명령은 Checkpoint로 되돌릴 수 없습니다

Rewind·Checkpoint는 Claude가 파일 도구로 만든 변경만 되돌립니다. 이미 git에 커밋된 변경이나 `rm`·`mv` 같은 셸 명령으로 생긴 변경은 그대로 남아, `git reset`·`git revert` 같은 명령이나 직접 작업으로 따로 처리해야 합니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

이 다섯 단계는 개발자가 평소 일하는 순서 그대로입니다.

1.  **읽기 (Step 1·2)**: 무엇이 있는지부터 봅니다. 추측 대신 실제 파일을 근거로 합니다.
2.  **이해**: 읽은 내용을 바탕으로 무엇을 어떻게 바꿀지 결정합니다. 사람이 판단하는 자리입니다.
3.  **수정 (Step 3)**: 정해진 변경을 코드에 반영합니다. 쓰기·셸 실행은 승인이 필요하고, `Always allow` 는 신중하게 씁니다.
4.  **실수 복구 (Step 4)**: `Esc+Esc` 로 Rewind 메뉴를 열어, 체크포인트 목록에서 한 단계 전이든 여러 단계 전이든 원하는 지점으로 되돌립니다.
5.  **저장 (Step 5)**: 변경을 커밋해 다음 단계로 넘깁니다.

**자연어 한 줄이 각 단계를 진행하지만, 무엇을 만들지·결과가 맞는지 판단하는 것은 사람의 몫입니다.**

Claude Code에 대해 모르는 게 있으면 Claude Code에게 물어보세요

Claude Code의 기능·설정·단축키가 궁금할 때 외부 ChatGPT나 Claude 웹에 물어보지 마세요. 같은 세션 안에서 직접 질문하는 편이 가장 빠릅니다. Claude Code는 현재 프로젝트에 접근할 수 있어 상황을 파악하고 직접 조치까지 가능합니다. 내부적으로 `claude-code-guide` 라는 전문 서브에이전트가 Claude Code 기능과 사용법을 정확하게 답합니다. 명시적으로 부르고 싶으면 입력창에 `@claude-code-guide` 처럼 `@` 뒤에 에이전트 이름을 입력하면 바로 호출됩니다.

## [FAQ](#faq)

### 여러 줄로 프롬프트를 쓰려면 어떻게 하나요?

### 스크린샷이나 디자인 시안을 Claude에게 보여주려면 어떻게 하나요?

### Claude가 파일을 너무 많이 읽어 시간이 오래 걸리면 어떻게 하나요?

### 커밋 메시지를 직접 지정하려면 어떻게 하나요?

### Claude가 잘못된 파일을 수정하려 하면 어떻게 막나요?

## [이어서 배울 내용](#이어서-배울-내용)

한 사이클을 끝내고 나면 두 가지가 마음에 걸립니다. 권한을 매번 묻는 흐름이 번거롭고, 잠시 멈춘 작업을 다음 세션에서 그대로 이어가고 싶어집니다.

다음 레슨에서는 자주 마주치는 이 두 상황을 다루는 명령을 정리합니다.

*   세션 관리: `--continue`, `--resume` 으로 이전 세션 다시 열기와 `/clear` · `/compact` 의 차이
*   권한 모드: `Shift+Tab` 으로 `default` · `acceptEdits` · `plan` · `auto` 4가지 순환

피드백 남기기

[

첫 대화 시작하기 | Claude Code 설치와 실행

Claude Code를 설치·로그인하고 요금제와 사용량 한도를 이해한 뒤 Opus·Sonnet·Haiku 모델을 골라 첫 대화를 시작합니다

](/learn/starting-conversations/getting-started/setup-and-first-run)[

매일 쓰는 명령 | 세션과 권한 모드

세션 관리 명령으로 이전 세션을 다시 열고 Context를 비우며, 권한 모드 4가지로 자동 허용 범위를 조절합니다

](/learn/starting-conversations/getting-started/daily-flow)

---
Source: https://docs.claude-hunt.com/learn/starting-conversations/getting-started/first-conversation
