import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { text } = req.body;

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: req.body,
      };

      console.log(req.body, ' tuk')

      const response = await fetch(`${process.env.SERVER_HOST}/api/aihelper/chatbot`, requestOptions); // Replace with your FastAPI server URL
      const data = await response.json();

      if (response.ok) {
        res.status(201).json(data);
      } else {
        console.log(response, response.status, data, 'olele')
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