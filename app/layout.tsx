import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/util/getSongsByUserId";
import fetchRecentlyPlayed from "@/util/spotify/fetchSpotifyRecent";
const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Pyre",
  description: "Your personal player",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const recentPlayed = await fetchRecentlyPlayed();
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={recentPlayed ? recentPlayed : userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
