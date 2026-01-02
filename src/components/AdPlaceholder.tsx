interface AdPlaceholderProps {
  size?: "banner" | "rectangle" | "leaderboard";
  className?: string;
}

export function AdPlaceholder({ size = "banner", className = "" }: AdPlaceholderProps) {
  const sizeClasses = {
    banner: "h-[90px]",
    rectangle: "h-[250px]",
    leaderboard: "h-[90px] md:h-[90px]",
  };

  return (
    <div className={`ad-placeholder ${sizeClasses[size]} ${className}`}>
      {/* AdSense Placeholder */}
      <span>Ad Space</span>
    </div>
  );
}
