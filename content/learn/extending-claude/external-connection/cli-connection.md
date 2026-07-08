# Claude Code CLI 연결 | 제대로 배우기

Part 2 · Claude 확장하기Chapter 7 · 외부 연결

# Claude에게 터미널 도구 빌려주기 | CLI 연결

gh CLI를 Claude에게 연결해 실시간 GitHub 데이터를 가져오는 방법과 CLI가 AI와 잘 맞는 구조적 이유를 이해합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [Overview](#overview)

[Chapter 6 (지식 더하기)](/learn/extending-claude/adding-knowledge/rules)에서 Rules·Command·Skill로 Claude에게 지식을 더했습니다. 하지만 Rules·Command·Skill은 Claude의 지식을 넓힐 뿐, 접근 범위는 그대로입니다. Claude는 여전히 학습 데이터 시점의 세상만 알며, 지금 이 순간의 GitHub 이슈나 사내 API에는 접근하지 못합니다.

이번 레슨에서는 개발자가 이미 쓰던 gh CLI를 Claude도 실행할 수 있게 연결하고, Claude가 같은 명령어로 실시간 외부 데이터를 가져오는 방법을 배웁니다.

### [학습 목표](#학습-목표)

*   Claude의 학습 데이터 경계와 외부 접근의 차이를 이해합니다.
*   CLI를 Claude에게 "빌려주는" 방식을 체험합니다.
*   Claude가 실행한 명령어를 터미널에서 직접 재현해 결과를 검증합니다.

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   GitHub 계정이 있어야 합니다.

## [Claude가 모르는 것이 너무 많다](#claude가-모르는-것이-너무-많다)

![Claude 학습 데이터 안과 실시간 정보 사이의 공백](/images/knowledge-cutoff-gap.3k2z89ydhw1am.png)

Claude에게 실시간 정보를 물어보면 벽에 부딪힙니다.

> vercel/next.js 저장소의 최근 이슈 5 개를 가져와서 요약해줘

Claude는 학습 시점까지의 이슈만 압니다. 오늘 열린 이슈는 학습 이후에 생긴 정보입니다. 답변은 "이 시점에는 대략 이런 이슈가 있었습니다" 정도로 모호해지거나, 아예 "실시간 정보에는 접근할 수 없습니다" 로 막힙니다.

GitHub에만 해당하는 불편함이 아닙니다. 사내 Jira 티켓, AWS S3 버킷 목록, 배포 중인 서버 상태가 전부 Claude의 학습 데이터 바깥입니다. 파일 읽기나 웹 검색 같은 내장 도구로는 단순한 조회는 되지만, 구조화된 외부 API 데이터를 안정적으로 가져오려면 한계가 있습니다.

## [gh CLI: 개발자 도구를 Claude에게 빌려주기](#gh-cli-개발자-도구를-claude에게-빌려주기)

요청하는 쪽공유 도구외부 서비스gh issue listgh issue listHTTPS개발자Claudegh CLI설치된 도구 한 벌GitHub저장소 · 이슈 · PR

개발자와 Claude 가 같은 gh CLI 를 공유합니다 — 같은 명령, 같은 결과

개발자가 터미널에서 `gh issue list` 한 줄을 치면 실시간 이슈 목록이 JSON으로 출력됩니다. Claude도 gh CLI를 그대로 호출해 같은 실시간 데이터를 바로 가져옵니다.

CLI는 개발자만의 도구가 아닙니다. 설치와 인증을 마친 CLI는 누가 실행하든 같은 명령어로 같은 결과를 돌려줍니다. Claude Code는 Bash 도구로 셸 명령을 실행하므로, 터미널에 설치된 gh를 Claude도 바로 호출할 수 있습니다.

**"개발자와 Claude가 같은 도구함을 공유한다."** 이것이 CLI 연결의 본질입니다. Claude 전용 도구를 따로 만들 필요가 없습니다. 이미 있는 도구를 Claude도 쓸 수 있게 열어줄 뿐입니다.

## [CLI가 AI와 잘 맞는 네 가지 이유](#cli가-ai와-잘-맞는-네-가지-이유)

Claude가 CLI를 잘 쓰는 데는 네 가지 구조적 이유가 있습니다.

### [AI가 이미 아는 형식](#ai가-이미-아는-형식)

Claude는 흔히 쓰는 CLI 사용 예시를 학습 데이터로 많이 익혔습니다. `gh pr list`·`aws s3 ls`·`kubectl get pods` 같은 익숙한 명령어는 별도 설명 없이도 이미 잘 알고 있습니다.

새 도구를 쓰려면 AI가 그 도구의 문법을 새로 배워야 합니다. CLI는 이미 아는 형식이라 Claude가 별도 학습 없이 바로 정확하게 호출합니다.

### [필요할 때만 사용법 확인](#필요할-때만-사용법-확인)

옵션이 헷갈리면 Claude는 `--help`를 먼저 실행해서 사용법을 확인합니다.

```
gh issue list --help
```

필요할 때만 사용법을 확인하므로 Context를 조금씩만 소비합니다. 모든 사용 설명서를 미리 로드해두는 방식이 아닙니다.

### [결과를 파이프로 가공](#결과를-파이프로-가공)

CLI 결과는 파이프로 다른 명령어에 전달할 수 있습니다.

```
gh issue list --repo vercel/next.js --json number,title,state -L 10 | jq '.[].title'
```

필요한 부분만 추려서 대화창에 가져오면, Claude의 Context에 불필요한 텍스트가 쌓이지 않습니다.

### [실행 후 바로 종료](#실행-후-바로-종료)

CLI 명령어는 실행 → 결과 반환 → 종료의 흐름입니다. 장기 실행 프로세스가 남지 않아 세션 상태를 깔끔하게 유지할 수 있습니다.

## [\[미션\] gh CLI로 실시간 GitHub 데이터 가져오기](#미션-gh-cli로-실시간-github-데이터-가져오기)

`ch07-01` 브랜치가 이 미션의 시작점입니다.

```
git fetch origin
git checkout ch07-01
```

### [Step 1: gh CLI 설치](#step-1-gh-cli-설치)

macOSWindows

```
brew install gh
```

```
winget install --id GitHub.cli --source winget
```

설치가 끝나면 버전을 확인합니다.

```
gh --version
```

### [Step 2: GitHub 인증](#step-2-github-인증)

```
gh auth login
```

GitHub.com 선택 → HTTPS → 브라우저 인증을 따라갑니다. 승인하면 터미널에 성공 메시지가 표시됩니다.

상태를 확인합니다.

```
gh auth status
```

"Logged in"이 뜨면 성공입니다.

인증은 한 번만

`gh auth login`은 OS의 자격증명 저장소에 토큰을 저장합니다. 새 세션을 열거나 Claude Code를 재시작해도 인증 상태가 유지됩니다. 토큰이 만료되면 `gh auth status`가 실패하므로 같은 명령어로 재로그인하면 됩니다.

### [Step 3: CLI를 직접 돌려보기](#step-3-cli를-직접-돌려보기)

터미널에서 직접 실행해 결과를 확인합니다.

```
gh issue list --repo vercel/next.js --json number,title,state,labels -L 5
```

JSON 형식의 이슈 목록이 출력됩니다. Claude도 같은 명령어를 실행하므로 결과는 동일합니다.

### [Step 4: Claude에게 요청](#step-4-claude에게-요청)

Claude Code를 시작해 같은 작업을 요청합니다.

```
vercel/next.js 저장소의 최근 이슈 5 개를 가져와서 어떤 버그가 있는지 요약해줘
```

Claude가 `gh issue list ...`를 Bash로 실행해 돌아온 JSON을 해석하고 요약합니다. Claude가 실행한 명령어가 대화창에 그대로 노출됩니다. 그 명령어를 복사해 터미널에 붙여넣으면 같은 결과가 재현됩니다. **Claude의 행동이 블랙박스가 아니라 재현 가능한 명령어라는 점이 CLI 연결의 강점입니다.**

## [CLI가 할 수 없는 일](#cli가-할-수-없는-일)

CLI는 많은 외부 접근 문제를 해결합니다. 하지만 모든 영역을 해결하지는 못합니다.

*   **지금 열려 있는 브라우저 탭의 콘솔 에러나 DOM 상태**: CLI는 새 프로세스를 시작할 뿐, 이미 떠 있는 내 크롬 탭에는 붙지 못합니다.
*   **Figma 같은 디자인 도구의 실시간 편집 상태**: 공식 CLI가 없을 뿐 아니라, 있다 해도 지금 편집 중인 파일의 레이어·선택 상태는 외부에서 들여다볼 수 없습니다.

이런 영역은 실행 중인 앱이나 서비스에 실시간으로 붙는 다른 연결 방식이 필요합니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **Claude 지식의 경계**: Rules·Skill로 지식을 더해도 학습 시점 바깥의 실시간 외부 정보에는 접근하지 못하므로, CLI 연결로 이 경계를 넘을 수 있습니다.
2.  **개발자와 Claude의 도구 공유**: 이미 설치된 gh·aws·kubectl을 Claude가 그대로 호출하므로, Claude가 쓴 명령어를 터미널에 붙여넣어 같은 결과를 재현할 수 있습니다.
3.  **CLI가 AI와 잘 맞는 구조**: 이미 아는 형식, `--help`로 필요할 때만 사용법 확인, 파이프로 결과 가공, 실행 후 종료의 네 가지 특성이 AI와 자연스럽게 맞물립니다.

## [FAQ](#faq)

### gh 외에 어떤 CLI를 Claude가 쓸 수 있나요?

### CLI를 내가 직접 실행하는 것과 Claude가 실행하는 것의 차이는?

## [이어서 배울 내용](#이어서-배울-내용)

CLI는 실시간 외부 데이터를 잘 가져옵니다. 하지만 지금 내가 보고 있는 크롬 탭의 콘솔 에러나 Figma에서 편집 중인 디자인 파일처럼, 실행 중인 앱과 직접 연결해야 할 때가 있습니다. 다음 레슨에서는 이런 경우에 쓰는 MCP를 배웁니다.

*   MCP의 정체와 동작 방식
*   CLI로 충분하지 않을 때 MCP가 필요한 이유
*   Claude in Chrome으로 내 실제 Chrome 세션을 Claude가 관찰하기

피드백 남기기

[

기존 Skill 가져다 쓰기 | Skill 설치하기

기본 번들 Skill과 Plugin·skills.sh로 가져오는 외부 Skill을 다뤄 직접 만들 때와 가져다 쓸 때를 구분하는 법을 익힙니다

](/learn/extending-claude/adding-knowledge/installing-skills)[

MCP로 Claude의 Tool 늘리기 | MCP 연결

Claude in Chrome으로 내 Chrome 세션에 접근해 Claude가 쓸 수 있는 Tool을 확장합니다

](/learn/extending-claude/external-connection/mcp-connection)

---
Source: https://docs.claude-hunt.com/learn/extending-claude/external-connection/cli-connection
