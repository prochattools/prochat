import { NextResponse } from "next/server";

const UNKNOWN = "unknown";

export async function GET() {
  const revision = process.env.PROCHAT_GIT_SHA || UNKNOWN;
  const image = process.env.PROCHAT_IMAGE_REF || UNKNOWN;
  const builtAt = process.env.PROCHAT_BUILD_TIMESTAMP || UNKNOWN;

  return NextResponse.json(
    {
      service: "prochat",
      revision,
      image,
      builtAt,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "X-ProChat-Revision": revision,
      },
    },
  );
}
