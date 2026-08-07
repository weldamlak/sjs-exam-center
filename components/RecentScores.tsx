"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface ScoreRecord {
  id: string;
  subject: string;
  score: number;
  total_questions: number;
  percentage: number;
  created_at: string;
}

export default function RecentScores() {
  const supabase = createClient();
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScores() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_scores")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (!error && data) {
        setScores(data);
      }
      setLoading(false);
    }

    fetchScores();
  }, []);

  if (loading) {
    return <div className="text-xs text-slate-400">Loading your performance...</div>;
  }

  if (scores.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
        No completed tests yet. Select a subject above to take your first quiz!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
        Recent Test Activity
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {scores.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center"
          >
            <div>
              <p className="text-sm font-bold text-white capitalize">{item.subject}</p>
              <p className="text-xs text-slate-400">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`text-lg font-black ${
                  item.percentage >= 70 ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {item.percentage}%
              </span>
              <p className="text-[10px] text-slate-500 font-semibold">
                {item.score}/{item.total_questions} Correct
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}