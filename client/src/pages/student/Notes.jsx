import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Notes = () => {
  const [prompt, setPrompt] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const generateNotes = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setNotes("");

    try {
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBfzPUkHjLKBkKJ7xdlK5Pld_KuAexOyTE",
        {
          contents: [
            {
              parts: [
                {
                  text: `Create structured academic notes on the topic: "${prompt}". Use headings, bullet points, and short explanations. Keep it easy to read and organized.`,
                },
              ],
            },
          ],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const content = res.data.candidates?.[0]?.content?.parts?.[0]?.text;
      setNotes(content || "No notes generated.");
    } catch (error) {
      console.error("Error:", error);
      setNotes("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const downloadNotes = () => {
    const blob = new Blob([notes], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = `${prompt.slice(0, 20).replace(/\s/g, "_") || "notes"}.txt`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-start pt-28 px-4 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-lg">
        ✍️ Generate Notes
      </h1>

      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 space-y-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a topic (e.g., Photosynthesis, World War II)..."
          className="w-full h-32 p-4 rounded-xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />

        <button
          onClick={generateNotes}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-full font-semibold text-lg transition-transform transform hover:scale-105 shadow"
        >
          {loading ? "Generating Notes..." : "Generate Notes"}
        </button>

        {notes && (
          <div className="bg-white text-black p-5 rounded-xl shadow-inner max-h-[60vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              📄 Your Notes
            </h2>
            <div className="prose prose-sm md:prose-base max-w-none">
              <ReactMarkdown>{notes}</ReactMarkdown>
            </div>

            <button
              onClick={downloadNotes}
              className="mt-6 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
            >
              ⬇ Download as TXT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
