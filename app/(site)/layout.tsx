import "../globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player/Player";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import { userPlayLists } from "@/util/spotify/fetchUser";

import Header from "@/components/Header";
import ScrollToTop from "@/util/scrollToTop";

export const dynamic = 'force-dynamic'

const font = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const revalidate = 0;

export const metadata = {
  title: "Pyre",
  description: "Your personal player",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const playLists = await userPlayLists();

  return (
    <html lang="en" className={font.className}>
      <ScrollToTop />
      <body>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />

            <Sidebar content={playLists}>
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
