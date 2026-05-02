import { Player, Team } from "@/data/data";
import { Star, Flame, Zap } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  team: Team;
  onClick: () => void;
}

const roleColors: Record<string, string> = {
  Batsman: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Bowler: "text-red-400 bg-red-400/10 border-red-400/20",
  "All-rounder": "text-green-400 bg-green-400/10 border-green-400/20",
  "Wicket-keeper": "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

const injuryColors: Record<string, string> = {
  Fit: "text-green-400",
  Doubtful: "text-yellow-400",
  Out: "text-red-400",
};

export default function PlayerCard({ player, team, onClick }: PlayerCardProps) {
  const recentScores = player.recentForm
    .map((f) => f.score ?? (f.wickets !== null ? f.wickets * 25 : 0))
    .slice(0, 5);
  const recentAvg = recentScores.length ? recentScores.reduce((a, b) => a + b, 0) / recentScores.length : 0;
  const isHot = recentAvg >= 40;

  return (
    <div
      onClick={onClick}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-border/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      {/* Gradient accent */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, ${team.primaryColor}, ${team.secondaryColor})` }}
      />

      <div className="p-4">
        {/* Player image + info */}
        <div className="flex gap-3">
          <div className="relative flex-shrink-0">
            <div
              className="w-16 h-16 rounded-xl overflow-hidden ring-2 transition-all duration-300"
              style={{ ringColor: `${team.primaryColor}40` }}
            >
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=${team.primaryColor.replace("#", "")}&color=fff&size=128`;
                }}
              />
            </div>
            {isHot && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <Flame className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-foreground font-semibold text-sm leading-tight truncate group-hover:text-primary transition-colors">
              {player.name}
            </h3>
            <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border mt-1 ${roleColors[player.role] ?? "text-muted-foreground"}`}>
              {player.role}
            </div>
            <div className="flex items-center gap-1 mt-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3 h-3 ${s <= Math.round(player.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                />
              ))}
              <span className="text-muted-foreground text-xs ml-0.5">{player.rating}</span>
            </div>
          </div>
        </div>

        {/* Key stat */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          {player.role !== "Bowler" ? (
            <>
              <div className="bg-muted/40 rounded-lg p-2 text-center">
                <div className="text-foreground font-bold text-sm">{player.batting.runs}</div>
                <div className="text-muted-foreground text-xs">Runs</div>
              </div>
              <div className="bg-muted/40 rounded-lg p-2 text-center">
                <div className="text-foreground font-bold text-sm">{player.batting.strikeRate}</div>
                <div className="text-muted-foreground text-xs">SR</div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-muted/40 rounded-lg p-2 text-center">
                <div className="text-foreground font-bold text-sm">{player.bowling?.wickets ?? 0}</div>
                <div className="text-muted-foreground text-xs">Wickets</div>
              </div>
              <div className="bg-muted/40 rounded-lg p-2 text-center">
                <div className="text-foreground font-bold text-sm">{player.bowling?.economy ?? "—"}</div>
                <div className="text-muted-foreground text-xs">Economy</div>
              </div>
            </>
          )}
        </div>

        {/* Recent form mini bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Recent Form</span>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-primary" />
              <span className={`text-xs font-medium ${isHot ? "text-orange-400" : "text-muted-foreground"}`}>
                {isHot ? "Hot" : "Avg"}
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            {player.recentForm.map((f, i) => {
              const val = f.score ?? (f.wickets !== null ? f.wickets : 0);
              const isBat = f.score !== null;
              const isGood = isBat ? val >= 30 : val >= 2;
              const isBad = isBat ? val < 10 : val === 0;
              return (
                <div
                  key={i}
                  title={isBat ? `${val} runs` : `${val} wickets`}
                  className={`flex-1 h-1.5 rounded-full transition-all ${
                    isGood ? "bg-green-400" : isBad ? "bg-red-400" : "bg-yellow-400"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Injury status */}
        <div className="mt-3 flex items-center justify-between">
          <span className={`text-xs font-medium ${injuryColors[player.injuryStatus]}`}>
            ● {player.injuryStatus}
          </span>
          <span className="text-xs text-muted-foreground">{player.playingProbability}% likely</span>
        </div>
      </div>
    </div>
  );
}
