"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

interface UserType {
  email: string;
  name: string;
  password: string;
  signUp: boolean;
}

function Page() {
  const [user, setUser] = useState<UserType>({
    email: "",
    name: "",
    password: "",
    signUp: false,
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      const result = user.signUp
        ? await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
          })
        : await authClient.signIn.email({
            email: user.email,
            password: user.password,
          });

      if (result.error) {
        setError(
          result.error.message ?? "Authentication failed. Please try again.",
        );
        return;
      }

      router.push("/");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto w-[calc(100%-40px)] max-w-xl py-14">
    <form className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:p-8" onSubmit={handleSignIn}>
      <h1 className="mb-8 text-center text-4xl font-bold">Sign In</h1>
      {error && <p className="mb-4 text-red-300" role="alert">{error}</p>}
      <input
        className="mb-4 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition focus:border-white/40"
        type="email"
        autoComplete="email"
        required
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      {user.signUp && (
        <input
          className="mb-4 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition focus:border-white/40"
          autoComplete="name"
          required
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      )}
      <input
        className="mb-4 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition focus:border-white/40"
        type="password"
        autoComplete={user.signUp ? "new-password" : "current-password"}
        required
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <label className="mb-5 flex items-center gap-2 text-zinc-300">
        <input
          type="checkbox"
          checked={user.signUp}
          onChange={(e) => setUser({ ...user, signUp: e.target.checked })}
        />
        Sign up
      </label>
      <button className="rounded-full bg-white px-5 py-3 font-bold text-black disabled:opacity-50" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
    </main>
  );
}

export default Page;