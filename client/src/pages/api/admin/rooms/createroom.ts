import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, location, description } = req.body;

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, description }),
      };

      const response = await fetch(`${process.env.SERVER_HOST}/api/roomman/room`, requestOptions); // Replace with your FastAPI server URL
      const data = await response.json();

      if (response.ok) {
        res.status(201).json(data);
      } else {
        res.status(response.status).json(data);
      }
    } catch (error) {
      console.error('Error adding studio:', error);
      res.status(500).json({ message: 'Error adding studio' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}