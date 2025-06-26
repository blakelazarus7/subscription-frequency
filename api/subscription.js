export default async function handler(req, res) {
  const { subscriptionId } = req.query;

  if (!subscriptionId) {
    return res.status(400).json({ error: 'Missing subscriptionId' });
  }

  const url = `https://api.smartrr.com/subscriptions/${subscriptionId}`;

  const headers = {
    'Authorization': 'Bearer juTaTgaEAajJdAcTG0AsWUAjTJwTX00TFju', // ✅ Replace if needed
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Smartrr API error',
        status: response.status,
        response: text
      });
    }

    const data = JSON.parse(text);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      detail: err.message
    });
  }
}
