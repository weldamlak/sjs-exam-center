# 🎓 SJS Exam Center — ESSLCE Practice Portal

A full-stack, responsive web application built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Supabase**. Designed to help high school students practice and prepare for national ESSLCE and SAT examinations with interactive quiz modules, real-time explanations, and user performance tracking.

---

## ✨ Features

- 📚 **Stream Support**: Categorized subjects for both **Natural Science** and **Social Science** streams.
- ⚡ **Interactive Exam Runner**: Instant answer checking, score tracking, and detailed question explanations.
- 🔐 **User Authentication**: Secure signup/login and session management powered by Supabase Auth.
- 📊 **Performance History**: Automatically saves exam results and score percentages to a user dashboard.
- 🛡️ **Row Level Security (RLS)**: PostgreSQL database policies ensuring users can only read/write their own score records.
- 📱 **Fully Mobile Responsive**: Dark-themed, modern UI crafted with Tailwind CSS.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL & Auth)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have installed:
- [Node.js](https://nodejs.org/) (v18.x or later)
- `npm` or `pnpm`

### 2. Clone & Install Dependencies

```bash
git clone [https://github.com/your-username/sjs-exam-center.git](https://github.com/your-username/sjs-exam-center.git)
cd sjs-exam-center
npm install