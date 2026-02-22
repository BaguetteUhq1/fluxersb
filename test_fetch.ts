const TOKEN = process.env.FLUXER_TOKEN as string;
const url = "https://api.fluxer.app/v1/users/@me";

try {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": TOKEN,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" // Ajout d'un UA classique
        }
    });

    if (response.ok) {
        const data = await response.json() as any;
        console.log("✅ [Fetch] Success:", data.id, data.username);
    } else {
        console.log("Error status:", response.status);
        console.log(await response.text());
    }
} catch (error: any) {
    console.error("Fetch Error:", error.message);
    console.error(error);
}
