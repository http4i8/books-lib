import { Navigate } from 'react-router-dom';

import { routes } from './routes';

interface AuthRequireProps {
  authRequired?: boolean;
  children: JSX.Element;
}

export const AuthRequire = ({
  authRequired = true,
  children,
}: AuthRequireProps) => {
  if (authRequired) {
    if (!localStorage.getItem('token')) {
      return <Navigate to={routes.login} replace={true} />;
    }
  } else {
    if (localStorage.getItem('token')) {
      return <Navigate to={routes.profile} replace={true} />;
    }
  }
  return children;
};
