import { clsx } from "clsx";

type Props = {
  className?: string;
  size?: number;
  title?: string;
};

export function LogoMark({ className, size = 32, title = "Aozat" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label={title}
      className={clsx("shrink-0", className)}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      >
        <path d="M60 8 L108 110 L12 110 Z" />
        <path d="M30 86 L90 86" />
        <g opacity="0.55">
          <path d="M18 110 L18 60" />
          <path d="M102 110 L102 60" />
          <path d="M18 96 L26 96" />
          <path d="M18 82 L29 82" />
          <path d="M18 68 L33 68" />
          <path d="M102 96 L94 96" />
          <path d="M102 82 L91 82" />
          <path d="M102 68 L87 68" />
        </g>
      </g>
      <g fill="currentColor">
        <path d="M51 70 c0 -7 4 -12 9 -12 c5 0 9 5 9 12 c0 2 -1 4 -2 5 c2 1 4 4 4 7 c0 5 -4 8 -11 8 c-7 0 -11 -3 -11 -8 c0 -3 2 -6 4 -7 c-1 -1 -2 -3 -2 -5 z" />
        <path d="M44 79 c-1 -3 -2 -6 -2 -8 c0 -2 1 -3 3 -3 c1 0 2 1 2 2 c0 1 -1 2 -1 4 c0 2 0 4 1 6 z" />
        <path d="M76 79 c1 -3 2 -6 2 -8 c0 -2 -1 -3 -3 -3 c-1 0 -2 1 -2 2 c0 1 1 2 1 4 c0 2 0 4 -1 6 z" />
        <path d="M56 64 c0 -1 1 -2 2 -2 c1 0 1 1 1 2 c0 1 -1 2 -1 2 c-1 0 -2 -1 -2 -2 z" />
        <path d="M61 64 c0 -1 1 -2 2 -2 c1 0 1 1 1 2 c0 1 -1 2 -1 2 c-1 0 -2 -1 -2 -2 z" />
      </g>
    </svg>
  );
}
