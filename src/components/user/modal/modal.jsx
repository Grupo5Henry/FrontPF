import React, { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const Modal = ({ children, openButtonText, closeBotton }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return( 
    <>
      <button onClick={openModal}>{openButtonText}</button>
      <ReactModal
       className={{
          base: "content-base",
          afterOpen: "content-after",
          beforeClose: "content-before"
        }}
        closeTimeoutMS={500}  isOpen={isOpen} onRequestClose={closeModal}>
        <button onClick={closeModal}>{closeBotton}</button>
        {children}
      </ReactModal>
    </>
   );
};

export default Modal;
