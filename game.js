
let themeId=null, pool=[], answer="", guessed=new Set(), wrong=0, maxWrong=6, celebrating=false;
const $=s=>document.querySelector(s);
const home=$("#home"), game=$("#game"), customSetup=$("#customSetup"), grid=$("#themeGrid"), kb=$("#keyboard");

function scaffold(inner){
 return `<svg viewBox="0 0 420 430" aria-label="Cute hangman illustration">
 <line class="wood" x1="55" y1="390" x2="180" y2="390"/><line class="wood" x1="105" y1="390" x2="105" y2="45"/>
 <line class="wood" x1="105" y1="50" x2="300" y2="50"/><line class="wood" x1="105" y1="115" x2="170" y2="50"/>
 <line class="rope" x1="295" y1="55" x2="295" y2="105"/><path d="M276 105 Q295 130 314 105" fill="none" class="rope"/>
 ${inner}</svg>`;
}
const S=(n,x)=>`<g class="stage" data-stage="${n}">${x}</g>`;
function face(cx,cy){return `<circle cx="${cx-13}" cy="${cy}" r="4" fill="#4c413a"/><circle cx="${cx+13}" cy="${cy}" r="4" fill="#4c413a"/><path d="M${cx-12} ${cy+16} Q${cx} ${cy+26} ${cx+12} ${cy+16}" fill="none" class="outline"/>`}
function art(type){
 if(type==="snowman") return scaffold(
  S(1,`<circle cx="295" cy="315" r="68" fill="#fff" class="outline"/>`)+
  S(2,`<circle cx="295" cy="225" r="55" fill="#fff" class="outline"/>`)+
  S(3,`<circle cx="295" cy="145" r="46" fill="#fff" class="outline"/>`)+
  S(4,`<path d="M245 225 L200 195 M345 225 L385 190" fill="none" stroke="#78583f" stroke-width="8" stroke-linecap="round"/>`)+
  S(5,face(295,145)+`<path d="M295 153 l34 8 -34 8z" fill="#e99049"/><circle cx="295" cy="215" r="5"/><circle cx="295" cy="235" r="5"/>`)+
  S(6,`<rect x="252" y="105" width="86" height="13" rx="5" fill="#5f806e"/><rect x="266" y="70" width="58" height="40" rx="7" fill="#5f806e"/><path d="M248 183 Q295 200 343 183" fill="none" stroke="#d47b72" stroke-width="15"/><path d="M330 188 l20 48" stroke="#d47b72" stroke-width="14"/>`));
 if(type==="gingerbread") return scaffold(
  S(1,`<circle cx="295" cy="155" r="48" fill="#bd7a48" class="outline"/>`)+
  S(2,`<rect x="250" y="195" width="90" height="112" rx="42" fill="#bd7a48" class="outline"/>`)+
  S(3,`<path d="M258 220 L205 260" stroke="#bd7a48" stroke-width="32" stroke-linecap="round" class="outline"/><path d="M332 220 L385 260" stroke="#bd7a48" stroke-width="32" stroke-linecap="round" class="outline"/>`)+
  S(4,`<path d="M270 292 L245 365" stroke="#bd7a48" stroke-width="34" stroke-linecap="round" class="outline"/><path d="M320 292 L345 365" stroke="#bd7a48" stroke-width="34" stroke-linecap="round" class="outline"/>`)+
  S(5,face(295,150)+`<circle cx="295" cy="225" r="7" fill="#d85858"/><circle cx="295" cy="255" r="7" fill="#6a9c77"/>`)+
  S(6,`<path d="M260 185 Q295 205 330 185" fill="none" stroke="#fff5e8" stroke-width="8"/><path d="M225 250 q12 12 24 0 M341 250 q12 12 24 0 M240 345 q12 12 24 0 M326 345 q12 12 24 0" fill="none" stroke="#fff5e8" stroke-width="7"/>`));
 if(type==="ghost") return scaffold(
  S(1,`<circle cx="295" cy="170" r="62" fill="#fff" class="outline"/>`)+
  S(2,`<path d="M235 170 L235 320 Q250 290 265 320 Q280 290 295 320 Q310 290 325 320 Q340 290 355 320 L355 170Z" fill="#fff" class="outline"/>`)+
  S(3,`<path d="M240 215 Q195 235 210 275" fill="none" stroke="#fff" stroke-width="30" stroke-linecap="round" class="outline"/>`)+
  S(4,`<path d="M350 215 Q390 235 375 275" fill="none" stroke="#fff" stroke-width="30" stroke-linecap="round" class="outline"/>`)+
  S(5,face(295,165))+S(6,`<path d="M245 115 Q295 75 345 115" fill="#8b6aaa" class="outline"/><rect x="245" y="110" width="100" height="14" rx="7" fill="#8b6aaa"/>`));
 if(type==="turkey") return scaffold(
  S(1,`<circle cx="295" cy="260" r="68" fill="#9a633e" class="outline"/>`)+
  S(2,`<circle cx="295" cy="170" r="43" fill="#9a633e" class="outline"/>`)+
  S(3,`<circle cx="230" cy="250" r="48" fill="#d99b55" class="outline"/><circle cx="360" cy="250" r="48" fill="#c87355" class="outline"/><circle cx="245" cy="210" r="48" fill="#d4b45d" class="outline"/><circle cx="345" cy="210" r="48" fill="#d98a4d" class="outline"/>`)+
  S(4,`<path d="M275 320 l-15 55 M315 320 l15 55" stroke="#c17a43" stroke-width="8"/><path d="M245 375 h30 M315 375 h30" stroke="#c17a43" stroke-width="8"/>`)+
  S(5,face(295,165)+`<path d="M295 175 l25 12 -25 12z" fill="#e9a33f"/>`)+S(6,`<path d="M315 187 q20 20 4 38" fill="none" stroke="#c74e4e" stroke-width="8"/>`));
 if(type==="heart") return scaffold(
  S(1,`<path d="M295 330 C220 270 205 205 240 180 C270 158 295 185 295 205 C295 185 320 158 350 180 C385 205 370 270 295 330Z" fill="#e58aa2" class="outline"/>`)+
  S(2,`<path d="M245 240 L205 280" stroke="#e58aa2" stroke-width="22" stroke-linecap="round" class="outline"/>`)+
  S(3,`<path d="M345 240 L385 280" stroke="#e58aa2" stroke-width="22" stroke-linecap="round" class="outline"/>`)+
  S(4,`<path d="M275 315 L255 370 M315 315 L335 370" stroke="#e58aa2" stroke-width="20" stroke-linecap="round" class="outline"/>`)+
  S(5,face(295,240))+S(6,`<path d="M250 185 q45 -45 90 0" fill="none" stroke="#fff" stroke-width="8"/><circle cx="225" cy="140" r="12" fill="#e58aa2"/><circle cx="365" cy="125" r="9" fill="#e58aa2"/>`));
 if(type==="earth") return scaffold(
  S(1,`<circle cx="295" cy="235" r="95" fill="#78b9d1" class="outline"/>`)+
  S(2,`<path d="M245 165 q35-30 55 5 l-12 28 -38 8z M320 230 q50-20 55 25 l-28 35 -32-12z M245 275 q30-15 45 12 l-18 30 -35-15z" fill="#79ad67"/>`)+
  S(3,`<path d="M205 235 L175 270 M385 235 L410 270" stroke="#78b9d1" stroke-width="20" stroke-linecap="round" class="outline"/>`)+
  S(4,`<path d="M270 320 L255 375 M320 320 L335 375" stroke="#78b9d1" stroke-width="20" stroke-linecap="round" class="outline"/>`)+
  S(5,face(295,235))+S(6,`<path d="M235 135 q60-35 120 0" fill="none" stroke="#d9f0ff" stroke-width="8"/><path d="M345 150 q20-30 38-10 q-10 25-38 30z" fill="#79ad67"/>`));
 if(type==="flower") return scaffold(
  S(1,`<path d="M295 230 L295 365" stroke="#6c9e63" stroke-width="15" stroke-linecap="round"/>`)+
  S(2,`<ellipse cx="260" cy="305" rx="38" ry="18" transform="rotate(25 260 305)" fill="#86b879" class="outline"/><ellipse cx="330" cy="330" rx="38" ry="18" transform="rotate(-25 330 330)" fill="#86b879" class="outline"/>`)+
  S(3,`<circle cx="295" cy="190" r="38" fill="#e8a85c" class="outline"/>`)+
  S(4,`<circle cx="295" cy="125" r="42" fill="#e996a8" class="outline"/><circle cx="355" cy="165" r="42" fill="#e996a8" class="outline"/><circle cx="335" cy="225" r="42" fill="#e996a8" class="outline"/><circle cx="255" cy="225" r="42" fill="#e996a8" class="outline"/><circle cx="235" cy="165" r="42" fill="#e996a8" class="outline"/>`)+
  S(5,face(295,185))+S(6,`<path d="M270 120 q25-25 50 0" fill="none" stroke="#fff" stroke-width="7"/>`));
 if(type==="sun") return scaffold(
  S(1,`<circle cx="295" cy="225" r="78" fill="#f5c65b" class="outline"/>`)+
  S(2,`<g stroke="#f5c65b" stroke-width="15" stroke-linecap="round"><path d="M295 110V75"/><path d="M295 340v35"/><path d="M180 225h-35"/><path d="M410 225h-35"/></g>`)+
  S(3,`<g stroke="#f5c65b" stroke-width="15" stroke-linecap="round"><path d="M215 145l-28-28"/><path d="M375 145l28-28"/><path d="M215 305l-28 28"/><path d="M375 305l28 28"/></g>`)+
  S(4,`<path d="M235 275 L205 325 M355 275 L385 325" stroke="#f5c65b" stroke-width="18" stroke-linecap="round"/>`)+
  S(5,face(295,220))+S(6,`<path d="M250 180 q45-35 90 0" fill="none" stroke="#fff0bd" stroke-width="8"/>`));
 if(type==="pencil") return scaffold(
  S(1,`<rect x="260" y="145" width="70" height="175" rx="12" fill="#f0c84d" class="outline"/>`)+
  S(2,`<path d="M260 145 L295 95 L330 145Z" fill="#e7c39d" class="outline"/><path d="M286 108 L295 95 L304 108Z" fill="#4d4540"/>`)+
  S(3,`<rect x="260" y="305" width="70" height="35" rx="10" fill="#e68fa0" class="outline"/>`)+
  S(4,`<path d="M260 220 L220 250 M330 220 L370 250" stroke="#f0c84d" stroke-width="18" stroke-linecap="round" class="outline"/>`)+
  S(5,face(295,210))+S(6,`<path d="M275 270 q20 18 40 0" fill="none" stroke="#fff" stroke-width="6"/>`));
 if(type==="scarecrow") return scaffold(
  S(1,`<circle cx="295" cy="165" r="50" fill="#f1c89c" class="outline"/>`)+
  S(2,`<rect x="245" y="210" width="100" height="110" rx="20" fill="#7e9a72" class="outline"/>`)+
  S(3,`<path d="M250 225 L195 270 M340 225 L395 270" stroke="#d9a86d" stroke-width="20" stroke-linecap="round" class="outline"/>`)+
  S(4,`<path d="M270 315 L250 375 M320 315 L340 375" stroke="#6e7892" stroke-width="24" stroke-linecap="round" class="outline"/>`)+
  S(5,face(295,165)+`<path d="M280 185 q15 12 30 0" fill="none" stroke="#b36c63" stroke-width="5"/>`)+
  S(6,`<path d="M235 125 Q295 75 355 125Z" fill="#b7834e" class="outline"/><rect x="230" y="120" width="130" height="15" rx="6" fill="#b7834e"/>`));
 if(type==="leprechaun") return scaffold(
  S(1,`<circle cx="295" cy="175" r="52" fill="#f2c7a5" class="outline"/>`)+
  S(2,`<path d="M248 205 q47 70 94 0 q-8 90-47 90t-47-90" fill="#d77a45" class="outline"/>`)+
  S(3,`<rect x="250" y="285" width="90" height="65" rx="20" fill="#5d9b68" class="outline"/>`)+
  S(4,`<path d="M260 340 L245 385 M330 340 L345 385" stroke="#5d9b68" stroke-width="20" stroke-linecap="round"/>`)+
  S(5,face(295,170))+S(6,`<rect x="245" y="95" width="100" height="22" rx="6" fill="#438557"/><rect x="265" y="55" width="60" height="55" rx="8" fill="#438557"/><rect x="283" y="91" width="25" height="20" fill="#e6c35c"/>`));
 return scaffold(S(1,`<circle cx="295" cy="220" r="80" fill="#ddd" class="outline"/>`)+S(2,face(295,220)));
}
function showScreen(which){
 home.classList.toggle("hidden",which!=="home"); game.classList.toggle("hidden",which!=="game"); customSetup.classList.toggle("hidden",which!=="custom");
 window.scrollTo({top:0,behavior:"smooth"});
}
function buildGrid(){
 Object.entries(THEMES).forEach(([id,t])=>{
   const b=document.createElement("button"); b.className="theme-card"; b.style.background=t.colors[0];
   b.innerHTML=`<span class="emoji">${t.emoji}</span><b>${t.name}</b>`;
   b.onclick=()=>startTheme(id); grid.appendChild(b);
 });
 const c=document.createElement("button");c.className="theme-card";c.style.background="#e9dfdd";c.innerHTML=`<span class="emoji">✍️ ✨</span><b>Customize</b>`;c.onclick=()=>showScreen("custom");grid.appendChild(c);
}
function startTheme(id){
 themeId=id;pool=THEMES[id].words;document.documentElement.style.setProperty("--accent",THEMES[id].colors[0]);document.documentElement.style.setProperty("--accent2",THEMES[id].colors[1]);
 $("#themeName").textContent=THEMES[id].emoji+" "+THEMES[id].name;$("#art").innerHTML=art(THEMES[id].character);showScreen("game");newGame();
}
function clean(s){return s.toUpperCase().replace(/[^A-Z '\-]/g,"").trim()}
function newGame(){if(!pool.length)return;answer=clean(pool[Math.floor(Math.random()*pool.length)]);guessed=new Set();wrong=0;celebrating=false;render()}
function render(){
 $("#word").textContent=[...answer].map(ch=>/[A-Z]/.test(ch)?(guessed.has(ch)?ch:"_"):ch).join(" ");
 document.querySelectorAll("#art .stage").forEach(g=>g.classList.toggle("show",Number(g.dataset.stage)<=wrong));
 $("#wrongCount").textContent=`Incorrect guesses: ${wrong} / ${maxWrong}`;
 kb.innerHTML="";
 for(const l of "ABCDEFGHIJKLMNOPQRSTUVWXYZ"){const b=document.createElement("button");b.className="key";b.textContent=l;b.disabled=guessed.has(l)||ended();if(guessed.has(l))b.classList.add(answer.includes(l)?"good":"bad");b.onclick=()=>guess(l);kb.appendChild(b)}
 if(won()){document.querySelectorAll("#art .stage").forEach(g=>g.classList.add("show"));$("#status").textContent="🎉 You did it! Great job!";if(!celebrating){celebrating=true;celebrate()}}
 else if(wrong>=maxWrong){$("#word").textContent=[...answer].join(" ");$("#status").textContent=`Nice try! The answer was ${answer}.`}
 else $("#status").textContent="Choose a letter!";
}
function guess(l){if(guessed.has(l)||ended())return;guessed.add(l);if(!answer.includes(l))wrong++;render()}
function won(){return answer&&[...answer].filter(ch=>/[A-Z]/.test(ch)).every(ch=>guessed.has(ch))}
function ended(){return won()||wrong>=maxWrong}
function celebrate(){for(let i=0;i<30;i++){let s=document.createElement("span");s.className="confetti";s.textContent=["✨","⭐","💗","🎉"][i%4];s.style.left=(20+Math.random()*60)+"vw";s.style.top="50vh";s.style.setProperty("--x",(Math.random()*600-300)+"px");s.style.setProperty("--y",(Math.random()*-520-80)+"px");document.body.appendChild(s);setTimeout(()=>s.remove(),1800)}}
document.querySelectorAll("[data-home]").forEach(b=>b.onclick=()=>showScreen("home"));
$("#newWord").onclick=newGame;
$("#hint").onclick=()=>{if(ended())return;let a=[...new Set([...answer].filter(x=>/[A-Z]/.test(x)&&!guessed.has(x)))];if(a.length){guessed.add(a[Math.floor(Math.random()*a.length)]);render()}};
$("#startCustom").onclick=()=>{pool=$("#customWords").value.split(/\n|,/).map(clean).filter(Boolean);if(!pool.length){alert("Please enter at least one word or phrase.");return}themeId="custom";document.documentElement.style.setProperty("--accent","#eadfdd");document.documentElement.style.setProperty("--accent2","#9a7d83");$("#themeName").textContent="✍️ Custom Game";$("#art").innerHTML=art("heart");showScreen("game");newGame()};
document.addEventListener("keydown",e=>{if(!game.classList.contains("hidden")&&/^[a-zA-Z]$/.test(e.key))guess(e.key.toUpperCase())});
buildGrid();
