# Claude Code Diff와 Preview | 제대로 배우기

Part 3 · 프로젝트 완성하기Chapter 9 · Claude Code Desktop

# 변경사항 바로 확인하기 | Diff와 Preview

Claude가 고친 줄에 라인 코멘트로 다시 요청하고, Preview로 실행 화면까지 세션 안에서 확인합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

터미널과 PR만으로도 변경사항을 검토할 수 있습니다. 다만 파일이 여러 개로 늘어나면 무엇이 바뀌었는지 한눈에 따라가기 어렵고, 실행 화면은 브라우저를 오가며 따로 확인해야 합니다. 고칠 부분을 다시 요청할 때도 어느 파일의 어느 줄인지 말로 설명해야 합니다. Claude Code Desktop은 Diff, Preview, 터미널, 라인 코멘트를 한 세션에 모아 이 검토 비용을 줄입니다.

### [학습 목표](#학습-목표)

*   변경된 파일과 줄을 Diff에서 검토합니다.
*   실행 화면을 Preview에서 확인합니다.
*   코멘트와 터미널로 수정 요청과 검증을 이어갑니다.

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   Part 1에서 만든 본인 Todo 앱

## [고쳤다는 말만 믿게 되는 순간](#고쳤다는-말만-믿게-되는-순간)

터미널과 PR에서도 검토는 가능합니다. 다만 도구가 흩어져 있습니다. 변경사항은 터미널 출력이나 PR 화면에서 보고, 실행 결과는 브라우저에서 확인하고, 수정 요청은 다시 채팅으로 설명해야 합니다.

문제는 검토를 못 한다는 데 있지 않습니다. 검토할 때마다 화면과 도구를 오가야 한다는 데 있습니다. 도구 전환이 반복되면 변경사항을 대충 보고, 실행 화면 확인을 미루고, Claude의 완료 응답만 믿게 됩니다.

Claude Code Desktop에서는 변경된 줄과 실행 결과를 같은 세션에서 봅니다. 마음에 들지 않는 줄에는 바로 코멘트를 남기고, 필요한 명령은 내장 터미널에서 이어서 실행합니다.

## [Diff 화면: 줄 단위로 검토하기](#diff-화면-줄-단위로-검토하기)

Claude가 파일을 수정하면 입력창 위에 `+2 -0` 같은 변경 표시가 나타납니다. 이 표시를 열면 오른쪽에 `working tree` diff 패널이 열리고, 파일별로 추가된 줄과 삭제된 줄을 확인할 수 있습니다. 초록색 줄은 새로 추가된 코드나 문장입니다.

### [라인 코멘트로 다시 요청하기](#라인-코멘트로-다시-요청하기)

특정 줄이 마음에 들지 않으면 그 줄을 클릭해 코멘트를 남깁니다. 예를 들어 이미지처럼 `README.md` 에 추가된 `by toycrane` 줄을 클릭하고 "README.md 최하단으로 이동해줘"라고 남기면, Claude는 어느 파일의 어느 줄을 말하는지 바로 알 수 있습니다.

![Diff 화면에서 README.md의 추가된 줄에 라인 코멘트를 입력하는 모습](/LearnClaude/images/diff-comment.1olnbdnjr5tmf.png)

## [Preview와 내장 터미널: 실행 결과 확인하기](#preview와-내장-터미널-실행-결과-확인하기)

코드 변경은 diff만으로 끝나지 않습니다. 실행 결과가 요구사항과 맞는지 확인해야 합니다. Desktop에서는 이 확인도 세션 밖으로 나가지 않습니다.

### [Preview로 앱 보기](#preview로-앱-보기)

Preview는 오른쪽 위의 Preview 버튼으로 엽니다.

![Claude Code Desktop 오른쪽 위의 Preview 버튼](/LearnClaude/images/preview-button.128viycmn5sm2.png)

아직 dev server 설정이 없으면 Preview 패널에 `No dev server configured` 가 표시되고, `Set up dev server` 버튼이 나타납니다. 이때 Claude에게 프로젝트의 실행 명령을 찾게 하거나, 직접 `.claude/launch.json` 에 서버 이름, 실행 명령, 포트를 적어 설정합니다.

![Preview 패널에 No dev server configured와 Set up dev server 버튼이 보이는 화면](/LearnClaude/images/preview-dev-server-setup.1tj7-ydaivvl4.png)

설정이 끝나면 Claude가 서버를 실행하고 앱 화면을 Preview 안에 띄웁니다. Claude가 같은 화면을 보므로, 내가 무엇이 잘못됐는지 말로 설명하지 않아도 Claude가 직접 확인하고 고칩니다.

