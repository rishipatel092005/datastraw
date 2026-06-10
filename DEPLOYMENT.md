# 🚀 DEPLOYMENT GUIDE - DataStraw CRM

Complete instructions to deploy your application to production.

## Overview

**Backend** → Railway.app  
**Frontend** → Vercel

Both are free, have generous free tiers, and auto-deploy from GitHub.

## Part A: GitHub Setup (Required for Both)

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Create repo: `datastraw-crm`
3. Make it **Public** (required for free deployments)
4. Click "Create repository"

### 2. Push Code to GitHub

```bash
# Navigate to project
cd datastraw-crm

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: DataStraw CRM"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/datastraw-crm.git
git branch -M main
git push -u origin main
```

**You now have:**
- ✅ GitHub repo public and accessible
- ✅ All code pushed
- ✅ Ready for deployment

---

## Part B: Deploy Backend to Railway

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up (GitHub recommended)
3. Create new project

### Step 2: Connect GitHub

1. Click **"New"** → **"GitHub Repo"**
2. Search for `datastraw-crm`
3. Select and click "Deploy now"
4. Railway scans and auto-detects Node.js project

### Step 3: Configure Environment

1. Go to project → Variables
2. Add environment variables:
   ```
   PORT=5000
   NODE_ENV=production
   ```
3. Save

### Step 4: Wait for Deployment

Railway deploys automatically. You'll see:
- Build logs streaming
- "Deployment succeeded" message
- Public Railway URL assigned

### Step 5: Get Backend URL

1. Click "Deployments"
2. Copy the URL (looks like: `https://datastraw-crm-prod.railway.app`)
3. Save this URL - you'll need it for frontend

### Test Backend
```bash
curl https://your-railway-url.railway.app/api/health
# Should return: {"status":"ok"}
```

---

## Part C: Deploy Frontend to Vercel

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Vercel auto-connects your GitHub account

### Step 2: Import Project

1. Click **"New Project"**
2. Search for `datastraw-crm`
3. Click "Import"

### Step 3: Configure Project

**Build Command:** `cd frontend && npm run build`  
**Output Directory:** `frontend/build`  
**Root Directory:** (leave blank)

### Step 4: Set Environment Variables

1. Scroll to **"Environment Variables"**
2. Add:
   ```
   REACT_APP_API_URL = https://your-railway-url.railway.app/api
   ```
   (Replace with your actual Railway URL)
3. Click "Deploy"

### Step 5: Wait for Deployment

Vercel builds and deploys automatically:
- Installs dependencies
- Builds React app
- Deploys to CDN
- Gives you a live URL

### Step 6: Get Frontend URL

- Deployment completes
- You get a Vercel URL (looks like: `https://datastraw-crm-xxx.vercel.app`)
- Save this URL

### Test Frontend
Open the Vercel URL in browser - should load and connect to your backend.

---

## Part D: Final Testing

### 1. Test All Features Live

**At your Vercel URL:**
- ✅ Create a ticket
- ✅ See it in the list
- ✅ Search for it
- ✅ Filter by status
- ✅ View details
- ✅ Add notes
- ✅ Update status

### 2. Test Data Persistence

- Create a ticket
- Refresh the page
- Ticket still there? ✅ Success!

### 3. Get Your Deployment Links

You now have:
1. **Frontend URL** - Vercel
2. **Backend URL** - Railway  
3. **GitHub URL** - https://github.com/username/datastraw-crm

---

## Troubleshooting

### Frontend shows "Cannot connect to API"
1. Verify Railway backend is running
2. Check `REACT_APP_API_URL` in Vercel settings matches Railway URL
3. Redeploy Vercel after changing env variables

### Railway deployment fails
1. Check build logs for errors
2. Ensure `package.json` exists in root
3. Try redeploying from Railway dashboard

### CORS errors
These are normal - add to server.js if needed:
```javascript
app.use(cors({
  origin: ['https://your-vercel-url.vercel.app'],
  credentials: true
}));
```

### Database not persisting
SQLite stores data in-memory on Railway. For persistent data, consider:
- Upgrade to Railway paid tier (keeps volumes)
- Or use PostgreSQL (free on Railway)
- For MVP, this is acceptable

---

## Next Steps

1. ✅ Backend deployed (Railway)
2. ✅ Frontend deployed (Vercel)
3. 📹 Record demo video (see DEMO_VIDEO_GUIDE.md)
4. 📧 Submit links and video

---

## Deployment Links Summary

**Save these for submission:**

- Frontend: `https://your-vercel-url.vercel.app`
- Backend: `https://your-railway-url.railway.app`
- GitHub: `https://github.com/username/datastraw-crm`

**Your app is now LIVE on the internet! 🎉**
