---
title: "Frame Drop 85%는 결국 리스트 하나였다"
date: "2026-06-18"
summary: "Electron 자동화 테스트 앱의 스크롤이 밀렸다. 원인은 무거운 렌더링이 아니라, 매 초 통째로 갈아엎던 로그 리스트였다."
tags: ["React", "Performance", "Electron"]
---

자동화 테스트 데스크톱 앱은 장비가 뱉는 로그를 실시간으로 받아 화면에 쌓는다. 테스트가 길어질수록 스크롤이 눈에 띄게 밀렸다. "로그가 많아서 그렇겠지"는 원인이 아니라 변명이다. 숫자부터 봤다.

## 증상

DevTools Performance 탭으로 30초를 녹화했다.

- 평균 48fps, 스크롤 중 최저 **9fps**
- 스크립팅에 프레임당 40ms 이상
- Recalculate Style이 프레임마다 반복

렌더링이 무거운 게 아니라, **너무 자주** 일어나고 있었다.

## 측정

React DevTools Profiler의 "Highlight updates"를 켜자 답이 나왔다. 로그가 한 줄 들어올 때마다 화면 전체가 번쩍였다. 리스트 2,000행이 통째로 다시 그려지고 있었다.

원인은 두 가지가 겹쳐 있었다.

```tsx
// 매 렌더마다 새 배열 · 새 함수가 만들어진다
const visible = logs.filter((log) => log.level >= threshold);

return (
  <LogList
    items={visible}
    onSelect={(id) => setSelected(id)}
  />
);
```

`filter`는 매번 새 배열을 만들고, 인라인 화살표 함수는 매번 새 참조가 된다. 자식이 `memo`로 감싸여 있어도 props가 매번 달라지니 memo는 아무 일도 하지 않는다. memo를 붙여놓고 안심하고 있었던 셈이다.

## 고친 것

### 1. 참조를 안정시킨다

```tsx
const visible = useMemo(
  () => logs.filter((log) => log.level >= threshold),
  [logs, threshold],
);

const handleSelect = useCallback((id: string) => setSelected(id), []);
```

이것만으로 리렌더 범위는 줄었지만, 로그가 실제로 추가될 때는 여전히 2,000행이 다시 그려졌다.

### 2. 보이는 것만 그린다

리스트를 가상화해 뷰포트에 들어온 행만 렌더링했다. 2,000행이 아니라 화면에 실제로 보이는 20여 행만 DOM에 존재하게 된다.

### 3. 초당 60번 오는 상태를 묶는다

IPC로 들어오는 로그를 한 건마다 `setState` 하고 있었다. 이걸 **100ms 단위로 모아서** 한 번에 반영하도록 바꿨다. 사용자는 100ms의 지연을 느끼지 못하지만, 리렌더 횟수는 한 자릿수로 떨어진다.

```tsx
useEffect(() => {
  let buffer: Log[] = [];

  const flush = () => {
    if (buffer.length === 0) return;
    setLogs((prev) => [...prev, ...buffer]);
    buffer = [];
  };

  const timer = setInterval(flush, 100);
  const off = ipc.on("log", (log: Log) => buffer.push(log));

  return () => {
    clearInterval(timer);
    off();
    flush();
  };
}, []);
```

## 결과

| | 이전 | 이후 |
| --- | --- | --- |
| 스크롤 중 최저 FPS | 9fps | 57fps |
| Frame Drop | 기준 | **85% 감소** |
| IPC 왕복 | 1.2s | 0.8s |

## 남은 것

가장 오래 걸린 건 고치는 일이 아니라 **어디가 문제인지 확정하는 일**이었다. 짐작으로 `memo`를 붙였던 처음 이틀은 아무것도 바꾸지 못했다. 프로파일러를 켜고 나서야 30분 만에 원인이 보였다.

성능 작업은 추측을 금지하는 데서 시작한다. 숫자를 먼저 만들고, 그 숫자가 움직이는지로만 판단한다.
