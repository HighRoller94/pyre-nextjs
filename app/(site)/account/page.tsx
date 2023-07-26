import AccountContent from './components/AccountContent'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function AccountPage() {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session)
  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-auto w-full overflow overlow-y-hidden px-6">
      <div className="mt-4 mb-2 flex flex-col gap-y-6">
        <h1 className="text-white text-5xl font-bold">My Account</h1>
      </div>
      <AccountContent />
    </div>
  );
}
