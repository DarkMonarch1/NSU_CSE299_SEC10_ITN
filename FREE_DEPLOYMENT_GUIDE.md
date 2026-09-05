# CareerSetu Free Deployment Guide

This guide provides step-by-step instructions to deploy CareerSetu for FREE using modern cloud platforms like Vercel, Supabase, and Firebase.

## 🚀 Quick Deployment Options

### Option 1: Vercel + Supabase (Recommended)
- **Frontend**: Vercel (Free tier)
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (Free tier)
- **Cost**: $0/month

### Option 2: Vercel + Firebase
- **Frontend**: Vercel (Free tier)
- **Backend**: Vercel Serverless Functions
- **Database**: Firebase Realtime Database
- **Cost**: $0/month

### Option 3: Railway.app
- **Full Stack**: Railway.app (Free tier)
- **Database**: PostgreSQL included
- **Cost**: $0/month (with limitations)

---

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up with GitHub)
- Supabase account (free tier)
- Basic knowledge of Git

---

## Option 1: Vercel + Supabase Deployment

### Step 1: Prepare Your Code

1. **Update Environment Variables**
   Create `.env.local` in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=https://your-project.vercel.app/api
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

2. **Create Vercel Configuration**
   Create `vercel.json` in the root directory:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "app/main.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "app/main.py"
       }
     ]
   }
   ```

### Step 2: Set Up Supabase Database

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose free tier
   - Set password and region

2. **Get Database Credentials**
   - Go to Project Settings → Database
   - Copy:
     - Project URL
     - Anon Public Key
     - Database connection string

3. **Create Tables**
   Run this SQL in Supabase SQL Editor:
   ```sql
   -- Users table
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     full_name VARCHAR(255) NOT NULL,
     role VARCHAR(50) DEFAULT 'alumni',
     nsu_id VARCHAR(50),
     department VARCHAR(100),
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Alumni table
   CREATE TABLE alumni (
     id VARCHAR(100) PRIMARY KEY,
     nsu_id VARCHAR(50) NOT NULL,
     full_name VARCHAR(255) NOT NULL,
     degree VARCHAR(100) NOT NULL,
     batch VARCHAR(100) NOT NULL,
     procession VARCHAR(50),
     department VARCHAR(100) DEFAULT 'Computer Science & Engineering',
     cgpa VARCHAR(10) DEFAULT '3.65',
     current_company VARCHAR(255) DEFAULT 'Leading Tech Firm',
     current_role VARCHAR(255) DEFAULT 'Software Engineer',
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Companies table
   CREATE TABLE companies (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) UNIQUE NOT NULL,
     industry VARCHAR(100) DEFAULT 'Software & IT',
     location VARCHAR(255) DEFAULT 'Dhaka, Bangladesh',
     verified BOOLEAN DEFAULT TRUE,
     trust_score INTEGER DEFAULT 95,
     website VARCHAR(255),
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Job postings table
   CREATE TABLE job_postings (
     id VARCHAR(100) PRIMARY KEY,
     slug VARCHAR(255) UNIQUE NOT NULL,
     title VARCHAR(255) NOT NULL,
     company VARCHAR(255) NOT NULL,
     location VARCHAR(255) NOT NULL,
     work_type VARCHAR(50) NOT NULL,
     category VARCHAR(100) NOT NULL,
     salary VARCHAR(100) NOT NULL,
     department_target VARCHAR(100) NOT NULL,
     target_convocation VARCHAR(100) NOT NULL,
     trust_score INTEGER DEFAULT 95,
     ai_match_score INTEGER DEFAULT 90,
     description TEXT NOT NULL,
     requirements_json TEXT DEFAULT '[]',
     responsibilities_json TEXT DEFAULT '[]',
     benefits_json TEXT DEFAULT '[]',
     posted_by VARCHAR(255) DEFAULT 'NSU Recruiter',
     posted_date VARCHAR(100) DEFAULT '2026-08-18',
     application_count INTEGER DEFAULT 0,
     is_featured BOOLEAN DEFAULT FALSE,
     is_approved BOOLEAN DEFAULT TRUE,
     company_verified BOOLEAN DEFAULT TRUE,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Profile edits table (for moderation)
   CREATE TABLE profile_edits (
     id SERIAL PRIMARY KEY,
     user_email VARCHAR(255) NOT NULL,
     edit_type VARCHAR(50) NOT NULL,
     field_name VARCHAR(100) NOT NULL,
     old_value TEXT,
     new_value TEXT NOT NULL,
     reason TEXT,
     status VARCHAR(50) DEFAULT 'pending',
     reviewed_by VARCHAR(255),
     reviewed_at TIMESTAMP,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### Step 3: Update Backend for Supabase

1. **Install Supabase Python Client**
   ```bash
   pip install supabase
   ```

2. **Update Database Configuration**
   Modify `app/database.py`:
   ```python
   import os
   from supabase import create_client, Client

   # Supabase configuration
   SUPABASE_URL = os.environ.get("SUPABASE_URL")
   SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

   supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
   ```

3. **Update Models for Supabase**
   Modify your models to work with Supabase instead of SQLAlchemy.

### Step 4: Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_KEY`: Your Supabase anon key
     - `JWT_SECRET_KEY`: Generate a secure random key
   - Click "Deploy"

3. **Configure Environment Variables**
   In Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_API_URL`: Your Vercel domain
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

### Step 5: Seed Initial Data

Create a seed script `seed_supabase.py`:
```python
from supabase import create_client
import os

supabase = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)

# Seed admin user
admin_data = {
    "email": "admin@test.com",
    "password_hash": "hashed_password_here",
    "full_name": "Test Admin User",
    "role": "admin",
    "nsu_id": "ADMIN002",
    "department": "Computer Science & Engineering"
}

supabase.table("users").insert(admin_data).execute()
```

Run the seed script locally or as a Vercel cron job.

---

## Option 2: Railway.app Deployment (Easiest)

### Step 1: Prepare for Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Get $5 free credit

2. **Update Docker Configuration**
   Ensure your `docker-compose.yml` is Railway-compatible:
   ```yaml
   services:
     careersetu:
       build: .
       ports:
         - "8000:8000"
       environment:
         - DATABASE_URL=${DATABASE_URL}
         - JWT_SECRET_KEY=${JWT_SECRET_KEY}
   
     frontend:
       build: ./frontend
       ports:
         - "3000:3000"
       environment:
         - NEXT_PUBLIC_API_URL=${RAILWAY_PUBLIC_DOMAIN}
   ```

### Step 2: Deploy to Railway

1. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Configure Services**
   - Railway will detect your Docker setup
   - Add environment variables:
     - `JWT_SECRET_KEY`: Generate secure key
     - `DATABASE_URL`: Railway will provide PostgreSQL URL

3. **Deploy**
   - Click "Deploy"
   - Railway will build and deploy your services

4. **Access Your App**
   - Railway provides a public domain
   - Configure custom domain if needed

---

## Option 3: Firebase + Vercel Deployment

### Step 1: Set Up Firebase

1. **Create Firebase Project**
   - Go to [firebase.google.com](https://firebase.google.com)
   - Create new project
   - Enable Realtime Database

2. **Get Firebase Config**
   - Go to Project Settings
   - Copy your firebase config object

### Step 2: Update Frontend for Firebase

1. **Install Firebase SDK**
   ```bash
   cd frontend
   npm install firebase
   ```

2. **Create Firebase Config**
   Create `frontend/src/lib/firebase.ts`:
   ```typescript
   import { initializeApp } from 'firebase/app';
   import { getDatabase } from 'firebase/database';

   const firebaseConfig = {
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
     databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   };

   const app = initializeApp(firebaseConfig);
   const database = getDatabase(app);

   export { database };
   ```

### Step 3: Deploy to Vercel

Follow the same Vercel deployment steps as Option 1, but use Firebase environment variables instead of Supabase.

---

## 🔧 Configuration for All Options

### Environment Variables Template

Create `.env.example`:
```env
# Backend
DATABASE_URL=your-database-url
JWT_SECRET_KEY=generate-secure-random-key
JWT_EXPIRE_MINUTES=1440
CORS_ORIGINS=https://your-domain.vercel.app

# Frontend
NEXT_PUBLIC_API_URL=https://your-api-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key

# Firebase (if using)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your-database-url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

---

## 🎯 Post-Deployment Steps

### 1. Test Your Deployment
- Access your frontend URL
- Login with test accounts:
  - Admin: `admin@test.com` / `password123`
  - Employer: `employer@test.com` / `password123`

### 2. Configure Custom Domain (Optional)
- Vercel: Add custom domain in project settings
- Railway: Configure domain in networking settings
- Update DNS records as directed

### 3. Set Up Monitoring
- Vercel Analytics: Enable in project settings
- Railway: Built-in monitoring dashboard
- Supabase: Database monitoring in dashboard

### 4. Enable Automatic Backups
- Supabase: Automatic backups included in free tier
- Railway: Database snapshots available
- Set up backup policies in dashboard

---

## 💡 Cost Breakdown (Free Tier)

| Service | Free Tier Limits | Cost |
|---------|------------------|------|
| Vercel | 100GB bandwidth, 6,000 minutes build | $0 |
| Supabase | 500MB database, 2GB file storage | $0 |
| Firebase | 1GB database, 10GB storage | $0 |
| Railway | $5 credit, then $5/month | $0 initially |

---

## 🐛 Troubleshooting

### Vercel Deployment Issues

**Build Fails:**
```bash
# Check build logs in Vercel dashboard
# Ensure all dependencies are in requirements.txt
# Verify Python version compatibility
```

**Environment Variables Not Working:**
```bash
# Check variable names match exactly
# Restart deployment after adding variables
# Use NEXT_PUBLIC_ prefix for frontend variables
```

### Supabase Connection Issues

**Connection Refused:**
```bash
# Check Supabase project is active
# Verify API key and URL are correct
# Check network policies in Supabase dashboard
```

**Table Creation Errors:**
```bash
# Run SQL directly in Supabase dashboard
# Check for syntax errors
# Verify table names don't conflict with reserved words
```

### Railway Deployment Issues

**Container Won't Start:**
```bash
# Check Railway logs
# Verify Dockerfile is correct
# Ensure ports are properly exposed
```

**Database Connection:**
```bash
# Use Railway-provided DATABASE_URL
# Check database is provisioned
# Verify connection string format
```

---

## 📊 Performance Optimization

### Frontend Optimization
```bash
# Enable Vercel Analytics
npm install @vercel/analytics
```

### Database Optimization
- Add indexes to frequently queried columns
- Use connection pooling
- Enable query caching in Supabase

### API Optimization
- Implement response caching
- Use serverless functions efficiently
- Optimize database queries

---

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use different keys for development/production
   - Rotate keys regularly

2. **Database Security**
   - Enable Row Level Security in Supabase
   - Use read-only users for frontend
   - Implement proper authentication

3. **API Security**
   - Rate limiting on public endpoints
   - Input validation and sanitization
   - HTTPS only in production

---

## 📈 Scaling Beyond Free Tier

When you exceed free limits:

**Vercel Pro ($20/month):**
- Unlimited bandwidth
- Priority builds
- Team collaboration

**Supabase Pro ($25/month):**
- 8GB database
- 50GB file storage
- Daily backups

**Railway ($5/month):**
- More resources
- Better performance
- Priority support

---

## 🎓 Next Steps

1. **Choose your deployment option** based on your needs
2. **Follow the step-by-step guide** for your chosen platform
3. **Test thoroughly** before sharing the URL
4. **Set up monitoring** to track performance
5. **Plan for scaling** as your user base grows

---

## 📞 Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
- **Firebase Documentation**: [firebase.google.com/docs](https://firebase.google.com/docs)

---

**Last Updated**: September 5, 2026  
**Version**: 1.0.0  
**Deployed Platforms**: Vercel, Supabase, Railway, Firebase