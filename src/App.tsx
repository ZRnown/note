import React, { useEffect, useMemo, useState } from "react";
import EntryCard from "./components/EntryCard";

export type Entry = {
  id: number;
  idNumber: string;
  name: string;
  phone: string;
  other: string;
};

const STORAGE_KEY = "note_entries_v1";
const PAGE_SIZE = 5;
const DEFAULT_PAGES = 20;

function makeDefaultEntries(): Entry[] {
  const total = PAGE_SIZE * DEFAULT_PAGES;
  return Array.from({ length: total }).map((_, i) => ({
    id: i + 1,
    idNumber: "",
    name: "",
    phone: "",
    other: ""
  }));
}

export default function App() {
  const [entries, setEntries] = useState<Entry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Entry[];
    } catch (e) {}
    return makeDefaultEntries();
  });

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.error("save error", e);
    }
  }, [entries]);

  const pageCount = useMemo(() => Math.max(1, Math.ceil(entries.length / PAGE_SIZE)), [entries]);

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [pageCount, page]);

  function updateEntry(updated: Entry) {
    setEntries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  }

  function addEntry() {
    setEntries((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        idNumber: "",
        name: "",
        phone: "",
        other: ""
      }
    ]);
    setPage(Math.ceil((entries.length + 1) / PAGE_SIZE));
  }

  function entriesForPage(): Entry[] {
    const start = (page - 1) * PAGE_SIZE;
    return entries.slice(start, start + PAGE_SIZE);
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>Note - 两列四行表格（每页 5 条）</h1>
        <div className="controls">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))}>上一页</button>
          <span>第 {page} / {pageCount} 页</span>
          <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>下一页</button>
          <button onClick={addEntry}>添加条目</button>
        </div>
      </header>

      <main>
        {entriesForPage().map((entry) => (
          <EntryCard key={entry.id} entry={entry} onChange={updateEntry} />
        ))}
      </main>

      <footer className="footer">
        <div>
          <small>已自动保存为 JSON（localStorage）。总条目：{entries.length}</small>
        </div>
      </footer>
    </div>
  );
}


