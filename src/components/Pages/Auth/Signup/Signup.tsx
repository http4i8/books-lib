import { SignupForm } from './SignupForm';
import { Container } from '../../../UI';

import classes from '../Auth.module.scss';

export const Signup = () => {
  return (
    <Container>
      <div className={classes.auth}>
        <h2 className={classes.auth__title}>Create your account</h2>
        <SignupForm />
        <div className={classes.auth__existingUser}>
          <a href="/login">
            Do you have an account? <span>Log in</span>
          </a>
        </div>
      </div>
    </Container>
  );
};
