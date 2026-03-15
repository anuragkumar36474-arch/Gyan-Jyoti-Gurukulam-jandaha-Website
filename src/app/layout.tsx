import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import PWARegistration from "@/components/PWARegistration";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gyan Jyoti Gurukulam - Empowering Young Minds",
  description: "Empowering young minds with knowledge and values since 2000 in Jandaha, Vaishali.",
  themeColor: "#050508",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Gyan Jyoti",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `tailwind.config = { theme: { extend: { colors: { primary: '#f82659', secondary: '#ff9d00', 'bg-base': '#030305' } } } }`
        }} />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <PWARegistration />
        {children}
      </body>
    </html>
  );
}
