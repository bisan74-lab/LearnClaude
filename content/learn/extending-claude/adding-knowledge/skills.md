# Claude Code Skills | 제대로 배우기

Part 2 · Claude 확장하기Chapter 6 · Rules와 Skills

# 필요할 때만 꺼내 쓰는 매뉴얼 | Skills

CLAUDE.md에 지침을 쌓지 않고 작업이 시작될 때만 로드되는 Skill로 Context를 절약하는 구조를 익힙니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

[Custom Command](/learn/extending-claude/adding-knowledge/custom-commands)로 반복 프롬프트를 한 단어로 만들었습니다. 프롬프트 반복은 줄었지만, 프로젝트가 커지면 이번에는 지침 자체가 늘어납니다. 코드 리뷰 체크리스트, 배포 절차, 테스트 전략을 전부 CLAUDE.md에 넣으면 [Context Rot](/learn/starting-conversations/context-management/context-window#context-rot)이 매 대화마다 다시 나타납니다.

전문 지침을 별도 파일로 묶어두고, 해당 작업이 시작될 때만 Claude가 스스로 꺼내 보는 `Skill` 의 원리를 배웁니다.

### [학습 목표](#학습-목표)

*   CLAUDE.md에 모든 지침을 넣으면 Context가 어떻게 낭비되는지 설명할 수 있습니다
*   Skill의 Progressive Disclosure 3단계 로드 구조를 이해합니다
*   Custom Command와 Skill의 호출 방식 차이를 구분할 수 있습니다

## [매뉴얼이 다시 두꺼워지는 순간](#매뉴얼이-다시-두꺼워지는-순간)

[Rules](/learn/extending-claude/adding-knowledge/rules)로 규칙을 경로별로 쪼갰고, [Custom Command](/learn/extending-claude/adding-knowledge/custom-commands)로 반복 프롬프트를 한 단어로 줄였습니다. 그런데 프로젝트가 커지면 작업 방식 자체가 한 페이지짜리 매뉴얼이 됩니다. "코드 리뷰는 이 5개 관점을 이 형식으로", "배포는 이 체크리스트 순서대로, 실패 시 이 절차로 롤백" 같은 다단계 지침이 종류별로 늘어납니다.

이런 매뉴얼을 어디에 둘지가 문제입니다. Custom Command로 저장하면 호출과 동시에 본문이 통째로 컨텍스트에 들어오고, CLAUDE.md에 넣으면 매 대화 시작부터 Context Window 일부가 지침으로 채워집니다. 필요한 것은 지침을 없애는 것이 아니라, 지금 작업에 맞는 지침만 읽히게 하는 구조입니다.

버그 수정 요청에는 버그 수정 지침만, 배포 요청에는 배포 절차만 읽히면 됩니다.

Rules가 "경로별로 켜고 끈다"는 조건으로 이 문제를 풀었다면, Skill은 작업 주제가 맞을 때만 켜는 방식으로 풉니다.

## [Skill: 작업이 시작될 때만 켜지는 매뉴얼](#skill-작업이-시작될-때만-켜지는-매뉴얼)

Skill은 특정 작업이 들어왔을 때만 Claude가 꺼내 읽는 전문 매뉴얼입니다. 코드 리뷰, 커밋, 배포처럼 절차가 있는 작업을 CLAUDE.md에 계속 쌓지 않고, 필요한 순간에만 읽히도록 분리합니다.

![CLAUDE.md와 Skill의 색인 유무 비교](https://bisan74-lab.github.io/LearnClaude/images/recipe-book-vs-notebook.08no4n7acplj_.png)

CLAUDE.md는 색인 없는 손글씨 레시피 노트와 같습니다. 어디에 뭐가 적혔는지 모르니, 어떤 요리를 하려 해도 노트를 처음부터 다 펼쳐서 훑어야 합니다.

Skill은 목차와 색인이 잘 정리된 요리책에 가깝습니다. Claude는 매 대화 시작 시 책의 **목차** 한 장만 손에 듭니다. "김치찌개를 만들자" 라는 요청이 들어오면 목차에서 47쪽을 찾아 그 레시피 페이지만 펼쳐 봅니다. 나머지 페이지는 펴지 않습니다.

이 목차에 해당하는 것이 Skill의 **이름표**입니다. 매 대화가 시작될 때 Claude는 `.claude/skills/` 폴더를 훑어 각 Skill의 이름표(`name` 한 줄과 `description` 한 줄)만 컨텍스트에 올려둡니다. **`SKILL.md` 본문(실제 지침)은 이 시점엔 컨텍스트에 없습니다.** 사용자가 관련 작업을 요청하면, 그때 Claude가 description을 보고 필요한 Skill을 골라 본문만 추가로 읽어 들입니다.

이름표는 본문보다 훨씬 짧습니다. 본문 분량은 Skill마다 다릅니다. 중요한 점은 분량이 얼마든 호출 전에는 본문이 컨텍스트에 올라오지 않는다는 점입니다. Skill 열 권이 있어도 평소 컨텍스트엔 표지 열 장만 떠 있는 셈입니다.

이 구조를 파일로 옮기면 Skill은 보통 하나의 폴더가 됩니다. 커밋처럼 반복되는 작업을 Skill로 만들 때 최소 구조는 아래와 같습니다.

.claude

skills

commit

SKILL.md

핵심은 `SKILL.md` 하나입니다. 작업이 커지면 `references`, `templates`, `scripts` 같은 보조 파일을 옆에 둘 수 있지만, 처음부터 모두 필요하지는 않습니다.

## [Progressive Disclosure: 세 단계로 나눠 꺼내 보기](#progressive-disclosure-세-단계로-나눠-꺼내-보기)

트리거

매 대화 시작

로드되는 것

`name + description`

Context 사용량

`한 줄씩`

트리거

Skill 호출 시

로드되는 것

`SKILL.md 전체`

Context 사용량

`해당 Skill 만`

트리거

필요할 때만

로드되는 것

`references/*.md`

Context 사용량

`그때그때`

단계별로 필요한 만큼만 Context 에 쌓입니다

Skill은 Progressive Disclosure(점진적 공개)로 Context를 아낍니다. 필요한 만큼만, 필요할 때 단계적으로 공개합니다.

### [Step 1: 이름표 (매 대화)](#step-1-이름표-매-대화)

세션이 시작되면 Claude는 각 Skill의 `name` 과 `description` 만 읽습니다. Skill 하나당 한 줄 정도로 매우 짧습니다.

```
# Claude 가 세션 시작 시 보는 Skill 목록
- commit: 변경사항을 Conventional Commit 형식으로 커밋
- code-review: PR 코드 리뷰 (보안 / 성능 / 타입 안정성)
- deploy-checklist: Production 배포 절차와 롤백 기준
```

Skill이 10개 있어도 이름표 목록 전체가 짧은 한 단락 크기입니다. 같은 매뉴얼 10개의 본문을 CLAUDE.md에 그대로 옮겨 넣었다면 작업과 무관한 지침까지 매 대화마다 자동으로 불러옵니다.

### [Step 2: 지침 본문 (호출 시)](#step-2-지침-본문-호출-시)

사용자가 `/commit` 으로 직접 부르거나, Claude가 description을 보고 이 Skill이 필요하다고 판단하면 해당 Skill의 `SKILL.md` 본문을 읽습니다. CLAUDE.md와 달리 **필요한 Skill의 본문만** 선택적으로 읽어 들입니다.

### [Step 3: 참조 파일 (필요 시)](#step-3-참조-파일-필요-시)

최소 구조에서 보조 파일을 붙이면 같은 `commit` Skill은 이렇게 확장됩니다.

.claude

skills

commit

SKILL.md

references

conventional-commit-types.md

templates

commit-message.md

scripts

inspect-staged-files.sh

`SKILL.md` 안에는 보조 파일을 언제 읽을지 조건을 적습니다.

```
## 추가 참고 자료

- 커밋 타입이 애매하면 `references/conventional-commit-types.md` 를 읽습니다
- 커밋 메시지 형식을 맞춰야 하면 `templates/commit-message.md` 를 확인합니다
- staged 파일 구성이 복잡하면 `scripts/inspect-staged-files.sh` 를 실행합니다
```

Skill 폴더 안에 넣어둔 긴 레퍼런스·템플릿·스크립트는 이렇게 실제로 필요한 순간에만 추가로 읽거나 실행합니다.

이 구조 덕분에 Skill에 참조 자료를 아무리 묶어 넣어도 사용하기 전까지는 Context에 쌓이지 않습니다.

## [Command vs Skill: 호출 주체](#command-vs-skill-호출-주체)

Custom Command와 Skill은 둘 다 `.claude/` 아래에 저장하고 `/` 로 호출할 수 있어 겉보기엔 비슷합니다. 결정적 차이는 호출 주체입니다.

Custom Command

Skill

**호출 주체**

사용자만 (`/command`)

사용자 + Claude의 자동 판단

**구조**

마크다운 파일 1개

폴더 (SKILL.md + 참조 파일)

**로드 방식**

호출 시 전체 로드

3단계 Progressive Disclosure

**적합한 자리**

한 번에 끝나는 고정 프롬프트

다단계 워크플로우, 전문 지침

핵심은 첫 줄에 있습니다. **Skill은 Claude가 자동으로 필요한 것을 꺼내 씁니다.** 사용자가 "작업 끝났으니 커밋해줘"라고 자연어로 말해도 Claude가 commit Skill을 알아서 로드합니다. Command는 `/commit` 이라고 정확히 입력해야만 동작합니다.

Command를 Skill로 꼭 옮겨야 할까

Claude Code 초기에는 Custom Command가 유일한 프롬프트 재사용 방법이었습니다. Skill이 도입된 뒤 Command 기능을 포함하고 자동 호출까지 지원합니다. `.claude/commands/` 는 하위 호환을 위해 동작하지만, 새로 만드는 워크플로우는 Skill로 작성하는 걸 권장합니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **Context Rot**: 프로젝트가 커지면 지침 종류가 늘어납니다. CLAUDE.md에 전부 쌓으면 매 대화마다 전체를 불러와 Context가 낭비되고 준수율도 떨어집니다.
2.  **Progressive Disclosure**: 세션 시작 시엔 이름표만, 호출 시 본문, 필요 시 참조 파일을 단계별로 로드합니다.
3.  **호출 주체**: Command는 사용자만 호출하고, Skill은 Claude도 자동으로 꺼냅니다. "커밋해줘" 같은 자연어 요청에도 Skill이 반응합니다.

## [FAQ](#faq)

### Skill을 몇 개까지 등록할 수 있나요?

### CLAUDE.md에 "배포 요청일 때만 이 섹션을 읽어라" 같은 조건문을 두면 안 되나요?

## [이어서 배울 내용](#이어서-배울-내용)

이제 직접 Skill을 만들어 봅니다. 다음 레슨에서는 [Custom Commands 레슨](/learn/extending-claude/adding-knowledge/custom-commands)의 `/commit` Custom Command를 Skill로 옮겨 자동 호출이 되도록 바꾸고, 같은 Skill을 Skill Creator로 자동 생성해 보며 두 방식의 차이를 느껴 봅니다.

*   `.claude/skills/<이름>/SKILL.md` 구조와 frontmatter
*   `description` 작성의 긍정 / 부정 트리거
*   Skill Creator로 자동 생성과 description 다듬기

피드백 남기기

[

반복 프롬프트를 한 단어로 | Custom Commands

자주 쓰는 프롬프트를 마크다운 파일로 저장해 슬래시 한 단어로 호출하고, $ARGUMENTS와 frontmatter로 동적 명령을 만듭니다

](/learn/extending-claude/adding-knowledge/custom-commands)[

반복 프롬프트를 자동 호출로 | Skill 만들기

commit Command를 수동으로 Skill로 옮겨 보고, 작성 중에 부딪힌 막막함을 Skill Creator로 풀어보는 흐름을 체험합니다

](/learn/extending-claude/adding-knowledge/creating-skills)

---
Source: https://docs.claude-hunt.com/learn/extending-claude/adding-knowledge/skills
