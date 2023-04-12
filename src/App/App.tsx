import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ApplyInterceptors } from './axios-interceptors';
import { Header } from '../components/Sections/Header';
import { Signup, Login, Profile } from '../components/Pages';

import { AuthRequire } from './AuthRequire';

import { routes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <ApplyInterceptors>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route
              path={routes.login}
              element={
                <AuthRequire authRequired={false}>
                  <Login />
                </AuthRequire>
              }
            />
            <Route
              path={routes.signup}
              element={
                <AuthRequire authRequired={false}>
                  <Signup />
                </AuthRequire>
              }
            />
            <Route
              path={routes.profile}
              element={
                <AuthRequire>
                  <Profile />
                </AuthRequire>
              }
            />
          </Routes>
        </>
      </ApplyInterceptors>
    </BrowserRouter>
  );
}
