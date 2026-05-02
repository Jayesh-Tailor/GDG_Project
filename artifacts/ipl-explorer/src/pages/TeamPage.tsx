import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "wouter";
import { getTeamById, Player } from "@/data/data";
import PlayerCard from "@/components/PlayerCard";
import PlayerDetailModal from "@/components/PlayerDetailModal";
import { PlayerCardSkeleton } from "@/components/SkeletonCard";
import { ArrowLeft, Search, SlidersHorizontal, Users } from "lucide-react";

const ROLES = ["All", "Batsman", "Bowler", "All-rounder", "Wicket-keeper"] as const;
type RoleFilter = (typeof ROLES)[number];

export default function TeamPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const team = getTeamById(teamId);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("All");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [teamId]);

  const filtered = useMemo(() => {
    if (!team) return [];
    return team.players.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "All" || p.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [team, search, roleFilter]);

  if (!team) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-muted-foreground text-lg mb-4">Team not found.</div>
        <Link href="/">
          <button className="inline-flex items-center gap-2 text-primary hover:underline text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to teams
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <Link href="/">
        <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Teams
        </button>
      </Link>

      {/* Team header */}
      <div
        className="relative rounded-2xl overflow-hidden mb-8 p-6 sm:p-8 border"
        style={{
          background: `linear-gradient(135deg, ${team.primaryColor}18, ${team.secondaryColor}10, transparent)`,
          borderColor: `${team.primaryColor}25`,
        }}
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(${team.primaryColor} 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
        />
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center p-3 flex-shrink-0"
            style={{ background: `${team.primaryColor}18`, border: `1px solid ${team.primaryColor}30` }}
          >
            <img
              src={team.logo}
              alt={team.name}
              className="w-full h-full object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <div className="text-center sm:text-left">
            <div
              className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 tracking-widest uppercase"
              style={{ background: `${team.primaryColor}20`, color: team.primaryColor }}
            >
              {team.shortName}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{team.name}</h1>
            <p className="text-muted-foreground mt-1">{team.city}</p>
            <div className="flex items-center gap-1.5 mt-2 justify-center sm:justify-start text-sm text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span>{team.players.length} players in squad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search players…"
            className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary transition"
          />
        </div>

        {/* Role filter */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1">
          <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground ml-2 flex-shrink-0" />
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                roleFilter === role
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filtered.length} player{filtered.length !== 1 ? "s" : ""}
            {search && ` matching "${search}"`}
            {roleFilter !== "All" && ` · ${roleFilter}`}
          </p>
        </div>
      )}

      {/* Players grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: team.players.length }).map((_, i) => <PlayerCardSkeleton key={i} />)
          : filtered.length > 0
          ? filtered.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                team={team}
                onClick={() => setSelectedPlayer(player)}
              />
            ))
          : (
            <div className="col-span-full text-center py-16 text-muted-foreground">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No players match your filters.</p>
            </div>
          )}
      </div>

      {/* Player detail modal */}
      {selectedPlayer && (
        <PlayerDetailModal
          player={selectedPlayer}
          team={team}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}
