import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import DashBoard from "./pages/user/DashBoard";
import PrivateRoute from "./routes/Private";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import AllUsers from "./pages/Admin/AllUsers";
import AddUsers from "./pages/Admin/AddUsers";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* User routes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user/*" element={<DashBoard />} />
        </Route>

        {/* Admin routes */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin/*" element={<AdminDashboard />} />
          <Route path="admin/users" element={<AllUsers />} />
          <Route path="admin/add-user" element={<AddUsers />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
