import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/main-layout";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import CalendarPage from "./pages/calendar/calendar";
import Customers from "./pages/customers/customers";
import CustomerCreate from "./pages/customer-create/customer-create";
import DebtorAbout from "./pages/debtor-about/debtor-about";
import DebtsCreate from "./pages/debt-create/debts-create";
import Profile from "./pages/profile/profile";
import DebtAbout from "./pages/debt-about/debt-about";

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
          <Route path="debtor-about/:id" element={<DebtorAbout />} />
          <Route path="debt-create/:id" element={<DebtsCreate />} />
          <Route path="profile" element={<Profile />} />
          <Route path="debt-about/:id" element={<DebtAbout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
