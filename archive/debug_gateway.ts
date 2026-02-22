import { RESTManager } from "./src/rest";

const TOKEN = process.env.FLUXER_TOKEN as string;
const rest = new RESTManager(TOKEN);

try {
    console.log("Fetching gateway URL...");
    // Try calling /gateway directly using the underlying request method
    const response = await (rest as any).request("GET", "/gateway");
    console.log("Gateway response:", response);
} catch (error: any) {
    console.error("Failed to fetch gateway:", error.message);
}
