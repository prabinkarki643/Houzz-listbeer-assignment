import React, { ComponentProps } from "react";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";

interface AppButtonProps extends ComponentProps<typeof Button> {
  isTextButton?: boolean;
}

export default function AppButton({
  className,
  isTextButton,
  children,
  ...props
}: AppButtonProps) {
  if (isTextButton) {
    return (
      <Button
        className={[styles.textButton, className].join(" ")}
        {...props}
        variant="link"
      >
        {children}
      </Button>
    );
  }
  return (
    <Button className={[styles.appButton, className].join(" ")} {...props}>
      {children}
    </Button>
  );
}
