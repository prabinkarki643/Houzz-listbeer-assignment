import { Modal } from "react-bootstrap";
import React, { forwardRef, useImperativeHandle, useState } from "react";

interface SelfControlModalProps
  extends Omit<React.ComponentProps<typeof Modal>, "children"> {
  anchorElement?: JSX.Element;
  children?:
    | React.ReactNode
    | ((config: {
        hide: SelfControlModalRefsHandler["hide"];
      }) => React.ReactNode);
  title?: React.ReactNode;
  footer?: React.ReactNode;
  closable?: boolean;

  bodyProps?: React.ComponentProps<typeof Modal.Body>;
}

interface SelfControlModalState {
  open?: boolean;
  closable?: boolean;
}

export interface SelfControlModalRefsHandler {
  show: (closable?: SelfControlModalProps["closable"]) => void;
  hide: () => void;
}

const initialState: SelfControlModalState = {
  open: false,
  closable: true,
};

const SelfControlModal = forwardRef<
  SelfControlModalRefsHandler,
  SelfControlModalProps
>(
  (
    {
      title,
      children,
      anchorElement,
      bodyProps,
      closable,
      footer,
      ...props
    }: SelfControlModalProps,
    ref
  ) => {
    const [state, setState] = useState<SelfControlModalState>({
      ...initialState,
      closable: closable,
    });

    useImperativeHandle(ref, () => ({
      show: showModal,
      hide: hideModal,
    }));

    const showModal = (closable?: SelfControlModalProps["closable"]) => {
      setState((prevState) => ({
        ...prevState,
        open: true,
        closable: closable,
      }));
    };

    const hideModal = () => {
      setState((prevState) => ({ ...prevState, ...initialState }));
    };

    const renderAnchorElementWithHandleShowModal = () => {
      if (!anchorElement) return null;
      return React.cloneElement(anchorElement, {
        onClick: () => {
          anchorElement?.props?.onClick?.();
          showModal();
        },
        style: {
          cursor: "pointer",
          ...anchorElement?.props?.style,
        },
      });
    };

    return (
      <React.Fragment>
        {renderAnchorElementWithHandleShowModal()}
        <Modal
          centered
          show={state.open}
          onHide={hideModal}
          keyboard={false}
          backdrop={'static'}
          size="lg"
          {...props}
        >
          <Modal.Header closeButton={closable}>
            {title && <Modal.Title>{title}</Modal.Title>}
          </Modal.Header>
          <Modal.Body {...bodyProps}>
            {state.open
              ? typeof children === "function"
                ? children({ hide: hideModal })
                : children
              : null}
          </Modal.Body>

          {footer && <Modal.Footer>{footer}</Modal.Footer>}
        </Modal>
      </React.Fragment>
    );
  }
);
export default SelfControlModal;

SelfControlModal.defaultProps = {
  closable: true,
};
