# Claude Code Custom Commands | 제대로 배우기

Part 2 · Claude 확장하기Chapter 6 · Rules와 Skills

# 반복 프롬프트를 한 단어로 | Custom Commands

자주 쓰는 프롬프트를 마크다운 파일로 저장해 슬래시 한 단어로 호출하고, $ARGUMENTS와 frontmatter로 동적 명령을 만듭니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

앞 레슨에서 매뉴얼이 두꺼워질 때 Rules로 주제별 파일을 나눠 정리했습니다. 규칙은 정리됐지만, 같은 세션에서 또 다른 반복이 눈에 띕니다. 코드 리뷰·커밋·문서화처럼 자주 쓰는 프롬프트를 매번 똑같이 타이핑하고 있다면, 그 시간도 함께 누적됩니다.

반복 프롬프트를 마크다운 파일 하나로 저장하고 슬래시 한 단어로 호출하는 **Custom Command**를 배웁니다.

### [학습 목표](#학습-목표)

*   Custom Command가 어떤 문제를 해결하는지 이해합니다
*   `.claude/commands/` 에 마크다운 파일을 작성해 자신만의 Command를 만들 수 있습니다
*   `$ARGUMENTS` 와 frontmatter로 재사용 가능한 Command를 설계할 수 있습니다

## [매번 반복되는 프롬프트의 비용](#매번-반복되는-프롬프트의-비용)

매번 반복되는 프롬프트파일 하나 + 슬래시 한 단어변경사항 보고 commit 메시지 만들어줘…변경사항 보고 commit 메시지 만들어줘…변경사항 보고 commit 메시지 만들어줘…변경사항 보고 commit 메시지 만들어줘…변경사항 보고 commit 메시지 만들어줘…/commitcommit.md

자주 쓰는 프롬프트를 파일 하나에 저장하고 슬래시 한 단어로 호출합니다

Claude Code에 커밋 메시지를 부탁할 때마다 같은 말을 반복하고 있다면, 그 시간은 누적됩니다.

> 방금 변경한 것을 보고 Conventional Commit 형식으로 메시지를 작성해줘. type 은 feat/fix/refactor/chore 중에 적절한 걸로, scope 와 description 까지 같이.

처음에는 괜찮습니다. 하지만 하루에 5번, 일주일이면 25번 같은 프롬프트를 입력합니다. 복사-붙여넣기로 해결할 수도 있지만, 매번 어디에 저장해뒀는지 찾아야 합니다.

Rules가 매뉴얼의 반복을 `.claude/rules/` 로 쪼개 해결했다면, 프롬프트의 반복은 `.claude/commands/` 로 묶어 해결합니다. 자주 쓰는 프롬프트를 파일 하나에 저장하고 `/commit` 처럼 슬래시 한 단어로 호출합니다.

## [Custom Command: 마크다운 파일 하나](#custom-command-마크다운-파일-하나)

Custom Command는 `.claude/commands/` 폴더 안의 마크다운 파일입니다. **파일 이름이 곧 Command 이름**입니다. `commit.md` 를 만들면 `/commit` 으로 호출합니다.

.claude

commands

commit.md

doc.md

review.md

`doc.md`와 `review.md`도 같은 규칙으로 각각 `/doc`, `/review`가 됩니다.

## [Command를 점진적으로 확장하기](#command를-점진적으로-확장하기)

Command는 기본 프롬프트 한 줄에서 시작할 수 있습니다. 거기에 `$ARGUMENTS` 로 유연성을 더하고, 필요해지면 frontmatter로 동작을 조정합니다. 같은 파일을 세 단계에 걸쳐 확장합니다.

### [기본 프롬프트: 마크다운 한 줄](#기본-프롬프트-마크다운-한-줄)

마크다운 파일 하나면 Command가 됩니다. `.claude/commands/commit.md` 를 다음과 같이 작성합니다.

```
변경사항을 확인하고 Conventional Commit 형식으로 커밋해줘.

커밋 메시지 규칙:
- 형식: <type>(<scope>): <description>
- type: feat, fix, refactor, test, docs, chore
```

이제 Claude Code에서 `/commit` 을 입력하면 이 내용이 프롬프트로 전달됩니다. 매번 같은 말을 타이핑할 필요가 없습니다.

### [`$ARGUMENTS`: 호출할 때 입력 전달](#arguments-호출할-때-입력-전달)

