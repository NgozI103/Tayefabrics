import { useState } from "react";

import { Btn, Bx, FInput, FSelect } from "../shared/primitives";
import {
  C,
  LENGTHS,
  PRESET_COLORS,
  SIZES,
  INCHES_LIST,
  fmt,
  genCoupon,
  stockSt,
} from "../shared/theme";

export default function AddProductModal({ onClose, onAdd }) {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({
    name: "",
    desc: "",
    category: "Ankara Fabrics",
    type: "",
    price: "",
    stock: "",
    image: null,
    sizes: [],
    colors: [],
    lengths: [],
    inches: [],
    discount: "none",
    discPct: "",
    coupon: "",
    couponOk: false,
  });
  const [errs, setErrs] = useState({});

  const upd = (key, value) => setF((prev) => ({ ...prev, [key]: value }));
  const tog = (key, value) => upd(key, f[key].includes(value) ? f[key].filter((item) => item !== value) : [...f[key], value]);

  const validateStep1 = () => {
    const errors = {};
    if (!f.name.trim()) errors.name = "Required";
    if (!f.desc.trim()) errors.desc = "Required";
    if (!f.price || +f.price <= 0) errors.price = "Enter valid price";
    if (f.stock === "" || +f.stock < 0) errors.stock = "Enter valid quantity";

    setErrs(errors);
    return !Object.keys(errors).length;
  };

  const next = () => {
    if (step === 1 && !validateStep1()) return;
    setStep((value) => value + 1);
  };

  const submit = () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    onAdd({ ...f, status: stockSt(+f.stock), price: +f.price, stock: +f.stock, sold: 0 });
  };

  const isFab = f.category === "Ankara Fabrics" || f.category === "Aso-Ebi";
  const isWear = f.category === "Ready to Wear";
  const isAcc = f.category === "Accessories";

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{ background: C.white, borderRadius: 20, width: "100%", maxWidth: 580, maxHeight: "92vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.22)" }}
      >
        <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 18, color: C.text }}>Add New Product</h2>
              <p style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
                {["Basic Info", "Variants", "Discount"][step - 1]} - Step {step} of 3
              </p>
            </div>
            <button
              onClick={onClose}
              style={{ background: C.bg, border: "none", borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <Bx icon="bx-x" size={18} color={C.textMuted} />
            </button>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ flex: 1, height: 5, borderRadius: 3, background: s <= step ? C.brown : C.border, transition: "background 0.3s" }} />
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px" }}>
          {step === 1 && (
            <div>
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 7 }}>
                  Product Image
                </label>
                <div onClick={() => document.getElementById("pimg").click()} style={{ border: `2px dashed ${C.border}`, borderRadius: 12, padding: 18, textAlign: "center", cursor: "pointer", background: C.bg }}>
                  <input
                    id="pimg"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) {
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (fileEvent) => upd("image", fileEvent.target.result);
                      reader.readAsDataURL(file);
                    }}
                    style={{ display: "none" }}
                  />
                  {f.image ? (
                    <div style={{ position: "relative", display: "inline-block" }}>
                      <img src={f.image} alt="" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10, border: `2px solid ${C.brown}` }} />
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          upd("image", null);
                        }}
                        style={{ position: "absolute", top: -8, right: -8, width: 20, height: 20, borderRadius: "50%", background: C.red, color: "#fff", border: "none", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <Bx icon="bx-image-add" size={30} color={C.textMuted} />
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.textMed, marginTop: 5 }}>Click to upload</div>
                      <div style={{ fontSize: 11, color: C.textMuted }}>PNG, JPG, WEBP</div>
                    </>
                  )}
                </div>
              </div>
              <FInput
                label="Product Name"
                required
                error={errs.name}
                value={f.name}
                onChange={(event) => {
                  upd("name", event.target.value);
                  setErrs((value) => ({ ...value, name: "" }));
                }}
                placeholder="e.g. Adire Indigo Fabric"
              />
              <FInput
                label="Description"
                required
                error={errs.desc}
                value={f.desc}
                onChange={(event) => {
                  upd("desc", event.target.value);
                  setErrs((value) => ({ ...value, desc: "" }));
                }}
                placeholder="Describe fabric quality, care, origin..."
                rows={3}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <FSelect
                  label="Category"
                  required
                  value={f.category}
                  onChange={(event) => upd("category", event.target.value)}
                  options={["Ankara Fabrics", "Aso-Ebi", "Ready to Wear", "Accessories"]}
                />
                <FInput
                  label="Type"
                  value={f.type}
                  onChange={(event) => upd("type", event.target.value)}
                  placeholder="e.g. Lace, Cotton..."
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <FInput
                  label="Price (₦)"
                  required
                  type="number"
                  error={errs.price}
                  value={f.price}
                  onChange={(event) => {
                    upd("price", event.target.value);
                    setErrs((value) => ({ ...value, price: "" }));
                  }}
                  placeholder="12500"
                />
                <FInput
                  label="Quantity Available"
                  required
                  type="number"
                  error={errs.stock}
                  value={f.stock}
                  onChange={(event) => {
                    upd("stock", event.target.value);
                    setErrs((value) => ({ ...value, stock: "" }));
                  }}
                  placeholder="20"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ padding: 12, background: C.brownLight, border: `1px solid ${C.brown}33`, borderRadius: 10, marginBottom: 18, display: "flex", gap: 9, alignItems: "center" }}>
                <Bx icon="bx-info-circle" size={17} color={C.brown} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: C.brown }}>{f.category}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>
                    {isWear
                      ? "Select sizes and colors"
                      : {
                          isFab: "Select fabric lengths",
                          isAcc: "Select sizes and colors",
                        }[Object.keys({ isFab, isAcc }).find((key) => ({ isFab, isAcc })[key])] || "Select available variants"}
                  </div>
                </div>
              </div>

              {(isWear || isAcc) && (
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 9 }}>
                    {isWear ? "Sizes" : "Sizes (Inches)"}
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {(isWear ? SIZES : INCHES_LIST).map((size) => {
                      const selected = (isWear ? f.sizes : f.inches).includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => tog(isWear ? "sizes" : "inches", size)}
                          style={{ padding: "6px 13px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: selected ? C.brown : C.bg, color: selected ? "#fff" : C.textMuted, border: `1.5px solid ${selected ? C.brown : C.border}`, cursor: "pointer" }}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {isFab && (
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 9 }}>
                    Available Lengths
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {LENGTHS.map((length) => {
                      const selected = f.lengths.includes(length);
                      return (
                        <button
                          key={length}
                          onClick={() => tog("lengths", length)}
                          style={{ padding: "6px 13px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: selected ? C.brown : C.bg, color: selected ? "#fff" : C.textMuted, border: `1.5px solid ${selected ? C.brown : C.border}`, cursor: "pointer" }}
                        >
                          {length}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {(isWear || isAcc) && (
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 9 }}>Colors</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {PRESET_COLORS.map((color) => {
                      const selected = f.colors.includes(color.name);
                      return (
                        <div key={color.name} onClick={() => tog("colors", color.name)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: color.hex, border: `3px solid ${selected ? C.brown : "transparent"}`, boxShadow: selected ? `0 0 0 2px ${C.brown}` : "none", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, textShadow: "0 1px 3px #000" }}>
                            {selected ? "✓" : ""}
                          </div>
                          <span style={{ fontSize: 9, color: selected ? C.brown : C.textMuted, fontWeight: 600, textAlign: "center", maxWidth: 36, lineHeight: 1.2 }}>
                            {color.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 9 }}>Discount Type</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[{ v: "none", icon: "bx-block", l: "No Discount", d: "Full price" }, { v: "percentage", icon: "bx-purchase-tag", l: "% Off", d: "Generate coupon" }].map((opt) => (
                    <div
                      key={opt.v}
                      onClick={() => {
                        upd("discount", opt.v);
                        upd("coupon", "");
                        upd("couponOk", false);
                      }}
                      style={{ padding: 14, borderRadius: 12, cursor: "pointer", border: `2px solid ${f.discount === opt.v ? C.brown : C.border}`, background: f.discount === opt.v ? C.brownLight : C.bg, textAlign: "center", transition: "all 0.18s" }}
                    >
                      <Bx icon={opt.icon} size={22} color={f.discount === opt.v ? C.brown : C.textMuted} />
                      <div style={{ fontWeight: 700, fontSize: 13, color: f.discount === opt.v ? C.brown : C.text, marginTop: 5 }}>{opt.l}</div>
                      <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{opt.d}</div>
                    </div>
                  ))}
                </div>
              </div>

              {f.discount === "percentage" && (
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 13 }}>
                    {[5, 10, 15, 20, 25, 30, 50].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => {
                          upd("discPct", pct);
                          upd("coupon", "");
                          upd("couponOk", false);
                        }}
                        style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: +f.discPct === pct ? C.brown : C.bg, color: +f.discPct === pct ? "#fff" : C.textMuted, border: `1.5px solid ${+f.discPct === pct ? C.brown : C.border}`, cursor: "pointer" }}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 9, marginBottom: 14 }}>
                    <div style={{ flex: 1, position: "relative" }}>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={f.discPct}
                        onChange={(event) => {
                          upd("discPct", event.target.value);
                          upd("coupon", "");
                          upd("couponOk", false);
                        }}
                        placeholder="%"
                        style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 36px 10px 14px", fontSize: 13, color: C.text, outline: "none", fontFamily: "inherit" }}
                      />
                      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: C.textMuted, fontWeight: 700 }}>%</span>
                    </div>
                    <Btn
                      icon="bx-barcode"
                      onClick={() => {
                        if (!f.discPct || +f.discPct <= 0 || +f.discPct > 100) {
                          setErrs((value) => ({ ...value, cp: "Enter valid % (1-100)" }));
                          return;
                        }
                        setErrs((value) => ({ ...value, cp: "" }));
                        upd("coupon", genCoupon(f.discPct));
                        upd("couponOk", true);
                      }}
                    >
                      Generate
                    </Btn>
                  </div>
                  {errs.cp && <p style={{ color: C.red, fontSize: 11, marginBottom: 10 }}>⚠ {errs.cp}</p>}
                  {f.couponOk && f.coupon && (
                    <div style={{ padding: 14, background: C.greenBg, border: `1px solid ${C.green}44`, borderRadius: 12 }}>
                      <div style={{ color: C.green, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>✓ COUPON GENERATED</div>
                      <div style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 8 }}>
                        <div style={{ flex: 1, padding: "10px 14px", background: C.white, border: `2px dashed ${C.brown}`, borderRadius: 8, fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: C.brown, letterSpacing: 2 }}>
                          {f.coupon}
                        </div>
                        <button onClick={() => navigator.clipboard?.writeText(f.coupon)} style={{ padding: "10px 12px", background: C.brownLight, border: `1px solid ${C.brown}44`, borderRadius: 8, cursor: "pointer" }}>
                          📋
                        </button>
                      </div>
                      <div style={{ fontSize: 11, color: C.textMuted }}>{f.discPct}% off · {f.price ? `${fmt(f.price)} → ${fmt(f.price * (1 - f.discPct / 100))}` : "-"}</div>
                      <button onClick={() => { upd("coupon", genCoupon(f.discPct)); }} style={{ marginTop: 8, color: C.textMuted, background: "none", border: `1px solid ${C.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>
                        ↻ Regenerate
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div style={{ marginTop: 20, padding: "12px 14px", background: C.bg, borderRadius: 12, border: `1px solid ${C.border}`, display: "flex", gap: 12, alignItems: "center" }}>
                {f.image && <img src={f.image} alt="" style={{ width: 46, height: 46, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name || "Unnamed Product"}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>
                    {f.category}
                    {f.type ? ` · ${f.type}` : ""}
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
                    <span style={{ color: C.brown, fontWeight: 700, fontSize: 13 }}>{f.price ? fmt(f.price) : "-"}</span>
                    <span style={{ color: C.textMuted, fontSize: 11 }}>{f.stock || "0"} units</span>
                    {f.discount === "percentage" && f.discPct && <span style={{ color: C.green, fontSize: 11, fontWeight: 600 }}>{f.discPct}% off</span>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "13px 22px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <Btn variant="ghost" onClick={() => (step > 1 ? setStep((value) => value - 1) : onClose())} icon={step > 1 ? "bx-chevron-left" : undefined}>
            {step === 1 ? "Cancel" : "Back"}
          </Btn>
          {step < 3 ? (
            <Btn onClick={next}>
              Continue <Bx icon="bx-chevron-right" size={15} color="#fff" />
            </Btn>
          ) : (
            <Btn onClick={submit} icon="bx-check">Add Product</Btn>
          )}
        </div>
      </div>
    </div>
  );
}
