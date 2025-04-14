import React, { useState, useEffect } from "react";
import axios from "axios";

const Quiz = () => {
  const [prompt, setPrompt] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const generateQuiz = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setQuizData([]);
    setCurrentQ(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(30);

    try {
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBfzPUkHjLKBkKJ7xdlK5Pld_KuAexOyTE",
        {
          contents: [
            {
              parts: [
                {
                  text: `Create a 5-question multiple-choice quiz on the topic "${prompt}". Format it strictly as JSON like:
[
  {
    "question": "What is 2 + 2?",
    "options": ["2", "4", "5", "6"],
    "answer": "4"
  },
  ...
]`,
                },
              ],
            },
          ],
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const content = res.data.candidates?.[0]?.content?.parts?.[0]?.text;
      const cleaned = content.replace(/```json|```/g, "").trim();
      const parsedQuiz = JSON.parse(cleaned);
      setQuizData(parsedQuiz);
    } catch (error) {
      console.error("Error:", error);
      alert("Quiz generation failed. Try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!quizData.length || showScore) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizData, currentQ, showScore]);

  const handleOptionClick = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === quizData[currentQ].answer) setScore((s) => s + 1);
    if (currentQ === quizData.length - 1) {
      setShowScore(true);
    } else {
      setCurrentQ((prev) => prev + 1);
      setSelected(null);
      setTimeLeft(30);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6 text-white flex flex-col items-center justify-start pt-28">
      <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-lg">🧠 Quiz Challenge</h1>

      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 space-y-6 text-black">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a quiz topic (e.g., JavaScript, WW2, Photosynthesis)..."
          className="w-full h-28 p-4 text-black rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />

        <button
          onClick={generateQuiz}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow"
        >
          {loading ? "Generating Quiz..." : "Generate Quiz"}
        </button>

        {quizData.length > 0 && !showScore && (
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium text-purple-900 mb-2">
              <p>⏱ Time Left: <span className="font-semibold">{timeLeft}s</span></p>
              <p>
                Question <span className="font-semibold">{currentQ + 1}</span> of {quizData.length}
              </p>
            </div>

            <h2 className="text-xl font-semibold mb-2">{quizData[currentQ].question}</h2>
            <div className="grid gap-3">
              {quizData[currentQ].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-4 py-2 rounded-md border font-medium transition 
                  ${
                    selected === option
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="mt-6 w-full bg-black text-white px-4 py-3 rounded-full hover:bg-gray-900 font-semibold transition"
            >
              {currentQ === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        )}

        {showScore && (
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-green-700">🎉 Quiz Completed!</h2>
            <p className="text-lg text-gray-800">
              Your Score: <span className="font-bold">{score}</span> / {quizData.length}
            </p>
            <button
              onClick={() => {
                setPrompt("");
                setQuizData([]);
                setShowScore(false);
                setSelected(null);
              }}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700"
            >
              Try Another Topic
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
