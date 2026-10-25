/* =====================================================================
   g11-worksheets.js  —  JSON-driven G11 worksheet engine for the WEEKS book
   Left page  : the student manual (guide cards + tabs)
   Right page : the questions (steps, auto-marking, PDF)
   Data       : Common Files G11/ALL JSON/Worksheets/G11-LABS.json  (ids = G11-LAB-1/2/3)
   Sim labs   : the SIMULATION LABS section at the end of this file (WEEK 11 Data & Information, and any you add)
   API        : window.G11Worksheets = { load, labsForWeek, open, close, isOpen, currentId }
   Week numbers: labsForWeek(n) uses the number printed on the week card.
   ===================================================================== */
(function () {
  'use strict';
  var JSON_PATH = 'Common Files G11/ALL JSON/Worksheets/G11-LABS.json';
  /* Worksheets in the JSON that were written for an old week number now show on a different card.
     G11-LAB-1/2/3 have "week": 7 in the JSON but now sit on the WEEK 10 card. */
  var WEEK_MOVES = { 7: 10 };
  function cardWeek(w) { return WEEK_MOVES[+w] || +w; }
  function SIM() { return window.G11SimEngine || null; }
  var SEL = { guidePage: 'section.guide', grid: '#weeksGrid', host: '#rightHost' };
  var CSS = ".ws{--ink:#1A2233;--muted:#5B6579;--line:#DCE1EA;--canvas:#F2F4F8;--paper:#FFFFFF;--guide-bg:#FBFAF6;\n--ok:#1D7A46;--ok-bg:#E3F3E9;--bad:#BF3A30;--bad-bg:#FBE8E6;--amber:#B47300}.ws *{box-sizing:border-box}.ws button{font:inherit;color:inherit}.ws .g-head{background:var(--ink);color:#fff;padding:26px 36px 24px}.ws .g-head .lbl{display:inline-block;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;background:rgba(255,255,255,.12);padding:3px 10px;border-radius:99px;color:#D6DCE8}.ws .g-head h1{margin:12px 0 2px;font-size:1.55rem;line-height:1.2;letter-spacing:-.01em}.ws .g-head p{margin:0;color:#AEB8CC;font-size:.9rem}.ws .g-body{padding:14px 36px 80px;font-family:'Source Serif 4',Georgia,'Times New Roman',serif;font-size:1.04rem;line-height:1.72;color:#28303E}.ws .gsec{padding:14px 18px;margin:6px -18px;border-radius:12px;border-left:4px solid transparent;transition:background .35s,border-color .35s}.ws .gsec.active{background:var(--accent-soft);border-left-color:var(--accent)}.ws .gsec.flash{animation:flash 1.1s ease}@keyframes flash{0%{box-shadow:0 0 0 0 var(--accent)}40%{box-shadow:0 0 0 6px var(--accent-soft)}100%{box-shadow:0 0 0 0 transparent}}.ws .g-body h2,.ws .g-body h3,.ws .g-body h4{font-family:'Lexend',system-ui,sans-serif;color:var(--ink);letter-spacing:-.01em}.ws .g-body h2{font-size:1.45rem;margin:0 0 6px}.ws .g-body h3{font-size:1.1rem;margin:0 0 4px}.ws .g-body h4{font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin:14px 0 4px}.ws .g-body p{margin:0 0 8px}.ws .g-body ul,.ws .g-body ol{margin:0 0 6px;padding-left:22px}.ws .g-body b{color:var(--ink)}.ws .g-sep{height:1px;background:var(--line);margin:18px 0}.ws .lesson-tag{font-family:'Lexend',sans-serif;font-size:.78rem;font-weight:600;color:var(--accent);text-transform:uppercase;letter-spacing:.06em;margin:0 0 4px}.ws .algo-list{list-style:none;padding:0!important;counter-reset:s;display:grid;gap:6px;margin-top:8px!important}.ws .algo-list li{counter-increment:s;display:flex;gap:12px;align-items:flex-start;background:#fff;border:1px solid var(--line);border-radius:10px;padding:8px 12px}.ws .algo-list li::before{content:counter(s);flex:none;width:24px;height:24px;border-radius:50%;background:var(--ink);color:#fff;font:600 .75rem/24px 'Lexend',sans-serif;text-align:center;margin-top:2px}.ws .process{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:10px;font-family:'Lexend',sans-serif;font-size:.85rem}.ws .process span{background:var(--ink);color:#fff;padding:4px 12px;border-radius:99px}.ws .process i{font-style:normal;color:var(--muted)}.ws .sum{width:100%;border-collapse:collapse;font-size:.95rem;margin-top:8px}.ws .sum th{font:600 .78rem 'Lexend',sans-serif;text-align:left;color:var(--muted);padding:8px 10px;border-bottom:2px solid var(--line)}.ws .sum td{padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}.ws .sum td:first-child{font-family:'Lexend',sans-serif;font-weight:500;font-size:.88rem;width:40%}.ws .topbar{background:var(--paper);border-bottom:1px solid var(--line);padding:16px 24px 14px}.ws .tb-row{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.ws .brand small{color:var(--muted);font-size:.78rem}.ws .brand h1{margin:2px 0 0;font-size:1.45rem;letter-spacing:-.01em;line-height:1.15}.ws .brand .topic{font-size:.88rem;color:var(--accent);font-weight:500}.ws .score{display:flex;gap:8px}.ws .stat{min-width:84px;text-align:center;border:1px solid var(--line);border-radius:12px;padding:6px 10px;background:#FAFBFD}.ws .stat b{display:block;font-size:1.15rem;line-height:1.2}.ws .stat span{font-size:.7rem;color:var(--muted)}.ws .stat.hl{background:var(--accent);border-color:var(--accent);color:#fff}.ws .stat.hl span{color:rgba(255,255,255,.8)}.ws .dots{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}.ws .dot{width:32px;height:32px;border-radius:9px;border:1.5px solid var(--line);background:#fff;font-weight:600;font-size:.78rem;cursor:pointer;padding:0}.ws .dot.part{background:linear-gradient(to top,var(--accent-soft) 55%,#fff 55%);border-color:var(--accent)}.ws .dot.done{background:var(--accent);color:#fff;border-color:var(--accent)}.ws .dot.cur{box-shadow:0 0 0 3px var(--accent-soft),0 0 0 4.5px var(--accent)}.ws .dot.s-good{background:var(--ok);border-color:var(--ok);color:#fff}.ws .dot.s-mid{background:var(--amber);border-color:var(--amber);color:#fff}.ws .dot.s-low{background:var(--bad);border-color:var(--bad);color:#fff}.ws .pbar{height:5px;background:#E3E7EE;border-radius:99px;margin-top:12px;overflow:hidden}.ws .pbar i{display:block;height:100%;width:0;background:var(--accent);transition:width .3s}.ws .stage{flex:1;overflow-y:auto;padding:22px 24px 40px;min-height:0}.ws .navbar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 24px;background:var(--paper);border-top:1px solid var(--line)}.ws .navbar .where{font-size:.84rem;color:var(--muted);text-align:center;flex:1}.ws .nbtn{font-weight:600;border-radius:10px;padding:10px 18px;cursor:pointer;border:1.5px solid var(--line);background:#fff;min-width:104px}.ws .nbtn.primary{background:var(--accent);border-color:var(--accent);color:#fff}.ws .nbtn:disabled{opacity:.4;cursor:default}.ws .step-title{margin:0 0 4px;font-size:1.35rem;letter-spacing:-.01em}.ws .step-sub{margin:0 0 18px;color:var(--muted);font-size:.9rem}.ws .card{background:var(--paper);border-radius:14px;padding:20px;margin-bottom:14px;border:1px solid #E3E7EE}.ws .card h3{margin:0;font-size:1.02rem;line-height:1.4;font-weight:600}.ws .card .sub{margin:4px 0 0;color:var(--muted);font-size:.88rem}.ws .qtop{display:flex;gap:12px;align-items:flex-start}.ws .num{flex:none;width:34px;height:34px;border-radius:10px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;font-weight:700;font-size:.92rem}.ws .gref{display:inline-flex;gap:6px;align-items:center;font-size:.76rem;font-weight:500;color:var(--accent);background:var(--accent-soft);border:none;border-radius:99px;padding:4px 11px 4px 9px;cursor:pointer;margin-top:8px}.ws .gref svg{width:14px;height:14px}.ws .txt{width:100%;font:inherit;color:var(--ink);background:#F7F8FB;border:1.5px solid var(--line);border-radius:10px;padding:10px 12px;transition:border-color .15s,background .15s}.ws textarea.txt{resize:vertical;min-height:74px;line-height:1.5;margin-top:12px}.ws .txt:focus{outline:none;border-color:var(--accent);background:#fff;box-shadow:0 0 0 3px var(--accent-soft)}.ws .txt:disabled{color:var(--ink);-webkit-text-fill-color:var(--ink);opacity:1;background:#fff}.ws .field{margin-bottom:14px}.ws .field label{display:block;font-size:.84rem;font-weight:500;color:var(--muted);margin-bottom:6px}.ws .field.missing .txt{border-color:var(--bad);background:var(--bad-bg)}.ws .fields{display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px}.ws .howto{margin:0;padding-left:20px;color:#2A3346;display:grid;gap:6px}.ws .tiles{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:14px}.ws .tile{padding:12px;border:1.5px solid var(--line);border-radius:12px;background:#fff;cursor:pointer;text-align:center;font-weight:500;font-size:.92rem}.ws .tile.sel{border-color:var(--accent);background:var(--accent-soft)}.ws .tile.right{border-color:var(--ok)!important;background:var(--ok-bg)!important}.ws .tile.wrong{border-color:var(--bad)!important;background:var(--bad-bg)!important}.ws .pwd{font-family:ui-monospace,Menlo,Consolas,monospace;background:#F2F4F8;padding:2px 8px;border-radius:6px}.ws .chip{display:inline-flex;align-items:center;padding:8px 13px;border-radius:10px;background:#fff;border:1.5px solid #C6CFE0;box-shadow:0 2px 0 #C6CFE0;cursor:grab;user-select:none;-webkit-user-select:none;touch-action:none;font-size:.88rem;font-weight:500;line-height:1.3}.ws .chip:focus-visible{outline:3px solid var(--accent-soft);outline-offset:2px}.ws .chip.selected{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}.ws .chip.dragging{opacity:.3}.ws .chip.right{border-color:var(--ok);background:var(--ok-bg);box-shadow:none}.ws .chip.wrong{border-color:var(--bad);background:var(--bad-bg);box-shadow:none}.ws .ghost{position:fixed;z-index:1000;pointer-events:none;margin:0;transform:rotate(-2deg);box-shadow:0 14px 26px -10px rgba(0,0,0,.35)}.ws .tray{display:flex;flex-wrap:wrap;gap:8px;padding:12px;border:1.5px dashed var(--line);border-radius:12px;min-height:58px;background:#FAFBFD;margin-top:14px;align-items:center}.ws .tray:empty::before{content:'Every card has been placed';color:var(--muted);font-size:.82rem}.ws .zone.hover{border-color:var(--accent)!important;background:var(--accent-soft)!important}.ws .buckets{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}.ws .bucket{border:1.5px dashed #BFC8D8;border-radius:12px;padding:10px 12px;min-height:130px;background:#fff}.ws .bucket h4{margin:0 0 8px;font-size:.88rem}.ws .zone-body{display:flex;flex-direction:column;align-items:flex-start;gap:6px;min-height:60px}.ws .blanks{margin:12px 0 0;padding:0;list-style:none;display:grid;gap:8px}.ws .blanks li{line-height:2.5}.ws .blank{display:inline-flex;min-width:130px;min-height:40px;vertical-align:middle;border:1.5px dashed #BFC8D8;border-radius:10px;margin:0 4px;align-items:center;justify-content:center;padding:2px;background:#fff}.ws .chain{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:12px}.ws .clink{min-width:130px;min-height:46px;border:1.5px dashed #BFC8D8;border-radius:10px;display:flex;align-items:center;justify-content:center;padding:3px;background:#fff}.ws .chain .arr{color:var(--muted);font-weight:700}.ws .match{display:grid;grid-template-columns:1fr 1.4fr;gap:10px 18px;margin-top:14px}.ws .mcol{display:grid;gap:8px;align-content:start}.ws .mcol h4{margin:0;font-size:.8rem;color:var(--muted);font-weight:500}.ws .mitem{text-align:left;padding:10px 12px;border:1.5px solid var(--line);border-radius:10px;background:#fff;cursor:pointer;display:flex;gap:10px;align-items:center;min-height:50px;font-size:.88rem}.ws .mitem .tag{width:26px;height:26px;border-radius:50%;flex:none;display:grid;place-items:center;font-size:.76rem;font-weight:700;background:#EEF1F6;color:#9AA3B5}.ws .mitem.active{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}.ws .mitem.paired .tag,.ws .mleft .tag{color:#fff}.ws .mitem.right{border-color:var(--ok);background:var(--ok-bg)}.ws .mitem.wrong{border-color:var(--bad);background:var(--bad-bg)}.ws .shape-tray{position:sticky;top:-22px;z-index:8;justify-content:center;box-shadow:0 8px 16px -14px rgba(0,0,0,.4)}.ws .chip.shape{position:relative;width:86px;height:36px;padding:0;background:none;border:none;box-shadow:none}.ws .chip.shape svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}.ws .chip.shape svg *{fill:#fff;stroke:var(--ink);stroke-width:2;vector-effect:non-scaling-stroke}.ws .chip.shape.selected svg *{stroke:var(--accent);stroke-width:3;fill:var(--accent-soft)}.ws .chip.shape.right svg *{fill:var(--ok-bg);stroke:var(--ok);stroke-width:2.5}.ws .chip.shape.wrong svg *{fill:var(--bad-bg);stroke:var(--bad);stroke-width:2.5}.ws .flowbox{overflow-x:auto;margin-top:14px;border-radius:14px;border:1px solid var(--line);background-color:#fff;background-image:radial-gradient(#D6DCE7 1px,transparent 1px);background-size:18px 18px}.ws .flow{position:relative;margin:0 auto}.ws .flow svg.arrows{position:absolute;inset:0}.ws .fnode{position:absolute;border:2px dashed #B3BED2;border-radius:12px;background:rgba(255,255,255,.88);display:grid;place-items:center}.ws .fnode.filled{border-color:transparent;background:transparent}.ws .fnode:not(.filled)::after{content:'drop a shape';position:absolute;bottom:3px;font-size:.62rem;color:#98A3B7;letter-spacing:.02em}.ws .fnode .chip.shape{position:absolute;inset:0;width:100%;height:100%;z-index:1}.ws .fstep{position:absolute;top:-11px;left:-11px;width:24px;height:24px;border-radius:50%;background:var(--ink);color:#fff;font-size:.72rem;font-weight:700;display:grid;place-items:center;z-index:4}.ws .txt.fname{position:relative;z-index:3;width:74%;padding:4px 6px;font-size:.76rem;text-align:center;background:rgba(255,255,255,.92);border-radius:6px;border-width:1px;margin-top:-6px}.ws .fnode.dia .txt.fname{width:50%}.ws .fnode.missing{border-color:var(--bad)!important;background:var(--bad-bg)!important}.ws .fixed{position:absolute;display:grid;place-items:center;border-radius:999px;background:var(--ink);color:#fff;font-weight:600;font-size:.9rem;box-shadow:0 4px 10px -6px rgba(0,0,0,.5)}.ws .pill-l{font:600 11px 'Lexend',sans-serif}.ws details.hint{margin-top:10px;font-size:.86rem;color:var(--muted)}.ws details.hint summary{cursor:pointer;color:var(--accent);font-weight:500}.ws .legend{display:flex;flex-wrap:wrap;gap:14px;margin-top:8px}.ws .legend span{display:flex;align-items:center;gap:6px}.ws .legend svg{width:34px;height:18px}.ws .legend svg *{fill:#fff;stroke:var(--ink);stroke-width:1.5}.ws .review-list{list-style:none;margin:0;padding:0;display:grid;gap:6px}.ws .review-list li{display:flex;justify-content:space-between;gap:12px;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:#fff;font-size:.9rem;cursor:pointer}.ws .review-list li b{font-weight:600}.ws .btns{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.ws .btn{font-weight:600;border:none;border-radius:12px;padding:13px 22px;cursor:pointer;font-size:.98rem}.ws .btn-primary{background:var(--accent);color:#fff}.ws .btn-ghost{background:#fff;border:1.5px solid var(--line)}.ws .result{display:none;margin-top:16px;border-radius:14px;background:var(--accent-soft);padding:18px 20px}.ws .result.show{display:block}.ws .result h3{margin:0 0 4px;font-size:1.2rem}.ws .result table{border-collapse:collapse;margin-top:10px;width:100%}.ws .result td{padding:5px 0;border-bottom:1px solid rgba(0,0,0,.08);font-size:.9rem}.ws .result td:last-child{text-align:right;font-weight:600}.ws.locked .chip,.ws.locked .mitem,.ws.locked .tile{cursor:default}@media (max-width:900px){.ws .g-head{padding:16px 20px}.ws .g-body{padding:8px 20px 40px}.ws .fields,.ws .match,.ws .buckets{grid-template-columns:1fr}.ws .topbar{padding:12px 16px}.ws .stage{padding:16px}.ws .shape-tray{top:-16px}\n}@media (prefers-reduced-motion:reduce){.ws *{transition:none!important;animation:none!important}}.ws{--desk:#1F2A3C;--paper2:#FCFBF7;--grid:#ECEFF5}.ws .txt{-webkit-user-select:text;user-select:text}.ws .g-head{background:var(--accent-deep);padding:14px 24px 12px;position:relative}.ws .g-head p{font-size:.8rem}.ws .g-head h1{font-size:1.2rem;margin:7px 0 1px}.ws .g-head .part{position:absolute;right:20px;top:14px;font:600 .74rem 'Lexend',sans-serif;background:#fff;color:var(--accent-deep);border-radius:99px;padding:4px 11px}.ws .g-tabs{display:flex;flex-wrap:wrap;gap:6px;padding:9px 22px 8px;border-bottom:1px solid var(--line);background:#fff}.ws .g-tab{border:1.5px solid var(--line);background:#F7F8FB;border-radius:9px;padding:4px 10px;font:500 .74rem 'Lexend',sans-serif;cursor:pointer;color:var(--muted)}.ws .g-tab.on{background:var(--accent);border-color:var(--accent);color:#fff}.ws .deck{flex:1;min-height:0;overflow:hidden;padding:14px 22px 10px;display:flex;flex-direction:column;gap:12px;\n background-color:var(--paper2);background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);background-size:24px 24px;\n font-family:'Source Serif 4',Georgia,serif;font-size:1rem;line-height:1.6;color:#28303E}.ws .g-foot{display:flex;justify-content:space-between;padding:9px 24px;border-top:1px solid var(--line);background:#fff;font:500 .74rem 'Lexend',sans-serif;color:var(--muted)}.ws .gsec{display:none;margin:0;padding:1em 1.15em 1em 1.3em;background:#fff;border:1px solid #DFE3EB;border-left:5px solid var(--accent);border-radius:16px;box-shadow:0 10px 22px -18px rgba(26,34,51,.55);flex:none}.ws .gsec.show{display:block;animation:cardIn .28s ease}.ws .gsec.active{background:#fff;border-left-color:var(--accent)}@keyframes cardIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}.ws .gsec .ctag{display:inline-block;font:600 .72em 'Lexend',sans-serif;color:var(--accent);background:var(--accent-soft);border-radius:7px;padding:2px 9px;margin-bottom:.35em}.ws .gsec h2{font:600 1.3em/1.25 'Lexend',sans-serif;color:var(--ink);margin:0 0 .35em}.ws .gsec h3{font:600 1.08em/1.3 'Lexend',sans-serif;color:var(--ink);margin:0 0 .3em}.ws .gsec h4{font:600 .74em 'Lexend',sans-serif;color:var(--muted);margin:.8em 0 .25em;letter-spacing:.02em}.ws .gsec p{margin:0 0 .45em}.ws .gsec ul,.ws .gsec ol{margin:0 0 .4em;padding-left:1.3em}.ws .gsec b{color:var(--ink)}.ws .gsec .here{font:600 .7em 'Lexend',sans-serif;color:#fff;background:var(--accent);border-radius:6px;padding:1px 7px;margin-left:6px;vertical-align:2px}.ws .algo-list{grid-template-columns:1fr 1fr;gap:.4em!important}.ws .algo-list li{padding:.4em .6em;font-size:.9em;line-height:1.4;border-radius:10px}.ws .algo-list li::before{background:var(--accent)}.ws .process span{background:var(--accent-deep)}.ws .mini{width:100%;border-collapse:separate;border-spacing:0;font-size:.9em;margin:.4em 0 .2em;border:1px solid var(--line);border-radius:10px;overflow:hidden}.ws .mini th{font:600 .78em 'Lexend',sans-serif;background:var(--accent-soft);color:var(--accent-deep);text-align:left;padding:.35em .7em}.ws .mini td{padding:.3em .7em;border-top:1px solid var(--line)}.ws .pv{display:flex;gap:6px;margin:.4em 0;font-family:'Lexend',sans-serif}.ws .pv div{flex:1;text-align:center;border:1.5px solid var(--line);border-radius:10px;background:#fff;padding:.25em 0}.ws .pv small{display:block;font-size:.7em;color:var(--muted)}.ws .pv b{font-size:1.1em}.ws .pv div.on{border-color:var(--accent);background:var(--accent-soft)}.ws .sum td:first-child{width:38%}.ws .sum{font-size:.9em}.ws .sum td{padding:.4em .6em}.ws .topbar{border-radius:0}.ws .brand h1{font-size:1.5rem;color:var(--accent-deep)}.ws .card{border-radius:16px;box-shadow:0 1px 0 #E3E7EE}.ws .card.q{border-top:3px solid var(--accent-soft)}.ws .tiles.one{grid-template-columns:1fr}.ws .tile{text-align:left;line-height:1.35}.ws .buckets.b2{grid-template-columns:repeat(2,1fr)}.ws .buckets.b5{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}.ws .bucket{border-radius:14px}.ws .bucket h4{color:var(--accent-deep)}.ws .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.ws .ttable-wrap{overflow-x:auto;margin-top:14px}.ws .ttable{border-collapse:separate;border-spacing:0;width:100%;border:1px solid var(--line);border-radius:12px;overflow:hidden;font-size:.9rem}.ws .ttable th{background:var(--accent-soft);color:var(--accent-deep);font-weight:600;text-align:left;padding:8px 10px;font-size:.8rem}.ws .ttable td{padding:6px 10px;border-top:1px solid var(--line);vertical-align:middle}.ws .ttable .blank{min-width:96px;min-height:38px;margin:0}.ws .flowbox{border-radius:16px;background-color:#FBFCFE;background-image:linear-gradient(#EEF1F6 1px,transparent 1px),linear-gradient(90deg,#EEF1F6 1px,transparent 1px);background-size:20px 20px}.ws .fixed{background:var(--accent-deep)}.ws .fstep{background:var(--accent)}.ws .elab{font:700 12px 'Lexend',sans-serif;fill:var(--accent-deep);paint-order:stroke;stroke:#fff;stroke-width:4px}.ws .flabel{position:relative;z-index:3;width:70%;text-align:center;font:500 .72rem/1.25 'Lexend',sans-serif;color:var(--ink);pointer-events:none;background:rgba(255,255,255,.85);border-radius:6px;padding:2px 4px}.ws .snode:not(.filled)::after{content:'drop a shape'}.ws .tnode{position:absolute;display:grid;place-items:center}.ws .tnode .outline{position:absolute;inset:0;width:100%;height:100%;overflow:visible}.ws .tnode .outline *{fill:rgba(255,255,255,.92);stroke:#9AA6BC;stroke-width:2;stroke-dasharray:6 5;vector-effect:non-scaling-stroke}.ws .tnode.filled .outline *{stroke:var(--accent);stroke-dasharray:none;fill:#fff}.ws .tnode.hover .outline *{stroke:var(--accent);fill:var(--accent-soft)}.ws .tnode.zone.hover{background:transparent!important}.ws .tnode .chip{position:relative;z-index:2;max-width:86%;font-size:.74rem;padding:5px 8px;text-align:center;box-shadow:none}.ws .tnode.d .chip{max-width:58%;font-size:.7rem;padding:4px 6px}.ws .tnode.p .chip{max-width:76%}.ws .chip.fchip{font-size:.8rem}.ws .text-tray{gap:7px}.ws .fnode.dia .txt.fname{width:50%}@media (max-width:900px){.ws .deck{overflow:auto}.ws .algo-list{grid-template-columns:1fr}\n}.ws .g-head{display:flex;align-items:center;gap:12px;padding:10px 20px}.ws .g-head h1{margin:0;font-size:1.15rem;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ws .g-head .lbl{flex:none}.ws .g-head .part{position:static;flex:none}.ws .g-tabs{padding:7px 18px}.ws .g-foot{padding:4px 20px;font-size:.7rem}.ws .deck{font-size:16px;line-height:1.55;padding:12px 18px 10px;gap:10px;overflow-y:auto;scrollbar-width:thin}.ws .gsec{padding:.85em 1em .85em 1.15em}.ws .gsec h4{font-size:.8em}.ws .algo-list li{font-size:1em;line-height:1.35;padding:.35em .55em}.ws .mini,.ws .sum{font-size:1em}.ws .mini td,.ws .sum td{padding:.28em .6em}.ws .topbar{padding:8px 18px 8px}.ws .brand{display:flex;align-items:baseline;gap:12px;white-space:nowrap;overflow:hidden}.ws .brand h1{margin:0;font-size:1.25rem;flex:none}.ws .brand .topic{font-size:.86rem;overflow:hidden;text-overflow:ellipsis}.ws .brand small{margin-left:auto;flex:none;font-size:.74rem}.ws .tb-row2{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:7px}.ws .tb-row2 .dots{margin-top:0;gap:5px}.ws .dot{width:28px;height:28px;border-radius:8px;font-size:.74rem}.ws .score{flex:none;gap:6px}.ws .stat{min-width:70px;padding:2px 8px;border-radius:10px;display:flex;align-items:baseline;gap:5px}.ws .stat b{display:inline;font-size:1rem}.ws .pbar{margin-top:7px;height:4px}.ws .stage{padding:16px 20px 30px}.ws .navbar{padding:5px 18px}.ws .nbtn{padding:6px 14px;min-width:96px;border-radius:9px}.ws #pdf-btn{background:#C62828;border-color:#C62828;color:#fff}.ws #pdf-btn:hover{background:#A61F1F}.ws .tb-row2 .dots{flex-wrap:nowrap;flex:1;min-width:0}.ws .tb-row2 .dot{flex:1 1 0;min-width:20px;max-width:30px;height:26px;padding:0}.ws .stat{min-width:0}.ws .stat span{font-size:.66rem}\n\n/* ---- host-page integration (book layout) ---- */\n.ws{font:15px/1.55 'Lexend',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:var(--ink);-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;--paper2:#FCFBF7;--grid:#ECEFF5}\n.ws .txt{-webkit-user-select:text;user-select:text}\n.ws-guide,.ws-work{display:flex;flex-direction:column;flex:1;min-width:0;min-height:0;height:100%;width:100%}\n.ws-guide{background:var(--paper2)}\n.ws-work{background:#fff;position:relative}\n.work-host.ws-on{padding:0}\n.ws .ws-back{min-width:0;padding:3px 10px;font-size:.74rem;align-self:center;margin-right:2px;flex:none}\n.ws .ghost{z-index:5000}\n.ws-toast{position:fixed;left:75%;bottom:80px;transform:translate(-50%,20px);background:#1A2233;color:#fff;padding:11px 16px;border-radius:12px;font:500 .88rem 'Lexend',sans-serif;opacity:0;transition:.25s;pointer-events:none;z-index:6000;max-width:44vw;text-align:center}\n.ws-toast.show{opacity:1;transform:translate(-50%,0)}\n.slot-btn.kind-ws{background:linear-gradient(135deg,#C2762C 0%,#8E4F14 100%);box-shadow:0 2px 0 #5E3309,0 5px 10px -8px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.18)}\n.b-btns:has(.slot-btn:nth-child(6)) .slot-btn{font-size:10px;max-height:26px}\n@media print{.ws,.ws-toast{display:none!important}}\n";
  var LABS = {};
  var S = null;                         // the open worksheet session (null = closed)

  /* ---------------- helpers ---------------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function html(o, k) { return o[k + 'Html'] != null ? o[k + 'Html'] : esc(o[k]); }   // plain text, or html if the JSON supplies <key>Html
  function plain(h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent.replace(/\s+/g, ' ').trim(); }
  function q1(sel, root) { return (root || S.work).querySelector(sel); }
  function qa(sel, root) { return Array.prototype.slice.call((root || S.work).querySelectorAll(sel)); }
  function T(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }

  var BOOK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2z"/><path d="M22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/></svg>';
  var SHAPES = {
    p: '<polygon points="14,1 99,1 86,39 1,39"/>',
    r: '<rect x="1" y="1" width="98" height="38" rx="3"/>',
    d: '<polygon points="50,0 100,20 50,40 0,20"/>',
    t: '<rect x="1" y="1" width="98" height="38" rx="19"/>'
  };
  var SHAPE_NAME = { p: 'Parallelogram (input / output)', r: 'Rectangle (process)', d: 'Diamond (decision)', t: 'Oval (start / stop)' };
  function shapeSvg(k, cls) { return '<svg ' + (cls ? 'class="' + cls + '" ' : '') + 'aria-hidden="true" viewBox="0 0 100 40" preserveAspectRatio="none">' + SHAPES[k] + '</svg>'; }
  var LEGEND = '<details class="hint"><summary>Need a hint about flowchart shapes?</summary><div class="legend">' +
    '<span>' + shapeSvg('t') + 'Start / Stop</span><span>' + shapeSvg('p') + 'Input or output</span>' +
    '<span>' + shapeSvg('r') + 'Process</span><span>' + shapeSvg('d') + 'Decision (yes / no)</span></div></details>';

  /* ---------------- data ---------------- */
  function load(path) {
    return fetch(encodeURI(path || JSON_PATH), { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (data) {
      var list = Array.isArray(data) ? data : Object.keys(data).map(function (k) { return Object.assign({ id: k }, data[k]); });
      list.forEach(function (l) { if (l && l.id && l.steps && l.guide) LABS[l.id] = l; });
      console.log('[Worksheets] loaded:', Object.keys(LABS));
    }).catch(function (e) { console.error('Could not load "' + (path || JSON_PATH) + '": ' + e.message); });
  }
  function labsForWeek(displayWeek) {
    var ws = Object.keys(LABS).map(function (k) { return LABS[k]; }).filter(function (l) { return cardWeek(l.week) === +displayWeek; })
      .map(function (l) { return { id: l.id, title: l.title, icon: l.icon || '📘' }; });
    return ws.concat(SIM() ? SIM().labsForWeek(displayWeek) : []);
  }

  /* ---------------- builders: guide (left page) ---------------- */
  function accentStyle(a) { a = a || {}; return '--accent:' + (a.accent || '#1F6FB2') + ';--accent-soft:' + (a.soft || '#E1EEF9') + ';--accent-deep:' + (a.deep || '#123F68'); }
  function buildGuide(lab) {
    var g = lab.guide;
    return '<div class="g-head"><span class="lbl">' + esc(g.label) + '</span><h1>' + esc(g.heading) + '</h1><span class="part">' + esc(g.part) + '</span></div>' +
      '<nav class="g-tabs" aria-label="Guide cards">' + g.cards.map(function (c) { return '<button type="button" class="g-tab" data-card="' + esc(c.id) + '">' + esc(c.tab) + '</button>'; }).join('') + '</nav>' +
      '<div class="deck">' + g.cards.map(function (c) { return '<div class="gsec" data-gid="' + esc(c.id) + '">' + c.html + '</div>'; }).join('') + '</div>';
  }

  /* ---------------- builders: questions (right page) ---------------- */
  function gref(q) {
    if (!q.guide || !q.guide.length) return '';
    return '<button type="button" class="gref" data-g="' + esc(q.guide.join(' ')) + '">' + BOOK + 'Refer to the Guide on the left: ' + esc(q.guideLabel || '') + '</button>';
  }
  function qTop(q) {
    var h = q.type === 'text' ? '<label for="ws-t' + q.no + '">' + html(q, 'prompt') + '</label>' : html(q, 'prompt');
    return '<div class="qtop"><div class="num">' + q.no + '</div><div><h3>' + h + '</h3>' + (q.sub ? '<p class="sub">' + q.sub + '</p>' : '') + gref(q) + '</div></div>';
  }
  function chipHtml(c, fchip) {
    var dis = c.distractor ? ' data-distractor=""' : '';
    if (c.shape) return '<div class="chip shape" data-ans="' + esc(c.ans) + '"' + dis + ' aria-label="' + esc(SHAPE_NAME[c.shape] || c.text) + '">' + shapeSvg(c.shape) + '<span class="sr">' + esc(c.text) + '</span></div>';
    return '<div class="chip' + (fchip ? ' fchip' : '') + '" data-ans="' + esc(c.ans) + '"' + dis + '>' + html(c, 'text') + '</div>';
  }
  function trayHtml(q, extra, fchip) {
    return '<div class="tray zone' + (extra ? ' ' + extra : '') + '" data-shuffle>' + q.chips.map(function (c) { return chipHtml(c, fchip); }).join('') + '</div>';
  }
  function blankHtml(b) { return '<span class="blank zone" data-ans="' + esc(b.ans) + '" data-cap="1" data-label="' + esc(b.label) + '"></span>'; }
  function flowHtml(q) {
    var f = q.flow, id = 'ah' + q.no;
    var svg = '<svg class="arrows" aria-hidden="true" width="' + f.width + '" height="' + f.height + '" viewBox="0 0 ' + f.width + ' ' + f.height + '">' +
      '<defs><marker id="' + id + '" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,5 L0,10 z" fill="#5B6579"/></marker></defs>' +
      '<g fill="none" stroke="#5B6579" stroke-linejoin="round" stroke-width="2">' + f.arrows.map(function (d) { return '<path d="' + esc(d) + '" marker-end="url(#' + id + ')"/>'; }).join('') + '</g>' +
      (f.labels || []).map(function (l) { return '<text class="elab" x="' + l.x + '" y="' + l.y + '">' + esc(l.text) + '</text>'; }).join('') + '</svg>';
    function pos(o) { return 'left:' + o.left + 'px;top:' + o.top + 'px;width:' + o.width + 'px;height:' + o.height + 'px'; }
    var fixed = (f.fixed || []).map(function (o) { return '<div class="fixed" style="' + pos(o) + '">' + esc(o.text) + '</div>'; }).join('');
    var nodes = f.nodes.map(function (n) {
      var base = ' data-ans="' + esc(n.ans) + '" data-cap="1" data-label="' + esc(n.label) + '" style="' + pos(n) + '"';
      if (n.mode === 'text') return '<div class="tnode zone ' + n.shape + '"' + base + '>' + shapeSvg(n.shape, 'outline') + '<span class="fstep">' + n.step + '</span></div>';
      if (n.mode === 'shape') return '<div class="fnode snode zone"' + base + '><span class="fstep">' + n.step + '</span><span class="flabel">' + esc(n.text) + '</span></div>';
      return '<div class="fnode zone"' + base + '><span class="fstep">' + n.step + '</span><input class="txt fname" type="text" maxlength="40" placeholder="Type name" aria-label="Name for step ' + n.step + '"></div>';
    }).join('');
    return '<div class="flowbox"><div class="flow" style="width:' + f.width + 'px;height:' + f.height + 'px">' + svg + fixed + nodes + '</div></div>';
  }
  function buildQuestion(q) {
    var a = '<article class="card q" data-type="' + q.type + '" data-q="' + esc(q.no + '. ' + (q.prompt || plain(q.promptHtml || ''))) + '"' + (q.type === 'pick' ? ' data-answer="' + esc(q.answer) + '"' : '') + '>';
    var body = '';
    if (q.type === 'text') {
      body = '<textarea class="txt" id="ws-t' + q.no + '" rows="' + (q.rows || 3) + '" maxlength="' + (q.maxlength || 600) + '" placeholder="' + esc(q.placeholder || 'Type your answer in your own words') + '"></textarea>';
    } else if (q.type === 'pick') {
      body = '<div class="tiles' + (q.layout === 'one' ? ' one' : '') + '">' + q.options.map(function (o) { return '<button type="button" class="tile" data-v="' + esc(o.v) + '" aria-pressed="false">' + html(o, 'text') + '</button>'; }).join('') + '</div>';
    } else if (q.type === 'match') {
      body = '<div class="match"><div class="mcol"><h4>' + esc(q.leftTitle) + '</h4>' + q.pairs.map(function (p) {
        return '<button type="button" class="mitem mleft" data-id="' + esc(p.id) + '" data-label="' + esc(p.left) + '"><span class="tag"></span>' + esc(p.left) + '</button>'; }).join('') +
        '</div><div class="mcol"><h4>' + esc(q.rightTitle) + '</h4><div class="mcol"' + (q.shuffleRight === false ? '' : ' data-shuffle') + '>' + q.pairs.map(function (p) {
        return '<button type="button" class="mitem mright" data-id="' + esc(p.id) + '" data-label="' + esc(p.right) + '"><span class="tag"></span>' + esc(p.right) + '</button>'; }).join('') + '</div></div></div>';
    } else if (q.type === 'flow') {
      body = (q.hint ? LEGEND : '') + trayHtml(q, 'shape-tray') + flowHtml(q);
    } else if (q.type === 'dd') {
      if (q.layout === 'buckets') {
        body = trayHtml(q) + '<div class="buckets b' + esc(q.columns) + '">' + q.buckets.map(function (b) {
          return '<div class="bucket zone" data-ans="' + esc(b.ans) + '" data-label="' + esc(b.label) + '"><h4>' + esc(b.label) + '</h4><div class="zone-body"></div></div>'; }).join('') + '</div>';
      } else if (q.layout === 'blanks') {
        body = trayHtml(q) + '<ol class="blanks">' + q.sentences.map(function (s, i) {
          var parts = s.text.split('{_}'), out = (i + 1) + '. ';
          parts.forEach(function (p, k) { out += esc(p) + (k < parts.length - 1 ? blankHtml(s.blanks[k]) : ''); });
          return '<li>' + out + '</li>'; }).join('') + '</ol>';
      } else if (q.layout === 'chain') {
        body = trayHtml(q) + '<div class="chain">' + q.links.map(function (l, i) {
          return (i ? '<span class="arr">→</span>' : '') + '<div class="zone clink" data-ans="' + esc(l.ans) + '" data-cap="1" data-label="' + esc(l.label) + '"></div>'; }).join('') + '</div>';
      } else if (q.layout === 'table') {
        body = trayHtml(q) + '<div class="ttable-wrap"><table class="ttable"><thead><tr>' + q.head.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          q.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + (typeof c === 'string' ? esc(c) : blankHtml(c.blank)) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
      } else if (q.layout === 'flow') {
        var shapeTray = q.trayKind === 'shape';
        body = (q.hint ? LEGEND : '') + trayHtml(q, shapeTray ? 'shape-tray' : 'text-tray', !shapeTray) + flowHtml(q);
      }
    }
    return a + qTop(q) + body + '</article>';
  }
  function buildSteps(lab) {
    var withQ = lab.steps.map(function (s, i) { return { s: s, i: i }; }).filter(function (x) { return x.s.type === 'questions'; });
    return lab.steps.map(function (st, i) {
      var head = '<section class="step" data-title="' + esc(st.title) + '" data-guide="' + esc(st.guide.join(' ')) + '" hidden><h2 class="step-title">' + esc(st.title) + '</h2><p class="step-sub">' + esc(st.subtitle) + '</p>';
      if (st.type === 'intro') {
        return head + '<div class="card"><h3>Your details</h3><div class="fields" style="margin-top:14px">' + st.fields.map(function (f) {
          return '<div class="field"><label for="ws-' + esc(f.id) + '">' + esc(f.label) + '</label><input class="txt" id="ws-' + esc(f.id) + '" data-fid="' + esc(f.id) + '" type="text" placeholder="' + esc(f.placeholder) + '"></div>'; }).join('') + '</div></div>' +
          '<div class="card"><h3>' + esc(st.howtoTitle) + '</h3><ol class="howto" style="margin-top:10px">' + st.howto.map(function (h) { return '<li>' + h + '</li>'; }).join('') + '</ol></div></section>';
      }
      if (st.type === 'review') {
        return head + '<div class="card"><h3>' + esc(st.cardTitle) + '</h3><p class="sub">' + esc(st.cardSub) + '</p><ul class="review-list" style="margin-top:12px">' +
          withQ.map(function (x) { return '<li data-goto="' + x.i + '"><span>' + (x.i + 1) + '. ' + esc(x.s.title) + '</span><b></b></li>'; }).join('') + '</ul>' +
          '<div class="btns"><button class="btn btn-primary" data-act="submit" type="button">Submit classwork</button><button class="btn btn-ghost" data-act="pdf" type="button">Download PDF</button></div>' +
          '<div class="result" aria-live="polite"></div></div></section>';
      }
      return head + st.questions.map(buildQuestion).join('') + '</section>';
    }).join('');
  }
  function buildWork(lab) {
    return '<div class="topbar"><div class="brand"><button type="button" class="nbtn ws-back" data-act="back" title="Back to the week cards">← Weeks</button><h1>' + esc(lab.title) + '</h1><div class="topic">' + esc(lab.topic) + '</div><small>' + esc(lab.meta) + '</small></div>' +
      '<div class="tb-row2"><div class="dots" aria-label="Steps"></div><div class="score"><div class="stat"><b class="sb-ans">0/0</b><span>answered</span></div><div class="stat"><b class="sb-score">–</b><span>score</span></div></div></div>' +
      '<div class="pbar"><i></i></div></div><div class="stage">' + buildSteps(lab) + '</div>' +
      '<div class="navbar"><button class="nbtn" type="button" data-act="prev">← Previous</button><div class="where"></div><button class="nbtn primary" type="button" data-act="next">Next →</button></div>';
  }

  /* ---------------- toast ---------------- */
  var toastEl = null, tt;
  function toast(m) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'ws-toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(tt); tt = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
  }

  /* ---------------- answered / steps / guide / scoreboard ---------------- */
  function answered(q) {
    switch (q.dataset.type) {
      case 'text': return !!q.querySelector('.txt').value.trim();
      case 'pick': return !!q.querySelector('.tile.sel');
      case 'dd': return !q.querySelector('.tray .chip:not([data-distractor])');
      case 'match': return qa('.mleft', q).every(function (b) { return b.dataset.pair; });
      case 'flow': return qa('.fnode', q).every(function (z) { return z.querySelector('.chip') && z.querySelector('.fname').value.trim(); });
    }
    return false;
  }
  function shuffle(box) {
    var c = Array.prototype.slice.call(box.children);
    for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; }
    c.forEach(function (x) { box.appendChild(x); });
  }
  function guideTo(ids, flash) {
    var list = (ids || '').split(' ').filter(Boolean);
    qa('.gsec', S.guide).forEach(function (x) { x.classList.toggle('show', list.indexOf(x.dataset.gid) > -1); });
    var tabs = qa('.g-tab', S.guide);
    tabs.forEach(function (t) { t.classList.toggle('on', list.indexOf(t.dataset.card) > -1); });
    S.setFootLeft('Open: ' + list.map(function (id) { var t = tabs.filter(function (x) { return x.dataset.card === id; })[0]; return t ? t.textContent : ''; }).join(' + '));
    var deck = q1('.deck', S.guide); if (deck) deck.scrollTop = 0;
    if (flash) list.forEach(function (id) { var el = q1('.gsec[data-gid="' + id + '"]', S.guide); if (el) { el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); } });
  }
  function fitFlows() {
    qa('.flowbox').forEach(function (bx) {
      var f = bx.querySelector('.flow'); if (!bx.offsetParent) return;
      var w = parseFloat(f.style.width); var s = Math.max(.72, Math.min(1, (bx.clientWidth - 8) / w)); f.style.zoom = s;
    });
  }
  function go(i) {
    i = Math.max(0, Math.min(S.steps.length - 1, i)); S.cur = i;
    S.steps.forEach(function (s, k) { s.hidden = k !== i; }); S.stage.scrollTop = 0;
    q1('.where').textContent = 'Step ' + (i + 1) + ' of ' + S.steps.length + ': ' + S.steps[i].dataset.title;
    q1('[data-act=prev]').disabled = i === 0;
    q1('[data-act=next]').style.visibility = i === S.steps.length - 1 ? 'hidden' : 'visible';
    guideTo(S.steps[i].dataset.guide, false); fitFlows(); updateBoard();
  }
  function updateBoard() {
    if (!S) return;
    var qs = qa('.q'), n = qs.filter(answered).length;
    q1('.sb-ans').textContent = n + '/' + qs.length; q1('.pbar i').style.width = (qs.length ? n / qs.length * 100 : 0) + '%';
    S.steps.forEach(function (s, i) {
      var sq = qa('.q', s), a = sq.filter(answered).length, d = S.dots[i];
      d.classList.toggle('cur', i === S.cur);
      if (S.submitted && s.dataset.max > 0) { var p = s.dataset.got / s.dataset.max; d.classList.remove('done', 'part'); d.classList.add(p >= .8 ? 's-good' : p >= .5 ? 's-mid' : 's-low'); }
      else { d.classList.toggle('done', sq.length > 0 && a === sq.length); d.classList.toggle('part', a > 0 && a < sq.length); }
      var li = q1('.review-list li[data-goto="' + i + '"] b'); if (li) li.textContent = sq.length ? a + ' of ' + sq.length + ' done' : '';
    });
  }

  /* ---------------- drag & drop (mouse, touch, tap, keyboard) ---------------- */
  function bodyOf(z) { return z.querySelector(':scope > .zone-body') || z; }
  function refreshZone(z) {
    if (z && z.classList.contains('zone')) {
      var c = bodyOf(z).querySelector(':scope > .chip'); z.classList.toggle('filled', !!c);
      if (z.classList.contains('fnode')) z.classList.toggle('dia', !!c && c.dataset.ans === 'd');
    }
  }
  function select(c) { if (S.selected) S.selected.classList.remove('selected'); S.selected = c; if (c) c.classList.add('selected'); }
  function place(chip, zone) {
    if (!zone || chip.closest('.q') !== zone.closest('.q')) return;
    var from = chip.parentElement, body = bodyOf(zone), cap = +zone.dataset.cap || 0;
    if (body === from) { select(null); return; }
    if (cap) { var ex = qa(':scope > .chip', body); if (ex.length >= cap) from.appendChild(ex[0]); }
    body.appendChild(chip); select(null);
    refreshZone(from.closest('.zone')); refreshZone(zone); updateBoard();
  }
  function zoneAt(x, y, chip) { var el = document.elementFromPoint(x, y); var z = el && el.closest('.zone'); return z && z.closest('.q') === chip.closest('.q') ? z : null; }
  function setHover(z) { if (S.hoverZ) S.hoverZ.classList.remove('hover'); S.hoverZ = z; if (z) z.classList.add('hover'); }
  function inWork(t) { return S && t && t.nodeType === 1 && S.work.contains(t); }
  function onPointerDown(e) {
    if (!S || S.submitted || e.button > 0 || !inWork(e.target)) return;
    var chip = e.target.closest('.chip'); if (!chip) return;
    e.preventDefault(); S.drag = { chip: chip, sx: e.clientX, sy: e.clientY, moved: false };
  }
  function onPointerMove(e) {
    if (!S || !S.drag) return; var drag = S.drag;
    if (!drag.moved) {
      if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 6) return;
      drag.moved = true; var r = drag.chip.getBoundingClientRect();
      var g = drag.chip.cloneNode(true); g.classList.add('ghost'); g.classList.remove('selected'); g.style.width = r.width + 'px'; g.style.height = r.height + 'px';
      S.work.appendChild(g); drag.ghost = g; drag.dx = drag.sx - r.left; drag.dy = drag.sy - r.top; drag.chip.classList.add('dragging'); select(null);
    }
    drag.ghost.style.left = (e.clientX - drag.dx) + 'px'; drag.ghost.style.top = (e.clientY - drag.dy) + 'px';
    setHover(zoneAt(e.clientX, e.clientY, drag.chip));
    var sr = S.stage.getBoundingClientRect();
    if (e.clientY > sr.top + 90 && e.clientY < sr.bottom - 90) drag.armed = true;
    if (drag.armed) { if (e.clientY < sr.top + 40) S.stage.scrollBy(0, -12); else if (e.clientY > sr.bottom - 40) S.stage.scrollBy(0, 12); }
  }
  function onPointerUp(e) {
    if (!S || !S.drag) return; var d = S.drag; S.drag = null;
    if (d.moved) { var z = zoneAt(e.clientX, e.clientY, d.chip); d.ghost.remove(); d.chip.classList.remove('dragging'); setHover(null); if (z) place(d.chip, z); }
    else select(S.selected === d.chip ? null : d.chip);
  }
  function onPointerCancel() { if (S && S.drag) { if (S.drag.ghost) S.drag.ghost.remove(); S.drag.chip.classList.remove('dragging'); setHover(null); S.drag = null; } }

  /* ---------------- clicks (delegated) ---------------- */
  var COLORS = ['#2F54C9', '#D2691E', '#1D7A46', '#8E3FC1', '#C0315A', '#0B7A83'];
  function onClick(e) {
    if (!S) return; var t = e.target;
    if (S.guide.contains(t)) { var tab = t.closest('.g-tab'); if (tab) guideTo(tab.dataset.card, true); return; }
    if (!S.work.contains(t)) return;
    var act = t.closest('[data-act]');
    if (act) {
      var a = act.dataset.act;
      if (a === 'prev') go(S.cur - 1); else if (a === 'next') go(S.cur + 1);
      else if (a === 'back') requestClose(); else if (a === 'submit') submit(); else if (a === 'pdf') downloadPDF();
      return;
    }
    var gr = t.closest('.gref'); if (gr) { guideTo(gr.dataset.g, true); return; }
    var rv = t.closest('[data-goto]'); if (rv) { go(+rv.dataset.goto); return; }
    if (S.submitted) return;
    var tile = t.closest('.tile');
    if (tile) { var q = tile.closest('.q'); qa('.tile', q).forEach(function (x) { x.classList.toggle('sel', x === tile); x.setAttribute('aria-pressed', x === tile); }); updateBoard(); return; }
    var mi = t.closest('.mitem'); if (mi) { onMatchClick(mi); return; }
    if (t.closest('.chip')) return;
    var z = t.closest('.zone'); if (z && S.selected) place(S.selected, z);
  }
  function onMatchClick(b) {
    var q = b.closest('.q'); var st = q._m = q._m || { active: null };
    function unpair(l) {
      var r = qa('.mright', q).filter(function (x) { return x.dataset.by === l.dataset.id; })[0];
      if (r) { delete r.dataset.by; r.classList.remove('paired'); var tg = r.querySelector('.tag'); tg.style.background = ''; tg.textContent = ''; }
      delete l.dataset.pair; l.classList.remove('paired');
    }
    if (b.classList.contains('mleft')) {
      if (b.dataset.pair) unpair(b);
      if (st.active) st.active.classList.remove('active');
      st.active = (st.active === b) ? null : b; if (st.active) st.active.classList.add('active'); updateBoard(); return;
    }
    if (!st.active) { toast('Tap an item in the first list, then tap its match.'); return; }
    if (b.dataset.by) { var prev = qa('.mleft', q).filter(function (l) { return l.dataset.id === b.dataset.by; })[0]; if (prev) unpair(prev); }
    st.active.dataset.pair = b.dataset.id; st.active.classList.add('paired'); b.dataset.by = st.active.dataset.id; b.classList.add('paired');
    var tg = b.querySelector('.tag'); tg.style.background = COLORS[+st.active.dataset.i]; tg.textContent = +st.active.dataset.i + 1;
    st.active.classList.remove('active'); st.active = null; updateBoard();
  }

  /* ---------------- copy / paste / shortcut locks (only while a worksheet is open) ---------------- */
  var BLOCK_PASTE = 'Pasting is turned off. Please type your answer.';
  function isTxt(el) { return el && el.closest && el.closest('.txt'); }
  function clearClip() { try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(' ').catch(function () {}); } catch (_) {} }
  function installLocks() {
    ['copy', 'cut', 'paste'].forEach(function (ev) { document.addEventListener(ev, function (e) { if (!S) return; e.preventDefault(); e.stopPropagation(); toast('Copy, cut and paste are turned off. Please type your answer.'); }, true); });
    document.addEventListener('contextmenu', function (e) { if (!S) return; e.preventDefault(); toast('Right-click is turned off for this classwork.'); }, true);
    document.addEventListener('selectstart', function (e) { if (S && !isTxt(e.target)) e.preventDefault(); }, true);
    document.addEventListener('dragstart', function (e) { if (S) e.preventDefault(); }, true);
    document.addEventListener('drop', function (e) { if (S && isTxt(e.target)) { e.preventDefault(); toast(BLOCK_PASTE); } }, true);
    document.addEventListener('beforeinput', function (e) { if (S && isTxt(e.target) && /insertFromPaste|insertFromDrop|insertFromYank/.test(e.inputType)) { e.preventDefault(); toast(BLOCK_PASTE); } }, true);
    document.addEventListener('keydown', function (e) {
      if (!S) return;
      var k = (e.key || '').toLowerCase(), mod = e.ctrlKey || e.metaKey;
      if (k === 'printscreen' || k === 'meta' || k === 'os') { clearClip(); e.preventDefault(); if (k === 'printscreen') toast('Screenshots are turned off for this classwork.'); return; }
      if (e.metaKey && e.shiftKey && k === 's') { clearClip(); e.preventDefault(); e.stopPropagation(); toast('Screenshots are turned off for this classwork.'); return; }
      var blocked = k === 'f12' || (mod && e.shiftKey && ['i', 'j', 'c', 's', 'k'].indexOf(k) > -1) || (mod && ['c', 'x', 'v', 'p', 's', 'u', 'a'].indexOf(k) > -1) || (e.shiftKey && k === 'insert') || (mod && k === 'insert');
      if (blocked) { if (mod && k === 'a' && isTxt(e.target)) return; e.preventDefault(); e.stopPropagation(); toast('This shortcut is turned off for this classwork.'); return; }
      if (!S.submitted && (k === 'enter' || k === ' ') && !isTxt(e.target) && inWork(e.target)) {
        var c = e.target.closest('.chip');
        if (c) { e.preventDefault(); select(S.selected === c ? null : c); return; }
        var z = e.target.closest('.zone'); if (z && S.selected) { e.preventDefault(); place(S.selected, z); }
      }
    }, true);
    document.addEventListener('keyup', function (e) { if (!S) return; var k = (e.key || '').toLowerCase(); if (k === 'printscreen' || k === 'meta' || k === 'os') { clearClip(); if (k === 'printscreen') toast('Screenshots are turned off for this classwork.'); } });
    window.addEventListener('blur', function () { if (S) clearClip(); });
    document.addEventListener('visibilitychange', function () { if (S && document.hidden) clearClip(); });
    window.addEventListener('beforeunload', function (e) { if (S && !S.submitted && hasProgress()) { e.preventDefault(); e.returnValue = ''; } });
    document.addEventListener('input', function (e) { if (S && inWork(e.target)) updateBoard(); });
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerCancel);
    document.addEventListener('click', onClick);
    window.addEventListener('resize', function () { if (S) fitFlows(); });
  }

  /* ---------------- marking & submit ---------------- */
  function accepts(z, c) { return z.dataset.ans.split('|').indexOf(c.dataset.ans) > -1; }
  function mark() {
    var got = 0, max = 0, teacher = 0, sections = [];
    S.steps.forEach(function (s) {
      var sg = 0, sm = 0;
      qa('.q', s).forEach(function (q) {
        var g = 0, m = 0, t = q.dataset.type;
        if (t === 'text') teacher++;
        else if (t === 'pick') { m = 1; var x = q.querySelector('.tile.sel'); var ok = x && x.dataset.v === q.dataset.answer; if (ok) g = 1; if (x) x.classList.add(ok ? 'right' : 'wrong'); }
        else if (t === 'dd') {
          qa('.chip', q).forEach(function (c) {
            var z = c.closest('.zone'); var inTray = !z || z.classList.contains('tray');
            if (c.dataset.distractor !== undefined) { if (!inTray) c.classList.add('wrong'); return; }
            m++; var ok = !inTray && accepts(z, c); c.classList.add(ok ? 'right' : 'wrong'); if (ok) g++;
          });
        }
        else if (t === 'match') { qa('.mleft', q).forEach(function (l) { m++; var ok = l.dataset.pair === l.dataset.id; if (ok) g++; l.classList.add(ok ? 'right' : 'wrong'); }); }
        else if (t === 'flow') {
          qa('.fnode', q).forEach(function (z) { m++; var c = z.querySelector('.chip'); var ok = c && accepts(z, c); if (ok) g++; if (c) c.classList.add(ok ? 'right' : 'wrong'); else z.classList.add('missing'); });
          teacher++;
        }
        sg += g; sm += m;
      });
      s.dataset.got = sg; s.dataset.max = sm; if (sm) sections.push([s.dataset.title, sg, sm]); got += sg; max += sm;
    });
    return { sections: sections, got: got, max: max, teacher: teacher };
  }
  function val(id) { var el = q1('[data-fid="' + id + '"]'); return el ? el.value.trim() : ''; }
  function submit() {
    if (S.submitted) return true;
    var miss = [];
    ['s-name', 's-sid', 's-grade'].forEach(function (id) {
      var el = q1('[data-fid="' + id + '"]'); if (!el) return; var bad = !el.value.trim(); el.closest('.field').classList.toggle('missing', bad); if (bad) miss.push(el);
    });
    if (miss.length) { go(0); setTimeout(function () { miss[0].focus(); }, 50); toast('Enter your name, SID and grade before submitting.'); return false; }
    var left = qa('.q').filter(function (q) { return !answered(q); }).length;
    if (left && !window.confirm('You have ' + left + ' unfinished question' + (left > 1 ? 's' : '') + '. Submit anyway?')) return false;
    S.submitted = true; S.work.classList.add('locked'); S.guide.classList.add('locked'); select(null);
    qa('input,textarea').forEach(function (el) { el.disabled = true; }); qa('.mitem,.tile').forEach(function (b) { b.disabled = true; });
    var r = mark(); S.lastResult = r; S.submittedAt = new Date().toLocaleString();
    q1('.sb-score').textContent = r.got + '/' + r.max; q1('.sb-score').parentElement.classList.add('hl');
    var h = '<h3>Submitted</h3><div>' + esc(val('s-name')) + ' | SID ' + esc(val('s-sid')) + ' | Grade ' + esc(val('s-grade')) + '</div><div style="color:var(--muted);font-size:.85rem">' + esc(S.submittedAt) + '</div>';
    h += '<table><tr><td><strong>Auto-marked score</strong></td><td>' + r.got + ' / ' + r.max + '</td></tr>' + r.sections.map(function (x) { return '<tr><td>' + esc(x[0]) + '</td><td>' + x[1] + ' / ' + x[2] + '</td></tr>'; }).join('') + '</table>';
    h += '<p style="margin:12px 0 0">Typed definitions and flowchart step names will be marked by your teacher. Press <strong>Download PDF</strong> and hand the file in.</p>';
    var res = q1('.result'); res.innerHTML = h; res.classList.add('show'); q1('[data-act=submit]').style.display = 'none';
    go(S.steps.length - 1); updateBoard(); return true;
  }

  /* ---------------- PDF ---------------- */
  function rowsFor(q) {
    var t = q.dataset.type, Q = q.dataset.q || '';
    if (t === 'text') { var v = q.querySelector('.txt').value.trim(); return { q: Q, rows: [{ a: v || '(no answer)', st: v ? 'typed' : 'blank' }] }; }
    if (t === 'pick') { var s = q.querySelector('.tile.sel'); return { q: Q, rows: [{ a: s ? T(s) : '(no answer)', st: s && s.dataset.v === q.dataset.answer ? 'right' : 'wrong' }] }; }
    if (t === 'dd') {
      var rows = [], slots = qa('.zone[data-cap]', q);
      if (slots.length) slots.forEach(function (z) { var c = z.querySelector('.chip'); rows.push({ l: z.dataset.label, a: c ? T(c) : '(empty)', st: c && c.dataset.distractor === undefined && accepts(z, c) ? 'right' : 'wrong' }); });
      else qa('.chip:not([data-distractor])', q).forEach(function (c) { var z = c.closest('.zone'); var tray = z.classList.contains('tray'); rows.push({ l: T(c), a: tray ? '(not placed)' : z.dataset.label, st: !tray && accepts(z, c) ? 'right' : 'wrong' }); });
      return { q: Q, rows: rows };
    }
    if (t === 'match') return { q: Q, rows: qa('.mleft', q).map(function (l) { var r = l.dataset.pair ? qa('.mright', q).filter(function (x) { return x.dataset.id === l.dataset.pair; })[0] : null; return { l: l.dataset.label, a: r ? r.dataset.label : '(not matched)', st: l.dataset.pair === l.dataset.id ? 'right' : 'wrong' }; }) };
    if (t === 'flow') {
      var out = [];
      qa('.fnode', q).forEach(function (z) {
        var c = z.querySelector('.chip'), v2 = z.querySelector('.fname').value.trim();
        out.push({ l: z.dataset.label + ' shape', a: c ? SHAPE_NAME[c.dataset.ans] || c.dataset.ans : '(no shape)', st: c && accepts(z, c) ? 'right' : 'wrong' });
        out.push({ l: z.dataset.label + ' name', a: v2 || '(no answer)', st: v2 ? 'typed' : 'blank' });
      });
      return { q: Q, rows: out };
    }
    return { q: Q, rows: [] };
  }
  function hexRgb(h) { h = h.trim().replace('#', ''); return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); }); }
  function downloadPDF() {
    if (!S.submitted && !submit()) return;
    var J = window.jspdf && window.jspdf.jsPDF;
    if (!J) { toast('The PDF tool needs an internet connection. Please connect and try again.'); return; }
    var lab = S.lab, doc = new J({ unit: 'mm', format: 'a4' }), W = 210, H = 297, M = 16, CW = W - 2 * M, BOT = H - 18, y = 0;
    var INK = [26, 34, 51], MUT = [91, 101, 121], GRN = [29, 122, 70], RED = [191, 58, 48], ACC = hexRgb((lab.accent && lab.accent.accent) || '#1F6FB2');
    function clean(s) { return String(s).replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/\u2192/g, '->').replace(/[^\x20-\x7E]/g, ''); }
    function font(sz, st, c) { doc.setFontSize(sz); doc.setFont('helvetica', st); doc.setTextColor(c[0], c[1], c[2]); }
    function need(h) { if (y + h > BOT) { doc.addPage(); y = 18; } }
    var title = lab.title;
    doc.setFillColor(INK[0], INK[1], INK[2]); doc.rect(0, 0, W, 38, 'F');
    font(9, 'normal', [174, 184, 204]); doc.text(clean(lab.meta), M, 12);
    font(22, 'bold', [255, 255, 255]); doc.text(clean(title), M, 24);
    font(11, 'normal', [227, 232, 242]); doc.text(clean(lab.topic), M, 32);
    y = 46; doc.setFillColor(241, 243, 247); doc.roundedRect(M, y, CW, 30, 3, 3, 'F');
    var cols = [['Name', val('s-name')], ['SID', val('s-sid')], ['Grade', val('s-grade')]], cx = [M + 5, M + CW * 0.55, M + CW * 0.78];
    cols.forEach(function (kv, i) { font(8, 'normal', MUT); doc.text(kv[0], cx[i], y + 7); font(11, 'bold', INK); doc.text(doc.splitTextToSize(clean(kv[1]), i ? CW * 0.2 : CW * 0.48)[0] || '', cx[i], y + 13); });
    font(8, 'normal', MUT); doc.text('Submitted', cx[0], y + 21); font(10, 'normal', INK); doc.text(clean(S.submittedAt), cx[0], y + 26.5);
    font(8, 'normal', MUT); doc.text('Auto-marked score', cx[1], y + 21); font(12, 'bold', ACC); doc.text(S.lastResult.got + ' / ' + S.lastResult.max, cx[1], y + 26.5);
    y += 36; var lx = M;
    function leg(c, txt) { doc.setFillColor(c[0], c[1], c[2]); doc.circle(lx + 1.5, y - 1.2, 1.5, 'F'); font(8.5, 'normal', MUT); doc.text(txt, lx + 5, y); lx += doc.getTextWidth(txt) + 12; }
    leg(GRN, 'Correct'); leg(RED, 'Incorrect'); leg(INK, 'Typed answer, marked by your teacher'); y += 8;
    var LW = 62;
    S.steps.forEach(function (s) {
      var qs = qa('.q', s); if (!qs.length) return;
      need(20); y += 3; font(13, 'bold', ACC); doc.text(clean(s.dataset.title), M, y); y += 2.5; doc.setDrawColor(ACC[0], ACC[1], ACC[2]); doc.setLineWidth(.4); doc.line(M, y, M + CW, y); y += 6;
      qs.forEach(function (q) {
        var r = rowsFor(q);
        font(10, 'bold', INK); var ql = doc.splitTextToSize(clean(r.q), CW); need(ql.length * 4.6 + 6); doc.text(ql, M, y); y += ql.length * 4.6 + 0.6;
        r.rows.forEach(function (row) {
          var col = row.st === 'right' ? GRN : row.st === 'wrong' ? RED : row.st === 'blank' ? MUT : INK, tag = row.st === 'right' ? 'Correct' : row.st === 'wrong' ? 'Incorrect' : '';
          var bold = row.st === 'right' || row.st === 'wrong', ax = row.l !== undefined ? M + 4 + LW : M + 4, aw = M + CW - ax - (tag ? 20 : 0);
          font(9.5, 'normal', INK); var ll = row.l !== undefined ? doc.splitTextToSize(clean(row.l), LW - 4) : [];
          font(9.5, bold ? 'bold' : 'normal', col); var al = doc.splitTextToSize(clean(row.l === undefined && bold ? 'Answer: ' + row.a : row.a), aw);
          var h = Math.max(ll.length, al.length) * 4.3; need(h + 1.5);
          if (tag) { doc.setFillColor(col[0], col[1], col[2]); doc.circle(M + 1.3, y - 1.2, 1.1, 'F'); }
          if (ll.length) { font(9.5, 'normal', MUT); doc.text(ll, M + 4, y); }
          font(9.5, bold ? 'bold' : 'normal', col); doc.text(al, ax, y);
          if (tag) { font(8, 'bold', col); doc.text(tag, M + CW, y, { align: 'right' }); }
          y += h + 1.2;
        });
        y += 3.5;
      });
    });
    var n = doc.getNumberOfPages();
    for (var i = 1; i <= n; i++) { doc.setPage(i); font(8, 'normal', MUT); doc.text(clean(title + '  |  ' + val('s-name') + '  |  SID ' + val('s-sid')), M, H - 9); doc.text('Page ' + i + ' of ' + n, W - M, H - 9, { align: 'right' }); }
    function safe(v) { return clean(v).replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, ''); }
    doc.save(safe(title) + '_' + (safe(val('s-name')) || 'Student') + '_' + safe(val('s-sid')) + '.pdf'); toast('PDF downloaded.');
  }

  /* ---------------- open / close ---------------- */
  var cssDone = false, locksDone = false;
  function injectCss() {
    if (cssDone) return; cssDone = true;
    var st = document.createElement('style'); st.id = 'ws-css'; st.textContent = CSS; document.head.appendChild(st);
  }
  function hasProgress() { return !!S && qa('.q').some(answered); }
  function open(id) {
    if (SIM() && SIM().has(id)) {                       /* a simulation lab */
      if (S && !requestClose()) return false;
      return SIM().open(id);
    }
    if (SIM() && SIM().isOpen()) SIM().close();
    var lab = LABS[id];
    if (!lab) { window.alert('No worksheet data for ' + id + ' was found in "' + JSON_PATH + '".'); return false; }
    if (S && !requestClose()) return false;
    injectCss(); if (!locksDone) { locksDone = true; installLocks(); }
    var page = document.querySelector(SEL.guidePage), grid = document.querySelector(SEL.grid), host = document.querySelector(SEL.host);
    if (!page || !grid || !host) { console.error('[Worksheets] host elements not found', SEL); return false; }
    var guide = document.createElement('div'); guide.className = 'ws ws-guide'; guide.setAttribute('style', accentStyle(lab.accent)); guide.innerHTML = buildGuide(lab);
    var work = document.createElement('div'); work.className = 'ws ws-work'; work.setAttribute('style', accentStyle(lab.accent)); work.innerHTML = buildWork(lab);
    grid.style.display = 'none'; page.insertBefore(guide, grid);
    host.innerHTML = ''; host.classList.add('ws-on'); host.appendChild(work);
    var foot = page.querySelector('.foot'), fs = foot ? foot.querySelectorAll('span') : [];
    var oldFoot = [fs[0] && fs[0].textContent, fs[1] && fs[1].textContent];
    if (fs[1]) fs[1].textContent = lab.guide.footer;
    S = {
      lab: lab, guide: guide, work: work, page: page, grid: grid, host: host, steps: [], dots: [], cur: 0, submitted: false, lastResult: null, submittedAt: '',
      drag: null, selected: null, hoverZ: null, stage: null, oldFoot: oldFoot, foot: fs,
      setFootLeft: function (t) { if (fs[0]) fs[0].textContent = t; }
    };
    S.stage = q1('.stage'); S.steps = qa('.step');
    qa('[data-shuffle]').forEach(shuffle);
    qa('.mleft').forEach(function (b, i) { var q = b.closest('.q'); var idx = qa('.mleft', q).indexOf(b); b.dataset.i = idx; var tg = b.querySelector('.tag'); tg.style.background = COLORS[idx % COLORS.length]; tg.textContent = idx + 1; });
    qa('.txt').forEach(function (el) { el.setAttribute('autocomplete', 'off'); el.setAttribute('spellcheck', 'false'); el.setAttribute('autocorrect', 'off'); el.setAttribute('autocapitalize', 'off'); });
    qa('.chip').forEach(function (c) { c.tabIndex = 0; c.setAttribute('role', 'button'); }); qa('.zone').forEach(function (z) { z.tabIndex = 0; });
    var dotsBox = q1('.dots');
    S.steps.forEach(function (s, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'dot'; b.textContent = i + 1; b.title = s.dataset.title; b.addEventListener('click', function () { go(i); }); dotsBox.appendChild(b); });
    S.dots = qa('.dot');
    go(0);
    return true;
  }
  function teardown() {
    if (!S) return;
    var s = S; S = null;
    qa('.ghost', s.work).forEach(function (g) { g.remove(); });
    s.guide.remove(); s.work.remove();
    s.grid.style.display = ''; s.host.classList.remove('ws-on'); s.host.innerHTML = '';
    if (s.foot[0] && s.oldFoot[0] != null) s.foot[0].textContent = s.oldFoot[0];
    if (s.foot[1] && s.oldFoot[1] != null) s.foot[1].textContent = s.oldFoot[1];
  }
  function requestClose() {
    if (SIM() && SIM().isOpen()) SIM().close();
    if (!S) return true;
    if (!S.submitted && hasProgress() && !window.confirm('Leave this worksheet? Your answers on ' + S.lab.title + ' will be lost.')) return false;
    teardown(); return true;
  }

  window.G11Worksheets = {
    load: load, labsForWeek: labsForWeek, open: open, close: requestClose,
    isOpen: function () { return !!S || !!(SIM() && SIM().isOpen()); },
    currentId: function () { return S ? S.lab.id : (SIM() && SIM().currentId()) || null; },
    _labs: LABS
  };
})();

