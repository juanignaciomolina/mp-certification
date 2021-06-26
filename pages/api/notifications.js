import { supabase } from "../../supabase";
import { MERCADOPAGO_ACCESS_TOKEN } from "../../configuration";

export default function handler(req, res) {
  res.status(200);

  const notification = req.body;
  const paymentId = notification.data.id;

  console.log(notification);
  console.log(paymentId);

  fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
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
