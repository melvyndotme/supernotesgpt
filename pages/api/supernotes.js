export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { search } = req.body;

  const response = await fetch('https://api.supernotes.app/v1/cards/get/select', {
    method: 'POST',
    headers: {
      'Api-Key': process.env.SUPERNOTES_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tags: [search],  // ✅ searching by tag
      limit: 10
    }),
  });

  const data = await response.json();
  console.log("📦 Response from Supernotes:", JSON.stringify(data, null, 2));
  res.status(200).json(data);
}
