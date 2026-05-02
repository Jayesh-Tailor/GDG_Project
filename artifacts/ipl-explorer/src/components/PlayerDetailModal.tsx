import { useEffect, useState } from "react";
import { Player, Team } from "@/data/data";
import {
  X, Star, Flame, Snowflake, Trophy, Zap, Target, Shield, TrendingUp,
  Activity, BarChart2, ChevronRight, Clock, MapPin, GitCompare
} from "lucide-react";
import { Link } from "wouter";

interface PlayerDetailModalProps {
  player: Player;
  team: Team;
  onClose: () => void;
}

type Tab = "stats" | "form" | "insights" | "highlights";

export default function PlayerDetailModal({ player, team, onClose }: PlayerDetailModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("stats");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "stats", label: "Stats", icon: <BarChart2 className="w-3.5 h-3.5" /> },
    { key: "form", label: "Form", icon: <Activity className="w-3.5 h-3.5" /> },
    { key: "insights", label: "Insights", icon: <Zap className="w-3.5 h-3.5" /> },
    { key: "highlights", label: "Highlights", icon: <Trophy className="w-3.5 h-3.5" /> },
  ];

  const roleColors: Record<string, string> = {
    Batsman: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Bowler: "text-red-400 bg-red-400/10 border-red-400/20",
    "All-rounder": "text-green-400 bg-green-400/10 border-green-400/20",
    "Wicket-keeper": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  };

  const injuryColors: Record<string, string> = {
    Fit: "text-green-400 bg-green-400/10",
    Doubtful: "text-yellow-400 bg-yellow-400/10",
    Out: "text-red-400 bg-red-400/10",
  };

  const maxFormVal = Math.max(...player.recentForm.map((f) => Math.max(f.score ?? 0, (f.wickets ?? 0) * 25)), 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-250 ${visible ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[90vh] bg-card border border-border rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col transition-all duration-250 ${
          visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
        }`}
      >
        {/* Header with gradient */}
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${team.primaryColor}22, ${team.secondaryColor}11, transparent)` }}
        >
          {/* BG pattern */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: `radial-gradient(${team.primaryColor} 1px, transparent 1px)`, backgroundSize: "24px 24px" }}
          />

          <div className="relative p-5 pb-4">
            <div className="flex items-start gap-4">
              {/* Player image */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-2"
                  style={{ boxShadow: `0 0 24px ${team.primaryColor}40`, ringColor: `${team.primaryColor}60` }}
                >
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=${team.primaryColor.replace("#", "")}&color=fff&size=256`;
                    }}
                  />
                </div>
                {/* Rating badge */}
                <div
                  className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white flex items-center gap-0.5"
                  style={{ background: `linear-gradient(135deg, ${team.primaryColor}, ${team.secondaryColor})` }}
                >
                  <Star className="w-2.5 h-2.5 fill-white" />
                  {player.rating}
                </div>
              </div>

              {/* Player info */}
              <div className="flex-1 min-w-0 pt-1">
                <h2 className="text-foreground font-bold text-xl leading-tight">{player.name}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${roleColors[player.role] ?? ""}`}>
                    {player.role}
                  </span>
                  <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${injuryColors[player.injuryStatus]}`}>
                    ● {player.injuryStatus}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Age {player.age}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {team.city}</span>
                  <span className="text-xs">{player.playingProbability}% playing chance</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground space-y-0.5">
                  <div>Batting: <span className="text-foreground/80">{player.battingStyle}</span></div>
                  {player.bowlingStyle && <div>Bowling: <span className="text-foreground/80">{player.bowlingStyle}</span></div>}
                </div>
              </div>

              {/* Close + Compare */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <Link href={`/compare?p1=${player.id}`}>
                  <button
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    title="Compare this player"
                    onClick={handleClose}
                  >
                    <GitCompare className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Fantasy metrics */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-black/20 rounded-xl p-2.5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-foreground font-bold text-sm">{player.fantasy.fantasyRating}/10</div>
                  <div className="text-muted-foreground text-xs">Fantasy Rating</div>
                </div>
              </div>
              <div className="bg-black/20 rounded-xl p-2.5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-foreground font-bold text-sm">{player.fantasy.consistencyScore}%</div>
                  <div className="text-muted-foreground text-xs">Consistency</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex px-4 pb-0 gap-1 border-t border-border/40">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-all -mb-px ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === "stats" && (
            <StatsTab player={player} team={team} />
          )}
          {activeTab === "form" && (
            <FormTab player={player} maxFormVal={maxFormVal} />
          )}
          {activeTab === "insights" && (
            <InsightsTab player={player} team={team} />
          )}
          {activeTab === "highlights" && (
            <HighlightsTab player={player} team={team} />
          )}
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-semibold">{value}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

function StatsTab({ player, team }: { player: Player; team: Team }) {
  return (
    <div className="space-y-4">
      {/* Batting stats */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5" /> Batting
        </h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Runs", value: player.batting.runs },
            { label: "Average", value: player.batting.average },
            { label: "Strike Rate", value: player.batting.strikeRate },
            { label: "High Score", value: player.batting.highestScore },
            { label: "50s", value: player.batting.fifties },
            { label: "100s", value: player.batting.hundreds },
          ].map((stat) => (
            <div key={stat.label} className="bg-muted/40 rounded-xl p-2.5 text-center">
              <div className="text-foreground font-bold text-base">{stat.value}</div>
              <div className="text-muted-foreground text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="space-y-2.5">
          <StatBar label="Strike Rate" value={player.batting.strikeRate} max={200} color={team.primaryColor} />
          <StatBar label="Average" value={player.batting.average} max={60} color={team.secondaryColor} />
        </div>
      </div>

      {/* Bowling stats */}
      {player.bowling && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
            <Target className="w-3.5 h-3.5" /> Bowling
          </h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "Wickets", value: player.bowling.wickets },
              { label: "Economy", value: player.bowling.economy },
              { label: "Average", value: player.bowling.average },
              { label: "Best", value: player.bowling.bestFigures },
              { label: "Matches", value: player.bowling.matches },
              { label: "Dot %", value: player.impact.dotBallPercent ? `${player.impact.dotBallPercent}%` : "—" },
            ].map((stat) => (
              <div key={stat.label} className="bg-muted/40 rounded-xl p-2.5 text-center">
                <div className="text-foreground font-bold text-base">{stat.value}</div>
                <div className="text-muted-foreground text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2.5">
            <StatBar label="Economy" value={player.bowling.economy} max={12} color={team.primaryColor} />
          </div>
        </div>
      )}

      {/* Impact Metrics */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5" /> Impact Metrics
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {player.impact.deathOversStrikeRate && (
            <div className="bg-muted/40 rounded-xl p-3">
              <div className="text-foreground font-bold">{player.impact.deathOversStrikeRate}</div>
              <div className="text-muted-foreground text-xs">Death SR</div>
            </div>
          )}
          {player.impact.dotBallPercent && (
            <div className="bg-muted/40 rounded-xl p-3">
              <div className="text-foreground font-bold">{player.impact.dotBallPercent}%</div>
              <div className="text-muted-foreground text-xs">Dot Ball %</div>
            </div>
          )}
          {player.impact.boundaryPercent && (
            <div className="bg-muted/40 rounded-xl p-3">
              <div className="text-foreground font-bold">{player.impact.boundaryPercent}%</div>
              <div className="text-muted-foreground text-xs">Boundary %</div>
            </div>
          )}
        </div>
      </div>

      {/* Home vs Away */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" /> Home vs Away
        </h3>
        <div className="space-y-2.5">
          <StatBar label="Home Avg" value={player.homeAvg} max={60} color="#22c55e" />
          <StatBar label="Away Avg" value={player.awayAvg} max={60} color="#f97316" />
        </div>
      </div>

      {/* Matchup stats */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
          <ChevronRight className="w-3.5 h-3.5" /> vs Top Teams
        </h3>
        <div className="space-y-2">
          {player.matchups.map((m) => (
            <div key={m.team} className="flex items-center justify-between bg-muted/30 rounded-xl px-3 py-2">
              <span className="text-sm text-muted-foreground">vs {m.team}</span>
              <div className="flex gap-4 text-sm font-semibold">
                {m.runs !== undefined && <span className="text-foreground">{m.runs} runs</span>}
                {m.wickets !== undefined && <span className="text-foreground">{m.wickets} wkts</span>}
                {m.average !== undefined && <span className="text-muted-foreground">avg {m.average}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FormTab({ player, maxFormVal }: { player: Player; maxFormVal: number }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
        <Activity className="w-3.5 h-3.5" /> Last 5 Matches
      </h3>
      <div className="space-y-3">
        {player.recentForm.map((f, i) => {
          const isBat = f.score !== null;
          const val = isBat ? (f.score ?? 0) : (f.wickets ?? 0);
          const isGood = isBat ? val >= 30 : val >= 2;
          const isBad = isBat ? val < 10 : val === 0;
          const barPct = isBat
            ? Math.min((val / Math.max(maxFormVal, 100)) * 100, 100)
            : Math.min((val / 5) * 100, 100);

          return (
            <div key={i} className="bg-muted/30 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isGood ? (
                    <Flame className="w-4 h-4 text-orange-400" />
                  ) : isBad ? (
                    <Snowflake className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Activity className="w-4 h-4 text-yellow-400" />
                  )}
                  <span className="text-sm text-muted-foreground">{f.match}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {f.score !== null && (
                    <span className={`font-bold text-sm ${isGood ? "text-green-400" : isBad ? "text-red-400" : "text-yellow-400"}`}>
                      {f.score} <span className="font-normal text-xs text-muted-foreground">runs</span>
                    </span>
                  )}
                  {f.wickets !== null && (
                    <span className={`font-bold text-sm ${isGood ? "text-green-400" : isBad ? "text-red-400" : "text-yellow-400"}`}>
                      {f.wickets} <span className="font-normal text-xs text-muted-foreground">wkts</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isGood ? "bg-green-400" : isBad ? "bg-red-400" : "bg-yellow-400"
                  }`}
                  style={{ width: `${barPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InsightsTab({ player, team }: { player: Player; team: Team }) {
  return (
    <div className="space-y-4">
      {/* Role tag */}
      <div
        className="rounded-xl p-4 border"
        style={{ background: `${team.primaryColor}10`, borderColor: `${team.primaryColor}30` }}
      >
        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Role</div>
        <div className="text-foreground font-bold text-lg" style={{ color: team.primaryColor }}>
          {player.insights.roleTag}
        </div>
      </div>

      {/* Strengths */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-green-400" /> Strengths
        </h3>
        <div className="space-y-2">
          {player.insights.strengths.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-green-400/5 border border-green-400/15 rounded-xl px-3 py-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              <span className="text-sm text-foreground/90">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weaknesses */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-red-400" /> Weaknesses
        </h3>
        <div className="space-y-2">
          {player.insights.weaknesses.map((w, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-red-400/5 border border-red-400/15 rounded-xl px-3 py-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
              <span className="text-sm text-foreground/90">{w}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HighlightsTab({ player, team }: { player: Player; team: Team }) {
  return (
    <div className="space-y-4">
      <div
        className="rounded-xl p-4 space-y-3 border"
        style={{ background: `linear-gradient(135deg, ${team.primaryColor}10, ${team.secondaryColor}08)`, borderColor: `${team.primaryColor}20` }}
      >
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Best Season</div>
          <div className="text-foreground font-semibold">{player.highlights.bestSeason}</div>
        </div>
        <div className="h-px bg-border/50" />
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Career High</div>
          <div className="text-foreground font-semibold">{player.highlights.careerHigh}</div>
        </div>
      </div>

      {/* Awards */}
      {player.highlights.awards.length > 0 ? (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-primary" /> Awards
          </h3>
          <div className="space-y-2">
            {player.highlights.awards.map((award, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-primary/5 border border-primary/20 rounded-xl px-3 py-2.5">
                <Trophy className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground/90">{award}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground text-sm text-center py-4">No individual awards yet</div>
      )}
    </div>
  );
}
