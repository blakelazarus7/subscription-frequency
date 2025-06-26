
export default async function handler(req, res) {
  const { customerId } = req.query;

  if (!customerId) {
    return res.status(400).json({ error: "Missing customerId" });
  }

  try {
    const response = await fetch(`https://api.smartrr.com/customers/shopify/${customerId}/subscriptions`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer juTaTgaEAajJdAcTg0ASwUUAjTJwTX00TFju",
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `Smartrr API error: ${response.status}`, detail: errText });
    }

    const data = await response.json();
    const subscription = data[0]; // Assumes only one subscription per customer

    if (!subscription) {
      return res.status(404).json({ error: "No subscription found" });
    }

    const frequency = subscription.selling_plan?.name || "Unknown";

    return res.status(200).json({ frequency });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error", detail: err.message });
  }
}
