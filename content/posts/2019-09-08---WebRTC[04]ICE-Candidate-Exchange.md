---
title: WebRTC[04] ICE Candidate Exchange
date: "2019-09-08T19:27:37.121Z"
template: "post"
draft: false
slug: "/posts/webrtc/ice-candidate-exchange"
category: "webrtc"
tags:
  - "webrtc"
  - "ice"
  - "icecandidate"

description: "How ICE candidate exchange works in WebRTC flow"
---

Simply put, ICE candidate exchange is simply a negotiation between to peers to see which ICE candidates--or an ICE candidate pair--to use in order to establish a WebRTC connection.

An ICE candidate is an object that looks like this

```
{
  candidate: "candidate:2322976989 1 tcp 1518280447 192.168.1.71 52996 typ host tcptype passive generation 0 ufrag UXEY network-id 1 network-cost 10"
  sdpMLineIndex: 0
  sdpMid: "audio"
}
```
