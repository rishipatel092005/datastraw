# ⏱️ EXECUTION PLAN - DataStraw CRM

3-4 day timeline to complete and submit the Datastraw CRM assessment.

## 📅 Timeline Overview

| Day | Phase | Duration | Key Tasks |
|-----|-------|----------|-----------|
| **Day 1** | Setup & Understand | 2-3 hours | Read guides, install, test locally |
| **Day 2** | Code & Customize | 3-4 hours | Understand code, make modifications |
| **Day 3** | Deploy & Test | 2-3 hours | Push to GitHub, deploy to Railway/Vercel |
| **Day 4** | Demo & Submit | 2-3 hours | Record video, send submission email |

**Total Time: 10-13 hours of focused work**

---

## 🗓️ DAY 1: Setup & Understanding (2-3 hours)

### Morning (1 hour)

**11:00 - Read Documentation**
- [ ] Read README.md (10 min)
- [ ] Read PROJECT_SUMMARY.md (10 min)
- [ ] Skim SETUP_GUIDE.md (10 min)
- [ ] Quick coffee break ☕

**Goal:** Understand what you're building

### Afternoon (1-2 hours)

**02:00 - Install & Run Locally**
- [ ] Navigate to project directory
- [ ] `npm install` (wait for dependencies)
- [ ] `cd frontend && npm install && cd ..`
- [ ] Terminal 1: `npm start` (backend)
- [ ] Terminal 2: `cd frontend && npm start` (frontend)
- [ ] Wait for browser to open

**Goal:** App running locally

**03:00 - Manual Testing**
- [ ] Create 3 test tickets
- [ ] Search for each one
- [ ] Filter by different statuses
- [ ] Click View on each ticket
- [ ] Add notes and update status
- [ ] Refresh and verify data persists

**Goal:** Understand all features

### End of Day 1
- ✅ App running locally
- ✅ All features tested
- ✅ Database working
- ✅ Ready to customize

---

## 🗓️ DAY 2: Code & Customization (3-4 hours)

### Morning (1.5-2 hours)

**09:00 - Review Code**
- [ ] Read server.js comments
- [ ] Understand API endpoints
- [ ] Review database.js structure
- [ ] Check App.js React component

**Goal:** Understand how it works

