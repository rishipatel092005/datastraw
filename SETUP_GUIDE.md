# 📋 SETUP GUIDE - DataStraw CRM

Complete step-by-step instructions to get the application running locally.

## Prerequisites

Ensure you have installed:
- **Node.js** (14+): https://nodejs.org/
- **npm** (comes with Node.js)
- **Git** (optional but recommended)

Verify installation:
```bash
node --version  # Should show v14.0.0 or higher
npm --version   # Should show 6.0.0 or higher
```

## Step 1: Navigate to Project Directory

```bash
cd path/to/datastraw-crm
```

## Step 2: Install Backend Dependencies

```bash
npm install
```

This installs all required packages:
- express
- cors
- sqlite3
- body-parser
- dotenv

## Step 3: Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

This installs React and required frontend packages.

## Step 4: Setup Environment File

```bash
# Copy the example environment file
cp .env.example .env
```

(Or manually create `.env` with the contents of `.env.example`)

## Step 5: Start Backend Server

**Terminal 1:**
```bash
npm start
```

Expected output:
```
🚀 Server running on http://localhost:5000
API available at http://localhost:5000/api
Connected to SQLite database
Tickets table initialized
Notes table initialized
```

⚠️ **Port already in use?** Kill the process using port 5000:
```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## Step 6: Start Frontend Application

**Terminal 2:**
```bash
cd frontend
REACT_APP_API_URL=http://localhost:5000/api npm start
```

Windows CMD:
```bash
set REACT_APP_API_URL=http://localhost:5000/api && npm start
```

Windows PowerShell:
```bash
$env:REACT_APP_API_URL="http://localhost:5000/api"; npm start
```

Expected output:
```
Compiled successfully!
You can now view datastraw-crm-frontend in the browser.
  Local:            http://localhost:3000
```

The browser should automatically open at `http://localhost:3000`

## Step 7: Test the Application

### Create a Ticket
1. Click **"➕ New Ticket"** button
2. Fill in the form:
   - Customer Name: "John Doe"
   - Email: "john@example.com"
   - Subject: "Login Issue"
   - Description: "Cannot access my account"
3. Click **"Create Ticket"**
4. Success message appears

### View Tickets
- The ticket appears in the list with:
  - Ticket ID (TKT-001)
  - Customer name
  - Subject
  - Status (Open)
  - Creation date

### Search Functionality
1. Type in the search box: "John"
2. List filters in real-time
3. Clear search to see all tickets

### Filter by Status
1. Change dropdown from "All" to "In Progress"
2. List shows only "In Progress" tickets
3. Can combine with search

### View Ticket Details
1. Click **"View"** button on any ticket
2. See full details:
   - Full description
   - Email address
   - Current status
   - Notes section (if any)

### Update Ticket
1. On detail page, scroll to "Update Ticket" section
2. Change status: "Open" → "In Progress" → "Closed"
3. Add a note in the text area
4. Click **"Update Ticket"**
5. Success message appears

### Add More Tickets
- Create additional tickets to test search and filtering
- Test with different statuses

## Troubleshooting

### "Cannot find module" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Port 5000 already in use
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9
npm start
```

### CORS errors in browser console
- Make sure backend is running on port 5000
- Check `REACT_APP_API_URL` environment variable
- Verify backend has `cors` middleware enabled

### Database file not found
- The `crm.db` file is created automatically on first run
- If missing, delete and restart: `npm start`

### Frontend not connecting to backend
1. Check backend is running: `http://localhost:5000/api/health`
2. Check browser console for errors (F12)
3. Verify `REACT_APP_API_URL` is correct
4. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Development Tips

### View Backend Logs
Look at Terminal 1 for:
- Database queries
- API requests
- Errors
- Server status

### View Frontend Logs
- Open browser DevTools: F12
- Check Console tab for React errors
- Network tab shows API calls

### Edit Code
- Backend changes: Restart `npm start`
- Frontend changes: Auto-reload (saves automatically)

### Database Inspection
The SQLite database (`crm.db`) is stored in the root directory. To inspect:
- Use SQLite browser: https://sqlitebrowser.org/
- Or command line: `sqlite3 crm.db`

## Next Steps

After testing locally:
1. Review the code and understand the flow
2. Modify and enhance features
3. Prepare for deployment (see DEPLOYMENT.md)
4. Record demo video (see DEMO_VIDEO_GUIDE.md)

---

**You're ready to build! 🚀**
