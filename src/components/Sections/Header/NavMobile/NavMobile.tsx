import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { useLocation } from 'react-router-dom';

import { BookStatus, AddNewBookBtn } from '../../../Pages';
import { Backdrop } from '../../../UI';
import { Logout } from '../Logout';

import { routes } from '../../../../App/routes';

import classes from './NavMobile.module.scss';

export const NavMobile = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsBurgerOpen((prevState) => {
      return !prevState;
    });
  };

  const onCloseHandler = () => {
    setIsBurgerOpen(false);
  };

  const [showMenu, setShowMenu] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setShowMenu(location.pathname === routes.profile);
    setIsBurgerOpen(false);
  }, [location]);

  const portalElement = document.getElementById('sidebar') as HTMLElement;

  const openMenu = isBurgerOpen
    ? `${classes.mobile__menuContainer} ${classes.open}`
    : classes.mobile__menuContainer;

  const toggleIcon = isBurgerOpen
    ? `${classes.mobile__burgerIcon} ${classes.toggle}`
    : classes.mobile__burgerIcon;

  const backdrop = isBurgerOpen
    ? classes.backdrop
    : `${classes.backdrop} ${classes.hide}`;

  return showMenu ? (
    <div className={classes.mobile}>
      <div>
        <div className={classes.mobile__burger}>
          <div className={toggleIcon}>
            <input
              className={classes.mobile__checkbox}
              checked={isBurgerOpen}
              onChange={toggleMenuHandler}
              type="checkbox"
            />
            <div>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className={classes.mobile__menu}>
          {ReactDOM.createPortal(
            <Backdrop className={backdrop} onClose={onCloseHandler}>
              <div className={openMenu}>
                <AddNewBookBtn />
                <BookStatus />
                <div className={classes.mobile__logout}>
                  <Logout />
                </div>
              </div>
            </Backdrop>,
            portalElement
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
