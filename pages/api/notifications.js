import { supabase } from "../../supabase";

export default function handler(req, res) {
  // Return ASAP to avoid a timeout in MercadoPago
  res.set("Access-Control-Allow-Origin", "*"); // Allow CORS
  res.status(200);

  supabase.from("notifications").insert(
    { notification: req.body },
    {
      returning: "minimal", // Don't return the value after inserting
    }
  );
}
