import { NextApiRequest, NextApiResponse } from 'next';
import { LoopsClient } from 'loops';

const loops = new LoopsClient(process.env.NEXT_PUBLIC_LOOPS_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, downloadUrl, applicationName } = req.body;

  if (!email || !downloadUrl || !applicationName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create or update contact
    await loops.createContact(email);

    // Send event
    await loops.sendEvent({
      email,
      eventName: 'application_download',
      eventProperties: {
        download_url: downloadUrl,
        application_name: applicationName,
      },
    });

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
}