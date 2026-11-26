// Free image maker: Pollinations. A key is optional.
export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const key = (process.env.POLLINATIONS_API_KEY || "").trim();

    const url =
      "https://gen.pollinations.ai/image/" + encodeURIComponent(prompt) +
      "?model=flux&width=1024&height=1024&nologo=true";

    const res = await fetch(url, {
      cache: "no-store",
      headers: key ? { Authorization: `Bearer ${key}` } : {},
    });

    if (!res.ok) {
      const hint = res.status === 401 || res.status === 403
        ? " Get a free key at enter.pollinations.ai and add POLLINATIONS_API_KEY to .env.local."
        : " Please try again in a moment.";
      throw new Error(`The image service replied with ${res.status}.${hint}`);
    }

    // Turn the image into text so the browser can show it in an <img>
    const type = res.headers.get("content-type") || "image/jpeg";
    const base64 = Buffer.from(await res.arrayBuffer()).toString("base64");
    return Response.json({ image: `data:${type};base64,${base64}` });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
