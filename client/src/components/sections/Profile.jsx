import React from "react";

const Profile = () => {
  return (
    <>
      <h1 className="font-bold text-2xl tracking-wide">Profile Information</h1>
      <form action="" className="grid grid-cols-2 gap-8 mt-6">
        <div className="grid gap-3">
          <label htmlFor="" className="text-gray-600">
            First Name
          </label>
          <input
            type="text"
            required
            defaultValue="Jessica"
            className="border p-3 rounded-lg"
          />
        </div>
        <div className="grid gap-3">
          <label htmlFor="" className="text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            required
            defaultValue="Parker"
            className="border p-3 rounded-lg"
          />
        </div>
        <div className="grid gap-3 col-span-2">
          <label htmlFor="" className="text-gray-600">
            Email
          </label>
          <input
            type="email"
            required
            defaultValue="Jessica.parker@email.com"
            className="border p-3 rounded-lg"
          />
        </div>
        <div className="grid gap-3">
          <label htmlFor="" className="text-gray-600">
            Phone
          </label>
          <input
            type="phone"
            required
            defaultValue="+1 (555) 123-4567"
            className="border p-3 rounded-lg"
          />
        </div>
        <div className="grid gap-3">
          <label htmlFor="" className="text-gray-600">
            Date of Birth
          </label>
          <input
            type="date"
            required
            defaultValue="1990-05-15"
            className="border p-3 rounded-lg"
          />
        </div>
        <div className="flex justify-between col-span-2">
          <button
            type="submit"
            className="text-white bg-luxe font-bold rounded-lg px-6 py-3"
          >
            Save Changes
          </button>
          <button className="text-white bg-luxe font-bold rounded-lg px-10 py-3">
            Log Out
          </button>
        </div>
      </form>
    </>
  );
};

export default Profile;
