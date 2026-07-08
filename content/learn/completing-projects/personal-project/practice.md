# Claude Code 개인 프로젝트 실습 | 제대로 배우기

Part 3 · 프로젝트 완성하기Chapter 12 · 개인 프로젝트

# 내 아이디어 구현하기 | Practice

SDD 6단계 사이클을 본인 아이디어에 직접 적용해 Spec 작성부터 Vercel 배포까지 한 사이클을 완주합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 8.

## [Overview](#overview)

[SDD 사이클](/learn/completing-projects/spec-driven-development/sdd#sdd-cycle)을 feedme.wiki 클론으로 처음부터 끝까지 경험했습니다. 병렬 작업 챕터에서는 [Agent Teams](/learn/completing-projects/parallel-work/agent-teams-basics)와 [Git Worktree 격리](/learn/completing-projects/parallel-work/git-worktree-isolation)를 배웠습니다. 이제 본인이 만들고 싶은 프로젝트에 같은 워크플로우를 적용합니다.

어떤 프로젝트를 선택하고, 3시간 안에 닫을 수 있는 크기인지 판단하는 일이 이번 실습의 핵심입니다.

### [학습 목표](#학습-목표)

*   본인 프로젝트 아이디어를 실습 가능한 크기로 좁힙니다.
*   SDD 6단계 사이클을 처음부터 끝까지 독립적으로 완주합니다.
*   막혔을 때 어디로 돌아가야 하는지 판단합니다.

### [시작하기 전 확인사항](#시작하기-전-확인사항)

*   본인 사이드 프로젝트를 담을 새 GitHub 저장소를 [프로젝트 셋업](/learn/completing-projects/personal-project/setup) 레슨 절차에 따라 `harness-engineering-template`에서 만들고 Vercel 첫 배포까지 확인합니다.
*   사용할 외부 API 키(Gemini·Supabase·공공데이터 등)가 있다면 미리 발급받아 `.env.local`에 넣어둡니다. 자세한 키 등록 방법은 본문의 [배포 시 환경 변수 설정하기](#env-vars)에서 다룹니다.

## [한 사이클에 끝나는 크기로 좁히기](#한-사이클에-끝나는-크기로-좁히기)

**이 실습의 목적은 멋진 프로젝트가 아니라 SDD 사이클 완주입니다.** 3시간 안에 Spec부터 Vercel 배포까지 한 사이클을 닫을 수 있는 크기를 선택합니다.

항목

권장

페이지 수

2~3개

핵심 기능

1~2개

시나리오

5~7개

프로젝트 크기 조절이 가장 중요합니다

3시간 안에 6단계를 한 번 완주하는 것이 우선입니다. 기능을 더 넣고 싶다면 다음 사이클에서 확장하세요. Compound 단계에서 확장 공간이 생깁니다.

## [아이디어 찾기](#아이디어-찾기)

아이디어가 바로 떠오르지 않아도 됩니다. 두 가지 진입로가 있습니다.

### [`/idea-refine`으로 다듬기 (선택)](#idea-refine으로-다듬기-선택)

feedme 실습에서는 이미 구체적인 요구사항(`examples/requirements.md`)이 있어 Ideate 단계를 건너뛰었습니다. 이번 실습은 보통 막연한 아이디어로 시작하므로 `/idea-refine`이 유용합니다.

```
/idea-refine
```

AI가 평소 불편한 점, 관심 분야, 기술적 호기심을 물으며 아이디어를 넓게 펼쳤다가 하나로 좁혀 다듬습니다. 산출물은 `artifacts/<feature>/idea.md`이며, 다음 단계 `/write-spec`의 입력으로 쓰입니다.

### [직접 정리하기](#직접-정리하기)

요구사항이 이미 머릿속에 구체적으로 있다면 5~10줄 마크다운으로 직접 적고 곧장 `/write-spec`으로 갑니다. feedme 실습에서 본 `examples/requirements.md` 형태가 좋은 본보기입니다.

## [무료로 쓸 만한 AI·API 살피기](#무료로-쓸-만한-aiapi-살피기)

요즘 사이드 프로젝트는 AI 기능 한 줄만 붙여도 결과물이 크게 달라집니다. 아래는 모두 신용카드 없이 시작할 수 있고, 키 발급도 보통 5분 안에 끝납니다.

### [AI·LLM](#aillm)

서비스

무료 한도

사이드 프로젝트엔?

어디에 쓰면 좋은가

[Google Gemini](https://aistudio.google.com/)

AI Studio 콘솔에서 현재 무료 티어 한도 확인

충분

가장 추천하는 시작점. 요약·분류·생성 전반

[Groq](https://console.groq.com/)

분당 30번 (Llama 계열)

충분, 속도가 빠름

스트리밍 데모처럼 응답 속도가 핵심일 때

[OpenRouter](https://openrouter.ai/)

일부 모델 (DeepSeek·Llama 등) 완전 무료

충분, 모델 비교용

여러 모델을 한 키로 비교해 보고 싶을 때

### [Backend·Database](#backenddatabase)

서비스

무료 한도

어디에 쓰면 좋은가

[Supabase](https://supabase.com/)

프로젝트 2개, DB 500MB, Auth 무료 MAU 한도 넉넉

Postgres + Auth + Storage가 한 묶음. CRUD가 필요한 사이드 프로젝트에 자주 쓰는 조합

Supabase는 Claude Code 플러그인이 있습니다

공식 [Supabase 플러그인](https://supabase.com/docs/guides/ai-tools/plugins)을 설치하면 Claude Code로 Supabase 프로젝트를 직접 다룰 수 있습니다. 테이블 생성·마이그레이션·쿼리 실행을 채팅으로 던질 수 있어, 스키마 설계 단계에서 SQL을 직접 작성하지 않아도 됩니다.

`claude-plugins-official` 마켓플레이스가 기본 등록돼 있어 설치는 한 줄입니다.

```
/plugin install supabase@claude-plugins-official
```

설치 직후에는 바로 안 잡힐 수 있으니 `/reload-plugins`로 다시 읽어옵니다.

### [해외 데이터·이미지](#해외-데이터이미지)

서비스

인증

어디에 쓰면 좋은가

[Open-Meteo](https://open-meteo.com/)

없음

날씨 데이터. 사실상 무제한

[REST Countries](https://restcountries.com/)

없음

국가 정보 (국기·통화·언어 등)

[NASA APIs](https://api.nasa.gov/)

이메일로 키 발급

오늘의 우주 사진, 화성 로버 사진 등

[Unsplash](https://unsplash.com/developers)

회원가입 + 앱 등록

고화질 이미지 시간당 50번 호출

### [한국 데이터](#한국-데이터)

서비스

인증

어디에 쓰면 좋은가

[공공데이터포털](https://www.data.go.kr/)

회원가입 + API별 활용신청

기상청 단기예보, 미세먼지, 박스오피스, 실시간 버스 등 수천 개

[카카오 디벨로퍼스](https://developers.kakao.com/)

앱 등록 (REST 키)

카카오 지도, 로컬 (장소 검색), 카카오 로그인

[네이버 개발자센터](https://developers.naver.com/)

앱 등록 (Client ID/Secret)

블로그·뉴스·책 검색, 파파고 번역

[서울 열린데이터광장](https://data.seoul.go.kr/)

회원가입 + 키 발급

따릉이, 지하철 혼잡도, 문화행사

[한국은행 ECOS](https://ecos.bok.or.kr/api/)

회원가입 + 키 발급

환율, 금리, 물가지수

### [AI와 데이터 조합 예시](#ai와-데이터-조합-예시)

혼자서는 평범해 보이는 API도 AI와 조합하면 결과물이 확 달라집니다.

*   **Gemini + Open-Meteo**: 오늘 날씨에 맞춰 옷차림을 한 줄로 추천하는 AI 비서
*   **Gemini + 기상청 단기예보**: 한국 위치 기반으로 "오늘 우산 챙겨?" 답해주는 챗봇
*   **Gemini + 카카오 로컬 API**: "강남역 근처 조용한 카페 3곳"을 골라주는 AI 큐레이터
*   **Gemini + 영화진흥위원회 박스오피스**: 어제 박스오피스 1위 영화에 AI가 쓴 한 줄 평 붙이기
*   **Groq + 네이버 검색 API**: 키워드를 넣으면 최신 블로그·뉴스를 빠르게 요약

### [더 많은 API 살펴보기](#더-많은-api-살펴보기)

*   [open-apis-korea](https://github.com/dl0312/open-apis-korea): 한국어 사용자를 위한 오픈 API 모음
*   [public-apis-4Kr](https://github.com/yybmion/public-apis-4Kr): 한국 서비스에 사용 가능한 Public API 목록

## [SDD 6단계 사이클 따르기](#sdd-6단계-사이클-따르기)

흐름은 동일합니다. 입력만 본인의 아이디어로 바뀝니다.

단계

호출

산출물

Ideate

`/idea-refine` (선택)

`idea.md`

Specify

`/write-spec`

`spec.md`

Sketch

`/sketch-wireframe`

`wireframe.html`

Plan

`/draft-plan`

`plan.md`

Build

`/execute-plan`

코드 + 커밋 + `learnings.md`

Compound

`/compound`

(이번 사이클에는 보류, 다음 feature 사이클에서)

이번 실습은 한 사이클이므로 Compound는 실행할 필요가 없습니다. feature 사이클을 두세 번 더 돈 뒤 호출합니다.

## [배포 시 환경 변수 설정하기](#env-vars)

프로젝트에 외부 API 키(Supabase URL 등)가 있으면 환경 변수를 설정합니다.

**로컬**: Next.js는 프로젝트 루트의 `.env.local` 파일에서 환경 변수를 읽습니다. `NEXT_PUBLIC_` 접두사를 붙인 변수만 브라우저에서 읽을 수 있습니다. API 키처럼 노출되면 안 되는 값에는 이 접두사를 붙이지 않습니다.

**Vercel**: Import 화면의 Environment Variables 섹션에서 Key/Value를 등록합니다.

![Vercel Import 화면의 Environment Variables 섹션](images/vercel-configure.40seridxalxbg.png)

`.env.local` 파일이 있다면 **Import .env** 버튼으로 한 번에 등록할 수 있습니다.

![Vercel Import .env 버튼으로 환경 변수를 한 번에 등록하는 화면](images/vercel-env-vars.26gnn2_5c616n.png)

로컬과 Vercel 양쪽에 등록해야 합니다

`.env.local`에 있는 값을 Vercel에도 동일하게 등록해야 프로덕션에서 동작합니다.

## [실습 규칙 지키기](#실습-규칙-지키기)

1.  **6단계 건너뛰지 않기**: 단계마다 산출물이 다음 단계의 입력이 됩니다. spec 없이 plan을 세우면 추측이 생깁니다.
2.  **Task 단위 작게 유지하기**: Task 하나가 끝나면 커밋하고 새 대화를 시작합니다. Vertical Slice가 끝날 때마다 시스템이 동작할 수 있어야 합니다.
3.  **막히면 이전 단계로 돌아가기**: plan이 막막하다면 spec이 모호하다는 신호입니다. spec이나 plan을 고치는 편이 코드 수정보다 낫습니다.
4.  **새 도구 하나씩 추가하기**: Supabase 연동을 확인한 뒤 Vercel 배포를 시도합니다. 여러 도구를 한꺼번에 추가하면 문제가 생겼을 때 원인을 찾기 어렵습니다.

## [결과물 공유하기](#결과물-공유하기)

실습이 끝나면 본인 프로젝트를 [claude-hunt.com](https://claude-hunt.com)에 업로드합니다.

*   **오프라인 수강생**: 강의 마지막 날 오후 5시까지 올리면 그날 투표 대상이 됩니다.
*   **온라인 수강생**: 완성하는 대로 올리면 그달 말일 투표 대상이 됩니다.

## [FAQ](#faq)

### Agent Teams를 이 실습에서 꼭 사용해야 하나요?

### shadcn preset은 나중에 바꿀 수 있나요?

### spec 단계에서 미결정 항목이 너무 많이 남으면?

## [이어서 배울 내용](#이어서-배울-내용)

개인 프로젝트 실습이 끝나면 Part 3 전체를 정리합니다.

피드백 남기기

[

템플릿으로 첫 화면 띄우기 | 프로젝트 셋업

harness 템플릿을 본인 GitHub 저장소에 복제하고 로컬과 Vercel에서 같은 화면이 뜨는 빈 프로젝트를 갖춥니다

](/learn/completing-projects/personal-project/setup)[

Part 3 정리

Part 3에서 배운 Claude Code Desktop, SDD 6단계 사이클, 단계별 검증 도구, Compound 승격, Git Worktree·Agent Teams를 정리합니다

](/learn/completing-projects/wrap-up)

---
Source: https://docs.claude-hunt.com/learn/completing-projects/personal-project/practice
