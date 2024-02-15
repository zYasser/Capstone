import Head from 'next/head';
import Login from '../components/Login';
import Signup from '../components/SignUp';
import ForgetPassword from '../components/ForgetPassword';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <Login />
      <Signup />
      <ForgetPassword />
    </div>
  );
}
