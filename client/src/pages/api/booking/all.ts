import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(process.env.SERVER_HOST, 'testovicc')

    const response = await fetch(`${process.env.SERVER_HOST}/api/booking/bookings`) // Replace with your FastAPI server URL
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching studios:', error)
    res.status(500).json({ message: 'Error fetching studios' })
  }
}