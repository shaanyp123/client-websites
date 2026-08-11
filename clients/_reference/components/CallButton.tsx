import { site } from "@/site.config";

/**
 * The one conversion action on every site: a phone call.
 * Number and accessible name come from site.config.ts — never hardcode a
 * number here or anywhere else. There are no forms on any site.
 */
export function CallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={`tel:${site.phone}`}
      aria-label={`Call ${site.businessName} at ${site.phoneDisplay}`}
      className={`inline-block rounded-lg bg-blue-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 ${className}`}
    >
      Call {site.phoneDisplay}
    </a>
  );
}
