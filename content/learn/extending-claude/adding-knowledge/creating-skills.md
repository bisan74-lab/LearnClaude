# Claude Code Skill 만들기 | 제대로 배우기

Part 2 · Claude 확장하기Chapter 6 · Rules와 Skills

# 반복 프롬프트를 자동 호출로 | Skill 만들기

commit Command를 수동으로 Skill로 옮겨 보고, 작성 중에 부딪힌 막막함을 Skill Creator로 풀어보는 흐름을 체험합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 8.

## [Overview](#overview)

[Custom Commands 레슨](/learn/extending-claude/adding-knowledge/custom-commands)에서 만든 `/commit` Command는 슬래시로 호출해야만 동작했습니다. 같은 내용을 Skill로 옮기면 "변경사항 커밋해줘" 같은 자연어로도 자동으로 호출할 수 있습니다. 이번 레슨에서는 commit Skill을 수동으로 한 번, Skill Creator로 한 번 만들어 두 흐름을 비교합니다.

### [학습 목표](#학습-목표)

*   `.claude/skills/<이름>/SKILL.md` 구조로 Skill을 수동으로 작성합니다
*   수동 작성에서 막히는 지점 (description·구조 판단)이 어디인지 설명할 수 있습니다
*   Skill Creator 플러그인을 설치하고 같은 Skill을 자동 생성해 차이를 체험합니다

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   실습 프로젝트의 시작 브랜치로 전환합니다.

```
git fetch origin
git checkout ch06-04
```

`ch06-04` 브랜치에는 [Custom Commands 레슨](/learn/extending-claude/adding-knowledge/custom-commands)에서 만든 `.claude/commands/commit.md` 가 포함돼 있습니다. 이 Command를 Skill로 옮기는 것이 이번 실습의 출발점입니다.

## [Step 1: 기존 Custom Command 삭제하기](#step-1-기존-custom-command-삭제하기)

먼저 Custom Commands 레슨에서 만든 `/commit` Custom Command를 정리합니다. 같은 이름이 두 곳에 있으면 무엇이 호출되는지 헷갈리기 쉬워, Skill로 옮기기 전에 깨끗하게 비웁니다.

```
rm .claude/commands/commit.md
```

이제 `/commit` 은 사라졌습니다. 다음 Step에서 같은 동작을 Skill로 다시 만듭니다.

## [Step 2: 수동으로 SKILL.md 작성하기](#step-2-수동으로-skillmd-작성하기)

Skill은 마크다운 파일 하나가 아니라 **폴더 단위**로 저장합니다. 프로젝트 루트에 `.claude/skills/commit/` 폴더를 만듭니다.

```
mkdir -p .claude/skills/commit
```

폴더 이름이 곧 Skill 이름이 됩니다. 이 폴더 안에 `SKILL.md` 본체와 선택적으로 참조 파일이 들어갑니다.

.claude

skills

commit

SKILL.md

references

`SKILL.md`는 Skill 본체라 필수이고, `references/`는 필요할 때만 추가하는 참조 자료 폴더입니다.

`.claude/skills/commit/SKILL.md` 를 다음과 같이 작성합니다.

```
---
name: commit
description: Conventional Commit 형식으로 변경사항을 커밋합니다. 코드 변경 후 커밋 요청, "커밋해줘", "변경사항 정리해줘" 요청 시 사용. 단순 git 명령어 질문에는 사용하지 않습니다.
---

# Commit Skill

## 커밋 절차

1. `git status` 와 `git diff --staged` 로 전체 상태를 파악합니다
2. 스테이징된 변경이 없으면 `git diff` 와 `git status` 로 수정된 파일·untracked 파일을 확인하고 관련 파일을 스테이징합니다
3. 변경 내용을 분석해 Conventional Commit 형식으로 메시지를 작성하고 자동으로 커밋합니다

## 커밋 메시지 규칙

- 형식: `<type>(<scope>): <description>`
- type: feat, fix, refactor, test, docs, chore
- scope: 변경된 주요 모듈·컴포넌트 이름
- description: 영어, 소문자, 현재형, 50자 이내

## 예시

- `feat(todo): add filter tabs for completion status`
- `fix(todo-item): resolve checkbox toggle not persisting`
```

Custom Command와 가장 큰 차이는 frontmatter의 `description`입니다. 이 한 줄로 Claude가 자동 호출 여부를 판단합니다. 위 예시를 세 부분으로 분해하면 이렇게 됩니다.

*   **하는 일**: "Conventional Commit 형식으로 변경사항을 커밋합니다."
*   **긍정 트리거**: "코드 변경 후 커밋 요청, '커밋해줘', '변경사항 정리해줘' 요청 시 사용"
*   **부정 트리거**: "단순 git 명령어 질문에는 사용하지 않습니다"

여기서 중요한 건 "언제 쓸지"만큼 "언제 쓰지 않을지"도 적는 것입니다. 커밋 요청에는 반응해야 하지만, `git` 사용법을 묻는 질문마다 commit Skill이 끼어들면 오히려 방해가 됩니다.