/* =====================================================================
   SIMULATION LABS  (click / type / drag simulations, opened like a worksheet)
   ---------------------------------------------------------------------
   HOW TO ADD A NEW SIMULATION LAB (e.g. for WEEK 12):
     1. Add each activity to PARTS with  PARTS.<name> = { ... }   (copy an existing part as a template:
        lesson, title, short, q, key, steps[], mount(body, api) -> { guide(k), cleanup() }).
     2. Add a lab to SIM_LABS:  { id:'G11-SIM-W12-1', week:12, title:'...', topic:'...', parts:['<name>', ...] }
        "week" is the number printed on the week card. The button appears on that card automatically.
   The api given to mount():  award(points) · result(kind, html) · mistake(html) · done(stepIndex) · isDone(stepIndex) · refresh()
   ===================================================================== */
(function () {
'use strict';
if (window.G11SimEngine) return;

/* ------------------------------------------------------------------ styles ------------------------------------------------------------------ */
const CSS = `
.sl-root{--sl-ink:#1E293B;--sl-muted:#64748B;--sl-line:#E2E8F0;--sl-soft:#F8FAFC;--sl-blue:#2563EB;--sl-blue-l:#EFF6FF;--sl-org:#EA580C;--sl-org-l:#FFF7ED;
  --sl-good:#15803D;--sl-good-l:#F0FDF4;--sl-bad:#B91C1C;--sl-bad-l:#FEF2F2;--sl-mono:'IBM Plex Mono','JetBrains Mono',ui-monospace,Consolas,monospace;
  flex:1;min-height:0;min-width:0;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;font:14px/1.45 'Lexend',system-ui,-apple-system,'Segoe UI',sans-serif;color:var(--sl-ink);background:#fff;
  -webkit-user-select:none;user-select:none}
.sl-root *{box-sizing:border-box}
.work-host.sl-host{padding:0}
.sl-root input{-webkit-user-select:text;user-select:text}
.sl-root button{font-family:inherit}
.sl-root .sl-mono{font-family:var(--sl-mono)}

/* left page */
.sl-top{flex:none;display:flex;align-items:center;gap:10px;padding:5px 40px 5px 22px;border-bottom:1px solid var(--sl-line)}
.sl-home{flex:none;border:1px solid #8B0000;background:#8B0000;color:#fff;border-radius:7px;padding:5px 10px;font-weight:600;font-size:11.5px;cursor:pointer}
.sl-home:hover{background:#A50000;border-color:#A50000}
.sl-ttl{flex:1;min-width:0;display:flex;align-items:baseline;gap:8px;white-space:nowrap;overflow:hidden}
.sl-ttl small{flex:none;font-size:10.5px;font-weight:700;letter-spacing:.08em;color:var(--sl-blue)}
.sl-ttl b{font-size:13px;overflow:hidden;text-overflow:ellipsis}
.sl-score{flex:none;font-size:11.5px;color:var(--sl-muted)}
.sl-score b{font-size:14px;color:var(--sl-org)}
.sl-tabs{flex:none;display:flex;gap:6px;padding:6px 40px 0 22px}
.sl-tab{flex:1;min-width:0;text-align:left;border:1px solid var(--sl-line);background:#fff;border-radius:7px;padding:3px 8px;cursor:pointer;color:var(--sl-ink)}
.sl-tab small{display:block;font-size:9.5px;font-weight:700;letter-spacing:.08em;color:var(--sl-muted)}
.sl-tab span{display:block;font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sl-tab.on{border-color:var(--sl-blue);background:var(--sl-blue-l)}
.sl-tab.on small{color:var(--sl-blue)}
.sl-tab.done small::after{content:'  ✓ done';color:var(--sl-good)}
.sl-lscroll{flex:1;min-height:0;overflow:auto;padding:8px 40px 10px 22px;display:flex;flex-direction:column;gap:10px}
.sl-instr{font-size:12px;font-weight:800;letter-spacing:.14em;color:var(--sl-ink);border-bottom:2px solid var(--sl-blue);padding-bottom:4px;margin-bottom:-2px}
.sl-card{border:1px solid var(--sl-line);border-radius:10px;padding:9px 12px;background:#fff}
.sl-card h3{margin:0 0 8px;font-size:11px;letter-spacing:.12em;color:var(--sl-muted);font-weight:700}
.sl-key{font-size:13px;line-height:1.55}
.sl-key b{color:var(--sl-blue)}
.sl-steps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
.sl-steps li{display:flex;gap:9px;align-items:flex-start;font-size:13px;line-height:1.35;padding:7px 9px;border-radius:8px;border:1px solid var(--sl-line);background:#fff}
.sl-steps li i{flex:none;width:18px;height:18px;border-radius:5px;border:1.5px solid #CBD5E1;display:grid;place-items:center;font-style:normal;font-size:11px;color:#fff;margin-top:1px}
.sl-steps li.ok{background:var(--sl-good-l);border-color:#BBF7D0}
.sl-steps li.ok i{background:var(--sl-good);border-color:var(--sl-good)}
.sl-steps li.now{border-color:var(--sl-blue);background:var(--sl-blue-l)}
.sl-stars{display:flex;gap:3px;margin-top:8px;font-size:16px}
.sl-stars span{opacity:.25;filter:grayscale(1)}
.sl-stars span.on{opacity:1;filter:none}
.sl-do{border:1px solid #BFDBFE;background:var(--sl-blue-l);border-radius:10px;padding:10px 12px}
.sl-do small{display:block;font-size:10.5px;font-weight:700;letter-spacing:.1em;color:var(--sl-blue);margin-bottom:4px}
.sl-do div{font-size:13.5px;line-height:1.55}
.sl-do b{color:var(--sl-ink)}
.sl-do kbd,.sl-root kbd{font-family:var(--sl-mono);font-size:12.5px;font-weight:700;background:#fff;border:1px solid #CBD5E1;border-radius:5px;padding:0 5px}
.sl-do ul{margin:6px 0 0;padding-left:18px}
.sl-do li{margin:2px 0}
.sl-do.fin{border-color:#BBF7D0;background:var(--sl-good-l)}
.sl-do.fin small{color:var(--sl-good)}
.sl-lnav{flex:none;display:flex;align-items:center;gap:8px;padding:6px 40px 6px 22px;border-top:1px solid var(--sl-line)}
.sl-lnav span{flex:1;text-align:center;font-size:12px;color:var(--sl-muted)}
.sl-btn{border:1px solid var(--sl-blue);background:var(--sl-blue);color:#fff;border-radius:8px;padding:8px 14px;font-weight:600;font-size:13px;cursor:pointer}
.sl-btn:hover{background:#1D4ED8}
.sl-btn.ghost{background:#fff;color:var(--sl-blue)}
.sl-btn.ghost:hover{background:var(--sl-blue-l)}
.sl-btn.org{background:var(--sl-org);border-color:var(--sl-org)}
.sl-btn.org:hover{background:#C2410C}
.sl-btn.gry{background:#fff;color:var(--sl-ink);border-color:#CBD5E1}
.sl-btn.gry:hover{background:var(--sl-soft)}
.sl-btn:disabled{opacity:.45;cursor:not-allowed}
.sl-btn.pulse{outline:3px solid #BFDBFE}

/* right page */
.sl-rhead{flex:none;display:flex;align-items:center;gap:10px;padding:6px 22px 6px 40px;border-bottom:1px solid var(--sl-line)}
.sl-chip{flex:none;font-size:10.5px;font-weight:700;letter-spacing:.08em;padding:4px 9px;border-radius:999px;background:var(--sl-blue-l);color:var(--sl-blue);border:1px solid #BFDBFE}
.sl-chip.l4{background:var(--sl-org-l);color:var(--sl-org);border-color:#FED7AA}
.sl-rhead h2{margin:0;font-size:15px;line-height:1.25}
.sl-rhead p{margin:1px 0 0;font-size:12px;color:var(--sl-muted)}
.sl-result{flex:none;margin:8px 22px 0 40px;border:1px solid var(--sl-line);border-left:4px solid #94A3B8;border-radius:8px;padding:6px 10px;background:var(--sl-soft);max-height:96px;overflow:auto}
.sl-result small{display:block;font-size:10px;font-weight:800;letter-spacing:.12em;color:var(--sl-muted)}
.sl-rbody{font-size:12.5px;line-height:1.45}
.sl-result.good{background:var(--sl-good-l);border-color:#BBF7D0;border-left-color:var(--sl-good)}
.sl-result.good small{color:var(--sl-good)}
.sl-result.bad{background:var(--sl-bad-l);border-color:#FECACA;border-left-color:var(--sl-bad)}
.sl-result.bad small{color:var(--sl-bad)}
.sl-stage{flex:1;min-height:0;min-width:0;overflow:auto;padding:10px 22px 14px 40px;background:#fff}
.sl-lbl{font-size:10.5px;letter-spacing:.12em;font-weight:700;color:var(--sl-muted);margin-bottom:6px}
.sl-field{width:100%;border:1px solid #CBD5E1;border-radius:8px;padding:8px 10px;font:600 14px 'Lexend',sans-serif;color:var(--sl-ink);background:#fff;outline:none}
.sl-field:focus{border-color:var(--sl-blue);box-shadow:0 0 0 3px #DBEAFE}
.sl-field.err{border-color:var(--sl-bad);background:var(--sl-bad-l)}
.sl-field.okf{border-color:var(--sl-good)}
.sl-msg{font-size:12.5px;min-height:1.2em;margin-top:5px;font-weight:600}
.sl-msg.bad{color:var(--sl-bad)}.sl-msg.good{color:var(--sl-good)}
.sl-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.sl-shake{animation:sl-shake .4s}
@keyframes sl-shake{20%{transform:translateX(-6px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(2px)}}
.sl-pop{animation:sl-pop .4s}
@keyframes sl-pop{40%{transform:scale(1.06)}}
.sl-ghost{position:fixed;z-index:99999;pointer-events:none;opacity:.95;transform:rotate(-3deg)}
.sl-lifting{opacity:.3}
.sl-hl{outline:3px solid #F59E0B !important;outline-offset:2px}
.sl-packet{position:fixed;left:0;top:0;z-index:99998;pointer-events:none;width:40px;height:30px;border-radius:7px;display:grid;place-items:center;font-size:16px;background:#FEF3C7;border:1.5px solid #F59E0B}

/* part 1 */
.sl-belt{border:1px solid var(--sl-line);background:var(--sl-soft);border-radius:12px;padding:10px}
.sl-tokens{display:flex;flex-wrap:wrap;gap:8px;min-height:40px}
.sl-token{cursor:grab;touch-action:none;padding:7px 11px;border-radius:8px;font:700 14px var(--sl-mono);background:#fff;border:1px solid #94A3B8;color:var(--sl-ink)}
.sl-token:hover{border-color:var(--sl-blue);background:var(--sl-blue-l)}
.sl-token.gone{opacity:0;transform:scale(.6);transition:.25s}
.sl-crates{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:14px}
.sl-crate{border:2px solid hsl(var(--c),55%,72%);background:hsl(var(--c),70%,97%);border-radius:12px;padding:8px 10px;min-height:120px;display:flex;flex-direction:column;gap:6px;transition:transform .15s}
.sl-crate .h{display:flex;align-items:center;gap:8px}
.sl-crate .h span{font-size:20px}
.sl-crate .h b{display:block;font-size:14px;color:hsl(var(--c),60%,28%)}
.sl-crate .h small{display:block;font:500 11px var(--sl-mono);color:var(--sl-muted)}
.sl-crate .h em{margin-left:auto;font-style:normal;font-weight:700;font-size:13px;min-width:24px;height:24px;border-radius:6px;display:grid;place-items:center;background:#fff;border:1px solid hsl(var(--c),55%,72%)}
.sl-crate .in{flex:1;border:1.5px dashed hsl(var(--c),55%,78%);border-radius:8px;background:#fff;display:flex;flex-wrap:wrap;gap:4px;align-content:flex-start;padding:5px}
.sl-crate .in span{font:700 11px var(--sl-mono);border:1px solid var(--sl-line);border-radius:5px;padding:1px 5px;background:var(--sl-soft)}
.sl-crate.over{transform:translateY(-3px);border-color:#F59E0B}
.sl-crate.bad{border-color:var(--sl-bad);background:var(--sl-bad-l)}

/* part 2 */
.sl-p2top{display:grid;grid-template-columns:130px 1fr;gap:10px}
.sl-target{border:2px solid #FDBA74;background:var(--sl-org-l);border-radius:12px;text-align:center;padding:8px}
.sl-target small{display:block;font-size:10.5px;font-weight:700;letter-spacing:.12em;color:var(--sl-org)}
.sl-target b{display:block;font:700 34px/1.1 var(--sl-mono);color:#9A3412}
.sl-target em{display:block;font-style:normal;font-size:11px;color:#9A3412}
.sl-readout{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.sl-readout div{border:1px solid var(--sl-line);background:var(--sl-soft);border-radius:10px;padding:7px 10px}
.sl-readout small{display:block;font-size:10px;letter-spacing:.12em;font-weight:700;color:var(--sl-muted)}
.sl-readout b{display:block;font:700 20px var(--sl-mono);color:var(--sl-ink);word-break:break-all}
.sl-board{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:6px;margin-top:12px;border:1px solid var(--sl-line);border-radius:12px;padding:12px 8px;background:#fff}
.sl-bit{display:flex;flex-direction:column;align-items:center;gap:6px}
.sl-pv{font:700 13px var(--sl-mono);color:var(--sl-muted)}
.sl-bulb{width:min(42px,90%);aspect-ratio:1;border-radius:50%;background:#F1F5F9;border:2px solid #CBD5E1;transition:.2s}
.sl-bit.on .sl-bulb{background:#FDE047;border-color:#EAB308}
.sl-sw{width:min(38px,90%);height:56px;border:1.5px solid #94A3B8;border-radius:9px;background:#F8FAFC;cursor:pointer;position:relative;padding:0}
.sl-sw span{position:absolute;left:4px;right:4px;top:4px;height:22px;border-radius:6px;background:#CBD5E1;transition:top .15s}
.sl-bit.on .sl-sw{border-color:var(--sl-good);background:var(--sl-good-l)}
.sl-bit.on .sl-sw span{top:26px;background:var(--sl-good)}
.sl-bv{font:700 18px var(--sl-mono);color:#94A3B8}
.sl-bit.on .sl-bv{color:var(--sl-good)}
.sl-enter{margin-top:12px;border:1px solid var(--sl-line);border-radius:12px;padding:10px 12px}
.sl-enter label{display:block;font-weight:600;font-size:13px;margin-bottom:6px}
.sl-enter .sl-field{max-width:160px}

/* part 3 */
.sl-screen{border:1px solid var(--sl-line);border-radius:12px;padding:10px 12px;background:var(--sl-soft)}
.sl-screen label{display:block;font-size:12.5px;color:var(--sl-muted);margin-bottom:6px}
.sl-screen .sl-field{font:700 20px var(--sl-mono);letter-spacing:.05em}
.sl-uni{display:flex;gap:6px;align-items:center;margin-top:8px;font-size:12px;color:var(--sl-muted);flex-wrap:wrap}
.sl-uni button{border:1px solid #CBD5E1;border-radius:7px;padding:3px 10px;font-size:15px;cursor:pointer;background:#fff;color:var(--sl-ink)}
.sl-uni button:hover{border-color:var(--sl-blue)}
.sl-ram{margin-top:12px;border:1.5px solid #86EFAC;border-radius:12px;padding:10px;background:var(--sl-good-l)}
.sl-ram .sl-lbl{color:var(--sl-good)}
.sl-cells{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;min-height:46px}
.sl-cell{border:1px solid #BBF7D0;border-radius:8px;padding:5px 8px;background:#fff;display:grid;grid-template-columns:34px 1fr;gap:0 8px;align-items:center}
.sl-cell .ch{grid-row:span 2;font:800 20px var(--sl-mono);text-align:center;color:var(--sl-ink)}
.sl-cell .d{font:600 11.5px var(--sl-mono);color:var(--sl-blue)}
.sl-cell .b{font:700 12px var(--sl-mono);color:var(--sl-good);letter-spacing:.04em}
.sl-cell.uc{border-color:#FDBA74}
.sl-cell.uc .d{color:var(--sl-org)}
.sl-empty{grid-column:1/-1;font-size:12.5px;color:var(--sl-good);text-align:center;padding:12px 0}
.sl-decode{margin-top:12px;border:1px solid var(--sl-line);border-radius:12px;padding:10px 12px}
.sl-decode h4{margin:0 0 8px;font-size:13.5px}
.sl-bytes{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:22px}
.sl-byte{font:700 13px var(--sl-mono);padding:6px 8px;border-radius:7px;border:1px solid #CBD5E1;background:var(--sl-soft);position:relative}
.sl-byte.ok{border-color:var(--sl-good);background:var(--sl-good-l);color:var(--sl-good)}
.sl-byte.cur{border-color:var(--sl-org);background:var(--sl-org-l)}
.sl-byte em{position:absolute;left:50%;bottom:-20px;transform:translateX(-50%);font:800 14px var(--sl-mono);color:var(--sl-good);font-style:normal}
.sl-kb{display:grid;grid-template-columns:repeat(13,minmax(0,1fr));gap:4px}
.sl-key3{border:1px solid #CBD5E1;border-radius:6px;padding:5px 0;font:700 13px var(--sl-mono);cursor:pointer;color:var(--sl-ink);background:#fff}
.sl-key3:hover{border-color:var(--sl-blue);background:var(--sl-blue-l)}
.sl-key3 small{display:block;font-size:9.5px;color:var(--sl-muted);font-weight:600}
.sl-key3.wrong{background:var(--sl-bad-l);border-color:var(--sl-bad)}

/* part 4 */
.sl-p4{display:grid;grid-template-columns:minmax(180px,250px) minmax(0,1fr);gap:14px;align-items:start}
.sl-canvas{display:grid;grid-template-columns:repeat(8,1fr);gap:2px;background:#CBD5E1;border:1px solid #94A3B8;border-radius:6px;padding:2px;touch-action:none;cursor:crosshair}
.sl-px{aspect-ratio:1;border-radius:2px}
.sl-seg{display:flex;gap:6px;flex-wrap:wrap}
.sl-seg button{border:1px solid #CBD5E1;border-radius:8px;padding:6px 10px;font-weight:600;font-size:12.5px;cursor:pointer;background:#fff;color:var(--sl-ink)}
.sl-seg button.on{background:var(--sl-blue);border-color:var(--sl-blue);color:#fff}
.sl-pal{display:flex;gap:6px;flex-wrap:wrap}
.sl-sw4{border:1px solid #CBD5E1;cursor:pointer;width:52px;border-radius:8px;padding:5px 0 3px;background:#fff;display:flex;flex-direction:column;align-items:center;gap:3px}
.sl-sw4 i{width:30px;height:20px;border-radius:5px;border:1px solid #94A3B8}
.sl-sw4 span{font:700 11px var(--sl-mono)}
.sl-sw4.on{border:2px solid var(--sl-org);background:var(--sl-org-l)}
.sl-memv{margin:0;border:1px solid var(--sl-line);border-radius:8px;padding:8px 10px;background:var(--sl-soft);color:var(--sl-ink);font:600 11.5px/1.5 var(--sl-mono);overflow:auto;white-space:pre}
.sl-size{margin-top:8px;border:1px solid #FED7AA;background:var(--sl-org-l);border-radius:8px;padding:7px 10px;font-size:12.5px}
.sl-size b{font-family:var(--sl-mono)}
.sl-calc{margin-top:12px;border:1px solid var(--sl-line);border-radius:12px;padding:10px 12px}
.sl-calc label{display:block;font-size:13px;margin-bottom:6px}
.sl-calc .sl-field{max-width:130px}

/* part 5 */
.sl-form{border:1px solid var(--sl-line);border-radius:12px;padding:12px;background:var(--sl-soft)}
.sl-form h3{margin:0 0 8px;font-size:14px}
.sl-fgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 12px}
.sl-frow label{display:flex;justify-content:space-between;align-items:center;gap:6px;font-size:12px;font-weight:600;margin-bottom:3px}
.sl-tags{display:flex;gap:3px;flex-wrap:wrap;justify-content:flex-end}
.sl-tag{font-size:9.5px;font-weight:700;padding:1px 5px;border-radius:999px;background:#E0E7FF;color:#3730A3}
.sl-frow .sl-field{padding:6px 8px;font-size:13px}
.sl-ferr{font-size:11px;color:var(--sl-bad);font-weight:600;min-height:15px;margin-top:2px}
.sl-lamps{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;margin-top:12px}
.sl-lamp{border:1px solid var(--sl-line);border-radius:9px;padding:6px 4px;text-align:center;background:#fff}
.sl-lamp i{display:block;width:14px;height:14px;margin:0 auto 4px;border-radius:50%;background:#E2E8F0;border:1px solid #CBD5E1}
.sl-lamp b{display:block;font-size:11.5px}
.sl-lamp small{display:block;font-size:9.5px;color:var(--sl-muted);line-height:1.2}
.sl-lamp.pass i{background:#22C55E;border-color:#15803D}
.sl-lamp.fail{background:var(--sl-bad-l);border-color:#FECACA}
.sl-lamp.fail i{background:#EF4444;border-color:#B91C1C}
.sl-lamp.seen b::after{content:' ✓';color:var(--sl-org)}
.sl-dbwrap{margin-top:12px;display:flex;gap:12px;align-items:flex-start}
.sl-cyl{flex:none;width:70px;text-align:center}
.sl-cyl svg{display:block;width:70px;height:84px}
.sl-cyl small{font-size:10px;font-weight:700;letter-spacing:.08em;color:var(--sl-blue)}
.sl-dbt{flex:1;border-collapse:collapse;font-size:11.5px;border:1px solid var(--sl-line)}
.sl-dbt th{background:var(--sl-blue-l);color:#1E3A8A;text-align:left;padding:5px 6px;font-weight:600;border-bottom:1px solid var(--sl-line)}
.sl-dbt td{padding:4px 6px;border-top:1px solid var(--sl-line);font-family:var(--sl-mono)}
.sl-dbt tr.new td{background:var(--sl-good-l)}

/* part 6 */
.sl-factory{position:relative;height:118px;border:1px solid var(--sl-line);border-radius:12px;overflow:hidden;background:var(--sl-soft)}
.sl-beltbar{position:absolute;left:0;right:0;bottom:14px;height:40px;background:repeating-linear-gradient(90deg,#CBD5E1 0 18px,#E2E8F0 18px 36px);border-top:2px solid #94A3B8;border-bottom:2px solid #94A3B8;animation:sl-belt 1.2s linear infinite}
@keyframes sl-belt{to{background-position:36px 0}}
.sl-lane{position:absolute;left:0;right:0;top:8px;bottom:26px}
.sl-pk{position:absolute;bottom:0;width:158px;cursor:grab;touch-action:none;border-radius:9px;padding:6px 9px;background:#FFFBEB;border:1.5px solid #F59E0B}
.sl-pk small{display:block;font-size:9.5px;font-weight:700;letter-spacing:.06em;color:#92400E}
.sl-pk b{display:block;font:700 12px var(--sl-mono);color:var(--sl-ink);word-break:break-word}
.sl-machines{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:12px}
.sl-mc{position:relative;border:2px solid hsl(var(--c),55%,72%);background:hsl(var(--c),70%,97%);border-radius:10px;padding:8px 6px;text-align:center;transition:transform .15s}
.sl-mc .ic{font-size:20px;line-height:1}
.sl-mc b{display:block;font-size:12.5px;color:hsl(var(--c),60%,26%)}
.sl-mc small{display:block;font-size:10px;color:var(--sl-muted)}
.sl-mc .n{position:absolute;right:5px;top:5px;font:700 11px var(--sl-mono);color:hsl(var(--c),60%,30%)}
.sl-mc.over{transform:translateY(-3px);border-color:#F59E0B}
.sl-mc.go{border-color:var(--sl-good);background:var(--sl-good-l)}
.sl-mc.no{border-color:var(--sl-bad);background:var(--sl-bad-l)}

/* shorter screens: tighter spacing so both pages fit without scrolling */
@media (max-height:800px){
  .sl-lscroll{gap:7px;padding-top:6px}
  .sl-card{padding:7px 10px}
  .sl-card h3{margin-bottom:5px}
  .sl-steps{gap:4px}
  .sl-steps li{padding:4px 8px;font-size:12px}
  .sl-key{font-size:12px;line-height:1.45}
  .sl-do{padding:7px 10px}
  .sl-do div{font-size:12.5px;line-height:1.45}
  .sl-stars{margin-top:5px;font-size:14px}
  .sl-result{margin-top:6px;max-height:64px;padding:4px 10px}
  .sl-stage{padding-top:6px;padding-bottom:8px}
  .sl-p4{grid-template-columns:minmax(150px,200px) minmax(0,1fr)}
  .sl-calc,.sl-decode,.sl-enter{margin-top:8px;padding:7px 10px}
  .sl-form{padding:8px 10px}
  .sl-frow .sl-field{padding:4px 8px}
  .sl-ferr{min-height:13px}
  .sl-lamps,.sl-dbwrap,.sl-machines{margin-top:8px}
  .sl-crates{margin-top:8px}
  .sl-crate{min-height:100px}
  .sl-board{margin-top:8px;padding:8px}
  .sl-sw{height:48px}.sl-sw span{height:18px}.sl-bit.on .sl-sw span{top:24px}
}
/* results */
.sl-res{max-width:520px;margin:10px auto;text-align:center}
.sl-res .big{font-size:40px}
.sl-res h2{margin:4px 0}
.sl-res table{width:100%;border-collapse:collapse;margin:12px 0;font-size:13px}
.sl-res td{padding:7px;border-top:1px solid var(--sl-line);text-align:left}
.sl-res td:last-child{text-align:right}

/* ===== layout v3: one-line headers, footer nav, intro screen, no scroll bars ===== */
.sl-top,.sl-rhead{height:46px;padding-top:0;padding-bottom:0;background:linear-gradient(90deg,#EEF4FF 0%,#F4FBF6 100%)}
.sl-top{gap:10px;padding-left:16px}
.sl-tabs{display:flex;gap:0;padding:0;flex:none}
.sl-tab{flex:none;width:auto;text-align:center;border:1px solid #A7D7B5;border-left-width:0;background:#DCFCE7;border-radius:0;padding:5px 10px;font-size:12.5px;font-weight:700;color:#14532D;white-space:nowrap}
.sl-tab:first-child{border-left-width:1px;border-radius:6px 0 0 6px}
.sl-tab:last-child{border-radius:0 6px 6px 0}
.sl-tab:hover{background:#BBF7D0}
.sl-tab.on{background:#15803D;border-color:#15803D;color:#fff}
.sl-tab.done:not(.on)::after{content:' ✓';color:#15803D}
.sl-ttl{font-size:14px}
.sl-ttl small{font-size:11px}
.sl-ttl b{font-size:14px}
.sl-score{font-size:13px}
.sl-score b{font-size:16px}
.sl-lbody{flex:1;min-height:0;overflow:hidden;padding:.6em 40px .5em 22px;display:flex;flex-direction:column;gap:.6em;font-size:17px}
.sl-lbody .sl-instr{font-size:.72em}
.sl-lbody .sl-do small,.sl-lbody .sl-card h3{font-size:.66em}
.sl-lbody .sl-do div{font-size:.95em;line-height:1.5}
.sl-lbody .sl-do kbd{font-size:.9em}
.sl-lbody .sl-card{padding:.5em .7em}
.sl-lbody .sl-do{padding:.55em .75em}
.sl-lbody .sl-steps{gap:.3em}
.sl-lbody .sl-steps li{font-size:.86em;padding:.35em .6em}
.sl-lbody .sl-key{font-size:.9em;line-height:1.5}
.sl-lbody .sl-stars{font-size:1em;margin-top:.4em}
.sl-intro h1{margin:.1em 0 .25em;font-size:1.45em;line-height:1.2;color:var(--sl-ink)}
.sl-intro p{margin:0 0 .5em;line-height:1.5}
.sl-intro h4{margin:.55em 0 .25em;font-size:.78em;letter-spacing:.1em;text-transform:uppercase;color:var(--sl-blue)}
.sl-intro ul,.sl-intro ol{margin:0;padding-left:1.3em;line-height:1.45}
.sl-intro li{margin:.15em 0}
.sl-plist li span{display:block;color:var(--sl-muted);font-size:.88em}
.sl-lnav{height:42px;margin-bottom:2px;padding:0 40px 0 16px;gap:6px}
.sl-lnav .sl-btn,.sl-lnav .sl-home{padding:5px 11px;font-size:12.5px;border-radius:7px}
.sl-lnav span{font-size:12px}
.sl-pdf{opacity:.6}
.sl-pdf.ready{opacity:1;background:#15803D;border-color:#15803D;color:#fff}
.sl-rhead{gap:10px;padding-left:40px;padding-right:16px}
.sl-rt{flex:1 1 52%;min-width:0}
.sl-rt h2{font-size:14.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sl-rt p{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sl-rhead .sl-result{flex:1 1 50%;min-width:0;margin:0;height:38px;max-height:38px;overflow:hidden;padding:0 8px 0 6px;border-left-width:4px;display:flex;flex-direction:row;align-items:center;gap:7px}
.sl-rhead .sl-result small{flex:none;font-size:8.5px;line-height:1;writing-mode:vertical-rl;transform:rotate(180deg);letter-spacing:.1em}
.sl-rhead .sl-rbody{flex:1;min-width:0;font-size:12px;line-height:1.25;max-height:2.5em;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.sl-stage{overflow:hidden;padding:10px 22px 8px 40px}
.sl-fit{transform-origin:top left;width:100%}
.sl-start{max-width:460px;margin:24px auto 0;display:flex;flex-direction:column;gap:14px}
.sl-start h3{margin:0;font-size:20px}
.sl-start>p{margin:-8px 0 4px;color:var(--sl-muted)}
.sl-start label{display:flex;flex-direction:column;gap:5px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--sl-muted);flex:1;min-width:0}
.sl-srow{display:flex;gap:12px}
.sl-dark{width:100%;background:#000;color:#fff;border:1px solid #000;border-radius:8px;padding:10px 12px;font:600 15px 'Lexend',system-ui,sans-serif;outline:none;-webkit-user-select:text;user-select:text}
.sl-dark::placeholder{color:#8A93A6}
.sl-dark:focus{border-color:var(--sl-blue);box-shadow:0 0 0 3px #BFDBFE}
.sl-dark.err{border-color:var(--sl-bad);box-shadow:0 0 0 3px #FECACA}
select.sl-dark option{background:#000;color:#fff}
.sl-go{align-self:flex-start;padding:10px 22px;font-size:15px}
.sl-note{margin:0;font-size:12px;color:var(--sl-muted)}
/* ===== v4: bigger text, dark red instructions, dark red result box ===== */
.sl-lbody .sl-instr{font-size:.78em;font-weight:800;color:#8B0000;border-bottom-color:#8B0000}
.sl-lbody .sl-do{border-color:#F3C4C4;background:#FFF5F5}
.sl-lbody .sl-do small{color:#8B0000;font-weight:800;font-size:.68em}
.sl-lbody .sl-do .sl-dob{font-size:1em;font-weight:700;color:#8B0000;line-height:1.45}
.sl-lbody .sl-do .sl-dob b{color:#5C0000}
.sl-lbody .sl-do.fin{border-color:#BBF7D0;background:var(--sl-good-l)}
.sl-lbody .sl-do.fin small{color:var(--sl-good)}
.sl-lbody .sl-card h3{font-size:.68em}
.sl-lbody .sl-steps li{font-size:.92em}
.sl-lbody .sl-key{font-size:.92em}
.sl-lbody .sl-steps li i{width:1.1em;height:1.1em;font-size:.75em}
.sl-intro h1{font-size:1.4em}
.sl-rhead .sl-result,.sl-rhead .sl-result.good,.sl-rhead .sl-result.bad{background:#8B0000;border-color:#8B0000;border-left-color:#5C0000;color:#fff}
.sl-rhead .sl-result small,.sl-rhead .sl-result.good small,.sl-rhead .sl-result.bad small{color:#FECACA}
.sl-rhead .sl-rbody,.sl-rhead .sl-rbody b{color:#fff}
.sl-rhead .sl-rbody{font-size:12.5px}
.sl-rhead .sl-rbody .sl-mono,.sl-rhead .sl-rbody kbd{color:#fff;background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.35)}
.sl-rt h2{font-size:16px}
.sl-rt p{font-size:13px}
/* right page activities: larger labels */
.sl-stage .sl-lbl{font-size:12.5px}
.sl-stage .sl-msg{font-size:14px}
.sl-stage .sl-field{font-size:16px}
.sl-stage .sl-token{font-size:16px;padding:8px 12px}
.sl-stage .sl-crate .h b{font-size:16px}
.sl-stage .sl-crate .h small{font-size:12.5px}
.sl-stage .sl-crate .in span{font-size:13px}
.sl-stage .sl-target small,.sl-stage .sl-readout small{font-size:12px}
.sl-stage .sl-target em{font-size:13px}
.sl-stage .sl-readout b{font-size:23px}
.sl-stage .sl-pv{font-size:15px}
.sl-stage .sl-bv{font-size:20px}
.sl-stage .sl-enter label,.sl-stage .sl-calc label{font-size:15px}
/* part 3: character encoder */
.sl-stage .sl-screen label{font-size:15px;color:var(--sl-ink);font-weight:600}
.sl-stage .sl-screen .sl-field{font-size:24px}
.sl-stage .sl-uni{font-size:14.5px;color:var(--sl-ink)}
.sl-stage .sl-uni button{font-size:18px;padding:4px 12px}
.sl-stage .sl-ram h4,.sl-stage [class*="sl-ram"] small{font-size:13px}
.sl-stage .sl-cell .ch{font-size:24px}
.sl-stage .sl-cell .d{font-size:14px}
.sl-stage .sl-cell .b{font-size:14.5px}
.sl-stage .sl-empty{font-size:15px}
.sl-stage .sl-decode h4{font-size:16px}
.sl-stage .sl-byte{font-size:16px;padding:7px 10px}
.sl-stage .sl-byte em{font-size:17px;bottom:-24px}
.sl-stage .sl-key3{font-size:17px;padding:6px 0}
.sl-stage .sl-key3 small{font-size:12px}
/* parts 4-6 */
.sl-stage .sl-seg button{font-size:14px}
.sl-stage .sl-memv{font-size:13px}
.sl-stage .sl-size{font-size:14px}
.sl-stage .sl-form h3{font-size:16px}
.sl-stage .sl-frow label{font-size:13.5px}
.sl-stage .sl-frow .sl-field{font-size:15px}
.sl-stage .sl-tag{font-size:10.5px}
.sl-stage .sl-ferr{font-size:12.5px}
.sl-stage .sl-lamp b{font-size:13px}
.sl-stage .sl-lamp small{font-size:11px}
.sl-stage .sl-dbt{font-size:13px}
.sl-stage .sl-pk small{font-size:11px}
.sl-stage .sl-pk b{font-size:14px}
.sl-stage .sl-mc b{font-size:14px}
.sl-stage .sl-mc small{font-size:11.5px}
`;

/* ------------------------------------------------------------------ helpers ------------------------------------------------------------------ */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const bin8 = n => n.toString(2).padStart(8, '0');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function flash(el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), 500); }
const kbd = s => `<kbd>${esc(s)}</kbd>`;

