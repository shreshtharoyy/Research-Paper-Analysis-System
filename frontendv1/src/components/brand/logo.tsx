import { cn } from "@/lib/utils";

/** The Papermind mark: a folded page whose lines resolve into a spark of insight. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <path
        d="M7 4.5h11.5L25 11v13.5A3 3 0 0 1 22 27.5H10A3 3 0 0 1 7 24.5V4.5Z"
        className="fill-primary/12 stroke-primary"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M18 4.5V11h6.5"
        className="stroke-primary"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M11 15h7M11 19h5"
        className="stroke-primary/55"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20.5 17.2l1.05 2.55 2.55 1.05-2.55 1.05-1.05 2.55-1.05-2.55-2.55-1.05 2.55-1.05 1.05-2.55Z"
        className="fill-highlight stroke-highlight"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {withWordmark && (
        <span className="font-serif text-xl font-semibold tracking-tight">
          Papermind
        </span>
      )}
    </span>
  );
}
