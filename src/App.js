import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./pages/Public";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import UsersList from "./pages/UsersList";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>

        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="userslist" element={<UsersList />} />

      </Route>
    </Routes>
  );
}

export default App;
