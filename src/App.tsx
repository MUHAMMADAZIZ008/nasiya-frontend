import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/main-layout";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import CalendarPage from "./pages/calendar/calendar";
import Customers from "./pages/customers/customers";
import CustomerCreate from "./pages/customer-create/customer-create";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="calendar-page" element={<CalendarPage />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customer-create" element={<CustomerCreate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
