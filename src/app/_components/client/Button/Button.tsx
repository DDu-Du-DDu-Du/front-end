"use client";

import React, { MouseEvent } from "react";

import { ButtonProps } from "./Button.type";
import { useConvertButtonStyle } from "./hooks";

import { motion } from "framer-motion";
import { twJoin, twMerge } from "tailwind-merge";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      radius = "basic",
      fontSize = "0.94rem",
      fontWeight = "bold",
      fontColor = "black",
      backgroundColor = "yellow",
      border = "none",
      shadow = false,
      className,
      onClick,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    const convertedStyle = useConvertButtonStyle({
      radius,
      fontSize,
      fontWeight,
      fontColor,
      backgroundColor,
      border,
      shadow,
    });

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!onClick || disabled) {
        return;
      }

      onClick();
    };

    const disableStyle = disabled ? "opacity-50" : "";

    return (
      <motion.button
        ref={ref}
        className={twMerge(
          twJoin(`h-[3.5rem] w-[20rem] px-2 will-change-transform`, convertedStyle, disableStyle),
          className,
        )}
        type="button"
        onClick={handleClick}
        whileHover={disabled ? {} : { scale: 1.015, filter: "brightness(105%)" }}
        whileTap={disabled ? {} : { scale: 0.95 }}
        transition={{ type: "spring", stiffness: 350 }}
        {...rest}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
export default Button;
