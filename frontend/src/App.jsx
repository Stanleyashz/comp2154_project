import { useEffect, useState } from "react";
import Layout from "./components/Layout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

const apiBaseUrl = (
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost" ? "http://localhost:5000" : "")
).replace(/\/$/, "");

export default function App() {
  const [view, setView] = useState("login");
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("jat-token");
    const storedUser = window.localStorage.getItem("jat-user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setView("dashboard");
    }
  }, []);

  function handleAuthSuccess(payload) {
    setToken(payload.token);
    setUser(payload.user);
    setView("dashboard");
    window.localStorage.setItem("jat-token", payload.token);
    window.localStorage.setItem("jat-user", JSON.stringify(payload.user));
  }

  function handleLogout() {
    setToken("");
    setUser(null);
    setView("login");
    window.localStorage.removeItem("jat-token");
    window.localStorage.removeItem("jat-user");
  }

  return (
    <Layout user={user} onLogout={handleLogout} onNavigate={setView} activeView={view}>
      {view === "login" && (
        <LoginPage apiBaseUrl={apiBaseUrl} onSuccess={handleAuthSuccess} onSwitch={() => setView("register")} />
      )}
      {view === "register" && (
        <RegisterPage
          apiBaseUrl={apiBaseUrl}
          onSuccess={handleAuthSuccess}
          onSwitch={() => setView("login")}
        />
      )}
      {view === "dashboard" && token && (
        <DashboardPage apiBaseUrl={apiBaseUrl} token={token} user={user} />
      )}
    </Layout>
  );
}
