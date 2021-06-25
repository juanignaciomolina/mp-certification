import Head from "next/head";
import Script from "next/script";

export default function Page({
  title = "Piña Store",
  description = "Smarthpones and more...",
  view = "home",
  children,
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://www.mercadopago.com/v2/security.js"
        view={view}
        strategy="beforeInteractive"
      />
      {children}
    </div>
  );
}
