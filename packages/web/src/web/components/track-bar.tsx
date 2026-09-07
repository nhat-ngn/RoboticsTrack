interface TrackBarProps {
  value: number; // 0-100
  color: string;
  height?: number;
}

export function TrackBar({ value, color, height = 4 }: TrackBarProps) {
  return (
    <div
      className="w-full overflow-hidden rounded-full bg-line"
      style={{ height }}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: color,
          transition: "width 400ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}
