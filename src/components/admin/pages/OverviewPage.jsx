import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Badge, Bx, Card, StatCard } from "../shared/primitives";
import { ADMIN_ROUTES, C, CUSTOMERS, fmt } from "../shared/theme";
import { useAdminData } from "../state/AdminDataContext";

export default function OverviewPage() {
  const navigate = useNavigate();
  const { products, orders } = useAdminData();
  const [showStockAlert, setShowStockAlert] = useState(true);

  const catData = [
    { name: "Ankara Fabrics", v: 34, c: C.brown },
    { name: "Aso-Ebi", v: 28, c: "#A8622A" },
    { name: "Ready to Wear", v: 24, c: C.green },
    { name: "Accessories", v: 14, c: C.blue },
  ];
  const revData = [
    { m: "Sep", v: 420 },
    { m: "Oct", v: 390 },
    { m: "Nov", v: 580 },
    { m: "Dec", v: 920 },
    { m: "Jan", v: 510 },
    { m: "Feb", v: 670 },
  ];
  const maxV = Math.max(...revData.map((d) => d.v));
  const oos = products.filter((p) => p.status === "out_of_stock").length;
  const lowStockItems = products.filter((p) => p.stock < 10);
  const hasLowStock = lowStockItems.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Welcome Back, Admin! 👋</h1>
        <p style={{ color: C.textMuted, fontSize: 13, marginTop: 3 }}>Here's what happened with your store today</p>
      </div>
      {hasLowStock && showStockAlert && (
        <Card style={{ padding: "14px 16px", background: C.redBg, borderColor: `${C.red}33`, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Bx icon="bx-error" size={17} color={C.red} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.red }}>You have products that need attention.</div>
              <div style={{ fontSize: 11, color: C.textMed, marginTop: 3 }}>
                {lowStockItems.length} product{lowStockItems.length !== 1 ? "s" : ""} ha{lowStockItems.length !== 1 ? "ve" : "s"} fewer than 10 units. Restock to avoid stockouts.
              </div>
              <button onClick={() => navigate(ADMIN_ROUTES.products)} style={{ marginTop: 8, color: C.red, background: "none", border: `1px solid ${C.red}`, borderRadius: 7, padding: "4px 11px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                Review Products
              </button>
            </div>
            <button onClick={() => setShowStockAlert(false)} aria-label="Close stock alert" style={{ width: 28, height: 28, borderRadius: "50%", border: "none", background: C.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <Bx icon="bx-x" size={16} color={C.red} />
            </button>
          </div>
        </Card>
      )}
      <div className="ov-stats">
        <StatCard label="Total Revenue" value="₦3.8M" sub="February 2026" noWrapSub icon="bx-money" featured trend={12} />
        <StatCard label="Orders Completed" value={orders.filter((o) => o.status === "completed").length} sub="+5% from last month" noWrapSub icon="bx-check-circle" trend={5} />
        <StatCard label="Total Products" value={products.length} sub={oos > 0 ? `${oos} out of stock` : "All in stock"} icon="bx-package" trend={8} />
        <StatCard label="Total Customers" value={CUSTOMERS.length} sub="+20% from last month" noWrapSub icon="bx-group" trend={20} />
      </div>

      <div className="ov-panels">
        <div className="ov-recent">
          <Card>
            <div style={{ padding: "16px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontWeight: 700, fontSize: 15 }}>Recent Products</h3>
              <button onClick={() => navigate(ADMIN_ROUTES.products)} style={{ color: C.brown, background: "none", border: "none", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 3, cursor: "pointer" }}>
                View All <Bx icon="bx-chevron-right" size={15} color={C.brown} />
              </button>
            </div>
            <div className="desktop-table-wrap" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 380 }}>
                <thead>
                  <tr style={{ background: "#FAF8F5" }}>
                    {["Products", "Price", "Stock", "Status", "Sold"].map((h) => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((p) => (
                    <tr key={p.id} style={{ borderTop: `1px solid ${C.border}` }}>
                      <td style={{ padding: "11px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: p.image ? 9 : 0 }}>
                          {p.image && <img src={p.image} alt="" style={{ width: 34, height: 34, objectFit: "cover", borderRadius: 7, flexShrink: 0 }} />}
                          <span style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{p.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 700, color: C.brown, whiteSpace: "nowrap" }}>{fmt(p.price)}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 700, color: p.stock === 0 ? C.red : p.stock <= 4 ? "#C17B3F" : C.text }}>{p.stock}</td>
                      <td style={{ padding: "11px 14px" }}>
                        <Badge status={p.status} />
                      </td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: C.textMed }}>{p.sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mobile-only">
              <div className="mobile-list">
                {products.slice(0, 5).map((p) => (
                  <div key={p.id} className="mobile-item">
                    <div className="mobile-head">
                      <div>
                        <div className="mobile-title">{p.name}</div>
                        <div className="mobile-sub">{p.type || p.category}</div>
                      </div>
                      <Badge status={p.status} />
                    </div>
                    <div className="mobile-rows">
                      <div className="mobile-row"><span className="mobile-k">Price:</span><span className="mobile-v">{fmt(p.price)}</span></div>
                      <div className="mobile-row"><span className="mobile-k">Stock:</span><span className="mobile-v">{p.stock}</span></div>
                      <div className="mobile-row"><span className="mobile-k">Sold:</span><span className="mobile-v">{p.sold}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        <div className="ov-sales">
          <Card style={{ padding: 18 }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Sales by Category</h3>
            {catData.map((d) => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: C.textMed, minWidth: 96, whiteSpace: "nowrap" }}>{d.name}</span>
                <div style={{ flex: 1, height: 6, background: C.bg, borderRadius: 3 }}>
                  <div style={{ width: `${d.v}%`, height: "100%", background: d.c, borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text, minWidth: 32, textAlign: "right" }}>{d.v}%</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <Card style={{ padding: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 18 }}>Monthly Revenue</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 130 }}>
          {revData.map((d, i) => (
            <div key={d.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 10, color: C.textMuted }}>₦{d.v}k</span>
              <div style={{ width: "100%", borderRadius: "4px 4px 0 0", height: `${(d.v / maxV) * 100}px`, background: i === revData.length - 1 ? C.brown : `${C.brown}44`, transition: "height 0.5s ease" }} />
              <span style={{ fontSize: 10, color: C.textMuted }}>{d.m}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