![Preview에서 화면 요소를 선택하고 수정 요청을 입력하는 모습](/LearnClaude/images/preview-element-feedback.2vdobqd2bsj1z.png)

Diff에서 줄을 찍어 코멘트를 남기듯이, Preview에서는 화면 요소를 찍어 피드백을 줄 수 있습니다. 예를 들어 버튼이나 아이콘을 선택한 뒤 요청을 입력하면, Claude는 선택된 DOM 요소와 화면 상태를 함께 보고 수정합니다. 화면 위치를 말로 길게 설명하지 않아도 됩니다.

Preview가 브라우저를 완전히 대체하지는 않습니다. 다만 작은 UI 변경, 링크 확인, 에러 화면처럼 바로 봐야 하는 검증에는 브라우저 전환 없이 충분히 빠릅니다.

### [내장 터미널과 파일로 마무리 확인하기](#내장-터미널과-파일로-마무리-확인하기)

내장 터미널은 현재 세션의 작업 폴더에서 열립니다. `git status`, `bun test` 같은 명령이 Claude가 편집 중인 파일 상태 그대로 실행됩니다. 파일을 직접 확인하거나 손으로 고치고 싶다면 파일 메뉴에서 Cursor나 VS Code로 열어 수정합니다.

![내장 터미널에서 git status를 실행한 Claude Code Desktop 화면](/LearnClaude/images/terminal.191ef9bo2cilh.png)

## [\[미션\] Todo 앱을 화면에서 검토하기](#미션-todo-앱을-화면에서-검토하기)

Part 1에서 만든 Todo 앱의 제목 앞 이모지를 지우면서, 라인 코멘트와 Preview로 검토 흐름을 한 바퀴 돌아 봅니다.

### [Step 1: Todo 앱을 Code 탭에서 열기](#step-1-todo-앱을-code-탭에서-열기)

![Claude Code Desktop 새 세션에서 main 브랜치를 고른 화면](/LearnClaude/images/mission-branch-select.0uyjv2arse138.png)

`main` 브랜치가 이 미션의 시작점입니다. Code 탭에서 새 세션을 만들 때 Environment는 Local, Project folder는 본인 Todo 앱 폴더, 브랜치는 `main`으로 고릅니다. 그다음 Claude에게 다음 프롬프트를 입력합니다.

```
제목에 있는 sparkle 이모지 삭제해줘.
```

### [Step 2: Diff에서 검토하고 라인 코멘트로 다시 요청하기](#step-2-diff에서-검토하고-라인-코멘트로-다시-요청하기)

변경 표시를 열어 파일과 줄을 확인합니다. 제목 줄에서 이모지가 어떻게 바뀌었는지 보고, 더 다듬고 싶은 부분이 있으면 그 줄을 클릭해 자유롭게 다시 요청해 봅니다.

### [Step 3: Preview로 실행 화면 확인하기](#step-3-preview로-실행-화면-확인하기)

Preview를 열어 앱을 실행하고, 제목이 기대한 대로 보이는지 확인합니다. 화면에서 더 다듬고 싶은 부분이 보이면 Preview에서 해당 요소를 선택한 뒤 자유롭게 다시 요청해 봅니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **라인 코멘트**: diff의 줄을 클릭해 코멘트로 다시 요청하면 수정 위치를 말로 설명할 필요가 없습니다.
2.  **Preview·Terminal**: dev server 화면과 명령 실행을 세션 안에서 확인해 도구 전환을 줄입니다.

## [FAQ](#faq)

### Claude의 작업 과정을 더 자세히 보고 싶어요

### Preview의 dev server 명령은 어떻게 바꾸나요?

## [이어서 배울 내용](#이어서-배울-내용)

지금까지의 세션은 전부 내 컴퓨터(Local)에서 실행됐습니다. 다음 [Cloud 세션 레슨](/learn/completing-projects/claude-code-desktop/remote-sessions)에서는 세션을 컴퓨터 밖으로 보냅니다. 노트북을 덮어도 작업이 계속되고, 폰과 웹에서 이어받는 흐름을 다룹니다.

피드백 남기기

[

쓰던 그대로, 앱에서 | Claude Code Desktop

Claude Desktop의 Code 탭에서 세션을 만들고, 터미널에서 배운 조작과 설정을 같은 방식으로 씁니다

](/learn/completing-projects/claude-code-desktop/terminal-to-desktop)[

노트북을 덮어도 계속되는 세션 | Cloud 세션

이미 배포한 내 저장소로 Cloud 세션을 열어 README를 수정하고 PR을 만들어 봅니다

](/learn/completing-projects/claude-code-desktop/remote-sessions)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/claude-code-desktop/diff-and-preview
