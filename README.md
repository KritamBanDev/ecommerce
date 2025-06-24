# E-commerce Web Application

A modern, full-stack E-commerce platform built with Next.js, Sanity CMS, Stripe, Clerk authentication, and Zustand state management.

## 🚀 Features
- Product catalog, categories, and search
- Shopping cart with persistent state
- Secure checkout with Stripe payments
- Order management and user order history
- Admin studio (Sanity)
- Authentication with Clerk
- Responsive, modern UI (Tailwind CSS, Radix UI)
- Email notifications (Nodemailer)

## 🛠️ Tech Stack
- **Frontend:** Next.js 15, React 18, Tailwind CSS, Radix UI, Zustand
- **Backend:** Next.js API routes, Sanity CMS
- **Payments:** Stripe
- **Auth:** Clerk
- **Email:** Nodemailer
- **Other:** TypeScript, ESLint, Framer Motion, Embla Carousel

## 📁 Project Structure
```
app/                # Next.js app directory (pages, layouts, API, actions)
components/         # Reusable UI and business components
constants/          # Static data and config
hooks/              # Custom React hooks
lib/                # Utility libraries (Stripe, Sanity, etc.)
public/             # Static assets
sanity/             # Sanity CMS config and helpers
store/              # Zustand state stores
```

## ⚙️ Setup & Installation
1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd ecommerce
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local` and fill in all required values:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`
     - `SANITY_API_TOKEN`, `SANITY_API_READ_TOKEN`
     - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
     - `NEXT_PUBLIC_BASE_URL`, `VERCEL_URL` (for deployment)
     - `CLERK_*` (Clerk auth keys)
     - `CONTACT_EMAIL_USER`, `CONTACT_EMAIL_PASS` (for Nodemailer)

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

5. **Sanity Studio (Admin):**
   ```bash
   npx sanity start
   # or npm run typegen (for schema/type updates)
   ```

## 🏗️ Build & Production
- **Build:**
  ```bash
  npm run build
  ```
- **Start:**
  ```bash
  npm start
  ```

## 🌐 Deployment
- Recommended: [Vercel](https://vercel.com/)
- Set all environment variables in your Vercel/production dashboard
- Sanity Studio can be deployed separately (see Sanity docs)

## 🔌 Integrations
- **Stripe:** Payment processing
- **Sanity:** Headless CMS for products, categories, orders
- **Clerk:** Authentication and user management
- **Nodemailer:** Email notifications

## 🛡️ Security & Best Practices
- All secrets and API keys are loaded from environment variables
- `.gitignore` ensures no sensitive files are committed
- Linting and formatting enforced via ESLint
- Remove all debug logs before production

## 📄 License
MIT

---

> Built with ❤️ by your team. For questions, open an issue or PR.
