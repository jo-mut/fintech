
const API_KEY = process.env.CRYPTO_API_KEY;

export async function GET(req: Request) {
    const coinId = new URL(req.url).searchParams.get('coinId') || "bitcoin";

    console.log("coinId: ", coinId)

    try {
        const response = await fetch(
            `https://openapiv1.coinstats.app/tickers/markets?limit=100&coinId=${coinId}`,
            {
                headers: {
                    accept: 'application/json',
                    'X-API-KEY': API_KEY!,
                },
            }
        );

        const result = await response.json();
        return Response.json({ data: result }, { status: 201 })
    } catch (error) {
        return Response.json({ error: error }, { status: 500 })
    }


}