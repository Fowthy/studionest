import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(process.env.SERVER_HOST, 'testovicc')

    const response = await fetch(`${process.env.SERVER_HOST}/api/roomman/rooms`, 
    )
    // let text = await response.text()/// Replace with your FastAPI server URL
    const data = await response.json()
    // console.log(data, '')
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching studios:', error)
    res.status(500).json({ message: 'Error fetching studios' })
  }
}