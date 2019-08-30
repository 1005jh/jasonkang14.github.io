---
title: WebRTC[03] - Mediasoup Flow Explained
date: "2019-08-20T22:27:37.121Z"
template: "post"
draft: false
slug: "/posts/react/webrtc-Mediasoup-flow-explained"
category: "webrtc"
tags:
  - "webrtc"
  - "reactnative"
  - "mediasoup"

description: "Mediasoup Flow explained"
---

###Mediasoup is an SFU(Selective Forwarding Unit) which receives audio and video streams from endpoints and relays them to everyone else

####Some of code examples are mine, and others are from [mediasoup-demo](https://https://github.com/versatica/mediasoup-demo)

1. Device Loading

   - device loading requires routerRtpCapabilities, which must be retrieved via a Mediasoup server

```

//server.js

const rtpCapabilities = mediasoupRouter.rtpCapabilities();

```

- or it could be like below according to a demo.

```

//server.js

return mediasoupRouter.rtpCapabilities

```

```

//client.js

    device = new mediasoupClient.Device({ Handler: "ReactNative" });
        await device.load({ routerRtpCapabilities });
        console.log("device loaded: ", device);

        if (device.canProduce("audio")) {
            this.produce();
        }

```

- This is what a device looks like when it's succesfully loaded
  ![loaded device](https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/69357284_10219663912889269_8411179144062173184_o.jpg?_nc_cat=108&_nc_oc=AQnCgsV5iFz3uHOq6rw8QZ33wdk0mDWECQieZm_SYbv2mbIq6HKivgQChGidEGcDiHU&_nc_ht=scontent-icn1-1.xx&oh=6f04e6fc083582a0c1aeca5edce97100&oe=5DCCFBF9)

2. Creating Transports

   - you gotta create a `sendTransport` and a `recvTransport`
   - transports are used to send/receive media. and they are created before wishing to send/receive media

   - first you create a `sendTransport` to send media
     `createWebRtcTransport { forceTcp: false, producing: true, consuming: false }`

   ```
   const transportInfo = await this._protoo.request(
         'createWebRtcTransport',
         {
           forceTcp: this._forceTcp,
           producing: true,
           consuming: false,
           sctpCapabilities: this._useDataChannel
             ? this._mediasoupDevice.sctpCapabilities
             : undefined,
         },
       );

   const {
       id,
       iceParameters,
       iceCandidates,
       dtlsParameters,
       sctpParameters,
   } = transportInfo;

   this._sendTransport = this._mediasoupDevice.createSendTransport(
       {
        id,
        iceParameters,
        iceCandidates,
        dtlsParameters,
        sctpParameters,
       },
   );
   ```

   - set up `connect` and `produce` events for `sendTransport`

```
this.sendTransport.on("connect", ({ dtlsParameters })  => {
                console.log("send connect triggered");
                socket.emit("connectWebRTCTransport", {
                    transportId: sendTransport.id,
                    dtlsParameters: dtlsParameters
                })
            })

            this.sendTransport.on("produce", async ({ producer}) => {
                console.log("send produce triggered");
                socket.emit("produce", {
                    transportId: sendTransport.id,
                    kind: "audio",
                    rtpParameters: producer.rtpParameters,
                    appData: producer.appData
                })
            })
```

- you don't have to wait for a signal from another producer before creating a `recvTransport`. just do it right away.

`createWebRtcTransport { forceTcp: false, producing: false, consuming: true }`

```
const transportInfo = await this._protoo.request(
       'createWebRtcTransport',
       {
         forceTcp: this._forceTcp,
         producing: false,
         consuming: true,
         sctpCapabilities: this._useDataChannel
           ? this._mediasoupDevice.sctpCapabilities
           : undefined,
       },
     );

     const {
       id,
       iceParameters,
       iceCandidates,
       dtlsParameters,
       sctpParameters,
     } = transportInfo;

     this._recvTransport = this._mediasoupDevice.createRecvTransport(
       {
         id,
         iceParameters,
         iceCandidates,
         dtlsParameters,
         sctpParameters,
       },
     );
```
