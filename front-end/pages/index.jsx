import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const values = [
  {
    name: "Cost Savings",
    description:
      "By choosing our solutions, customers can save money in the long run through reduced energy costs, making sustainability financially advantageous.      ",
  },
  {
    name: "Sustainable Solutions",
    description:
      "We offer renewable energy solutions harnessing solar, wind, and hydro power, leading the way in environmental stewardship and reducing carbon emissions.      ",
  },
  {
    name: "Expertise and Innovation",
    description:
      "Our projects are driven by expertise, innovation, and a deep sense of responsibility, ensuring high-quality, efficient, and effective solutions for a cleaner, greener future.    ",
  },
];
const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "#" },
  { name: "Login", href: "/login" },
  { name: "Signup", href: "/signup" },
];



const posts = [
  {
    id: 1,
    title: "Solar Energy",
    href: "#",
    description:
      "Harness the power of the sun with our efficient solar energy solutions. Our solar panels efficiently convert sunlight into electricity, reducing your carbon footprint and energy costs.",
    imageUrl:
      "https://cdn.britannica.com/85/162485-050-7670426D/Solar-panel-array-rooftop.jpg",
  },
  {
    id: 1,
    title: "Wind power",
    href: "#",
    description:
      "Utilize the wind to generate clean, renewable energy for your home or business. Our wind turbines capture the kinetic energy of the wind and convert it into electricity, providing a sustainable energy source for your needs.",
    imageUrl:
      "https://assets.justenergy.com/wp-content/uploads/2020/11/wind-energy-image-definition.jpg",
    
  },

];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import ForgetPassword from "../components/ForgetPassword";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="">
      <Head>
        <title>Home Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-white">
        {/* Header */}
        <header className="sticky top-0 bg-white inset-x-0 z-50">
          <nav
          style={{ maxWidth: "100rem" }}
            className="flex items-center mx-auto  justify-between p-4 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-20 w-auto rounded-full"
                  src="https://static.vecteezy.com/system/resources/thumbnails/003/067/839/small/eco-green-leaf-icon-in-light-bulb-free-vector.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-green-500"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-14 w-auto"
                    src="https://static.vecteezy.com/system/resources/thumbnails/003/067/839/small/eco-green-leaf-icon-in-light-bulb-free-vector.jpg"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-400 text-gray-900 hover:bg-green-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-green-300"
                    >
                      
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>

        <main className="isolate ">
          {/* Hero section */}
          <div className="relative  ">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div className="py-24 sm:py-48 bg-green-300">
              <div
                style={{ maxWidth: "100rem" }}
                className="mx-auto    grid grid-cols-2 gap-8 px-6 lg:px-8"
              >
                <div className="mx-auto max-w-2xl text-left">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Welcome to Green Energy Solutions
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                  Empowering a sustainable future through innovative green energy solutions.
                  </p>
                  <div className="mt-10 flex items-center justify-start gap-x-6">
                    <a
                      href="#"
                      className="rounded-full bg-green-700 px-12 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Get started
                    </a>
                  </div>
                </div>
                <div className="">
                  <div className="-m-2 rounded-xl bg-gray-900/5 p-2  lg:-m-4 lg:rounded-2xl lg:p-4">
                    <img
                      src="https://www.innovationnewsnetwork.com/wp-content/uploads/2022/09/iStockBilanol-1309634668.jpg"
                      alt="App screenshot"
                      width={2432}
                      height={1442}
                      className="rounded-md shadow-2xl "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          {/* Values section */}
          <div className="  py-64">
            <div
              style={{ maxWidth: "100rem" }}
              className="mx-auto    px-6  lg:px-8"
            >
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="hover:bg-green-300 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  About Us
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                At Green Energy Solutions, our aim is to provide cleaner energy while creating solutions that help our customers save money. We're dedicated to offering unmatched sustainable energy solutions for individuals and businesses. Our mission is to lead a global shift towards environmental responsibility by leveraging renewable resources like solar, wind, and hydro power. Through innovation and efficiency, we're shaping a cleaner, greener future. Join us in powering a brighter, cleaner world, where sustainability is both eco-friendly and economically savvy.


                </p>
              </div>
              <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {values.map((value) => (
                  <div
                    className="shadow p-3 py-6 bg-white rounded-md ring-1 duration-200 hover:bg-green-300 ring-green-500"
                    key={value.name}
                  >
                    <dt className="font-semibold text-gray-900">
                      {value.name}
                    </dt>
                    <dd className="mt-1 text-gray-600">{value.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div  className=" py-12">
            <div  style={{ maxWidth: "100rem" }} className="mx-auto   px-6 lg:px-8">
              <div className="  max-w-2xl text-left">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Our Services
                </h2>
              
              </div>
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="flex flex-col bg-white rounded-2xl overflow-hidden items-start  justify-between"
                  >
                    <div className="relative w-full">
                      <img
                        src={post.imageUrl}
                        alt=""
                        className="aspect-[16/9] w-full   bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                      />
                      <div className="absolute inset-0 rounded-2xl " />
                    </div>
                    <div className="max-w-xl  px-5 py-6">
                      
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <a href={post.href}>
                            <span className="absolute inset-0" />
                            {post.title}
                          </a>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {post.description}
                        </p>
                      </div>
                      <div className="relative mt-8 flex items-center gap-x-4">
                        
                      <button className="w-full py-2.5 rounded-full text-white bg-green-600">Learn More</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          

         

          <div  style={{ maxWidth: "100rem" }} className="flex min-h-full mx-auto flex-1 items-start   justify-between px-4 py-64 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl  space-y-10">
        <h2 className="  text-left text-4xl font-bold leading-9 tracking-tight text-gray-900">
              Customer Support
            </h2>    
            <p className="text-md">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
        </div>
        <div  className="w-full max-w-3xl bg-gray-100 space-y-10">
          <div>
             
            
          </div>
          <form className="space-y-6 p-4" action="#" method="POST">
            <div className="relative space-y-5 rounded-md shadow-sm"> 
              <div>
                <label htmlFor="email-address" className=" ">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative px-3 block mt-2 w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="osamah kayyim"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="">
                  Email 
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative px-3 mt-2 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="Phone" className="">
                  Phone
                </label>
                <input
                  id="Phone"
                  name="phone"
                  type="tel"
                  autoComplete="phone"
                  required
                  className="relative px-3 mt-2 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="+90 ....."
                />
              </div>
              <div>
                <label htmlFor="topic" className="">
                  Topic
                </label>
                <input
                  id="topic"
                  name="topic"
                  type="topic"
                  autoComplete="topic"
                  required
                  className="relative px-3 block mt-2 w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="" 
                />
              </div>
              <div>
                <label htmlFor="password" className="">
                  Message
                </label>
                <textarea
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative mt-2 h-28 px-4 block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                >
                  </textarea>
              </div>
            </div>

            <div className="flex items-center justify-between">
               

               
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ask Question
              </button>
            </div>
          </form>

           
        </div>
      </div>
      <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
        
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2020 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
         
        </main>

        {/* Footer */}
       
      </div>
    </div>
  );
}
