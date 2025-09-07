// Lightweight CSV parsing, sheet fetchers, and transformers to match mockData.json shape

// Fill these with your published-to-web CSV URLs for each sheet
// Example (Google Sheets):
// General Variables: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/export?format=csv&gid=GID
// Questions:         https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/export?format=csv&gid=GID
// CarouselData:      https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/export?format=csv&gid=GID
export const SHEET_URLS = {
  general: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0l0b4i4P3TpyPjpamkavJ-lKfUNEnQ1vcaU8WiPcTQM18Z188APN3g-c3iqhaJdRVzUWFU_Voc3Jq/pub?gid=0&single=true&output=csv",
  questions: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0l0b4i4P3TpyPjpamkavJ-lKfUNEnQ1vcaU8WiPcTQM18Z188APN3g-c3iqhaJdRVzUWFU_Voc3Jq/pub?gid=1834096517&single=true&output=csv",
  carousel: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0l0b4i4P3TpyPjpamkavJ-lKfUNEnQ1vcaU8WiPcTQM18Z188APN3g-c3iqhaJdRVzUWFU_Voc3Jq/pub?gid=1993978894&single=true&output=csv",
};

function parseCsv(csvText) {
  const rows = [];
  let current = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const next = csvText[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        current.push(field);
        field = "";
      } else if (char === "\n") {
        current.push(field);
        rows.push(current);
        current = [];
        field = "";
      } else if (char === "\r") {
        // skip CR; handle CRLF by ignoring
      } else {
        field += char;
      }
    }
  }
  if (field.length > 0 || current.length > 0) {
    current.push(field);
    rows.push(current);
  }
  return rows;
}

async function fetchCsv(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${url}`);
  const text = await res.text();
  const rows = parseCsv(text);
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).filter(r => r.length && r.some(cell => cell?.trim()?.length)).map((r) => {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = r[idx] ?? "";
    });
    return obj;
  });
}

function toNumber(value) {
  const n = Number(String(value).trim());
  return Number.isFinite(n) ? n : 0;
}

function transformGeneralVariables(rows) {
  // Expect columns: Key, Value
  const out = {};
  for (const row of rows) {
    const key = (row["Key"] ?? row["key"] ?? "").trim();
    const value = (row["Value"] ?? row["value"] ?? "").trim();
    if (key) out[key] = value;
  }
  return out;
}

function transformQuestions(rows) {
  // Expect columns: Question ID, Question Text, Option 1 Text, Option 1 Score, ... up to 4
  // Group by Question ID preserving order
  const idToQuestion = new Map();
  const order = [];

  for (const row of rows) {
    const qid = (row["Question ID"] ?? row["ID"] ?? row["Id"] ?? "").toString().trim();
    if (!qid) continue;
    if (!idToQuestion.has(qid)) {
      idToQuestion.set(qid, {
        question: (row["Question Text"] ?? row["Question"] ?? "").trim(),
        options: [],
      });
      order.push(qid);
    }
    const q = idToQuestion.get(qid);
    for (let i = 1; i <= 4; i++) {
      const text = row[`Option ${i} Text`];
      const score = row[`Option ${i} Score`];
      if (text && String(text).trim().length) {
        q.options.push({ question: String(text).trim(), score: toNumber(score) });
      }
    }
  }

  return order.map((id) => idToQuestion.get(id));
}

function transformCarousel(rows) {
  // Expect columns: ID, Title, Content, Icon
  return rows.map((row) => ({
    id: toNumber(row["ID"] ?? row["Id"] ?? row["id"] ?? 0),
    title: (row["Title"] ?? row["title"] ?? "").trim(),
    content: (row["Content"] ?? row["content"] ?? "").trim(),
    icon: (row["Icon"] ?? row["icon"] ?? "").trim(),
  }));
}

export async function fetchAppData(urls = SHEET_URLS) {
  if (!urls.general || !urls.questions || !urls.carousel) {
    throw new Error("SHEET_URLS are not set. Please provide public CSV URLs for all sheets.");
  }

  const [generalRows, questionRows, carouselRows] = await Promise.all([
    fetchCsv(urls.general),
    fetchCsv(urls.questions),
    fetchCsv(urls.carousel),
  ]);

  const general = transformGeneralVariables(generalRows);
  const questions = transformQuestions(questionRows);
  const carousel = transformCarousel(carouselRows);

  // Assemble object matching mockData.json shape, with general variables controlling text
  const data = {
    mainAppSubheading: general["mainAppSubheading"] ?? "",
    mainAppTitle: general["mainAppTitle"] ?? "",
    buttonTextHome: general["buttonTextHome"] ?? "",
    FinalPageMiniText: general["FinalPageMiniText"] ?? "",
    carText: general["carText"] ?? "",
    buttonTextNext: general["buttonTextNext"] ?? "",
    buttonTextStart: general["buttonTextStart"] ?? "",
    shareText: general["shareText"] ?? "",
    greatText: general["greatText"] ?? "",
    okText: general["okText"] ?? "",
    badText: general["badText"] ?? "",
    backHomeText: general["backHomeText"] ?? "",
    textBeforeGrade: general["textBeforeGrade"] ?? "",
    phoneNumber: general["phoneNumber"] ?? "",
    questions,
    CarouselData: carousel,
  };

  return data;
}

import { useEffect, useState } from "react";

export function useAppData(fallbackData) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!SHEET_URLS.general || !SHEET_URLS.questions || !SHEET_URLS.carousel) {
          setData(fallbackData ?? null);
          setLoading(false);
          return;
        }
        const loaded = await fetchAppData(SHEET_URLS);
        if (!cancelled) {
          setData(loaded);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e);
          setData(fallbackData ?? null);
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fallbackData]);

  return { data, error, loading };
}


