"use client";

import React from "react";
import { ACTION_LABEL_CLASS_NAME, renderActionLabel } from "@/helpers/action-label";

const ButtonGradient = ({
  title = "Gradient Button",
  onClick = () => {},
}: {
  title?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`btn btn-gradient animate-shimmer ${ACTION_LABEL_CLASS_NAME}`}
      onClick={onClick}
    >
      {renderActionLabel(title)}
    </button>
  );
};

export default ButtonGradient;