## [Step 3: 자동 호출 확인하기](#step-3-자동-호출-확인하기)

Step 1과 Step 2에서 `.claude/commands/commit.md` 를 삭제하고 `.claude/skills/commit/SKILL.md` 를 추가했으므로, 지금은 커밋할 변경사항이 있습니다.

```
git status
```

이 변경으로 Skill 호출을 확인합니다. 수동 호출과 자동 호출은 같은 commit Skill을 읽으므로, 아래 두 방식 중 하나만 실행합니다.

사용자 입력 (슬래시)

`/commit`

판단 단계 없음

결과

commit.md 로드 → 실행

사용자 입력 (자연어)

`"변경사항 커밋해줘"`

Claude 내부 판단

Claude 가 description 매칭

결과

Skill(commit) 로드 → 실행

Skill 은 자연어 요청만으로도 Claude 가 스스로 꺼냅니다

**수동 호출**

```
/commit
```

**자동 호출**

```
변경사항 커밋해줘
```

자동 호출이 성공하면 프롬프트 밑에 `Skill(commit) Successfully loaded skill` 이 표시되고, Claude가 커밋 절차를 바로 시작합니다.

선택한 방식으로 커밋까지 끝났다면 Skill 호출 확인은 완료입니다. 같은 변경사항으로 나머지 방식까지 다시 테스트하면 커밋할 내용이 없어 멈춥니다.

### [다 됐는데 석연치 않은 세 지점](#다-됐는데-석연치-않은-세-지점)

동작은 합니다. 다만 수동으로 쓰는 동안 감으로만 처리한 부분이 남습니다.

*   **description의 트리거가 충분하고 좁은지**: "작업 마무리해줘"라고 말해도 호출될까? "git 로그 보여줘" 질문에 끼어들진 않을까? 감으로 판단했습니다.
*   **본문에 빠진 게 없는지**: breaking change가 있을 때, co-author 표기가 필요할 때는 어떻게 처리할지 본문에 담지 않았습니다. 놓친 건지 확인할 길이 없습니다.
*   **참조 파일로 뭘 뺄지 기준**: 나중에 `references/commit-conventions.md` 같은 걸 추가할 때 본문에서 뭘 남기고 뭘 빼야 할지 모호합니다.

Step 5에서 Skill Creator로 이 세 지점을 어떻게 풀어내는지 살펴봅니다.

## [Step 4: Skill Creator 플러그인 설치하기](#step-4-skill-creator-플러그인-설치하기)

Skill은 동작합니다. 다만 Step 3 끝에서 남긴 질문은 아직 해소되지 않았습니다. Anthropic 공식 플러그인인 Skill Creator를 설치해 같은 Skill을 다시 만들어 봅니다.

Plugin 이란?

Plugin은 Skills·Commands·MCP·Hooks를 하나로 묶는 Claude Code 전용 확장 패키지입니다. 자세한 구조와 다른 Plugin 설치 방법은 다음 레슨에서 다룹니다. 여기서는 Skill Creator 하나를 설치하는 것만 체험합니다.

Claude Code 안에서 `/plugin` 을 입력해 플러그인 관리 화면을 엽니다.

```
/plugin
```

Anthropic 공식 마켓플레이스에서 `skill-creator` 를 찾아 설치합니다. 설치 직후에는 새 플러그인이 현재 세션에 바로 잡히지 않을 수 있습니다. `/reload-plugins` 로 다시 읽어옵니다. 그다음 `/skill-creator` 를 입력했을 때 응답이 돌아오는지 확인합니다.

Discover에 skill-creator가 보이지 않을 때

공식 마켓플레이스가 Discover 화면에 자동으로 잡히지 않을 수 있습니다. 다음 명령으로 마켓플레이스를 직접 추가하고, `/plugin`을 다시 실행합니다.

```
/plugin marketplace add anthropics/claude-plugins-official
```

## [Step 5: Skill Creator로 같은 Skill 다시 만들기](#step-5-skill-creator로-같은-skill-다시-만들기)

수동으로 만든 commit Skill을 먼저 삭제합니다. 같은 이름이 두 곳에 있으면 Claude가 어느 쪽을 호출할지 예측하기 어렵기 때문입니다.

```
rm -rf .claude/skills/commit
```

그리고 Skill Creator를 호출합니다.

```
/skill-creator Conventional Commit 형식으로 커밋하는 Skill을 만들어줘
```

Skill Creator는 대화로 요구사항을 정리합니다. 예를 들어 이런 질문이 돌아옵니다.

*   어떤 타입을 허용하는지 (feat/fix 만인지, 확장 타입까지인지)
*   description 언어·길이 제한이 있는지
*   breaking change는 어떻게 표기하는지
*   여러 파일 변경 시 scope를 어떻게 잡는지

