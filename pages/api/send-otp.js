import { supabase } from "../../supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const { data, error } = await supabase.auth.signInWithOtp({ phone });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: "OTP sent", data });
}
