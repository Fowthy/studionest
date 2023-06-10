import type { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, location, description, pricePerHour, type, owner, owner_uid } = req.body;
      console.log(req.body, ' tuk')
      const formData = new FormData();
      formData.append('room', JSON.stringify({ name, location, description, pricePerHour, type, owner, owner_uid }));

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: req.body,
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