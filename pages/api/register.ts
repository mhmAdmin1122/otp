import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "./mailer";
import { mongooseConnection } from "@/lib/mongodb";
import { User } from "@/models/User";

const generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await mongooseConnection();

      const { email } = req.body;

      let user = await User.findOne({ email });

      const otp = generateOTP();
      if (!user) {
        // const otp = generateOTP();
        user = await User.create({ email, otp });

        await sendEmail(
          email,
          "OTP for Email Verification",
          `Your OTP is: ${otp}`
        );
      } else {
        await User.updateOne({ email }, { otp: generateOTP() });
        await sendEmail(
          email,
          "OTP for Email Verification",
          `Your OTP is: ${otp}`
        );
      }

      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
