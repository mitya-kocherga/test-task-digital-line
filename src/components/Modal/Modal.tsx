import React, {BaseSyntheticEvent, useRef} from 'react';
import Portal from '../Portal';

interface P {
  children: React.ReactElement;
  closeModal: () => void;
}
function ModalComponent({children, closeModal, ...rest}: P): React.ReactElement<P> {
  const modalRef = useRef<HTMLInputElement>(null);
  const toggleModal = (e: BaseSyntheticEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };
  return (
    <Portal>
      <div onClick={toggleModal} className="modal modal__backdrop">
        <div className="modal__container" ref={modalRef}>
          {children}
        </div>
      </div>
    </Portal>
  );
}

export default ModalComponent;
