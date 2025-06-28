"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "../../../stores/theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, effectiveTheme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme on mount
    setTheme(theme);
  }, [theme, setTheme]);

  useEffect(() => {
    if (!mounted) return;

    // Apply theme class to document element
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(effectiveTheme);

    // Set color scheme for better browser integration
    root.style.colorScheme = effectiveTheme;
  }, [effectiveTheme, mounted]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return <>{children}</>;
}