function dragify(el, { targets, onDrop, onStart, onEnd }) {
  el.addEventListener('pointerdown', e => {
    if (e.button > 0 || el.classList.contains('gone')) return;
    e.preventDefault();
    const r = el.getBoundingClientRect(), ox = e.clientX - r.left, oy = e.clientY - r.top;
    const g = el.cloneNode(true); g.classList.add('sl-ghost'); g.style.width = r.width + 'px'; g.style.left = r.left + 'px'; g.style.top = r.top + 'px'; g.style.margin = '0';
    (el.closest('.sl-root') || document.body).appendChild(g); el.classList.add('sl-lifting'); if (onStart) onStart();
    let over = null;
    const move = ev => {
      g.style.left = (ev.clientX - ox) + 'px'; g.style.top = (ev.clientY - oy) + 'px';
      const t = document.elementFromPoint(ev.clientX, ev.clientY), hit = t && t.closest(targets);
      if (hit !== over) { if (over) over.classList.remove('over'); over = hit; if (over) over.classList.add('over'); }
    };
    const up = () => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      g.remove(); el.classList.remove('sl-lifting');
      if (over) { over.classList.remove('over'); onDrop(over); }
      if (onEnd) onEnd(!!over);
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  });
}
function fly(fromEl, toEl, icon, bounce) {
  return new Promise(res => {
    const a = fromEl.getBoundingClientRect(), b = toEl.getBoundingClientRect();
    const p = document.createElement('div'); p.className = 'sl-packet'; p.textContent = icon || '📦'; (fromEl.closest('.sl-root') || document.body).appendChild(p);
    const x0 = a.left + a.width / 2 - 20, y0 = a.top + a.height / 2 - 15, x1 = b.left + b.width / 2 - 20, y1 = b.top + b.height / 2 - 15;
    const frames = bounce
      ? [{ transform: `translate(${x0}px,${y0}px)` }, { transform: `translate(${(x0 + x1) / 2}px,${Math.min(y0, y1) - 60}px)`, offset: .45 }, { transform: `translate(${x1 - 24}px,${y1}px)`, offset: .75 }, { transform: `translate(${x0}px,${y0}px)` }]
      : [{ transform: `translate(${x0}px,${y0}px)` }, { transform: `translate(${(x0 + x1) / 2}px,${Math.min(y0, y1) - 70}px)` }, { transform: `translate(${x1}px,${y1}px) scale(.5)`, opacity: .4 }];
    const an = p.animate(frames, { duration: bounce ? 1000 : 800, easing: 'ease-in-out' });
    an.onfinish = () => { p.remove(); res(); };
  });
}