Command를 호출할 때 추가 입력을 넘길 수 있습니다. 호출할 때 적은 입력은 그대로 `$ARGUMENTS` 자리에 들어갑니다.

위 `commit.md` 에 `$ARGUMENTS` 를 추가해 보겠습니다.

```
변경사항을 확인하고 Conventional Commit 형식으로 커밋해줘.

$ARGUMENTS 가 있으면 커밋 메시지에 반영해줘.

커밋 메시지 규칙:
- 형식: <type>(<scope>): <description>
- type: feat, fix, refactor, test, docs, chore
```

`/commit README 보강` 을 입력하면 `$ARGUMENTS` 자리에 `README 보강` 이 들어갑니다. Claude가 변경사항과 이 힌트를 함께 보고 커밋 메시지를 씁니다. 인자 없이 `/commit` 만 입력해도 Claude가 변경사항을 직접 읽고 메시지를 만듭니다.

### [frontmatter: 설명·도구·모델 제어](#frontmatter-설명도구모델-제어)

Command 파일 상단에 YAML frontmatter를 추가하면 동작을 더 세밀하게 조정할 수 있습니다.

같은 `commit.md` 에 frontmatter를 추가합니다.

```
---
description: "Conventional Commit 형식으로 커밋"
allowed-tools: Bash(git status *) Bash(git diff *) Bash(git add *) Bash(git commit *)
---

변경사항을 확인하고 Conventional Commit 형식으로 커밋해줘.

$ARGUMENTS 가 있으면 커밋 메시지에 반영해줘.

커밋 메시지 규칙:
- 형식: <type>(<scope>): <description>
- type: feat, fix, refactor, test, docs, chore
```

자주 쓰는 필드는 네 가지입니다.

필드

역할

예시

`description`

`/help` 에 표시되는 Command 설명

`"코드 리뷰 수행"`

`argument-hint`

사용자에게 입력 형식 안내

`[file-path]`

`allowed-tools`

승인 없이 실행할 도구 지정

`Bash(git diff *)`

`model`

특정 모델 강제

`haiku`, `sonnet`

*   **`allowed-tools`**: 지정한 도구는 승인 없이 자동 실행됩니다. 처음에는 이 필드 없이 실행한 뒤, 승인을 반복 요청하는 도구를 확인하고 추가합니다. `Bash(git diff *)` 는 "git diff로 시작하는 모든 명령 허용"이라는 뜻입니다. 괄호 안의 `*` 가 와일드카드라 뒤따르는 인자에 관계없이 `git diff` 로 시작하는 명령은 허용하고, `git push` 같은 다른 명령에는 평소처럼 승인을 받습니다. `Read`, `Grep` 처럼 도구 이름만 적으면 해당 도구 전체를 허용합니다.
*   **`model`**: 단순한 포맷 변환에는 `haiku` 를, 복잡한 아키텍처 리뷰에는 `sonnet` 을 쓸 수 있습니다.

frontmatter는 선택입니다

frontmatter 없이도 Command는 정상 작동합니다. 이 경우 설명이 `/help` 에 표시되지 않고, 도구 실행 시 매번 승인이 필요하며, 현재 대화의 모델이 그대로 사용됩니다.

## [\[미션\] Todo 앱에 Command 만들기](#미션-todo-앱에-command-만들기)

Todo 앱 프로젝트에서 실제로 쓸 수 있는 Custom Command를 만들어 봅니다.

`ch06-02` 브랜치가 이 미션의 시작점입니다. [Rules 레슨](/learn/extending-claude/adding-knowledge/rules)에서 만든 `.claude/rules/` 가 이미 들어 있습니다.

```
git fetch origin
git checkout ch06-02
```

### [Step 1: commands 폴더 만들기](#step-1-commands-폴더-만들기)

프로젝트 루트에 `.claude/commands/` 폴더를 만듭니다. `.claude/` 가 이미 있다면 `commands/` 만 추가합니다.

```
mkdir -p .claude/commands
```

### [Step 2: commit Command 저장하기](#step-2-commit-command-저장하기)

앞에서 단계별로 만든 `commit.md` 의 최종본을 `.claude/commands/commit.md` 에 저장합니다.