**10:30 - Make Modifications**
Pick a few small changes (don't overengineer):
- [ ] Change app title or colors
- [ ] Add company logo/branding
- [ ] Modify form fields (add a field)
- [ ] Change database schema slightly
- [ ] Add a new field to tickets (e.g., priority)

**Note:** Keep changes simple and test them!

### Afternoon (1.5-2 hours)

**02:00 - Test Your Changes**
- [ ] Restart backend
- [ ] Restart frontend
- [ ] Create a new ticket with your changes
- [ ] Verify everything works
- [ ] Fix any bugs

**Goal:** Working, customized app

**03:30 - Prepare GitHub**
- [ ] Create GitHub account (if needed)
- [ ] Create new repository `datastraw-crm`
- [ ] Make repo public
- [ ] Copy `.env.example` to `.env` (locally)
- [ ] Make sure `.gitignore` exists

### End of Day 2
- ✅ Code understood
- ✅ Customizations made
- ✅ GitHub repo created
- ✅ Ready to deploy

---

## 🗓️ DAY 3: Deployment (2-3 hours)

### Morning (1-1.5 hours)

**09:00 - Push to GitHub**
```bash
cd datastraw-crm
git init
git add .
git commit -m "Initial commit: DataStraw CRM"
git remote add origin https://github.com/YOUR_USERNAME/datastraw-crm.git
git branch -M main
git push -u origin main
```

**Goal:** Code on GitHub (public)

### Afternoon (1-2 hours)

**02:00 - Deploy Backend (Railway)**
- [ ] Go to railway.app
- [ ] Sign up with GitHub
- [ ] Create new project
- [ ] Connect GitHub repo
- [ ] Railway auto-deploys
- [ ] Copy Railway URL

**Duration:** 10-15 minutes

**02:20 - Deploy Frontend (Vercel)**
- [ ] Go to vercel.com
- [ ] Sign up with GitHub
- [ ] Import datastraw-crm repo
- [ ] Set environment variable: `REACT_APP_API_URL=<Railway_URL>/api`
- [ ] Vercel auto-deploys
- [ ] Copy Vercel URL

**Duration:** 10-15 minutes

**02:40 - Live Testing**
- [ ] Test all features on live URLs
- [ ] Create a ticket on production
- [ ] Search and filter
- [ ] Verify everything works
- [ ] Take screenshots

**Goal:** App live on internet

### End of Day 3
- ✅ Code on GitHub
- ✅ Backend deployed (Railway)
- ✅ Frontend deployed (Vercel)
- ✅ All features working live
- ✅ Ready to record demo

---

## 🗓️ DAY 4: Demo & Submission (2-3 hours)

### Morning (1-1.5 hours)

**09:00 - Record Demo Video**
- [ ] Set up recording software (OBS or Loom)
- [ ] Test microphone
- [ ] Record first run-through (practice)
- [ ] Record actual demo (follow script in DEMO_VIDEO_GUIDE.md)
- [ ] Watch back (check quality)
- [ ] Re-record if needed

**Duration:** 45 min to 1 hour

**Note:** Follow the script - show all 5 features, explain tech choices

### Afternoon (1-1.5 hours)

**02:00 - Upload to YouTube**
- [ ] Create YouTube account
- [ ] Upload recorded demo
- [ ] Add title: "Datastraw CRM - Demo by [Your Name]"
- [ ] Add description with links
- [ ] Make video PUBLIC
- [ ] Copy YouTube URL

**Duration:** 5-10 minutes (upload takes time)

**02:15 - Prepare Submission Email**
- [ ] Create email draft
- [ ] Include 4 links:
  1. Frontend URL (Vercel)
  2. Backend URL (Railway)
  3. GitHub repo
  4. YouTube demo
- [ ] Write 2-3 sentences about approach
- [ ] Proofread

**02:30 - Submit**
- [ ] Send email to:
  - To: jignesh.ponamwar@datastraw.in
  - CC: hr@datastraw.in
- [ ] Subject: "Datastraw CRM Assignment - [Your Name]"

### End of Day 4
- ✅ Demo recorded
- ✅ Video uploaded
- ✅ Email sent
- ✅ Assessment COMPLETE! 🎉

---

## ⏰ TIME BREAKDOWN

```
Day 1: 2-3 hours (Reading + Setup + Testing)
Day 2: 3-4 hours (Code Review + Customization + GitHub)
Day 3: 2-3 hours (Deployment + Live Testing)
Day 4: 2-3 hours (Demo + Upload + Submit)
————————————————
TOTAL: 10-13 hours
```

Spread over 3-4 days of part-time work, or 2 days of focused work.

---

## 🎯 Key Milestones

- **End of Day 1:** App runs locally ✅
- **End of Day 2:** GitHub repo ready ✅
- **End of Day 3:** App deployed and live ✅
- **End of Day 4:** Submitted! ✅

---

## 📋 Pre-Submission Checklist

### Code Quality
- [ ] No console errors
- [ ] App loads smoothly
- [ ] All features work
- [ ] Search is responsive
- [ ] Status updates persist

### Deployment
- [ ] Frontend URL is live
- [ ] Backend URL is live
- [ ] App works on both URLs
- [ ] No CORS errors
- [ ] Database persists data

### Submission Package
- [ ] GitHub repo is public
- [ ] README is complete
- [ ] .env.example present
- [ ] .gitignore configured
- [ ] Demo video is 3-5 min
- [ ] YouTube link works
- [ ] All 4 links in email

---

## ⚠️ If You Run Out of Time

**Priority Order:**
1. ✅ App runs locally (must work)
2. ✅ App deployed (must be live)
3. ✅ Demo recorded (must show features)
4. ✅ Code quality (clean is good)
5. ✅ Extra features (nice to have)

**Don't** spend hours perfecting code - **do** ship a working app.

---

## 💡 Pro Tips

1. **Day 1 is crucial** - If setup takes longer, you're behind
2. **Test locally first** - Deploy only when everything works
3. **Deploy early** - Don't wait until Day 4
4. **Record draft video** - Do it once, watch, then do final
5. **Submit on time** - Don't miss the deadline
6. **Be honest** - Mention what you did, what you learned, what you'd improve

---

## 🚀 You've Got This!

Follow this timeline, complete each milestone, and you'll submit an impressive full-stack application.

**Focus on:** Shipped > Perfect  
**Remember:** They care more about a working app than perfect code.

**Let's go!** 💪
