import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      //get token from request header
      let token = req.headers.authorization;
      console.log(token, 'test before')

      const requestOptions = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token ? token : "" },
      };

      const response = await fetch(`${process.env.SERVER_HOST}/api/auth/user`, requestOptions); // Replace with your FastAPI server URL
      const data = await response.json();

      if (response.ok) {
        res.status(201).json(data);
      } else {
        res.status(response.status).json(data);
      }
    } catch (error) {
      res.status(500).json({ message: null });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}