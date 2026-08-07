"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Question {
  id: string;
  subject: string;
  prompt: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export default function PracticeExamPage() {
  const params = useParams();
  
  // Clean raw subject string
  const rawSubject = (params.subject as string || "english").toLowerCase().trim();
  
  // Normalize subject slug
  const subjectSlug = rawSubject.startsWith("english") ? "english" : rawSubject;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("subject", subjectSlug);

      if (error) {
        console.error("Error fetching questions:", error.message);
      } else if (data) {
        console.log(`Fetched ${data.length} questions for subject: "${subjectSlug}"`);
        setQuestions(data);
      }
      setLoading(false);
    }

    fetchQuestions();
  }, [subjectSlug]);

  const handleSelectOption = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    if (selectedOption === questions[currentIndex].correct_index) {
      setScore((prev) => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="animate-pulse font-medium text-slate-400">Loading exam questions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-500">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition">
            ← Back to Dashboard
          </Link>
          <span className="text-sm font-bold uppercase tracking-wider text-blue-400">
            {subjectSlug} EXAM
          </span>
        </div>
      </header>

      {/* Exam Content */}
      <main className="max-w-3xl mx-auto px-6 py-10 flex-1 w-full">
        {questions.length === 0 ? (
          <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">No Questions Found</h2>
            <p className="text-slate-400 mb-6 text-sm">
              There are currently no questions added for &quot;{subjectSlug}&quot; in Supabase yet.
            </p>
            <Link href="/" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition">
              Return Home
            </Link>
          </div>
        ) : completed ? (
          /* Completion Card */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-md mx-auto shadow-xl">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-black mb-2">Exam Completed!</h2>
            <p className="text-slate-400 text-sm mb-6">Here is your final score:</p>
            <div className="text-4xl font-extrabold text-blue-400 mb-6">
              {score} / {questions.length}
            </div>
            <Link
              href="/"
              className="inline-block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          /* Active Question Interface */
          <div>
            {/* Progress */}
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-3">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-8">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-6 shadow-lg">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-6 leading-relaxed">
                {questions[currentIndex].prompt}
              </h2>

              <div className="space-y-3">
                {questions[currentIndex].options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === questions[currentIndex].correct_index;

                  let borderStyle = "border-slate-800 bg-slate-950/50 hover:border-slate-700";
                  if (isSelected) borderStyle = "border-blue-500 bg-blue-950/30";
                  if (showExplanation) {
                    if (isCorrect) borderStyle = "border-emerald-500 bg-emerald-950/30 text-emerald-200";
                    else if (isSelected && !isCorrect) borderStyle = "border-rose-500 bg-rose-950/30 text-rose-200";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${borderStyle}`}
                    >
                      <span>{option}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Banner */}
              {showExplanation && (
                <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300">
                  <span className="font-bold text-blue-400 block mb-1">Explanation:</span>
                  {questions[currentIndex].explanation}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              {!showExplanation ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-md"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition shadow-md flex items-center gap-2"
                >
                  {currentIndex + 1 === questions.length ? "Finish Exam" : "Next Question →"}
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        SJS Exam Practice System
      </footer>
    </div>
  );
}