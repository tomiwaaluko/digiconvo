'use client';

import { useThemeStore } from "~/stores/theme";

export function ThemeDebug() {
  const { theme, effectiveTheme } = useThemeStore();
  
  return (
    <div className="fixed bottom-4 left-4 z-50 p-4 bg-red-500 text-white rounded-lg">
      <div>Theme: {theme}</div>
      <div>Effective: {effectiveTheme}</div>
      <div>HTML class: {typeof document !== 'undefined' ? document.documentElement.className : 'SSR'}</div>
      <div>Body class: {typeof document !== 'undefined' ? document.body.className : 'SSR'}</div>
    </div>
  );
}
