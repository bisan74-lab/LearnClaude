# Claude Code Agent View | 제대로 배우기

Part 3 · 프로젝트 완성하기Chapter 11 · 병렬 작업

# 여러 세션 한눈에 보기 | Agent View

\`claude agents\`로 백그라운드 세션 여러 개를 한 화면에서 띄우고, 들여다보며, PR 머지까지 가는 흐름을 익힙니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

앞 레슨에서 worktree와 `claude -w`로 두 Claude를 각자의 폴더에 띄워 두 PR을 동시에 끝냈습니다. 다만 터미널이 2 개에서 5 개로 늘어나면 어떤 세션이 입력을 기다리는지 놓치기 쉽습니다. `claude agents`로 여러 백그라운드 세션을 한 대시보드에서 띄우고 들여다보는 Agent View를 익힙니다.

### [학습 목표](#학습-목표)

*   백그라운드 세션이 무엇이고 왜 터미널이 닫혀도 작업을 이어가는지 설명할 수 있습니다.
*   `claude agents`로 세 가지 경로(입력창, `/bg`, `claude --bg`) 중 골라 세션을 띄울 수 있습니다.
*   세션 상태와 PR 표시등을 읽고 어느 세션부터 챙겨야 하는지 판단합니다.
*   한 대시보드에서 여러 세션을 동시에 진행하고, 들여다보기 패널로 질문에 답합니다.

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   Claude Code v2.1.139 이상. `claude --version`으로 확인합니다
*   [SDD 사이클](/learn/completing-projects/spec-driven-development/sdd#sdd-cycle)을 완주한 본인 feedme repo가 기반입니다. 앞 [Git Worktree 격리 레슨](/learn/completing-projects/parallel-work/git-worktree-isolation)에서 두 PR을 머지한 `main` 브랜치 상태에서 이어 갑니다

## [대시보드로 옮겨가기](#대시보드로-옮겨가기)

앞 레슨에서 worktree 둘을 따로 띄워 두 PR을 끝냈습니다. 작업 폴더를 둘로 늘리는 데까지는 터미널을 양옆에 세워 두면 보입니다.

문제는 그 다음입니다. 한 사람이 5 개 작업을 동시에 돌리려고 터미널 5 개를 열면, 어떤 세션이 입력을 기다리는지·어느 세션이 끝났는지·어디에서 PR이 올라왔는지를 한눈에 파악하기 어렵습니다. **입력을 기다리는 세션을 놓치면 그 작업은 그대로 멈춰 있습니다.**

**Agent View**는 이렇게 흩어진 세션을 한 대시보드에 모아 보여 주는 도구입니다. 여기서 다루는 백그라운드 세션은 터미널이 닫혀도 계속 돌아가는 Claude Code 세션이고, supervisor라는 별도 프로세스가 그 수명을 관리합니다.

[Claude Code Desktop의 세션 사이드바](/learn/completing-projects/claude-code-desktop/terminal-to-desktop)를 써 봤다면 낯익은 구조입니다. Agent View는 같은 역할을 터미널에서 맡는 대시보드입니다.

## [Agent View 띄우기](#agent-view-띄우기)

> ```
> claude agents
> ```

이 명령으로 Agent View에 들어갑니다. 처음 들어가면 세션 목록이 비어 있고, 아래쪽에는 새 작업을 적을 입력창과 단축키 안내만 보입니다.

![세션 목록이 비어 있는 Agent View 첫 진입 화면](/LearnClaude/images/agent-view-empty.0w5btaxh_gjsu.png)

상단 헤더에는 Claude Code 버전, 모델, 작업 디렉토리, 세션 카운트가 보입니다. `Esc`를 누르면 터미널로 돌아갑니다. 빠져나가도 백그라운드 세션은 계속 돌아갑니다.

## [수정할 때 자동으로 worktree 만들기](#수정할-때-자동으로-worktree-만들기)

`claude -w`와 달리 Agent View는 매번 `-w`를 붙이지 않아도 됩니다. 백그라운드 세션은 파일을 편집해야 할 때 자기만의 worktree를 새로 만들고 그 안에서 작업합니다. 같은 저장소에서 여러 세션이 돌아도 각자 자기 폴더에 씁니다.

`-w`를 매번 붙이지 않아도 되므로, 여러 세션을 한 화면에서 지켜보는 데 집중할 수 있습니다.

## [세 가지 경로로 세션 띄우기](#세-가지-경로로-세션-띄우기)

같은 백그라운드 세션을 세 군데에서 시작할 수 있습니다. 어느 경로든 같은 대시보드에 행 하나로 모입니다.

### [입력창에서 띄우기](#입력창에서-띄우기)

Agent View의 입력창에 작업을 적고 `Enter`를 누르면 새 백그라운드 세션이 열립니다. 세션 목록에 새 행이 추가됩니다.

Enter 마다 새 세션

입력창에 한 번 적고 `Enter`를 누른 내용이 그대로 한 세션이 됩니다. 셋을 병렬로 돌리려면 첫 작업을 적고 `Enter`, 다음 작업을 적고 `Enter` 식으로 한 번에 하나씩 띄웁니다. 입력창에서 한 번에 여러 세션을 묶어 띄우는 방법은 아직 없습니다.

### [세션 안에서 `/bg`로 띄우기](#세션-안에서-bg로-띄우기)

이미 열려 있는 일반 Claude 세션을 백그라운드로 보낼 때는 `/background`(줄여서 `/bg`)를 씁니다. 또는 빈 입력창에서 `←` 키를 누르면 세션을 백그라운드로 보내고 Agent View도 함께 엽니다. 어느 쪽이든 해당 세션은 세션 목록에 행 하나로 추가됩니다.

### [터미널에서 `claude --bg`로 띄우기](#터미널에서-claude---bg로-띄우기)

Agent View를 거치지 않고 곧장 백그라운드 세션을 시작하고 싶다면 터미널에서 `--bg` 플래그를 씁니다. `--name`으로 처음부터 세션 이름을 지정할 수 있고, 안 붙이면 프롬프트에서 자동으로 만들어집니다.

> ```
> claude --bg --name "fix-empty-state" "..."
> ```

## [화면 둘러보기](#화면-둘러보기)

세션을 한두 개 띄우면 세션 목록이 채워지면서 Agent View의 기본 구조가 보입니다.

*   상단 헤더: Claude Code 버전, 모델, 작업 디렉토리, 세션 카운트
*   가운데 세션 목록: 백그라운드 세션 행이 그룹별로 묶여 보임
*   입력창: 새 작업을 시작하거나 응답을 입력하는 자리

자주 쓰는 단축키는 다음과 같습니다.

키

동작

`Space`

들여다보기 패널 열기, 닫기

`Enter` 또는 `→`

세션에 붙기

`←` (빈 입력창)

세션에서 떨어져 세션 목록으로 돌아가기

`Ctrl+R`

세션 이름 바꾸기

`Ctrl+X` 두 번 (2 초 이내)

세션 멈추고 삭제

`?`

전체 단축키 보기

5 개를 동시에 돌리면 자동 이름이 비슷해지기 쉽습니다. 구분이 어려운 행은 골라 `Ctrl+R`로 그 자리에서 이름을 바꿉니다.

Space로 들여다보기

행을 고른 뒤 `Space`를 누르면 그 세션이 묻는 질문이나 최근 출력이 들여다보기 패널(peek panel)에 짧게 보입니다. 답을 적고 `Enter`를 누르면 세션이 그 자리에서 이어서 진행합니다.

## [세션 상태와 PR 표시등 읽기](#세션-상태와-pr-표시등-읽기)

세션이 늘어나면 세션 목록은 다섯 그룹으로 묶입니다. 입력을 기다리는 세션이 위로 오도록 정렬됩니다. Anthropic [공식 문서](https://code.claude.com/docs/en/agent-view)의 예시 화면입니다.

![Agent View 메인 대시보드](/LearnClaude/images/agent-view-dashboard.0c05kjsy3_lkq.png)

실습에서 자주 마주칠 핵심 그룹입니다.

```
Needs input
  ✻ polish landing copy      needs input: 톤 후보 중 어떤 걸 고를까요?    1m

