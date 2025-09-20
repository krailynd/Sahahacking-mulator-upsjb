"use client";

import { openDB, type IDBPDatabase } from "idb";
import { useEffect, useState } from "react";

export interface NoteEntry {
  id: number;
  title: string;
  markdown: string;
  math: string;
  createdAt: number;
}

const DB_NAME = "interstellar-physics";
const STORE_NOTES = "notes";

let dbPromise: Promise<IDBPDatabase> | null = null;

async function getDatabase() {
  if (typeof indexedDB === "undefined") {
    throw new Error("IndexedDB no disponible");
  }
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(database) {
        if (!database.objectStoreNames.contains(STORE_NOTES)) {
          database.createObjectStore(STORE_NOTES, { keyPath: "id" });
        }
      }
    });
  }
  return dbPromise;
}

async function fallbackSave(entry: NoteEntry) {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORE_NOTES);
  const notes: NoteEntry[] = raw ? JSON.parse(raw) : [];
  notes.unshift(entry);
  window.localStorage.setItem(STORE_NOTES, JSON.stringify(notes.slice(0, 50)));
  return entry;
}

export async function saveNoteEntry(entry: Omit<NoteEntry, "id">) {
  const newEntry: NoteEntry = { ...entry, id: Date.now() };
  try {
    const db = await getDatabase();
    await db.put(STORE_NOTES, newEntry);
    return newEntry;
  } catch (error) {
    console.warn("IndexedDB no disponible, usando localStorage", error);
    return fallbackSave(newEntry);
  }
}

export function useNotebookEntries(limit = 50) {
  const [entries, setEntries] = useState<NoteEntry[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const db = await getDatabase();
        const tx = db.transaction(STORE_NOTES, "readonly");
        const store = tx.store;
        const values = await store.getAll();
        if (active) {
          const sorted = values.sort((a, b) => b.id - a.id).slice(0, limit);
          setEntries(sorted as NoteEntry[]);
        }
      } catch (error) {
        console.warn("IndexedDB no disponible, leyendo localStorage", error);
        if (typeof window !== "undefined") {
          const raw = window.localStorage.getItem(STORE_NOTES);
          const notes: NoteEntry[] = raw ? JSON.parse(raw) : [];
          if (active) {
            setEntries(notes.slice(0, limit));
          }
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [limit]);

  return entries;
}
