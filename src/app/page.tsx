"use client"; // if you're using Next.js 13+ app router

import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log("Hello from the client side!"); // Debug log to confirm client-side rendering

  const summarizeText = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await fetch("/api/summarize", {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify({ inputs: inputText }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

     setSummary(data.summary || "No summary returned.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">AI Text Summarizer</h1>

      <textarea
        className="w-full max-w-xl p-3 border rounded-lg mb-4"
        rows={6}
        placeholder="Paste text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        onClick={summarizeText}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {summary && (
        <div className="mt-6 p-4 bg-white border rounded-lg shadow w-full max-w-xl">
          <h2 className="font-semibold mb-2">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </main>
  );
}
