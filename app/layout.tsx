import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
export const dynamic = 'force-dynamic'

export const revalidate = 0;

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
