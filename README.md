# Janitor Match

Janitor Match is a discovery-first JanitorAI companion recommendation app. It helps users find the right character faster by surfacing personality, vibe, mood, and style with clean search + recommendation tooling.

## Features

- Discover characters by archetype, tone, tags, and relationship style
- Personalized recommendation engine
- Search and filtering UI
- Character detail pages
- Saved / favorite library flow
- Demo-first architecture with Prisma-ready schema

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Optional embeddings-based recommendation builder

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your environment file:
   ```bash
   cp .env.example .env
   ```

3. Push your Prisma schema:
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. Seed sample characters:
   ```bash
   npm run db:seed
   ```

5. Start the app:
   ```bash
   npm run dev
   ```

## Demo mode

The app includes a mock-data mode so it works immediately even without a connected database. API routes such as `/api/characters`, `/api/recommendations`, and `/api/demo` serve local demo data by default.

## Product goal

Reduce the “too many characters, not enough discovery” problem that exists in large AI character libraries.
