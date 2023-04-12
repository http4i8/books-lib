import ReactDOM from 'react-dom';

import { Backdrop } from '../Backdrop';

import classes from './Modal.module.scss';

interface ModalProps {
  children?: JSX.Element | JSX.Element[];
  onClose: () => void;
}

const portalElement = document.getElementById('overlays') as HTMLElement;

export const Modal = (props: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop className={classes.backdrop} onClose={props.onClose}>
          <div className={classes.modal}>
            <div>{props.children}</div>
          </div>
        </Backdrop>,
        portalElement
      )}
    </>
  );
};
