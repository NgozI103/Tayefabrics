import { useState } from "react";

import { Badge, Btn, Bx, Card, StatCard } from "../shared/primitives";
import { C, fmt } from "../shared/theme";
import { useAdminData } from "../state/AdminDataContext";

export default function OrdersPage() {
  const { orders, setOrders } = useAdminData();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");

  const updateOrderStatus = (id, status) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
    setSelectedOrder(null);
  };

  const filtered = filter === "all" ? orders : orders.filter((order) => order.status === filter);

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Orders</h1>
        <p style={{ color: C.textMuted, fontSize: 13, marginTop: 3 }}>Manage and track all customer orders</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, marginBottom: 18 }}>
        {["pending", "processing", "completed", "cancelled"].map((status) => {
          const mapping = {
            pending: ["Pending", "bx-time"],
            processing: ["Processing", "bx-sync"],
            completed: ["Completed", "bx-check-circle"],
            cancelled: ["Cancelled", "bx-x-circle"],
          };
          const [label, icon] = mapping[status];
          return <StatCard key={status} label={label} value={orders.filter((order) => order.status === status).length} icon={icon} />;
        })}
      </div>
      <div style={{ display: "flex", gap: 7, marginBottom: 16, flexWrap: "wrap" }}>
        {["all", "pending", "processing", "completed", "cancelled"].map((value) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: filter === value ? C.brown : C.white, color: filter === value ? "#fff" : C.textMuted, border: `1.5px solid ${filter === value ? C.brown : C.border}`, cursor: "pointer" }}
          >
            {value === "all" ? "All" : value.charAt(0).toUpperCase() + value.slice(1)}
          </button>
        ))}
      </div>
      <Card>
        <div className="desktop-table-wrap" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 580 }}>
            <thead>
              <tr style={{ background: "#FAF8F5" }}>
                {["Order ID", "Customer", "Items", "Total", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td style={{ padding: "11px 14px", fontWeight: 700, fontSize: 13, color: C.brown, whiteSpace: "nowrap" }}>{order.id}</td>
                  <td style={{ padding: "11px 14px" }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{order.customer}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{order.address}</div>
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: C.textMed, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.items}</td>
                  <td style={{ padding: "11px 14px", fontWeight: 700, fontSize: 13, color: C.brown, whiteSpace: "nowrap" }}>{fmt(order.total)}</td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: C.textMuted, whiteSpace: "nowrap" }}>{order.date}</td>
                  <td style={{ padding: "11px 14px" }}><Badge status={order.status} /></td>
                  <td style={{ padding: "11px 14px" }}>
                    <div style={{ display: "flex", gap: 5 }}>
                      {order.status === "pending" && (
                        <>
                          <Btn variant="success" size="sm" icon="bx-check" onClick={() => updateOrderStatus(order.id, "processing")}>Accept</Btn>
                          <Btn variant="danger" size="sm" icon="bx-x" onClick={() => updateOrderStatus(order.id, "cancelled")} />
                        </>
                      )}
                      {order.status === "processing" && <Btn size="sm" icon="bx-check-double" onClick={() => updateOrderStatus(order.id, "completed")}>Done</Btn>}
                      <Btn variant="ghost" size="sm" icon="bx-show" onClick={() => setSelectedOrder(order)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-only">
          <div className="mobile-list">
            {filtered.map((order) => (
              <div key={order.id} className="mobile-item">
                <div className="mobile-head">
                  <span className="mobile-id">{order.id}</span>
                  <Badge status={order.status} />
                </div>
                <div className="mobile-rows">
                  <div className="mobile-row"><span className="mobile-k">Customer:</span><span className="mobile-v">{order.customer}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Address:</span><span className="mobile-v">{order.address}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Items:</span><span className="mobile-v">{order.items}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Total:</span><span className="mobile-v">{fmt(order.total)}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Date:</span><span className="mobile-v">{order.date}</span></div>
                </div>
                <div className="mobile-actions">
                  {order.status === "pending" && (
                    <>
                      <Btn variant="success" size="sm" icon="bx-check" onClick={() => updateOrderStatus(order.id, "processing")}>Accept</Btn>
                      <Btn variant="danger" size="sm" icon="bx-x" onClick={() => updateOrderStatus(order.id, "cancelled")} />
                    </>
                  )}
                  {order.status === "processing" && <Btn size="sm" icon="bx-check-double" onClick={() => updateOrderStatus(order.id, "completed")}>Done</Btn>}
                  <Btn variant="ghost" size="sm" icon="bx-show" onClick={() => setSelectedOrder(order)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {selectedOrder && (
        <div onClick={() => setSelectedOrder(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(event) => event.stopPropagation()} style={{ background: C.white, borderRadius: 18, width: "100%", maxWidth: 420, boxShadow: C.shadowMd }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: 16 }}>{selectedOrder.id}</h3>
                <div style={{ marginTop: 4 }}><Badge status={selectedOrder.status} /></div>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={{ background: C.bg, border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Bx icon="bx-x" size={16} color={C.textMuted} />
              </button>
            </div>
            <div style={{ padding: "14px 20px" }}>
              {[["Customer", selectedOrder.customer], ["Address", selectedOrder.address], ["Items", selectedOrder.items], ["Total", fmt(selectedOrder.total)], ["Date", selectedOrder.date]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.textMuted, fontSize: 13 }}>{k}</span>
                  <span style={{ fontWeight: 600, fontSize: 13, textAlign: "right", maxWidth: "58%" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "12px 20px", display: "flex", gap: 8 }}>
              {selectedOrder.status === "pending" && (
                <>
                  <Btn variant="success" onClick={() => updateOrderStatus(selectedOrder.id, "processing")} icon="bx-check" style={{ flex: 1 }}>Accept</Btn>
                  <Btn variant="danger" onClick={() => updateOrderStatus(selectedOrder.id, "cancelled")} icon="bx-x" style={{ flex: 1 }}>Cancel</Btn>
                </>
              )}
              {selectedOrder.status === "processing" && <Btn onClick={() => updateOrderStatus(selectedOrder.id, "completed")} icon="bx-check-double" style={{ flex: 1 }}>Mark Complete</Btn>}
              <Btn variant="ghost" onClick={() => setSelectedOrder(null)} style={{ flex: 1 }}>Close</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
