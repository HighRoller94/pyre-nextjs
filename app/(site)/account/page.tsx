import AccountContent from './components/AccountContent'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import TitleComponent from '@/components/Base/TitleComponent';
export default async function AccountPage() {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      <TitleComponent
        header={"My Account"}
        pageTitle={true}
      />
      <AccountContent />
    </div>
  );
}
