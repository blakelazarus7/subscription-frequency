export default async function handler(req, res) {
  const { subscriptionId } = req.query;

  if (!subscriptionId) {
    return res.status(400).json({ error: 'Missing subscriptionId' });
  }

  const url = `https://api.smartrr.com/subscriptions/${subscriptionId}`;

  const headers = {
    'Authorization': 'Bearer juTaTgaEAajJdAcTg0ASwUUAjTJwTX00TFju', // Replace with your actual Smartrr token if different
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Smartrr API error: ${response.status}`
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      detail: err.message
    });
  }
}
