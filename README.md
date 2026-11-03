# Blog

A blog to browse posts and create accounts to make your own!

![Blog preview](https://github.com/user-attachments/assets/bdfd9938-ec41-463b-ac50-df63dfb0b02b)

**[Live demo](https://blog-alpha-nine-57.vercel.app/)**

## Features

- Browse posts on home and full posts pages
- View individual posts on their own pages
- Sign up or sign in with email and password
- Create posts with a title and several paragraphs
- Data stored in MongoDB
- Dark UI using Tailwind CSS

## Getting started

1. Clone the repo and cd into the folder.
2. Install dependencies using `npm install`.
3. Create a `.env.local` file with your MongoDB connection string:

   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.example.mongodb.net/blog
   ```

4. Run the dev server:

   ```powershell
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

> Requires a MongoDB database for both posts and authentication.

## Scripts

| Command        | What it does                    |
| ------------- | ------------------------------- |
| `npm run dev` | Starts the development server  |
| `npm run build` | Creates a production build    |
| `npm run start` | Starts the production server |
| `npm run lint`  | Runs ESLint                  |

## Stuff used

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- [MongoDB](https://www.mongodb.com/) and [Mongoose](https://mongoosejs.com/)
- [Better Auth](https://www.better-auth.com/)
- [TypeScript](https://www.typescriptlang.org/)

## How it works

The Next.js server fetches posts from MongoDB to render blog pages. Submissions are validated server side before being saved to MongoDB using a Mongoose model.

Better Auth takes care of signing up and signing in with email and password. The routes are mounted using the Next.js API handler and use the same MongoDB connection as the blog.

## Environment variables

| Variable              | What it does                 |
| -------------------- | --------------------------- |
| `MONGO_URI`          | MongoDB connection string for posts and users |
| `BETTER_AUTH_SECRET` | Used to secure auth sessions (not required for local dev) |
| `BETTER_AUTH_URL`     | Public base URL of the site (needed only in production) |

## Deploying

To deploy, add the following environment variables (without the example parts):

```env
MONGO_URI=mongodb+srv://username:password@cluster.example.mongodb.net/blog
BETTER_AUTH_SECRET=long-secret-to-protect-sessions
BETTER_AUTH_URL=https://your-blog.example.com
```

## Credits

Made for the Hack Club Stardance Challenge!
