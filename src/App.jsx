import React, { useEffect, lazy, useState } from 'react';

import Layout from 'Layout';

import { Route, Routes, Navigate } from 'react-router-dom';
import { refreshUser } from 'redux/auth/auth-operations';
import PrivateRoute from './PrivateRoutes';
import PublicRoute from './PublicRoutes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';


const Home = lazy(() => import('./page/Home/Home'));
const Contacts = lazy(() => import('./page/Constcts/Constcts'));
const Register = lazy(() => import('./page/Register/Register'));
const Login = lazy(() => import('./page/Login/Login'));

export default function App() {
  const dispatch = useDispatch();
  const [isRefreshed, setIsRefreshed] = useState(false);

  useEffect(() => {
    if (!isRefreshed) {
      dispatch(refreshUser());
      setIsRefreshed(true);
    }
  }, [dispatch, isRefreshed]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="contacts"
            element={
              <PrivateRoute redirectTo="/login">
                <Contacts />
              </PrivateRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute component={Register} redirectTo="/contacts" />
            }
          />
          <Route
            path="login"
            element={<PublicRoute component={Login} redirectTo="/contacts" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <ToastContainer theme="dark" position="bottom-right" />
    </>
  );
}