import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useBoxicons, useAdminGlobalStyles } from "../shared/hooks";
import { C, ADMIN_ROUTES, getActiveAdminPage } from "../shared/theme";
import { useAdminData } from "../state/AdminDataContext";

export default function AdminLayout() {
  useBoxicons();
  useAdminGlobalStyles();

  const [sideOpen, setSideOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { unread } = useAdminData();
  const activePage = getActiveAdminPage(location.pathname);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.white, fontFamily: "'Poppins',sans-serif" }}>
      <Sidebar
        active={activePage}
        notifCount={unread}
        open={sideOpen}
        onClose={() => setSideOpen(false)}
      />
      <div className="ank-main" style={{ flex: 1, marginLeft: 220, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar
          onMenu={() => setSideOpen((open) => !open)}
          notifCount={unread}
          onNotif={() => navigate(ADMIN_ROUTES.notifications)}
        />
        <main style={{ flex: 1, padding: "24px 22px", maxWidth: "100%" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
