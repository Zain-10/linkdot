import prisma from "@/lib";
import { getEnv } from "@/utils/getEnv";

const getOtp = async (email: string) => {
  return prisma.otp.findFirst({
    where: {
      email,
    },
  });
};
const generateOTP = async (email: string) => {
  console.log("Generating OTP for ", email);
  // Check if OTP already exists for the email
  const existingOtp = await getOtp(email);

  if (existingOtp) {
    // Delete the existing OTP
    await prisma.otp.delete({
      where: {
        id: existingOtp.id,
      },
    });
  }
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

const validateOtp = async (email: string, otp: string) => {
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

const deleteOtp = async (email: string) => {
  // find the otp
  const otp = await getOtp(email);
  if (otp) {
    await prisma.otp.delete({
      where: {
        id: otp.id,
      },
    });
  }
};

export { deleteOtp, generateOTP, getOtp, validateOtp };
