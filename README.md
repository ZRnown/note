Note App (Tauri-ready frontend)

Features implemented:
- Two-column, four-row entry card (身份证, 名字, 手机号码, 其它)
- Each field has an inline input and a "复制" button to copy that field
- Pagination: 5 entries per page, default 20 pages (100 entries)
- Add entry button (appends one entry)
- Persistence using localStorage as JSON (key: note_entries_v1)

How to run:
1. npm install
2. npm run dev

Packaging with Tauri:
- This repo contains only the frontend scaffold. To package as native apps:
  1. Install Rust and the Tauri prerequisites, then run `npx tauri init` in the project root.
  2. Adjust the `src-tauri/tauri.conf.json` if needed and run `npx tauri build`.

You can export the JSON by copying the output of localStorage or extending the UI to download the JSON file.


# note
