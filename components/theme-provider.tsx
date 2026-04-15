"use client";

import * as React from "react";

type Theme = "light" | "dark";

type ThemeProviderContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeProviderContext = React.createContext<
  ThemeProviderContextValue | undefined
>(undefined);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>("dark");

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const setTheme = React.useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setThemeState((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }, []);

  const value = React.useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [setTheme, theme, toggleTheme],
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
