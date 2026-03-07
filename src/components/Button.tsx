import React from "react";
import { Button as ShadeCnButton } from "@/components/ui/Button";

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
      variant="primary"
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
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
