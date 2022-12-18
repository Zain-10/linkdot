import prisma from "@/lib";
import { getEnv } from "@/utils/getEnv";

const generateOTP = async (email: string) => {
  console.log("Generating OTP for ", email);
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expiry = Number(getEnv("OTP_EXPIRY_IN_MILLI_SECONDS"));

  // convert to readable Date
  const expiresAt = new Date(Date.now() + expiry);

  const otpData = {
    email,
    otp,
    expiresAt,
  };

  await prisma.otp.create({
    data: otpData,
  });
  return otp;
};

const verifyOTP = async (email: string, otp: string) => {
  const otpData = await prisma.otp.findFirst({
    where: {
      email,
      otp,
    },
  });
  if (!otpData) {
    return false;
  }
  // Validate if OTP is expired or not
  const now = new Date();
  if (now > otpData.expiresAt) {
    return false;
  }
  return true;
};

export { generateOTP, verifyOTP };
