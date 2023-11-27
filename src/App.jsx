import SalLayout from "./layout/SalLayout";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useContext } from "react";
import UserContext from "./context/UserContext";
import JobVacancy from "./pages/JobVacancy";

export default function App() {
  const { token } = useContext(UserContext);

  return (
    <BrowserRouter>
      <SalLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/vacancy" element={<JobVacancy />} />
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <LoginPage />}
          />
        </Routes>
      </SalLayout>
    </BrowserRouter>
  );
}
