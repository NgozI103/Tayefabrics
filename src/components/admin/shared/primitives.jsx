import { C } from "./theme";

export function Bx({ icon, size = 18, color, style: sx = {} }) {
  return <i className={`bx ${icon}`} style={{ fontSize: size, color, lineHeight: 1, ...sx }} />;
}

export function Av({ initials, size = 36, color = C.brown }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: size * 0.36,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

export function Card({ children, style: sx = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.white,
        borderRadius: 14,
        border: `1px solid ${C.border}`,
        boxShadow: C.shadow,
        ...sx,
      }}
    >
      {children}
    </div>
  );
}

export function Badge({ status }) {
  const map = {
    pending: { bg: "#FEF3E8", c: C.brown, l: "Pending" },
    processing: { bg: C.blueBg, c: C.blue, l: "Processing" },
    completed: { bg: C.greenBg, c: C.green, l: "Completed" },
    cancelled: { bg: C.redBg, c: C.red, l: "Cancelled" },
    in_stock: { bg: C.greenBg, c: C.green, l: "In Stock" },
    low_stock: { bg: "#FEF3E8", c: C.brown, l: "Low Stock" },
    out_of_stock: { bg: C.redBg, c: C.red, l: "Out of Stock" },
  };
  const state = map[status] || map.pending;

  return (
    <span
      style={{
        background: state.bg,
        color: state.c,
        borderRadius: 20,
        padding: "3px 10px",
        fontSize: 11,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {state.l}
    </span>
  );
}

export function StatCard({ label, value, sub, noWrapSub, icon, featured, trend }) {
  return (
    <Card
      style={{
        padding: "18px 20px",
        background: featured ? C.brown : C.white,
        borderColor: featured ? C.brown : C.border,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: featured ? "rgba(255,255,255,0.75)" : C.textMuted,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            {label}
          </div>
          <div style={{ color: featured ? "#fff" : C.text, fontSize: 24, fontWeight: 800, lineHeight: 1 }}>
            {value}
          </div>
          {sub && (
            <div
              style={{
                color: featured ? "rgba(255,255,255,0.7)" : C.textMuted,
                fontSize: 11,
                marginTop: 5,
                whiteSpace: noWrapSub ? "nowrap" : "normal",
              }}
            >
              {sub}
            </div>
          )}
        </div>
        {icon && (
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 11,
              background: featured ? "rgba(255,255,255,0.2)" : C.brownLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Bx icon={icon} size={20} color={featured ? "#fff" : C.brown} />
          </div>
        )}
      </div>
      {trend != null && (
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 4 }}>
          <Bx
            icon={trend >= 0 ? "bx-trending-up" : "bx-trending-down"}
            size={13}
            color={featured ? "rgba(255,255,255,0.9)" : trend >= 0 ? C.green : C.red}
          />
          <span
            style={{
              color: featured ? "rgba(255,255,255,0.9)" : trend >= 0 ? C.green : C.red,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {Math.abs(trend)}%
          </span>
          <span style={{ color: featured ? "rgba(255,255,255,0.6)" : C.textMuted, fontSize: 10 }}>
            vs last month
          </span>
        </div>
      )}
    </Card>
  );
}

export function Btn({ children, variant = "primary", size = "md", onClick, style: sx = {}, icon, type = "button" }) {
  const variants = {
    primary: { background: C.brown, color: "#fff", border: "none" },
    outline: { background: "transparent", color: C.brown, border: `1.5px solid ${C.brown}` },
    ghost: { background: "transparent", color: C.textMuted, border: `1.5px solid ${C.border}` },
    danger: { background: C.red, color: "#fff", border: "none" },
    success: { background: C.green, color: "#fff", border: "none" },
  };

  const sizes = {
    sm: { padding: "5px 11px", fontSize: 11 },
    md: { padding: "9px 18px", fontSize: 13 },
    lg: { padding: "12px 24px", fontSize: 14 },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: 9,
        fontWeight: 600,
        fontFamily: "inherit",
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        whiteSpace: "nowrap",
        cursor: "pointer",
        ...sx,
      }}
    >
      {icon && <Bx icon={icon} size={size === "sm" ? 13 : 15} color={variants[variant].color} />}
      {children}
    </button>
  );
}

export function FInput({ label, required, error, type = "text", value, onChange, placeholder, rows }) {
  const base = {
    width: "100%",
    background: C.bg,
    border: `1.5px solid ${error ? C.red : C.border}`,
    borderRadius: 10,
    padding: "10px 14px",
    color: C.text,
    fontSize: 13,
    outline: "none",
    fontFamily: "inherit",
  };

  return (
    <div style={{ marginBottom: 15 }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: 10,
            fontWeight: 700,
            color: C.textMuted,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            marginBottom: 7,
          }}
        >
          {label}
          {required && <span style={{ color: C.red, marginLeft: 3 }}>*</span>}
        </label>
      )}
      {rows ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{ ...base, resize: "vertical" }} />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} />
      )}
      {error && <p style={{ color: C.red, fontSize: 11, marginTop: 4 }}>⚠ {error}</p>}
    </div>
  );
}

export function FSelect({ label, required, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 15 }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: 10,
            fontWeight: 700,
            color: C.textMuted,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            marginBottom: 7,
          }}
        >
          {label}
          {required && <span style={{ color: C.red, marginLeft: 3 }}>*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          background: C.bg,
          border: `1.5px solid ${C.border}`,
          borderRadius: 10,
          padding: "10px 14px",
          color: C.text,
          fontSize: 13,
          outline: "none",
          fontFamily: "inherit",
          appearance: "none",
        }}
      >
        {options.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    </div>
  );
}
