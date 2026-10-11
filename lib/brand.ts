/**
 * Shared colour tokens for generated visual surfaces (icons, Open Graph cards).
 * Mirrored by CSS variables in app/globals.css for the rendered UI.
 */
export const appBrand = {
  cream: "#fffaf1",
  ink: "#1b1510",
  paper: "#f3ead8",
  copper: "#b85a2a",
  copperDeep: "#8a3d18",
  muted: "#6d6254",
} as const

const DEFAULT_SUPPORT_URL = "https://buymeacoffee.com/devoamos"

/** External support page for the result-screen coffee card. Override with NEXT_PUBLIC_SUPPORT_URL. */
export const supportUrl =
  process.env.NEXT_PUBLIC_SUPPORT_URL?.trim() || DEFAULT_SUPPORT_URL
