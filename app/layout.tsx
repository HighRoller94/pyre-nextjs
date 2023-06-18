import "./globals.css";
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
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const spotifyPremium = await fetchUserById(session?.user.user_metadata.provider_id)
  const spotifyDevices = await fetchUserDevices()
  // console.log(spotifyDevices)
  const recentPlayed = await fetchRecentlyPlayed();
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={recentPlayed ? recentPlayed : userSongs}>
              {children}
            </Sidebar>
            <Player devices={spotifyDevices?.devices} status={spotifyPremium}/>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
