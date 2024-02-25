import React, { useState } from "react";

const CustomerSupportSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send data to backend or display a confirmation message
    console.log(formData);
  };

  return (
    <section className="bg-green-200 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Customer Support
        </h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-800 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-800 font-semibold mb-2"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="topic"
              className="block text-gray-800 font-semibold mb-2"
            >
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-800 font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};
export default CustomerSupportSection;
