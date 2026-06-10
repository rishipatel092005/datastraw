const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { db, generateTicketId } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============ API ENDPOINTS ============

/**
 * POST /api/tickets
 * Create a new ticket
 */
app.post('/api/tickets', (req, res) => {
  const { customer_name, customer_email, subject, description } = req.body;

  // Validation
  if (!customer_name || !customer_email || !subject || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  generateTicketId((ticket_id) => {
    const query = `
      INSERT INTO tickets (ticket_id, customer_name, customer_email, subject, description)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(query, [ticket_id, customer_name, customer_email, subject, description], function(err) {
      if (err) {
        console.error('Error creating ticket:', err);
        return res.status(500).json({ error: 'Failed to create ticket' });
      }

      res.json({
        ticket_id,
        created_at: new Date().toISOString()
      });
    });
  });
});

/**
 * GET /api/tickets
 * List all tickets with optional search and filter
 */
app.get('/api/tickets', (req, res) => {
  const { search, status } = req.query;

  let query = 'SELECT ticket_id, customer_name, subject, status, created_at FROM tickets WHERE 1=1';
  let params = [];

  // Filter by status
  if (status && status !== 'All') {
    query += ' AND status = ?';
    params.push(status);
  }

  // Search across multiple fields
  if (search) {
    query += ` AND (
      customer_name LIKE ? OR
      customer_email LIKE ? OR
      ticket_id LIKE ? OR
      subject LIKE ? OR
      description LIKE ?
    )`;
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching tickets:', err);
      return res.status(500).json({ error: 'Failed to fetch tickets' });
    }

    res.json(rows || []);
  });
});

/**
 * GET /api/tickets/:ticket_id
 * Get single ticket with notes
 */
app.get('/api/tickets/:ticket_id', (req, res) => {
  const { ticket_id } = req.params;

  // Get ticket details
  db.get(
    'SELECT * FROM tickets WHERE ticket_id = ?',
    [ticket_id],
    (err, ticket) => {
      if (err) {
        console.error('Error fetching ticket:', err);
        return res.status(500).json({ error: 'Failed to fetch ticket' });
      }

      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }

      // Get notes for this ticket
      db.all(
        'SELECT id, note_text, created_at FROM notes WHERE ticket_id = ? ORDER BY created_at DESC',
        [ticket_id],
        (err, notes) => {
          if (err) {
            console.error('Error fetching notes:', err);
            return res.status(500).json({ error: 'Failed to fetch notes' });
          }

          res.json({
            ...ticket,
            notes: notes || []
          });
        }
      );
    }
  );
});

/**
 * PUT /api/tickets/:ticket_id
 * Update ticket status and add notes
 */
app.put('/api/tickets/:ticket_id', (req, res) => {
  const { ticket_id } = req.params;
  const { status, note_text } = req.body;

  // Update ticket status
  if (status) {
    db.run(
      'UPDATE tickets SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE ticket_id = ?',
      [status, ticket_id],
      (err) => {
        if (err) {
          console.error('Error updating ticket status:', err);
          return res.status(500).json({ error: 'Failed to update ticket' });
        }
      }
    );
  }

  // Add note if provided
  if (note_text) {
    db.run(
      'INSERT INTO notes (ticket_id, note_text) VALUES (?, ?)',
      [ticket_id, note_text],
      (err) => {
        if (err) {
          console.error('Error adding note:', err);
          return res.status(500).json({ error: 'Failed to add note' });
        }
      }
    );
  }

  res.json({ success: true, updated_at: new Date().toISOString() });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

module.exports = app;
