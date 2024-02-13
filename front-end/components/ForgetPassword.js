import React, { useState } from 'react';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendVerification = () => {
    // Here you would implement logic to send verification code to the provided email
    // For demonstration purposes, let's just set a message
    setMessage('The email has been sent. Please check your email address.');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'url("https://www.innovationnewsnetwork.com/wp-content/uploads/2022/09/iStockBilanol-1309634668.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-black p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-white font-bold mb-4">Forgot Password</h2>
        <label htmlFor="email" className="block mb-2 text-white">Enter your email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSendVerification}
          className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
        >
          Send Reset Password
        </button>
        {message && <p className="text-white mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default ForgetPassword;