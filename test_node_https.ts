import https from "node:https";

const TOKEN = process.env.FLUXER_TOKEN as string;
const url = "https://api.fluxer.app/v1/users/@me";

const options = {
    headers: {
        "Authorization": TOKEN,
        "User-Agent": "curl/8.16.0"
    }
};

console.log(`Fetching ${url} using node:https...`);

https.get(url, options, (res) => {
    let data = "";
    console.log("Status Code:", res.statusCode);

    res.on("data", (chunk) => {
        data += chunk;
    });

    res.on("end", () => {
        try {
            const json = JSON.parse(data);
            console.log("Success:", json.username);
        } catch (e) {
            console.log("Body:", data);
        }
    });

}).on("error", (err) => {
    console.error("HTTPS Error:", err.message);
});
