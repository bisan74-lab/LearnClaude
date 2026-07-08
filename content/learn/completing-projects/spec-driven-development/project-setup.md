# Claude Code SDD 프로젝트 셋업 | 제대로 배우기

Part 3 · 프로젝트 완성하기Chapter 10 · 스펙 주도 개발

# 템플릿으로 SDD 6단계 시작하기 | 프로젝트 셋업

엔지니어링 템플릿을 클론하고 도구 구성과 Vercel 배포까지 한 번에 갖춰 SDD 사이클 시작 환경을 만듭니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 8.

## [Overview](#overview)

SDD 6단계를 매번 직접 구성하려면 어떤 Skill을 만들지, 어떤 Hook으로 강제할지, 검증을 어디서 자동화할지를 매 프로젝트마다 직접 결정해야 합니다.

이 구성이 미리 끝나 있는 엔지니어링 템플릿을 클론하고, 각 도구가 어떤 단계를 담당하는지 확인합니다. 끝에는 Vercel에 저장소를 연결해 `main` push가 곧 배포가 되는 환경까지 갖춥니다.

### [학습 목표](#학습-목표)

*   엔지니어링 템플릿을 GitHub에서 클론하고 실행합니다.
*   템플릿에 포함된 도구(CLAUDE.md, Skills, Agents, Hooks, Rules)가 어떤 SDD 단계를 담당하는지 확인합니다.
*   Vercel에 저장소를 연결해 push 한 번이 곧 배포가 되는 환경을 갖춥니다.

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   개인 GitHub 계정: 본인 저장소를 새로 만들 수 있어야 합니다.
*   Vercel 계정: [Todo 앱 배포하기](/learn/extending-claude/deploy-todo#vercel-signup)에서 만든 계정을 그대로 씁니다.
*   로컬에 `git`과 `bun`이 설치되어 있어야 합니다.

개인 GitHub 계정으로 진행하기

실습에는 개인 GitHub 계정을 권장합니다. 회사 계정은 워크스페이스 정책이나 관리자 승인 때문에 배포·재배포·삭제가 막힐 수 있습니다.

## [Step 1: GitHub에서 템플릿 클론하기](#step-1-github에서-템플릿-클론하기)

템플릿 저장소에서 새 프로젝트를 생성합니다. [harness-engineering-template](https://github.com/toy-crane/harness-engineering-template)에 접속한 뒤, ① **Use this template** 버튼을 클릭하고, ② 드롭다운에서 **Create a new repository**를 선택합니다.

![GitHub 템플릿 저장소의 Use this template 버튼](images/harness-use-template.3t_a8p9kiw_qz.png)

다음 화면에서 저장소 이름을 입력한 뒤 생성합니다. 이름은 자유롭게 정하면 됩니다. 이 강의에서는 예시로 `toy-project`를 사용하지만, 같은 이름을 쓸 필요는 없습니다.

![GitHub Create a new repository 화면](images/harness-create-repo.0c_msytdewrrh.png)

생성된 저장소 화면에서 ① **Code** 버튼을 클릭하고, ② **HTTPS** 탭을 연 뒤, ③ URL을 복사합니다.

![toy-project 저장소의 Code 버튼에서 HTTPS URL 복사하는 3단계](images/harness-clone-repo.0aozy7nx4je48.png)

복사한 URL로 저장소를 클론하고 의존성을 설치합니다.

```
git clone <복사한 URL>
cd <저장소 이름>
bun install
bun dev
```

`http://localhost:3000`에서 초기 화면이 나타나면 셋업이 끝난 것입니다.

## [Step 2: Vercel에 저장소 연결하기](#step-2-vercel에-저장소-연결하기)

SDD 사이클을 시작하기 전 배포 환경을 미리 연결해 두면, 이후 push가 곧 배포로 이어집니다.

Vercel 대시보드에서 ① **Add New...** 드롭다운을 열고, ② **Project**를 클릭합니다.

![Vercel 대시보드의 Add New Project 버튼](images/harness-vercel-add-project.2oz_bdw8asohh.png)

① **Search** 박스에 저장소 이름을 입력해 방금 만든 저장소를 찾고, ② 옆의 **Import** 버튼을 클릭합니다.

![Vercel GitHub 저장소 Import 화면](images/harness-vercel-import-repo.2kjcb8rihxi9d.png)

다음 화면은 Framework가 Next.js로 자동 감지된 상태로 열립니다. Environment Variables는 비워둔 채 ① **Deploy** 버튼을 클릭합니다.

![Vercel New Project 화면에서 Deploy 버튼 위치](images/harness-vercel-new-project.1-u6tza00o4_r.png)

빌드가 끝나면 `.vercel.app` 도메인의 URL이 생성됩니다.

![Vercel 배포 완료 후 생성된 .vercel.app 도메인 화면](images/harness-vercel-deployed.2_22ql7pdxvny.png)

URL을 클릭해 로컬과 같은 화면이 뜨는지 확인합니다.

## [Step 3: shadcn preset 적용하기 (선택)](#step-3-shadcn-preset-적용하기-선택)

기본 shadcn 스타일이 적용되어 있습니다. 색상·폰트·테마를 바꾸고 싶다면 preset을 적용합니다.

[ui.shadcn.com/create](https://ui.shadcn.com/create)에 접속해 원하는 스타일을 고른 뒤, 사이드바의 ① **preset ID** 영역을 클릭합니다. `--preset {preset_id}` 같은 형식의 ID가 클립보드에 복사됩니다.

![shadcn 공식 사이트의 preset 스타일 목록](images/shadcn-create-presets.2yfjj25sro464.png)

복사한 ID를 Claude Code에 그대로 붙여 넣어 적용합니다.

```
shadcn preset을 --preset {preset_id} 로 바꿔줘
```

기본 스타일로도 충분합니다

preset 적용은 디자인을 직접 바꾸고 싶을 때 진행합니다. 본 챕터 흐름과는 별개이니, 기본 스타일 그대로 다음 단계로 넘어가도 됩니다.

## [Step 4: 변경사항 커밋하고 push 하기](#step-4-변경사항-커밋하고-push-하기)

`main` 브랜치에 push 하면 새 빌드가 자동으로 시작됩니다. Step 3에서 preset을 적용했다면, 그대로 push 해 자동 재배포 흐름을 체험합니다.

```
변경사항을 커밋하고 main 에 push 해줘
```

push 직후 Vercel 대시보드의 Deployments 탭을 열면 새 배포가 시작된 것이 보입니다. 빌드가 끝난 뒤 같은 `.vercel.app` URL을 새로고침하면 바뀐 스타일이 반영됩니다.

## [6단계 담당 도구 살펴보기](#6단계-담당-도구-살펴보기)

Ideate/idea-refineSpecify/write-specSketch/sketch-wireframePlan/draft-planBuild/execute-planCompound/compound

각 단계마다 한 Skill 이 절차를 자동화합니다 — 보조 도구(Agent · Hook · Rule)는 본문 표 참조

템플릿에는 SDD 워크플로우에 필요한 도구가 미리 구성되어 있습니다. 각 단계의 핵심 도구와 동작 방식은 해당 레슨에서 자세히 다룹니다.

단계

핵심 도구

Ideate (선택)

`/idea-refine`

Specify

`/write-spec`

Sketch

`/sketch-wireframe`

Plan

`/draft-plan` · `plan-reviewer`

Build

`/execute-plan` · `code-reviewer` · Hooks · Rules

Compound

`/compound`

이 도구들은 다섯 층으로 이루어집니다. Skills가 단계별 절차를, Agents가 별도 컨텍스트에서의 검증을, Hooks·Rules가 Build에서 규칙 강제와 영역 보호를, CLAUDE.md가 전 단계 공통 컨텍스트를 담당합니다. **이 다섯 층 덕분에 개발자는 사이클 자체에 집중할 수 있습니다.**

### [CLAUDE.md: 모든 단계에 적용되는 공통 설정](#claudemd-모든-단계에-적용되는-공통-설정)

다른 layer는 각 단계 레슨에서 자기 역할로 다시 등장하지만, CLAUDE.md는 특정 단계에 한정되지 않고 매번 자동으로 불러집니다. 세 가지 규약을 정의합니다.

*   **6단계 phase 표**: 어느 단계에 무엇을 산출하는지
*   **수용 기준 테스팅 원칙**: 외부 관찰 가능한 동작은 자동화, 디자인 판단은 Human review
*   **아키텍처 레이어 순서**: `types → config → lib → services → hooks → components → app`. Plan 단계의 Task 순서가 이 레이어를 따릅니다.

`examples/requirements.md`에는 feedme.wiki 클론 프로젝트의 요구사항이 들어 있습니다. 다음 레슨인 Specify부터 이 요구사항을 입력으로 SDD 사이클을 진행합니다.

## [핵심 포인트 정리](#핵심-포인트-정리)

1.  **템플릿 환경 구성**: CLAUDE.md, Skills, Agents, Hooks, Rules가 미리 갖춰져 있어, SDD 사이클 자체에 집중할 수 있습니다.
2.  **도구-단계 매핑**: 6개 Skill이 6단계를 자동화하고, Agents가 Plan·Build를 검증하며, Hooks·Rules가 Build에서 규칙을 강제하고 영역을 보호하며, CLAUDE.md가 전 단계의 공통 컨텍스트가 됩니다.
3.  **push 한 번이 곧 배포**: Vercel을 한 번 연결한 뒤로는 `main`에 push 할 때마다 `.vercel.app` URL이 자동 갱신됩니다.

## [FAQ](#faq)

### 기존 프로젝트에 .claude/만 복사해서 적용해도 되나요?

### 템플릿의 Skills를 빼거나 추가할 수 있나요?

### Reference Skill은 일반 Skill과 어떻게 다른가요?

### 환경 변수는 어떻게 등록하나요?

## [이어서 배울 내용](#이어서-배울-내용)

셋업이 끝났습니다. 다음 레슨에서는 SDD의 첫 단계인 Specify를 배웁니다. `examples/requirements.md`의 feedme.wiki 요구사항을 입력으로 `/write-spec`을 실행합니다.

피드백 남기기

[

명세가 결정하는 6단계 사이클 | SDD

Part 2 도구를 하나의 사이클로 묶는 SDD 6단계와 Spec이 나머지를 결정하는 이유를 살펴봅니다

](/learn/completing-projects/spec-driven-development/sdd)[

추측을 드러내기 | Specify

/write-spec 4단계로 가정·모호함·미결정을 코드 전에 드러내고 WHAT만 담은 spec.md를 만듭니다

](/learn/completing-projects/spec-driven-development/writing-spec)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/spec-driven-development/project-setup
