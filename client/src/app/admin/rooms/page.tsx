"use client";

import { RoomClass } from "#/types";
import { Studio } from "#/ui/studio";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  // const res = await fetch(`${host}/studios`);
  // const data: Studio[] = await res.json();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/rooms/rooms")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    // <div className="prose prose-sm prose-invert max-w-none" onClick={Redirect}>asdasd</div>
    <div className="prose prose-sm prose-invert max-w-none justify-between flex-row">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="text-xl font-bold">Rooms</h1>
          <div className="grid grid-cols-4 gap-4">
            {data &&
              (data as RoomClass[]).map((section: RoomClass) => (
                <Studio
                  key={section._id}
                  id={section._id}
                  name={section.name}
                  description={section.desc}
                  redirect={true}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
