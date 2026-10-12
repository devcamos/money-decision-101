const DEFAULT_SUPPORT_URL = "https://buymeacoffee.com/devoamos"

export const supportUrl =
  process.env.NEXT_PUBLIC_SUPPORT_URL?.trim() || DEFAULT_SUPPORT_URL
