// Sale source + visit counter, loaded by every page. This site is PUBLIC: never put a secret here.
//
// 1) Sale source. Give each post/bio its own link: https://botboss-dev.github.io/propcallsheet-site/?src=tiktok_v12
//    The src is kept for the visit (sessionStorage, else localStorage) and index.html adds it to every Stripe buy link
//    as client_reference_id=<src>, so the billing bot counts sales per post. Kept: a-z 0-9 _ - only, max 64 chars,
//    must contain a letter (all digits would look like a Telegram user id to the bot).
//
// 2) GoatCounter visit counter (free, no cookies). OFF while the code below is "". To switch it on: make a free
//    account at https://www.goatcounter.com/signup, then put your site code (the NAME in NAME.goatcounter.com) below.
(function () {
  var GOATCOUNTER_CODE = "";

  function clean(s) {
    s = String(s || "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 64);
    return /[a-z]/.test(s) ? s : "";
  }
  var src = "";
  try { src = clean(new URLSearchParams(location.search).get("src")); } catch (e) {}
  if (src) {
    try { sessionStorage.setItem("pcs_src", src); } catch (e) {}
    try { localStorage.setItem("pcs_src", src); } catch (e) {}
  } else {
    try { src = clean(sessionStorage.getItem("pcs_src")); } catch (e) {}
    if (!src) { try { src = clean(localStorage.getItem("pcs_src")); } catch (e) {} }
  }
  window.PCS_SRC = src;

  if (/^[a-z0-9-]+$/.test(GOATCOUNTER_CODE)) {
    var gc = document.createElement("script");
    gc.async = true;
    gc.src = "https://gc.zgo.at/count.js";
    gc.setAttribute("data-goatcounter", "https://" + GOATCOUNTER_CODE + ".goatcounter.com/count");
    document.head.appendChild(gc);
  }
})();
