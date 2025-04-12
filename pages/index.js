import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGPT = async () => {
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: input }],
      }),
    });
    const data = await res.json();
    setResult(data.choices?.[0]?.message?.content || "No response");
    setLoading(false);
  };

  const handleSupernotes = async () => {
    setLoading(true);
    const res = await fetch("/api/supernotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search: input }),
    });
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
    setLoading(false);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>SupernotesGPT 🧠</h1>
      <textarea
        rows="4"
        style={{ width: "100%", padding: "1rem" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a prompt or search..."
      />
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleGPT} disabled={loading} style={{ marginRight: "1rem" }}>
          Ask GPT
        </button>
        <button onClick={handleSupernotes} disabled={loading}>
          Search Supernotes
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {result && (
        <pre style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>{result}</pre>
      )}
    </main>
  );
}
