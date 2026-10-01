# TechViora - Full-Stack Internship Enrollment & LMS Platform

TechViora is an industry-standard, production-ready engineering skill development and internship platform built with Next.js 15 (App Router), TypeScript, Tailwind CSS, MongoDB/Mongoose, Razorpay payment gateway, Cloudinary, and custom JWT authentication.

---

## 🚀 Key Highlights & Architecture

- **40 Distinct Internship Domains:** Curated curriculum for Web Development, Full Stack (MERN/Next.js), Python, Java, C++, DSA, Machine Learning, AI, GenAI, DevOps, Cloud Computing, Cyber Security, Android/Flutter, UI/UX, and 26+ more.
- **Dynamic Pricing (Zero Hardcoding):** 
  - 1 Month: ₹299 (Original ₹999)
  - 45 Days: ₹399 (Original ₹1299)
  - 3 Months: ₹599 (Original ₹1999)
  - 6 Months: ₹999 (Original ₹2999)
  - All pricing, discounts, duration labels, features, and coupons are 100% controllable from the Admin Dashboard.
- **Student Learning Management System (LMS):**
  - Daily module unlocks and video/article/code lesson player
  - Practical assignment submission with GitHub repository and commit verification
  - Objective quizzes with instant evaluation and answer explanations
  - Major Capstone project submission with live URL and video walkthrough demo
  - Weighted progress calculation (Lessons 50%, Assignments 20%, Projects 20%, Quizzes 10%)
- **Anti-Fraud Verifiable Digital Certificates:**
  - Auto-generated certificate with unique ID (`TV-YYYY-XXXXXX`) and dynamic QR code
  - Public verification portal at `/verify/[certificateId]`
- **Full-Featured Admin Dashboard:**
  - Platform KPIs (Revenue, Enrollments, Active Interns, Pending Submissions)
  - Revenue analytics chart and domain enrollment breakdown
  - Program & dynamic plan builder
  - Assignment & Capstone code grading interface with feedback
  - Certificate issuance, verification, and revocation
  - Coupon management (flat, percentage, usage limits)
  - Cohort announcements & student testimonial moderation
  - Articles & technical blog CMS

---

## 🛠 Tech Stack

- **Framework:** Next.js 15.5+ (App Router, Server Actions & API Routes)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Lucide React Icons, Framer Motion
- **Database:** MongoDB & Mongoose ORM
- **Authentication:** Custom JWT sessions stored in HTTP-Only cookies + bcryptjs password hashing
- **Payments:** Razorpay API with server-side HMAC-SHA256 signature verification
- **Media:** Cloudinary SDK for student submissions, receipts, and avatars
- **Emails:** Nodemailer / Resend for transaction and enrollment notifications
- **QR Codes & Certificates:** `qrcode` generation and `canvas-confetti` celebrations

---

## 📁 Project Structure

```
TechViora/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (public)/             # Public pages (Home, Internships, Pricing, Verify, etc.)
│   │   ├── student/              # Student LMS & Learning Dashboard
│   │   ├── admin/                # Admin Management Portal
│   │   └── api/                  # 30+ REST API endpoints
│   ├── components/               # UI components (Home, Layout, Shared)
│   ├── data/                     # Seed data (40 domains, 4 plans, curriculum)
│   ├── lib/                      # Database, Auth, Razorpay, Cloudinary, Progress utils
│   ├── models/                   # 25+ Mongoose Schemas & Data Models
│   ├── scripts/                  # DB seed & Admin account setup scripts
│   └── validators/               # Zod input validation schemas
├── .env.example                  # Environment variable reference
├── package.json
└── tsconfig.json
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/techviora?retryWrites=true&w=majority

# JWT & Authentication
NEXTAUTH_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Razorpay Payment Gateway (Test or Live)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx

# Cloudinary Media Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Default Admin Credentials
ADMIN_NAME=TechViora Administrator
ADMIN_EMAIL=admin@techviora.com
ADMIN_PASSWORD=Admin@TechViora2026

# Email / SMTP (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=support@techviora.com
SMTP_PASS=your_app_password
SMTP_FROM=TechViora <support@techviora.com>
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Database (40 Domains, Curriculums, Plans, Superadmin)
```bash
# Seed all 40 internship programs, pricing plans, and starter curriculum
npm run seed

# Or create/reset the Superadmin account
npm run seed:admin
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔑 Default Accounts (Post-Seed)

- **Superadmin:**
  - Email: `admin@techviora.com`
  - Password: `Admin@TechViora2026`
  - Access: [http://localhost:3000/admin](http://localhost:3000/admin)

- **Demo Student:**
  - Email: `student@techviora.com`
  - Password: `Student@2026`
  - Access: [http://localhost:3000/login](http://localhost:3000/login)

---

## 🛡 Verification & Production Build

To verify type safety and generate an optimized production bundle:

```bash
npm run build
```

Ready for seamless 1-click deployment on **Vercel**, **Render**, or any Node.js hosting platform!
