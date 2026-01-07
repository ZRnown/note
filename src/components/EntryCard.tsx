import React from "react";
import { Entry } from "../App";

type Props = {
  entry: Entry;
  onChange: (entry: Entry) => void;
};

function Row({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value ?? "");
      // small feedback
      const el = document.createElement("div");
      el.className = "copy-toast";
      el.textContent = "已复制";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 800);
    } catch (e) {
      console.error("copy failed", e);
    }
  };

  return (
    <div className="row">
      <div className="label">{label}</div>
      <div className="input-wrap">
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
      <div className="copy">
        <button className="copy-btn" onClick={handleCopy}>复制</button>
      </div>
    </div>
  );
}

export default function EntryCard({ entry, onChange }: Props) {
  return (
    <div className="entry-card">
      <Row
        label="身份证"
        value={entry.idNumber}
        onChange={(v) => onChange({ ...entry, idNumber: v })}
      />
      <Row label="名字" value={entry.name} onChange={(v) => onChange({ ...entry, name: v })} />
      <Row
        label="手机号码"
        value={entry.phone}
        onChange={(v) => onChange({ ...entry, phone: v })}
      />
      <Row label="其它" value={entry.other} onChange={(v) => onChange({ ...entry, other: v })} />
    </div>
  );
}


