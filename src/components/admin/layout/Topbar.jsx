import { Av, Bx } from "../shared/primitives";
import { C } from "../shared/theme";

export default function Topbar({ onMenu, notifCount, onNotif }) {
  return (
    <header
      style={{
        background: C.white,
        borderBottom: `1px solid ${C.border}`,
        padding: "0 20px",
        height: 58,
        display: "flex",
        alignItems: "center",
        gap: 12,
        position: "sticky",
        top: 0,
        zIndex: 99,
      }}
    >
      <button
        onClick={onMenu}
        className="ank-menu-btn"
        style={{ background: "none", border: "none", padding: 5, borderRadius: 8, display: "none", cursor: "pointer", flexShrink: 0 }}
      >
        <Bx icon="bx-menu" size={22} color={C.textMed} />
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.bg, borderRadius: 24, padding: "7px 15px", maxWidth: 280, flex: "0 1 280px" }}>
        <Bx icon="bx-search" size={15} color={C.textMuted} />
        <span style={{ color: C.textMuted, fontSize: 13 }}>Search...</span>
      </div>
      <div style={{ flex: 1 }} />
      <button onClick={onNotif} style={{ position: "relative", background: "none", border: "none", padding: 6, borderRadius: 8, cursor: "pointer" }}>
        <Bx icon="bx-bell" size={21} color={C.textMed} />
        {notifCount > 0 && (
          <span style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, background: C.red, borderRadius: "50%", border: `2px solid ${C.white}` }} />
        )}
      </button>
      <Av initials="SA" size={32} />
      <style>{`@media(max-width:900px){.ank-menu-btn{display:flex!important;}}`}</style>
    </header>
  );
}
