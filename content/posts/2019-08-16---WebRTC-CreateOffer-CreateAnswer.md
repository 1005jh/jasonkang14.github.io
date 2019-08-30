---
title: WebRTC Flow[01] - createOffer() and createAnswer()
date: "2019-08-16T17:27:37.121Z"
template: "post"
draft: false
slug: "/posts/react/webrtc-create-offer-create-answer"
category: "webrtc"
tags:
  - "webrtc"
  - "reactnative"

description: "WebRTC flow explained"
---

##This post is about using WebRTC in React Native.

make sure to install `react-native-webrtc` versions 1.75 or above <br>
`npm install --save react-native-webrtc`

And then you have to import. <br>
`import { RTCPeerConnection } from 'react-native-webrtc'`

Now create a caller/callee

`const caller = new RTCPeerConnection({ offerOptions })`
`offerOptions` represent which source of data you are going to offer: either audio or video, or could be both.
