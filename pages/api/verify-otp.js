import { supabase } from "../../supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, token } = req.body;
  if (!phone || !token) {
    return res.status(400).json({ error: "Phone and token are required" });
  }

  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: "OTP verified", data });
}
