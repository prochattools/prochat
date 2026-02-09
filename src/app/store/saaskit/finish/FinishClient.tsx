"use client";

import { useMemo, useState } from "react";

export default function FinishClient({ sessionId }: { sessionId: string }) {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const disabled = useMemo(() => status === "loading" || !username.trim(), [status, username]);

  const submit = async () => {
    if (!sessionId) {
      setError("Missing session_id. Please open the success link from Stripe or contact info@prochat.tools.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/store/saaskit/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, github_username: username.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-wide text-slate-500">ProChat</p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Finish checkout</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          1) Create a GitHub account if you don’t have one. 2) Enter your GitHub username below. 3) Accept the invite
          you’ll receive on GitHub.
        </p>
      </div>

      {!sessionId && (
        <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 p-4">
          Missing Stripe session. Use the success link from Stripe or contact info@prochat.tools.
        </div>
      )}

      <div className="space-y-4">
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
          GitHub username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your-github-handle"
            className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0B111B] px-3 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </label>
        <button
          onClick={submit}
          disabled={disabled}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-60"
        >
          {status === "loading" ? "Submitting…" : "Submit username"}
        </button>
        {status === "success" && (
          <div className="rounded-lg border border-green-300 bg-green-50 text-green-800 p-4">
            Your GitHub access request has been sent. Check your GitHub invites and email for confirmation.
          </div>
        )}
        {status === "error" && error && (
          <div className="rounded-lg border border-red-300 bg-red-50 text-red-800 p-4">{error}</div>
        )}
      </div>
    </div>
  );
}