Skill Creator의 질문을 따라가다 보면 Step 3 끝에서 막막했던 세 지점이 하나씩 풀립니다. 응답을 모아 SKILL.md를 자동으로 구성하고, description도 샘플 프롬프트 몇 개로 테스트하며 긍정·부정 트리거를 조정합니다. **감으로 적을 때와 달리, 놓친 게 있으면 대화 중에 드러납니다.**

## [Skill Creator가 편한 세 지점](#skill-creator가-편한-세-지점)

수동으로 써본 뒤 Skill Creator를 쓰면 특히 편한 지점이 세 가지입니다. 감으로 넘어갔던 부분을 Skill Creator로 채울 수 있습니다.

### [description 다듬기](#description-다듬기)

수동으로 쓸 땐 긍정·부정 트리거가 맞는지 감으로 판단했습니다. Skill Creator로 샘플 프롬프트를 테스트하면 의도한 자연어가 실제로 트리거되는지 확인할 수 있습니다.

### [본문과 참조 파일 분리](#본문과-참조-파일-분리)

뭘 `SKILL.md` 본문에 두고 뭘 `references/` 로 뺄지 기준이 모호했습니다. Skill Creator를 쓰면 Progressive Disclosure를 의식해 "매번 필요한 것 / 조건부로 필요한 것"으로 나눠 제안을 받습니다.

### [누락 확인](#누락-확인)

수동으로 썼을 땐 빠진 게 없는지 알 길이 없었습니다. Skill Creator는 요구사항을 질문으로 쪼개면서 빈칸을 드러냅니다. 그래서 작성자는 규칙을 감으로 떠올리는 대신, 답변해야 할 항목을 하나씩 채우면 됩니다.

세 지점 모두 Skill Creator를 쓰면 더 편합니다. 수동 작성이 더 편하다면 그것도 좋은 선택입니다. 결과물인 SKILL.md는 어느 쪽으로 만들든 같은 파일입니다.

## [Skill의 발전 방향](#skill의-발전-방향)

Skill은 처음부터 완벽할 필요가 없습니다. 한 파일만 있다가, 사용하면서 참조 자료를 하나씩 덧붙이는 방식이 가장 현실적입니다.

.claude

skills

commit

SKILL.md

references

commit-conventions.md

breaking-change-guide.md

처음에는 `SKILL.md`만 두고 시작합니다. 타입별 예시나 breaking change 감지 규칙처럼 매번 필요하지 않은 자료는 `references/`에 나중에 추가합니다.

SKILL.md 안에서 "breaking change가 감지되면 `references/breaking-change-guide.md` 를 읽는다"처럼 조건부로 참조 파일을 가리키면, Claude는 그 조건을 만났을 때만 참조 파일을 읽습니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **Skill은 폴더 단위 + description이 자동 호출의 열쇠**: `.claude/skills/<이름>/SKILL.md` 로 만들고, description의 세 조각 (하는 일 + 긍정 트리거 + 부정 트리거)이 자동 호출 정확도를 결정합니다.
2.  **수동 작성에서 막막한 부분은 Skill Creator로 해소**: description 튜닝·본문/참조 분리·누락 확인을 도구의 도움으로 채웁니다. 수동이 익숙하다면 그것도 좋은 선택입니다.
3.  **Command를 Skill로 옮기면 수동 호출이 자동 호출로**: `/commit` 같은 슬래시 입력 외에도 "커밋해줘" 같은 자연어에 반응합니다.

## [FAQ](#faq)

### Command와 Skill에 같은 이름이 둘 다 있으면 어떻게 되나요?

### Skill이 원치 않는 상황에서 자동 로드됩니다

### Skill의 자동 호출을 끄고 싶을 때는요?

## [이어서 배울 내용](#이어서-배울-내용)

Skill을 직접 만드는 방법을 익혔습니다. 그런데 모든 Skill을 직접 만들 필요는 없습니다. Anthropic 공식 플러그인과 커뮤니티 Skill을 그대로 가져다 쓸 수 있습니다. 다음 레슨에서는 Skill 마켓 두 곳(Plugin과 skills.sh)을 비교하고, shadcn Skill을 설치해 Todo 앱에 적용해 봅니다.

*   `/plugin` 으로 Anthropic 공식 Plugin 설치
*   `npx skills add` 로 커뮤니티 Skill 설치
*   직접 만들기 vs 가져다 쓰기 판단 기준

피드백 남기기

[

필요할 때만 꺼내 쓰는 매뉴얼 | Skills

CLAUDE.md에 지침을 쌓지 않고 작업이 시작될 때만 로드되는 Skill로 Context를 절약하는 구조를 익힙니다

](/learn/extending-claude/adding-knowledge/skills)[

기존 Skill 가져다 쓰기 | Skill 설치하기

기본 번들 Skill과 Plugin·skills.sh로 가져오는 외부 Skill을 다뤄 직접 만들 때와 가져다 쓸 때를 구분하는 법을 익힙니다

](/learn/extending-claude/adding-knowledge/installing-skills)

---
Source: https://docs.claude-hunt.com/learn/extending-claude/adding-knowledge/creating-skills
