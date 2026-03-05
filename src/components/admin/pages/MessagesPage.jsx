import { useState } from "react";

import { Btn, Bx, Card, FInput, FSelect } from "../shared/primitives";
import { C, CUSTOMERS, QUICK_TEMPLATES } from "../shared/theme";
import { useAdminData } from "../state/AdminDataContext";

export default function MessagesPage() {
  const { orders, messages, setMessages } = useAdminData();
  const [tab, setTab] = useState("inbox");
  const [activeMsg, setActiveMsg] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [bulkProduct, setBulkProduct] = useState("");
  const [bulkSubject, setBulkSubject] = useState("");
  const [bulkBody, setBulkBody] = useState("");
  const [bulkSent, setBulkSent] = useState(false);
  const [compTo, setCompTo] = useState("");
  const [compSubject, setCompSubject] = useState("");
  const [compBody, setCompBody] = useState("");

  const purchasedProducts = [...new Set(orders.map((o) => o.items.split(" x")[0]))];
  const getBuyers = (prod) => {
    if (!prod) return CUSTOMERS;
    return CUSTOMERS.filter((customer) =>
      orders.some((order) => order.customerId === customer.id && order.items.toLowerCase().includes(prod.toLowerCase())),
    );
  };
  const buyers = getBuyers(bulkProduct);

  const sendBulk = () => {
    if (!bulkBody.trim() || !bulkSubject.trim()) return;
    setMessages((prev) => [
      {
        id: Date.now(),
        from: `Bulk - ${buyers.length} customer${buyers.length !== 1 ? "s" : ""}${bulkProduct ? ` (${bulkProduct})` : ""} `,
        email: buyers.map((buyer) => buyer.email).join(", "),
        body: bulkBody,
        subject: bulkSubject,
        type: "sent",
        time: "Just now",
        isBulk: true,
        recipients: buyers.length,
      },
      ...prev,
    ]);
    setBulkSent(true);
    setBulkBody("");
    setBulkSubject("");
    setBulkProduct("");
    setTimeout(() => setBulkSent(false), 4000);
  };

  const sendReply = () => {
    if (!replyText.trim() || !activeMsg) return;
    setMessages((prev) => [
      {
        id: Date.now(),
        from: `Reply → ${activeMsg.from}`,
        email: activeMsg.email,
        body: replyText,
        type: "sent",
        time: "Just now",
        isBulk: false,
      },
      ...prev,
    ]);
    setReplyText("");
    setActiveMsg(null);
  };

  const sendCompose = () => {
    if (!compTo || !compBody.trim()) return;
    const customer = CUSTOMERS.find((c) => c.email === compTo);
    setMessages((prev) => [
      {
        id: Date.now(),
        from: customer?.name || compTo,
        email: compTo,
        body: compBody,
        subject: compSubject,
        type: "sent",
        time: "Just now",
        isBulk: false,
      },
      ...prev,
    ]);
    setCompTo("");
    setCompSubject("");
    setCompBody("");
    setTab("inbox");
  };

  const tabs = [
    { id: "inbox", icon: "bx-inbox", l: "Inbox" },
    { id: "bulk", icon: "bx-broadcast", l: "Bulk Message" },
    { id: "compose", icon: "bx-edit", l: "Compose" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Message Center</h1>
        <p style={{ color: C.textMuted, fontSize: 13, marginTop: 3 }}>Communicate with your customers</p>
      </div>
      <div className="msg-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className="msg-tab-btn"
            onClick={() => setTab(t.id)}
            style={{ padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, background: tab === t.id ? C.brown : C.white, color: tab === t.id ? "#fff" : C.textMuted, border: `1.5px solid ${tab === t.id ? C.brown : C.border}`, cursor: "pointer" }}
          >
            <Bx icon={t.icon} size={15} color={tab === t.id ? "#fff" : C.textMuted} />
            <span className="msg-tab-label">{t.l}</span>
          </button>
        ))}
      </div>

      {tab === "inbox" && (
        <div>
          <Card>
            <div style={{ padding: "13px 15px", borderBottom: `1px solid ${C.border}`, fontWeight: 700, fontSize: 14 }}>Messages</div>
            <div style={{ maxHeight: 520, overflowY: "auto" }}>
              {messages.map((m) => (
                <div key={m.id} onClick={() => setActiveMsg(m)} style={{ padding: "13px 15px", borderBottom: `1px solid ${C.border}`, cursor: "pointer", background: activeMsg?.id === m.id ? C.brownLight : "transparent", transition: "background 0.15s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {m.isBulk ? <Bx icon="bx-broadcast" size={13} color={C.brown} /> : <Bx icon={m.type === "sent" ? "bx-send" : "bx-message"} size={13} color={m.type === "sent" ? C.green : C.blue} />}
                      <span style={{ fontWeight: 600, fontSize: 13, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>{m.from}</span>
                    </div>
                    <span style={{ fontSize: 10, color: C.textMuted, whiteSpace: "nowrap", flexShrink: 0, marginLeft: 6 }}>{m.time}</span>
                  </div>
                  <p style={{ fontSize: 11, color: C.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>{m.body}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "inbox" && activeMsg && (
        <div onClick={() => { setActiveMsg(null); setReplyText(""); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(event) => event.stopPropagation()} style={{ width: "100%", maxWidth: 560, background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, boxShadow: C.shadowMd, display: "flex", flexDirection: "column", maxHeight: "88vh" }}>
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{activeMsg.from}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{activeMsg.email}</div>
                {activeMsg.subject && <div style={{ fontSize: 12, color: C.textMed, marginTop: 4, fontWeight: 600 }}>Subject: {activeMsg.subject}</div>}
              </div>
              <button onClick={() => { setActiveMsg(null); setReplyText(""); }} style={{ background: C.bg, border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Bx icon="bx-x" size={16} color={C.textMuted} />
              </button>
            </div>

            <div style={{ padding: 16, overflowY: "auto" }}>
              <div style={{ padding: 14, background: activeMsg.type === "sent" ? C.brownLight : C.blueBg, borderRadius: 12 }}>
                <p style={{ fontSize: 13, color: C.text, margin: 0, whiteSpace: "pre-line", lineHeight: 1.6 }}>{activeMsg.body}</p>
                <div style={{ fontSize: 10, color: C.textMuted, marginTop: 8, textAlign: "right" }}>{activeMsg.time}</div>
              </div>
              {activeMsg.isBulk && <div style={{ marginTop: 10, padding: "8px 12px", background: C.bg, borderRadius: 8, fontSize: 11, color: C.textMed }}>Sent to {activeMsg.recipients || "all"} customers</div>}
            </div>

            <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
              <textarea value={replyText} onChange={(event) => setReplyText(event.target.value)} placeholder="Type a reply..." rows={3} style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, color: C.text, resize: "none", outline: "none", fontFamily: "inherit", marginBottom: 8 }} />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 7 }}>
                <Btn variant="ghost" size="sm" onClick={() => { setActiveMsg(null); setReplyText(""); }}>Close</Btn>
                <Btn size="sm" onClick={sendReply} icon="bx-send">Send Reply</Btn>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "bulk" && (
        <div className="bulk-layout">
          <Card style={{ padding: 22 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Send Bulk Message</h3>
            <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 18 }}>Target all customers who bought a specific product, or message everyone</p>
            {bulkSent && (
              <div style={{ padding: 12, background: C.greenBg, border: `1px solid ${C.green}44`, borderRadius: 10, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
                <Bx icon="bx-check-circle" size={17} color={C.green} />
                <span style={{ color: C.green, fontWeight: 600, fontSize: 13 }}>Sent to {buyers.length} customer{buyers.length !== 1 ? "s" : ""}!</span>
              </div>
            )}

            <FSelect
              label="Filter by Product Purchased"
              value={bulkProduct}
              onChange={(event) => setBulkProduct(event.target.value)}
              options={[{ value: "", label: "- All Customers" }, ...purchasedProducts.map((p) => ({ value: p, label: p }))]}
            />

            <div style={{ marginBottom: 16, padding: 12, background: C.bg, borderRadius: 10, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.textMed }}>Recipients ({buyers.length})</span>
                {bulkProduct && <span style={{ fontSize: 11, color: C.brown, fontWeight: 600 }}>Bought: {bulkProduct}</span>}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {buyers.slice(0, 5).map((buyer) => (
                  <span key={buyer.id} style={{ padding: "3px 9px", background: C.brownLight, borderRadius: 20, fontSize: 11, fontWeight: 600, color: C.brown }}>
                    {buyer.name}
                  </span>
                ))}
                {buyers.length > 5 && (
                  <span style={{ padding: "3px 9px", background: C.bg, borderRadius: 20, fontSize: 11, color: C.textMuted, border: `1px solid ${C.border}` }}>
                    +{buyers.length - 5} more
                  </span>
                )}
              </div>
            </div>

            <FInput label="Subject" required value={bulkSubject} onChange={(event) => setBulkSubject(event.target.value)} placeholder="e.g. Thank you for your purchase!" />
            <FInput label="Message" required value={bulkBody} onChange={(event) => setBulkBody(event.target.value)} placeholder="Write your message to all selected customers..." rows={5} />
            <div className="bulk-actions">
              <Btn variant="ghost" onClick={() => { setBulkBody(""); setBulkSubject(""); }}>Clear</Btn>
              <Btn onClick={sendBulk} icon="bx-broadcast" style={{ opacity: !bulkBody.trim() || !bulkSubject.trim() ? 0.5 : 1 }}>
                Send to {buyers.length} Customer{buyers.length !== 1 ? "s" : ""}
              </Btn>
            </div>
          </Card>

          <div className="bulk-side">
            <Card style={{ padding: 16 }}>
              <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Quick Templates</h4>
              {QUICK_TEMPLATES.map((template, index) => (
                <button key={index} onClick={() => { setBulkBody(template.body); setBulkSubject(template.label); }} style={{ width: "100%", padding: "9px 12px", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, textAlign: "left", fontSize: 12, fontWeight: 600, color: C.textMed, display: "flex", alignItems: "center", gap: 7, marginBottom: 7, cursor: "pointer" }}>
                  <Bx icon="bx-copy" size={13} color={C.brown} />
                  {template.label}
                </button>
              ))}
            </Card>
            <Card style={{ padding: 14, background: C.brownLight, borderColor: `${C.brown}33` }}>
              <div style={{ display: "flex", gap: 9 }}>
                <Bx icon="bx-bulb" size={17} color={C.brown} style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: C.brown }}>Tips</div>
                  <ul style={{ fontSize: 11, color: C.textMed, marginTop: 7, paddingLeft: 14, lineHeight: 1.9 }}>
                    <li>Filter by product to target specific buyers</li>
                    <li>Use templates for consistent brand voice</li>
                    <li>Keep messages personal and concise</li>
                    <li>Include a clear call to action</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === "compose" && (
        <div className="compose-layout">
          <Card style={{ padding: 22 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Compose Message</h3>
            <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 18 }}>Send a direct message to a specific customer</p>
            <FSelect
              label="Recipient"
              required
              value={compTo}
              onChange={(event) => setCompTo(event.target.value)}
              options={[{ value: "", label: "Select customer..." }, ...CUSTOMERS.map((customer) => ({ value: customer.email, label: `${customer.name} - ${customer.email}` }))]}
            />
            <FInput label="Subject" value={compSubject} onChange={(event) => setCompSubject(event.target.value)} placeholder="e.g. Your recent order" />
            <FInput label="Message" required value={compBody} onChange={(event) => setCompBody(event.target.value)} placeholder="Type your message..." rows={6} />
            <div className="compose-actions">
              <Btn variant="ghost" onClick={() => { setCompTo(""); setCompSubject(""); setCompBody(""); }}>Clear</Btn>
              <Btn onClick={sendCompose} icon="bx-send" style={{ opacity: !compTo || !compBody.trim() ? 0.5 : 1 }}>Send Message</Btn>
            </div>
          </Card>
          <Card style={{ padding: 16 }}>
            <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Quick Templates</h4>
            {QUICK_TEMPLATES.map((template, index) => (
              <button key={index} onClick={() => { setCompBody(template.body); setCompSubject(template.label); }} style={{ width: "100%", padding: "9px 12px", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, textAlign: "left", fontSize: 12, fontWeight: 600, color: C.textMed, display: "flex", alignItems: "center", gap: 7, marginBottom: 7, cursor: "pointer" }}>
                <Bx icon="bx-copy" size={13} color={C.brown} />
                {template.label}
              </button>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}
