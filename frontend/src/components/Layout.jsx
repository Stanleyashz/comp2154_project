export default function Layout({ children, user, onLogout, onNavigate, activeView }) {
  return (
    <div className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">COMP 2154</p>
          <h1>Job Application Tracker</h1>
        </div>
        <nav className="nav">
          {!user && (
            <>
              <button className={activeView === "login" ? "nav-button active" : "nav-button"} onClick={() => onNavigate("login")}>
                Login
              </button>
              <button
                className={activeView === "register" ? "nav-button active" : "nav-button"}
                onClick={() => onNavigate("register")}
              >
                Register
              </button>
            </>
          )}
          {user && (
            <button className="nav-button" onClick={onLogout}>
              Logout
            </button>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
