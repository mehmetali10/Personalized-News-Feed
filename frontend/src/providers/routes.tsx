import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

const routes = (
  <Routes>
    <Route path="/SignIn" element={<SignIn />} />
    <Route path="/SignUp" element={<SignUp />} />
    <Route path="/" element={<Navigate to="/SignIn" />} />
  </Routes>
);

export default routes;
