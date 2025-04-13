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
filter_group: {
  operator: "and",
  filters: [
    {
      type: "tag",
      operator: "equals",
      arg: search,
      name: "Tag Filter",
      inv: false,
      case_sensitive: false
    }
  ]
},
      limit: 10
    }),
  });

  const data = await response.json();
  console.log("📦 Response from Supernotes:", JSON.stringify(data, null, 2));
  res.status(200).json(data);
}
