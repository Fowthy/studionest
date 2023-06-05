import { fetchCategories } from '#/lib/room-options';
import { TabGroup } from '#/ui/tab-group';
import React from 'react';

export const metadata = {
  title: 'Nested Layouts',
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchCategories();
  return (
    <div className="space-y-9">
      <div>{children}</div>
      <div className="flex justify-between">
        <TabGroup
          path="/rooms"
          items={[
            {
              text: 'Save',
            },
            ...categories.map((x) => ({
              text: x.name,
              slug: x.slug,
            })),
          ]}
        />

      </div>

    </div>
  );
}
