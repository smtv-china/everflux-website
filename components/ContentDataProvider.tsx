"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ContentItem, sortByNewest } from "./contentMedia";

type ContentDataState = {
  items: ContentItem[];
  isLoading: boolean;
  refresh: () => Promise<void>;
};

const ContentDataContext = createContext<ContentDataState | null>(null);

export function ContentDataProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async function refresh() {
    setIsLoading(true);

    try {
      const response = await fetch("/api/content", { cache: "no-store" });
      const data = await response.json();
      setItems(sortByNewest(data.items || []));
    } catch {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refresh();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [refresh]);

  const value = useMemo(
    () => ({
      items,
      isLoading,
      refresh,
    }),
    [items, isLoading, refresh],
  );

  return <ContentDataContext.Provider value={value}>{children}</ContentDataContext.Provider>;
}

export function useContentData() {
  const context = useContext(ContentDataContext);

  if (!context) {
    return {
      items: [],
      isLoading: false,
      refresh: async () => undefined,
    };
  }

  return context;
}
