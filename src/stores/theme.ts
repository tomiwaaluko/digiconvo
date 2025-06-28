import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  effectiveTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getEffectiveTheme = (theme: Theme): "light" | "dark" => {
  return theme === "system" ? getSystemTheme() : theme;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      effectiveTheme: getEffectiveTheme("system"),

      setTheme: (theme: Theme) => {
        const effectiveTheme = getEffectiveTheme(theme);
        set({ theme, effectiveTheme });

        // Apply theme to document
        if (typeof window !== "undefined") {
          const root = window.document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(effectiveTheme);
        }
      },

      toggleTheme: () => {
        const { theme } = get();
        const newTheme: Theme =
          theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
        get().setTheme(newTheme);
      },
    }),
    {
      name: "digiconvo-theme",
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Initialize theme on page load
          const effectiveTheme = getEffectiveTheme(state.theme);
          state.effectiveTheme = effectiveTheme;

          if (typeof window !== "undefined") {
            const root = window.document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(effectiveTheme);
          }
        }
      },
    },
  ),
);

// Listen for system theme changes
if (typeof window !== "undefined") {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const store = useThemeStore.getState();
      if (store.theme === "system") {
        store.setTheme("system");
      }
    });
}
