import "../globals.css";
import { Figtree } from "next/font/google";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player/Player";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/util/getSongsByUserId";
import fetchRecentlyPlayed from "@/util/spotify/fetchSpotifyRecent";
import { fetchUserById, fetchUserDevices } from "@/util/spotify/fetchUser";

import Header from "@/components/Header";
import ScrollToTop from "@/util/scrollToTop";

const font = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

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
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const recentPlayed = await fetchRecentlyPlayed();
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en" className={font.className}>
      <ScrollToTop />
      <body>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />

            <Sidebar songs={recentPlayed ? recentPlayed : userSongs}>
              <div
                className={`flex flex-col bg-neutral-900 rounded-lg min-h-screen h-auto w-full pb-16 overflow-hidden`}
              >
                <Header />
                {children}
              </div>
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
