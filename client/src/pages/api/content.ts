import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const res = await fetch(`${process.env.SERVER_HOST}/api/contentlib/content`);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}


export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export let content: { name: string; items: Item[] }[] = [
  
];