import Head from "next/head";

export default function Page({
  title = "Mobile Store 2021",
  description = "Smarthpones and more...",
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
