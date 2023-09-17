import { Route, Routes, Navigate } from 'react-router-dom';
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import IndexPage from '../pages/home';

const hasValidToken = () => {
  const userInfoJSON = localStorage.getItem('userInfo');
  const userInfo = JSON.parse(userInfoJSON!);
  return !!userInfo && !!userInfo.token; 
};

const routes = (
  <Routes>
    <Route path="/SignIn" element={<SignIn />} />
    <Route path="/SignUp" element={<SignUp />} />
    <Route
      path="/"
      element={hasValidToken() ? <IndexPage /> : <Navigate to="/SignIn" />}
    />
  </Routes>
);

export default routes;
