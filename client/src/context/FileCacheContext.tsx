import { createContext, useContext, useEffect, useState } from "react";

export type TextFile = {
  date: string;
  content: string;
};

type FilesContextValue = {
  files: TextFile[];
  setFiles: React.Dispatch<React.SetStateAction<TextFile[]>>;
};

export const FilesContext = createContext<FilesContextValue | null>(null);

export function FilesProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<TextFile[]>(() => {
    const cache = localStorage.getItem("files");
    return cache ? JSON.parse(cache) : [];
  });

  useEffect(() => {
    console.log('updating storage')
    localStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  const value: FilesContextValue = { files, setFiles };

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
}

export function useFiles() {
  const ctx = useContext(FilesContext);

  if (!ctx) {
    throw new Error("useFiles must be used within a FilesProvider");
  }

  return ctx;
}
