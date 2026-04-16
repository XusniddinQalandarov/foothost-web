/**
 * FACEIT-style level ring: ~300° arc, level 1–10 fills the arc proportionally.
 * Matches mobile app geometry (see foothost-react-native HomeScreen RatingBadge).
 */
const GREEN = "#45AF31";

function arcPath(
  cx: number,
  cy: number,
  radius: number,
  fromDeg: number,
  sweep: number,
): string {
  if (sweep <= 0) return "";
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const pt = (angle: number) => ({
    x: cx + radius * Math.cos(toRad(angle)),
    y: cy + radius * Math.sin(toRad(angle)),
  });
  const s = pt(fromDeg);
  const e = pt(fromDeg + sweep);
  const large = sweep > 180 ? 1 : 0;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

type Props = {
  /** Skill level 1–10 */
  level: number;
  /** Outer diameter in px */
  size?: number;
  className?: string;
};

export function FaceitRatingBadge({ level, size = 48, className = "" }: Props) {
  const clamped = Math.min(Math.max(Math.round(level), 1), 10);
  const progress = clamped / 10;
  const startAngle = 120;
  const totalSweep = 300;
  const filledSweep = totalSweep * progress;

  const scale = size / 48;
  const greenStroke = 5 * scale;
  const whiteStroke = greenStroke + 3 * scale;
  const trackStroke = whiteStroke;
  const inset = 1.5 * scale;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - whiteStroke / 2 - inset;

  const trackPath = arcPath(cx, cy, radius, startAngle, totalSweep);
  const fillPath = arcPath(cx, cy, radius, startAngle, filledSweep);

  const displaySize = Math.max(14, Math.min(22, Math.round(18 * scale)));

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] ${className}`}
      style={{ width: size, height: size }}
      aria-label={`Уровень ${clamped} из 10`}
    >
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        aria-hidden
      >
        <path
          d={trackPath}
          stroke="rgba(0,0,0,0.09)"
          strokeWidth={trackStroke}
          fill="none"
          strokeLinecap="round"
        />
        {filledSweep > 0 && (
          <>
            <path
              d={fillPath}
              stroke="#FFFFFF"
              strokeWidth={whiteStroke}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={fillPath}
              stroke={GREEN}
              strokeWidth={greenStroke}
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
      <span
        className="relative z-[1] font-bold tabular-nums text-primary"
        style={{ fontSize: displaySize, letterSpacing: "-0.04em", lineHeight: 1 }}
      >
        {clamped}
      </span>
    </div>
  );
}
