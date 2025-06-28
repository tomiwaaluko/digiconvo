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

    // Apply theme class to document element and body
    const root = document.documentElement;
    const body = document.body;
    
    // Remove existing theme classes completely
    root.classList.remove("light", "dark");
    body.classList.remove("light", "dark");
    
    // Force add the theme class
    root.classList.add(effectiveTheme);
    body.classList.add(effectiveTheme);

    // Set color scheme for better browser integration
    root.style.colorScheme = effectiveTheme;
    
    // Force background colors directly as fallback to match CSS variables
    if (effectiveTheme === 'dark') {
      body.style.backgroundColor = 'rgb(3 7 18)'; // gray-950 - matches CSS variable
      body.style.color = 'rgb(249 250 251)'; // gray-50 - matches CSS variable
      root.style.backgroundColor = 'rgb(3 7 18)';
      root.style.color = 'rgb(249 250 251)';
    } else {
      body.style.backgroundColor = 'rgb(255 255 255)'; // pure white - matches CSS variable
      body.style.color = 'rgb(0 0 0)'; // pure black - matches CSS variable
      root.style.backgroundColor = 'rgb(255 255 255)';
      root.style.color = 'rgb(0 0 0)';
    }
    
    // Force a repaint
    body.style.display = 'none';
    void body.offsetHeight; // Trigger reflow
    body.style.display = '';
    
    console.log("Theme applied:", effectiveTheme, "HTML classes:", root.className, "Body classes:", body.className);
  }, [effectiveTheme, mounted]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return <>{children}</>;
}
