import { Card, StatCard } from "../shared/primitives";
import { C, fmt } from "../shared/theme";
import { useAdminData } from "../state/AdminDataContext";

export default function EarningsPage() {
  const { orders } = useAdminData();
  const revData = [
    { m: "Sep", v: 420 },
    { m: "Oct", v: 390 },
    { m: "Nov", v: 580 },
    { m: "Dec", v: 920 },
    { m: "Jan", v: 510 },
    { m: "Feb", v: 670 },
  ];
  const maxV = Math.max(...revData.map((d) => d.v));
  const done = orders.filter((o) => o.status === "completed");

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Earnings</h1>
        <p style={{ color: C.textMuted, fontSize: 13, marginTop: 3 }}>Revenue and financial overview</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 18 }}>
        <StatCard label="Total Revenue" value="₦3.8M" sub="Aug 2025 - Feb 2026" icon="bx-money" featured />
        <StatCard label="This Month" value="₦670K" sub="Feb 2026" icon="bx-calendar-check" trend={31} />
        <StatCard label="Pending Payout" value="₦124K" sub="3 orders" icon="bx-time-five" />
        <StatCard label="Avg Order Value" value="₦13,380" icon="bx-trending-up" trend={2} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)", gap: 18 }}>
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 18 }}>Revenue Trend</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 130 }}>
            {revData.map((d, i) => (
              <div key={d.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 10, color: C.textMuted }}>₦{d.v}k</span>
                <div style={{ width: "100%", borderRadius: "4px 4px 0 0", height: `${(d.v / maxV) * 100}px`, background: i === revData.length - 1 ? C.brown : `${C.brown}44` }} />
                <span style={{ fontSize: 10, color: C.textMuted }}>{d.m}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{ padding: 18 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Transactions</h3>
          {done.map((order) => (
            <div key={order.id} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 12 }}>{order.customer}</div>
                <div style={{ fontSize: 10, color: C.textMuted }}>{order.id}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.green }}>+{fmt(order.total)}</div>
                <div style={{ fontSize: 10, color: C.textMuted }}>{order.date}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
