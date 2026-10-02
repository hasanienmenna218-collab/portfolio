/* =====================================================================
   app.js — renders the whole site from SITE_CONFIG (js/config.js).
   You normally do not need to edit this file.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.SITE_CONFIG;
  if (!C) {
    console.error("js/config.js must load before js/app.js.");
    return;
  }

  /* ---------- tiny helpers ------------------------------------------ */
  function $(sel, root) { return (root || document).querySelector(sel); }

  function el(tag, props) {
    var node = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k.indexOf("on") === 0) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? "" : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var kids = [].concat(arguments[i]);
      kids.forEach(function (kid) {
        if (kid === null || kid === undefined || kid === false) return;
        node.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
      });
    }
    return node;
  }

  /* Text with [PLACEHOLDER] segments highlighted. */
  function phNodes(str) {
    var frag = document.createDocumentFragment();
    String(str).split(/(\[[^\]]+\])/).forEach(function (part) {
      if (!part) return;
      if (/^\[[^\]]+\]$/.test(part)) frag.append(el("span", { "class": "ph", text: part }));
      else frag.append(document.createTextNode(part));
    });
    return frag;
  }
  function phEl(tag, cls, str) {
    var n = el(tag, { "class": cls });
    n.append(phNodes(str));
    return n;
  }

  function svg(markup) {
    var t = document.createElement("template");
    t.innerHTML = markup.trim();
    return t.content.firstElementChild;
  }

  var ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m3.8 7 8.2 6.3L20.2 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    image: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="4.5" width="18" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="9" cy="10" r="1.6" fill="currentColor"/><path d="m4 17 5-4.5 3.5 3 3-2.5L20 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>'
  };
  function icon(name) { return svg(ICONS[name]); }

  function isPlaceholder(value) { return /YOUR_|\[ADD/i.test(value || ""); }

  /* ---------- social links (all driven by config) ------------------- */
  var S = C.social;
  var SOCIALS = [
    { key: "linkedin", label: "LinkedIn", href: S.LINKEDIN_URL, external: true },
    { key: "github",   label: "GitHub",   href: S.GITHUB_URL,   external: true },
    { key: "email",    label: "Email",    href: "mailto:" + S.EMAIL, external: false }
  ];

  function socialLink(s, cls, withText) {
    var placeholder = isPlaceholder(s.href);
    var a = el("a", {
      "class": cls,
      href: s.href,
      "aria-label": s.label + (s.external ? " (opens in a new tab)" : ""),
      title: placeholder ? s.label + ": placeholder link, replace it in js/config.js" : s.label,
      target: s.external ? "_blank" : null,
      rel: s.external ? "noopener noreferrer" : null
    });
    a.append(icon(s.key));
    if (withText) {
      var display = s.href.replace(/^mailto:/, "").replace(/^https?:\/\/(www\.)?/, "");
      a.append(el("span", { "class": "contact-link-text" },
        el("span", { "class": "contact-link-label", text: s.label }),
        el("span", { "class": "contact-link-value", text: display })));
    }
    return a;
  }
  function renderSocials(container, keys, cls, withText) {
    SOCIALS.filter(function (s) { return keys.indexOf(s.key) !== -1; }).forEach(function (s) {
      container.append(el("li", {}, socialLink(s, cls, withText)));
    });
  }

  /* ---------- header, hero ------------------------------------------ */
  $("#brand-mark").textContent = C.person.initials;
  $("#brand-name").textContent = C.person.shortName;
  $("#hero-title").textContent = C.person.name;
  $("#hero-role").textContent = C.person.role;
  $("#hero-focus").textContent = C.person.focus;
  renderSocials($("#hero-social"), ["linkedin", "github"], "social-link", false);

  /* Decorative radar (echoes the Arduino radar project). */
  function polar(angle, r) {
    var a = (angle - 90) * Math.PI / 180;
    return [200 + r * Math.cos(a), 200 + r * Math.sin(a)];
  }
  function buildRadar() {
    var R = 186, steps = 9, step = 7, parts = [];
    parts.push('<svg class="scope" viewBox="0 0 400 400" focusable="false">');
    [186, 140, 94, 48].forEach(function (r) { parts.push('<circle class="scope-ring" cx="200" cy="200" r="' + r + '"/>'); });
    parts.push('<line class="scope-axis" x1="200" y1="14" x2="200" y2="386"/><line class="scope-axis" x1="14" y1="200" x2="386" y2="200"/>');
    parts.push('<g class="sweep">');
    for (var k = 0; k < steps; k++) {
      var p1 = polar(-(k + 1) * step, R), p2 = polar(-k * step, R);
      var op = (0.3 * (1 - k / steps)).toFixed(3);
      parts.push('<path class="scope-wedge" fill-opacity="' + op + '" d="M200 200 L' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) +
        ' A' + R + ' ' + R + ' 0 0 1 ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) + ' Z"/>');
    }
    var tip = polar(0, R);
    parts.push('<line class="scope-edge" x1="200" y1="200" x2="' + tip[0].toFixed(1) + '" y2="' + tip[1].toFixed(1) + '"/></g>');
    [[35, 120], [110, 70], [160, 150], [215, 100], [280, 140], [325, 60]].forEach(function (b) {
      var p = polar(b[0], b[1]);
      parts.push('<circle class="scope-blip" r="5" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) +
        '" style="animation-delay:' + (b[0] / 360 * 9).toFixed(2) + 's"/>');
    });
    parts.push('</svg>');
    return svg(parts.join(""));
  }
  (function () {
    var box = $("#hero-visual");
    if (!C.person.photo) { box.setAttribute("aria-hidden", "true"); box.append(buildRadar()); return; }
    var img = el("img", { "class": "hero-photo", src: C.person.photo, alt: C.person.photoAlt || C.person.name, width: "700", height: "933" });
    img.addEventListener("error", function () { box.setAttribute("aria-hidden", "true"); box.replaceChildren(buildRadar()); });
    box.append(img);
  })();

  /* ---------- about ------------------------------------------------- */
  C.about.paragraphs.forEach(function (t) { $("#about-text").append(phEl("p", "", t)); });
  C.about.facts.forEach(function (f) {
    $("#about-facts").append(el("div", {},
      el("dt", { text: f.label }),
      el("dd", {}, phNodes(f.value))));
  });

  /* ---------- skills ------------------------------------------------ */
  C.skills.forEach(function (g) {
    var chips = el("ul", { "class": "chips", "aria-label": g.group + " skills" });
    g.items.forEach(function (item) { chips.append(el("li", { "class": "chip", text: item })); });
    $("#skills-grid").append(el("article", { "class": "skill-card" }, el("h3", { text: g.group }), chips));
  });

  /* ---------- education --------------------------------------------- */
  (function () {
    var e = C.education;
    $("#education-card").append(el("article", { "class": "edu-card" },
      el("h3", { text: e.university }),
      el("p", { "class": "edu-program", text: e.faculty + " · " + e.program }),
      el("div", { "class": "edu-meta" },
        el("span", { "class": "chip", text: e.level }),
        el("span", { "class": "chip", text: e.graduation }),
        el("span", { "class": "chip", text: e.grade }))));
  })();

  /* ---------- currently learning ------------------------------------ */
  C.learning.forEach(function (item) { $("#learning-list").append(el("li", { text: item })); });

  /* ---------- contact ----------------------------------------------- */
  $("#contact-intro").textContent = C.contact.intro;
  renderSocials($("#contact-links"), ["email", "linkedin", "github"], "contact-link", true);

  var form = $("#contact-form"), status = $("#form-status"), submitBtn = $("#cf-submit");
  function setStatus(kind, nodes) {
    status.className = "form-status is-" + kind;
    status.replaceChildren.apply(status, [].concat(nodes));
  }
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (!form.reportValidity()) return;
    var endpoint = C.contactForm.endpoint;
    if (!endpoint) {
      setStatus("info", [
        "This form is not connected to a service yet, so no message was sent. Please email me directly at ",
        el("a", { href: "mailto:" + S.EMAIL, text: S.EMAIL }), "."
      ]);
      return;
    }
    submitBtn.disabled = true;
    var payload = {};
    new FormData(form).forEach(function (v, k) { payload[k] = v; });
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      form.reset();
      setStatus("ok", "Message sent. Thank you!");
    }).catch(function () {
      setStatus("error", ["The message could not be sent. Please email me at ",
        el("a", { href: "mailto:" + S.EMAIL, text: S.EMAIL }), " instead."]);
    }).then(function () { submitBtn.disabled = false; });
  });

  /* ---------- footer ------------------------------------------------ */
  $("#footer-text").textContent = "© " + new Date().getFullYear() + " " + C.person.name;
  renderSocials($("#footer-social"), ["linkedin", "github", "email"], "social-link", false);

  /* ---------- project media helpers --------------------------------- */
  function uniq(list) { return list.filter(function (v, i) { return v && list.indexOf(v) === i; }); }
  function projectImages(p) { return uniq([p.image].concat(p.gallery || [])); }
  function videoType(src) {
    var ext = (src.split("?")[0].split(".").pop() || "").toLowerCase();
    return { mp4: "video/mp4", webm: "video/webm", ogg: "video/ogg", mov: "video/quicktime" }[ext] || "";
  }

  function badge(p) {
    return el("span", { "class": "badge badge-" + (p.statusType || "unknown") }, phNodes(p.status));
  }

  /* ---------- project cards ----------------------------------------- */
  function linkButton(label, url, extraClass) {
    if (url) {
      return el("a", { "class": "btn btn-secondary btn-small " + (extraClass || ""), href: url, target: "_blank", rel: "noopener noreferrer",
        "aria-label": label + " (opens in a new tab)", text: label });
    }
    return el("span", { "class": "btn btn-small", "aria-disabled": "true", role: "link", title: label + " link not added yet", text: label + " (coming soon)" });
  }

  function projectCard(p) {
    var media = null;
    var imgs = projectImages(p);
    if (imgs.length) {
      media = el("div", { "class": "card-media" });
      var img = el("img", { src: imgs[0], alt: p.title + " preview", loading: "lazy" });
      img.addEventListener("error", function () { media.remove(); });
      media.append(img);
    }

    var detailsBtn = p.description ? el("button", { "class": "btn btn-primary btn-small", type: "button", "aria-haspopup": "dialog",
      onclick: function () { openProject(p); } }, "View Details") : null;
    var titleEl = phEl("h3", "card-title", p.title);

    return el("article", { "class": "project-card" },
      media,
      el("div", { "class": "card-body" },
        el("div", { "class": "card-meta" }, badge(p), el("span", { "class": "card-type", text: p.type })),
        titleEl,
        p.summary ? phEl("p", "card-summary", p.summary) : null,
        el("div", { "class": "card-actions" }, detailsBtn, linkButton("GitHub", p.github))));
  }

  C.projects.forEach(function (p) {
    $(p.group === "csharp" ? "#projects-csharp" : "#projects-featured").append(projectCard(p));
  });

  /* ---------- project details dialog -------------------------------- */
  var dlg = $("#project-dialog"), content = $("#project-content");

  function block(title, child) {
    return el("section", { "class": "detail-block" }, el("h3", { text: title }), child);
  }
  function pillList(items, note) {
    var ul = el("ul", { "class": "chips" });
    items.forEach(function (t) { ul.append(el("li", { "class": "chip", text: t })); });
    if (note) ul.append(el("li", {}, phNodes(note)));
    return ul;
  }

  function buildMedia(p) {
    var wrap = el("section", { "class": "media", "aria-label": "Project media" });
    var imgs = projectImages(p);
    var anyMedia = false;

    if (p.video) {
      anyMedia = true;
      var video = el("video", { "class": "media-video", controls: true, preload: "metadata", playsinline: true,
        poster: p.poster || null, "aria-label": p.title + " video" });
      var source = el("source", { src: p.video, type: videoType(p.video) || null });
      source.addEventListener("error", function () { video.remove(); pruneMedia(wrap); });
      video.append(source, "Your browser does not support HTML5 video.");
      wrap.append(video);
    }

    if (imgs.length) {
      anyMedia = true;
      var thumbsBox = el("div", { "class": "media-thumbs" });
      var mainBtn;
      var buttons = [];

      imgs.forEach(function (src, i) {
        var isMain = i === 0;
        var img = el("img", { src: src, alt: p.title + " screenshot " + (i + 1), loading: isMain ? "eager" : "lazy" });
        var btn = el("button", { "class": isMain ? "media-main" : "media-thumb", type: "button", "data-src": src,
          "aria-label": "Open image " + (i + 1) + " of " + imgs.length + " in viewer" }, img);
        btn.addEventListener("click", function () {
          var live = buttons.filter(function (b) { return b.isConnected && !b.hidden; });
          openLightbox(live.map(function (b) { return b.getAttribute("data-src"); }), live.indexOf(btn), p.title);
        });
        img.addEventListener("error", function () {
          btn.hidden = true;
          pruneMedia(wrap);
        });
        buttons.push(btn);
        if (isMain) mainBtn = btn; else thumbsBox.append(btn);
      });
      wrap.append(mainBtn);
      if (imgs.length > 1) wrap.append(thumbsBox);
    }

    return anyMedia ? wrap : null;
  }
  function pruneMedia(wrap) {
    if (!wrap.querySelector("video, button:not([hidden])")) wrap.remove();
  }

  function buildDetails(p) {
    var root = el("article", { "class": "detail" });
    var title = phEl("h2", "", p.title);
    title.id = "project-title";
    root.append(el("header", { "class": "detail-head" },
      el("div", { "class": "card-meta" }, badge(p), el("span", { "class": "card-type", text: p.type })),
      title));

    if (p.statusNote) root.append(el("p", { "class": "detail-banner", role: "note" }, p.statusNote));
    var media = buildMedia(p);
    if (media) root.append(media);

    var left = el("div", { "class": "detail-col" });
    var right = el("div", { "class": "detail-col" });
    var body = el("div", { "class": "detail-body" }, left, right);

    if (p.description) left.append(block("Description", phEl("p", "", p.description)));
    if (p.teamNote) left.append(el("p", { "class": "detail-banner", role: "note" }, p.teamNote));
    if (p.role) left.append(block("My role", phEl("p", "", p.role)));

    if ((p.features && p.features.length) || p.featuresNote) {
      var ul = el("ul", { "class": "feature-list" });
      (p.features || []).forEach(function (f) { ul.append(el("li", { text: f })); });
      if (p.featuresNote) ul.append(el("li", {}, phNodes(p.featuresNote)));
      left.append(block(p.featuresLabel || "Features", ul));
    }

    if ((p.technologies && p.technologies.length) || p.technologiesNote) {
      right.append(block(p.technologiesLabel || "Technologies", pillList(p.technologies || [], p.technologiesNote)));
    }
    right.append(block("Project status", el("p", {}, badge(p))));
    right.append(block("Links", el("div", { "class": "detail-links" },
      linkButton("GitHub", p.github), linkButton("Live Demo", p.demo))));

    root.append(body);
    return root;
  }

  function lockScroll() { document.body.classList.add("no-scroll"); }
  function unlockScrollIfIdle() {
    if (!document.querySelector("dialog[open]")) document.body.classList.remove("no-scroll");
  }

  function openProject(p) {
    content.replaceChildren(buildDetails(p));
    lockScroll();
    dlg.showModal();
    dlg.scrollTop = 0;
  }
  $("#project-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (ev) { if (ev.target === dlg) dlg.close(); });
  dlg.addEventListener("close", function () {
    dlg.querySelectorAll("video").forEach(function (v) { v.pause(); });
    unlockScrollIfIdle();
  });

  /* ---------- lightbox ---------------------------------------------- */
  var lb = $("#lightbox"), lbImg = $("#lb-img"), lbCap = $("#lb-caption"), lbPrev = $("#lb-prev"), lbNext = $("#lb-next");
  var lbList = [], lbIndex = 0, lbTitle = "";

  function showLb() {
    lbImg.src = lbList[lbIndex];
    lbImg.alt = lbTitle + " image " + (lbIndex + 1) + " of " + lbList.length;
    lbCap.textContent = lbTitle + " (" + (lbIndex + 1) + " / " + lbList.length + ")";
    lbPrev.hidden = lbNext.hidden = lbList.length < 2;
  }
  function openLightbox(list, index, title) {
    if (!list.length) return;
    lbList = list; lbIndex = Math.max(0, index); lbTitle = title;
    showLb();
    lb.showModal();
  }
  function stepLb(d) { lbIndex = (lbIndex + d + lbList.length) % lbList.length; showLb(); }
  lbPrev.addEventListener("click", function () { stepLb(-1); });
  lbNext.addEventListener("click", function () { stepLb(1); });
  $("#lb-close").addEventListener("click", function () { lb.close(); });
  lb.addEventListener("click", function (ev) { if (ev.target === lb) lb.close(); });
  lb.addEventListener("close", unlockScrollIfIdle);
  lb.addEventListener("keydown", function (ev) {
    if (ev.key === "ArrowLeft" && lbList.length > 1) stepLb(-1);
    if (ev.key === "ArrowRight" && lbList.length > 1) stepLb(1);
  });

  /* ---------- navigation -------------------------------------------- */
  var toggle = $("#nav-toggle"), menu = $("#nav-menu");
  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
  menu.addEventListener("click", function (ev) { if (ev.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") setMenu(false); });
  document.addEventListener("click", function (ev) {
    if (!ev.target.closest(".nav")) setMenu(false);
  });

  /* Highlight the current section in the nav. */
  if ("IntersectionObserver" in window) {
    var links = {};
    menu.querySelectorAll("a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (id) { links[id].removeAttribute("aria-current"); });
        if (links[en.target.id]) links[en.target.id].setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* Console hint listing placeholders still to replace (info, not an error). */
  var missing = SOCIALS.filter(function (s) { return isPlaceholder(s.href); }).map(function (s) { return s.label; });
  if (missing.length) console.info("Placeholders still to replace in js/config.js: " + missing.join(", "));
})();