/* ============================================================================================
   THE SIX PARTS
   Each part: mount(body, api) -> { guide(k): html for the LAB ASSISTANT for mission step k, cleanup() }
   ============================================================================================ */
const PARTS = {};

/* ---------------- PART 1: data type sorter (drag) ---------------- */
PARTS.dataTypes = {
  lesson: 3, title: 'Data Type Sorting Line', short: 'Data Type Sorter', q: 'What are different data types?',
  key: 'Every value a program stores has a <b>data type</b>. The type tells the computer how much memory to use and what it can do with the value. <b>String</b> = text, <b>Integer</b> = whole number, <b>Real</b> = number with a decimal point, <b>Boolean</b> = TRUE or FALSE, <b>Char</b> = one character, <b>Date</b> = a calendar date.',
  steps: ['Drag one value into its correct crate', 'Put a value in every crate (all 6 data types)', 'Sort all 12 values so the belt is empty'],
  mount(body, api) {
    const TYPES = [{ k: 'String', ic: '🔤', ex: '"Hello"', c: 217 }, { k: 'Integer', ic: '🔢', ex: '42', c: 262 }, { k: 'Real', ic: '📏', ex: '3.75', c: 190 },
                   { k: 'Boolean', ic: '💡', ex: 'TRUE / FALSE', c: 38 }, { k: 'Char', ic: '🅰️', ex: "'x'", c: 330 }, { k: 'Date', ic: '📅', ex: '01/09/2026', c: 150 }];
    const ITEMS = [
      { t: '"Sara Ali"', k: 'String', why: 'Letters and spaces are text, so it is a <b>String</b>.' },
      { t: '16', k: 'Integer', why: 'A whole number with no decimal point is an <b>Integer</b>.' },
      { t: '98.6', k: 'Real', why: 'A number with a decimal point is a <b>Real</b> (also called float).' },
      { t: 'TRUE', k: 'Boolean', why: 'A <b>Boolean</b> can only ever be TRUE or FALSE.' },
      { t: "'K'", k: 'Char', why: 'One single character is a <b>Char</b>.' },
      { t: '25/10/2026', k: 'Date', why: 'A calendar day is stored as a <b>Date</b>.' },
      { t: '0551234567', k: 'String', why: 'Phone numbers start with 0 and you never do maths with them, so they are stored as a <b>String</b>.' },
      { t: '-40', k: 'Integer', why: 'Negative whole numbers are still <b>Integers</b>.' },
      { t: 'FALSE', k: 'Boolean', why: 'FALSE is the other <b>Boolean</b> value.' },
      { t: '0.25', k: 'Real', why: '0.25 has a decimal point, so it is <b>Real</b>.' },
      { t: "'#'", k: 'Char', why: 'A single symbol is also a <b>Char</b>.' },
      { t: '01/09/2026', k: 'Date', why: 'Another calendar day, so a <b>Date</b>.' }];
    const HINT = { String: 'it is text — letters, or digits you would never calculate with.', Integer: 'it is a whole number (it can be negative).', Real: 'look for a decimal point.',
                   Boolean: 'it can only be one of two values.', Char: 'it is exactly one character.', Date: 'it is a day on the calendar.' };
    body.innerHTML = `<div class="sl-belt"><div class="sl-lbl">DATA BELT — DRAG EACH VALUE DOWN INTO ITS CRATE</div><div class="sl-tokens"></div></div>
      <div class="sl-crates">${TYPES.map(t => `<div class="sl-crate" data-k="${t.k}" style="--c:${t.c}"><div class="h"><span>${t.ic}</span><div><b>${t.k}</b><small>e.g. ${esc(t.ex)}</small></div><em>0</em></div><div class="in"></div></div>`).join('')}</div>`;
    const tok = $('.sl-tokens', body), cnt = {}, left = new Set(ITEMS); let sorted = 0;
    shuffle(ITEMS).forEach(it => {
      const el = document.createElement('div'); el.className = 'sl-token'; el.textContent = it.t; tok.appendChild(el);
      dragify(el, { targets: '.sl-crate', onDrop(cr) {
        const k = cr.dataset.k;
        if (k === it.k) {
          el.classList.add('gone'); setTimeout(() => el.remove(), 250); left.delete(it);
          const s = document.createElement('span'); s.textContent = it.t; $('.in', cr).appendChild(s);
          cnt[k] = (cnt[k] || 0) + 1; $('em', cr).textContent = cnt[k]; flash(cr, 'sl-pop'); sorted++;
          api.award(10); api.feedback('good', `Correct — <b>${esc(it.t)}</b> → ${k}. ${it.why}`);
          api.done(0); if (TYPES.every(t => cnt[t.k])) api.done(1);
          if (sorted === ITEMS.length) api.done(2);
          api.refresh();
        } else {
          cr.classList.add('bad'); setTimeout(() => cr.classList.remove('bad'), 500); flash(cr, 'sl-shake');
          api.mistake(`<b>${esc(it.t)}</b> is not a ${k}. Hint: ${HINT[it.k]}`);
        }
      } });
    });
    const pick = k => [...left].find(i => i.k === k);
    return {
      guide(k) {
        if (k === 0) return `On the right page, find the value ${kbd('16')} on the grey <b>Data Belt</b>.<ul><li>Press and hold it with the mouse (or your finger).</li><li>Drag it down and drop it on the <b>Integer</b> crate.</li></ul>16 is a whole number, so it is an Integer.`;
        if (k === 1) {
          const empty = TYPES.filter(t => !cnt[t.k]).map(t => { const i = pick(t.k); return i ? `<li>Drag ${kbd(i.t)} → <b>${t.k}</b> crate</li>` : ''; }).join('');
          return `Every crate needs at least one value. These crates are still empty — drag:<ul>${empty}</ul>`;
        }
        return `Sort the last <b>${left.size}</b> value${left.size === 1 ? '' : 's'} on the belt. Use these rules:<ul><li>Has a decimal point → <b>Real</b></li><li>Whole number → <b>Integer</b></li><li>Only TRUE / FALSE → <b>Boolean</b></li><li>Exactly one character in ' ' → <b>Char</b></li><li>A day on the calendar → <b>Date</b></li><li>Text, or a phone number (never added up) → <b>String</b></li></ul>`;
      }
    };
  }
};

