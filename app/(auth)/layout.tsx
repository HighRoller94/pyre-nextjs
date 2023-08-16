import "../globals.css";
import { Figtree } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";

const font = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata = {
  title: "Pyre",
  description: "Your personal player",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <SupabaseProvider>{children} </SupabaseProvider>
      </body>
    </html>
  );
}
