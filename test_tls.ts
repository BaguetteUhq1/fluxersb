import tls from "node:tls";

const options = {
    host: "api.fluxer.app",
    port: 443,
    servername: "api.fluxer.app"
};

console.log("Connecting to api.fluxer.app:443...");

const socket = tls.connect(options, () => {
    console.log("Connected!");
    console.log("Authorized:", socket.authorized);
    socket.end();
});

socket.on("error", (err) => {
    console.error("TLS Error:", err.message);
});

socket.on("close", () => {
    console.log("Connection closed");
});
