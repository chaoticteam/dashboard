import Head from "next/head";
import { useAuth } from "@/hooks";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const BASE_URL = publicRuntimeConfig.BASE_URL;
export default function Home(){
  const {state} = useAuth();
  return (
    <>
      <Head>
				<link
					rel="icon"
					href="/icon.svg"
					type="image/svg"
					sizes="any"
				/>
        <title>Chaoticteam Dashboard</title>
				<meta name="twitter:card" content="summary" />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="website" />
				<meta property="og:title" name="twitter:title" content="Dashboard for administrate chaoticteam apps" />
				<meta property="og:description" name="twitter:description"
					content="Dashboard for administrate chaoticteam apps" />
				{/* <meta property="og:image" name="twitter:image" content="" /> */}
				<meta property="og:url" name="twitter:url" content={`${BASE_URL}`}></meta>
			</Head>
      <main>
       <div>
        hello {state.user?.userName}
       </div>
      </main>
    </>
  );
}