/* ---------------- PART 2: binary light board (click + enter) ---------------- */
PARTS.binaryLights = {
  lesson: 3, title: 'Binary Light Board', short: 'Binary Lights', q: 'How is data encoded so that a computer can process it?',
  key: 'Computers store everything as <b>bits</b>: 1 = ON, 0 = OFF. <b>8 bits make 1 byte</b>. Each bit has a place value: 128, 64, 32, 16, 8, 4, 2, 1. Add the place values of the bits that are ON to get the denary number. One byte can hold 0 to <b>255</b>.',
  steps: ['Light up the number 5', 'Light up the number 19', 'Light up the number 100', 'Light up 255 — the biggest number in one byte', 'Type a denary number and send it to the board'],
  mount(body, api) {
    const PV = [128, 64, 32, 16, 8, 4, 2, 1], TG = [5, 19, 100, 255]; let ti = 0, busy = false;
    body.innerHTML = `<div class="sl-p2top"><div class="sl-target"><small>TARGET</small><b class="tg">${TG[0]}</b><em class="tgn">Light the right bulbs</em></div>
        <div class="sl-readout"><div><small>BINARY</small><b class="rb">00000000</b></div><div><small>DENARY</small><b class="rd">0</b></div><div><small>HEX</small><b class="rh">00</b></div></div></div>
      <div class="sl-board">${PV.map((v, i) => `<div class="sl-bit" data-i="${i}"><div class="sl-pv">${v}</div><div class="sl-bulb"></div><button class="sl-sw" type="button" aria-label="Switch for ${v}"><span></span></button><div class="sl-bv">0</div></div>`).join('')}</div>
      <div class="sl-enter"><label for="sl-p2in">⌨️ Enter a denary number (0–255) and send it to the board</label>
        <div class="sl-row"><input class="sl-field sl-mono" id="sl-p2in" inputmode="numeric" placeholder="e.g. 77" autocomplete="off"><button class="sl-btn org sl-p2go" type="button">Send to board</button></div>
        <div class="sl-msg sl-p2msg"></div></div>`;
    const bits = $$('.sl-bit', body), val = () => bits.reduce((s, b, i) => s + (b.classList.contains('on') ? PV[i] : 0), 0);
    function show() {
      const v = val(); $('.rb', body).textContent = bin8(v); $('.rd', body).textContent = v; $('.rh', body).textContent = v.toString(16).toUpperCase().padStart(2, '0');
      bits.forEach(b => $('.sl-bv', b).textContent = b.classList.contains('on') ? 1 : 0);
      if (!busy && ti < TG.length && v === TG[ti]) {
        const parts = PV.filter((p, i) => bits[i].classList.contains('on'));
        api.award(15); api.done(ti); api.feedback('good', `<b>${TG[ti]}</b> = ${parts.join(' + ')} → binary <span class="sl-mono">${bin8(v)}</span>`);
        ti++; $('.tg', body).textContent = ti < TG.length ? TG[ti] : '✓'; if (ti >= TG.length) $('.tgn', body).textContent = 'Now use the number box';
        flash($('.sl-target', body), 'sl-pop');
      }
      api.refresh();
    }
    bits.forEach(b => $('.sl-sw', b).addEventListener('click', () => { if (busy) return; b.classList.toggle('on'); show(); }));
    const inp = $('#sl-p2in', body), msg = $('.sl-p2msg', body);
    function send() {
      const s = inp.value.trim(); inp.classList.remove('err', 'okf'); let err = '';
      if (!s) err = 'The box is empty — type a number first.';
      else if (!/^\d+$/.test(s)) err = 'Type a whole number using digits only (0–255).';
      else if (+s > 255) err = `${s} is too big — 8 bits can only hold 0 to 255.`;
      if (err) { inp.classList.add('err'); msg.className = 'sl-msg bad'; msg.textContent = err; api.mistake(err); return; }
      const n = +s, b = bin8(n); busy = true; inp.classList.add('okf'); msg.className = 'sl-msg good'; msg.textContent = `${n} → ${b}`;
      b.split('').forEach((c, i) => setTimeout(() => {
        bits[i].classList.toggle('on', c === '1');
        if (i === 7) { busy = false; api.done(4); api.award(10); api.feedback('good', `The board turned <b>${n}</b> into binary <span class="sl-mono">${b}</span>, one bulb at a time from 128 down to 1.`); }
        show();
      }, i * 130));
    }
    $('.sl-p2go', body).addEventListener('click', send); inp.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
    show();
    return {
      guide(k) {
        if (k < 4) {
          const n = TG[k], on = PV.filter(p => n & p), v = val();
          return `Make the board show <b>${n}</b>.<ul><li>Click the switches under: ${on.map(p => kbd(p)).join(' ')} so those bulbs light up.</li><li>All other bulbs must be OFF — click a switch again to turn it off.</li></ul>${on.join(' + ')} = <b>${n}</b>. The DENARY box now shows <b>${v}</b>.`;
        }
        return `Click the number box at the bottom of the right page, type ${kbd('77')} (or any whole number from 0 to 255) and click <b>Send to board</b>. Watch the switches set themselves.`;
      }
    };
  }
};

