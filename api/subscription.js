export default async function handler(req, res) {
  const { customerId } = req.query;

  if (!customerId) {
    return res.status(400).json({ error: "Missing customerId" });
  }

  try {
    const response = await fetch(`https://api.smartrr.com/customers/shopify/${customerId}/subscriptions`, {
      headers: {
        "Authorization": `Bearer ${process.env.SMARTRR_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ error: "No subscription found" });
    }

    const frequency = data[0]?.deliverySchedule?.interval || "Unknown";

    return res.status(200).json({ frequency });
  } catch (error) {
    console.error("Smartrr API error:", error);
    return res.status(500).json({ error: "Internal server error", detail: error.message });
  }
}
