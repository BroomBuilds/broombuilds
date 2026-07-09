/* The brand: BroomBuilds, second B horizontally mirrored. Two-tone rule:
   "Broom" is white, "Builds" is seam purple. Plain text under the hood —
   screen readers and crawlers read "BroomBuilds". */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      <span className="wm-broom">Broom</span>
      <span className="wm-builds">
        <span className="flip-b">B</span>uilds
      </span>
    </span>
  );
}
