# Database Setup for Deployment

## For Vercel Deployment

This application requires a PostgreSQL database. Here are the setup instructions:

### Option 1: Use Vercel Postgres (Recommended)

1. Go to your Vercel dashboard
2. Select your project
3. Go to the "Storage" tab
4. Click "Create Database" 
5. Select "Postgres"
6. Follow the setup wizard
7. Vercel will automatically add the DATABASE_URL environment variable

### Option 2: Use Neon (Free PostgreSQL)

1. Go to [Neon](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string
4. In Vercel, go to your project settings > Environment Variables
5. Add `DATABASE_URL` with your Neon connection string

### Option 3: Use Supabase (Free PostgreSQL)

1. Go to [Supabase](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string (make sure to replace [YOUR-PASSWORD])
5. In Vercel, go to your project settings > Environment Variables
6. Add `DATABASE_URL` with your Supabase connection string

### Environment Variables Needed in Vercel:

```
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=your_postgresql_connection_string_here
```

### After Setting Up the Database:

The application will automatically run `prisma generate` and create the necessary tables on first deployment.

If you need to manually run migrations:
```bash
npx prisma db push
```

## Local Development

For local development, you can use:
1. A local PostgreSQL instance
2. Docker with PostgreSQL
3. The same cloud database as production

Update your local `.env` file with the appropriate DATABASE_URL.
