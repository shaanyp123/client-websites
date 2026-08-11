import { site } from "@/site.config";

/**
 * The one conversion action on this site: a phone call.
 * Number and accessible name come from site.config.ts — never hardcode a
 * number here or anywhere else. There are no forms on this site.
 */
export function CallButton({
  label,
  variant = "primary",
  className = "",
}: {
  label?: string;
  variant?: "primary" | "onDark";
  className?: string;
}) {
  const styles =
    variant === "onDark"
      ? "bg-white text-brand-navy hover:bg-brand-sky"
      : "bg-brand-blue text-white hover:bg-brand-blue-dark";
  return (
    <a
      href={`tel:${site.phone}`}
      aria-label={`Call ${site.businessName} at ${site.phoneDisplay}`}
      className={`inline-block rounded-md px-6 py-3 font-bold transition-colors ${styles} ${className}`}
    >
      {label ?? `Call ${site.phoneDisplay}`}
    </a>
  );
}
