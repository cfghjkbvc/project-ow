import { FONT_CSS } from "../config.js";

/* ================================ CSS ================================= */

const CSS = FONT_CSS + `
.ow{
  /* The field is a deep navy rather than the cobalt ink itself, so cobalt
     stays usable as a role colour and the cream cards read as cards. */
  --teal:#16224A; --teal-d:#101838; --teal-l:#22326B;
  --bone:#F7EBCF; --bone-d:#E5D4AE; --ink:#111111;
  --marigold:#F5C61E; --ember:#EE7B24; --vermilion:#EE3124;
  --celadon:#B9DFC8; --olive:#B9DFC8; --oxblood:#3D63C4;
  --hair:rgba(247,235,207,.24); --muted:rgba(247,235,207,.74);
  --f-fat:'Abril Fatface',Georgia,serif;
  --f-serif:'Bodoni Moda Variable','Bodoni Moda',Georgia,serif;
  --f-ui:'Jost Variable','Jost',system-ui,sans-serif;
  position:relative; min-height:100svh; background:var(--teal); color:var(--bone);
  font-family:var(--f-ui); -webkit-font-smoothing:antialiased; overflow:hidden;
}
.ow *{box-sizing:border-box; margin:0;}
/* Images must never offer the iOS copy/save sheet on a long press — the reveal
   gesture IS a long press, so the two collide. pointer-events:none passes the
   touch through to the card and the carousel underneath. */
/* Nothing in the app is selectable text — a long press is the reveal gesture,
   and a finger that drifts off the card would otherwise start highlighting
   the hint line and the button underneath it. */
.ow, .ow *{user-select:none; -webkit-user-select:none;}
.ow input, .ow textarea{user-select:text; -webkit-user-select:text;}
.ow img{-webkit-user-drag:none; user-select:none; -webkit-user-select:none;
  -webkit-touch-callout:none; pointer-events:none;}
/* svh, not dvh: dvh changes as the browser toolbar hides and shows, which
   makes a fixed frame drift and lets content sit outside it. svh is the
   smallest viewport and never moves. */
.ow-frame{position:fixed; top:8px; left:8px; right:8px; height:calc(100svh - 16px);
  pointer-events:none; z-index:3; border:1px solid var(--hair);}
.ow-frame i{position:absolute; width:12px; height:12px; border:1px solid rgba(243,235,215,.45);}
.ow-frame i:nth-child(1){top:-1px; left:-1px; border-right:0; border-bottom:0;}
.ow-frame i:nth-child(2){top:-1px; right:-1px; border-left:0; border-bottom:0;}
.ow-frame i:nth-child(3){bottom:-1px; left:-1px; border-right:0; border-top:0;}
.ow-frame i:nth-child(4){bottom:-1px; right:-1px; border-left:0; border-top:0;}
.ow-shell{position:relative; z-index:2; max-width:440px; margin:0 auto; min-height:100svh;
  max-height:100svh;
  display:flex; flex-direction:column; padding:24px 22px calc(22px + env(safe-area-inset-bottom));}

.ow .fat{font-family:var(--f-fat);}
.ow .serif{font-family:var(--f-serif); font-weight:600;}
.ow .eyebrow{font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--marigold); font-weight:500;}
.ow .sr-only{position:absolute; width:1px; height:1px; padding:0; overflow:hidden;
  clip:rect(0 0 0 0); clip-path:inset(50%); white-space:nowrap; border:0;}
.ow .tap{min-height:44px; display:inline-flex; align-items:center; padding:0 4px;}
.ow .quiet{color:var(--muted); font-size:13.5px; line-height:1.55;}
.ow .rule-dbl{height:4px; margin:16px 0; border-top:1px solid var(--hair); border-bottom:1px solid var(--hair);}
.ow .scroll{overflow-y:auto; -webkit-overflow-scrolling:touch;}
.ow .rise{animation:ow-rise .4s cubic-bezier(.2,.7,.3,1) both;}

.ow button{font-family:inherit; cursor:pointer; border:none; background:none; color:inherit;}
.ow .btn{position:relative; width:100%; padding:16px 34px; border-radius:0;
  font-family:var(--f-serif); font-weight:800; font-size:13px; letter-spacing:.2em; text-transform:uppercase;
  background:var(--bone); color:var(--ink); border:2px solid var(--ink);
  box-shadow:inset 0 0 0 3px var(--bone), inset 0 0 0 4px var(--ink);
  transition:background .08s linear, color .08s linear;}
.ow .btn b{position:absolute; top:50%; width:6px; height:6px; background:currentColor;
  transform:translateY(-50%) rotate(45deg);}
.ow .btn b:first-of-type{left:14px;} .ow .btn b:last-of-type{right:14px;}
.ow .btn:active{background:var(--ink); color:var(--bone);
  box-shadow:inset 0 0 0 3px var(--ink), inset 0 0 0 4px var(--bone);}
.ow .btn:disabled{opacity:.34; cursor:not-allowed;}
.ow .btn-ghost{background:var(--teal-l); color:var(--bone); border-color:var(--bone);
  box-shadow:inset 0 0 0 3px var(--teal-l), inset 0 0 0 4px var(--bone);}
.ow .btn-ghost:active{background:var(--bone); color:var(--ink);
  box-shadow:inset 0 0 0 3px var(--bone), inset 0 0 0 4px var(--ink);}
.ow .btn-danger{background:var(--vermilion); color:var(--bone); border-color:var(--ink);
  box-shadow:inset 0 0 0 3px var(--vermilion), inset 0 0 0 4px var(--bone);}
.ow .btn-sm{padding:11px 26px; font-size:11px; letter-spacing:.16em;}
.ow :focus-visible{outline:2px solid var(--marigold); outline-offset:3px;}

.ow .row{display:flex; align-items:center; gap:12px; padding:12px 14px; border-radius:0;
  background:var(--teal-l); border:1px solid var(--hair); width:100%; text-align:left;}
.ow .row-on{border-color:var(--marigold);}
.ow .row-off .nm{opacity:.45;}
.ow .num{font-family:var(--f-serif); font-weight:600; font-size:12px; color:var(--marigold); min-width:26px;}
.ow .nm{font-family:var(--f-serif); font-weight:600; font-size:19px;}
.ow .x{margin-left:auto; color:var(--muted); font-size:19px; line-height:1;
  min-width:44px; min-height:44px; margin-right:-10px;}
.ow .pts{font-family:var(--f-serif); font-weight:800; font-size:19px; color:var(--marigold);}
.ow .dead{opacity:.34;} .ow .dead .nm{text-decoration:line-through;}
.ow .tick{width:44px; height:44px; flex:none; margin:-11px 0 -11px -10px;
  display:flex; align-items:center; justify-content:center;}
.ow .tick::before{content:""; width:18px; height:18px; border:1px solid var(--bone); display:block;}
.ow .tick[data-on="1"]::before{background:var(--marigold); border-color:var(--marigold);}

.ow .tabs{display:flex; gap:24px; border-bottom:1px solid var(--hair);}
.ow .tabs button{padding:0 0 10px; font-size:11px; letter-spacing:.2em; text-transform:uppercase;
  color:var(--muted); border-bottom:2px solid transparent; margin-bottom:-1px;}
.ow .tabs button[data-on="1"]{color:var(--bone); border-bottom-color:var(--marigold);}
.ow .seg{display:flex; border:1px solid var(--hair);}
.ow .seg button{min-height:44px;}
.ow .seg button{flex:1; padding:12px 6px; font-size:11px; letter-spacing:.13em; text-transform:uppercase;
  color:var(--muted); border-right:1px solid var(--hair); background:var(--teal-l);}
.ow .seg button:last-child{border-right:0;}
.ow .seg button[data-on="1"]{background:var(--bone); color:var(--ink); font-weight:500;}

.ow .field{width:100%; padding:14px; border-radius:0; background:var(--bone);
  border:2px solid var(--ink); color:var(--ink); font-size:18px; font-family:var(--f-serif); font-weight:600;}
.ow .field::placeholder{color:rgba(23,18,14,.4); font-family:var(--f-ui); font-size:14px; font-weight:400;}
.ow .err{color:var(--marigold); font-size:12.5px; margin-top:8px;}

.ow .chip{display:inline-block; padding:5px 10px; border-radius:0; font-size:9.5px;
  letter-spacing:.16em; text-transform:uppercase; font-weight:500; border:1px solid var(--ink);}

.ow .stage{flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:14px; perspective:1600px; padding:12px 0;}
.ow .card-wrap{width:min(100%, 380px, calc(62svh * 0.676)); container-type:inline-size;
  animation:ow-rise-in .44s cubic-bezier(.2,.75,.3,1) both;}
/* The deck the top card lifts off. The stub count is how many players are
   still to be dealt, so the flourish also tells you how far through you are.
   Straight down and tapering, never sideways — the card rises vertically, so a
   diagonal deck fights the motion. */
.ow .stack{position:relative; width:100%;}
.ow .stub{position:absolute; inset:0; border-radius:5px; background:var(--bone);
  border:2px solid var(--ink); box-shadow:0 6px 14px rgba(0,0,0,.3); z-index:0;
  transform-origin:center top;}
.ow .riser{position:relative; z-index:1; animation:ow-lift .46s cubic-bezier(.18,.8,.28,1) both;}
.ow .float{animation:ow-float 7s ease-in-out infinite;}
.ow .card{width:100%; aspect-ratio:5/7.4; position:relative; transform-style:preserve-3d;
  transition:transform .42s cubic-bezier(.45,.05,.55,.95); will-change:transform;
  user-select:none; -webkit-user-select:none; -webkit-touch-callout:none; touch-action:none;}
.ow .card[data-open="1"]{transform:rotateY(180deg);}
.ow .face{position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden;
  overflow:hidden; display:flex; flex-direction:column; align-items:center;
  background:var(--bone); border:2px solid var(--ink); padding:9px; box-shadow:0 14px 34px rgba(0,0,0,.45);
  transition:opacity 0s linear .21s;}
/* backface-visibility alone is unreliable once a face has overflow and a
   shadow, so the hidden face is also switched off. The easing is symmetric
   so 90 degrees falls at exactly half the duration — an asymmetric curve
   reaches edge-on far earlier and the swap reads as a hard cut. */
.ow .back{transform:translateZ(1px);}
.ow .front{transform:rotateY(180deg) translateZ(1px);}
.ow .card[data-open="0"] .front{opacity:0;}
.ow .card[data-open="1"] .back{opacity:0;}
.ow .panel{position:relative; width:100%; aspect-ratio:1; flex:none; background:var(--bone);
  border:1px solid var(--ink); display:flex; align-items:center; justify-content:center; overflow:hidden;}
.ow .panel-full{position:absolute; inset:0; aspect-ratio:auto; width:auto; height:auto;}
.ow .panel img{width:100%; height:100%; object-fit:cover; display:block;}
.ow .panel .line{width:62%; max-width:170px; color:var(--ink);}
.ow .lattice{position:absolute; inset:0; width:100%; height:100%; display:block;}
.ow .plate{position:absolute; top:-1px; left:50%; transform:translateX(-50%); z-index:2;
  background:var(--bone); border:1px solid var(--ink); border-top:0; padding:3px 13px 4px;
  font-family:var(--f-serif); font-weight:800; font-size:13px; letter-spacing:.14em; color:var(--ink);}
.ow .banner{width:100%; flex:1; background:var(--bone); padding:8px 4px 4px; text-align:center;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px;}
.ow .banner .word{font-family:var(--f-fat); color:var(--ink); text-transform:uppercase;
  font-size:clamp(22px,8vw,34px); line-height:1; letter-spacing:.01em; word-break:break-word;}
.ow .banner .word{font-size:clamp(21px,13.5cqw,40px);}
.ow .banner .note{font-family:var(--f-ui); font-size:10px; line-height:1.4;
  color:rgba(23,18,14,.72); padding:0 6px;}
.ow .banner .note{font-size:clamp(9px,3.6cqw,11px);}

/* One inverted plate on every card, so the shape carries no information.
   Only the words and the title colour differ — and civilian and impostor
   share both of those. */
.ow .roleplate{width:100%; border:1.5px solid var(--ink); padding:5px 7px 6px;
  background:var(--ink); color:var(--bone);}
.ow .rp-title{font-family:var(--f-fat); text-transform:uppercase; letter-spacing:.04em;
  font-size:clamp(11px,4.8cqw,16px); line-height:1.1;}
.ow .rp-note{font-family:var(--f-ui); line-height:1.35; opacity:.85; margin-top:2px;
  font-size:clamp(8.5px,3.4cqw,10.5px);}
.ow .who{font-family:var(--f-serif); font-weight:600; font-size:10px; letter-spacing:.22em;
  text-transform:uppercase; color:rgba(23,18,14,.6); padding:3px 0 5px;}
.ow .sheen{position:absolute; top:0; bottom:0; width:44%; z-index:3; pointer-events:none;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.6),transparent);}
.ow .card[data-open="1"] .sheen{animation:ow-sheen 1s .1s ease-out both;}
.ow .card[data-open="0"] .sheen{opacity:0;}
.ow .back{justify-content:center;}
.ow .back .stamp{position:absolute; z-index:1; background:var(--bone); border:1px solid var(--ink);
  padding:16px 24px; text-align:center;}

.ow .reveal{width:228px; background:var(--bone); border:2px solid var(--ink); padding:8px;
  box-shadow:0 14px 32px rgba(0,0,0,.45); animation:ow-turn .55s cubic-bezier(.2,.8,.3,1) both;}
.ow .reveal .pane{position:relative; background:var(--bone); border:1px solid var(--ink);
  padding:20px 10px 16px; display:flex; align-items:center; justify-content:center;}
.ow .reveal .sig{width:96px;}
.ow .reveal .cap{font-family:var(--f-fat); text-transform:uppercase; color:var(--ink);
  font-size:22px; padding:8px 2px 3px; text-align:center;}
.ow .reveal-img{display:block; width:238px; height:auto; padding:0; border:0; border-radius:6px;
  box-shadow:0 14px 32px rgba(0,0,0,.45); animation:ow-turn .55s cubic-bezier(.2,.8,.3,1) both;}

/* Role carousel. Native scroll-snap, with the track padded by half a card so
   the first and last can actually reach the centre. */
.ow .carou{display:flex; gap:14px; margin-top:14px; overflow-x:auto; overscroll-behavior-x:contain;
  scroll-snap-type:x mandatory; padding:6px calc(50% - 106px) 12px;
  scrollbar-width:none; -ms-overflow-style:none; -webkit-overflow-scrolling:touch;}
.ow .carou::-webkit-scrollbar{display:none;}
.ow .rolecard{flex:0 0 212px; width:212px; scroll-snap-align:center;}
.ow .rolecard .turn-static,.ow .rolecard img{width:100%; animation:none;}
.ow .carou .dot{width:8px; height:8px; padding:0; transform:rotate(45deg);}
.ow .mini{flex:1; background:var(--bone); border:2px solid var(--ink); padding:9px 8px 7px; text-align:center;}
.ow .mini .k{font-family:var(--f-ui); font-size:8.5px; letter-spacing:.2em; text-transform:uppercase; color:rgba(23,18,14,.6);}
.ow .mini .v{font-family:var(--f-fat); text-transform:uppercase; color:var(--ink); font-size:19px; margin-top:4px;}

/* The public role card, turned rather than faded in.

   The rise animation MUST live on a wrapper, not on .turn itself. An animation
   with fill-mode:both keeps its final transform applied forever, and animated
   values beat normal declarations in the cascade — so rotateY(180deg) was being
   silently overridden and the card only ever cross-faded. Perspective has to
   move onto the wrapper too, since it only applies to direct children. */
.ow .turnwrap{perspective:1200px; animation:ow-rise-in .4s cubic-bezier(.2,.75,.3,1) both;}
.ow .turn{position:relative; width:min(236px, calc(46svh * 0.63)); aspect-ratio:5/7.9;
  transform-style:preserve-3d; will-change:transform;
  transition:transform .55s cubic-bezier(.45,.05,.55,.95);}
.ow .turn[data-open="1"]{transform:rotateY(180deg);}
.ow .tface{position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden;
  overflow:hidden; border-radius:5px; background:var(--bone); border:2px solid var(--ink);
  box-shadow:0 16px 34px rgba(0,0,0,.5); transition:opacity 0s linear .28s;}
.ow .tback{transform:translateZ(1px); padding:8px; display:flex;}
.ow .tback .lattice{position:relative; flex:1; border:1px solid var(--ink);}
.ow .tfront{transform:rotateY(180deg) translateZ(1px); border:0; background:none;}
.ow .turn[data-open="0"] .tfront{opacity:0;}
.ow .turn[data-open="1"] .tback{opacity:0;}
.ow .turn-img{display:block; width:100%; height:100%; object-fit:cover; border-radius:4px;}
.ow .turn-static{width:100%;}
.ow .turn-static img{display:block; width:100%; height:auto; border-radius:5px;
  box-shadow:0 12px 26px rgba(0,0,0,.45);}
.ow .turn-static .turn-fallback{height:auto; aspect-ratio:5/7.9;
  box-shadow:0 12px 26px rgba(0,0,0,.45);}
.ow .turn-fallback{width:100%; height:100%; background:var(--bone); border:2px solid var(--ink);
  border-radius:5px; padding:8px; display:flex; flex-direction:column;}
.ow .turn-fallback .pane{flex:1; background:var(--bone); border:1px solid var(--ink);
  display:flex; align-items:center; justify-content:center;}
.ow .turn-fallback .sig{width:58%; max-width:110px;}
.ow .turn-fallback .cap{font-family:var(--f-fat); text-transform:uppercase; color:var(--ink);
  font-size:19px; padding:7px 2px 2px; text-align:center;}

/* Board: pips and the round marker. */
.ow .pips{display:flex; gap:6px; justify-content:center; padding:14px 0 4px;}
.ow .pip{width:7px; height:7px; transform:rotate(45deg); border:1px solid var(--bone); opacity:.5;}
.ow .pip[data-on="1"]{background:var(--marigold); border-color:var(--marigold); opacity:1;}
.ow .starts{margin-left:auto; font-size:9.5px; letter-spacing:.16em; text-transform:uppercase;
  color:var(--ink); background:var(--marigold); border:1px solid var(--ink); padding:4px 9px;}

/* A player out of the round is a card turned face down. */
.ow .row-down{position:relative; overflow:hidden; border-color:var(--ink); background:var(--bone);}
.ow .row-down .num{position:relative; z-index:1; color:var(--ink);}
.ow .row-down .nm{position:relative; z-index:1; background:var(--bone); color:var(--ink);
  padding:1px 9px 2px; border:1px solid var(--ink); font-size:17px;}

/* Role facts: a fixed four-part shape so the roles are comparable. */
.ow .facts{display:grid; grid-template-columns:auto 1fr; gap:7px 13px; margin-top:14px;
  text-align:left; max-width:330px; margin-left:auto; margin-right:auto;}
.ow .facts dt{font-size:9.5px; letter-spacing:.18em; text-transform:uppercase;
  color:var(--marigold); padding-top:3px; white-space:nowrap;}
.ow .facts dd{margin:0; font-size:13px; line-height:1.5; color:var(--bone);}
.ow .example{background:var(--teal-l); border:1px solid var(--hair); padding:15px 16px; margin-top:13px;}
.ow .example p{font-size:13px; line-height:1.65; color:var(--muted);}
.ow .example p + p{margin-top:7px;}
.ow .example b{color:var(--bone); font-weight:500;}
.ow .example .w{font-family:var(--f-fat); color:var(--marigold); font-size:15px;
  text-transform:uppercase; letter-spacing:.02em;}

.ow .sheet{position:fixed; inset:0; background:rgba(9,20,22,.82); display:flex; z-index:30;
  align-items:flex-end; justify-content:center; padding:16px; animation:ow-fade .18s ease both;}
.ow .sheet-in{width:100%; max-width:440px; background:var(--teal-l); border:2px solid var(--bone);
  padding:22px; animation:ow-up .26s cubic-bezier(.2,.8,.3,1) both; max-height:86svh; overflow-y:auto;}
.ow .toast{position:fixed; left:50%; bottom:26px; transform:translateX(-50%); z-index:40;
  background:var(--bone); color:var(--ink); border:2px solid var(--ink); padding:11px 20px;
  font-size:12px; letter-spacing:.14em; text-transform:uppercase; animation:ow-up .2s ease both;}

@keyframes ow-rise-in{from{opacity:0; transform:translateY(26px);} to{opacity:1; transform:none;}}
/* A card lifted off a deck: up, slight overshoot, settle. No rotation — that
   read as a web animation rather than a hand dealing. */
@keyframes ow-lift{0%{transform:translateY(34px);} 62%{transform:translateY(-5px);} 100%{transform:translateY(0);}}
@keyframes ow-float{0%,100%{transform:translateY(0) rotate(-.4deg);} 50%{transform:translateY(-6px) rotate(.4deg);}}
@keyframes ow-sheen{from{transform:translateX(-130%) skewX(-14deg);} to{transform:translateX(240%) skewX(-14deg);}}
@keyframes ow-rise{from{opacity:0; transform:translateY(9px);} to{opacity:1; transform:none;}}
@keyframes ow-turn{from{opacity:0; transform:rotateY(-88deg) scale(.9);} to{opacity:1; transform:none;}}
@keyframes ow-fade{from{opacity:0;} to{opacity:1;}}
@keyframes ow-up{from{opacity:0; transform:translateY(22px);} to{opacity:1; transform:none;}}
@media (max-height:700px){
  .ow-shell{padding:14px 18px calc(14px + env(safe-area-inset-bottom));}
  .ow .stage{gap:10px; padding:6px 0;}
  .ow .btn{padding:13px 34px;}
}

/* On a laptop the 440px column stranded in the middle of a huge navy field
   reads as a broken page. Standing it up as a bounded card on the table
   makes the same layout look deliberate. */
@media (min-width:760px){
  .ow{display:flex; align-items:center; justify-content:center; padding:28px 0;}
  .ow-frame{display:none;}
  .ow-shell{width:440px; min-height:0; max-height:none; height:min(900px, calc(100svh - 56px));
    background:var(--teal-d); border:1px solid var(--hair);
    box-shadow:0 28px 70px rgba(0,0,0,.5); padding:26px 24px;}
  .ow-shell::before,.ow-shell::after{content:''; position:absolute; width:13px; height:13px;
    border:1px solid rgba(247,235,207,.45); pointer-events:none;}
  .ow-shell::before{top:7px; left:7px; border-right:0; border-bottom:0;}
  .ow-shell::after{bottom:7px; right:7px; border-left:0; border-top:0;}
}
@media (prefers-reduced-motion:reduce){.ow *,.ow *::before,.ow *::after{animation:none !important; transition:none !important;}}
`;

export { CSS };
