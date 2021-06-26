import { supabase } from "../../supabase";
import { MERCADOPAGO_ACCESS_TOKEN } from "../../configuration";

export default async function handler(req, res) {
  // Must return 200 ASAP to avoid a timout. See: https://www.mercadopago.com.ar/developers/es/guides/notifications/webhooks
  res
    .status(200)
    .json({ status: "Notification acknowledged and being processed..." });

  await processNotification(req.body);
}

async function processNotification(notification) {
  const paymentId = notification.data.id;

  const paymentData = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
      }),
    }
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(
        new functions.https.HttpsError(
          "unknown",
          `Can't retrieve information from MercadoPago for payment with ID: ${paymentId}`
        )
      );
    }
  });

  await supabase.from("notifications").insert(
    { paymentId: paymentId, notification: notification, payment: paymentData },
    {
      returning: "minimal", // Don't return the value after inserting
    }
  );

  return Promise.resolve();
}
