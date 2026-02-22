import { RESTManager } from "./src/rest";

const TOKEN = process.env.FLUXER_TOKEN as string;
const rest = new RESTManager(TOKEN);

try {
    console.log("Fetching /users/@me...");
    const me = await rest.getMe();
    console.log("Logged in as:", me.username, `(${me.id})`);

    console.log("\nFetching /gateway...");
    const gw = await (rest as any).request("GET", "/gateway");
    console.log("Gateway response:", gw);

    console.log("\nFetching /gateway/bot...");
    const gwBot = await (rest as any).request("GET", "/gateway/bot");
    console.log("Gateway Bot response:", gwBot);
} catch (error: any) {
    console.error("Error:", error.message);
}
