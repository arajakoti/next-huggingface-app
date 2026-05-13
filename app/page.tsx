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

    const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: input,
  }),
}); 

    const data = await response.json();

//console.log(data);

if (!response.ok) {
  alert(data.error || "Request failed");
  return;
}

    const botMessage = {
      role: "assistant",
      content: data.text,
    };

    setMessages(prev => [...prev, botMessage]);

    setInput("");
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        AI Chatbot
      </h1>

      <div className="space-y-4 mb-6">
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask something..."
        />

        <button
          onClick={sendMessage}
          className="border px-4 rounded"
        >
          Send
        </button>
      </div>
    </main>
  );
}