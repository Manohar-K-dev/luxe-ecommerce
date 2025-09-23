import React from "react";
// ui
import Toggle from "../ui/Toggle";

const Settings = () => {
  return (
    <>
      <h1 className="font-bold text-2xl tracking-wide">Account Settings</h1>
      <div className="flex flex-col gap-8 mt-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold tracking-[0.5px]">
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
          <h1 className="text-lg font-semibold tracking-[0.5px]">Privacy</h1>
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
          <h1 className="text-lg font-semibold tracking-[0.5px]">
            Change Password
          </h1>
          <form action="" className="grid gap-6">
            <input
              type="password"
              placeholder="Current Password"
              className="p-3 border rounded-lg"
            />
            <div className="flex gap-4">
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
