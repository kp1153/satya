import { client } from "@/sanity/lib/client";

export async function GET() {
  try {
    const data = await client.fetch(`*[_type == "post"][0...1]{title, slug}`);
    return new Response(JSON.stringify(data, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
