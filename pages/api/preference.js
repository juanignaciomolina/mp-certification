import { supabase } from "../../supabase";
import { MERCADOPAGO_ACCESS_TOKEN } from "../../configuration";
import mercadopago from "mercadopago";

const PUBLIC_URL = "https://mp-certification.vercel.app";

export default function handler(req, res) {
  mercadopago.configure({
    access_token: MERCADOPAGO_ACCESS_TOKEN,
  });

  // PREFERENCE DATA HARDCODED AS DESCRIBED BY THE CHALLANGE SPECS
  const preference = {
    items: [
      {
        id: "1234",
        title: "Apple iPhone 12 Pro Max 256GB",
        description: "Dispositivo móvil de Tienda e-commerce",
        unit_price: 350000,
        quantity: 1,
        picture_url: `${PUBLIC_URL}/images/iphone_12.jpeg`,
        external_reference: "juanimolina92@hotmail.com",
      },
    ],
    payer: {
      email: "test_user_63274575@testuser.com",
      name: "Lalo",
      surname: "Landa",
      phone: {
        area_code: "11",
        number: "22223333",
      },
      address: {
        street_name: "Falsa",
        street_number: "123",
        zip_code: "1111",
      },
    },
    excluded_payment_methods: [
      {
        id: "amex",
      },
    ],
    excluded_payment_types: [
      {
        id: "atm",
      },
    ],
    auto_return: "approved",
    installments: 6,
    back_urls: {
      success: `${PUBLIC_URL}/payment/success`,
      failure: `${PUBLIC_URL}/payment/failure`,
      pending: `${PUBLIC_URL}/payment/pending`,
    },
    notification_url: `${PUBLIC_URL}/api/notifications?source_news=webhooks`,
  };

  mercadopago.preferences
    .create(preference)
    .then((response) =>
      supabase
        .from("preferences")
        .insert(
          { preference: response.body },
          {
            returning: "minimal", // Don't return the value after inserting
          }
        )
        .then(() => Promise.resolve(response))
    )
    .then((response) => {
      res.status(200).json({ preference: response.body });
    });
}
