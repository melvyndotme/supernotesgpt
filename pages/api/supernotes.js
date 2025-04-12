export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { search } = req.body;

  // 🔍 Debug: log the input
  console.log("🔍 Supernotes Search:", search);

  // 🔐 Debug: log the first few characters of your API key
  console.log("🔐 SUPERNOTES_API_KEY (first 5):", process.env.SUPERNOTES_API_KEY?.slice(0, 5));

  const response = await fetch('https://api.supernotes.app/jit-plugin/cards/selectCards', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SUPERNOTES_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      search,
      limit: 10,
    }),
  });

  // ✅ Add this block to inspect the response
  const data = await response.json();
  console.log("📦 Response from Supernotes:", JSON.stringify(data, null, 2));
  res.status(200).json(data);
}
