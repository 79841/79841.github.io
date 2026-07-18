---
title: "eas-cli는 .env를 로드하지 않는다 — environment 컨텍스트가 없는 명령만 터진다"
date: "2026-07-19"
summary: "eas credentials가 원인 메시지 없이 exit 1로 죽었다. eas-cli는 .env를 로드하지 않은 채 앱 설정을 평가하는데, eas build만 통과해서 더 혼란스럽다."
tags: ["Expo", "EAS"]
---

APNs 푸시 키를 등록하려고 `eas credentials`를 돌렸다. 돌아온 것은 `expo config --json exited with non-zero code: 1` — 원인 메시지는 한 줄도 나오지 않았다. 빌드는 멀쩡히 되는데 이 명령만 죽었다.

## 원인 — .env 없이 앱 설정을 평가한다

eas-cli는 `eas credentials` 같은 명령에서 앱 설정을 읽을 때 `EXPO_NO_DOTENV=1`을 설정한 채 `expo config --json`을 실행한다. `.env` 파일이 로드되지 않는다 — eas는 자체 environment 시스템으로 env를 관리하기 때문이다.

그래서 `app.config.ts`가 `process.env.EXPO_PUBLIC_*`에 기대는 플러그인 옵션을 가지면(예: google-signin의 `iosUrlScheme`), 그 값이 빈 문자열이 되어 플러그인 검증이 throw한다. eas-cli는 이를 원인 없이 exit 1로만 전한다.

`eas build`는 왜 통과하는가. eas.json에 `environment` 필드를 설정하면 EAS CLI가 그 환경의 변수를 서버에서 받아 **로컬 config 평가에도** 주입하기 때문이다(secret 타입 제외). environment 컨텍스트가 없는 명령 — credentials가 그렇다 — 에서만 터진다. 그래서 더 혼란스럽다.

## 재현과 진단

같은 에러는 `EXPO_NO_DOTENV=1 npx expo config --json`으로 재현된다. exit 1인데 stderr가 비었으면 `EXPO_DEBUG=1`을 붙이거나 `--json` 없이 실행한다 — 그제야 플러그인 에러 메시지가 보인다.

## 해결 — 셸에 .env를 직접 로드한다

`EXPO_NO_DOTENV`는 dotenv 파일 로딩만 막을 뿐, 이미 설정된 셸 환경 변수는 통과시킨다. 셸에서 `.env`를 export하고 실행하면 된다.

```bash
set -a && source .env && set +a && eas credentials -p ios
```

이 함정은 [Expo 푸시의 APNs 환경 문제](/blog/expo-push-apns-environment/)를 잡던 날, 푸시 키를 등록하다 만났다. 도구가 환경 변수를 어디서 읽는지는 명령마다 다르다 — 그 경계의 기본값을 의심해야 한다.
