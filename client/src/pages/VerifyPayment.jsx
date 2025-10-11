import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (success === "true") {
          toast.success("Payment successful! Your order has been placed.");
          // You can update order status to paid here if needed
        } else {
          toast.error("Payment was cancelled or failed. Please try again.");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("Error verifying payment. Please check your orders.");
      } finally {
        setVerifying(false);
        // Redirect to orders page after 3 seconds
        setTimeout(() => {
          navigate("/my-account", { state: { activeTab: "orders" } });
        }, 3000);
      }
    };

    verifyPayment();
  }, [success, orderId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        {verifying ? (
          <>
            <div className="w-16 h-16 border-4 border-luxe border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
            <p className="text-gray-600">
              Please wait while we verify your payment...
            </p>
          </>
        ) : success === "true" ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-green-600">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Your order has been placed successfully.
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-red-600">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-4">
              Your payment was cancelled or failed. Please try again.
            </p>
          </>
        )}
        <p className="text-sm text-gray-500 mt-4">
          Redirecting to orders page...
        </p>
      </div>
    </div>
  );
};

export default VerifyPayment;
