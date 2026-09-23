
const themeColors={backtoschool:["#e5aa4f","#fff2c7"],fall:["#c77c45","#fff0df"],halloween:["#9b6bb5","#f2e7f7"],thanksgiving:["#bd744c","#f9eadc"],christmas:["#c85e58","#f8e7e4"],winter:["#73a9c9","#e8f5fb"],valentine:["#df7e9c","#fde9f0"],stpatrick:["#68a875","#e7f5e9"],earthday:["#5c9b80","#e5f4ed"],spring:["#89b975","#eef8e7"],summer:["#e5a64f","#fff3cf"],custom:["#8d7fb2","#f0ebf8"]};
let theme="winter", words=[], answer="", guessed=new Set(), wrong=0, maxWrong=6;
const $=s=>document.querySelector(s), themes=$("#themes"), kb=$("#keyboard");
function makeThemes(){
 Object.entries(THEMES).forEach(([id,t])=>{let b=document.createElement("button");b.className="theme";b.textContent=t[1]+" "+t[0];b.onclick=()=>selectTheme(id);b.dataset.id=id;themes.appendChild(b)});
 let b=document.createElement("button");b.className="theme";b.textContent="✨ Customize";b.onclick=()=>selectTheme("custom");b.dataset.id="custom";themes.appendChild(b);
}
function selectTheme(id){
 theme=id; document.querySelectorAll(".theme").forEach(x=>x.classList.toggle("active",x.dataset.id===id));
 $("#customBox").classList.toggle("show",id==="custom");
 let c=themeColors[id];document.documentElement.style.setProperty("--accent",c[0]);document.documentElement.style.setProperty("--soft",c[1]);
 if(id!=="custom"){words=THEMES[id][2];$("#figure").textContent=THEMES[id][1];newGame();}
 else{$("#figure").textContent="⭐";$("#themeTitle").textContent="Custom Game";$("#status").textContent="Enter your own words above, then choose Use My Words."}
}
function clean(s){return s.toUpperCase().replace(/[^A-Z '\-]/g,"").trim()}
function newGame(){
 if(!words.length)return; answer=clean(words[Math.floor(Math.random()*words.length)]);guessed=new Set();wrong=0;render();
}
function render(){
 let title=theme==="custom"?"Custom Game":THEMES[theme][0];$("#themeTitle").textContent=title;
 $("#word").textContent=[...answer].map(ch=>/[A-Z]/.test(ch)?(guessed.has(ch)?ch:"_"):ch).join(" ");
 $("#figure").style.setProperty("--progress",wrong); $("#status").textContent=`Incorrect guesses: ${wrong} / ${maxWrong}`;
 kb.innerHTML=""; "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(l=>{let b=document.createElement("button");b.className="key";b.textContent=l;b.disabled=guessed.has(l)||ended();if(guessed.has(l))b.classList.add(answer.includes(l)?"good":"bad");b.onclick=()=>guess(l);kb.appendChild(b)});
 if(won()){ $("#status").textContent="🎉 You did it! Great job!"; celebrate(); }
 else if(wrong>=maxWrong){$("#word").textContent=[...answer].join(" ");$("#status").textContent="Nice try! The answer was "+answer+"."}
}
function guess(l){if(guessed.has(l)||ended())return;guessed.add(l);if(!answer.includes(l))wrong++;render()}
function won(){return answer && [...answer].filter(ch=>/[A-Z]/.test(ch)).every(ch=>guessed.has(ch))}
function ended(){return won()||wrong>=maxWrong}
function celebrate(){for(let i=0;i<24;i++){let s=document.createElement("span");s.className="confetti";s.textContent=["✨","⭐","🎉"][i%3];s.style.left=(20+Math.random()*60)+"vw";s.style.top="45vh";s.style.setProperty("--x",(Math.random()*500-250)+"px");s.style.setProperty("--y",(Math.random()*-500-80)+"px");document.body.appendChild(s);setTimeout(()=>s.remove(),1900)}}
$("#newGame").onclick=newGame;
$("#hint").onclick=()=>{if(ended())return;let a=[...new Set([...answer].filter(x=>/[A-Z]/.test(x)&&!guessed.has(x)))];if(a.length){guessed.add(a[Math.floor(Math.random()*a.length)]);render()}};
$("#useCustom").onclick=()=>{words=$("#customWords").value.split(/\n|,/).map(clean).filter(Boolean);if(!words.length){$("#status").textContent="Please enter at least one word.";return}newGame()};
document.addEventListener("keydown",e=>{let l=e.key.toUpperCase();if(/^[A-Z]$/.test(l))guess(l)});
makeThemes();selectTheme("winter");
