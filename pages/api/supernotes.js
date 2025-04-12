export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { search } = req.body;

  const response = await fetch('https://api.supernotes.app/jit-plugin/cards/selectCards', {
    method: 'POST',
    headers: {
      'Api-Key': process.env.SUPERNOTES_API_KEY, // ✅ CORRECT HEADER NAME
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      search,
      limit: 10,
    }),
  });

  const data = await response.json();
  console.log("📦 Response from Supernotes:", JSON.stringify(data, null, 2));
  res.status(200).json(data);
}
