export function TeamCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center gap-5 animate-pulse">
      <div className="w-24 h-24 rounded-2xl bg-muted skeleton-shimmer" />
      <div className="text-center space-y-2 w-full">
        <div className="h-3 bg-muted rounded-full w-12 mx-auto" />
        <div className="h-4 bg-muted rounded-full w-32 mx-auto" />
        <div className="h-3 bg-muted rounded-full w-20 mx-auto" />
      </div>
      <div className="h-3 bg-muted rounded-full w-24" />
    </div>
  );
}

export function PlayerCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 animate-pulse">
      <div className="flex gap-3">
        <div className="w-16 h-16 rounded-xl bg-muted flex-shrink-0 skeleton-shimmer" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 bg-muted rounded-full w-3/4" />
          <div className="h-5 bg-muted rounded-full w-1/2" />
          <div className="h-3 bg-muted rounded-full w-2/3" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="h-12 bg-muted rounded-lg skeleton-shimmer" />
        <div className="h-12 bg-muted rounded-lg skeleton-shimmer" />
      </div>
      <div className="h-1.5 bg-muted rounded-full mt-3" />
    </div>
  );
}
