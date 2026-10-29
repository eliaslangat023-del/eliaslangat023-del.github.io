// ==========================================================
// VOIDBIT // script.js
// Small details. Clean execution.
// Loaded on every page. Everything is guarded, so a
// missing element can never throw an error.
// ==========================================================

// VOIDBIT // boot sequence
// Grab the elements once. No repeated DOM lookups.
const btn = document.getElementById("initBtn");
const out = document.getElementById("status");
// Guard clause: if the markup changes, fail quietly instead of loudly.
if (btn && out) {
  // The 'boot log'. Add a line here and it appears in the sequence.
  const lines = ["[ok] loading modules", "[ok] mounting ~/voidbit", "[ok] VOIDBIT initialized. System ready."];
  btn.addEventListener("click", () => {
    // Lock the button during the sequence so clicks cannot stack.
    btn.disabled = true;
    out.textContent = "";
    // Staggered reveal: one line every 450 ms, like a real boot log.
    lines.forEach((line, i) => setTimeout(() => { out.textContent += (i ? "\n" : "") + line; }, i * 450));
    // Unlock once the last line lands, so it can be run again.
    setTimeout(() => { btn.disabled = false; }, lines.length * 450);
  });
}

// --- Typed line: types the hero text out, unless the visitor prefers reduced motion. ---
const typed = document.getElementById("typed");
if (typed && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const full = typed.textContent;
  typed.textContent = "";
  let i = 0;
  const timer = setInterval(() => {
    typed.textContent = full.slice(0, ++i);
    if (i >= full.length) clearInterval(timer);
  }, 40);
}

// --- Easter egg: the classic code opens the hidden page. ---
const code = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let pos = 0;
addEventListener("keydown", (e) => {
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  pos = k === code[pos] ? pos + 1 : (k === code[0] ? 1 : 0);
  if (pos === code.length) { pos = 0; location.href = "secret.html"; }
});

// --- Touch-friendly route to the same page: tap the footer logo five times. ---
const logo = document.querySelector("footer .brand");
let taps = 0;
if (logo) logo.addEventListener("click", () => { if (++taps >= 5) location.href = "secret.html"; });

// For the people who open DevTools: hello. Good instincts.
console.log("%cVOIDBIT_", "color:#39ff14;font:bold 16px monospace", "Curious? So are we. Hint: the Konami code. github.com/eliaslangat023-del");
