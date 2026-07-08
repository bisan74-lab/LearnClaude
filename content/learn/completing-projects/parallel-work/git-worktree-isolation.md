# Claude Code Git Worktree 격리 | 제대로 배우기

Part 3 · 프로젝트 완성하기Chapter 11 · 병렬 작업

# 한 폴더, 한 브랜치 | Git Worktree 격리

git worktree로 여러 Claude에게 독립 작업 폴더를 주고, claude -w로 worktree 생성부터 정리까지 자동화합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

[SDD 사이클](/learn/completing-projects/spec-driven-development/sdd#sdd-cycle)로 한 번에 하나의 기능을 완성하는 흐름을 익혔습니다. 이번 레슨은 그 사이클을 둘 이상 동시에 돌릴 때 부딪히는 충돌을 다룹니다. 브랜치만으로는 막을 수 없는 이유를 짚고, git worktree로 각 Claude에게 독립된 작업 폴더를 주는 방법을 익힙니다. `claude -w`로 worktree 생성부터 정리까지 한 번에 처리합니다.

### [학습 목표](#학습-목표)

*   브랜치만으로 두 Claude를 동시에 돌릴 수 없는 이유를 한 폴더의 동작으로 설명할 수 있습니다
*   `claude -w`로 두 Claude를 각자의 폴더에서 동시에 돌려 두 PR을 끝낼 수 있습니다
*   세션 종료 시 Keep/Remove 선택이 무엇을 남기고 무엇을 지우는지 구별할 수 있습니다

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   [SDD 사이클](/learn/completing-projects/spec-driven-development/sdd#sdd-cycle)을 완주한 본인 feedme repo의 `main` 브랜치 상태를 맞춰 둡니다.

`main`이 이 레슨의 시작점입니다. 이후 worktree·브랜치 작업은 모두 본인 GitHub 저장소 위에서 진행하므로 PR도 본인 repo에 그대로 올라갑니다.

## [브랜치만으로는 동시 작업이 어려운 이유](#브랜치만으로는-동시-작업이-어려운-이유)

![같은 폴더에서 두 Claude가 같은 파일을 동시에 수정해 충돌하는 상황](images/dual-agent-collision.1x68b176c2g-b.png)

Claude A에게 README에 사용법 섹션을, Claude B에게 README에 라이선스 섹션을 추가해달라고 가정합니다. 같은 폴더에서 두 Claude를 동시에 실행하면 같은 파일을 동시에 수정해 한쪽이 저장한 내용을 다른 쪽이 덮어씁니다.

여기서 자연스러운 의문이 듭니다. "브랜치를 따로 만들면 되지 않나?" Claude A는 `feature-usage`에서, Claude B는 `feature-license`에서 일하면 변경이 섞이지 않을 것 같습니다.

실제로 해보면 한 가지 사실이 드러납니다. **한 폴더는 한 번에 한 브랜치**의 파일만 담고 있습니다.

같은 폴더, 같은 경로./README.md● feature-usageREADME.md\## 사용법·bun install && bun devgit checkout내용 교체● ch10-02README.md\# Todo Tutorial·(README 원본)한 폴더는 한 번에 한 브랜치의 파일만 담습니다

같은 경로의 파일이, 꺼낸 브랜치에 따라 통째로 다른 내용으로 교체됩니다

`feature-usage` 브랜치를 꺼내면 폴더 안 `README.md`에 "## 사용법"이 들어 있고, `main`으로 전환하면 같은 경로의 파일이 통째로 원본으로 교체됩니다. 같은 슬롯이 시점마다 다른 내용을 담으므로, 같은 폴더를 쓰는 두 Claude는 같은 브랜치를 공유할 수밖에 없습니다.

여기에 커밋하지 않은 변경이 남아 있으면 git이 브랜치 전환 자체를 막습니다. 그래서 같은 폴더만으로는 각자 자기 브랜치에서 동시에 일할 수 없고, 폴더를 따로 두어야 합니다.

### [이력과 작업 공간 분리하기](#이력과-작업-공간-분리하기)

브랜치는 작업 이력(커밋 히스토리)을 분리하지만, 작업 공간(폴더)은 분리하지 않습니다. 두 Claude가 동시에 일하려면 폴더를 따로 두어야 합니다. 이번 레슨에서 다룰 `git worktree`가 바로 그 역할을 합니다.

## [git worktree로 작업 공간 분리](#git-worktree로-작업-공간-분리)

git checkout한 번에 한 브랜치만Working directory● main꺼내지 않은 브랜치 (파일은 보이지 않음)feature-afeature-b전환 시 디렉토리 내용이 교체됩니다git worktree여러 브랜치를 동시에.git (공유)/branchmainworktrees/feature-a/branchfeature-aworktrees/feature-b/branchfeature-b세 디렉토리가 나란히 존재 · 파일 상태가 각자 독립

checkout 은 한 번에 하나, worktree 는 여러 브랜치를 각각 별도 디렉토리에 동시에

**git worktree**는 한 저장소에서 폴더를 추가로 만들어, 각 브랜치를 각자의 폴더에 동시에 띄우는 기능입니다. 각 폴더는 파일 상태가 독립적이지만, `.git` 저장소 자체(커밋 히스토리, 원격 설정 등)는 공유합니다.

*   원본 폴더: `main` 브랜치
*   `worktrees/feature-a/`: `feature-a` 브랜치
*   `worktrees/feature-b/`: `feature-b` 브랜치

세 폴더가 동시에 존재하므로, Claude A와 Claude B를 서로 다른 폴더에서 실행하면 파일이 겹칠 자리 자체가 사라집니다.

### [수동으로 worktree 만들어보기](#수동으로-worktree-만들어보기)

[브랜치 전환 데모](#%EB%B8%8C%EB%9E%9C%EC%B9%98%EB%A7%8C%EC%9C%BC%EB%A1%9C%EB%8A%94-%EB%8F%99%EC%8B%9C-%EC%9E%91%EC%97%85%EC%9D%B4-%EC%96%B4%EB%A0%A4%EC%9A%B4-%EC%9D%B4%EC%9C%A0)로 남은, 커밋하지 않은 변경을 정리하고 worktree로 다시 시도합니다.

> ```
> git checkout -- .
> ```

`feature-a`와 `feature-b`를 각각 별도 worktree로 만듭니다.

> ```
> git worktree add worktrees/feature-a -b feature-a
> git worktree add worktrees/feature-b -b feature-b
> ```

`-b`는 새 브랜치를 함께 만드는 옵션입니다.

이제 `worktrees/feature-a/`를 VS Code로 열고 파일을 수정해봅니다. 원본 폴더의 Source Control 패널(Cmd+Shift+G)과 `worktrees/feature-b/`에는 그 변경이 전혀 보이지 않습니다. 에러도 stash도 없이, 두 기능을 동시에 진행할 수 있습니다.

사용이 끝난 worktree는 목록으로 확인하고 제거합니다.

> ```
> git worktree list
> git worktree remove worktrees/feature-a
> git worktree remove worktrees/feature-b
> ```

worktree를 손으로 만들고, 작업하고, 정리하는 흐름을 살펴봤습니다. 이 절차를 매번 반복하긴 번거로우니, `claude -w`로 흐름 전체를 한 커맨드로 처리합니다.

## [claude -w: worktree 생명주기 자동화](#claude--w-worktree-생명주기-자동화)

claude -w <name>1worktree 생성.claude/worktrees/<name>/2Claude 세션해당 디렉토리에서 실행3세션 종료Ctrl+C · /exit자동 삭제변경 없음 · 프롬프트 없이 정리Keep변경 있음 · --resume 로 이어가기Remove변경 있음 · 로컬 변경·커밋 삭제

한 커맨드가 생성·세션·정리를 묶어 처리하고, 종료 시 변경 유무에 따라 분기

`claude -w`는 세 가지를 자동으로 처리합니다. `.claude/worktrees/` 아래에 worktree를 만들고, 그 폴더에서 Claude 세션을 시작하고, 세션 종료 시 변경 유무에 따라 자동으로 정리하거나 Keep/Remove를 물어봅니다. `-w`는 `--worktree`의 축약형입니다.

이름을 지정해 실행해 봅니다.

> ```
> claude -w update-page-title
> #         ─────────────────
> #         worktree 이름
> ```

이름을 지정하면 경로와 브랜치를 미리 알 수 있습니다. `.claude/worktrees/update-page-title/` 폴더가 생기고, `worktree-update-page-title` 브랜치에서 세션이 시작됩니다. 이름을 생략하면(`claude -w`) Claude가 대화 맥락을 보고 이름을 자동으로 붙입니다.

이 폴더 구조는 이미 본 적이 있습니다. [Claude Code Desktop](/learn/completing-projects/claude-code-desktop/terminal-to-desktop)에서 세션마다 자동으로 생기던 격리된 작업 폴더가 바로 이 worktree입니다. Desktop은 세션을 만들 때 알아서 처리해 주고, 터미널에서는 `claude -w`로 같은 일을 직접 합니다.

## [\[미션\] 두 Claude로 PR 두 개 동시에 처리하기](#미션-두-claude로-pr-두-개-동시에-처리하기)

### [Step 1: 두 worktree 동시 시작](#step-1-두-worktree-동시-시작)

터미널 두 개를 열고 각각 실행합니다.

> ```
> # 터미널 1: 메인 카피 다듬기 작업
> claude -w polish-landing-copy
> ```

> ```
> # 터미널 2: README 업데이트 작업
> claude -w update-readme-md
> ```

각각 `.claude/worktrees/polish-landing-copy/`, `.claude/worktrees/update-readme-md/` 폴더가 생기고, 브랜치는 `worktree-polish-landing-copy`, `worktree-update-readme-md`로 시작됩니다.

### [Step 2: 각 Claude에게 작업 동시 지시](#step-2-각-claude에게-작업-동시-지시)

터미널 1(`polish-landing-copy`)의 Claude에게:

> "`app/page.tsx` 의 메인 헤더 카피 한 줄을 좀 더 따뜻한 톤으로 다듬어줘. 작업이 끝나면 커밋해줘."

터미널 2(`update-readme-md`)의 Claude에게:

> "README.md 에 프로젝트 개요와 실행 방법(`bun install`, `bun dev`)을 추가해줘. 작업이 끝나면 커밋해줘."

두 Claude가 각자의 폴더에서 동시에 진행합니다. 서로 다른 파일을 건드리고 폴더도 분리되어 있어 한쪽 작업이 다른 쪽에 영향을 주지 않습니다.

### [Step 3: 각 Claude에게 PR 생성 지시](#step-3-각-claude에게-pr-생성-지시)

커밋이 끝나면 각 Claude에게 PR을 만들라고 지시합니다.

> "PR 만들어줘"

두 Claude가 각각 push와 `gh pr create`로 PR을 만듭니다. GitHub에 두 PR이 올라옵니다.

### [Step 4: GitHub 머지 + worktree 정리](#step-4-github-머지--worktree-정리)

GitHub에서 두 PR을 Merge합니다. 원격 `main`에는 페이지 제목 변경과 README 업데이트가 모두 반영됩니다.

각 터미널에서 `/exit` 또는 Ctrl+C로 세션을 종료합니다. push와 머지까지 끝났으므로 Keep/Remove 프롬프트에서 **Remove**를 선택해도 안전합니다.

## [Keep/Remove: 세션 종료 시 선택](#keepremove-세션-종료-시-선택)

![Claude 세션 종료 시 등장하는 Keep/Remove 선택 프롬프트](images/worktree-exit-prompt.36jx_nowtz1_8.png)

Claude 세션을 종료하면(Ctrl+C 또는 `/exit`), worktree 상태에 따라 동작이 달라집니다.

*   **변경이 전혀 없는 경우**: 프롬프트 없이 worktree 폴더와 브랜치가 자동으로 삭제됩니다.
*   **커밋이나 수정이 남아 있는 경우**: Keep/Remove 선택 프롬프트가 뜹니다.
    *   **Keep worktree**: `.claude/worktrees/<name>/`에 폴더와 브랜치가 그대로 남습니다.
    *   **Remove worktree**: 로컬의 변경과 커밋이 전부 삭제됩니다.

push나 PR 병합까지 끝낸 작업은 Remove를 선택해도 원격에 이미 반영되어 있어 안전합니다. **반대로 push하지 않은 상태에서 Remove를 선택하면, 그 작업은 복구하기 어렵습니다.**

### [중단된 작업 이어가기](#중단된-작업-이어가기)

Keep을 선택해 worktree를 남겼다면, 나중에 같은 worktree에서 세션을 이어갈 수 있습니다.

> ```
> claude -w update-page-title --resume
> #                           ────────
> #                           이전 세션 목록에서 선택
> ```

`--resume` 대신 `--continue`를 쓰면 가장 최근 세션을 바로 이어서 시작합니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **브랜치·폴더 분리**: 한 폴더는 한 번에 한 브랜치의 파일만 담고 있습니다. 두 Claude가 같이 일하려면 폴더 자체를 둘로 늘려야 합니다.
2.  **`git worktree`**: 한 저장소에서 `.git`을 공유하면서 폴더만 추가합니다. 여러 브랜치를 각각 다른 폴더에 동시에 띄울 수 있고, clone을 여러 번 받는 것보다 디스크와 설정 면에서 가볍습니다.
3.  **`claude -w <name>`**: 폴더 생성·사용·정리를 한 커맨드로 묶어줍니다. 이름을 지정하면 경로와 브랜치가 예측 가능하고, 세션 종료 시 변경 유무에 따라 자동으로 정리되거나 Keep/Remove 선택 화면이 뜹니다.

## [FAQ](#faq)

### 그냥 git clone을 여러 번 받으면 안 되나요?

### git worktree를 만들면 디스크 공간이 두 배가 되나요?

### push 없이 세션을 종료하면 어떻게 되나요?

### 이름을 지정하지 않고 claude -w만 실행하면 어떤 이름이 생성되나요?

### 새 worktree에 .env 같은 환경 파일을 자동으로 가져가려면?

### worktree 생성·삭제 시점에 자동 셋업이 가능한가요?

## [이어서 배울 내용](#이어서-배울-내용)

각 Claude에게 독립된 작업 폴더를 주는 방법을 익혔습니다. 다만 터미널을 두세 개까지는 양옆에 세워 두면 보이지만, 다섯 개 이상으로 늘어나면 어떤 세션이 입력을 기다리는지 놓치기 쉽습니다. 다음 레슨은 여러 백그라운드 세션을 한 화면에서 관리하는 Agent View를 다룹니다.

피드백 남기기

[

신호를 도구로 만들기 | Compound

한 사이클에서 만난 강한 신호는 그 자리에서, 약한 신호는 여러 사이클에 걸쳐 쌓인 뒤 Skill·Hook·Rule·CLAUDE.md로 만들어집니다

](/learn/completing-projects/spec-driven-development/compound)[

여러 세션 한눈에 보기 | Agent View

\`claude agents\`로 백그라운드 세션 여러 개를 한 화면에서 띄우고, 들여다보며, PR 머지까지 가는 흐름을 익힙니다

](/learn/completing-projects/parallel-work/agent-view)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/parallel-work/git-worktree-isolation
