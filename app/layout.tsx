import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";

export const metadata = {
  title: "Pyre",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <UserProvider>{children}</UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
