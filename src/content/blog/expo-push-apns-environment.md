---
title: "Expo 푸시가 시뮬레이터에서 사라진 이유 — APNs 환경은 development 플래그가 정한다"
date: "2026-07-19"
summary: "티켓은 ok인데 시뮬레이터에 알림이 오지 않았다. 시뮬레이터 빌드에는 provisioning profile이 실리지 않아 APNs 환경 판별이 production으로 폴백한 것이 원인이었다."
tags: ["Expo", "iOS", "React Native"]
---

여행 도슨트 앱의 iOS 푸시를 검증하던 날이었다. Expo Push API는 발송 요청의 응답인 티켓으로 `ok`를 돌려줬는데, 시뮬레이터에는 아무것도 오지 않았다. 에러를 뱉는 실패는 고치면 된다 — 조용히 사라지는 실패가 진짜 문제다.

## 증상과 측정 — 티켓은 ok, 수신 측도 정상

통념은 "시뮬레이터는 원격 푸시가 안 된다"지만, 조건이 맞으면 APNs sandbox의 진짜 원격 푸시를 받는다. 조건은 Apple Silicon(또는 T2) Mac과 Xcode 14 이상, 그리고 런타임이다. 런타임은 버전을 가린다 — 내가 확인한 조합은 iOS 17.x 런타임이고, 최신 iOS 26.0 런타임은 푸시 수신을 담당하는 데몬 apsd가 APNs 접속 identity를 얻지 못해 토큰 발급이 영원히 pending됐다. 지원 여부는 apsd 로그로 확인해야 한다.

수신 연결도 같은 로그로 본다.

```bash
xcrun simctl spawn <udid> log show --predicate 'process == "apsd"'
# Connected on 1 interfaces — 수신 연결 정상
```

수신 측이 정상이라면 남는 쪽은 발송 경로다. Expo Push API의 `ok` 티켓은 **접수했다는 뜻이지 전달했다는 뜻이 아니다**. 발송과 수신 사이 어딘가에서 사라졌다.

## 원인 — APNs 환경 판별이 production으로 폴백한다

APNs는 sandbox와 production이 분리된 서버이고, device token은 **발급된 환경에서만 유효하다**. Expo Push Service는 토큰을 등록할 때 함께 온 `development` 플래그를 보고 어느 쪽으로 보낼지 정한다.

그 플래그는 누가 정하는가. `getExpoPushTokenAsync()`는 빌드에 포함된 provisioning profile의 `aps-environment`를 읽어 자동 판별한다. 그런데 **시뮬레이터 빌드에는 embedded provisioning profile이 실리지 않는다**. 판별은 실패하고, production으로 폴백한다.

결과: sandbox에서 발급된 토큰으로 production 서버에 발송. APNs 입장에선 모르는 토큰이니 버린다. 티켓 단계에서는 에러 한 줄 남지 않는다.

## 해결 — development 플래그를 명시한다

한 줄이다.

```ts
getExpoPushTokenAsync({
  projectId,
  // 시뮬레이터 빌드는 profile이 실리지 않아 자동 판별이 production으로 폴백한다
  development: __DEV__ && Platform.OS === "ios",
});
```

실기기 dev 빌드는 `aps-environment`가 development라 플래그와 일치하고, 릴리즈 빌드는 `__DEV__`가 false라 영향을 받지 않는다. 플래그를 명시하자 시뮬레이터에 알림이 도착했다.

시뮬레이터로 계속 테스트한다면 한 가지 더 — 내 환경에선 시뮬레이터의 device token이 apsd 재시작이나 장시간 유휴 후 무효화됐다(발송 시 `BadDeviceToken`). 테스트 직전마다 토큰을 재발급하는 것이 정석이고, 오래 켜둬서 연결이 끊겼으면 `xcrun simctl spawn <udid> launchctl kickstart -k system/com.apple.apsd`로 apsd를 재시작한 뒤 토큰 재발급부터 다시 한다.

## 남은 것 — 조용한 실패를 시끄럽게 만든다

이날 가장 오래 걸린 건 실패했다는 사실을 아는 일이었다. 문제는 환경의 경계에서 났다. 빌드 환경이 APNs 환경을 정하는데, 그 경계의 기본값은 조용히 틀린다. 같은 날 푸시 키를 등록하다 만난 [eas-cli의 .env 미로드](/blog/eas-cli-no-dotenv/)도 결이 같은 문제였다.

그래서 지금은 접수 응답을 믿지 않는다. 전달은 티켓과 별도로 조회하는 receipt로 확인하고, `DeviceNotRegistered`가 오면 죽은 토큰을 지운다. 실패가 조용할수록 알람은 시끄러워야 한다.
