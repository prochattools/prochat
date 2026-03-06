"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { renderActionLabel } from "@/helpers/action-label";

const StripePortalButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePortalRedirect = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnUrl: window.location.origin }),
      });

      if (!response.ok) {
        throw new Error("Failed to create portal");
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        console.error("No URL returned from the API");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to open Stripe portal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-black1 bg-gray-100">
      <Button
        onClick={handlePortalRedirect}
        disabled={isLoading}
        className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
      >
        {renderActionLabel(isLoading ? "Loading..." : "Go to Stripe Customer Portal")}
      </Button>
    </div>
  );
};

export default StripePortalButton;
