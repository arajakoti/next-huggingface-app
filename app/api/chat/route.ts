import { generateText } from "ai";
import { huggingface } from "@ai-sdk/huggingface";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const result = await generateText({
  model: huggingface("Qwen/Qwen2.5-7B-Instruct"),

  system: `
You are an AWS Cloud assistant chatbot.

Your responsibilities:
- Answer ONLY AWS cloud related questions.
- Topics allowed include AWS services, cloud architecture, DevOps, networking, security, certifications, pricing, infrastructure, deployment, containers, serverless, monitoring, databases, and related cloud concepts.

Rules:
- If the user asks anything unrelated to AWS or cloud computing, politely respond:
  "This is not a relevant topic. I can help only with AWS cloud related questions."

- Do not answer unrelated questions.
- Be concise and professional.
`,

  prompt: body.prompt,
});

    console.log("RESULT:", result.text);

    return Response.json({
      text: result.text,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}