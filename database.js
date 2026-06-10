const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'crm.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Create TICKETS table
  db.run(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id TEXT UNIQUE NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      subject TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT DEFAULT 'Open',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating tickets table:', err);
    else console.log('Tickets table initialized');
  });

  // Create NOTES table
  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id TEXT NOT NULL,
      note_text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(ticket_id) REFERENCES tickets(ticket_id)
    )
  `, (err) => {
    if (err) console.error('Error creating notes table:', err);
    else console.log('Notes table initialized');
  });
}

// Helper function to generate ticket ID
function generateTicketId(callback) {
  db.get(`SELECT MAX(CAST(SUBSTR(ticket_id, 5) AS INTEGER)) as maxId FROM tickets`, [], (err, row) => {
    if (err) {
      callback('TKT-001');
    } else {
      const nextId = (row?.maxId || 0) + 1;
      callback(`TKT-${String(nextId).padStart(3, '0')}`);
    }
  });
}

module.exports = {
  db,
  generateTicketId
};
