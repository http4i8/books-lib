import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';

import { routes } from './routes';

interface ApplyInterceptorsProps {
  children: JSX.Element;
}

export const ApplyInterceptors = ({ children }: ApplyInterceptorsProps) => {
  const navigate = useNavigate();
  axios.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      if (localStorage.getItem('token')) {
        const token: string | null = localStorage.getItem('token');
        request.headers.Authorization = `Bearer ${token}`;
      }

      return request;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    (error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        navigate(routes.login);
      }

      return Promise.reject(error);
    }
  );

  return children;
};
