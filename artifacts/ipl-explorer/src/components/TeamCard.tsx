import { Team } from "@/data/data";
import { Users } from "lucide-react";
import { Link } from "wouter";

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <Link href={`/team/${team.id}`}>
      <div
        className="group relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-border/80 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
        style={{ "--team-primary": team.primaryColor, "--team-secondary": team.secondaryColor } as React.CSSProperties}
      >
        {/* Gradient accent bar */}
        <div
          className="absolute inset-x-0 top-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(90deg, ${team.primaryColor}, ${team.secondaryColor})` }}
        />

        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-8 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${team.primaryColor}40, transparent 70%)` }}
        />

        <div className="p-6 flex flex-col items-center gap-5 relative z-10">
          {/* Logo container */}
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `linear-gradient(135deg, ${team.primaryColor}18, ${team.secondaryColor}18)`, border: `1px solid ${team.primaryColor}30` }}
          >
            <img
              src={team.logo}
              alt={team.name}
              className="w-full h-full object-contain drop-shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Team info */}
          <div className="text-center">
            <div
              className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 tracking-widest uppercase"
              style={{ background: `${team.primaryColor}20`, color: team.primaryColor }}
            >
              {team.shortName}
            </div>
            <h2 className="text-foreground font-bold text-lg leading-tight">{team.name}</h2>
            <p className="text-muted-foreground text-sm mt-0.5">{team.city}</p>
          </div>

          {/* Players count */}
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Users className="w-3.5 h-3.5" />
            <span>{team.players.length} Players</span>
          </div>

          {/* CTA */}
          <div
            className="w-full text-center text-sm font-semibold py-2 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 -mt-2"
            style={{ background: `linear-gradient(135deg, ${team.primaryColor}25, ${team.secondaryColor}25)`, color: team.primaryColor }}
          >
            View Squad →
          </div>
        </div>
      </div>
    </Link>
  );
}
