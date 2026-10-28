import Link from "next/link";

function Nav() {
  return (
    <nav className="w-full bg-black px-5 py-4 text-white sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3">
        <Link
          href="/"
          className="mr-2 shrink-0 text-lg font-semibold tracking-tight text-white"
        >
          My Blog
        </Link>
        <Link
          href="/"
          className="text-sm text-white transition hover:text-stone-300 hover:underline"
        >
          Home
        </Link>
        <Link
          href="/blogs"
          className="text-sm text-white transition hover:text-stone-300 hover:underline"
        >
          Blogs
        </Link>
        <Link
          href="/post"
          className="text-sm text-white transition hover:text-stone-300 hover:underline"
        >
          Write a post
        </Link>
        <Link
          href="/about"
          className="text-sm text-white transition hover:text-stone-300 hover:underline"
        >
          About
        </Link>
        <Link
          href="/signin"
          className="ml-auto rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-stone-200"
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
