---
title: "AI 에이전트가 쓴 돈을 아무도 몰랐다"
date: "2026-05-02"
summary: "Claude Code, Codex, Gemini CLI. 청구서는 매달 오는데 어디에 썼는지는 블랙박스였다. OTLP로 직접 추적하기로 했다."
tags: ["AI", "OpenTelemetry", "Electron"]
---

AI 코딩 에이전트를 세 개 쓴다. 프로젝트마다 다른 걸 쓰고, 어떤 날은 토큰을 몇 백만 개씩 태운다. 그런데 "이번 달 이 프로젝트에 얼마 썼나"라는 질문에 답할 수가 없었다. 대시보드는 도구별로 흩어져 있고, 프로젝트 단위로는 아무도 쪼개주지 않는다.

측정할 수 없는 건 개선할 수도 없다. 그래서 만들었다.

## 왜 OTLP인가

다행히 요즘 에이전트들은 대부분 **OpenTelemetry**로 텔레메트리를 내보낼 수 있다. 각 도구의 사설 API를 붙잡고 씨름하는 대신, 표준 하나만 받으면 된다.

에이전트가 OTLP 로그를 보낼 엔드포인트를 열어두는 게 전부다.

```ts
// app/v1/logs/route.ts — OTLP 인제스트
export async function POST(request: Request) {
  const payload = await request.json();
  const records = flattenResourceLogs(payload);

  for (const record of records) {
    await insertLog({
      agent: detectAgent(record),      // claude-code · codex · gemini-cli
      project: record.attributes["project.path"],
      inputTokens: record.attributes["gen_ai.usage.input_tokens"],
      outputTokens: record.attributes["gen_ai.usage.output_tokens"],
      model: record.attributes["gen_ai.request.model"],
      at: record.timeUnixNano,
    });
  }

  return Response.json({ accepted: records.length });
}
```

도구를 하나 더 쓰기 시작해도 `detectAgent` 한 줄만 늘어난다. 표준을 받는 쪽에 서면 확장이 싸다.

## 비용은 저장하지 않는다

처음엔 로그를 넣을 때 비용을 계산해서 같이 저장했다. 실수였다.

모델 단가는 바뀐다. 단가가 바뀔 때마다 과거 기록이 통째로 틀려지고, 이미 저장된 숫자는 되돌릴 방법이 없다. 그래서 저장하는 건 **토큰 수**뿐이고, 단가는 `pricing_model` 테이블에 따로 둔다. 비용은 조회할 때 계산한다.

- `agent_logs` — 무슨 일이 있었는가 (변하지 않는 사실)
- `pricing_model` — 그게 얼마인가 (변하는 해석)

사실과 해석을 섞지 않는다. 이게 이 프로젝트에서 제일 잘한 결정이었다.

## 항상 켜져 있어야 한다

에이전트는 터미널에서 아무 때나 돈다. 대시보드를 띄워둔 순간에만 수집되면 아무 소용이 없다.

그래서 Electron 트레이 앱으로 상주시켰다. 백그라운드에서 OTLP 수신기가 돌고, 메뉴바 아이콘을 누르면 그때 대시보드가 뜬다. SQLite는 WAL 모드로 열어 수집과 조회가 서로를 막지 않게 했다.

```ts
db.pragma("journal_mode = WAL");
```

한 줄이지만, 이게 없으면 대시보드를 여는 동안 인제스트가 멈춘다.

## 알게 된 것

몇 주 치 데이터가 쌓이자 감이 아니라 근거로 말할 수 있게 됐다.

- 프로젝트별 비용이 갈렸다. 컨텍스트를 크게 물리는 습관이 비싼 게 아니라, **같은 파일을 반복해서 다시 읽히는 것**이 비쌌다.
- 출력 토큰보다 입력 토큰이 압도적으로 많았다. 프롬프트를 줄이는 것보다 **읽는 범위를 줄이는 것**이 효과가 컸다.
- 도구 선택도 취향이 아니라 숫자로 판단하게 됐다.

## 남은 것

만들고 나서야 알았는데, 이 프로젝트의 값어치는 대시보드가 아니라 **질문에 답할 수 있게 된 상태** 그 자체였다. 화면은 그 부산물이다.

측정 도구를 먼저 만드는 건 늘 돌아가는 길처럼 보인다. 그런데 그 길이 대개 제일 빠르다.
