# AI-Powered Excel Mock Interviewer

## Problem Statement
An AI-driven solution to automate Excel skill assessments for job candidates, replacing time-consuming manual technical interviews.

## Business Context
Our company is rapidly expanding its Finance, Operations, and Data Analytics divisions. Advanced proficiency in Microsoft Excel is crucial for new hires, but manual technical interviews are time-consuming and lead to inconsistent evaluations.

## Solution Overview
This project implements an AI agent that conducts structured Excel interviews with:
- Multi-turn conversational flow
- Intelligent answer evaluation
- Agentic behavior and state management
- Constructive feedback reports

## Core Features
1. **Structured Interview Flow** - Introduction, questions, and summary
2. **Intelligent Answer Evaluation** - AI-powered response assessment
3. **Agentic Behavior** - Interviewer-like thinking and state management
4. **Performance Reports** - Detailed candidate assessment

## Technology Stack
- **Full-Stack Framework**: Next.js 14 with TypeScript
- **AI/ML**: Google Gemini Pro for conversational AI and evaluation
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS for responsive design
- **Deployment**: Vercel for seamless deployment

## Project Structure
```
excel-mock-interviewer/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── interview/
│   │   │   │   ├── start/route.ts
│   │   │   │   ├── answer/route.ts
│   │   │   │   └── [id]/report/route.ts
│   │   │   └── health/route.ts
│   │   ├── interview/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── report/page.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── InterviewChat.tsx
│   │   ├── QuestionCard.tsx
│   │   └── ReportCard.tsx
│   ├── lib/
│   │   ├── ai-service.ts
│   │   ├── database.ts
│   │   └── utils.ts
│   └── types/
│       └── interview.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── docs/
│   ├── design-document.md
│   └── api-documentation.md
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key

## Getting Started

### Prerequisites
- Node.js 18+ (Download from [nodejs.org](https://nodejs.org/))
- npm or yarn package manager
- Google Gemini API key (Get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Setup Instructions

1. **Install Node.js** (if not already installed)
   - Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **Clone or Download the project**
   - The project is already in: `c:\Users\91700\Desktop\CodingNinja`

3. **Install dependencies**
   ```bash
   cd c:\Users\91700\Desktop\CodingNinja
   npm install
   ```

4. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Add your Gemini API key to `.env.local`:
     ```
     GEMINI_API_KEY=your-actual-gemini-api-key-here
     DATABASE_URL="file:./dev.db"
     ```

5. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Start using the Excel Mock Interviewer!

## Features in Detail

### Interview Flow
1. **Introduction Phase**: AI introduces itself and explains the process
2. **Question Phase**: Progressive difficulty Excel questions
3. **Evaluation Phase**: Real-time response assessment
4. **Summary Phase**: Performance report generation

### Question Categories
- Basic Excel operations (formulas, functions)
- Data analysis and manipulation
- Advanced features (pivot tables, macros)
- Problem-solving scenarios

### Evaluation Criteria
- Technical accuracy
- Approach methodology
- Completeness of answers
- Problem-solving ability

## Sample Questions
- "How would you remove duplicates from a dataset in Excel?"
- "Explain how to create a dynamic pivot table"
- "What's the difference between VLOOKUP and INDEX-MATCH?"

## API Endpoints (Next.js API Routes)
- `POST /api/interview/start` - Initialize new interview session
- `POST /api/interview/answer` - Submit answer and get next question
- `GET /api/interview/[id]/report` - Get final assessment report
- `GET /api/health` - Health check endpoint

## Deployment
The Next.js application can be easily deployed to Vercel with one-click deployment, or to any platform supporting Node.js applications.

---

**Author**: AI Engineer Assignment Solution
**Date**: July 25, 2025