```
---
description: "Conventional Commit 형식으로 커밋"
allowed-tools: Bash(git status *) Bash(git diff *) Bash(git add *) Bash(git commit *)
---

변경사항을 확인하고 Conventional Commit 형식으로 커밋해줘.

$ARGUMENTS 가 있으면 커밋 메시지에 반영해줘.

커밋 메시지 규칙:
- 형식: <type>(<scope>): <description>
- type: feat, fix, refactor, test, docs, chore
```

### [Step 3: Command 파일 커밋하기](#step-3-command-파일-커밋하기)

`.claude/commands/commit.md` 자체가 새 변경입니다. 인자 없이 `/commit` 만 입력해 첫 실행을 해봅니다.

```
/commit
```

`allowed-tools` 에 git 명령을 지정해뒀으므로 승인 없이 변경사항 확인부터 커밋까지 끝납니다. 인자를 비우면 Claude가 변경사항을 읽고 메시지를 직접 작성합니다.

### [Step 4: 커밋할 변경 만들기](#step-4-커밋할-변경-만들기)

다른 작업에도 같은 Command를 써봅니다. Claude에게 README 보강을 맡겨 변경을 하나 만듭니다.

```
README.md 에 개발 서버 실행하는 방법을 한 줄 추가해줘.
```

Claude가 README를 읽고 그 형식에 맞춰 보강합니다. 저장이 끝나면 `git status` 에 `README.md` 가 modified로 잡힙니다.

### [Step 5: 인자와 함께 호출하기](#step-5-인자와-함께-호출하기)

이번엔 인자 자리에 작업 요약을 한 줄 적어 호출합니다.

```
/commit README 보강
```

`$ARGUMENTS` 자리에 `README 보강` 이 들어가 커밋 메시지에 반영됩니다.

Command가 보이지 않을 때

`/` 를 입력했을 때 Command 목록이 나타나지 않으면, 파일 경로를 확인합니다. Command 파일은 반드시 `.claude/commands/` 바로 아래의 `.md` 파일이어야 하고, 파일명은 영문·숫자·하이픈만 사용합니다. 경로가 맞는데도 목록에 안 보이면 Claude Code를 한 번 껐다가 다시 켜면 새 Command가 인식됩니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **Custom Command는 마크다운 파일 하나**: `.claude/commands/` 에 `commit.md` 를 넣으면 `/commit` 으로 호출합니다. 복잡한 설정이 필요 없습니다.
2.  **점진적으로 확장하는 구조**: 기본 프롬프트 → `$ARGUMENTS` → frontmatter 순으로 필요한 만큼만 덧붙이면 됩니다.
3.  **수동 호출이 핵심**: Command는 직접 `/` 로 꺼낼 때만 로드됩니다. 자동 로드가 없는 만큼 Context 부담 없이 자주 쓰는 워크플로우를 모아둘 수 있습니다.

## [FAQ](#faq)

### Command 파일 안에서 다른 파일을 참조할 수 있나요?

### Command와 CLAUDE.md에 같은 내용을 넣으면 어떤 차이가 있나요?

### Command를 중첩해서 호출할 수 있나요?

### 반복 프롬프트를 텍스트 파일로 저장해두고 복사-붙여넣기하면 안 되나요?

## [이어서 배울 내용](#이어서-배울-내용)

Custom Command로 반복 프롬프트를 제거했지만, 프로젝트가 커지면 새로운 문제가 생깁니다. 코드 리뷰 규칙·배포 절차·테스트 전략처럼 지침이 늘면 CLAUDE.md가 다시 비대해지고, Rules로 쪼개도 전역 규칙이 쌓이면 Context Rot이 반복됩니다.

다음 레슨에서는 이 한계를 해결하는 새로운 기능 **Skill** 을 배웁니다.

피드백 남기기

[

필요한 곳에서만 켜지는 규칙 | Rules

매뉴얼이 두꺼워질 때 규칙을 주제별 파일로 나누고, paths로 필요한 경로에서만 읽히는 구조를 익힙니다

](/learn/extending-claude/adding-knowledge/rules)[

필요할 때만 꺼내 쓰는 매뉴얼 | Skills

CLAUDE.md에 지침을 쌓지 않고 작업이 시작될 때만 로드되는 Skill로 Context를 절약하는 구조를 익힙니다

](/learn/extending-claude/adding-knowledge/skills)

---
Source: https://docs.claude-hunt.com/learn/extending-claude/adding-knowledge/custom-commands
