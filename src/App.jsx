import SalLayout from "./layout/SalLayout";
import JobVacancy from "./pages/JobVacancy";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <SalLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/vacancy" element={<JobVacancy />} />
        </Routes>{" "}
      </SalLayout>
    </BrowserRouter>
  );
}
