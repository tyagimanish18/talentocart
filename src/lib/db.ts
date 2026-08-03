import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

export type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string;
  created_at: string;
};

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "talentocart.db");

function getDb() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      service TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

export function createLead(input: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}): Lead {
  const db = getDb();
  try {
    const result = db
      .prepare(
        `INSERT INTO leads (name, email, phone, company, service, message)
         VALUES (@name, @email, @phone, @company, @service, @message)`
      )
      .run({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        company: input.company || null,
        service: input.service || null,
        message: input.message,
      });

    const lead = db
      .prepare("SELECT * FROM leads WHERE id = ?")
      .get(result.lastInsertRowid) as Lead;
    return lead;
  } finally {
    db.close();
  }
}

export function listLeads(): Lead[] {
  const db = getDb();
  try {
    return db
      .prepare("SELECT * FROM leads ORDER BY datetime(created_at) DESC")
      .all() as Lead[];
  } finally {
    db.close();
  }
}

export function countLeads(): number {
  const db = getDb();
  try {
    const row = db.prepare("SELECT COUNT(*) as count FROM leads").get() as {
      count: number;
    };
    return row.count;
  } finally {
    db.close();
  }
}
