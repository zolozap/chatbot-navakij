'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "tvZ6+Taw8xRbXvYRgV26BN5u03FaMfujncNQoKFbGzac/fKytP2P1BjJMx3nJq/vgGEMNnfIEsVOsEWDzmyJ2YVTNZRvhcbV1T3U+oCLDLs54Maw8YV+64yJ4fuUzmKvvRy/Q3KWgzI2r6xqAyxEcAdB04t89/1O/w1cDnyilFU=",
  channelSecret: "bc53f2b138ab1ab208545129500dbacf"
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result)).catch(err => {
    console.error(err);
    res.status(500).end();
  });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  } else if (event.message.type === "text" && event.message.text === "ผลิตภัณฑ์ประกันภัย") {
    const payload = {
      type: "flex",
      altText: "ผลิตภัณฑ์ประกันภัยและสินค้า",
      contents: {
        type: "carousel",
        contents: [{
          type: "bubble",
          direction: "ltr",
          hero: {
            type: "image",
            url: "https://www.img.in.th/images/0c6e1a2573edad878caabf04b1b8e6bf.jpg",
            size: "full",
            aspectRatio: "1:1",
            aspectMode: "cover",
            action: {
              type: "uri",
              uri: "https://www.navakij.co.th/th/products/motor-insurance"
            }
          }
        }, {
          type: "bubble",
          direction: "ltr",
          hero: {
            type: "image",
            url: "https://www.img.in.th/images/21ddb852cbdeea6e4e25032194258e55.jpg",
            size: "full",
            aspectRatio: "1:1",
            aspectMode: "cover",
            action: {
              type: "uri",
              uri: "https://www.navakij.co.th/th/products/miscellaneous-insurance"
            }
          }
        }, {
          type: "bubble",
          direction: "ltr",
          hero: {
            type: "image",
            url: "https://www.img.in.th/images/9ab05f12c67189e3ebfa984d67833315.jpg",
            size: "full",
            aspectRatio: "1:1",
            aspectMode: "cover",
            action: {
              type: "uri",
              uri: "https://www.navakij.co.th/th/products/property-insurance"
            }
          }
        }]
      }
    };
    return client.replyMessage(event.replyToken, payload);
  } else if (event.message.type === "text" && event.message.text === "บริการเคลม") {
    const claims_payload = {
      type: "flex",
      altText: "บริการเคลม",
      contents: {
        type: "carousel",
        contents: [{
          type: "bubble",
          direction: "ltr",
          action: {
            type: "uri",
            uri: "https://www.navakij.co.th/th/claim"
          },
          hero: {
            type: "image",
            url: "https://www.img.in.th/images/d0e4d05243bbd5309e7d6d8d08ab70b0.jpg",
            size: "full",
            aspectRatio: "1:1",
            aspectMode: "cover"
          }
        }, {
          type: "bubble",
          direction: "ltr",
          action: {
            type: "uri",
            uri: "https://page.line.me/nkiclaim"
          },
          hero: {
            type: "image",
            url: "https://www.img.in.th/images/7ada17366c3505d620da584265e2bf1e.jpg",
            size: "full",
            aspectRatio: "1:1",
            aspectMode: "cover"
          }
        }]
      }
    };
    return client.replyMessage(event.replyToken, claims_payload);
  }
}

// listen on port
const port = process.env.PORT || 1749;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});