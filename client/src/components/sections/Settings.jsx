import React from "react";
// ui
import Toggle from "../ui/Toggle.jsx";

const Settings = () => {
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl tracking-wide mb-4">
        Account Settings
      </h1>
      <div className="flex flex-col text-sm md:text-base gap-4 md:gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-base md:text-lg font-semibold tracking-wide">
            Notification
          </h1>
          <div className="flex justify-between items-center">
            <h1>Email notification for orders</h1>
            <Toggle id="emailNotifications" defaultValue={true} />
          </div>
          <div className="flex justify-between items-center">
            <h1>SMS notification</h1>
            <Toggle id="smsNotifications" defaultValue={false} />
          </div>
          <div className="flex justify-between items-center">
            <h1>Marketing emails</h1>
            <Toggle id="marketingEmails" defaultValue={true} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-base md:text-lg font-semibold tracking-[0.5px]">
            Privacy
          </h1>
          <div className="flex justify-between items-center">
            <h1>Make profile public</h1>
            <Toggle id="profilePublic" defaultValue={false} />
          </div>
          <div className="flex justify-between items-center">
            <h1>Share purchase history</h1>
            <Toggle id="sharePurchaseHistory" defaultValue={false} />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-base md:text-lg font-semibold tracking-[0.5px]">
            Change Password
          </h1>
          <form action="" className="grid gap-3 md:gap-6">
            <input
              type="password"
              placeholder="Current Password"
              className="p-3 border rounded-lg"
            />
            <div className="flex gap-3 md:gap-4 flex-col md:flex-row">
              <input
                type="password"
                placeholder="New Password"
                className="p-3 border rounded-lg col-span-2"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="p-3 border rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-luxe text-white rounded-lg py-3"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
