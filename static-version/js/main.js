(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const imgUrl = (src, w) =>
    /^(images\/|https?:|\/)/.test(src)
      ? src
      : `https://images.unsplash.com/photo-${src}?w=${w}&q=75&auto=format&fit=crop`;

  const waLink = (text) =>
    `https://wa.me/${SITE.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Static links from config ---------- */
  $$("[data-link]").forEach((a) => {
    const key = a.dataset.link;
    a.href = key === "whatsapp" ? waLink("Hi Kangan! I have a question.") : SITE[key] || "#";
    if (key === "whatsapp") { a.target = "_blank"; a.rel = "noopener"; }
  });
  $$("[data-text]").forEach((el) => (el.textContent = SITE[el.dataset.text] || ""));
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const menuBtn = $(".menu-btn");
  const nav = $(".nav");
  const closeMenu = () => { nav.classList.remove("is-open"); menuBtn.setAttribute("aria-expanded", "false"); };
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  $$(".nav a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------- Product grid ---------- */
  const grid = $("#productGrid");
  grid.innerHTML = PRODUCTS.map((p) => `
    <button class="card" data-id="${esc(p.id)}" data-cat="${esc(p.cat)}">
      <span class="card__media">
        <img src="${imgUrl(p.image, 600)}" alt="${esc(p.name)}" loading="lazy">
        <span class="card__tag">${esc(p.tag)}</span>
        <span class="card__quick">Order Now</span>
      </span>
      <span class="card__body">
        <span class="card__cat">${esc(p.cat)}</span>
        <span class="card__name">${esc(p.name)}</span>
        ${p.price ? `<span class="card__price">${esc(p.price)}</span>` : ""}
        <span class="card__link">Order Now →</span>
      </span>
    </button>`).join("");

  const setFilter = (cat) => {
    $$(".filter").forEach((b) => {
      const on = b.dataset.filter === cat;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", String(on));
    });
    $$(".card", grid).forEach((c) => (c.hidden = cat !== "all" && c.dataset.cat !== cat));
  };
  $$(".filter").forEach((b) => b.addEventListener("click", () => setFilter(b.dataset.filter)));
  $$("a[data-filter]").forEach((a) => a.addEventListener("click", () => setFilter(a.dataset.filter)));

  /* ---------- Order modal ---------- */
  const modal = $("#orderModal");
  const form = $("#orderForm");
  const msg = $("#formMsg");
  const submitBtn = $("#submitBtn");
  let current = null;
  let lastFocus = null;

  const openModal = (p) => {
    current = p;
    lastFocus = document.activeElement;
    $("#mImg").src = imgUrl(p.image, 900);
    $("#mImg").alt = p.name;
    $("#mTag").textContent = `${p.cat} · ${p.tag}`;
    $("#mTitle").textContent = p.name;
    $("#mCode").textContent = p.id;
    $("#mPrice").textContent = p.price || "";
    $("#mPrice").hidden = !p.price;
    $("#mDesc").textContent = p.desc;
    $("#orderView").hidden = false;
    $("#doneView").hidden = true;
    msg.textContent = "";
    form.elements.quantity.value = 1;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    setTimeout(() => form.elements.name.focus(), 50);
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  };

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) openModal(PRODUCTS.find((p) => p.id === card.dataset.id));
  });
  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  const makeOrderId = () => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `KNG-${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";

    const invalid = $$("[required]", form).find((f) => !f.value.trim() || !f.checkValidity());
    if (invalid) {
      msg.textContent = "Please fill in all required fields correctly.";
      invalid.focus();
      return;
    }
    if (form.elements.phone.value.replace(/\D/g, "").length < 8) {
      msg.textContent = "Please enter a valid phone number.";
      form.elements.phone.focus();
      return;
    }

    const f = Object.fromEntries(new FormData(form));
    const orderId = makeOrderId();
    const payload = {
      _subject: `New Kangan Order ${orderId} — ${current.name}`,
      _template: "table",
      _captcha: "false",
      "Order Number": orderId,
      Product: current.name,
      "Product Code": current.id,
      Category: current.cat,
      Price: current.price || "—",
      Quantity: f.quantity,
      "Customer Name": f.name,
      "Phone / WhatsApp": f.phone,
      Email: f.email || "—",
      Country: f.country,
      City: f.city,
      Address: f.address,
      Note: f.note || "—",
      "Order Time": new Date().toLocaleString(),
    };
    if (f.email) payload._replyto = f.email;

    const waText =
      `Hi Kangan! I placed an order.\nOrder: ${orderId}\nProduct: ${current.name} (${current.id})\n` +
      `Qty: ${f.quantity}\nName: ${f.name}\nPhone: ${f.phone}\nAddress: ${f.address}, ${f.city}, ${f.country}`;

    submitBtn.disabled = true;
    submitBtn.textContent = "Placing order…";

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.orderEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) === "false") throw new Error(data.message || "Request failed");

      $("#doneId").textContent = orderId;
      $("#donePhone").textContent = f.phone;
      $("#doneWa").href = waLink(waText);
      $("#orderView").hidden = true;
      $("#doneView").hidden = false;
      form.reset();
    } catch (err) {
      console.error(err);
      msg.innerHTML = `Sorry, we couldn't send your order right now. Please <a href="${waLink(waText)}" target="_blank" rel="noopener">send it on WhatsApp</a> instead.`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Confirm Order";
    }
  });

  /* ---------- Header shadow on scroll ---------- */
  const header = $(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
