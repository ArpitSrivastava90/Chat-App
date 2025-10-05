import { Resend } from "resend";
import { ENV } from "./env.js";

const RESEND_API_KEY = ENV.RESEND_API_KEY;

const EMAIL_FROM_NAME = ENV.EMAIL_FROM_NAME;
const EMAIL_FROM = ENV.EMAIL_FROM;

export const resendClient = new Resend(RESEND_API_KEY);
export const sender = {
  name: EMAIL_FROM_NAME,
  email: EMAIL_FROM,
};
