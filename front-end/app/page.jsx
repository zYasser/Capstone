import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <Head>
        <title>Home Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>

      <h1
        className="text-3xl py-8 
      "
      >
        Home Page
      </h1>
      <Link href="/signup" className="block underline">
        Create Account{" "}
      </Link>
      <Link className="underline" href="/login">
        Login{" "}
      </Link>
    </div>
  );
}
