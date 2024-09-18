// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from 'next-auth/react'; // Correctly import signIn from next-auth/react

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // Call the `signIn` function to handle authentication
      const result = await signIn('credentials', {
        redirect: false,  // We handle redirection ourselves
        email,
        password,
      });

      if (result?.error) {
        // If signIn returns an error
        res.status(401).json({ error: result.error });
      } else {
        // Successful authentication
        res.status(200).json({ success: true });
      }
    } catch (error) {
      // Handle unexpected errors
      res.status(500).json({ error: 'Something went wrong.' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
