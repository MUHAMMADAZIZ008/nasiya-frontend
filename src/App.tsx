import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/main-layout";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import CalendarPage from "./pages/calendar/calendar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="calendar-page" element={<CalendarPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
