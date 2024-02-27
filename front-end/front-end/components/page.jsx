"use client";

import CustomerSupportSection from "@/components/CustomerSupport";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import greenPlantImage from "../public/green-energy.jpg";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="transition-opacity">
        <header className="bg-gradient-to-r from-green-500 to-green-400 text-white py-24 px-4 ">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-5xl font-bold mb-4">
                Welcome to Green Energy Solutions
              </h1>
              <p className="text-lg text-black font-bold ">
                Empowering a sustainable future through innovative green energy
                solutions
              </p>
              <button className="mt-8 bg-white text-green-600 py-2 px-6 rounded-full hover:bg-green-100 hover:text-green-700 font-semibold">
                Learn More
              </button>
            </div>
            <div className="lg:w-1/2">
              <img
                src="./green-energy.jpg"
                alt="Green Plant"
                className="rounded-lg"
              />
            </div>
          </div>
        </header>

        <section class="bg-green-100 py-16">
          <div class="container my-10 bg-white shadow-lg mx-auto py-20 px-3 rounded-xl">
            <h2 class="text-3xl font-bold mb-8 text-center">About Us</h2>
            <p class="text-lg text-center font-serif font-bold ">
              At Green Energy Solutions, our aim is to provide cleaner energy
              while creating solutions that help our customers save money. We're
              dedicated to offering unmatched sustainable energy solutions for
              individuals and businesses. Our mission is to lead a global shift
              towards environmental responsibility by leveraging renewable
              resources like solar, wind, and hydro power. Through innovation
              and efficiency, we're shaping a cleaner, greener future. Join us
              in powering a brighter, cleaner world, where sustainability is
              both eco-friendly and economically savvy.
            </p>
          </div>
          <div className="m-5">
            <Card />
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
                <div className="flex flex-col items-center">
                  <img
                    src="./solar.png"
                    alt="Solar Energy"
                    className="mb-4 rounded-lg"
                  />
                  <h3 className="text-xl font-semibold mb-2">Solar Energy</h3>
                  <p>
                    Harness the power of the sun with our efficient solar energy
                    solutions. Our solar panels efficiently convert sunlight
                    into electricity, reducing your carbon footprint and energy
                    costs.
                  </p>
                </div>
                <button className="mt-4 bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 font-semibold">
                  Learn More
                </button>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
                <div className="flex flex-col items-center">
                  <img
                    src="./wind.png"
                    alt="Wind Energy"
                    className="mb-4 rounded-lg "
                  />
                  <h3 className="text-xl font-semibold mb-2">Wind Energy</h3>
                  <p>
                    z Utilize the wind to generate clean, renewable energy for
                    your home or business. Our wind turbines capture the kinetic
                    energy of the wind and convert it into electricity,
                    providing a sustainable energy source for your needs.
                  </p>
                </div>
                <button className="mt-4 bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <CustomerSupportSection />
      <Footer />
    </div>
  );
}
