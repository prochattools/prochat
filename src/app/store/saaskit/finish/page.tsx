export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import FinishClient from "./FinishClient";

export default function SaaskitFinishPage() {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-slate-600">Loading checkout status…</div>}>
      <FinishClient />
    </Suspense>
  );
}