/* ---------------- PART 3: character encoder (type + click) ---------------- */
PARTS.charEncoder = {
  lesson: 3, title: 'Character Encoder: ASCII & Unicode', short: 'Character Encoder', q: 'How are letters and symbols turned into numbers?',
  key: 'Each character has a code number. <b>ASCII</b> uses 7 bits (128 characters), stored in 1 byte: <b>A = 65</b>, <b>a = 97</b>. <b>Unicode</b> covers every language and emoji, so some characters need <b>2, 3 or 4 bytes</b> in UTF-8. That is why ع, € and 😀 take more memory.',
  steps: ['Type a word with at least 3 letters', 'Type the same letter as a capital AND a small letter', 'Add a Unicode character', 'Decode the secret 4-letter message'],
  mount(body, api) {
    const SECRET = 'BYTE'; let pos = 0; const enc = new TextEncoder();
    body.innerHTML = `<div class="sl-screen"><label for="sl-p3in">Type here — every key you press is stored as a number</label>
        <input class="sl-field" id="sl-p3in" maxlength="12" autocomplete="off" spellcheck="false" placeholder="Type…">
        <div class="sl-uni">Unicode test: <button data-e="ع" type="button">ع</button><button data-e="€" type="button">€</button><button data-e="😀" type="button">😀</button><button data-c="1" type="button">Clear</button></div></div>
      <div class="sl-ram"><div class="sl-lbl">RAM — CHARACTER → CODE → BITS</div><div class="sl-cells"></div></div>
      <div class="sl-decode"><h4>🔐 Secret message from the server — decode it</h4>
        <div class="sl-bytes">${[...SECRET].map((c, i) => `<div class="sl-byte${i ? '' : ' cur'}">${bin8(c.charCodeAt(0))}</div>`).join('')}</div>
        <div class="sl-kb">${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => `<button class="sl-key3" data-k="${c}" type="button">${c}<small>${c.charCodeAt(0)}</small></button>`).join('')}</div>
        <div class="sl-msg sl-p3msg"></div></div>`;
    const inp = $('#sl-p3in', body), cells = $('.sl-cells', body);
    function render() {
      const chars = Array.from(inp.value);
      cells.innerHTML = !chars.length ? '<div class="sl-empty">RAM is empty — start typing</div>' : chars.map(ch => {
        const cp = ch.codePointAt(0);
        if (cp < 128) return `<div class="sl-cell"><div class="ch">${ch === ' ' ? '␣' : esc(ch)}</div><div class="d">ASCII ${cp}</div><div class="b">${bin8(cp)}</div></div>`;
        const by = [...enc.encode(ch)];
        return `<div class="sl-cell uc"><div class="ch">${esc(ch)}</div><div class="d">Unicode U+${cp.toString(16).toUpperCase()} · ${by.length} bytes</div><div class="b">${by.map(bin8).join(' ')}</div></div>`;
      }).join('');
      const letters = chars.filter(c => /[A-Za-z]/.test(c));
      if (letters.length >= 3 && !api.isDone(0)) { api.done(0); api.award(10); api.feedback('good', `Each letter became one byte. "${esc(letters.join(''))}" uses <b>${letters.length} bytes</b> of RAM.`); }
      const pair = letters.find(c => c === c.toUpperCase() && letters.includes(c.toLowerCase()));
      if (pair && !api.isDone(1)) { api.done(1); api.award(10); api.feedback('good', `'${pair}' = ${pair.charCodeAt(0)} but '${pair.toLowerCase()}' = ${pair.toLowerCase().charCodeAt(0)}. Small letters are always <b>32 more</b> than capitals — the computer sees them as different data.`); }
      const uc = chars.find(c => c.codePointAt(0) > 127);
      if (uc && !api.isDone(2)) { api.done(2); api.award(10); api.feedback('good', `'${esc(uc)}' is not in ASCII, so Unicode (UTF-8) stores it in <b>${enc.encode(uc).length} bytes</b> instead of 1.`); }
      api.refresh();
    }
    inp.addEventListener('input', render);
    $$('.sl-uni button', body).forEach(b => b.addEventListener('click', () => { if (b.dataset.c) inp.value = ''; else if (Array.from(inp.value).length < 12) inp.value += b.dataset.e; render(); inp.focus(); }));
    const bytes = $$('.sl-byte', body), msg = $('.sl-p3msg', body);
    $$('.sl-key3', body).forEach(k => k.addEventListener('click', () => {
      if (pos >= SECRET.length) return;
      const want = SECRET[pos];
      if (k.dataset.k === want) {
        bytes[pos].classList.remove('cur'); bytes[pos].classList.add('ok'); bytes[pos].insertAdjacentHTML('beforeend', `<em>${want}</em>`); pos++; api.award(10);
        if (pos < SECRET.length) { bytes[pos].classList.add('cur'); msg.className = 'sl-msg good'; msg.textContent = `Yes — ${want} = ${want.charCodeAt(0)}.`; }
        else { msg.className = 'sl-msg good'; msg.textContent = 'Decoded: BYTE'; api.done(3); api.feedback('good', 'You decoded <b>BYTE</b> — 4 characters, 4 bytes, 32 bits. That is how a computer sends text.'); }
        api.refresh();
      } else {
        flash(k, 'sl-shake'); k.classList.add('wrong'); setTimeout(() => k.classList.remove('wrong'), 600);
        const d = want.charCodeAt(0); api.mistake(`${k.dataset.k} is ${k.dataset.k.charCodeAt(0)}, but this byte is <span class="sl-mono">${bin8(d)}</span> = <b>${d}</b>.`);
      }
    }));
    render();
    return {
      guide(k) {
        if (k === 0) return `Click inside the typing box on the right page and type the word ${kbd('Data')}.<br>Watch each letter appear in the green <b>RAM</b> box as its ASCII number and its 8 bits.`;
        if (k === 1) return `Keep typing in the same box: add a capital ${kbd('A')} and a small ${kbd('a')} so it reads ${kbd('DataAa')}.<br>Compare their codes in RAM: what is the difference between 65 and 97?`;
        if (k === 2) return `Click the ${kbd('😀')} button under the typing box (or ${kbd('ع')} or ${kbd('€')}).<br>Look at the orange cell in RAM: how many bytes does it need?`;
        if (pos >= SECRET.length) return 'Message decoded.';
        const d = SECRET.charCodeAt(pos), b = bin8(d), on = [128, 64, 32, 16, 8, 4, 2, 1].filter(p => d & p);
        return `Decode byte <b>${pos + 1}</b> (orange box): <span class="sl-mono">${b}</span><ul><li>The 1s are worth ${on.join(' + ')} = <b>${d}</b>.</li><li>Find the key with <b>${d}</b> written under it on the keyboard and click it.</li></ul>`;
      }
    };
  }
};

/* ---------------- PART 4: pixel studio (click / drag paint + enter) ---------------- */
PARTS.pixelStudio = {
  lesson: 3, title: 'Pixel Studio: Encoding Images', short: 'Pixel Studio', q: 'How is a picture stored as binary?',
  key: 'A bitmap image is a grid of <b>pixels</b>. Each pixel stores a binary colour code. <b>Colour depth</b> = bits per pixel: 1 bit gives 2 colours, 2 bits give 4 colours. <b>File size = width × height × colour depth</b> in bits; divide by 8 for bytes.',
  steps: ['Paint at least 10 pixels in 1-bit mode', 'Switch to 2-bit colour and use 3 different colours', 'Solve the file-size challenge'],
  mount(body, api) {
    const N = 8, PAL = { 1: [['0', '#FFFFFF'], ['1', '#111827']], 2: [['00', '#FFFFFF'], ['01', '#2563EB'], ['10', '#F97316'], ['11', '#111827']] };
    let depth = 1, cur = 1, px = new Array(N * N).fill(0), down = false;
    body.innerHTML = `<div class="sl-p4"><div><div class="sl-lbl">CANVAS 8 × 8 — CLICK OR DRAG TO PAINT</div><div class="sl-canvas">${'<div class="sl-px"></div>'.repeat(N * N)}</div></div>
        <div><div class="sl-lbl">MEMORY — ONE ROW OF PIXELS PER LINE</div><pre class="sl-memv"></pre><div class="sl-size"></div></div></div>
      <div class="sl-row" style="margin-top:12px;align-items:flex-start;gap:16px">
        <div><div class="sl-lbl">COLOUR DEPTH</div><div class="sl-seg"><button data-d="1" class="on" type="button">1-bit · 2 colours</button><button data-d="2" type="button">2-bit · 4 colours</button><button class="clr" type="button">Clear</button></div></div>
        <div><div class="sl-lbl">PALETTE — CLICK A COLOUR</div><div class="sl-pal"></div></div></div>
      <div class="sl-calc"><label for="sl-p4in">🧮 Challenge: a <b>16 × 16</b> image uses <b>2-bit</b> colour. How many <b>bytes</b> does it need?</label>
        <div class="sl-row"><input class="sl-field sl-mono" id="sl-p4in" inputmode="numeric" placeholder="bytes" autocomplete="off"><button class="sl-btn sl-p4go" type="button">Check</button></div><div class="sl-msg sl-p4msg"></div></div>`;
    const cvs = $$('.sl-px', body), pal = $('.sl-pal', body);
    const code = v => PAL[depth][v][0], col = v => PAL[depth][v][1];
    function drawPal() {
      pal.innerHTML = PAL[depth].map((p, i) => `<button class="sl-sw4${i === cur ? ' on' : ''}" data-v="${i}" type="button"><i style="background:${p[1]}"></i><span>${p[0]}</span></button>`).join('');
      $$('.sl-sw4', pal).forEach(b => b.addEventListener('click', () => { cur = +b.dataset.v; drawPal(); api.refresh(); }));
    }
    function draw() {
      cvs.forEach((c, i) => c.style.background = col(px[i]));
      const rows = []; for (let r = 0; r < N; r++) rows.push(px.slice(r * N, r * N + N).map(code).join(depth === 1 ? '' : ' '));
      $('.sl-memv', body).textContent = rows.join('\n');
      const bits = N * N * depth;
      $('.sl-size', body).innerHTML = `File size: <b>${N} × ${N}</b> pixels × <b>${depth} bit${depth > 1 ? 's' : ''}</b> = <b>${bits} bits</b> = <b>${bits / 8} bytes</b>`;
      const painted = px.filter(v => v).length;
      if (depth === 1 && painted >= 10 && !api.isDone(0)) { api.done(0); api.award(10); api.feedback('good', `${painted} pixels painted. In 1-bit mode each pixel is just <b>0</b> or <b>1</b> — look at the memory.`); }
      if (depth === 2 && new Set(px.filter(v => v)).size >= 3 && !api.isDone(1)) { api.done(1); api.award(15); api.feedback('good', 'More colours need more bits: each pixel now uses <b>2 bits</b>, so the same picture is <b>twice as big</b> (16 bytes).'); }
      api.refresh();
    }
    function paint(e) { const t = document.elementFromPoint(e.clientX, e.clientY); if (!t || !t.classList.contains('sl-px')) return; const i = cvs.indexOf(t); if (i >= 0 && px[i] !== cur) { px[i] = cur; draw(); } }
    $('.sl-canvas', body).addEventListener('pointerdown', e => { down = true; paint(e); e.preventDefault(); });
    const onMove = e => { if (down) paint(e); }, onUp = () => { down = false; };
    window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp);
    $$('.sl-seg [data-d]', body).forEach(b => b.addEventListener('click', () => {
      const d = +b.dataset.d; if (d === depth) return;
      px = px.map(v => d === 2 ? (v ? 3 : 0) : (v ? 1 : 0)); depth = d; cur = 1;
      $$('.sl-seg [data-d]', body).forEach(x => x.classList.toggle('on', x === b)); drawPal(); draw();
    }));
    $('.clr', body).addEventListener('click', () => { px.fill(0); draw(); });
    const inp = $('#sl-p4in', body), msg = $('.sl-p4msg', body);
    function check() {
      const s = inp.value.trim(); inp.classList.remove('err', 'okf');
      if (s === '64') { inp.classList.add('okf'); msg.className = 'sl-msg good'; msg.textContent = 'Correct — 16 × 16 × 2 = 512 bits ÷ 8 = 64 bytes.'; api.done(2); api.award(20); api.feedback('good', '<b>16 × 16 × 2 = 512 bits</b>, and 512 ÷ 8 = <b>64 bytes</b>.'); api.refresh(); return; }
      inp.classList.add('err'); msg.className = 'sl-msg bad';
      const t = s === '512' ? '512 is the answer in bits. Divide by 8 to get bytes.' : s === '256' ? '256 is the number of pixels. Multiply by the colour depth too.' : 'Use width × height × colour depth, then divide by 8.';
      msg.textContent = t; api.mistake(t);
    }
    $('.sl-p4go', body).addEventListener('click', check); inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
    drawPal(); draw();
    return {
      guide(k) {
        const painted = px.filter(v => v).length, used = new Set(px.filter(v => v)).size;
        if (k === 0) return `The black colour ${kbd('1')} is already selected in the palette.<ul><li>Click squares on the 8 × 8 canvas, or hold the mouse down and drag across them, to paint them black.</li><li>Paint at least <b>10</b> squares — you have <b>${painted}</b>.</li></ul>Watch the MEMORY box: every black pixel is stored as 1, every white one as 0.`;
        if (k === 1) {
          if (depth === 1) return `Click the button ${kbd('2-bit · 4 colours')} under the canvas.`;
          return `Now paint with more colours (you are using <b>${used}</b> of 3):<ul><li>Click the blue swatch ${kbd('01')}, then click a square.</li><li>Click the orange swatch ${kbd('10')}, then click another square.</li></ul>Each pixel now needs 2 bits — look at the file size.`;
        }
        return `Work it out step by step:<ul><li>Pixels: 16 × 16 = <b>256</b></li><li>Bits: 256 × 2 bits = <b>512 bits</b></li><li>Bytes: 512 ÷ 8 = ?</li></ul>Type your answer in the <b>Challenge</b> box and click <b>Check</b>.`;
      },
      cleanup() { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); }
    };
  }
};

