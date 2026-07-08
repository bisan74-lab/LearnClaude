# Claude Code 개인 프로젝트 셋업 | 제대로 배우기

Part 3 · 프로젝트 완성하기Chapter 12 · 개인 프로젝트

# 템플릿으로 첫 화면 띄우기 | 프로젝트 셋업

harness 템플릿을 본인 GitHub 저장소에 복제하고 로컬과 Vercel에서 같은 화면이 뜨는 빈 프로젝트를 갖춥니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 8.

## [Overview](#overview)

다음 레슨 practice에서는 본인이 만들고 싶은 프로젝트로 SDD 6단계 사이클을 직접 완주합니다. 사이클을 시작하려면 본인 아이디어를 담을 빈 캔버스가 먼저 필요합니다.

이 레슨에서는 `harness-engineering-template`을 그대로 본인 GitHub 저장소에 복제하고, 로컬에서 한 번 띄우고, Vercel에 연결해 `.vercel.app` URL에서 같은 화면이 뜨는지 확인합니다. **다 끝내면 다음 레슨에서 곧장 본인 아이디어로 시작할 수 있는 빈 프로젝트가 준비됩니다.**

### [학습 목표](#학습-목표)

*   `harness-engineering-template`에서 새 GitHub 저장소를 만들고 로컬에 클론합니다.
*   `bun install`과 `bun dev`로 로컬 첫 화면이 뜨는지 확인합니다.
*   Vercel에 저장소를 연결해 `.vercel.app` URL에서 같은 화면이 뜨는지 검증합니다.

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   GitHub 계정: 개인 저장소를 새로 만들 수 있어야 합니다.
*   Vercel 계정: [Todo 앱 배포하기](/learn/extending-claude/deploy-todo#vercel-signup)에서 만든 계정을 그대로 씁니다.
*   로컬에 `git`과 `bun`을 설치합니다 ([SDD 챕터의 프로젝트 셋업](/learn/completing-projects/spec-driven-development/project-setup)을 따라 이미 셋업을 마쳤다면 그대로 사용합니다)

## [Step 1: 템플릿으로 새 GitHub 저장소 만들기](#step-1-템플릿으로-새-github-저장소-만들기)

[harness-engineering-template](https://github.com/toy-crane/harness-engineering-template)에 접속한 뒤, ① Use this template 버튼을 클릭하고, ② 드롭다운에서 Create a new repository를 선택합니다.

![GitHub 템플릿 저장소의 Use this template 버튼](https://bisan74-lab.github.io/LearnClaude/images/harness-use-template.3t_a8p9kiw_qz.png)

다음 화면에서 저장소 이름을 입력한 뒤 생성합니다. 본인이 만들 프로젝트 이름을 그대로 쓰면 좋습니다.

![GitHub Create a new repository 화면](https://bisan74-lab.github.io/LearnClaude/images/harness-create-repo.0c_msytdewrrh.png)

feedme 저장소와 분리하세요

두 프로젝트의 commit history가 섞이지 않도록 새 저장소로 시작합니다.

## [Step 2: 로컬에 클론하고 dev 서버 띄우기](#step-2-로컬에-클론하고-dev-서버-띄우기)

방금 만든 저장소 화면에서 ① Code 버튼을 클릭하고, ② HTTPS 탭을 연 뒤, ③ URL을 복사합니다.

![GitHub 저장소의 Code 버튼에서 HTTPS URL 복사하는 3단계](https://bisan74-lab.github.io/LearnClaude/images/harness-clone-repo.0aozy7nx4je48.png)

복사한 URL로 저장소를 클론하고 의존성을 설치합니다.

```
git clone <복사한 URL>
cd <저장소 이름>
bun install
bun dev
```

`http://localhost:3000`에 접속해 템플릿의 기본 landing 화면이 뜨면 로컬 셋업이 끝납니다.

## [Step 3: Vercel에 저장소 연결하기](#step-3-vercel에-저장소-연결하기)

Vercel 대시보드에서 ① Add New... 드롭다운을 열고, ② Project를 클릭합니다.

![Vercel 대시보드의 Add New Project 버튼](https://bisan74-lab.github.io/LearnClaude/images/harness-vercel-add-project.2oz_bdw8asohh.png)

① Search 박스에 저장소 이름을 입력해 방금 만든 저장소를 찾고, ② 옆의 Import 버튼을 클릭합니다.

![Vercel GitHub 저장소 Import 화면](https://bisan74-lab.github.io/LearnClaude/images/harness-vercel-import-repo.2kjcb8rihxi9d.png)

다음 화면에서 Framework는 Next.js로 자동 감지됩니다. Environment Variables는 비워둔 채 ① Deploy 버튼을 클릭합니다. 외부 API 키 등록은 다음 레슨 [practice의 배포 시 환경 변수 설정](/learn/completing-projects/personal-project/practice#env-vars)에서 다룹니다.

![Vercel New Project 화면에서 Deploy 버튼 위치](https://bisan74-lab.github.io/LearnClaude/images/harness-vercel-new-project.1-u6tza00o4_r.png)

## [Step 4: 첫 배포 URL에서 같은 화면 확인하기](#step-4-첫-배포-url에서-같은-화면-확인하기)

빌드가 끝나면 본인 프로젝트 이름이 들어간 `.vercel.app` URL이 생깁니다.

![Vercel 배포 완료 후 생성된 .vercel.app 도메인 화면](https://bisan74-lab.github.io/LearnClaude/images/harness-vercel-deployed.2_22ql7pdxvny.png)

URL을 클릭해 로컬과 같은 화면이 뜨는지 확인합니다.

## [Step 5: shadcn preset 적용하기 (선택)](#step-5-shadcn-preset-적용하기-선택)

템플릿은 기본 shadcn 스타일을 사용합니다. preset은 색상·폰트·테마를 한 번에 지정해 둔 스타일 묶음입니다. 기본 스타일을 바꾸고 싶다면 preset을 적용합니다.

[ui.shadcn.com/create](https://ui.shadcn.com/create)에 접속해 원하는 스타일을 고른 뒤, 사이드바의 ① preset ID 영역을 클릭합니다. `--preset {preset_id}` 같은 형식의 ID가 클립보드에 복사됩니다.

![shadcn 공식 사이트의 preset 스타일 목록](https://bisan74-lab.github.io/LearnClaude/images/shadcn-create-presets.2yfjj25sro464.png)

복사한 ID를 Claude Code에 그대로 붙여 넣어 적용합니다.

```
shadcn preset을 --preset {preset_id} 로 바꿔줘
```

기본 스타일로도 충분합니다

preset은 디자인을 직접 꾸미고 싶을 때만 적용합니다. 기본 스타일로도 다음 단계로 넘어갈 수 있습니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **빈 캔버스 먼저**: 본인 프로젝트는 feedme sandbox와 분리된 새 GitHub 저장소에서 시작합니다.
2.  **push 한 번이 곧 배포**: Vercel을 한 번 연결한 뒤로는 `main`에 push 할 때마다 `.vercel.app` URL이 자동 갱신됩니다.

## [FAQ](#faq)

### 환경 변수가 필요한 외부 API는 지금 등록해야 하나요?

## [이어서 배울 내용](#이어서-배울-내용)

빈 캔버스가 준비됐습니다. 다음 [practice](/learn/completing-projects/personal-project/practice)에서는 이 저장소로 본인 아이디어를 골라 SDD 6단계 사이클을 완주합니다.

피드백 남기기

[

격리에서 협업으로 | Agent Teams 기초

각 팀원이 독립 Context에서 병렬로 돌면서 서로 직접 대화하는 Agent Teams의 구조와 쓰임새를 배웁니다

](/learn/completing-projects/parallel-work/agent-teams-basics)[

내 아이디어 구현하기 | Practice

SDD 6단계 사이클을 본인 아이디어에 직접 적용해 Spec 작성부터 Vercel 배포까지 한 사이클을 완주합니다

](/learn/completing-projects/personal-project/practice)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/personal-project/setup
