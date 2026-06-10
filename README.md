# 🎫 Datastraw CRM - Customer Support Ticketing System

A full-stack web application for managing customer support tickets. Built with **Node.js**, **Express**, **React**, and **SQLite**.

## ✨ Features

- ✅ **Create Tickets** - Add customer issues with auto-generated ticket IDs
- ✅ **List All Tickets** - View all tickets in an organized table
- ✅ **Search Functionality** - Real-time search across names, IDs, emails, and descriptions
- ✅ **Filter by Status** - Filter tickets by Open, In Progress, or Closed
- ✅ **View & Update** - Detailed ticket view with status updates and notes

## 🏗️ Architecture

```
FRONTEND (React)
    ↓ (HTTP Requests via Axios)
BACKEND (Express API)
    ↓ (SQL Queries)
DATABASE (SQLite)
```

## 📋 Database Schema

### Tickets Table
```sql
id (PRIMARY KEY)
ticket_id (UNIQUE) - Auto-generated format: TKT-001, TKT-002, etc.
customer_name
customer_email
subject
description
status - Open | In Progress | Closed
created_at
updated_at
```

### Notes Table
```sql
id (PRIMARY KEY)
ticket_id (FOREIGN KEY)
note_text
created_at
```

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/tickets` | Create a new ticket |
| `GET` | `/api/tickets` | List tickets (with search & filter) |
| `GET` | `/api/tickets/:ticket_id` | Get ticket details with notes |
| `PUT` | `/api/tickets/:ticket_id` | Update ticket status and add notes |

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm

### Installation

```bash
# 1. Clone or extract the project
cd datastraw-crm

# 2. Install backend dependencies
npm install

# 3. Install frontend dependencies
cd frontend
npm install
cd ..
```

### Running Locally

**Terminal 1 - Backend:**
```bash
npm start
# Server runs at http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
REACT_APP_API_URL=http://localhost:5000/api npm start
# App opens at http://localhost:3000
```

## 📝 Example Usage

### Create a Ticket
```javascript
POST /api/tickets
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Login issue",
  "description": "Cannot login to my account"
}
```

### List Tickets with Search
```
GET /api/tickets?search=john&status=Open
```

### Get Ticket Details
```
GET /api/tickets/TKT-001
```

### Update Ticket
```javascript
PUT /api/tickets/TKT-001
{
  "status": "In Progress",
  "note_text": "Investigating the issue"
}
```

## 📦 Tech Stack

- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Node.js + Express 4
- **Database**: SQLite3
- **HTTP Client**: Axios
- **Environment**: dotenv

## 🔧 Configuration

Copy `.env.example` to `.env` and update as needed:

```
PORT=5000
REACT_APP_API_URL=http://localhost:5000/api
DATABASE_URL=crm.db
```

## 📱 Frontend Features

- Clean, responsive design
- Real-time search
- Status filtering
- Ticket creation form
- Detailed ticket views
- Notes/comments system
- Mobile-friendly interface

## 🧪 Testing Checklist

- [ ] Create a new ticket
- [ ] View ticket in list
- [ ] Search for ticket by name
- [ ] Filter tickets by status
- [ ] View ticket details
- [ ] Add notes to ticket
- [ ] Update ticket status
- [ ] Verify data persists

## 🚀 Deployment

### Backend (Railway)
1. Push code to GitHub
2. Connect GitHub repo to Railway.app
3. Set `PORT` environment variable
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Set `REACT_APP_API_URL` to your Railway backend URL
4. Deploy

## 📚 Project Structure

```
datastraw-crm/
├── server.js                    # Express server & API endpoints
├── database.js                  # SQLite database setup
├── package.json                 # Backend dependencies
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
└── frontend/
    ├── public/
    │   └── index.html          # HTML template
    ├── src/
    │   ├── App.js              # React component
    │   ├── App.css             # Tailwind CSS
    │   └── index.js            # React entry point
    └── package.json            # Frontend dependencies
```

## 🤝 Contributing

Feel free to modify and enhance the application. All code is yours to customize.

## 📞 Support

For questions or issues:
- Check the code comments
- Review the API endpoints
- Test locally first
- Use console.log for debugging

## ✅ License

MIT - Use freely in your projects

---

**Built with ❤️ by Datastraw Technologies**
