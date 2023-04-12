import { LoginForm } from './LoginForm';
import { Container } from '../../../UI';

import classes from '../Auth.module.scss';

export const Login = () => {
  return (
    <Container>
      <div className={classes.auth}>
        <h2 className={classes.auth__title}>Log in to your account</h2>
        <LoginForm />
        <div className={classes.auth__newUser}>
          <a href="/signup">
            Not Registered yet? <span>Create an account</span>
          </a>
        </div>
      </div>
    </Container>
  );
};
