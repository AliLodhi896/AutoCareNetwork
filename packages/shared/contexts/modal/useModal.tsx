import { useContext } from "react";
import { ModalContext, WashubModalProps } from "./modal.context";

const useModal = () => {
  const modal: WashubModalProps = useContext(ModalContext);
  return modal;
};

export default useModal;
