import "../globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Base/Nav/Sidebar";
import Player from "@/components/Player/Player";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import { userPlayLists } from "@/util/spotify/fetchUser";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import Header from "@/components/Base/Nav/Header";


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
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const playLists = await userPlayLists();

  return (
    <html lang="en" className={font.className}>
      <body>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar content={playLists}>
              <div
                className={`flex flex-col bg-neutral-900 h-full w-full overflow-scroll pb-24 scrollbar-none`}
              >
                <Header session={session} />
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