Working
  ✽ update readme deploy url Edit README.md                              2m

Completed
  ✻ add page metadata        github.com/<username>/feedme/pull/3 ●       4m
```

각 행의 첫 글자(`✻`, `✽`, `∙`)는 두 가지를 한 번에 알려 줍니다.

*   색·애니메이션으로 상태: 움직이면 Working, 노랑이면 Needs input, 초록이면 Completed. 흐린 회색은 Idle, 빨강은 Failed, 회색은 Stopped
*   모양으로 프로세스 상황: 별(`✻` 또는 움직이는 `✽`) 은 살아 있는 프로세스, 점(`∙`) 은 종료된 상태

### [PR 상태 표시등](#pr-상태-표시등)

세션이 PR을 열면 행 오른쪽 끝에 작은 색깔 표시등이 뜹니다. PR 페이지 링크도 함께 뜨므로 행에서 바로 열 수 있습니다.

색

PR 상태

노랑

체크나 리뷰 대기, 또는 체크 실패

초록

체크 통과, 리뷰 차단 없음

보라

머지 완료

회색

Draft 또는 닫힘

작업이 끝나면 이 표시등이 초록으로 바뀌는 시점에 머지합니다.

## [\[미션\] Agent View로 세 작업 동시에 진행하기](#미션-agent-view로-세-작업-동시에-진행하기)

앞 레슨에서 두 PR을 머지하고 worktree까지 정리한 상태에서 이어집니다. 이번엔 Agent View 한 화면에서 백그라운드 세션 셋을 동시에 굴려 봅니다.

### [Step 1: Agent View 진입하기](#step-1-agent-view-진입하기)

feedme repo 폴더에서 다음을 실행합니다.

> ```
> claude agents
> ```

세션 목록이 비어 있고 입력창만 있는 상태입니다.

### [Step 2: 세션 셋 차례로 띄우기](#step-2-세션-셋-차례로-띄우기)

입력창에 첫 작업을 적고 `Enter`를 누릅니다. 새 행이 생기면 다음 작업을 적고 다시 `Enter`. 셋을 한 번에 묶지 말고 한 번에 하나씩 띄웁니다.

> "`app/layout.tsx` 에 페이지 metadata 를 추가해줘. title 은 'feedme' 로, description 은 README 를 한 줄로 요약해줘. 작업이 끝나면 커밋하고 PR 도 만들어줘."

> "README.md 상단에 배포된 `.vercel.app` URL 을 한 줄로 추가해줘. 작업이 끝나면 커밋하고 PR 도 만들어줘."

> "`app/page.tsx` 의 메인 카피 한 줄을 좀 더 따뜻한 톤으로 다듬어줘. 작업이 끝나면 커밋하고 PR 도 만들어줘."

세 행이 Working으로 들어갔다가, 자동 worktree 격리 덕분에 각자 다른 파일을 안전하게 편집하면서 차례로 Completed로 옮겨갑니다. PR이 올라오면 오른쪽에 색깔 표시등이 붙습니다.

### [Step 3: PR 머지하고 세션 정리하기](#step-3-pr-머지하고-세션-정리하기)

세 PR 모두 GitHub에서 머지합니다. 표시등이 보라로 바뀌면 머지가 끝난 표시입니다.

각 행을 고른 뒤 `Ctrl+X`를 두 번(2 초 이내) 누르면 세션과 worktree가 함께 삭제됩니다. 머지가 끝났으므로 안전합니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **백그라운드 세션**: 터미널이 닫혀도 supervisor가 돌리는 Claude 세션입니다. Agent View는 그 세션들을 한 화면에 모은 대시보드입니다.
2.  **자동 worktree 격리**: 백그라운드 세션은 파일을 편집해야 할 때 자기만의 worktree를 새로 만들고 그 안에서 작업하므로, `claude -w`를 매번 붙이지 않아도 됩니다.
3.  **세 가지 띄우기 경로**: 입력창, 세션 안 `/bg`, 터미널 `claude --bg`. 어느 경로든 같은 대시보드에 행 하나로 모입니다.
4.  **상태와 PR 표시등 읽기**: 행 안 아이콘 색·모양과 PR 표시등 색깔로 어느 세션부터 챙겨야 하는지 한눈에 판단합니다.

## [FAQ](#faq)

### 컴퓨터가 슬립이나 종료 상태가 되면 세션은 어떻게 되나요?

### 토큰 비용은 어떻게 되나요?

### 여러 레포를 한 Agent View에서 굴릴 수 있나요?

### subagent 나 팀원도 세션 목록에 한 행씩 보이나요?

### Agent View 자체를 끌 수 있나요?

## [이어서 배울 내용](#이어서-배울-내용)

여러 백그라운드 세션을 한 대시보드에서 돌리는 흐름을 익혔습니다. 다만 각 세션이 독립 Context에서 따로 돌면 같은 API 형식을 서로 다르게 가정하다가 통합 시점에 충돌할 수 있습니다. 다음 레슨에서는 세션끼리 메시지로 직접 통신하며 작업을 조율하는 Agent Teams를 다룹니다.

피드백 남기기

[

한 폴더, 한 브랜치 | Git Worktree 격리

git worktree로 여러 Claude에게 독립 작업 폴더를 주고, claude -w로 worktree 생성부터 정리까지 자동화합니다

](/learn/completing-projects/parallel-work/git-worktree-isolation)[

격리에서 협업으로 | Agent Teams 기초

각 팀원이 독립 Context에서 병렬로 돌면서 서로 직접 대화하는 Agent Teams의 구조와 쓰임새를 배웁니다

](/learn/completing-projects/parallel-work/agent-teams-basics)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/parallel-work/agent-view
