/** Where signing in lives, and where people land once they have. */
export const AuthRoutes = {
  signIn: "/sign-in",
  account: "/account",
} as const;

const FONT = "var(--font-body), Rajdhani, ui-sans-serif, system-ui, sans-serif";

/**
 * Clerk's sign-in UI in Fraxal's colours. Clerk renders its own markup and
 * cannot see Tailwind classes, so these mirror the tokens in globals.css —
 * change a colour there, change it here.
 */
export const ClerkAppearance = {
  variables: {
    colorPrimary: "#e8294a",
    colorPrimaryForeground: "#ffffff",
    colorBackground: "#0b0b14",
    colorForeground: "#eae8f2",
    colorMutedForeground: "#7d7796",
    colorMuted: "#11111c",
    colorInput: "#11111c",
    colorInputForeground: "#eae8f2",
    colorNeutral: "#eae8f2",
    colorBorder: "rgba(232, 41, 74, 0.32)",
    colorDanger: "#ff5a5a",
    colorSuccess: "#35d07f",
    fontFamily: FONT,
    fontFamilyButtons: FONT,
    borderRadius: "2px",
  },
};
