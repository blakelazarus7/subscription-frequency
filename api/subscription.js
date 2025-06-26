export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://www.eatfare.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { subscriptionId } = req.query;

  if (!subscriptionId) {
    return res.status(400).json({ error: "Missing subscriptionId" });
  }

  try {
    const response = await fetch(`https://api.smartrr.com/subscriptions/${subscriptionId}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer juTaTgaEAajJdAcTg0ASwUUAjTJwTX00TFju",
        "Content-Type": "application/json"
      }
    });

    const contract = await response.json();

    if (!contract || !contract.billingPolicy || !contract.lines || !contract.lines.length) {
      return res.status(404).json({ error: "Subscription not found or invalid format" });
    }

    const frequency = contract.billingPolicy.interval === "WEEK" ? "Weekly" : `${contract.billingPolicy.intervalCount} ${contract.billingPolicy.interval}`;
    const boxSize = contract.lines[0].title;

    return res.status(200).json({
      boxSize,
      frequency
    });

  } catch (err) {
    console.error("Error fetching from Smartrr:", err);
    return res.status(500).json({
      error: "Internal server error",
      detail: err.message
    });
  }
}
