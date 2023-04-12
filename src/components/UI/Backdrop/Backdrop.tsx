interface BackdropProps {
  children?: JSX.Element | JSX.Element[];
  onClose: () => void;
  className: string;
}

export const Backdrop = ({ onClose, className, children }: BackdropProps) => {
  return (
    <>
      <div className={className} onClick={onClose} />
      {children}
    </>
  );
};
