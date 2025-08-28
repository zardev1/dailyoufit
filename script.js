/* ====== DATA PRODUK ====== */
const PRODUCTS = [
  {
    id: 3001,
    name: "Sepatu Knit Abu",
    price: 159000,
    price_before: 229000,
    sold: 102,
    image: "images/sepatu-knit.jpg",
    url: "https://shopee.co.id/9AEbJeY3Vm" // ganti ke URL kamu
  },
  {
    id: 2131,
    name: "Asym Knit Elegant",
    price: 89000,
    price_before: 129000,
    sold: 206,
    image: "images/asym.jpg",
    url: "https://vt.tiktok.com/your-link" // ganti ke URL kamu
  },
  // kamu bisa tambah lagi item… grid akan tetap 2 kolom
];

/* ====== UTIL ====== */
const toRp = n =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

/* ====== RENDER ====== */
function render(list) {
  const grid = document.querySelector("#grid");
  const tpl  = document.querySelector("#cardTpl");
  grid.innerHTML = "";

  list.forEach(p => {
    const node = tpl.content.cloneNode(true);

    node.querySelector(".card").href = p.url || "#";
    node.querySelector(".disc").textContent =
      p.price_before && p.price_before > p.price
        ? `-${Math.round((1 - p.price / p.price_before) * 100)}%` : "-";

    const img = node.querySelector("img");
    img.src = p.image || "";
    img.alt = p.name || "Produk";

    node.querySelector(".name").textContent = `${p.id}. ${p.name}`;
    node.querySelector(".now").textContent  = toRp(p.price);
    node.querySelector(".cut").textContent  = p.price_before ? toRp(p.price_before) : "";
    node.querySelector(".sold").textContent = `Terjual ${p.sold || 0}`;

    node.querySelector(".btn").addEventListener("click", e => {
      // tombol tetap buka ke link produk
      e.preventDefault();
      window.open(p.url, "_blank");
    });

    grid.appendChild(node);
  });
}

/* ====== SORT & SEARCH ====== */
function apply() {
  const q = (document.querySelector("#q").value || "").trim().toLowerCase();
  const mode = document.querySelector("#sort").value;

  let list = PRODUCTS.filter(p =>
    (p.name?.toLowerCase().includes(q)) ||
    String(p.id).includes(q)
  );

  list.sort((a,b)=>{
    if (mode==="price-asc")  return a.price - b.price;
    if (mode==="price-desc") return b.price - a.price;
    if (mode==="sold-desc")  return (b.sold||0) - (a.sold||0);
    // latest by id desc
    return b.id - a.id;
  });

  render(list);
}

document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelector("#q").addEventListener("input", apply);
  document.querySelector("#sort").addEventListener("change", apply);
  apply();
});