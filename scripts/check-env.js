const requiredEnvVars = [
  "CLERK_SECRET_KEY",
  "RESEND_API_KEY",
  "DATABASE_URL",
  "STRIPE_MODE"
];

const missing = requiredEnvVars.filter((key) => {
  const value = process.env[key];
  return value === undefined || value === null || value.trim() === "";
});

if (missing.length > 0) {
  console.error("❌ Missing required environment variables:", missing.join(", "));
  console.error("Please configure them in Dokploy before starting the application.");
  process.exit(1);
}

const stripeMode = process.env.STRIPE_MODE?.toLowerCase();
const stripeSecretVar =
  stripeMode === "live" ? "STRIPE_SECRET_KEY_LIVE" : "STRIPE_SECRET_KEY_TEST";

if (!process.env[stripeSecretVar] || !process.env[stripeSecretVar].trim()) {
  console.error(
    "❌ Missing Stripe secret for mode",
    process.env.STRIPE_MODE,
    `(${stripeSecretVar})`
  );
  process.exit(1);
}

console.log("✅ All critical environment variables are present.");
