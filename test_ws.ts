import WebSocket from "ws";

const url = "wss://gateway.fluxer.app/?v=1&encoding=json&compress=none";

console.log("Connecting to WebSocket with spoofed headers...");

const ws = new WebSocket(url, {
    headers: {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "Upgrade",
        "Host": "gateway.fluxer.app",
        "Origin": "https://web.fluxer.app",
        "Pragma": "no-cache",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "websocket",
        "Sec-Fetch-Site": "same-site",
        "Sec-GPC": "1",
        "Sec-WebSocket-Extensions": "permessage-deflate",
        "Sec-WebSocket-Version": "13",
        "Upgrade": "websocket",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0"
    }
});

ws.on('open', function open() {
    console.log('✅ Connected to Fluxer WebSocket successfully!');
});

ws.on('message', function message(data) {
    console.log('📩 received: %s', data);
});

ws.on('error', function error(e) {
    console.error('❌ WebSocket error:', e.message);
});

ws.on('close', function close() {
    console.log('🔌 WebSocket disconnected');
});
