import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const fonts = `${ubuntu.variable}`