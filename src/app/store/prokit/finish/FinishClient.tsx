"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type ClaimResponse = {
  success?: boolean;
  alreadyProvisioned?: boolean;
  alreadyCollaborator?: boolean;
  githubUsername?: string;
  error?: string;
  message?: string;
};

const GITHUB_USERNAME_PATTERN = /^[A-Za-z0-9-]{1,39}$/;

export default function FinishClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id")?.trim() || "";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [fallbackVisible, setFallbackVisible] = useState(!sessionId);

  const canSubmitSession = useMemo(
    () => !!sessionId && GITHUB_USERNAME_PATTERN.test(username.trim()) && !submitting,
    [sessionId, username, submitting]
  );

  const canSubmitEmailFallback = useMemo(() => {
    return !!email.trim() && GITHUB_USERNAME_PATTERN.test(username.trim()) && !submitting;
  }, [email, username, submitting]);

  async function submitClaim(payload: { session_id?: string; email?: string; github_username: string }) {
    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/store/prokit/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ClaimResponse;

      if (!response.ok) {
        const nextErrorCode = data.error || "server_error";
        setErrorCode(nextErrorCode);
        setErrorMessage(
          data.message ||
            "Something went wrong while linking your GitHub account. Please retry or contact support."
        );
        if (nextErrorCode === "invalid_session") {
          setFallbackVisible(true);
        }
        return;
      }

      setErrorCode("");
      const linkedUsername = (data.githubUsername || payload.github_username).trim();
      if (data.alreadyProvisioned) {
        setSuccessMessage(
          `Your purchase is already linked to @${linkedUsername}. Check your GitHub account for access.`
        );
      } else {
        const collaboratorLine = data.alreadyCollaborator
          ? "You already had collaborator access."
          : "You will receive an invite email from GitHub.";
        setSuccessMessage(
          `We've requested GitHub access for @${payload.github_username}. ${collaboratorLine} Once you accept it, you can clone the repository from your GitHub account.`
        );
      }
    } catch (error) {
      console.error("[store/prokit/finish] Claim request failed", error);
      setErrorCode("server_error");
      setErrorMessage(
        "Something went wrong while linking your GitHub account. Please retry or contact support."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function onSessionSubmit() {
    if (!canSubmitSession) {
      return;
    }
    submitClaim({ session_id: sessionId, github_username: username.trim() });
  }

  function onFallbackSubmit() {
    if (!canSubmitEmailFallback) {
      return;
    }
    submitClaim({
      email: email.trim(),
      github_username: username.trim(),
    });
  }

  const showFallback = !sessionId || fallbackVisible || errorCode === "invalid_session";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm uppercase tracking-wide text-slate-500">ProChat</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
        Finalize your ProKit access
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        You've completed payment. To unlock the private GitHub repository, we need your GitHub username.
      </p>

      <ol className="mt-6 space-y-2 text-slate-700 dark:text-slate-200">
        <li>
          1. Create a GitHub account, if you do not have one yet.{" "}
          <Link href="https://github.com/join" target="_blank" className="text-blue-600 underline">
            Create account
          </Link>
        </li>
        <li>2. Tell us your GitHub username.</li>
        <li>3. Accept the invite email from GitHub.</li>
      </ol>

      {sessionId ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#0B111B]">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Claim with checkout session</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Session detected. Enter your GitHub username to complete provisioning.
          </p>
          <div className="mt-4 space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              GitHub username
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="your-github-username"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-600 dark:bg-[#0B111B] dark:text-white"
              />
            </label>
            <button
              type="button"
              onClick={onSessionSubmit}
              disabled={!canSubmitSession}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Link GitHub username"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
          No checkout session was found in this URL. Use your checkout email below to recover access.
        </div>
      )}

      {showFallback && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#0B111B]">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recover access with checkout email</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Use the email you entered during Stripe checkout. We will find your latest paid ProKit purchase and link it.
          </p>
          <div className="mt-4 space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Checkout email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-600 dark:bg-[#0B111B] dark:text-white"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              GitHub username
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="your-github-username"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-600 dark:bg-[#0B111B] dark:text-white"
              />
            </label>
            <button
              type="button"
              onClick={onFallbackSubmit}
              disabled={!canSubmitEmailFallback}
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              {submitting ? "Checking purchase..." : "Find purchase and link access"}
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 p-4 text-green-800">
          {successMessage}
        </div>
      )}

      <p className="mt-8 text-sm text-slate-600 dark:text-slate-300">
        Lost your checkout email or seeing errors? Contact us at support@prochat.tools with your payment email and we
        will manually grant access.
      </p>
    </div>
  );
}
