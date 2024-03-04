import changeMyPassword from "@/api/changeMyPassword";
import React, { useState } from "react";
import DynamicAlert from "./DynamicAlert";
import Spanner from "./Spanner";
import DynamicSucceedAlert from "./DynamicSucceedAlert";

const ChangePasswordForm = ({ id }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fetch, setFetch] = useState(false);
  const [error, setError] = useState("");

  const [vaild, setValid] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== newPassword) {
      setError(
        "The password you entered does not match the confirmed password. Please try again."
      );
      return;
    }
    setFetch(true);
    const obj = {
      old_password: currentPassword,
      new_password: newPassword,
    };
    let { success, error } = await changeMyPassword(id, obj);
    if (success) {
      setValid(success);
      setError("");
    } else {
      setError(error);
      setValid("");
    }
    setFetch(false);

    // Add your password change logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="pb-5">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-4">Change Password</h1>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="current-password"
          >
            Current Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="current-password"
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="new-password"
          >
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="new-password"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm-password"
          >
            Confirm New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm-password"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between flex-row-reverse">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={fetch}
          >
            {fetch ? <Spanner /> : "Change Password"}
          </button>
        </div>
      </div>
      {vaild && <DynamicSucceedAlert message={vaild} />}
      {error && <DynamicAlert error={error} />}
    </form>
  );
};

export default ChangePasswordForm;
