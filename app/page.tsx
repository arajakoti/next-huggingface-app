"use client";

import { useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);

    const currentInput = input;

    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: currentInput,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Request failed");
        return;
      }

      const botMessage = {
        role: "assistant",
        content: data.text,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-100 via-blue-100 to-yellow-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-3">
              AWS Cloud AI Assistant
            </h1>

            <p className="text-lg text-gray-700 font-medium">
              Your intelligent chatbot for AWS Cloud, DevOps,
              Architecture, Security, Networking, and Serverless
              technologies.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Ask anything related to AWS services and cloud
              computing.
            </p>
          </div>

          <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2">
            {messages.length === 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-900">
                Example questions:
                <ul className="list-disc ml-6 mt-2 text-sm">
                  <li>What is AWS Lambda?</li>
                  <li>Difference between ECS and EKS?</li>
                  <li>Explain VPC in AWS</li>
                  <li>What is autoscaling?</li>
                </ul>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl shadow-sm ${
                  m.role === "user"
                    ? "bg-blue-600 text-white ml-12"
                    : "bg-gray-100 text-black mr-12"
                }`}
              >
                <div className="font-bold mb-2">
                  {m.role === "user"
                    ? "You"
                    : "AWS Cloud Bot"}
                </div>

                <div className="whitespace-pre-wrap">
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <input
              className="flex-1 border border-gray-300 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask an AWS cloud question..."
              onKeyDown={e => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 rounded-xl font-semibold shadow-md transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}