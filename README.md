# Blog

This is a simple blog website. People can read stories, make an account, and write their own posts.

![Blog preview](https://github.com/user-attachments/assets/bdfd9938-ec41-463b-ac50-df63dfb0b02b)

**[Try the live demo](https://blog-alpha-nine-57.vercel.app/)**

## What it can do

- Read posts on the home page and the posts page
- Read individual posts on their own pages
- Create an account or sign in with email and password
- Write posts with a title and paragraphs
- Store posts and authentication data in MongoDB
- Responsive, dark interface built with Tailwind CSS

## How to run it

1. Download this project and open the project folder.
2. Install the things it needs with `npm install`.
3. Create a `.env.local` file with your MongoDB connection string:

   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.example.mongodb.net/blog
   ```

4. Start the development server:

   ```powershell
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

> A MongoDB database is required for both blog posts and authentication.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Made with

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- [MongoDB](https://www.mongodb.com/) and [Mongoose](https://mongoosejs.com/)
- [Better Auth](https://www.better-auth.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Simple folder guide

- `app` contains the website pages
- `components` contains parts used by more than one page
- `lib` contains the database and sign-in code

## Settings

| Variable | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB connection string used for posts and users |
| `BETTER_AUTH_SECRET` | Optional on your computer, but use it when the site is online |
| `BETTER_AUTH_URL` | Public base URL of the site in production |

## Deployment

Before deploying, add `MONGO_URI` and the authentication settings to your hosting provider. Set `BETTER_AUTH_URL` to the deployed site's public URL, such as:

```env
BETTER_AUTH_URL=https://your-blog.example.com
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
```

## Credits

Created for the Hack Club Stardance Challenge, with setup guidance from the Stardance README resource.
