import React from "react";

const Profile = () => {
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl tracking-wide mb-4">
        Profile Information
      </h1>
      <form action="" className="grid md:grid-cols-2 gap-4 md:gap-8 md:mt-6">
        <div className="grid gap-1 md:gap-3">
          <label htmlFor="" className="text-gray-600 text-sm md:text-base">
            First Name
          </label>
          <input
            type="text"
            required
            defaultValue="Jessica"
            className="border px-2 py-2 md:p-3 rounded-lg"
          />
        </div>
        <div className="grid gap-1 md:gap-3">
          <label htmlFor="" className="text-gray-600 text-sm md:text-base">
            Last Name
          </label>
          <input
            type="text"
            required
            defaultValue="Parker"
            className="border px-2 py-2 md:p-3 rounded-lg"
          />
        </div>
        <div className="grid gap-1 md:gap-3 md:col-span-2">
          <label htmlFor="" className="text-gray-600 text-sm md:text-base">
            Email
          </label>
          <input
            type="email"
            required
            defaultValue="Jessica.parker@email.com"
            className="border px-2 py-2 md:p-3 rounded-lg"
          />
        </div>
        <div className="grid gap-1 md:gap-3">
          <label htmlFor="" className="text-gray-600 text-sm md:text-base">
            Phone
          </label>
          <input
            type="phone"
            required
            defaultValue="+1 (555) 123-4567"
            className="border px-2 py-2 md:p-3 rounded-lg"
          />
        </div>
        <div className="grid gap-1 md:gap-3">
          <label htmlFor="" className="text-gray-600 text-sm md:text-base">
            Date of Birth
          </label>
          <input
            type="date"
            required
            defaultValue="1990-05-15"
            className="border px-2 py-2 md:p-3 rounded-lg"
          />
        </div>
        <div className="flex justify-between flex-col gap-4 md:flex-row md:col-span-2">
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
