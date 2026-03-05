import { Btn, Bx, Card } from "../shared/primitives";
import { C, CUSTOMERS } from "../shared/theme";
import { useAdminData } from "../state/AdminDataContext";

export default function NotificationsPage() {
  const { notifs, setNotifs, setMessages } = useAdminData();
  const unread = notifs.filter((n) => !n.read).length;

  const iconMap = {
    order: { icon: "bx-package", c: C.brown, bg: C.brownLight },
    low_stock: { icon: "bx-error", c: C.brown, bg: "#FEF3E8" },
    out_of_stock: { icon: "bx-x-circle", c: C.red, bg: C.redBg },
  };

  const getOrderNo = (msg) => msg.match(/ORD-\d+/)?.[0] || "ORDER";
  const getCustomerName = (msg) => msg.match(/from\s+(.+?)\s+[—-]/)?.[1] || "Customer";

  const autoReplyOrder = (notif) => {
    const orderNo = getOrderNo(notif.message);
    const customerName = getCustomerName(notif.message);
    const customer = CUSTOMERS.find((c) => c.name === customerName);

    setMessages((prev) => [
      {
        id: Date.now(),
        from: customerName,
        email: customer?.email || "customer@email.com",
        subject: `Thank you for your order ${orderNo}`,
        body: `Hi ${customerName},\n\nThank you for your order ${orderNo}. We have received it and we are processing it now.\n\nBest regards,\nfabricsby_tayejenifa Team`,
        type: "sent",
        time: "Just now",
        isBulk: false,
      },
      ...prev,
    ]);

    setNotifs((prev) => prev.map((n) => (n.id === notif.id ? { ...n, read: true, replied: true } : n)));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Notifications</h1>
          <p style={{ color: C.textMuted, fontSize: 13, marginTop: 3 }}>{unread} unread</p>
        </div>
        {unread > 0 && (
          <Btn variant="outline" size="sm" icon="bx-check-double" onClick={() => setNotifs((current) => current.map((item) => ({ ...item, read: true })))}>
            Mark all read
          </Btn>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {notifs.map((n) => {
          const scheme = iconMap[n.type] || iconMap.order;
          return (
            <Card
              key={n.id}
              onClick={() => setNotifs((prev) => prev.map((item) => (item.id === n.id ? { ...item, read: true } : item)))}
              style={{
                padding: "13px 16px",
                cursor: "pointer",
                background: n.read ? C.white : C.brownLight,
                borderColor: n.read ? C.border : `${C.brown}33`,
                display: "flex",
                alignItems: "center",
                gap: 13,
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 11, background: scheme.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bx icon={scheme.icon} size={19} color={scheme.c} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: n.read ? 500 : 700, fontSize: 13 }}>{n.title}</span>
                  <span style={{ fontSize: 10, color: C.textMuted, whiteSpace: "nowrap", marginLeft: 10 }}>{n.time}</span>
                </div>
                <p style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{n.message}</p>
                {n.type === "order" && (
                  <div style={{ marginTop: 8 }}>
                    <Btn
                      size="sm"
                      icon={n.replied ? "bx-check" : "bx-reply"}
                      variant={n.replied ? "ghost" : "outline"}
                      onClick={(event) => {
                        event.stopPropagation();
                        if (!n.replied) autoReplyOrder(n);
                      }}
                    >
                      {n.replied ? "Thank You Sent" : "Send Thank You"}
                    </Btn>
                  </div>
                )}
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: scheme.c, flexShrink: 0 }} />}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
