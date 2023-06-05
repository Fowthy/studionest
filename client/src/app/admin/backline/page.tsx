"use client";

import { host } from "#/constants";
import { Studio } from "#/ui/studio";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  // const res = await fetch(`${host}/studios`);
  // const data: Studio[] = await res.json();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // const res = await fetch(`${host}/studios`);
  // const data: Studio[] = await res.json();

  return (
    // <div className="prose prose-sm prose-invert max-w-none" onClick={Redirect}>asdasd</div>
    <div className="prose prose-sm prose-invert max-w-none justify-between flex-row">
      <div>Backline</div>
    </div>
  );
}
