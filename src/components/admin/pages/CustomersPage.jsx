import { Av, Card, StatCard } from "../shared/primitives";
import { C, CUSTOMERS, fmt } from "../shared/theme";

export default function CustomersPage() {
  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Customers</h1>
        <p style={{ color: C.textMuted, fontSize: 13, marginTop: 3 }}>All registered customers</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 18 }}>
        <StatCard label="Total" value={CUSTOMERS.length} icon="bx-group" featured />
        <StatCard label="VIP" value={CUSTOMERS.filter((customer) => customer.tier === "vip").length} sub="Top spenders" icon="bx-crown" />
        <StatCard label="New Month" value="32" icon="bx-user-plus" trend={8} />
        <StatCard label="Avg. Spend" value="₦224K" icon="bx-money-withdraw" trend={5} />
      </div>
      <Card>
        <div className="desktop-table-wrap" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
            <thead>
              <tr style={{ background: "#FAF8F5" }}>
                {["Customer", "Email", "Orders", "Spent", "Joined", "Tier"].map((h) => (
                  <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((customer) => (
                <tr key={customer.id} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td style={{ padding: "11px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <Av initials={customer.av} size={32} />
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{customer.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: C.textMuted }}>{customer.email}</td>
                  <td style={{ padding: "11px 14px", fontWeight: 700, fontSize: 13 }}>{customer.orders}</td>
                  <td style={{ padding: "11px 14px", fontWeight: 700, fontSize: 13, color: C.brown }}>{fmt(customer.spent)}</td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: C.textMuted, whiteSpace: "nowrap" }}>{customer.joined}</td>
                  <td style={{ padding: "11px 14px" }}>
                    {customer.tier === "vip" ? (
                      <span style={{ padding: "3px 9px", background: "#FEF3E8", color: C.brown, borderRadius: 20, fontSize: 11, fontWeight: 700 }}>⭐ VIP</span>
                    ) : (
                      <span style={{ padding: "3px 9px", background: C.bg, color: C.textMuted, borderRadius: 20, fontSize: 11 }}>Regular</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-only">
          <div className="mobile-list">
            {CUSTOMERS.map((customer) => (
              <div key={customer.id} className="mobile-item">
                <div className="mobile-head">
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <Av initials={customer.av} size={30} />
                    <div>
                      <div className="mobile-title">{customer.name}</div>
                      <div className="mobile-sub">{customer.email}</div>
                    </div>
                  </div>
                  {customer.tier === "vip" ? (
                    <span style={{ padding: "3px 9px", background: "#FEF3E8", color: C.brown, borderRadius: 20, fontSize: 11, fontWeight: 700 }}>VIP</span>
                  ) : (
                    <span style={{ padding: "3px 9px", background: C.bg, color: C.textMuted, borderRadius: 20, fontSize: 11 }}>Regular</span>
                  )}
                </div>
                <div className="mobile-rows">
                  <div className="mobile-row"><span className="mobile-k">Orders:</span><span className="mobile-v">{customer.orders}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Spent:</span><span className="mobile-v">{fmt(customer.spent)}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Joined:</span><span className="mobile-v">{customer.joined}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
