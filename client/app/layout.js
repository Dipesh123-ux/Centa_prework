import "./globals.css";
import { Inter } from "next/font/google";
import AuthState from "@/actions/apicontext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <AuthState>{children}</AuthState>
        </main>
      </body>
    </html>
  );
}
