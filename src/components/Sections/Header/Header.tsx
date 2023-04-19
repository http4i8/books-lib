import { useViewport } from '../../../hooks';
import { NavMobile } from './NavMobile';
import { Logout } from './Logout';

import classes from './Header.module.scss';

export const Header = () => {
  const { width } = useViewport();
  const breakpoint = 1070;

  return (
    <nav className={classes.header}>
      <div className={classes.header__container}>
        <div className={classes.header__content}>
          <a href="/#/">
            <span className={classes.header__icon}></span>
          </a>
          <h1>
            <a className={classes.header__brand} href="/#/">
              LIB
            </a>
          </h1>
        </div>
        {width > breakpoint && <Logout />}
        {width <= breakpoint && <NavMobile />}
      </div>
    </nav>
  );
};
