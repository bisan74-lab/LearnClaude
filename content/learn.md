# Claude Code 강의 소개 | 제대로 배우기

# 강의 소개

Claude Code로 설계·구현·배포를 하나의 흐름으로 연결하고, 자신만의 AI 협업 워크플로우를 구축합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [강의 목표](#강의-목표)

이 강의를 끝내면 Claude Code 하나로 신규 서비스를 설계부터 배포까지 직접 완성하고, Skill·Hook·MCP(Model Context Protocol)·CLI(Command Line Interface)로 Claude를 내 환경에 맞게 확장해 자신만의 AI 협업 워크플로우를 만듭니다.

* * *

## [강사 소개](#강사-소개)

![강사 프로필 사진](images/profile.0hyw7p20-800p.png)

김한울 (Toy Crane). Product Maker이자 Full-stack 개발자입니다. 인프런, 패스트캠퍼스, 스파르타 코딩클럽에서 개발 강의를 해왔고, 현재는 Claude Code로 AI 기반 프로덕트(디어리, 파크골프 가자)를 직접 만들고 운영합니다. 직접 프로덕트를 만들며 몸으로 익힌 실전 워크플로우를 이 강의에 담았습니다.

*   Blog: [toycrane.xyz](https://toycrane.xyz)
*   Threads: [@toy\_crane911](https://www.threads.net/@toy_crane911)
*   X (Twitter): [@toy\_\_crane](https://x.com/toy__crane)
*   Email: [alwaysfun2183@gmail.com](mailto:alwaysfun2183@gmail.com)

* * *

## [강의 커리큘럼](#강의-커리큘럼)

### [Part 1 · 대화 시작하기](#part-1--대화-시작하기)

> Claude Code의 기본 원리를 이해하고, AI와 대화하듯 첫 번째 앱을 직접 만들 수 있습니다.

*   LLM(Large Language Model)이 왜 틀리는지 이해하고, Agent가 이를 어떻게 보완하는지 배웁니다.
*   Claude Code 설치부터 기본 조작까지 익힙니다.
*   Context를 관리해서 AI 응답 품질을 일정하게 유지합니다.
*   Plan Mode로 Todo 앱을 직접 만들어봅니다.

### [Part 2 · Claude 확장하기](#part-2--claude-확장하기)

> Part 1에서 익힌 기본기 위에, AI에게 지식과 도구를 추가하고 데이터 흐름까지 제어하는 프로그래밍 가능한 환경을 갖춥니다.

*   테스트 기반 성공 기준으로 AI가 스스로 검증하며 구현합니다.
*   Task 시스템으로 계획을 유지하고, 의존성으로 순서를 관리합니다.
*   Rules, Commands, Skills로 지식을 추가하고, MCP와 CLI로 외부 시스템에 접근합니다.
*   Hooks와 Custom Agent로 데이터 흐름을 제어합니다.

### [Part 3 · 프로젝트 완성하기](#part-3--프로젝트-완성하기)

> Part 2에서 익힌 도구들을 하나의 사이클로 통합하고, 여러 Agent의 협업과 개인 프로젝트까지 완성합니다.

*   Claude Code Desktop으로 diff와 실행 화면을 한 화면에서 검토합니다.
*   SDD(Spec Driven Development)로 설계부터 구현까지 한 흐름으로 이어갑니다.
*   Agent Teams로 여러 Agent가 병렬로 협업합니다.
*   배운 모든 것을 결합해 개인 프로젝트를 완성합니다.

* * *

## [실습 프로젝트](#실습-프로젝트)

### [1\. feedme.wiki 클론](#1-feedmewiki-클론)

![feedme.wiki 미리보기](images/feedme-preview.2rj0-scojew6v.png)

[feedme.wiki](https://www.feedme.wiki/)는 아무 URL이나 붙여 넣으면 본문을 Markdown으로 변환하는 서비스입니다. 요약·한국어 번역·쉬운 설명 같은 프롬프트를 바로 얹을 수 있어, 웹 콘텐츠를 LLM에게 넘기기 좋은 형태로 정리합니다.

강의 흐름을 따라 이 서비스를 직접 클론합니다. Plan Mode, Skills, MCP 등 배운 도구를 실제 서비스에 써보며 AI 협업 워크플로우를 익힙니다.

### [2\. 개인 프로젝트](#2-개인-프로젝트)

각자 원하는 주제로 개인 프로젝트를 진행합니다. Spec Driven Development로 설계부터 배포까지 직접 경험합니다.

수강생 투표 시상

완성한 프로젝트를 [Claude Hunt](https://www.claude-hunt.com/)에 올리면, 수강생 투표로 상위 3명을 선정합니다. 수강 형태에 따라 시상이 다릅니다.

오프라인온라인

오프라인 강의는 마지막 날 프로젝트를 모아 1·2·3등을 선정합니다.

*   1등 스타벅스 3만원권
*   2등 스타벅스 2만원권
*   3등 스타벅스 1만원권

온라인 강의는 매달 말일 1·2·3등을 선정합니다.

*   1등 스타벅스 5만원권
*   2등 스타벅스 3만원권
*   3등 스타벅스 1만원권

지난 프로젝트도 같은 사이트에서 확인할 수 있습니다.

* * *

## [강의 진행 방식](#강의-진행-방식)

*   AI가 생성하는 코드는 매번 달라지기 때문에 강사 화면과 달라도 정상입니다. 특정 코드를 따라 치는 것이 아니라, AI와 협업하는 사고 방식을 익히는 강의입니다.
*   매 챕터 실습 코드를 [GitHub 저장소](https://github.com/toy-crane/todo-tutorial)에 실시간으로 올립니다. 진도를 놓치더라도 해당 챕터로 checkout하면 언제든 따라올 수 있습니다.

* * *

## [사전 준비사항](#사전-준비사항)

강의 첫날 전까지 준비할 항목이 있습니다. [사전 준비사항 가이드](/learn/prerequisites)를 확인하고 설치를 마쳐 주세요.

피드백 남기기

[

사전 준비사항

Claude Code for Developers 강의 수강 전 설치해야 할 도구와 계정을 안내합니다

](/learn/prerequisites)

---
Source: https://docs.claude-hunt.com/learn