/* ---------------- PART 5: validation kiosk (enter + click) ---------------- */
PARTS.validationKiosk = {
  lesson: 4, title: 'Validation Gate: Student Registration', short: 'Validation Kiosk', q: 'Why is data validation important?',
  key: '<b>Validation</b> is an automatic check by the computer that data is <b>sensible and allowed</b> before it is stored. Common checks: <b>Presence</b> (not empty), <b>Length</b>, <b>Type</b> (e.g. a number), <b>Range</b> (between limits), <b>Format</b> (a pattern like AR2041) and <b>Lookup</b> (from a list). Bad data in = bad information out.',
  steps: ['Submit a record that gets REJECTED', 'Make 3 different kinds of check reject your data', 'Save one fully valid record in the database'],
  mount(body, api) {
    const CHECKS = [['Presence', 'not empty'], ['Length', 'too short/long'], ['Type', 'right kind'], ['Range', 'within limits'], ['Format', 'right pattern'], ['Lookup', 'on the list']];
    const F = [
      { id: 'sid', label: 'Student ID', ph: 'e.g. AR2041', tags: ['Presence', 'Format'], rules: v => !/^[A-Z]{2}\d{4}$/.test(v) ? [['Format', 'Must be 2 CAPITAL letters then 4 digits, e.g. AR2041']] : [] },
      { id: 'name', label: 'Full name', ph: 'e.g. Sara Ali', tags: ['Presence', 'Length'], rules: v => (v.length < 2 || v.length > 30) ? [['Length', `Name must be 2–30 characters (you typed ${v.length})`]] : [] },
      { id: 'age', label: 'Age', ph: '14 – 19', tags: ['Presence', 'Type', 'Range'], rules: v => !/^-?\d+$/.test(v) ? [['Type', 'Age must be a whole number']] : (+v < 14 || +v > 19) ? [['Range', `Age must be from 14 to 19 (you typed ${v})`]] : [] },
      { id: 'grade', label: 'Grade', ph: '9, 10, 11 or 12', tags: ['Presence', 'Lookup'], rules: v => !['9', '10', '11', '12'].includes(v) ? [['Lookup', 'Grade must be one of: 9, 10, 11, 12']] : [] },
      { id: 'email', label: 'School email', ph: 'name@school.sa', tags: ['Presence', 'Format'], rules: v => !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? [['Format', 'Email needs one @ and a dot, e.g. sara@ais.sa']] : [] }];
    body.innerHTML = `<div class="sl-form"><h3>🎓 Student Registration</h3><div class="sl-fgrid">
        ${F.map(f => `<div class="sl-frow"${f.id === 'email' ? ' style="grid-column:1/-1"' : ''}><label for="sl-f-${f.id}">${f.label}<span class="sl-tags">${f.tags.map(t => `<span class="sl-tag">${t}</span>`).join('')}</span></label>
          <input class="sl-field" id="sl-f-${f.id}" data-f="${f.id}" placeholder="${esc(f.ph)}" autocomplete="off"><div class="sl-ferr" id="sl-e-${f.id}"></div></div>`).join('')}</div>
        <div class="sl-row" style="justify-content:space-between;margin-top:4px"><button class="sl-btn gry sl-p5fill" type="button">Fill with test data</button><button class="sl-btn org sl-p5go" type="button">Submit to database</button></div></div>
      <div class="sl-lamps">${CHECKS.map(c => `<div class="sl-lamp" data-c="${c[0]}"><i></i><b>${c[0]}</b><small>${c[1]}</small></div>`).join('')}</div>
      <div class="sl-dbwrap"><div class="sl-cyl"><svg viewBox="0 0 70 84"><ellipse cx="35" cy="70" rx="32" ry="10" fill="#BFDBFE" stroke="#2563EB" stroke-width="1.5"/><rect x="3" y="14" width="64" height="56" fill="#DBEAFE"/><line x1="3" y1="14" x2="3" y2="70" stroke="#2563EB" stroke-width="1.5"/><line x1="67" y1="14" x2="67" y2="70" stroke="#2563EB" stroke-width="1.5"/><ellipse cx="35" cy="14" rx="32" ry="10" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/></svg><small>DATABASE</small></div>
        <table class="sl-dbt"><thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Grade</th></tr></thead><tbody class="sl-dbrows"><tr><td colspan="4" style="font-family:inherit;color:#94A3B8">No records yet</td></tr></tbody></table></div>`;
    const seen = new Set(), lamps = $$('.sl-lamp', body);
    function validate(f, v, show) {
      const out = []; if (!v) out.push(['Presence', `${f.label} must not be empty`]); else out.push(...f.rules(v));
      if (show) { const el = $('#sl-f-' + f.id, body); el.classList.toggle('err', !!out.length); el.classList.toggle('okf', !out.length && !!v); $('#sl-e-' + f.id, body).textContent = out.map(o => o[1]).join(' · '); }
      return out;
    }
    $$('.sl-form .sl-field', body).forEach(el => el.addEventListener('blur', () => { if (el.value) validate(F.find(f => f.id === el.dataset.f), el.value.trim(), true); }));
    const TEST = [{ sid: 'ar2041', name: 'S', age: '25', grade: '13', email: 'sara.ais.sa' }, { sid: '', name: 'Omar Khan', age: 'sixteen', grade: '10', email: 'omar@ais.sa' }, { sid: 'AR20', name: 'Lina Hassan', age: '16', grade: '11', email: 'lina@ais' }];
    let ti = 0, busy = false;
    $('.sl-p5fill', body).addEventListener('click', () => {
      const t = TEST[ti++ % TEST.length];
      F.forEach(f => { const el = $('#sl-f-' + f.id, body); el.value = t[f.id]; el.classList.remove('err', 'okf'); $('#sl-e-' + f.id, body).textContent = ''; });
      api.feedback('', 'Test data loaded — it has mistakes on purpose. Click <b>Submit to database</b>.');
    });
    const btn = $('.sl-p5go', body), cyl = $('.sl-cyl', body);
    btn.addEventListener('click', async () => {
      if (busy) return;
      const vals = {}; F.forEach(f => vals[f.id] = $('#sl-f-' + f.id, body).value.trim());
      const fails = [], ran = new Set();
      F.forEach(f => { f.tags.forEach(t => ran.add(t)); fails.push(...validate(f, vals[f.id], true)); });
      const failTypes = new Set(fails.map(x => x[0]));
      lamps.forEach(l => { l.classList.remove('pass', 'fail'); const c = l.dataset.c; if (failTypes.has(c)) l.classList.add('fail'); else if (ran.has(c)) l.classList.add('pass'); });
      busy = true;
      if (fails.length) {
        failTypes.forEach(t => { seen.add(t); $(`.sl-lamp[data-c="${t}"]`, body).classList.add('seen'); });
        await fly(btn, cyl, '📦', true); flash($('.sl-form', body), 'sl-shake');
        api.done(0);
        api.feedback('bad', `<b>REJECTED</b> — ${fails.length} problem${fails.length > 1 ? 's' : ''}:<br>• ${fails.map(x => `<b>${x[0]}</b>: ${esc(x[1])}`).join('<br>• ')}`);
        if (seen.size >= 3 && !api.isDone(1)) { api.done(1); api.award(20); } else if (!api.isDone(1)) api.award(5);
      } else {
        await fly(btn, cyl, '✅'); flash(cyl, 'sl-pop');
        const tb = $('.sl-dbrows', body); if (tb.querySelector('td[colspan]')) tb.innerHTML = '';
        $$('tr', tb).forEach(r => r.classList.remove('new'));
        const tr = document.createElement('tr'); tr.className = 'new'; tr.innerHTML = `<td>${esc(vals.sid)}</td><td>${esc(vals.name)}</td><td>${esc(vals.age)}</td><td>${esc(vals.grade)}</td>`; tb.appendChild(tr);
        if (!api.isDone(2)) api.award(25); api.done(2);
        api.feedback('good', '<b>ACCEPTED</b> — every check passed, so the record was saved. Note: validation checks that data is <i>sensible</i>, not that it is <i>true</i>. A wrong but sensible age would still get in.');
      }
      busy = false; api.refresh();
    });
    return {
      guide(k) {
        if (k === 0) return `Click <b>Fill with test data</b> (it adds mistakes on purpose), then click the orange <b>Submit to database</b> button.<br>Watch the data bounce back and the red lamps light up.`;
        if (k === 1) return `So far these checks have rejected data: <b>${[...seen].join(', ') || 'none'}</b> (${seen.size} of 3).<ul><li>Click <b>Fill with test data</b> again to load a different set.</li><li>Click <b>Submit to database</b>.</li></ul>Repeat until 3 different lamps have turned red.`;
        return `Now type correct data in every box:<ul><li>Student ID: ${kbd('AR2041')}</li><li>Full name: ${kbd('Sara Ali')}</li><li>Age: ${kbd('16')}</li><li>Grade: ${kbd('11')}</li><li>School email: ${kbd('sara@ais.sa')}</li></ul>Then click <b>Submit to database</b>. All lamps should turn green.`;
      }
    };
  }
};

