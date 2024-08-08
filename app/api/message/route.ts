import OpenAI from "openai";

export async function POST(req: Request) {
  const body = await req.json();

  if (typeof body === "object" && body !== null && "message" in body) {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: body.message as string }],
      model: "gpt-3.5-turbo",
    });

    return Response.json({ answer: chatCompletion.choices[0].message.content });
  }

  return Response.json({ error: "Unknow error" });
}
