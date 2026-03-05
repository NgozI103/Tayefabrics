import { NavLink } from "react-router-dom";

import { NAV_GROUPS, C } from "../shared/theme";
import { Av, Bx } from "../shared/primitives";

export default function Sidebar({ active, notifCount, open, onClose }) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 198, display: "none" }}
          className="ank-overlay"
        />
      )}
      <aside
        className={`ank-sidebar${open ? " open" : ""}`}
        style={{
          width: 220,
          minHeight: "100vh",
          background: C.white,
          borderRight: `1px solid ${C.border}`,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          boxShadow: C.shadowMd,
          transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ padding: "22px 18px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, background: C.brown, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bx icon="bx-store" size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, color: C.text, lineHeight: 1.1 }}>fabricsby_tayejenifa</div>
              <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase" }}>Admin Panel</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "14px 10px", overflowY: "auto" }}>
          {NAV_GROUPS.map((section) => (
            <div key={section.group} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#C0B0A0", letterSpacing: 1.8, textTransform: "uppercase", padding: "0 10px", marginBottom: 5 }}>
                {section.group}
              </div>
              {section.items.map((item) => {
                const isActive = active === item.id;
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={onClose}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: item.icon ? 9 : 0,
                      padding: "10px 11px",
                      borderRadius: 10,
                      marginBottom: 2,
                      background: isActive ? C.brown : "transparent",
                      border: "none",
                      color: isActive ? "#fff" : C.textMuted,
                      textAlign: "left",
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      transition: "all 0.15s",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    {item.icon && <Bx icon={item.icon} size={17} color={isActive ? "#fff" : C.textMuted} />}
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && notifCount > 0 && (
                      <span style={{ background: C.red, color: "#fff", fontSize: 10, borderRadius: 20, padding: "1px 6px", fontWeight: 700 }}>
                        {notifCount}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div style={{ padding: "13px 14px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Av initials="SA" size={32} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                Store Admin
              </div>
              <div style={{ fontSize: 10, color: C.textMuted }}>Super Admin</div>
            </div>
            <Bx icon="bx-log-out" size={15} color={C.textMuted} />
          </div>
        </div>
        <style>{`.ank-overlay{display:block!important;} @media(min-width:901px){.ank-overlay{display:none!important;}}`}</style>
      </aside>
    </>
  );
}
