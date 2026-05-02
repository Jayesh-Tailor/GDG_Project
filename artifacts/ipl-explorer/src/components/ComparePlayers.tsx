import { useState, useEffect } from "react";
import { teams, Player, Team, getAllPlayers } from "@/data/data";
import { Star, Trophy, ArrowLeftRight, X } from "lucide-react";

function PlayerPicker({
  selectedId,
  onSelect,
  label,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  label: string;
}) {
  const [search, setSearch] = useState("");
  const allPlayers = getAllPlayers();
  const filtered = allPlayers.filter((p) =>
    p.player.name.toLowerCase().includes(search.toLowerCase()) ||
    p.team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">{label}</div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search player…"
        className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary transition mb-2"
      />
      <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
        {filtered.map(({ player, team }) => (
          <button
            key={player.id}
            onClick={() => { onSelect(player.id); setSearch(""); }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-sm transition-all ${
              selectedId === player.id
                ? "bg-primary/10 text-primary border border-primary/30"
                : "hover:bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <img
              src={player.image}
              alt={player.name}
              className="w-7 h-7 rounded-lg object-cover object-top flex-shrink-0"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=${team.primaryColor.replace("#","")}&color=fff&size=64`;
              }}
            />
            <div className="min-w-0">
              <div className="font-medium truncate">{player.name}</div>
              <div className="text-xs text-muted-foreground truncate">{team.shortName} · {player.role}</div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-6">No players found</div>
        )}
      </div>
    </div>
  );
}

interface CompareRowProps {
  label: string;
  val1: string | number;
  val2: string | number;
  higher?: "1" | "2" | "equal";
}

function CompareRow({ label, val1, val2, higher }: CompareRowProps) {
  const n1 = typeof val1 === "number" ? val1 : parseFloat(String(val1));
  const n2 = typeof val2 === "number" ? val2 : parseFloat(String(val2));
  const auto = !isNaN(n1) && !isNaN(n2) ? (n1 > n2 ? "1" : n1 < n2 ? "2" : "equal") : null;
  const winner = higher ?? auto;

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center py-1.5">
      <div className={`text-sm font-semibold text-right ${winner === "1" ? "text-green-400" : "text-foreground/80"}`}>{val1}</div>
      <div className="text-xs text-muted-foreground text-center w-24 truncate px-1">{label}</div>
      <div className={`text-sm font-semibold text-left ${winner === "2" ? "text-green-400" : "text-foreground/80"}`}>{val2}</div>
    </div>
  );
}

export default function ComparePlayers({ initialP1 }: { initialP1?: string }) {
  const [p1Id, setP1Id] = useState<string | null>(initialP1 ?? null);
  const [p2Id, setP2Id] = useState<string | null>(null);

  const getPlayerTeam = (id: string | null): { player: Player; team: Team } | null => {
    if (!id) return null;
    for (const team of teams) {
      const player = team.players.find((p) => p.id === id);
      if (player) return { player, team };
    }
    return null;
  };

  const pair1 = getPlayerTeam(p1Id);
  const pair2 = getPlayerTeam(p2Id);

  return (
    <div className="space-y-6">
      {/* Pickers */}
      <div className="flex gap-4 items-start">
        <PlayerPicker selectedId={p1Id} onSelect={setP1Id} label="Player 1" />
        <div className="pt-8 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center">
            <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <PlayerPicker selectedId={p2Id} onSelect={setP2Id} label="Player 2" />
      </div>

      {/* Comparison */}
      {pair1 && pair2 ? (
        <div>
          {/* Player headers */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 mb-4">
            <PlayerHeader player={pair1.player} team={pair1.team} />
            <div className="w-24 flex items-center justify-center">
              <div className="w-px h-full bg-border" />
            </div>
            <PlayerHeader player={pair2.player} team={pair2.team} right />
          </div>

          {/* Stats comparison */}
          <div className="bg-card border border-border rounded-2xl p-4 divide-y divide-border/50">
            <div className="pb-2 mb-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center">Batting</div>
            </div>
            <CompareRow label="Runs" val1={pair1.player.batting.runs} val2={pair2.player.batting.runs} />
            <CompareRow label="Average" val1={pair1.player.batting.average} val2={pair2.player.batting.average} />
            <CompareRow label="Strike Rate" val1={pair1.player.batting.strikeRate} val2={pair2.player.batting.strikeRate} />
            <CompareRow label="High Score" val1={pair1.player.batting.highestScore} val2={pair2.player.batting.highestScore} />
            <CompareRow label="50s" val1={pair1.player.batting.fifties} val2={pair2.player.batting.fifties} />
            <CompareRow label="100s" val1={pair1.player.batting.hundreds} val2={pair2.player.batting.hundreds} />

            {(pair1.player.bowling || pair2.player.bowling) && (
              <>
                <div className="py-2">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center">Bowling</div>
                </div>
                <CompareRow label="Wickets" val1={pair1.player.bowling?.wickets ?? "—"} val2={pair2.player.bowling?.wickets ?? "—"} />
                <CompareRow label="Economy" val1={pair1.player.bowling?.economy ?? "—"} val2={pair2.player.bowling?.economy ?? "—"} higher={
                  pair1.player.bowling && pair2.player.bowling
                    ? pair1.player.bowling.economy < pair2.player.bowling.economy ? "1" : "2"
                    : undefined
                } />
                <CompareRow label="Best" val1={pair1.player.bowling?.bestFigures ?? "—"} val2={pair2.player.bowling?.bestFigures ?? "—"} higher="equal" />
              </>
            )}

            <div className="py-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center">Fantasy</div>
            </div>
            <CompareRow label="Fantasy Rating" val1={pair1.player.fantasy.fantasyRating} val2={pair2.player.fantasy.fantasyRating} />
            <CompareRow label="Consistency %" val1={pair1.player.fantasy.consistencyScore} val2={pair2.player.fantasy.consistencyScore} />

            <div className="py-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center">Context</div>
            </div>
            <CompareRow label="Home Avg" val1={pair1.player.homeAvg} val2={pair2.player.homeAvg} />
            <CompareRow label="Away Avg" val1={pair1.player.awayAvg} val2={pair2.player.awayAvg} />
            <CompareRow label="Rating" val1={pair1.player.rating} val2={pair2.player.rating} />
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <ArrowLeftRight className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Select two players above to compare their stats side by side</p>
        </div>
      )}
    </div>
  );
}

function PlayerHeader({ player, team, right }: { player: Player; team: Team; right?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-2 p-3 rounded-xl text-center border ${right ? "" : ""}`}
      style={{ background: `${team.primaryColor}08`, borderColor: `${team.primaryColor}20` }}
    >
      <img
        src={player.image}
        alt={player.name}
        className="w-14 h-14 rounded-xl object-cover object-top ring-2"
        style={{ boxShadow: `0 0 12px ${team.primaryColor}30` }}
        onError={(e) => {
          const el = e.target as HTMLImageElement;
          el.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=${team.primaryColor.replace("#","")}&color=fff&size=128`;
        }}
      />
      <div>
        <div className="text-foreground font-semibold text-sm leading-tight">{player.name}</div>
        <div className="text-muted-foreground text-xs">{team.shortName}</div>
        <div className="flex items-center justify-center gap-0.5 mt-1">
          {[1,2,3,4,5].map((s) => (
            <Star key={s} className={`w-3 h-3 ${s <= Math.round(player.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
