import { useState, useEffect } from "react";
import { teams } from "@/data/data";
import TeamCard from "@/components/TeamCard";
import { TeamCardSkeleton } from "@/components/SkeletonCard";
import { Trophy, Zap } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">IPL 2025 Season</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
          Explore{" "}
          <span className="text-gradient-gold">IPL Teams</span>
        </h1>
        <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
          Deep-dive into every squad, player stats, form guides, and fantasy insights.
        </p>
      </div>

      {/* Teams grid */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Trophy className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
            {teams.length} Teams
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <TeamCardSkeleton key={i} />)
            : teams.map((team) => <TeamCard key={team.id} team={team} />)}
        </div>
      </div>

      {/* Stats banner */}
      {!loading && (
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Teams", value: teams.length },
            { label: "Players", value: teams.reduce((acc, t) => acc + t.players.length, 0) },
            { label: "Avg Rating", value: (teams.flatMap((t) => t.players).reduce((a, p) => a + p.rating, 0) / teams.flatMap((t) => t.players).length).toFixed(1) },
            { label: "All-rounders", value: teams.flatMap((t) => t.players).filter((p) => p.role === "All-rounder").length },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-muted-foreground text-sm mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
