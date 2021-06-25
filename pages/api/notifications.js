import { supabase } from "../../supabase";

export default function handler(req, res) {
  res.status(200);

  const notification = req.body;
  const paymentId = notification.data.id;

  console.log(notification);
  console.log(paymentId);

  fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${mercadoPagoAccessToken}`,
    }),
  })
    .then((response) => {
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
    })
    .then((paymentData) =>
      supabase.from("notifications").insert(
        { notification: notification, payment: paymentData },
        {
          returning: "minimal", // Don't return the value after inserting
        }
      )
    );

  return Promise.resolve();
}
