const { useState, useEffect } = React;

function useBoxicons() {
  useEffect(() => {
    if (document.getElementById("boxicons-css")) return;
    const link = document.createElement("link");
    link.id = "boxicons-css";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css";
    document.head.appendChild(link);
  }, []);
}

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Poppins', sans-serif !important; background: #FFFFFF; color: #1A1208; }
  input, textarea, select, button { font-family: 'Poppins', sans-serif !important; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #FFFFFF; }
  ::-webkit-scrollbar-thumb { background: #C17B3F88; border-radius: 4px; }
  @media (max-width: 900px) { .ank-sidebar { transform: translateX(-100%) !important; } .ank-sidebar.open { transform: translateX(0) !important; } .ank-main { margin-left: 0 !important; } }
  @media (max-width: 768px) { .ank-menu-btn { display: flex !important; } }
  .msg-tabs { display: flex; gap: 6px; margin-bottom: 20px; flex-wrap: wrap; }
  .msg-tab-btn { display: flex; align-items: center; gap: 6px; }
  .bulk-layout { display: grid; grid-template-columns: minmax(0,1.5fr) minmax(0,1fr); gap: 18px; }
  .bulk-side { display: flex; flex-direction: column; gap: 14px; }
  .bulk-actions { display: flex; justify-content: flex-end; gap: 8px; }
  .compose-layout { display: grid; grid-template-columns: minmax(0,1.5fr) minmax(0,1fr); gap: 18px; }
  .compose-actions { display: flex; justify-content: flex-end; gap: 8px; }
  .ov-panels {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      "recent"
      "sales";
    gap: 18px;
    margin-bottom: 18px;
  }
  .ov-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(180px,1fr));
    gap: 14px;
    margin-bottom: 22px;
  }
  .ov-recent { grid-area: recent; min-width: 0; }
  .ov-sales { grid-area: sales; min-width: 0; }
  .mobile-only { display: none; }
  @media (max-width: 600px) {
    .msg-tabs { flex-wrap: nowrap; }
    .msg-tab-btn {
      flex: 1 1 0;
      min-width: 0;
      justify-content: center;
      padding: 8px 10px !important;
      font-size: 12px !important;
    }
    .msg-tab-label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  @media (max-width: 900px) {
    .bulk-layout { grid-template-columns: 1fr; }
    .bulk-actions { flex-direction: column; }
    .bulk-actions button { width: 100%; justify-content: center; }
    .compose-layout { grid-template-columns: 1fr; }
    .compose-actions { flex-direction: column; }
    .compose-actions button { width: 100%; justify-content: center; }
    .ov-panels {
      grid-template-columns: 1fr;
      grid-template-areas:
        "recent"
        "sales";
      gap: 16px;
    }
  }
  @media (max-width: 760px) {
    .ov-stats { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }
    .desktop-table-wrap { display: none !important; }
    .mobile-only { display: block; }
    .mobile-list { display: flex; flex-direction: column; gap: 10px; padding: 12px; }
    .mobile-item {
      border: 1px solid #EAE2D8;
      border-radius: 12px;
      background: #FFFFFF;
      padding: 12px;
    }
    .mobile-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
    .mobile-id {
      display: inline-block;
      background: #F5F0EB;
      border-radius: 8px;
      padding: 3px 8px;
      font-size: 12px;
      font-weight: 700;
      color: #4A3728;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mobile-title { font-size: 13px; font-weight: 700; color: #1A1208; }
    .mobile-sub { font-size: 11px; color: #9E8B7A; margin-top: 2px; }
    .mobile-rows { display: flex; flex-direction: column; gap: 7px; }
    .mobile-row { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
    .mobile-k { color: #4A3728; font-size: 12px; }
    .mobile-v { color: #1A1208; font-size: 12px; font-weight: 600; text-align: right; max-width: 58%; word-break: break-word; }
    .mobile-actions { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
  }
`;

const C = {
  bg: "#F5F0EB", white: "#FFFFFF", border: "#EAE2D8",
  brown: "#C17B3F", brownDark: "#9E5F28", brownLight: "#FEF3E8",
  text: "#1A1208", textMed: "#4A3728", textMuted: "#9E8B7A",
  green: "#2E7D52", greenBg: "#EAF7EE",
  red: "#D94F3D", redBg: "#FDECEA",
  blue: "#2E6FAA", blueBg: "#EBF4FB",
  shadow: "0 1px 4px rgba(0,0,0,0.07)",
  shadowMd: "0 4px 20px rgba(0,0,0,0.12)",
};

const CUSTOMERS = [
  { id: 1, name: "Adaeze Okafor",    email: "adaeze@email.com",   orders: 12, spent: 245000, joined: "Jan 2025", tier: "vip",     av: "AO" },
  { id: 2, name: "Funmi Adeyemi",    email: "funmi@email.com",    orders: 7,  spent: 98500,  joined: "Mar 2025", tier: "regular", av: "FA" },
  { id: 3, name: "Chisom Eze",       email: "chisom@email.com",   orders: 3,  spent: 34200,  joined: "Jun 2025", tier: "regular", av: "CE" },
  { id: 4, name: "Ngozi Nwachukwu",  email: "ngozi@email.com",    orders: 18, spent: 387000, joined: "Nov 2024", tier: "vip",     av: "NN" },
  { id: 5, name: "Blessing Osei",    email: "blessing@email.com", orders: 5,  spent: 67800,  joined: "Aug 2025", tier: "regular", av: "BO" },
  { id: 6, name: "Amaka Obiora",     email: "amaka@email.com",    orders: 9,  spent: 154000, joined: "Dec 2024", tier: "regular", av: "AO" },
  { id: 7, name: "Yetunde Badmus",   email: "yetunde@email.com",  orders: 22, spent: 520000, joined: "Oct 2024", tier: "vip",     av: "YB" },
];

const PRODUCTS_INIT = [
  { id: 1, name: "Adire Indigo Fabric",   category: "Ankara Fabrics", price: 4500,  stock: 23, status: "in_stock",    sold: 45, type: "Cotton" },
  { id: 2, name: "Gold Aso-Oke Set",      category: "Aso-Ebi",        price: 28000, stock: 4,  status: "low_stock",   sold: 12, type: "Silk" },
  { id: 3, name: "Ankara Print Dress",    category: "Ready to Wear",  price: 12500, stock: 0,  status: "out_of_stock", sold: 78, type: "Ankara" },
  { id: 4, name: "Beaded Gele Headtie",   category: "Accessories",    price: 6800,  stock: 11, status: "in_stock",    sold: 34, type: "Beaded" },
  { id: 5, name: "Kente Fabric Roll",     category: "Ankara Fabrics", price: 9200,  stock: 2,  status: "low_stock",   sold: 20, type: "Kente" },
  { id: 6, name: "Cowrie Shell Necklace", category: "Accessories",    price: 3400,  stock: 0,  status: "out_of_stock", sold: 55, type: "Shell" },
];

const ORDERS_INIT = [
  { id: "ORD-2841", customerId: 1, customer: "Adaeze Okafor",   items: "Gold Aso-Oke Set x1",               total: 28000, date: "Feb 25, 2026", status: "pending",    address: "14 Allen Ave, Lagos" },
  { id: "ORD-2840", customerId: 2, customer: "Funmi Adeyemi",   items: "Ankara Print Dress x2",             total: 25000, date: "Feb 25, 2026", status: "processing", address: "7 Independence Rd, Ibadan" },
  { id: "ORD-2839", customerId: 3, customer: "Chisom Eze",      items: "Cowrie Shell Necklace x1, Gele x1", total: 10200, date: "Feb 24, 2026", status: "cancelled",  address: "22 Aba Rd, Port Harcourt" },
  { id: "ORD-2838", customerId: 4, customer: "Ngozi Nwachukwu", items: "Kente Fabric Roll x2",              total: 18400, date: "Feb 24, 2026", status: "completed",  address: "5 Wuse II, Abuja" },
  { id: "ORD-2837", customerId: 5, customer: "Blessing Osei",   items: "Adire Indigo Fabric x3",            total: 13500, date: "Feb 23, 2026", status: "completed",  address: "Accra, Ghana" },
  { id: "ORD-2836", customerId: 6, customer: "Amaka Obiora",    items: "Aso-Ebi Lace Set x1",               total: 35000, date: "Feb 23, 2026", status: "pending",    address: "10 Ikoyi Crescent, Lagos" },
  { id: "ORD-2835", customerId: 7, customer: "Yetunde Badmus",  items: "Kente Fabric Roll x1",              total: 9200,  date: "Feb 22, 2026", status: "completed",  address: "3 Victoria Island, Lagos" },
];

const REVIEWS_INIT = [
  { id: 1, customer: "Adaeze Okafor",   av: "AO", product: "Gold Aso-Oke Set",      rating: 5, comment: "Absolutely stunning quality! The fabric is rich and the colour is exactly as pictured.", date: "Feb 22", replied: false },
  { id: 2, customer: "Ngozi Nwachukwu", av: "NN", product: "Adire Indigo Fabric",   rating: 4, comment: "Beautiful fabric, fast delivery. Slightly darker than expected but gorgeous.", date: "Feb 20", replied: true },
  { id: 3, customer: "Funmi Adeyemi",   av: "FA", product: "Ankara Print Dress",    rating: 5, comment: "Perfect fit! The dress is well-sewn and the pattern is so vibrant.", date: "Feb 18", replied: false },
  { id: 4, customer: "Blessing Osei",   av: "BO", product: "Cowrie Shell Necklace", rating: 3, comment: "Nice piece but took longer to arrive than expected.", date: "Feb 15", replied: true },
];

const NOTIFS_INIT = [
  { id: 1, type: "order",       title: "New Order Placed", message: "ORD-2841 from Adaeze Okafor — ₦28,000",        time: "2 min ago",  read: false, replied: false },
  { id: 2, type: "low_stock",  title: "Low Stock Alert",  message: "Gold Aso-Oke Set — only 4 units remaining",     time: "15 min ago", read: false },
  { id: 3, type: "order",       title: "New Order Placed", message: "ORD-2840 from Funmi Adeyemi — ₦25,000",         time: "1 hr ago",   read: false, replied: false },
  { id: 4, type: "out_of_stock",title: "Out of Stock!",   message: "Ankara Print Dress is now out of stock",        time: "2 hrs ago",  read: true },
  { id: 5, type: "low_stock",  title: "Low Stock Alert",  message: "Kente Fabric Roll — only 2 units remaining",   time: "3 hrs ago",  read: true },
  { id: 6, type: "out_of_stock",title: "Out of Stock!",   message: "Cowrie Shell Necklace is now out of stock",     time: "5 hrs ago",  read: true },
];

const MSGS_INIT = [
  { id: 1, from: "Adaeze Okafor",  email: "adaeze@email.com", body: "Thank you for your purchase! We hope you love your new item 🎉", type: "sent",     time: "Feb 22", isBulk: false },
  { id: 2, from: "Funmi Adeyemi",  email: "funmi@email.com",  body: "Hi, I wanted to ask about the delivery time for my order?",     type: "received", time: "Feb 24", isBulk: false },
  { id: 3, from: "All Customers",  email: "—",                body: "BULK: Thank you all for shopping with us this season!",          type: "sent",     time: "Feb 21", isBulk: true },
];

const stockSt = (n) => n === 0 ? "out_of_stock" : n <= 4 ? "low_stock" : "in_stock";
const fmt = (n) => `₦${Number(n).toLocaleString()}`;

const SIZES = ["XS","S","M","L","XL","XXL","XXXL"];
const LENGTHS = ["1 yard","2 yards","3 yards","4 yards","5 yards","6 yards","Custom"];
const INCHES_LIST = ['4"','6"','8"','10"','12"','14"','16"','18"','20"','Custom'];
const PRESET_COLORS = [
  {name:"Royal Blue",hex:"#1a3a8f"},{name:"Crimson",hex:"#9b1c1c"},
  {name:"Gold",hex:"#C17B3F"},{name:"Forest Green",hex:"#1a5c2a"},
  {name:"Purple",hex:"#5b2d8e"},{name:"Ivory",hex:"#f5e6c8"},
  {name:"Black",hex:"#1a1108"},{name:"Orange",hex:"#c1440e"},
  {name:"Teal",hex:"#0d6e6e"},{name:"Pink",hex:"#c94f8a"},
  {name:"White",hex:"#f0f0f0"},{name:"Navy",hex:"#0d1f4c"},
];

function genCoupon(pct) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return `ANK${pct}OFF-` + Array.from({length:6},()=>chars[Math.floor(Math.random()*chars.length)]).join("");
}

/* ─── PRIMITIVES ─── */
function Bx({ icon, size=18, color, style:sx={} }) {
  return <i className={`bx ${icon}`} style={{fontSize:size,color,lineHeight:1,...sx}} />;
}

function Av({ initials, size=36, color=C.brown }) {
  return <div style={{width:size,height:size,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:size*0.36,flexShrink:0}}>{initials}</div>;
}

function Card({children,style:sx={},onClick}) {
  return <div onClick={onClick} style={{background:C.white,borderRadius:14,border:`1px solid ${C.border}`,boxShadow:C.shadow,...sx}}>{children}</div>;
}

function Badge({status}) {
  const M = {
    pending:      {bg:"#FEF3E8",c:C.brown,   l:"Pending"},
    processing:   {bg:C.blueBg, c:C.blue,    l:"Processing"},
    completed:    {bg:C.greenBg,c:C.green,   l:"Completed"},
    cancelled:    {bg:C.redBg,  c:C.red,     l:"Cancelled"},
    in_stock:     {bg:C.greenBg,c:C.green,   l:"In Stock"},
    low_stock:    {bg:"#FEF3E8",c:C.brown,   l:"Low Stock"},
    out_of_stock: {bg:C.redBg,  c:C.red,     l:"Out of Stock"},
  };
  const s=M[status]||M.pending;
  return <span style={{background:s.bg,color:s.c,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>{s.l}</span>;
}

function StatCard({label,value,sub,icon,featured,trend}) {
  return (
    <Card style={{padding:"18px 20px",background:featured?C.brown:C.white,borderColor:featured?C.brown:C.border}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{color:featured?"rgba(255,255,255,0.75)":C.textMuted,fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>{label}</div>
          <div style={{color:featured?"#fff":C.text,fontSize:24,fontWeight:800,lineHeight:1}}>{value}</div>
          {sub&&<div style={{color:featured?"rgba(255,255,255,0.7)":C.textMuted,fontSize:11,marginTop:5}}>{sub}</div>}
        </div>
        {icon && (
          <div style={{width:42,height:42,borderRadius:11,background:featured?"rgba(255,255,255,0.2)":C.brownLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <Bx icon={icon} size={20} color={featured?"#fff":C.brown} />
          </div>
        )}
      </div>
      {trend!=null&&(
        <div style={{marginTop:10,display:"flex",alignItems:"center",gap:4}}>
          <Bx icon={trend>=0?"bx-trending-up":"bx-trending-down"} size={13} color={featured?"rgba(255,255,255,0.9)":trend>=0?C.green:C.red} />
          <span style={{color:featured?"rgba(255,255,255,0.9)":trend>=0?C.green:C.red,fontSize:11,fontWeight:700}}>{Math.abs(trend)}%</span>
          <span style={{color:featured?"rgba(255,255,255,0.6)":C.textMuted,fontSize:10}}>vs last month</span>
        </div>
      )}
    </Card>
  );
}

function Btn({children,variant="primary",size="md",onClick,style:sx={},icon,type="button"}) {
  const V={
    primary:{background:C.brown,color:"#fff",border:"none"},
    outline:{background:"transparent",color:C.brown,border:`1.5px solid ${C.brown}`},
    ghost:  {background:"transparent",color:C.textMuted,border:`1.5px solid ${C.border}`},
    danger: {background:C.red,color:"#fff",border:"none"},
    success:{background:C.green,color:"#fff",border:"none"},
  };
  const S={sm:{padding:"5px 11px",fontSize:11},md:{padding:"9px 18px",fontSize:13},lg:{padding:"12px 24px",fontSize:14}};
  return (
    <button type={type} onClick={onClick} style={{...V[variant],...S[size],borderRadius:9,fontWeight:600,fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:5,whiteSpace:"nowrap",cursor:"pointer",...sx}}>
      {icon&&<Bx icon={icon} size={size==="sm"?13:15} color={V[variant].color} />}
      {children}
    </button>
  );
}

function FInput({label,required,error,type="text",value,onChange,placeholder,rows}) {
  const base={width:"100%",background:C.bg,border:`1.5px solid ${error?C.red:C.border}`,borderRadius:10,padding:"10px 14px",color:C.text,fontSize:13,outline:"none",fontFamily:"inherit"};
  return (
    <div style={{marginBottom:15}}>
      {label&&<label style={{display:"block",fontSize:10,fontWeight:700,color:C.textMuted,letterSpacing:1.2,textTransform:"uppercase",marginBottom:7}}>{label}{required&&<span style={{color:C.red,marginLeft:3}}>*</span>}</label>}
      {rows?<textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{...base,resize:"vertical"}} />:<input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} />}
      {error&&<p style={{color:C.red,fontSize:11,marginTop:4}}>⚠ {error}</p>}
    </div>
  );
}

function FSelect({label,required,value,onChange,options}) {
  return (
    <div style={{marginBottom:15}}>
      {label&&<label style={{display:"block",fontSize:10,fontWeight:700,color:C.textMuted,letterSpacing:1.2,textTransform:"uppercase",marginBottom:7}}>{label}{required&&<span style={{color:C.red,marginLeft:3}}>*</span>}</label>}
      <select value={value} onChange={onChange} style={{width:"100%",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 14px",color:C.text,fontSize:13,outline:"none",fontFamily:"inherit",appearance:"none"}}>
        {options.map(o=><option key={o.value??o} value={o.value??o}>{o.label??o}</option>)}
      </select>
    </div>
  );
}

/* ─── SIDEBAR ─── */
const NAV_GROUPS = [
  {group:"Productivity",    items:[{id:"overview",icon:"bx-grid-alt",label:"Overview"},{id:"messages",icon:"bx-message-dots",label:"Messages"},{id:"products",label:"Products"}]},
  {group:"Market Insights", items:[{id:"orders",icon:"bx-cart",label:"Orders"},{id:"earnings",icon:"bx-line-chart",label:"Earnings"}]},
  {group:"Profile & Settings",items:[{id:"customers",icon:"bx-group",label:"Customers"},{id:"reviews",icon:"bx-star",label:"Reviews"},{id:"notifications",icon:"bx-bell",label:"Notifications",badge:true}]},
];

function Sidebar({active,setActive,notifCount,open,onClose}) {
  return (
    <>
      {open&&<div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:198,display:"none"}} className="ank-overlay" />}
      <aside className={`ank-sidebar${open?" open":""}`} style={{width:220,minHeight:"100vh",background:C.white,borderRight:`1px solid ${C.border}`,position:"fixed",top:0,left:0,zIndex:200,display:"flex",flexDirection:"column",boxShadow:C.shadowMd,transition:"transform 0.28s cubic-bezier(0.4,0,0.2,1)"}}>
        <div style={{padding:"22px 18px 16px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:38,height:38,background:C.brown,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><Bx icon="bx-store" size={20} color="#fff" /></div>
            <div>
              <div style={{fontWeight:800,fontSize:14,color:C.text,lineHeight:1.1}}>fabricsby_tayejenifa</div>
              <div style={{fontSize:10,color:C.textMuted,letterSpacing:1.5,textTransform:"uppercase"}}>Admin Panel</div>
            </div>
          </div>
        </div>

        <nav style={{flex:1,padding:"14px 10px",overflowY:"auto"}}>
          {NAV_GROUPS.map(sec=>(
            <div key={sec.group} style={{marginBottom:20}}>
              <div style={{fontSize:9,fontWeight:700,color:"#C0B0A0",letterSpacing:1.8,textTransform:"uppercase",padding:"0 10px",marginBottom:5}}>{sec.group}</div>
              {sec.items.map(item=>{
                const active2=active===item.id;
                return (
                  <button key={item.id} onClick={()=>{setActive(item.id);onClose();}} style={{width:"100%",display:"flex",alignItems:"center",gap:item.icon?9:0,padding:"10px 11px",borderRadius:10,marginBottom:2,background:active2?C.brown:"transparent",border:"none",color:active2?"#fff":C.textMuted,textAlign:"left",fontSize:13,fontWeight:active2?600:400,transition:"all 0.15s",cursor:"pointer"}}>
                    {item.icon&&<Bx icon={item.icon} size={17} color={active2?"#fff":C.textMuted} />}
                    <span style={{flex:1}}>{item.label}</span>
                    {item.badge&&notifCount>0&&<span style={{background:C.red,color:"#fff",fontSize:10,borderRadius:20,padding:"1px 6px",fontWeight:700}}>{notifCount}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div style={{padding:"13px 14px",borderTop:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <Av initials="SA" size={32} />
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,fontSize:12,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>Store Admin</div>
              <div style={{fontSize:10,color:C.textMuted}}>Super Admin</div>
            </div>
            <Bx icon="bx-log-out" size={15} color={C.textMuted} />
          </div>
        </div>
        <style>{`.ank-overlay{display:block!important;} @media(min-width:901px){.ank-overlay{display:none!important;}}`}</style>
      </aside>
    </>
  );
}

/* ─── TOPBAR ─── */
function Topbar({onMenu,notifCount,onNotif}) {
  return (
    <header style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"0 20px",height:58,display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:99}}>
      <button onClick={onMenu} className="ank-menu-btn" style={{background:"none",border:"none",padding:5,borderRadius:8,display:"none",cursor:"pointer",flexShrink:0}}>
        <Bx icon="bx-menu" size={22} color={C.textMed} />
      </button>
      <div style={{display:"flex",alignItems:"center",gap:8,background:C.bg,borderRadius:24,padding:"7px 15px",maxWidth:280,flex:"0 1 280px"}}>
        <Bx icon="bx-search" size={15} color={C.textMuted} />
        <span style={{color:C.textMuted,fontSize:13}}>Search...</span>
      </div>
      <div style={{flex:1}} />
      <button onClick={onNotif} style={{position:"relative",background:"none",border:"none",padding:6,borderRadius:8,cursor:"pointer"}}>
        <Bx icon="bx-bell" size={21} color={C.textMed} />
        {notifCount>0&&<span style={{position:"absolute",top:4,right:4,width:8,height:8,background:C.red,borderRadius:"50%",border:`2px solid ${C.white}`}} />}
      </button>
      <Av initials="SA" size={32} />
      <style>{`@media(max-width:900px){.ank-menu-btn{display:flex!important;}}`}</style>
    </header>
  );
}

/* ─── ADD PRODUCT MODAL ─── */
function AddProductModal({onClose,onAdd}) {
  const [step,setStep]=useState(1);
  const [f,setF]=useState({name:"",desc:"",category:"Ankara Fabrics",type:"",price:"",stock:"",image:null,sizes:[],colors:[],lengths:[],inches:[],discount:"none",discPct:"",coupon:"",couponOk:false});
  const [errs,setErrs]=useState({});
  const upd=(k,v)=>setF(p=>({...p,[k]:v}));
  const tog=(k,v)=>upd(k,f[k].includes(v)?f[k].filter(x=>x!==v):[...f[k],v]);

  const validateStep1=()=>{
    const e={};
    if(!f.name.trim())e.name="Required";
    if(!f.desc.trim())e.desc="Required";
    if(!f.price||+f.price<=0)e.price="Enter valid price";
    if(f.stock===""||+f.stock<0)e.stock="Enter valid quantity";
    setErrs(e);
    return !Object.keys(e).length;
  };

  const next=()=>{if(step===1&&!validateStep1())return;setStep(s=>s+1);};
  const submit=()=>{
    if(!validateStep1()){setStep(1);return;}
    onAdd({...f,status:stockSt(+f.stock),price:+f.price,stock:+f.stock,sold:0});
  };

  const isFab=f.category==="Ankara Fabrics"||f.category==="Aso-Ebi";
  const isWear=f.category==="Ready to Wear";
  const isAcc=f.category==="Accessories";

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.white,borderRadius:20,width:"100%",maxWidth:580,maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 20px 60px rgba(0,0,0,0.22)"}}>

        {/* Header */}
        <div style={{padding:"18px 22px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div>
              <h2 style={{fontWeight:800,fontSize:18,color:C.text}}>Add New Product</h2>
              <p style={{fontSize:12,color:C.textMuted,marginTop:2}}>{["Basic Info","Variants","Discount"][step-1]} — Step {step} of 3</p>
            </div>
            <button onClick={onClose} style={{background:C.bg,border:"none",borderRadius:10,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
              <Bx icon="bx-x" size={18} color={C.textMuted} />
            </button>
          </div>
          <div style={{display:"flex",gap:6}}>
            {[1,2,3].map(s=><div key={s} style={{flex:1,height:5,borderRadius:3,background:s<=step?C.brown:C.border,transition:"background 0.3s"}} />)}
          </div>
        </div>

        {/* Body */}
        <div style={{flex:1,overflowY:"auto",padding:"18px 22px"}}>

          {step===1&&(
            <div>
              <div style={{marginBottom:15}}>
                <label style={{display:"block",fontSize:10,fontWeight:700,color:C.textMuted,letterSpacing:1.2,textTransform:"uppercase",marginBottom:7}}>Product Image</label>
                <div onClick={()=>document.getElementById("pimg").click()} style={{border:`2px dashed ${C.border}`,borderRadius:12,padding:18,textAlign:"center",cursor:"pointer",background:C.bg}}>
                  <input id="pimg" type="file" accept="image/*" onChange={e=>{const r=new FileReader();r.onload=ev=>upd("image",ev.target.result);r.readAsDataURL(e.target.files[0]);}} style={{display:"none"}} />
                  {f.image?(<div style={{position:"relative",display:"inline-block"}}><img src={f.image} alt="" style={{width:80,height:80,objectFit:"cover",borderRadius:10,border:`2px solid ${C.brown}`}} /><button onClick={e=>{e.stopPropagation();upd("image",null);}} style={{position:"absolute",top:-8,right:-8,width:20,height:20,borderRadius:"50%",background:C.red,color:"#fff",border:"none",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>✕</button></div>)
                  :(<><Bx icon="bx-image-add" size={30} color={C.textMuted} /><div style={{fontSize:13,fontWeight:600,color:C.textMed,marginTop:5}}>Click to upload</div><div style={{fontSize:11,color:C.textMuted}}>PNG, JPG, WEBP</div></>)}
                </div>
              </div>
              <FInput label="Product Name" required error={errs.name} value={f.name} onChange={e=>{upd("name",e.target.value);setErrs(v=>({...v,name:""}));}} placeholder="e.g. Adire Indigo Fabric" />
              <FInput label="Description" required error={errs.desc} value={f.desc} onChange={e=>{upd("desc",e.target.value);setErrs(v=>({...v,desc:""}));}} placeholder="Describe fabric quality, care, origin..." rows={3} />
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <FSelect label="Category" required value={f.category} onChange={e=>upd("category",e.target.value)} options={["Ankara Fabrics","Aso-Ebi","Ready to Wear","Accessories"]} />
                <FInput label="Type" value={f.type} onChange={e=>upd("type",e.target.value)} placeholder="e.g. Lace, Cotton..." />
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <FInput label="Price (₦)" required type="number" error={errs.price} value={f.price} onChange={e=>{upd("price",e.target.value);setErrs(v=>({...v,price:""}));}} placeholder="12500" />
                <FInput label="Quantity Available" required type="number" error={errs.stock} value={f.stock} onChange={e=>{upd("stock",e.target.value);setErrs(v=>({...v,stock:""}));}} placeholder="20" />
              </div>
            </div>
          )}

          {step===2&&(
            <div>
              <div style={{padding:12,background:C.brownLight,border:`1px solid ${C.brown}33`,borderRadius:10,marginBottom:18,display:"flex",gap:9,alignItems:"center"}}>
                <Bx icon="bx-info-circle" size={17} color={C.brown} />
                <div><div style={{fontWeight:700,fontSize:13,color:C.brown}}>{f.category}</div><div style={{fontSize:11,color:C.textMuted}}>{isWear?"Select sizes and colors":{isFab:"Select fabric lengths",isAcc:"Select sizes and colors"}[Object.keys({isFab,isAcc}).find(k=>({isFab,isAcc})[k])]||"Select available variants"}</div></div>
              </div>

              {(isWear||isAcc)&&(
                <div style={{marginBottom:18}}>
                  <label style={{display:"block",fontSize:10,fontWeight:700,color:C.textMuted,letterSpacing:1.2,textTransform:"uppercase",marginBottom:9}}>{isWear?"Sizes":"Sizes (Inches)"}</label>
                  <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                    {(isWear?SIZES:INCHES_LIST).map(s=>{const sel=(isWear?f.sizes:f.inches).includes(s);return(<button key={s} onClick={()=>tog(isWear?"sizes":"inches",s)} style={{padding:"6px 13px",borderRadius:8,fontSize:12,fontWeight:600,background:sel?C.brown:C.bg,color:sel?"#fff":C.textMuted,border:`1.5px solid ${sel?C.brown:C.border}`,cursor:"pointer"}}>{s}</button>);})}
                  </div>
                </div>
              )}
              {isFab&&(
                <div style={{marginBottom:18}}>
                  <label style={{display:"block",fontSize:10,fontWeight:700,color:C.textMuted,letterSpacing:1.2,textTransform:"uppercase",marginBottom:9}}>Available Lengths</label>
                  <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                    {LENGTHS.map(l=>{const sel=f.lengths.includes(l);return(<button key={l} onClick={()=>tog("lengths",l)} style={{padding:"6px 13px",borderRadius:8,fontSize:12,fontWeight:600,background:sel?C.brown:C.bg,color:sel?"#fff":C.textMuted,border:`1.5px solid ${sel?C.brown:C.border}`,cursor:"pointer"}}>{l}</button>);})}
                  </div>
                </div>
              )}
              {(isWear||isAcc)&&(
                <div>
                  <label style={{display:"block",fontSize:10,fontWeight:700,color:C.textMuted,letterSpacing:1.2,textTransform:"uppercase",marginBottom:9}}>Colors</label>
                  <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
                    {PRESET_COLORS.map(c=>{const sel=f.colors.includes(c.name);return(<div key={c.name} onClick={()=>tog("colors",c.name)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"}}><div style={{width:32,height:32,borderRadius:8,background:c.hex,border:`3px solid ${sel?C.brown:"transparent"}`,boxShadow:sel?`0 0 0 2px ${C.brown}`:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,textShadow:"0 1px 3px #000"}}>{sel?"✓":""}</div><span style={{fontSize:9,color:sel?C.brown:C.textMuted,fontWeight:600,textAlign:"center",maxWidth:36,lineHeight:1.2}}>{c.name}</span></div>);})}
                  </div>
                </div>
              )}
            </div>
          )}

          {step===3&&(
            <div>
              <div style={{marginBottom:18}}>
                <label style={{display:"block",fontSize:10,fontWeight:700,color:C.textMuted,letterSpacing:1.2,textTransform:"uppercase",marginBottom:9}}>Discount Type</label>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {[{v:"none",icon:"bx-block",l:"No Discount",d:"Full price"},{v:"percentage",icon:"bx-purchase-tag",l:"% Off",d:"Generate coupon"}].map(opt=>(
                    <div key={opt.v} onClick={()=>{upd("discount",opt.v);upd("coupon","");upd("couponOk",false);}} style={{padding:14,borderRadius:12,cursor:"pointer",border:`2px solid ${f.discount===opt.v?C.brown:C.border}`,background:f.discount===opt.v?C.brownLight:C.bg,textAlign:"center",transition:"all 0.18s"}}>
                      <Bx icon={opt.icon} size={22} color={f.discount===opt.v?C.brown:C.textMuted} />
                      <div style={{fontWeight:700,fontSize:13,color:f.discount===opt.v?C.brown:C.text,marginTop:5}}>{opt.l}</div>
                      <div style={{fontSize:11,color:C.textMuted,marginTop:2}}>{opt.d}</div>
                    </div>
                  ))}
                </div>
              </div>

              {f.discount==="percentage"&&(
                <div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:13}}>
                    {[5,10,15,20,25,30,50].map(p=><button key={p} onClick={()=>{upd("discPct",p);upd("coupon","");upd("couponOk",false);}} style={{padding:"5px 12px",borderRadius:20,fontSize:12,fontWeight:700,background:+f.discPct===p?C.brown:C.bg,color:+f.discPct===p?"#fff":C.textMuted,border:`1.5px solid ${+f.discPct===p?C.brown:C.border}`,cursor:"pointer"}}>{p}%</button>)}
                  </div>
                  <div style={{display:"flex",gap:9,marginBottom:14}}>
                    <div style={{flex:1,position:"relative"}}>
                      <input type="number" min="1" max="100" value={f.discPct} onChange={e=>{upd("discPct",e.target.value);upd("coupon","");upd("couponOk",false);}} placeholder="%" style={{width:"100%",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 36px 10px 14px",fontSize:13,color:C.text,outline:"none",fontFamily:"inherit"}} />
                      <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:C.textMuted,fontWeight:700}}>%</span>
                    </div>
                    <Btn icon="bx-barcode" onClick={()=>{
                      if(!f.discPct||+f.discPct<=0||+f.discPct>100){setErrs(v=>({...v,cp:"Enter valid % (1–100)"}));return;}
                      setErrs(v=>({...v,cp:""}));upd("coupon",genCoupon(f.discPct));upd("couponOk",true);
                    }}>Generate</Btn>
                  </div>
                  {errs.cp&&<p style={{color:C.red,fontSize:11,marginBottom:10}}>⚠ {errs.cp}</p>}
                  {f.couponOk&&f.coupon&&(
                    <div style={{padding:14,background:C.greenBg,border:`1px solid ${C.green}44`,borderRadius:12}}>
                      <div style={{color:C.green,fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:8}}>✓ COUPON GENERATED</div>
                      <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:8}}>
                        <div style={{flex:1,padding:"10px 14px",background:C.white,border:`2px dashed ${C.brown}`,borderRadius:8,fontFamily:"monospace",fontSize:14,fontWeight:700,color:C.brown,letterSpacing:2}}>{f.coupon}</div>
                        <button onClick={()=>navigator.clipboard?.writeText(f.coupon)} style={{padding:"10px 12px",background:C.brownLight,border:`1px solid ${C.brown}44`,borderRadius:8,cursor:"pointer"}}>📋</button>
                      </div>
                      <div style={{fontSize:11,color:C.textMuted}}>{f.discPct}% off · {f.price?`${fmt(f.price)} → ${fmt(f.price*(1-f.discPct/100))}`:"—"}</div>
                      <button onClick={()=>{upd("coupon",genCoupon(f.discPct));}} style={{marginTop:8,color:C.textMuted,background:"none",border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 10px",fontSize:11,cursor:"pointer"}}>↻ Regenerate</button>
                    </div>
                  )}
                </div>
              )}

              {/* Summary */}
              <div style={{marginTop:20,padding:"12px 14px",background:C.bg,borderRadius:12,border:`1px solid ${C.border}`,display:"flex",gap:12,alignItems:"center"}}>
                {f.image && <img src={f.image} style={{width:46,height:46,borderRadius:8,objectFit:"cover",flexShrink:0}} />}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.name||"Unnamed Product"}</div>
                  <div style={{fontSize:11,color:C.textMuted}}>{f.category}{f.type?` · ${f.type}`:""}</div>
                  <div style={{display:"flex",gap:12,marginTop:4,flexWrap:"wrap"}}>
                    <span style={{color:C.brown,fontWeight:700,fontSize:13}}>{f.price?fmt(f.price):"—"}</span>
                    <span style={{color:C.textMuted,fontSize:11}}>{f.stock||"0"} units</span>
                    {f.discount==="percentage"&&f.discPct&&<span style={{color:C.green,fontSize:11,fontWeight:600}}>{f.discPct}% off</span>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{padding:"13px 22px",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <Btn variant="ghost" onClick={()=>step>1?setStep(s=>s-1):onClose()} icon={step>1?"bx-chevron-left":undefined}>{step===1?"Cancel":"Back"}</Btn>
          {step<3?<Btn onClick={next}>Continue <Bx icon="bx-chevron-right" size={15} color="#fff" /></Btn>:<Btn onClick={submit} icon="bx-check">Add Product</Btn>}
        </div>
      </div>
    </div>
  );
}

/* ─── OVERVIEW ─── */
function Overview({products,orders,setPage}) {
  const catData=[{name:"Ankara Fabrics",v:34,c:C.brown},{name:"Aso-Ebi",v:28,c:"#A8622A"},{name:"Ready to Wear",v:24,c:C.green},{name:"Accessories",v:14,c:C.blue}];
  const revData=[{m:"Sep",v:420},{m:"Oct",v:390},{m:"Nov",v:580},{m:"Dec",v:920},{m:"Jan",v:510},{m:"Feb",v:670}];
  const maxV=Math.max(...revData.map(d=>d.v));
  const oos=products.filter(p=>p.status==="out_of_stock").length;
  const lowStockItems=products.filter(p=>p.stock<10);
  const hasLowStock=lowStockItems.length>0;
  const [showStockAlert,setShowStockAlert]=useState(true);

  return (
    <div>
      <div style={{marginBottom:22}}>
        <h1 style={{fontSize:22,fontWeight:800,color:C.text}}>Welcome Back, Admin! 👋</h1>
        <p style={{color:C.textMuted,fontSize:13,marginTop:3}}>Here's what happened with your store today</p>
      </div>
      {hasLowStock&&showStockAlert&&(
        <Card style={{padding:"14px 16px",background:C.redBg,borderColor:`${C.red}33`,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:C.white,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Bx icon="bx-error" size={17} color={C.red} />
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,fontSize:13,color:C.red}}>You have products that need attention.</div>
              <div style={{fontSize:11,color:C.textMed,marginTop:3}}>
                {lowStockItems.length} product{lowStockItems.length!==1?"s":""} ha{lowStockItems.length!==1?"ve":"s"} fewer than 10 units. Restock to avoid stockouts.
              </div>
              <button onClick={()=>setPage("products")} style={{marginTop:8,color:C.red,background:"none",border:`1px solid ${C.red}`,borderRadius:7,padding:"4px 11px",fontSize:11,fontWeight:600,cursor:"pointer"}}>Review Products</button>
            </div>
            <button onClick={()=>setShowStockAlert(false)} aria-label="Close stock alert" style={{width:28,height:28,borderRadius:"50%",border:"none",background:C.white,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
              <Bx icon="bx-x" size={16} color={C.red} />
            </button>
          </div>
        </Card>
      )}
      <div className="ov-stats">
        <StatCard label="Total Revenue"     value="₦3.8M"    sub="February 2026"                icon="bx-money"        featured trend={12} />
        <StatCard label="Orders Completed"  value={orders.filter(o=>o.status==="completed").length} sub="+5% from last month" icon="bx-check-circle" trend={5} />
        <StatCard label="Total Products"    value={products.length} sub={oos>0?`${oos} out of stock`:"All in stock"} icon="bx-package" trend={8} />
        <StatCard label="Total Customers"   value={CUSTOMERS.length} sub="+20% from last month"  icon="bx-group"        trend={20} />
      </div>

      <div className="ov-panels">
        <div className="ov-recent">
        <Card>
          <div style={{padding:"16px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <h3 style={{fontWeight:700,fontSize:15}}>Recent Products</h3>
            <button onClick={()=>setPage("products")} style={{color:C.brown,background:"none",border:"none",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:3,cursor:"pointer"}}>View All <Bx icon="bx-chevron-right" size={15} color={C.brown} /></button>
          </div>
          <div className="desktop-table-wrap" style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:380}}>
              <thead><tr style={{background:"#FAF8F5"}}>{["Products","Price","Stock","Status","Sold"].map(h=><th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:0.8,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>
                {products.slice(0,5).map(p=>(
                  <tr key={p.id} style={{borderTop:`1px solid ${C.border}`}}>
                    <td style={{padding:"11px 14px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:p.image?9:0}}>
                        {p.image && <img src={p.image} style={{width:34,height:34,objectFit:"cover",borderRadius:7,flexShrink:0}} />}
                        <span style={{fontWeight:600,fontSize:13,color:C.text}}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{padding:"11px 14px",fontSize:13,fontWeight:700,color:C.brown,whiteSpace:"nowrap"}}>{fmt(p.price)}</td>
                    <td style={{padding:"11px 14px",fontSize:13,fontWeight:700,color:p.stock===0?C.red:p.stock<=4?"#C17B3F":C.text}}>{p.stock}</td>
                    <td style={{padding:"11px 14px"}}><Badge status={p.status} /></td>
                    <td style={{padding:"11px 14px",fontSize:13,color:C.textMed}}>{p.sold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mobile-only">
            <div className="mobile-list">
              {products.slice(0,5).map(p=>(
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
        <Card style={{padding:18}}>
          <h3 style={{fontWeight:700,fontSize:15,marginBottom:14}}>Sales by Category</h3>
          {catData.map(d=>(
            <div key={d.name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <span style={{fontSize:12,color:C.textMed,minWidth:96,whiteSpace:"nowrap"}}>{d.name}</span>
              <div style={{flex:1,height:6,background:C.bg,borderRadius:3}}>
                <div style={{width:`${d.v}%`,height:"100%",background:d.c,borderRadius:3}} />
              </div>
              <span style={{fontSize:12,fontWeight:700,color:C.text,minWidth:32,textAlign:"right"}}>{d.v}%</span>
            </div>
          ))}
        </Card>
        </div>
      </div>

      <Card style={{padding:20}}>
        <h3 style={{fontWeight:700,fontSize:15,marginBottom:18}}>Monthly Revenue</h3>
        <div style={{display:"flex",alignItems:"flex-end",gap:10,height:130}}>
          {revData.map((d,i)=>(
            <div key={d.m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
              <span style={{fontSize:10,color:C.textMuted}}>₦{d.v}k</span>
              <div style={{width:"100%",borderRadius:"4px 4px 0 0",height:`${(d.v/maxV)*100}px`,background:i===revData.length-1?C.brown:`${C.brown}44`,transition:"height 0.5s ease"}} />
              <span style={{fontSize:10,color:C.textMuted}}>{d.m}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ─── PRODUCTS ─── */
function Products({products,setProducts}) {
  const [filter,setFilter]=useState("all");
  const [showModal,setShowModal]=useState(false);
  const filtered=filter==="all"?products:products.filter(p=>p.status===filter);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:10}}>
        <div><h1 style={{fontSize:22,fontWeight:800,color:C.text}}>Products</h1><p style={{color:C.textMuted,fontSize:13,marginTop:3}}>Manage your inventory</p></div>
        <Btn onClick={()=>setShowModal(true)} icon="bx-plus">Add Product</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:18}}>
        <StatCard label="Total" value={products.length} />
        <StatCard label="In Stock" value={products.filter(p=>p.status==="in_stock").length} icon="bx-check-circle" />
        <StatCard label="Low Stock" value={products.filter(p=>p.status==="low_stock").length} icon="bx-error" />
        <StatCard label="Out of Stock" value={products.filter(p=>p.status==="out_of_stock").length} icon="bx-x-circle" />
      </div>
      <div style={{display:"flex",gap:7,marginBottom:16,flexWrap:"wrap"}}>
        {[["all","All"],["in_stock","In Stock"],["low_stock","Low Stock"],["out_of_stock","Out of Stock"]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)} style={{padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:600,background:filter===v?C.brown:C.white,color:filter===v?"#fff":C.textMuted,border:`1.5px solid ${filter===v?C.brown:C.border}`,cursor:"pointer"}}>{l}</button>
        ))}
      </div>
      <Card>
        <div className="desktop-table-wrap" style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:520}}>
            <thead><tr style={{background:"#FAF8F5"}}>{["Product","Category","Price","Stock","Status","Sold","Actions"].map(h=><th key={h} style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:0.8,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(p=>(
                <tr key={p.id} style={{borderTop:`1px solid ${C.border}`}}>
                  <td style={{padding:"11px 14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:p.image?9:0}}>
                      {p.image && <img src={p.image} style={{width:36,height:36,objectFit:"cover",borderRadius:7,flexShrink:0}} />}
                      <div><div style={{fontWeight:600,fontSize:13,color:C.text}}>{p.name}</div>{p.type&&<div style={{fontSize:10,color:C.textMuted}}>{p.type}</div>}</div>
                    </div>
                  </td>
                  <td style={{padding:"11px 14px",fontSize:12,color:C.textMed,whiteSpace:"nowrap"}}>{p.category}</td>
                  <td style={{padding:"11px 14px",fontSize:13,fontWeight:700,color:C.brown,whiteSpace:"nowrap"}}>{fmt(p.price)}</td>
                  <td style={{padding:"11px 14px",fontSize:13,fontWeight:700,color:p.stock===0?C.red:p.stock<=4?C.brown:C.text}}>{p.stock}</td>
                  <td style={{padding:"11px 14px"}}><Badge status={p.status} /></td>
                  <td style={{padding:"11px 14px",fontSize:13,color:C.textMed}}>{p.sold}</td>
                  <td style={{padding:"11px 14px"}}>
                    <div style={{display:"flex",gap:5}}>
                      <Btn variant="outline" size="sm" icon="bx-edit">Edit</Btn>
                      <Btn variant="ghost" size="sm" icon="bx-trash" onClick={()=>setProducts(prev=>prev.filter(x=>x.id!==p.id))} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-only">
          <div className="mobile-list">
            {filtered.map(p=>(
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
                  <Btn variant="ghost" size="sm" icon="bx-trash" onClick={()=>setProducts(prev=>prev.filter(x=>x.id!==p.id))} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      {showModal&&<AddProductModal onClose={()=>setShowModal(false)} onAdd={data=>{setProducts(prev=>[{id:Date.now(),...data},...prev]);setShowModal(false);}} />}
    </div>
  );
}

/* ─── MESSAGES (FUNCTIONAL) ─── */
const QUICK_TEMPLATES = [
  {label:"Thank you for purchase", body:"Dear Customer,\n\nThank you so much for your recent purchase from fabricsby_tayejenifa! We truly appreciate your support and hope you love your new item.\n\nIf you have any questions, please don't hesitate to reach out.\n\nWarm regards,\nfabricsby_tayejenifa Team 🪡"},
  {label:"Out of stock notice",     body:"Dear Customer,\n\nWe regret to inform you that the item you ordered is currently out of stock. We sincerely apologise for the inconvenience.\n\nWould you like a replacement, or shall we process a full refund? Please let us know.\n\nKind regards,\nfabricsby_tayejenifa Team"},
  {label:"Order shipped",           body:"Dear Customer,\n\nGreat news! Your order has been shipped and is on its way to you. You can expect delivery within 3–5 business days.\n\nThank you for shopping with us!\n\nfabricsby_tayejenifa Team 🎉"},
  {label:"Exclusive discount offer",body:"Dear Customer,\n\nAs a valued customer, we're delighted to offer you an exclusive discount on your next purchase!\n\nUse code ANKARA15 at checkout for 15% off your entire order.\n\nShop now — offer valid for 7 days!\n\nfabricsby_tayejenifa Team"},
];

function Messages({orders,messages,setMessages}) {
  const [tab,setTab]=useState("inbox");
  const [activeMsg,setActiveMsg]=useState(null);
  const [replyText,setReplyText]=useState("");
  const [bulkProduct,setBulkProduct]=useState("");
  const [bulkSubject,setBulkSubject]=useState("");
  const [bulkBody,setBulkBody]=useState("");
  const [bulkSent,setBulkSent]=useState(false);
  const [compTo,setCompTo]=useState("");
  const [compSubject,setCompSubject]=useState("");
  const [compBody,setCompBody]=useState("");

  const purchasedProducts=[...new Set(orders.map(o=>o.items.split(" x")[0]))];
  const getBuyers=prod=>{
    if(!prod) return CUSTOMERS;
    return CUSTOMERS.filter(c=>orders.some(o=>o.customerId===c.id&&o.items.toLowerCase().includes(prod.toLowerCase())));
  };
  const buyers=getBuyers(bulkProduct);

  const sendBulk=()=>{
    if(!bulkBody.trim()||!bulkSubject.trim()) return;
    setMessages(prev=>[{id:Date.now(),from:`Bulk — ${buyers.length} customer${buyers.length!==1?"s":""}${bulkProduct?` (${bulkProduct})`:""} `,email:buyers.map(b=>b.email).join(", "),body:bulkBody,subject:bulkSubject,type:"sent",time:"Just now",isBulk:true,recipients:buyers.length},...prev]);
    setBulkSent(true); setBulkBody(""); setBulkSubject(""); setBulkProduct("");
    setTimeout(()=>setBulkSent(false),4000);
  };

  const sendReply=()=>{
    if(!replyText.trim()||!activeMsg) return;
    setMessages(prev=>[{id:Date.now(),from:`Reply → ${activeMsg.from}`,email:activeMsg.email,body:replyText,type:"sent",time:"Just now",isBulk:false},...prev]);
    setReplyText(""); setActiveMsg(null);
  };

  const sendCompose=()=>{
    if(!compTo||!compBody.trim()) return;
    const cust=CUSTOMERS.find(c=>c.email===compTo);
    setMessages(prev=>[{id:Date.now(),from:cust?.name||compTo,email:compTo,body:compBody,subject:compSubject,type:"sent",time:"Just now",isBulk:false},...prev]);
    setCompTo(""); setCompSubject(""); setCompBody(""); setTab("inbox");
  };

  const TABS=[{id:"inbox",icon:"bx-inbox",l:"Inbox"},{id:"bulk",icon:"bx-broadcast",l:"Bulk Message"},{id:"compose",icon:"bx-edit",l:"Compose"}];

  return (
    <div>
      <div style={{marginBottom:22}}><h1 style={{fontSize:22,fontWeight:800,color:C.text}}>Message Center</h1><p style={{color:C.textMuted,fontSize:13,marginTop:3}}>Communicate with your customers</p></div>
      <div className="msg-tabs">
        {TABS.map(t=><button key={t.id} className="msg-tab-btn" onClick={()=>setTab(t.id)} style={{padding:"8px 16px",borderRadius:10,fontSize:13,fontWeight:600,background:tab===t.id?C.brown:C.white,color:tab===t.id?"#fff":C.textMuted,border:`1.5px solid ${tab===t.id?C.brown:C.border}`,cursor:"pointer"}}><Bx icon={t.icon} size={15} color={tab===t.id?"#fff":C.textMuted} /><span className="msg-tab-label">{t.l}</span></button>)}
      </div>

      {/* INBOX */}
      {tab==="inbox"&&(
        <div>
          <Card>
            <div style={{padding:"13px 15px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:14}}>Messages</div>
            <div style={{maxHeight:520,overflowY:"auto"}}>
              {messages.map(m=>(
                <div key={m.id} onClick={()=>setActiveMsg(m)} style={{padding:"13px 15px",borderBottom:`1px solid ${C.border}`,cursor:"pointer",background:activeMsg?.id===m.id?C.brownLight:"transparent",transition:"background 0.15s"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      {m.isBulk?<Bx icon="bx-broadcast" size={13} color={C.brown} />:<Bx icon={m.type==="sent"?"bx-send":"bx-message"} size={13} color={m.type==="sent"?C.green:C.blue} />}
                      <span style={{fontWeight:600,fontSize:13,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:140}}>{m.from}</span>
                    </div>
                    <span style={{fontSize:10,color:C.textMuted,whiteSpace:"nowrap",flexShrink:0,marginLeft:6}}>{m.time}</span>
                  </div>
                  <p style={{fontSize:11,color:C.textMuted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",margin:0}}>{m.body}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab==="inbox" && activeMsg &&(
        <div onClick={()=>{setActiveMsg(null); setReplyText("");}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:560,background:C.white,border:`1px solid ${C.border}`,borderRadius:16,boxShadow:C.shadowMd,display:"flex",flexDirection:"column",maxHeight:"88vh"}}>
            <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontWeight:700,fontSize:15,color:C.text}}>{activeMsg.from}</div>
                <div style={{fontSize:11,color:C.textMuted,marginTop:2}}>{activeMsg.email}</div>
                {activeMsg.subject&&<div style={{fontSize:12,color:C.textMed,marginTop:4,fontWeight:600}}>Subject: {activeMsg.subject}</div>}
              </div>
              <button onClick={()=>{setActiveMsg(null); setReplyText("");}} style={{background:C.bg,border:"none",borderRadius:8,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                <Bx icon="bx-x" size={16} color={C.textMuted} />
              </button>
            </div>

            <div style={{padding:16,overflowY:"auto"}}>
              <div style={{padding:14,background:activeMsg.type==="sent"?C.brownLight:C.blueBg,borderRadius:12}}>
                <p style={{fontSize:13,color:C.text,margin:0,whiteSpace:"pre-line",lineHeight:1.6}}>{activeMsg.body}</p>
                <div style={{fontSize:10,color:C.textMuted,marginTop:8,textAlign:"right"}}>{activeMsg.time}</div>
              </div>
              {activeMsg.isBulk&&<div style={{marginTop:10,padding:"8px 12px",background:C.bg,borderRadius:8,fontSize:11,color:C.textMed}}>Sent to {activeMsg.recipients||"all"} customers</div>}
            </div>

            <div style={{padding:"12px 16px",borderTop:`1px solid ${C.border}`}}>
              <textarea value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Type a reply..." rows={3} style={{width:"100%",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"9px 12px",fontSize:13,color:C.text,resize:"none",outline:"none",fontFamily:"inherit",marginBottom:8}} />
              <div style={{display:"flex",justifyContent:"flex-end",gap:7}}>
                <Btn variant="ghost" size="sm" onClick={()=>{setActiveMsg(null); setReplyText("");}}>Close</Btn>
                <Btn size="sm" onClick={sendReply} icon="bx-send">Send Reply</Btn>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BULK */}
      {tab==="bulk"&&(
        <div className="bulk-layout">
          <Card style={{padding:22}}>
            <h3 style={{fontWeight:700,fontSize:16,marginBottom:4}}>Send Bulk Message</h3>
            <p style={{fontSize:12,color:C.textMuted,marginBottom:18}}>Target all customers who bought a specific product, or message everyone</p>
            {bulkSent&&<div style={{padding:12,background:C.greenBg,border:`1px solid ${C.green}44`,borderRadius:10,marginBottom:16,display:"flex",gap:8,alignItems:"center"}}><Bx icon="bx-check-circle" size={17} color={C.green} /><span style={{color:C.green,fontWeight:600,fontSize:13}}>Sent to {buyers.length} customer{buyers.length!==1?"s":""}!</span></div>}

            <FSelect label="Filter by Product Purchased" value={bulkProduct} onChange={e=>setBulkProduct(e.target.value)}
              options={[{value:"",label:"— All Customers"},...purchasedProducts.map(p=>({value:p,label:p}))]}
            />

            {/* Recipients chip list */}
            <div style={{marginBottom:16,padding:12,background:C.bg,borderRadius:10,border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontSize:12,fontWeight:700,color:C.textMed}}>Recipients ({buyers.length})</span>
                {bulkProduct&&<span style={{fontSize:11,color:C.brown,fontWeight:600}}>Bought: {bulkProduct}</span>}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {buyers.slice(0,5).map(b=><span key={b.id} style={{padding:"3px 9px",background:C.brownLight,borderRadius:20,fontSize:11,fontWeight:600,color:C.brown}}>{b.name}</span>)}
                {buyers.length>5&&<span style={{padding:"3px 9px",background:C.bg,borderRadius:20,fontSize:11,color:C.textMuted,border:`1px solid ${C.border}`}}>+{buyers.length-5} more</span>}
              </div>
            </div>

            <FInput label="Subject" required value={bulkSubject} onChange={e=>setBulkSubject(e.target.value)} placeholder="e.g. Thank you for your purchase!" />
            <FInput label="Message" required value={bulkBody} onChange={e=>setBulkBody(e.target.value)} placeholder="Write your message to all selected customers..." rows={5} />
            <div className="bulk-actions">
              <Btn variant="ghost" onClick={()=>{setBulkBody("");setBulkSubject("");}}>Clear</Btn>
              <Btn onClick={sendBulk} icon="bx-broadcast" style={{opacity:!bulkBody.trim()||!bulkSubject.trim()?0.5:1}}>Send to {buyers.length} Customer{buyers.length!==1?"s":""}</Btn>
            </div>
          </Card>

          <div className="bulk-side">
            <Card style={{padding:16}}>
              <h4 style={{fontWeight:700,fontSize:14,marginBottom:12}}>Quick Templates</h4>
              {QUICK_TEMPLATES.map((t,i)=>(
                <button key={i} onClick={()=>{setBulkBody(t.body);setBulkSubject(t.label);}} style={{width:"100%",padding:"9px 12px",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:10,textAlign:"left",fontSize:12,fontWeight:600,color:C.textMed,display:"flex",alignItems:"center",gap:7,marginBottom:7,cursor:"pointer"}}>
                  <Bx icon="bx-copy" size={13} color={C.brown} />{t.label}
                </button>
              ))}
            </Card>
            <Card style={{padding:14,background:C.brownLight,borderColor:`${C.brown}33`}}>
              <div style={{display:"flex",gap:9}}>
                <Bx icon="bx-bulb" size={17} color={C.brown} style={{flexShrink:0,marginTop:1}} />
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:C.brown}}>Tips</div>
                  <ul style={{fontSize:11,color:C.textMed,marginTop:7,paddingLeft:14,lineHeight:1.9}}>
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

      {/* COMPOSE */}
      {tab==="compose"&&(
        <div className="compose-layout">
          <Card style={{padding:22}}>
            <h3 style={{fontWeight:700,fontSize:16,marginBottom:4}}>Compose Message</h3>
            <p style={{fontSize:12,color:C.textMuted,marginBottom:18}}>Send a direct message to a specific customer</p>
            <FSelect label="Recipient" required value={compTo} onChange={e=>setCompTo(e.target.value)}
              options={[{value:"",label:"Select customer..."},...CUSTOMERS.map(c=>({value:c.email,label:`${c.name} — ${c.email}`}))]}
            />
            <FInput label="Subject" value={compSubject} onChange={e=>setCompSubject(e.target.value)} placeholder="e.g. Your recent order" />
            <FInput label="Message" required value={compBody} onChange={e=>setCompBody(e.target.value)} placeholder="Type your message..." rows={6} />
            <div className="compose-actions">
              <Btn variant="ghost" onClick={()=>{setCompTo("");setCompSubject("");setCompBody("");}}>Clear</Btn>
              <Btn onClick={sendCompose} icon="bx-send" style={{opacity:!compTo||!compBody.trim()?0.5:1}}>Send Message</Btn>
            </div>
          </Card>
          <Card style={{padding:16}}>
            <h4 style={{fontWeight:700,fontSize:14,marginBottom:12}}>Quick Templates</h4>
            {QUICK_TEMPLATES.map((t,i)=>(
              <button key={i} onClick={()=>{setCompBody(t.body);setCompSubject(t.label);}} style={{width:"100%",padding:"9px 12px",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:10,textAlign:"left",fontSize:12,fontWeight:600,color:C.textMed,display:"flex",alignItems:"center",gap:7,marginBottom:7,cursor:"pointer"}}>
                <Bx icon="bx-copy" size={13} color={C.brown} />{t.label}
              </button>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}
/* ─── ORDERS ─── */
function Orders({orders,setOrders}) {
  const [sel,setSel]=useState(null);
  const [filt,setFilt]=useState("all");
  const upd=(id,st)=>{setOrders(prev=>prev.map(o=>o.id===id?{...o,status:st}:o));setSel(null);};
  const filtered=filt==="all"?orders:orders.filter(o=>o.status===filt);

  return (
    <div>
      <div style={{marginBottom:22}}><h1 style={{fontSize:22,fontWeight:800}}>Orders</h1><p style={{color:C.textMuted,fontSize:13,marginTop:3}}>Manage and track all customer orders</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12,marginBottom:18}}>
        {[["pending","Pending","bx-time"],["processing","Processing","bx-sync"],["completed","Completed","bx-check-circle"],["cancelled","Cancelled","bx-x-circle"]].map(([s,l,ic])=>(
          <StatCard key={s} label={l} value={orders.filter(o=>o.status===s).length} icon={ic} />
        ))}
      </div>
      <div style={{display:"flex",gap:7,marginBottom:16,flexWrap:"wrap"}}>
        {[["all","All"],["pending","Pending"],["processing","Processing"],["completed","Completed"],["cancelled","Cancelled"]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilt(v)} style={{padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:600,background:filt===v?C.brown:C.white,color:filt===v?"#fff":C.textMuted,border:`1.5px solid ${filt===v?C.brown:C.border}`,cursor:"pointer"}}>{l}</button>
        ))}
      </div>
      <Card>
        <div className="desktop-table-wrap" style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:580}}>
            <thead><tr style={{background:"#FAF8F5"}}>{["Order ID","Customer","Items","Total","Date","Status","Actions"].map(h=><th key={h} style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:0.8,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(o=>(
                <tr key={o.id} style={{borderTop:`1px solid ${C.border}`}}>
                  <td style={{padding:"11px 14px",fontWeight:700,fontSize:13,color:C.brown,whiteSpace:"nowrap"}}>{o.id}</td>
                  <td style={{padding:"11px 14px"}}>
                    <div style={{fontWeight:600,fontSize:13}}>{o.customer}</div>
                    <div style={{fontSize:11,color:C.textMuted}}>{o.address}</div>
                  </td>
                  <td style={{padding:"11px 14px",fontSize:12,color:C.textMed,maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{o.items}</td>
                  <td style={{padding:"11px 14px",fontWeight:700,fontSize:13,color:C.brown,whiteSpace:"nowrap"}}>{fmt(o.total)}</td>
                  <td style={{padding:"11px 14px",fontSize:12,color:C.textMuted,whiteSpace:"nowrap"}}>{o.date}</td>
                  <td style={{padding:"11px 14px"}}><Badge status={o.status} /></td>
                  <td style={{padding:"11px 14px"}}>
                    <div style={{display:"flex",gap:5}}>
                      {o.status==="pending"&&<><Btn variant="success" size="sm" icon="bx-check" onClick={()=>upd(o.id,"processing")}>Accept</Btn><Btn variant="danger" size="sm" icon="bx-x" onClick={()=>upd(o.id,"cancelled")} /></>}
                      {o.status==="processing"&&<Btn size="sm" icon="bx-check-double" onClick={()=>upd(o.id,"completed")}>Done</Btn>}
                      <Btn variant="ghost" size="sm" icon="bx-show" onClick={()=>setSel(o)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-only">
          <div className="mobile-list">
            {filtered.map(o=>(
              <div key={o.id} className="mobile-item">
                <div className="mobile-head">
                  <span className="mobile-id">{o.id}</span>
                  <Badge status={o.status} />
                </div>
                <div className="mobile-rows">
                  <div className="mobile-row"><span className="mobile-k">Customer:</span><span className="mobile-v">{o.customer}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Address:</span><span className="mobile-v">{o.address}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Items:</span><span className="mobile-v">{o.items}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Total:</span><span className="mobile-v">{fmt(o.total)}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Date:</span><span className="mobile-v">{o.date}</span></div>
                </div>
                <div className="mobile-actions">
                  {o.status==="pending"&&<><Btn variant="success" size="sm" icon="bx-check" onClick={()=>upd(o.id,"processing")}>Accept</Btn><Btn variant="danger" size="sm" icon="bx-x" onClick={()=>upd(o.id,"cancelled")} /></>}
                  {o.status==="processing"&&<Btn size="sm" icon="bx-check-double" onClick={()=>upd(o.id,"completed")}>Done</Btn>}
                  <Btn variant="ghost" size="sm" icon="bx-show" onClick={()=>setSel(o)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {sel&&(
        <div onClick={()=>setSel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.white,borderRadius:18,width:"100%",maxWidth:420,boxShadow:C.shadowMd}}>
            <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><h3 style={{fontWeight:800,fontSize:16}}>{sel.id}</h3><div style={{marginTop:4}}><Badge status={sel.status} /></div></div>
              <button onClick={()=>setSel(null)} style={{background:C.bg,border:"none",borderRadius:8,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Bx icon="bx-x" size={16} color={C.textMuted} /></button>
            </div>
            <div style={{padding:"14px 20px"}}>
              {[["Customer",sel.customer],["Address",sel.address],["Items",sel.items],["Total",fmt(sel.total)],["Date",sel.date]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
                  <span style={{color:C.textMuted,fontSize:13}}>{k}</span>
                  <span style={{fontWeight:600,fontSize:13,textAlign:"right",maxWidth:"58%"}}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{padding:"12px 20px",display:"flex",gap:8}}>
              {sel.status==="pending"&&<><Btn variant="success" onClick={()=>upd(sel.id,"processing")} icon="bx-check" style={{flex:1}}>Accept</Btn><Btn variant="danger" onClick={()=>upd(sel.id,"cancelled")} icon="bx-x" style={{flex:1}}>Cancel</Btn></>}
              {sel.status==="processing"&&<Btn onClick={()=>upd(sel.id,"completed")} icon="bx-check-double" style={{flex:1}}>Mark Complete</Btn>}
              <Btn variant="ghost" onClick={()=>setSel(null)} style={{flex:1}}>Close</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── EARNINGS ─── */
function Earnings({orders}) {
  const revData=[{m:"Sep",v:420},{m:"Oct",v:390},{m:"Nov",v:580},{m:"Dec",v:920},{m:"Jan",v:510},{m:"Feb",v:670}];
  const maxV=Math.max(...revData.map(d=>d.v));
  const done=orders.filter(o=>o.status==="completed");
  return (
    <div>
      <div style={{marginBottom:22}}><h1 style={{fontSize:22,fontWeight:800}}>Earnings</h1><p style={{color:C.textMuted,fontSize:13,marginTop:3}}>Revenue and financial overview</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:18}}>
        <StatCard label="Total Revenue"   value="₦3.8M"   sub="Aug 2025 – Feb 2026" icon="bx-money"         featured />
        <StatCard label="This Month"      value="₦670K"   sub="Feb 2026"            icon="bx-calendar-check" trend={31} />
        <StatCard label="Pending Payout"  value="₦124K"   sub="3 orders"            icon="bx-time-five" />
        <StatCard label="Avg Order Value" value="₦13,380"                            icon="bx-trending-up"    trend={2} />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.6fr) minmax(0,1fr)",gap:18}}>
        <Card style={{padding:20}}>
          <h3 style={{fontWeight:700,fontSize:15,marginBottom:18}}>Revenue Trend</h3>
          <div style={{display:"flex",alignItems:"flex-end",gap:10,height:130}}>
            {revData.map((d,i)=>(
              <div key={d.m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                <span style={{fontSize:10,color:C.textMuted}}>₦{d.v}k</span>
                <div style={{width:"100%",borderRadius:"4px 4px 0 0",height:`${(d.v/maxV)*100}px`,background:i===revData.length-1?C.brown:`${C.brown}44`}} />
                <span style={{fontSize:10,color:C.textMuted}}>{d.m}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{padding:18}}>
          <h3 style={{fontWeight:700,fontSize:15,marginBottom:14}}>Transactions</h3>
          {done.map(o=>(
            <div key={o.id} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
              <div><div style={{fontWeight:600,fontSize:12}}>{o.customer}</div><div style={{fontSize:10,color:C.textMuted}}>{o.id}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontWeight:700,fontSize:13,color:C.green}}>+{fmt(o.total)}</div><div style={{fontSize:10,color:C.textMuted}}>{o.date}</div></div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

/* ─── CUSTOMERS ─── */
function Customers() {
  return (
    <div>
      <div style={{marginBottom:22}}><h1 style={{fontSize:22,fontWeight:800}}>Customers</h1><p style={{color:C.textMuted,fontSize:13,marginTop:3}}>All registered customers</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:18}}>
        <StatCard label="Total"       value={CUSTOMERS.length} icon="bx-group"        featured />
        <StatCard label="VIP"         value={CUSTOMERS.filter(c=>c.tier==="vip").length} sub="Top spenders" icon="bx-crown" />
        <StatCard label="New Month"   value="32"               icon="bx-user-plus"    trend={8} />
        <StatCard label="Avg. Spend"  value="₦224K"            icon="bx-money-withdraw" trend={5} />
      </div>
      <Card>
        <div className="desktop-table-wrap" style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:480}}>
            <thead><tr style={{background:"#FAF8F5"}}>{["Customer","Email","Orders","Spent","Joined","Tier"].map(h=><th key={h} style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:0.8,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
            <tbody>
              {CUSTOMERS.map(c=>(
                <tr key={c.id} style={{borderTop:`1px solid ${C.border}`}}>
                  <td style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:9}}><Av initials={c.av} size={32} /><span style={{fontWeight:600,fontSize:13}}>{c.name}</span></div></td>
                  <td style={{padding:"11px 14px",fontSize:12,color:C.textMuted}}>{c.email}</td>
                  <td style={{padding:"11px 14px",fontWeight:700,fontSize:13}}>{c.orders}</td>
                  <td style={{padding:"11px 14px",fontWeight:700,fontSize:13,color:C.brown}}>{fmt(c.spent)}</td>
                  <td style={{padding:"11px 14px",fontSize:12,color:C.textMuted,whiteSpace:"nowrap"}}>{c.joined}</td>
                  <td style={{padding:"11px 14px"}}>{c.tier==="vip"?<span style={{padding:"3px 9px",background:"#FEF3E8",color:C.brown,borderRadius:20,fontSize:11,fontWeight:700}}>⭐ VIP</span>:<span style={{padding:"3px 9px",background:C.bg,color:C.textMuted,borderRadius:20,fontSize:11}}>Regular</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-only">
          <div className="mobile-list">
            {CUSTOMERS.map(c=>(
              <div key={c.id} className="mobile-item">
                <div className="mobile-head">
                  <div style={{display:"flex",alignItems:"center",gap:9}}>
                    <Av initials={c.av} size={30} />
                    <div>
                      <div className="mobile-title">{c.name}</div>
                      <div className="mobile-sub">{c.email}</div>
                    </div>
                  </div>
                  {c.tier==="vip"?<span style={{padding:"3px 9px",background:"#FEF3E8",color:C.brown,borderRadius:20,fontSize:11,fontWeight:700}}>VIP</span>:<span style={{padding:"3px 9px",background:C.bg,color:C.textMuted,borderRadius:20,fontSize:11}}>Regular</span>}
                </div>
                <div className="mobile-rows">
                  <div className="mobile-row"><span className="mobile-k">Orders:</span><span className="mobile-v">{c.orders}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Spent:</span><span className="mobile-v">{fmt(c.spent)}</span></div>
                  <div className="mobile-row"><span className="mobile-k">Joined:</span><span className="mobile-v">{c.joined}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ─── REVIEWS ─── */
function Reviews({reviews,setReviews}) {
  const [repId,setRepId]=useState(null);
  const [repTxt,setRepTxt]=useState("");
  const total=reviews.length;
  const avgR=(reviews.reduce((a,r)=>a+r.rating,0)/total).toFixed(1);
  const pos=reviews.filter(r=>r.rating>=4).length;
  return (
    <div>
      <div style={{marginBottom:22}}><h1 style={{fontSize:22,fontWeight:800}}>Reviews</h1><p style={{color:C.textMuted,fontSize:13,marginTop:3}}>Customer feedback and ratings</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:18}}>
        <StatCard label="Total"        value={total}                                  icon="bx-message-square-dots" featured />
        <StatCard label="Avg Rating"   value={`${avgR}★`}                             icon="bx-star" />
        <StatCard label="Positive"     value={`${Math.round((pos/total)*100)}%`} sub={`${pos} of ${total}`} icon="bx-like" />
        <StatCard label="Need Reply"   value={reviews.filter(r=>!r.replied).length}   icon="bx-reply" />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,2fr)",gap:18}}>
        <Card style={{padding:18}}>
          <h3 style={{fontWeight:700,fontSize:15,marginBottom:14}}>Rating Breakdown</h3>
          <div style={{textAlign:"center",marginBottom:14}}>
            <div style={{fontSize:44,fontWeight:800,color:C.brown}}>{avgR}</div>
            <div style={{color:C.brown,fontSize:18}}>{"★".repeat(Math.round(avgR))}{"☆".repeat(5-Math.round(avgR))}</div>
            <div style={{color:C.textMuted,fontSize:11,marginTop:3}}>{total} reviews</div>
          </div>
          {[5,4,3,2,1].map(r=>{const cnt=reviews.filter(x=>x.rating===r).length;return(
            <div key={r} style={{display:"flex",alignItems:"center",gap:7,marginBottom:8}}>
              <span style={{color:C.brown,fontSize:11,minWidth:18}}>{"★".repeat(r)}</span>
              <div style={{flex:1,height:6,background:C.bg,borderRadius:3}}><div style={{width:`${(cnt/total)*100}%`,height:"100%",background:C.brown,borderRadius:3}} /></div>
              <span style={{fontSize:11,color:C.textMuted,minWidth:12}}>{cnt}</span>
            </div>
          );})}
        </Card>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {reviews.map(r=>(
            <Card key={r.id} style={{padding:16}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:9}}>
                  <Av initials={r.av} size={30} />
                  <div><div style={{fontWeight:700,fontSize:13}}>{r.customer}</div><div style={{fontSize:11,color:C.textMuted}}>on {r.product}</div></div>
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{color:C.brown,fontSize:14}}>{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</span>
                  <span style={{fontSize:11,color:C.textMuted}}>{r.date}</span>
                  {r.replied&&<span style={{padding:"2px 7px",background:C.greenBg,color:C.green,borderRadius:10,fontSize:10,fontWeight:700}}>Replied</span>}
                </div>
              </div>
              <p style={{fontSize:13,color:C.textMed,lineHeight:1.6,marginBottom:10}}>{r.comment}</p>
              {!r.replied&&repId!==r.id&&<Btn variant="outline" size="sm" icon="bx-reply" onClick={()=>setRepId(r.id)}>Reply</Btn>}
              {repId===r.id&&(
                <div>
                  <textarea value={repTxt} onChange={e=>setRepTxt(e.target.value)} placeholder="Write your reply..." rows={2} style={{width:"100%",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:8,padding:"8px 11px",fontSize:12,color:C.text,resize:"none",outline:"none",marginBottom:8,fontFamily:"inherit"}} />
                  <div style={{display:"flex",gap:7}}>
                    <Btn size="sm" onClick={()=>{setReviews(prev=>prev.map(x=>x.id===r.id?{...x,replied:true}:x));setRepId(null);setRepTxt("");}} icon="bx-send">Send</Btn>
                    <Btn variant="ghost" size="sm" onClick={()=>setRepId(null)}>Cancel</Btn>
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

/* ─── NOTIFICATIONS ─── */
function Notifications({notifs,setNotifs,setMessages}) {
  const unread=notifs.filter(n=>!n.read).length;
  const IC={order:{icon:"bx-package",c:C.brown,bg:C.brownLight},low_stock:{icon:"bx-error",c:C.brown,bg:"#FEF3E8"},out_of_stock:{icon:"bx-x-circle",c:C.red,bg:C.redBg}};

  const getOrderNo = (msg) => msg.match(/ORD-\d+/)?.[0] || "ORDER";
  const getCustomerName = (msg) => msg.match(/from\\s+(.+?)\\s+[—-]/)?.[1] || "Customer";

  const autoReplyOrder = (notif) => {
    const orderNo = getOrderNo(notif.message);
    const customerName = getCustomerName(notif.message);
    const customer = CUSTOMERS.find(c => c.name === customerName);
    setMessages(prev => [{
      id: Date.now(),
      from: customerName,
      email: customer?.email || "customer@email.com",
      subject: `Thank you for your order ${orderNo}`,
      body: `Hi ${customerName},\\n\\nThank you for your order ${orderNo}. We have received it and we are processing it now.\\n\\nBest regards,\\nfabricsby_tayejenifa Team`,
      type: "sent",
      time: "Just now",
      isBulk: false,
    }, ...prev]);
    setNotifs(prev => prev.map(n => n.id === notif.id ? { ...n, read: true, replied: true } : n));
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:10}}>
        <div><h1 style={{fontSize:22,fontWeight:800}}>Notifications</h1><p style={{color:C.textMuted,fontSize:13,marginTop:3}}>{unread} unread</p></div>
        {unread>0&&<Btn variant="outline" size="sm" icon="bx-check-double" onClick={()=>setNotifs(n=>n.map(x=>({...x,read:true})))}>Mark all read</Btn>}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {notifs.map(n=>{const s=IC[n.type]||IC.order;return(
          <Card key={n.id} onClick={()=>setNotifs(prev=>prev.map(x=>x.id===n.id?{...x,read:true}:x))} style={{padding:"13px 16px",cursor:"pointer",background:n.read?C.white:C.brownLight,borderColor:n.read?C.border:`${C.brown}33`,display:"flex",alignItems:"center",gap:13}}>
            <div style={{width:40,height:40,borderRadius:11,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Bx icon={s.icon} size={19} color={s.c} /></div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontWeight:n.read?500:700,fontSize:13}}>{n.title}</span>
                <span style={{fontSize:10,color:C.textMuted,whiteSpace:"nowrap",marginLeft:10}}>{n.time}</span>
              </div>
              <p style={{fontSize:12,color:C.textMuted,marginTop:2}}>{n.message}</p>
              {n.type==="order"&&(
                <div style={{marginTop:8}}>
                  <Btn
                    size="sm"
                    icon={n.replied ? "bx-check" : "bx-reply"}
                    variant={n.replied ? "ghost" : "outline"}
                    onClick={(e)=>{ e.stopPropagation(); if(!n.replied) autoReplyOrder(n); }}
                  >
                    {n.replied ? "Thank You Sent" : "Send Thank You"}
                  </Btn>
                </div>
              )}
            </div>
            {!n.read&&<div style={{width:8,height:8,borderRadius:"50%",background:s.c,flexShrink:0}} />}
          </Card>
        );})}
      </div>
    </div>
  );
}

/* ─── ROOT ─── */
function AnkaraAdmin() {
  useBoxicons();
  const [page,setPage]=useState("overview");
  const [sideOpen,setSideOpen]=useState(false);
  const [products,setProducts]=useState(PRODUCTS_INIT);
  const [orders,setOrders]=useState(ORDERS_INIT);
  const [notifs,setNotifs]=useState(NOTIFS_INIT);
  const [messages,setMessages]=useState(MSGS_INIT);
  const [reviews,setReviews]=useState(REVIEWS_INIT);
  const unread=notifs.filter(n=>!n.read).length;

  useEffect(()=>{
    const s=document.createElement("style");
    s.id="ank-global";s.textContent=GLOBAL_CSS;
    document.head.appendChild(s);
    return()=>document.getElementById("ank-global")?.remove();
  },[]);

  const PAGES={
    overview:      <Overview products={products} orders={orders} setPage={setPage} />,
    products:      <Products products={products} setProducts={setProducts} />,
    orders:        <Orders orders={orders} setOrders={setOrders} />,
    messages:      <Messages orders={orders} messages={messages} setMessages={setMessages} />,
    customers:     <Customers />,
    reviews:       <Reviews reviews={reviews} setReviews={setReviews} />,
    earnings:      <Earnings orders={orders} />,
    notifications: <Notifications notifs={notifs} setNotifs={setNotifs} setMessages={setMessages} />,
  };

  return (
    <div style={{display:"flex",minHeight:"100vh",background:C.white,fontFamily:"'Poppins',sans-serif"}}>
      <Sidebar active={page} setActive={setPage} notifCount={unread} open={sideOpen} onClose={()=>setSideOpen(false)} />
      <div className="ank-main" style={{flex:1,marginLeft:220,display:"flex",flexDirection:"column",minWidth:0}}>
        <Topbar onMenu={()=>setSideOpen(o=>!o)} notifCount={unread} onNotif={()=>setPage("notifications")} />
        <main style={{flex:1,padding:"24px 22px",maxWidth:"100%"}}>
          {PAGES[page]||PAGES.overview}
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AnkaraAdmin />);