/* ---------------- PART 6: quality-control conveyor (drag) ---------------- */
PARTS.checkConveyor = {
  lesson: 4, title: 'Quality Control Conveyor', short: 'Check Conveyor', q: 'How can we ensure that input data is accurate and appropriate?',
  key: 'Each kind of bad data is caught by a different check. <b>Validation</b> checks data is sensible (presence, length, type, range, format, lookup). <b>Verification</b> checks data was entered <b>correctly</b> — for example <b>double entry</b> (type it twice and compare) or a visual check. Only good data goes to the <b>database</b>.',
  steps: ['Sort 3 packets into the correct machine', 'Send a VALID packet to the database', 'Catch a typing mistake with Verification', 'Sort all 12 packets'],
  mount(body, api) {
    const M = [['Presence', '⛔', 'empty data', 0], ['Length', '📐', 'too short / long', 200], ['Type', '🔣', 'wrong kind', 262], ['Range', '↔️', 'outside limits', 25],
               ['Format', '🧩', 'wrong pattern', 190], ['Lookup', '📋', 'not on the list', 330], ['Verification', '👀', 'double entry', 280], ['Database', '🗄️', 'valid → store', 145]];
    const P = [
      { f: 'Age', v: '250', k: 'Range', why: 'Ages must be in a sensible range (e.g. 11–19). 250 is outside it — <b>range check</b>.' },
      { f: 'Name', v: '(empty)', k: 'Presence', why: 'Nothing was typed — a <b>presence check</b> stops empty fields.' },
      { f: 'Age', v: 'twelve', k: 'Type', why: 'Age must be a number, not words — <b>type check</b>.' },
      { f: 'Password', v: 'abc', k: 'Length', why: 'Passwords need at least 8 characters — <b>length check</b>.' },
      { f: 'Email', v: 'ali.gmail.com', k: 'Format', why: 'There is no @ — the email pattern is wrong: <b>format check</b>.' },
      { f: 'Blood group', v: 'Z+', k: 'Lookup', why: 'Z+ is not in the list of blood groups (A, B, AB, O) — <b>lookup check</b>.' },
      { f: 'Email (typed twice)', v: 'sara@ais.sa / sara@ais.sx', k: 'Verification', why: 'Both are valid emails but they do not match — <b>double-entry verification</b> catches typing mistakes.' },
      { f: 'Age', v: '16', k: 'Database', why: '16 passes every check, so it is stored in the <b>database</b>.' },
      { f: 'Phone', v: '05512', k: 'Length', why: 'A mobile number needs 10 digits. 5 is too short — <b>length check</b>.' },
      { f: 'Name', v: 'Omar Khan', k: 'Database', why: 'A sensible name of normal length — valid, so it is stored.' },
      { f: 'Student ID', v: '2041AR', k: 'Format', why: 'IDs must be 2 letters THEN 4 digits. This is back to front — <b>format check</b>.' },
      { f: 'Password (typed twice)', v: 'Qatar2026! / Qatar2026!', k: 'Database', why: 'Both entries match and are long enough — verified and valid.' }];
    const WHY = { Range: 'the number is outside the allowed limits', Presence: 'nothing was entered', Type: 'it is the wrong kind of data', Length: 'it is too short or too long',
                  Format: 'it does not match the pattern', Lookup: 'it is not on the list of allowed values', Verification: 'the two copies do not match', Database: 'it passes every check' };
    body.innerHTML = `<div class="sl-lbl">CONVEYOR — DRAG EACH PACKET TO THE MACHINE THAT WOULD REJECT IT (OR TO THE DATABASE IF VALID)</div>
      <div class="sl-factory"><div class="sl-beltbar"></div><div class="sl-lane"></div></div>
      <div class="sl-machines">${M.map(m => `<div class="sl-mc" data-k="${m[0]}" style="--c:${m[3]}"><span class="n">0</span><div class="ic">${m[1]}</div><b>${m[0]}</b><small>${m[2]}</small></div>`).join('')}</div>`;
    const lane = $('.sl-lane', body), queue = shuffle(P); let onBelt = [], sorted = 0, raf = 0, last = 0; const count = {};
    const W = () => lane.clientWidth, GAP = 200;
    function spawnX(self) { const xs = onBelt.filter(p => p !== self).map(p => p.x); return Math.min(-165, (xs.length ? Math.min(...xs) : 0) - GAP); }
    function addPacket(x) {
      const it = queue.shift(); if (!it) return;
      const el = document.createElement('div'); el.className = 'sl-pk'; el.innerHTML = `<small>${esc(it.f.toUpperCase())}</small><b>${esc(it.v)}</b>`; lane.appendChild(el);
      const o = { it, el, x, held: false }; onBelt.push(o); el.style.left = x + 'px';
      dragify(el, { targets: '.sl-mc', onStart() { o.held = true; }, onEnd() { o.held = false; }, onDrop(mc) {
        const k = mc.dataset.k;
        if (k === it.k) {
          sorted++; count[k] = (count[k] || 0) + 1; $('.n', mc).textContent = count[k];
          mc.classList.add('go'); setTimeout(() => mc.classList.remove('go'), 700); flash(mc, 'sl-pop');
          el.remove(); onBelt = onBelt.filter(p => p !== o); api.award(10);
          api.feedback('good', `<b>${esc(it.f)}: ${esc(it.v)}</b> → ${k}. ${it.why}`);
          if (sorted >= 3) api.done(0); if (k === 'Database') api.done(1); if (k === 'Verification') api.done(2); if (sorted === P.length) api.done(3);
          setTimeout(() => { if (queue.length) addPacket(spawnX(null)); api.refresh(); }, 350);
          api.refresh();
        } else {
          mc.classList.add('no'); setTimeout(() => mc.classList.remove('no'), 700); flash(mc, 'sl-shake');
          const hint = it.k === 'Database' ? 'Look again — is anything actually wrong with this data?' : it.k === 'Verification' ? 'The data looks valid… but compare the two copies carefully.' : `Ask: what rule does this data break? (${k} is not the one.)`;
          api.mistake(`<b>${esc(it.f)}: ${esc(it.v)}</b> does not belong in ${k}. ${hint}`);
        }
      } });
    }
    [0, 1, 2].forEach(i => addPacket(20 + i * Math.max(GAP, (W() - 160) / 3)));
    function tick(t) {
      const dt = last ? Math.min(.05, (t - last) / 1000) : 0; last = t; const w = W();
      onBelt.forEach(o => { if (o.held) return; o.x += 36 * dt; if (o.x > w) o.x = spawnX(o); o.el.style.left = o.x + 'px'; });
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    const guideTimer = setInterval(() => api.refresh(), 1500);
    const visible = () => onBelt.filter(o => o.x > -20 && o.x < W() - 120).sort((a, b) => b.x - a.x);
    const tell = o => `Drag the packet <b>${esc(o.it.f)}: ${esc(o.it.v)}</b> to the <b>${o.it.k}</b> machine — ${WHY[o.it.k]}.`;
    return {
      guide(k) {
        const vis = visible();
        if (k === 0) return `Packets move along the grey belt. Press and hold a packet, drag it down and drop it on a machine.<br>${vis[0] ? tell(vis[0]) : 'Wait for the next packet to come onto the belt.'}<br>Sorted so far: <b>${sorted}</b> of 3.`;
        if (k === 1) { const o = vis.find(v => v.it.k === 'Database'); return `Find a packet with <b>nothing wrong</b> (for example <b>Age: 16</b> or <b>Name: Omar Khan</b>) and drag it to the green <b>Database</b> machine.${o ? '<br>' + tell(o) : '<br>None on the belt right now — sort the others and watch for one.'}`; }
        if (k === 2) { const o = vis.find(v => v.it.k === 'Verification'); return `Look for an email typed <b>twice</b> where the two copies are different. Drag it to the <b>Verification</b> machine.${o ? '<br>' + tell(o) : '<br>It is not on the belt yet — keep sorting and watch for it.'}`; }
        return `Sort the rest (${sorted} of 12 done). Ask what each packet breaks:<ul><li>Empty → <b>Presence</b></li><li>Too short / long → <b>Length</b></li><li>Words instead of a number → <b>Type</b></li><li>Outside limits → <b>Range</b></li><li>Wrong pattern → <b>Format</b></li><li>Not in a list → <b>Lookup</b></li><li>Two copies differ → <b>Verification</b></li><li>Nothing wrong → <b>Database</b></li></ul>`;
      },
      cleanup() { cancelAnimationFrame(raf); clearInterval(guideTimer); }
    };
  }
};

/* ============================================================================================
   LABS (WEEK 11)
   ============================================================================================ */
/* ---- the simulation labs: add new weeks here ---- */
/* ---- the simulation labs: add new weeks here ----
   intro / objectives / outcomes are shown on the lab's start screen (left page). */
const SIM_LABS = [
  { id: 'G11-SIM-W11-1', week: 11, icon: '🧪', title: 'Data & Information Lab 1', topic: 'Lesson 3: Data Types and Encoding',
    meta: 'G11 Computing | Data and Information | Week 11', parts: ['dataTypes', 'binaryLights', 'charEncoder'],
    intro: 'Computers work with many kinds of data — numbers, words and symbols. Inside the computer, all of it is stored as 0s and 1s. In this lab you sort data into data types, build numbers from bits on a light board, and see how every letter you type is turned into a number.',
    objectives: ['Identify the data type of a value: String, Integer, Real, Boolean, Char or Date.', 'Convert between denary numbers and 8-bit binary using place values.', 'Explain how ASCII and Unicode turn characters into binary codes.'],
    outcomes: ['I can choose the right data type for a value and explain why.', 'I can show any number from 0 to 255 in binary.', 'I can decode a short binary message into letters.'] },
  { id: 'G11-SIM-W11-2', week: 11, icon: '🧪', title: 'Data & Information Lab 2', topic: 'Lesson 3 & 4: Images and Data Validation',
    meta: 'G11 Computing | Data and Information | Week 11', parts: ['pixelStudio', 'validationKiosk', 'checkConveyor'],
    intro: 'Pictures are stored as grids of binary codes, and every piece of data entered into a system must be checked before it is saved. In this lab you paint a bitmap and calculate its file size, test a registration form with validation checks, and sort bad data on a quality-control conveyor.',
    objectives: ['Explain how colour depth changes the size of a bitmap image.', 'Describe presence, length, type, range, format and lookup checks.', 'Tell the difference between validation and verification.'],
    outcomes: ['I can calculate the file size of a bitmap image.', 'I can predict which validation check will reject a piece of data.', 'I can explain why validation is important for accurate information.'] }
  /* , { id: 'G11-SIM-W12-1', week: 12, icon: '🧪', title: '...', topic: '...', meta: '...', parts: ['...'], intro: '...', objectives: ['...'], outcomes: ['...'] } */
];
const GRADES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map(c => 'GRADE 11-' + c);
const PDF_MIN = 40;                              // % of missions needed before the PDF can be downloaded
const JSPDF_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
const ST = {};
function stOf(p) { return ST[p] || (ST[p] = { done: new Array(PARTS[p].steps.length).fill(false), mistakes: 0, complete: false, score: 0 }); }
const STUDENT = { name: '', sid: '', grade: '' };

/* ------------------------------------------------------------------ book view ------------------------------------------------------------------ */
let view = null;
function ensureCss() { if (!document.getElementById('g11-simlabs-css')) { const s = document.createElement('style'); s.id = 'g11-simlabs-css'; s.textContent = CSS; document.head.appendChild(s); } }
const starsOf = st => st.mistakes <= 1 ? 3 : st.mistakes <= 4 ? 2 : 1;
function labStats(lab) {
  let done = 0, total = 0, score = 0;
  lab.parts.forEach(p => { const st = stOf(p); done += st.done.filter(Boolean).length; total += st.done.length; score += st.score; });
  return { done, total, score, pct: total ? Math.round(done / total * 100) : 0 };
}

function open(id) {
  const lab = SIM_LABS.find(l => l.id === id); if (!lab) return false;
  const page = document.querySelector('section.guide'), grid = document.querySelector('#weeksGrid'), host = document.querySelector('#rightHost');
  if (!page || !grid || !host) { console.error('[SimLabs] host elements not found'); return false; }
  if (view) close();
  ensureCss();
  const wrapL = document.createElement('div'); wrapL.className = 'sl-root sl-left';
  const wrapR = document.createElement('div'); wrapR.className = 'sl-root sl-right';
  grid.style.display = 'none'; page.insertBefore(wrapL, grid);
  host.innerHTML = ''; host.classList.add('ws-on', 'sl-host'); host.appendChild(wrapR);
  const feet = $$('.book .foot').map(el => [el, el.style.display]); feet.forEach(f => f[0].style.display = 'none');   // hide the book footers
  const n = SIM_LABS.filter(l => l.week === lab.week).indexOf(lab) + 1;
  wrapL.innerHTML = `<div class="sl-top"><div class="sl-tabs">${lab.parts.map((p, i) => `<button class="sl-tab" data-i="${i}" type="button" title="${esc(PARTS[p].title)}">Part ${i + 1}</button>`).join('')}</div>
      <div class="sl-ttl"><small>WEEK ${lab.week} · LAB ${n}</small><b>${esc(lab.topic)}</b></div><div class="sl-score">Score <b class="sl-sc">0</b></div></div>
    <div class="sl-lbody"></div>
    <div class="sl-lnav"><button class="sl-home" type="button" title="Back to the weeks">🏠 WEEKS HOME</button><button class="sl-btn ghost sl-prev" type="button">← Previous</button>
      <span class="sl-pos"></span><button class="sl-btn gry sl-pdf" type="button" title="Download your PDF (at least ${PDF_MIN}% done)">📄 PDF</button><button class="sl-btn sl-next" type="button">Next →</button></div>`;
  wrapR.innerHTML = `<div class="sl-rhead"><div class="sl-rt"><h2></h2><p></p></div><div class="sl-result"><small>RESULT</small><div class="sl-rbody"></div></div></div>
    <div class="sl-stage"><div class="sl-fit"></div></div>`;
  view = { lab, labNo: n, idx: -1, cur: null, wrapL, wrapR, page, grid, host, feet, title: document.title, started: !!(STUDENT.name && STUDENT.sid && STUDENT.grade) };
  document.title = `WEEK ${lab.week} LAB ${n} | ${lab.title}`;
  $('.sl-home', wrapL).addEventListener('click', () => { if (window.confirm('Go back to all weeks? Your progress in this lab stays until you reload the page.')) close(); });
  $$('.sl-tab', wrapL).forEach(t => t.addEventListener('click', () => { if (!view.started) { setResult('bad', 'Enter your name, SID and grade, then click <b>Start lab</b> first.'); return; } showPart(+t.dataset.i); }));
  $('.sl-prev', wrapL).addEventListener('click', () => { if (view.idx === 99) showPart(lab.parts.length - 1); else if (view.idx > 0) showPart(view.idx - 1); else if (view.idx === 0) showIntro(); });
  $('.sl-next', wrapL).addEventListener('click', () => {
    if (view.idx < 0) { startLab(); return; }
    if (view.idx < lab.parts.length - 1) showPart(view.idx + 1); else showResults();
  });
  $('.sl-pdf', wrapL).addEventListener('click', downloadPdf);
  view.ro = new ResizeObserver(() => fitAll()); view.ro.observe(wrapL); view.ro.observe(wrapR);
  showIntro();
  return true;
}
function close() {
  if (!view) return true;
  if (view.cur && view.cur.cleanup) { try { view.cur.cleanup(); } catch (_) {} }
  const v = view; view = null;
  if (v.ro) v.ro.disconnect();
  $$('.sl-ghost,.sl-packet').forEach(g => g.remove());
  v.wrapL.remove(); v.wrapR.remove();
  v.feet.forEach(f => f[0].style.display = f[1]);
  v.grid.style.display = ''; v.host.classList.remove('ws-on', 'sl-host'); v.host.innerHTML = '';
  document.title = v.title;
  return true;
}

/* ---- fit both pages into the available height (no scroll bars) ---- */
function fitLeft() {
  if (!view) return;
  const body = $('.sl-lbody', view.wrapL); if (!body) return;
  let fs = 22; body.style.fontSize = fs + 'px';
  while (fs > 12 && body.scrollHeight > body.clientHeight + 1) { fs -= .5; body.style.fontSize = fs + 'px'; }
}
function fitRight() {
  if (!view) return;
  const stage = $('.sl-stage', view.wrapR), fit = $('.sl-fit', view.wrapR); if (!stage || !fit) return;
  const cs = getComputedStyle(stage), availH = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  const natH = fit.offsetHeight, availW = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  const k = natH > availH && natH > 0 ? Math.max(.55, availH / natH) : 1;
  fit.style.transform = k < 1 ? `scale(${k})` : ''; fit.style.marginLeft = k < 1 ? ((availW - availW * k) / 2) + 'px' : '';
}
let fitQueued = false;
function fitAll() { if (fitQueued) return; fitQueued = true; requestAnimationFrame(() => { fitQueued = false; fitLeft(); fitRight(); }); }

function setResult(kind, html) {
  if (!view) return;
  const box = $('.sl-result', view.wrapR);
  box.className = 'sl-result' + (kind ? ' ' + kind : ''); $('.sl-rbody', box).innerHTML = html; box.title = $('.sl-rbody', box).textContent;
  flash(box, 'sl-pop');
}
function setHead(title, q) { const R = view.wrapR; $('.sl-rt h2', R).textContent = title; $('.sl-rt p', R).textContent = q; }
function makeApi(p) {
  const st = stOf(p);
  return {
    result(kind, html) { setResult(kind, html); },
    feedback(kind, html) { setResult(kind, html); },
    award(n) { st.score += n; renderSide(); },
    mistake(html) { st.mistakes++; setResult('bad', '✖ ' + html); renderSide(); },
    isDone: k => st.done[k],
    done(k) {
      if (st.done[k]) return; st.done[k] = true;
      if (st.done.every(Boolean) && !st.complete) { st.complete = true; st.score += 20; }
      renderSide();
    },
    refresh() { if (view && view.lab.parts[view.idx] === p) { renderGuide(); fitAll(); } }
  };
}
function stopPart() { if (view.cur && view.cur.cleanup) { try { view.cur.cleanup(); } catch (_) {} } view.cur = null; }

/* ---- start screen: lab introduction (left) + student details (right) ---- */
function showIntro() {
  stopPart(); view.idx = -1;
  const lab = view.lab, L = view.wrapL;
  $('.sl-lbody', L).innerHTML = `<div class="sl-intro"><div class="sl-instr">LAB INTRODUCTION</div>
      <h1>${esc(lab.title)}</h1><p>${esc(lab.intro)}</p>
      <h4>This lab has ${lab.parts.length} parts</h4>
      <ol class="sl-plist">${lab.parts.map((p, i) => `<li><b>Part ${i + 1}: ${esc(PARTS[p].title)}</b><span>${esc(PARTS[p].q)}</span></li>`).join('')}</ol>
      <h4>Lab objectives</h4><ul>${lab.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
      <h4>Lab outcomes</h4><ul>${lab.outcomes.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div>`;
  setHead('Student details', 'Enter your details, then click Start lab');
  setResult('', 'Fill in your <b>name</b>, <b>SID</b> and <b>grade</b>, then click <b>Start lab</b>.');
  const fit = $('.sl-fit', view.wrapR);
  fit.innerHTML = `<div class="sl-start"><h3>${esc(lab.icon)} ${esc(lab.title)}</h3><p>${esc(lab.topic)}</p>
      <div class="sl-srow"><label>Student Name<input class="sl-dark" id="sl-s-name" autocomplete="off" placeholder="Full name" value="${esc(STUDENT.name)}"></label>
        <label>SID<input class="sl-dark" id="sl-s-sid" autocomplete="off" placeholder="Student ID" value="${esc(STUDENT.sid)}"></label></div>
      <label>Grade<select class="sl-dark" id="sl-s-grade"><option value="">Select your grade</option>${GRADES.map(g => `<option${g === STUDENT.grade ? ' selected' : ''}>${g}</option>`).join('')}</select></label>
      <div class="sl-msg sl-smsg"></div>
      <button class="sl-btn sl-go" type="button">Start lab →</button>
      <p class="sl-note">Your PDF can be downloaded once at least ${PDF_MIN}% of the missions are done.</p></div>`;
  $('.sl-go', fit).addEventListener('click', startLab);
  $$('.sl-dark', fit).forEach(el => el.addEventListener('keydown', e => { if (e.key === 'Enter') startLab(); }));
  renderSide(); fitAll();
}
function startLab() {
  const fit = $('.sl-fit', view.wrapR), name = $('#sl-s-name', fit), sid = $('#sl-s-sid', fit), grade = $('#sl-s-grade', fit);
  if (!name) return;
  const miss = []; [[name, 'name'], [sid, 'SID'], [grade, 'grade']].forEach(([el, l]) => { el.classList.toggle('err', !el.value.trim()); if (!el.value.trim()) miss.push(l); });
  if (miss.length) { const m = 'Please enter your ' + miss.join(', ') + '.'; $('.sl-smsg', fit).className = 'sl-msg bad sl-smsg'; $('.sl-smsg', fit).textContent = m; setResult('bad', m); return; }
  STUDENT.name = name.value.trim(); STUDENT.sid = sid.value.trim(); STUDENT.grade = grade.value; view.started = true;
  const first = view.lab.parts.findIndex(p => !stOf(p).complete);
  showPart(first < 0 ? 0 : first);
}

function showPart(i) {
  if (!view) return;
  stopPart(); view.idx = i;
  const p = view.lab.parts[i], P = PARTS[p];
  setHead(`Part ${i + 1}: ${P.title}`, '❓ ' + P.q);
  $('.sl-lbody', view.wrapL).innerHTML = `<div class="sl-instr">INSTRUCTIONS</div>
    <div class="sl-do"><small class="sl-dot">STEP 1 — DO THIS NOW</small><div class="sl-dob"></div></div>
    <div class="sl-card"><h3>YOUR MISSION</h3><ol class="sl-steps"></ol><div class="sl-stars"><span>⭐</span><span>⭐</span><span>⭐</span></div></div>
    <div class="sl-card"><h3>KEY IDEA</h3><div class="sl-key">${P.key}</div></div>`;
  const fit = $('.sl-fit', view.wrapR); fit.innerHTML = ''; fit.style.transform = ''; fit.style.marginLeft = '';
  setResult('', 'Nothing has happened yet. Follow the <b>INSTRUCTIONS</b> on the left page.');
  view.cur = P.mount(fit, makeApi(p)) || {};
  renderSide(); fitAll();
}
function renderSide() {
  if (!view) return;
  const L = view.wrapL, lab = view.lab, s = labStats(lab), last = view.idx === lab.parts.length - 1;
  $('.sl-sc', L).textContent = s.score;
  $$('.sl-tab', L).forEach((t, i) => { t.classList.toggle('on', i === view.idx); t.classList.toggle('done', stOf(lab.parts[i]).complete); });
  $('.sl-pos', L).textContent = view.idx < 0 ? `${lab.parts.length} parts · ${s.pct}% done` : view.idx === 99 ? `Results · ${s.pct}% done` : `Part ${view.idx + 1} of ${lab.parts.length} · ${s.pct}% done`;
  $('.sl-prev', L).disabled = view.idx < 0;
  const nx = $('.sl-next', L); nx.textContent = view.idx < 0 ? 'Start lab →' : view.idx === 99 ? 'Results' : last ? 'Finish lab ✓' : 'Next part →';
  nx.disabled = view.idx === 99;
  const pdf = $('.sl-pdf', L); pdf.classList.toggle('ready', s.pct >= PDF_MIN && view.started);
  if (view.idx >= 0 && view.idx < 99) {
    const p = lab.parts[view.idx], P = PARTS[p], st = stOf(p), firstOpen = st.done.indexOf(false);
    $('.sl-steps', L).innerHTML = P.steps.map((x, i) => `<li class="${st.done[i] ? 'ok' : ''}${i === firstOpen ? ' now' : ''}"><i>${st.done[i] ? '✓' : ''}</i><span>${x}</span></li>`).join('');
    const n = st.complete ? starsOf(st) : 0; $$('.sl-stars span', L).forEach((x, i) => x.classList.toggle('on', i < n));
    nx.classList.toggle('pulse', st.complete);
    renderGuide();
  }
  fitAll();
}
function renderGuide() {
  if (!view || !view.cur || view.idx < 0 || view.idx === 99) return;
  const L = view.wrapL, p = view.lab.parts[view.idx], P = PARTS[p], st = stOf(p), k = st.done.indexOf(false);
  const box = $('.sl-do', L), head = $('.sl-dot', L), b = $('.sl-dob', L); if (!box) return;
  if (k < 0) {
    box.classList.add('fin'); head.textContent = `PART ${view.idx + 1} COMPLETE ${'⭐'.repeat(starsOf(st))}`;
    const last = view.idx === view.lab.parts.length - 1;
    b.innerHTML = last ? 'All missions in this part are done. Click <b>Finish lab ✓</b> at the bottom of this page to see your results and download your PDF.' : `All missions in this part are done. Click <b>Next part →</b> at the bottom of this page to start <b>Part ${view.idx + 2}: ${esc(PARTS[view.lab.parts[view.idx + 1]].title)}</b>.`;
    return;
  }
  box.classList.remove('fin'); head.textContent = `STEP ${k + 1} OF ${P.steps.length} — DO THIS NOW`;
  const html = view.cur.guide ? view.cur.guide(k) : '';
  if (b.innerHTML !== html) { b.innerHTML = html; fitAll(); }
}
function showResults() {
  if (!view) return;
  stopPart(); view.idx = 99;
  const lab = view.lab, s = labStats(lab);
  setHead(lab.title + ' — results', lab.topic);
  $('.sl-lbody', view.wrapL).innerHTML = `<div class="sl-instr">INSTRUCTIONS</div>
    <div class="sl-do fin"><small class="sl-dot">LAB RESULTS</small><div class="sl-dob">Your results are on the right page.<ul>
      <li>Click <b>📄 PDF</b> at the bottom to download your work${s.pct < PDF_MIN ? ` — you need at least <b>${PDF_MIN}%</b> (now ${s.pct}%)` : ''}.</li>
      <li>Click a <b>Part</b> button at the top to finish or improve a part.</li><li>Click <b>WEEKS HOME</b> to go back.</li></ul></div></div>`;
  const fit = $('.sl-fit', view.wrapR); fit.style.transform = ''; fit.style.marginLeft = '';
  fit.innerHTML = `<div class="sl-res"><div class="big">🏆</div><h2>${lab.parts.every(q => stOf(q).complete) ? 'Lab complete!' : 'Lab not finished yet'}</h2>
    <p>${esc(STUDENT.name)} · SID ${esc(STUDENT.sid)} · ${esc(STUDENT.grade)}</p>
    <p>Score <b style="color:#EA580C">${s.score}</b> · Missions done <b>${s.done}/${s.total}</b> (${s.pct}%)</p>
    <table>${lab.parts.map((q, i) => `<tr><td>Part ${i + 1}: ${esc(PARTS[q].title)}</td><td>${stOf(q).complete ? '⭐'.repeat(starsOf(stOf(q))) : `${stOf(q).done.filter(Boolean).length}/${stOf(q).done.length} missions`}</td></tr>`).join('')}</table>
    <div class="sl-row" style="justify-content:center"><button class="sl-btn ghost sl-again" type="button">Back to Part 1</button><button class="sl-btn sl-pdf2" type="button">📄 Download PDF</button></div></div>`;
  $('.sl-again', fit).addEventListener('click', () => showPart(0));
  $('.sl-pdf2', fit).addEventListener('click', downloadPdf);
  setResult(s.pct >= PDF_MIN ? 'good' : '', `Lab finished — score <b>${s.score}</b>, <b>${s.pct}%</b> of missions done.`);
  renderSide(); fitAll();
}

/* ---- PDF: student details + every activity and mission ---- */
function loadJsPdf() {
  if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve();
  return new Promise((res, rej) => { const s = document.createElement('script'); s.src = JSPDF_URL; s.onload = res; s.onerror = () => rej(new Error('offline')); document.head.appendChild(s); });
}
async function downloadPdf() {
  if (!view) return;
  const lab = view.lab, s = labStats(lab);
  if (!view.started) { setResult('bad', 'Enter your details and click <b>Start lab</b> first.'); return; }
  if (s.pct < PDF_MIN) { setResult('bad', `The PDF unlocks at <b>${PDF_MIN}%</b>. You have done <b>${s.pct}%</b> of the missions (${s.done} of ${s.total}). Keep going!`); return; }
  try { await loadJsPdf(); } catch (_) { setResult('bad', 'The PDF tool needs an internet connection. Please connect and try again.'); return; }
  const J = window.jspdf.jsPDF, doc = new J({ unit: 'mm', format: 'a4' }), W = 210, H = 297, M = 16, CW = W - 2 * M, BOT = H - 18;
  const INK = [26, 34, 51], MUT = [91, 101, 121], GRN = [21, 128, 61], RED = [185, 28, 28], ACC = [37, 99, 235];
  let y = 0;
  const clean = t => String(t).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-').replace(/→/g, '->').replace(/[^\x20-\x7E]/g, '');
  const font = (sz, st, c) => { doc.setFontSize(sz); doc.setFont('helvetica', st); doc.setTextColor(c[0], c[1], c[2]); };
  const need = h => { if (y + h > BOT) { doc.addPage(); y = 18; } };
  const now = new Date(), when = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  doc.setFillColor(INK[0], INK[1], INK[2]); doc.rect(0, 0, W, 38, 'F');
  font(9, 'normal', [174, 184, 204]); doc.text(clean(lab.meta || ('Week ' + lab.week)), M, 12);
  font(22, 'bold', [255, 255, 255]); doc.text(clean(`WEEK ${lab.week} LAB ${view.labNo}: ${lab.title}`), M, 24);
  font(11, 'normal', [227, 232, 242]); doc.text(clean(lab.topic), M, 32);
  y = 46; doc.setFillColor(241, 243, 247); doc.roundedRect(M, y, CW, 30, 3, 3, 'F');
  const cx = [M + 5, M + CW * 0.55, M + CW * 0.78];
  [['Name', STUDENT.name], ['SID', STUDENT.sid], ['Grade', STUDENT.grade]].forEach((kv, i) => { font(8, 'normal', MUT); doc.text(kv[0], cx[i], y + 7); font(11, 'bold', INK); doc.text(doc.splitTextToSize(clean(kv[1]), i ? CW * 0.2 : CW * 0.48)[0] || '', cx[i], y + 13); });
  font(8, 'normal', MUT); doc.text('Downloaded', cx[0], y + 21); font(10, 'normal', INK); doc.text(clean(when), cx[0], y + 26.5);
  font(8, 'normal', MUT); doc.text('Missions done', cx[1], y + 21); font(12, 'bold', ACC); doc.text(`${s.done} / ${s.total} (${s.pct}%)`, cx[1], y + 26.5);
  font(8, 'normal', MUT); doc.text('Score', cx[2], y + 21); font(12, 'bold', ACC); doc.text(String(s.score), cx[2], y + 26.5);
  y += 40;
  lab.parts.forEach((p, i) => {
    const P = PARTS[p], st = stOf(p), got = st.done.filter(Boolean).length;
    need(30);
    doc.setFillColor(ACC[0], ACC[1], ACC[2]); doc.rect(M, y - 5, 2, 9, 'F');
    font(13, 'bold', INK); doc.text(clean(`Part ${i + 1}: ${P.title}`), M + 5, y + 1);
    font(9, 'bold', st.complete ? GRN : MUT); doc.text(st.complete ? `Complete - ${starsOf(st)} of 3 stars` : `${got} of ${st.done.length} missions`, M + CW, y + 1, { align: 'right' });
    y += 7; font(9.5, 'italic', MUT); const ql = doc.splitTextToSize(clean('Question: ' + P.q), CW - 5); doc.text(ql, M + 5, y); y += ql.length * 4.5 + 2;
    P.steps.forEach((step, k) => {
      const ok = st.done[k], col = ok ? GRN : RED, lines = doc.splitTextToSize(clean(step), CW - 32);
      need(lines.length * 4.6 + 2);
      doc.setFillColor(col[0], col[1], col[2]); doc.circle(M + 6.5, y - 1.2, 1.1, 'F');
      font(10, 'normal', INK); doc.text(lines, M + 10, y);
      font(8.5, 'bold', col); doc.text(ok ? 'Done' : 'Not done', M + CW, y, { align: 'right' });
      y += lines.length * 4.6 + 1.6;
    });
    font(9, 'normal', MUT); need(6); doc.text(`Points: ${st.score}    Mistakes: ${st.mistakes}`, M + 10, y + 1); y += 10;
  });
  const n = doc.getNumberOfPages();
  for (let i = 1; i <= n; i++) { doc.setPage(i); font(8, 'normal', MUT); doc.text(clean(`${lab.title}  |  ${STUDENT.name}  |  SID ${STUDENT.sid}`), M, H - 9); doc.text('Page ' + i + ' of ' + n, W - M, H - 9, { align: 'right' }); }
  const safe = v => clean(v).replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '');
  doc.save(`WK${lab.week}_LAB${view.labNo}_${safe(STUDENT.name) || 'Student'}_${safe(STUDENT.sid)}.pdf`);
  setResult('good', 'Your PDF was downloaded.');
}

window.G11SimEngine = {
  labsForWeek: w => SIM_LABS.filter(l => +l.week === +w).map(l => ({ id: l.id, icon: l.icon, title: l.title })),
  has: id => SIM_LABS.some(l => l.id === id),
  open, close, isOpen: () => !!view, currentId: () => view ? view.lab.id : null,
  PARTS, SIM_LABS
};
})();
