import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const uid = req.headers['uid']
    const response = await fetch(`${process.env.SERVER_HOST}/api/booking/booking/user/${uid}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }) 
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching studio:', error)
    res.status(500).json({ message: 'Error fetching studios' })
  }
}