import { CSSProperties } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import TabPanel from "../TabPanel";

interface LoadingComponentProps {
  children: JSX.Element;
  loading: boolean;
  loadingLabel?: string;
  error?: Record<string, any>;
  tryAgainButtonText?: string;
  errorMessage?: string;
  style?: CSSProperties;
  onClickTryAgain?: () => void;
  className?: string;
}

export default function LoadingComponent({
  children,
  loading,
  loadingLabel,
  error,
  errorMessage,
  style,
  tryAgainButtonText,
  onClickTryAgain,
  className,
}: LoadingComponentProps) {
  return (
    <>
      <TabPanel name="Error" currentName={error ? "Error" : ""}>
        <Card
          style={{ ...style }}
          className={[styles.containerStyle, className].join("")}
        >
          <span className="material-symbols-outlined">warning</span>
          <div className="text-danger">{error?.message || errorMessage}</div>
          <Button variant="danger" onClick={onClickTryAgain}>
            {" "}
            {tryAgainButtonText}
          </Button>
        </Card>
      </TabPanel>

      <TabPanel name="Loading" currentName={loading ? "Loading" : ""}>
        <Card
          style={{ ...style }}
          className={[styles.containerStyle, className].join("")}
        >
          <Spinner></Spinner>
          <span>{loadingLabel}</span>
        </Card>
      </TabPanel>

      <TabPanel
        name="Success"
        currentName={!loading && !error ? "Success" : ""}
      >
        {children}
      </TabPanel>
    </>
  );
}

LoadingComponent.defaultProps = {
  errorMessage: "Ops error occured!",
  loadingLabel: "Loading...",
  tryAgainButtonText: "Try Again",
};
