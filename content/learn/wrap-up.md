# Claude Code 전체 코스 정리 | 제대로 배우기

# 전체 코스 정리

Claude Code 전체 코스를 간결하게 요약하고, Compound Engineering과 비동기·병렬 에이전트 등 이후 학습 방향을 안내합니다

Copy MarkdownOpen

마지막 업데이트: 2026\. 7. 6.

## [학습 목표](#학습-목표)

*   전체 코스에서 배운 내용을 짧게 되짚고 이후 학습 방향을 안내합니다.

## [Part 1: Claude와 대화 시작하기](#part-1-claude와-대화-시작하기)

LLM의 구조적 한계를 이해하고, 그 한계를 도구와 Context 관리로 보완하는 데서 출발했습니다.

*   **Hallucination과 Knowledge Cutoff**: 없앨 수 없는 구조적 한계. 대응은 "검증하기"
*   **Context Window**: AI의 주의력은 유한하고, 뒤로 갈수록 떨어짐. 지금 필요한 것만 주는 것이 원칙
*   **CLAUDE.md, Memory, Task Sizing**: 매 세션마다 백지인 AI에게 규칙을 전달하고, 대화 중 배운 것을 자동 저장하며, 작업 크기를 줄여서 Smart Zone을 유지

## [Part 2: Claude를 내 방식으로 확장하기](#part-2-claude를-내-방식으로-확장하기)

"어떻게"에서 "무엇이 되어야 하는가"로 관점을 바꾸고, 위임을 뒷받침하는 도구와 사이클을 갖췄습니다.

*   **What vs How**: 성공 기준만 주면 AI가 스스로 검증하며 자율 루프를 돌 수 있음
*   **Context 품질 도구**: Commands, Skills, MCP, Hooks, Custom Agent. 입력을 줄이고 출력을 걸러내고 범위를 확장
*   **MCP**: 외부 시스템을 Tool로 바꾸는 표준. 접근권(MCP)과 사용 설명서(Skill)의 결합이 가장 강력

## [Part 3: Claude와 프로젝트 완성하기](#part-3-claude와-프로젝트-완성하기)

작업 화면을 Claude Code Desktop으로 넓히고, Part 2의 도구를 하나의 사이클로 연결하고, 여러 Agent가 협업하는 방법을 다뤘습니다.

*   **Claude Code Desktop**: 터미널에서 쓰던 Claude Code를 앱 화면에서 사용. diff 라인 코멘트와 Preview로 검토하고, Cloud 세션으로 컴퓨터를 벗어나 실행
*   **SDD**: 엔지니어링 템플릿의 Skills(/write-spec, /sketch-wireframe, /draft-plan, /execute-plan, /compound)와 Hooks로 Ideate → Specify → Sketch → Plan → Build → Compound 사이클을 구조화. feedme.wiki 클론 예제로 전체 사이클을 경험하고 Vercel에 배포
*   **Agent Teams**: 공유 Task 리스트 + 메시징으로 병렬 협업. "팀원끼리 대화해야 하는가?"가 Subagent와의 분기점
*   **개인 프로젝트**: /make-something으로 아이디어를 구체화하고, 같은 SDD 사이클을 본인 프로젝트에 적용

## [이 강의 이후](#이-강의-이후)

이 코스에서 Ideate → Specify → Sketch → Plan → Build → Compound 사이클을 갖추었습니다. 이 사이클은 도구가 바뀌어도 유효합니다. 여기서 더 나아갈 수 있는 두 가지 방향을 소개합니다.

### [Compound Engineering: 모델보다 자산 쌓기](#compound-engineering-모델보다-자산-쌓기)

모델 성능은 6개월마다 더 좋아지고 더 싸집니다. 같은 모델을 누구나 쓰는 시점에서 차이는, 매 사이클마다 반복된 의사결정·실수·우회를 도구로 쌓아 온 엔지니어링 자산에서 나옵니다.

*   **자산이 다음 사이클의 속도를 결정**: Rule·Hook·Skill·CLAUDE.md 는 한 번 쓰고 버리는 산출물이 아닙니다. 같은 사이클을 두세 번 더 돌리면 첫 사이클에서 못 본 패턴이 도구로 올라와, 다음 사이클이 더 빨라집니다.
*   **개인에서 팀·조직 단위로**: 한 사람의 도구 폴더에만 있는 자산은 활용 범위가 좁습니다. 팀 공용 Skills 묶음, plugin marketplace, 사내 CLAUDE.md 베이스로 옮기면 새 팀원이 합류한 첫날부터 쌓인 도구를 바로 활용할 수 있습니다.

### [비동기·병렬 에이전트: 매니저로 전환하기](#비동기병렬-에이전트-매니저로-전환하기)

지금까지는 개발자 1명 + AI 1명의 페어로 작업했습니다. 다음 단계는 개발자 1명이 동시에 돌아가는 AI 워커 여러 명을 조율하는 형태입니다. 이때는 코드를 만드는 AI보다 결과를 리뷰하는 사람이 새 병목이 됩니다.

*   **새 작업 흐름**: 작업을 제출하고 자리를 비웠다가, 돌아왔을 때 여러 결과를 한꺼번에 리뷰합니다. 동기 페어프로그래밍에서 비동기 코드리뷰 중심으로 작업 방식이 바뀝니다.
*   **인터페이스가 코드 뷰에서 세션 관리 뷰로**: OpenAI Codex 의 command center, Cursor 의 Cloud Agents, Claude Code 의 Agent View 가 같은 방향을 가리킵니다. 한 파일의 코드를 들여다보는 시간보다, 동시에 돌아가는 여러 세션을 한 화면에서 검토하고 다음 작업을 분배하는 시간이 늘어납니다.

## [마치며](#마치며)

이 강의는 출발선입니다. Claude Code를 본격적으로 다루기 시작하는 자리이지, AI 활용의 끝이 아닙니다. 모델 성능은 6개월마다 좋아지고, 새 기능과 사용법도 빠르게 늘어납니다.

여기서 쌓은 기초 위에서 더 빠르게 발전하려면 Claude 에게 직접 물어보세요. 새 기능이 나오면 "이건 어떻게 쓰는 거야?", 막히는 작업이 있으면 "어떤 도구가 어울릴까?" 하고 상의해 보세요. 이 강의는 만든 시점에 고정되어 있지만, Claude 는 자기 자신의 지금 모습을 가장 잘 압니다. 24시간 같은 자리에서 답해주는 강사가 곁에 있는 셈입니다.

마지막으로 Claude Max 를 한 번은 써보길 권장합니다. 토큰 제약에서 조금 더 자유로워진 채로 더 많은 작업을 자동화해보고, 평소 망설였던 시도를 테스트해 보세요. AI가 기대보다 훨씬 많은 일을 해내는 것을 확인하고, 달라진 업무 방식을 직접 느낄 수 있습니다.

피드백 남기기

[

Part 3 정리

Part 3에서 배운 Claude Code Desktop, SDD 6단계 사이클, 단계별 검증 도구, Compound 승격, Git Worktree·Agent Teams를 정리합니다

](/learn/completing-projects/wrap-up)[

Skill 개선과 Eval

Skill을 고쳤을 때 실제로 더 좋아졌는지 확인하는 Eval을 Skill Creator로 돌리고, 수정 전·후를 객관적으로 비교합니다

](/learn/references/skill-improvement-eval)

---
Source: https://docs.claude-hunt.com/learn/wrap-up
