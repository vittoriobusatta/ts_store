import stripeClient from 'libs/stripe';

export default async function handler(req: any, res: any): Promise<void> {
  const { sessionId } = req.query;
  try {
    const session = await stripeClient.checkout.sessions.retrieve(
      sessionId as string,
    );
    res.status(200).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Session not found' });
  }
}
