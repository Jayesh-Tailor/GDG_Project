import ComparePlayers from "@/components/ComparePlayers";
import { GitCompare } from "lucide-react";
import { useSearch } from "wouter";

export default function ComparePage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialP1 = params.get("p1") ?? undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
          <GitCompare className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">Player Comparison</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Compare <span className="text-gradient-gold">Players</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Select any two players across all teams to compare their stats side by side.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6">
        <ComparePlayers initialP1={initialP1} />
      </div>
    </div>
  );
}
