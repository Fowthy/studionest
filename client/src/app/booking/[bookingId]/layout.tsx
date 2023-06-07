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
  return (
    <div className="space-y-9">
      <div className='bg-gray-1100 border-rounded rounded-md min-h-screen'>{children}</div>
    </div>
  );
}
