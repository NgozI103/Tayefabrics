import { useState } from "react";

import { Av, Btn, Card, StatCard } from "../shared/primitives";
import { C } from "../shared/theme";
import { useAdminData } from "../state/AdminDataContext";

export default function ReviewsPage() {
  const { reviews, setReviews } = useAdminData();
  const [repId, setRepId] = useState(null);
  const [repTxt, setRepTxt] = useState("");

  const total = reviews.length;
  const avgR = (reviews.reduce((a, r) => a + r.rating, 0) / total).toFixed(1);
  const pos = reviews.filter((r) => r.rating >= 4).length;

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Reviews</h1>
        <p style={{ color: C.textMuted, fontSize: 13, marginTop: 3 }}>Customer feedback and ratings</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 18 }}>
        <StatCard label="Total" value={total} icon="bx-message-square-dots" featured />
        <StatCard label="Avg Rating" value={`${avgR}★`} icon="bx-star" />
        <StatCard label="Positive" value={`${Math.round((pos / total) * 100)}%`} sub={`${pos} of ${total}`} icon="bx-like" />
        <StatCard label="Need Reply" value={reviews.filter((r) => !r.replied).length} icon="bx-reply" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,2fr)", gap: 18 }}>
        <Card style={{ padding: 18 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Rating Breakdown</h3>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 44, fontWeight: 800, color: C.brown }}>{avgR}</div>
            <div style={{ color: C.brown, fontSize: 18 }}>{"★".repeat(Math.round(avgR))}{"☆".repeat(5 - Math.round(avgR))}</div>
            <div style={{ color: C.textMuted, fontSize: 11, marginTop: 3 }}>{total} reviews</div>
          </div>
          {[5, 4, 3, 2, 1].map((rating) => {
            const cnt = reviews.filter((x) => x.rating === rating).length;
            return (
              <div key={rating} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                <span style={{ color: C.brown, fontSize: 11, minWidth: 18 }}>{"★".repeat(rating)}</span>
                <div style={{ flex: 1, height: 6, background: C.bg, borderRadius: 3 }}>
                  <div style={{ width: `${(cnt / total) * 100}%`, height: "100%", background: C.brown, borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 11, color: C.textMuted, minWidth: 12 }}>{cnt}</span>
              </div>
            );
          })}
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {reviews.map((review) => (
            <Card key={review.id} style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <Av initials={review.av} size={30} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{review.customer}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>on {review.product}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ color: C.brown, fontSize: 14 }}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                  <span style={{ fontSize: 11, color: C.textMuted }}>{review.date}</span>
                  {review.replied && <span style={{ padding: "2px 7px", background: C.greenBg, color: C.green, borderRadius: 10, fontSize: 10, fontWeight: 700 }}>Replied</span>}
                </div>
              </div>
              <p style={{ fontSize: 13, color: C.textMed, lineHeight: 1.6, marginBottom: 10 }}>{review.comment}</p>
              {!review.replied && repId !== review.id && <Btn variant="outline" size="sm" icon="bx-reply" onClick={() => setRepId(review.id)}>Reply</Btn>}
              {repId === review.id && (
                <div>
                  <textarea value={repTxt} onChange={(event) => setRepTxt(event.target.value)} placeholder="Write your reply..." rows={2} style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 11px", fontSize: 12, color: C.text, resize: "none", outline: "none", marginBottom: 8, fontFamily: "inherit" }} />
                  <div style={{ display: "flex", gap: 7 }}>
                    <Btn size="sm" onClick={() => { setReviews((prev) => prev.map((x) => (x.id === review.id ? { ...x, replied: true } : x))); setRepId(null); setRepTxt(""); }} icon="bx-send">Send</Btn>
                    <Btn variant="ghost" size="sm" onClick={() => setRepId(null)}>Cancel</Btn>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
