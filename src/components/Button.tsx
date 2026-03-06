import React from "react";
import { Button as ShadeCnButton } from "@/components/ui/button";

const Button = ({
  text,
  onClick,
  disabled,
  isLoading,
}: {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <ShadeCnButton
      onClick={() => {
        if (onClick) {
          console.log(onClick);
          onClick();
        }
      }}
      className="btn-primary scale-1 rounded-[var(--pc-button-radius)] border-none px-8 outline-none transition-all duration-300 hover:scale-[1.05] focus-visible:ring-0"
      disabled={disabled || false}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        text
      )}
    </ShadeCnButton>
  );
};

export default Button;
