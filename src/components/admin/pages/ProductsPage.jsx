import { useState } from "react";

import AddProductModal from "../components/AddProductModal";
import { Badge, Btn, Card, StatCard } from "../shared/primitives";
import { C, fmt } from "../shared/theme";
import { useAdminData } from "../state/AdminDataContext";

export default function ProductsPage() {
  const { products, setProducts } = useAdminData();
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const filtered = filter === "all" ? products : products.filter((p) => p.status === filter);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Products</h1>
          <p style={{ color: C.textMuted, fontSize: 13, marginTop: 3 }}>Manage your inventory</p>
        </div>
        <Btn onClick={() => setShowModal(true)} icon="bx-plus">Add Product</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 18 }}>
        <StatCard label="Total" value={products.length} />
        <StatCard label="In Stock" value={products.filter((p) => p.status === "in_stock").length} icon="bx-check-circle" />
        <StatCard label="Low Stock" value={products.filter((p) => p.status === "low_stock").length} icon="bx-error" />
        <StatCard label="Out of Stock" value={products.filter((p) => p.status === "out_of_stock").length} icon="bx-x-circle" />
      </div>
      <div style={{ display: "flex", gap: 7, marginBottom: 16, flexWrap: "wrap" }}>
        {["all", "in_stock", "low_stock", "out_of_stock"].map((value) => {
          const label = value.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
          return (
            <button
              key={value}
              onClick={() => setFilter(value)}
              style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: filter === value ? C.brown : C.white, color: filter === value ? "#fff" : C.textMuted, border: `1.5px solid ${filter === value ? C.brown : C.border}`, cursor: "pointer" }}
            >
              {label}
            </button>
          );
        })}
      </div>
      <Card>
        <div className="desktop-table-wrap" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
            <thead>
              <tr style={{ background: "#FAF8F5" }}>
                {["Product", "Category", "Price", "Stock", "Status", "Sold", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td style={{ padding: "11px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: p.image ? 9 : 0 }}>
                      {p.image && <img src={p.image} alt="" style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 7, flexShrink: 0 }} />}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{p.name}</div>
                        {p.type && <div style={{ fontSize: 10, color: C.textMuted }}>{p.type}</div>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: C.textMed, whiteSpace: "nowrap" }}>{p.category}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 700, color: C.brown, whiteSpace: "nowrap" }}>{fmt(p.price)}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 700, color: p.stock === 0 ? C.red : p.stock <= 4 ? C.brown : C.text }}>{p.stock}</td>
                  <td style={{ padding: "11px 14px" }}>
                    <Badge status={p.status} />
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: C.textMed }}>{p.sold}</td>
                  <td style={{ padding: "11px 14px" }}>
                    <div style={{ display: "flex", gap: 5 }}>
                      <Btn variant="outline" size="sm" icon="bx-edit">Edit</Btn>
                      <Btn variant="ghost" size="sm" icon="bx-trash" onClick={() => setProducts((prev) => prev.filter((x) => x.id !== p.id))} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-only">
          <div className="mobile-list">
            {filtered.map((p) => (
              <div key={p.id} className="mobile-item">
                <div className="mobile-head">
                  <div>
                    <div className="mobile-title">{p.name}</div>
                    <div className="mobile-sub">{p.type || p.category}</div>
                  </div>
                  <Badge status={p.status} />
                </div>
                <div className="mobile-rows">
                  <div className="mobile-row"><span className="mobile-k">Category:</span><span className="mobile-v">{p.category}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Price:</span><span className="mobile-v">{fmt(p.price)}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Stock:</span><span className="mobile-v">{p.stock}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Sold:</span><span className="mobile-v">{p.sold}</span></div>
                </div>
                <div className="mobile-actions">
                  <Btn variant="outline" size="sm" icon="bx-edit">Edit</Btn>
                  <Btn variant="ghost" size="sm" icon="bx-trash" onClick={() => setProducts((prev) => prev.filter((x) => x.id !== p.id))} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={(data) => {
            setProducts((prev) => [{ id: Date.now(), ...data }, ...prev]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
