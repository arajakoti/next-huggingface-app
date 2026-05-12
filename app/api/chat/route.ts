import { generateText } from "ai";
import { huggingface } from "@ai-sdk/huggingface";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const result = await generateText({
      model: huggingface("Qwen/Qwen2.5-7B-Instruct"),
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