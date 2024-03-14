import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnection } from "@/lib/mongodb";
import { User } from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await mongooseConnection;

      const { email, otp } = req.body;

      const user = await User.findOne({ email, otp });

      if (user) {
        await User.updateOne({ email }, { verified: true });

        res.status(200).json({ message: "Email verified successfully" });
      } else {
        res.status(400).json({ error: "Invalid OTP" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
