import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { routes } from '../../../../App/routes';

import classes from './Logout.module.scss';

export const Logout = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
    navigate(routes.login);
  };

  const location = useLocation();

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setIsShown(
      location.pathname !== routes.login && location.pathname !== routes.signup
    );
  }, [location]);

  const logout = (
    <div className={classes.logout}>
      <button className={classes.logout__btn} onClick={logoutHandler}>
        log out
      </button>
    </div>
  );

  return isShown ? logout : <></>;
};
