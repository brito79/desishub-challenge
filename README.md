# Desishub Candidate Assessment Platform

> A full-stack web application to register, assess, and categorize technical candidates based on their skill level.

## 🚀 Live Demo

[View Live Application](https://your-deployment-url.vercel.app) _(Will be updated after deployment)_

---

## 📖 Project Overview

This application is built as part of the **Desishub Expansion Initiative** to efficiently categorize new team members into skill tiers (Tier 0 - Tier 4) based on their technical proficiency.

### 🎯 Key Features

- **Candidate Registration**: Collect name, email, and contact information
- **Interactive Skill Assessment**: Multi-step questionnaire to evaluate technical skills
- **Automatic Tier Assignment**: Algorithm-based categorization into 5 skill tiers
- **Dashboard**: View all candidates with filtering and sorting capabilities
- **Individual Candidate Pages**: Detailed view of each candidate's assessment and tier
- **Responsive Design**: Mobile-friendly interface built with modern UI components

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **API**: Next.js Server Actions
- **Validation**: Zod schemas

### Database
- **Database**: MongoDB
- **Driver**: Native MongoDB Node.js driver (no ORM)

### Deployment
- **Platform**: Vercel

---

## 🎯 Tier System

The application categorizes candidates into 5 tiers based on their technical skills:

| Tier | Name | Description |
|------|------|-------------|
| **0** | Beginner | Knows HTML, CSS, JS, and React/Next.js basics but cannot build CRUD apps |
| **1** | CRUD Developer | Can build CRUD apps with databases but cannot implement authentication |
| **2** | Full-Stack Next.js Developer | Can build authenticated CRUD apps with Next.js but doesn't know backend frameworks |
| **3** | Multi-Framework Developer | Knows backend frameworks (Express/Hono/Laravel) and can build authenticated APIs, but not Golang |
| **4** | Advanced Full-Stack Developer | Proficient in Next.js, backend frameworks, and Golang |

### Tier Assignment Logic

The tier is automatically calculated based on the candidate's responses to the assessment questionnaire. The algorithm follows this decision tree:

```
Knows Golang + can build Go APIs? → Tier 4
   ↓ No
Knows backend framework + can build auth APIs? → Tier 3
   ↓ No
Can implement authentication (password + Google)? → Tier 2
   ↓ No
Can build CRUD apps? → Tier 1
   ↓ No
Knows HTML/CSS/JS + React/Next.js basics? → Tier 0
```

See `lib/tier-calculator.ts` for the complete implementation.

---

## 📁 Project Structure

```
desishub-challenge/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Landing page
│   ├── register/                 # Registration & assessment flow
│   ├── dashboard/                # All candidates dashboard
│   ├── candidates/[id]/          # Individual candidate detail page
│   └── results/[id]/             # Assessment result page
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── forms/                    # Form components
│   ├── dashboard/                # Dashboard-specific components
│   └── layout/                   # Layout components (Header, Footer)
├── lib/
│   ├── db/
│   │   └── mongodb.ts            # MongoDB connection utility
│   ├── validations.ts            # Zod validation schemas
│   ├── tier-calculator.ts        # Tier assignment logic
│   └── utils.ts                  # Helper functions
├── types/
│   └── index.ts                  # TypeScript type definitions
└── public/                       # Static assets
```

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/brito79/desishub-challenge.git
   cd desishub-challenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Update the `.env.local` file with your MongoDB credentials:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   MONGODB_DB_NAME=desishub
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is sufficient)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or allow access from anywhere for development)
5. Get your connection string and add it to `.env.local`

### Database Schema

The application uses a single collection:

**Collection: `candidates`**

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  phone: string,
  tier: number (0-4),
  assessment: {
    knowsHtmlCssJs: boolean,
    knowsReactNextjs: boolean,
    canBuildCrud: boolean,
    crudFrameworks: string[],
    canImplementAuth: boolean,
    canImplementGoogleAuth: boolean,
    knowsBackendFramework: boolean,
    backendFrameworks: string[],
    canBuildAuthApi: boolean,
    canDocumentApi: boolean,
    knowsGolang: boolean,
    canBuildGoApi: boolean,
    canIntegrateGoWithFrontend: boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import your repository on [Vercel](https://vercel.com)

3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)

4. Deploy!

Your application will be live at `https://your-project.vercel.app`

---

## 📊 Features Checklist

- ✅ Candidate registration with validation
- ✅ Multi-step skill assessment questionnaire
- ✅ Automatic tier assignment algorithm
- ✅ Dashboard with all candidates
- ✅ Filter candidates by tier
- ✅ Sort candidates by name, email, tier, or date
- ✅ Search functionality
- ✅ Individual candidate detail pages
- ✅ Assessment result pages
- ✅ Responsive design
- ✅ Error handling and validation
- ✅ TypeScript type safety
- ✅ Clean code structure
- ✅ MongoDB integration
- ✅ Deployed to Vercel

---

## 🧪 Testing

To test the tier assignment logic:

1. Navigate to `/register`
2. Fill out the registration form
3. Complete the assessment with different combinations of answers
4. Verify the tier assignment matches the expected logic

**Test Cases:**

- Tier 0: Answer "Yes" to HTML/CSS/JS and React/Next.js, but "No" to CRUD
- Tier 1: Answer "Yes" to CRUD, but "No" to authentication
- Tier 2: Answer "Yes" to authentication, but "No" to backend frameworks
- Tier 3: Answer "Yes" to backend frameworks and auth APIs, but "No" to Golang
- Tier 4: Answer "Yes" to Golang and Go API building

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@brito79](https://github.com/brito79)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Component Library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) - NoSQL Database
- [Vercel](https://vercel.com/) - Deployment Platform

---

**Built with ❤️ for Desishub**
