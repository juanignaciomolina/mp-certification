import Head from "next/head";

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
      {children}
    </div>
  );
}
