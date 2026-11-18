'use strict';
const $=s=>document.querySelector(s),el=h=>{const d=document.createElement('div');d.innerHTML=h.trim();return d.firstElementChild};
const sv=(vb,b)=>`<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${b}</svg>`;
const T=(bg,b)=>sv('0 0 32 32',`<rect width="32" height="32" rx="7" fill="${bg}"/>${b}`);
const Ch=c=>`<text x="16" y="23" font-size="18" font-weight="700" text-anchor="middle" fill="#fff" font-family="Segoe UI,Arial,sans-serif">${c}</text>`;
const S='fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
const keys=[...Array(9)].map((_,i)=>`<rect x="${8+(i%3)*6.5}" y="${14+Math.floor(i/3)*5.5}" width="4.6" height="3.8" rx="1" fill="#e8eef5"/>`).join('');
const sq=[['#f35325',10,13],['#81bc06',16.5,13],['#05a6f0',10,19.5],['#ffba08',16.5,19.5]].map(([c,x,y])=>`<rect x="${x}" y="${y}" width="5.5" height="5.5" fill="${c}"/>`).join('');
const I={
 start:sv('0 0 24 24','<g fill="url(#wg)"><rect x="2.5" y="2.5" width="9" height="9" rx="1.2"/><rect x="12.5" y="2.5" width="9" height="9" rx="1.2"/><rect x="2.5" y="12.5" width="9" height="9" rx="1.2"/><rect x="12.5" y="12.5" width="9" height="9" rx="1.2"/></g>'),
 search:sv('0 0 24 24',`<circle cx="14" cy="10" r="6" ${S}/><path d="M9.7 14.3l-6 6" ${S}/>`),
 taskview:sv('0 0 24 24','<rect x="3" y="5" width="13" height="12" rx="2.5" fill="currentColor"/><rect x="8" y="9" width="13" height="10" rx="2.5" fill="currentColor" opacity=".4"/>'),
 widgets:sv('0 0 24 24','<rect x="3" y="3" width="8" height="8" rx="2" fill="#0a8bff"/><rect x="13" y="3" width="8" height="8" rx="2" fill="#7ac3ff"/><rect x="3" y="13" width="8" height="8" rx="2" fill="#5aa8ff"/><rect x="13" y="13" width="8" height="8" rx="2" fill="#0b5fd6"/>'),
 chat:sv('0 0 24 24','<path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6l-4 4v-4a3 3 0 0 1-3-3z" fill="#7b83eb"/><circle cx="8.5" cy="10" r="1.1" fill="#fff"/><circle cx="12" cy="10" r="1.1" fill="#fff"/><circle cx="15.5" cy="10" r="1.1" fill="#fff"/>'),
 folder:sv('0 0 32 32','<path d="M3 8a2 2 0 0 1 2-2h7l2.5 2.5H27a2 2 0 0 1 2 2V24a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="#e8a91f"/><path d="M3 12.5a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2V24a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="#ffd362"/>'),
 edge:sv('0 0 32 32','<circle cx="16" cy="16" r="14" fill="url(#eg)"/><path d="M7.5 17c0-5 3.8-8 8.6-8 4 0 7 2.4 7 5.8 0 2-1.4 3.2-3.4 3.2h-8.200c.2 3 3 4.800 6.800 4.200-1.200 2.300-3.700 3.800-6.800 3.800-4 0-4.600-3.200-4.600-9z" fill="#fff" opacity=".92"/>'),
 store:sv('0 0 32 32',`<path d="M11 10.500V8.500a5 5 0 0 1 10 0v2" fill="none" stroke="#33414f" stroke-width="2.400"/><rect x="4" y="10" width="24" height="18" rx="3" fill="#33414f"/>${sq}`),
 word:T('#185abd',Ch('W')),excel:T('#107c41',Ch('X')),ppt:T('#c43e1c',Ch('P')),onenote:T('#7719aa',Ch('N')),
 todo:T('#2564cf','<path d="M9 16.500l5 5 9-10" stroke="#fff" stroke-width="3.200" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
 mail:T('#1a7ad4','<rect x="6" y="9" width="20" height="14" rx="2" fill="#fff"/><path d="M6.500 10l9.500 7 9.500-7" stroke="#1a7ad4" stroke-width="1.800" fill="none"/>'),
 calendar:sv('0 0 32 32','<rect x="4" y="5" width="24" height="23" rx="4" fill="#fff" stroke="#c8c8c8"/><path d="M4 9a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v4H4z" fill="#1a7ad4"/>'+keys.replace(/#e8eef5/g,'#7a8ca0')),
 photos:T('#1f76d2','<circle cx="22" cy="11" r="3" fill="#ffd54a"/><path d="M5 26l8-10 5 6 3-3 6 7z" fill="#fff"/>'),
 xbox:T('#107c10','<circle cx="16" cy="16" r="10" fill="#fff"/><path d="M11 11l10 10M21 11L11 21" stroke="#107c10" stroke-width="2.600" stroke-linecap="round"/>'),
 settings:sv('0 0 32 32','<circle cx="16" cy="16" r="9.500" fill="none" stroke="#6b7a8a" stroke-width="4" stroke-dasharray="3.100 2.500"/><circle cx="16" cy="16" r="7" fill="none" stroke="#7d8d9f" stroke-width="3.600"/><circle cx="16" cy="16" r="3" fill="#2b80d8"/>'),
 calc:T('#4b5563','<rect x="7" y="6" width="18" height="6" rx="1.500" fill="#cfe3f5"/>'+keys),
 notepad:T('#3a96dd','<rect x="8" y="6" width="16" height="20" rx="2" fill="#fff"/><path d="M11 12h10M11 16h10M11 20h7" stroke="#3a96dd" stroke-width="1.600"/>'),
 paint:T('#f3f6fb','<circle cx="16" cy="16" r="10" fill="#e6a23c"/><circle cx="11" cy="14" r="2.2" fill="#d83b01"/><circle cx="16" cy="10.5" r="2.2" fill="#0078d4"/><circle cx="21" cy="14" r="2.2" fill="#107c10"/><circle cx="17" cy="21" r="3" fill="#f3f6fb"/>'),
 clock:T('#2b6fd6','<circle cx="16" cy="16" r="10" fill="#fff"/><path d="M16 9v7l5 3" stroke="#2b6fd6" stroke-width="2" fill="none" stroke-linecap="round"/>'),
 recycle:sv('0 0 32 32','<path d="M7 10h18l-1.800 17a2 2 0 0 1-2 1.800H10.800a2 2 0 0 1-2-1.800z" fill="#dcebf8" stroke="#8fb2d3"/><rect x="5" y="6.500" width="22" height="3.500" rx="1.500" fill="#bcd5ec" stroke="#8fb2d3"/><path d="M16 13l3.500 6h-7z" fill="#2a8be0"/>'),
 pc:sv('0 0 32 32','<rect x="3" y="5" width="26" height="17" rx="2" fill="#2a6fdb"/><rect x="5" y="7" width="22" height="13" fill="#6cc0ff"/><path d="M11 27h10M16 22v5" stroke="#8a9bb0" stroke-width="2.200"/>'),
 chev:sv('0 0 24 24',`<path d="M5 15l7-7 7 7" ${S}/>`),
 right:sv('0 0 10 10','<path d="M3 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.300"/>'),
 wifi:sv('0 0 24 24',`<path d="M3 9.500a13 13 0 0 1 18 0M6 13a8.500 8.500 0 0 1 12 0M9 16.500a4 4 0 0 1 6 0" ${S}/><circle cx="12" cy="19.500" r="1" fill="currentColor"/>`),
 vol:sv('0 0 24 24',`<path d="M4 9.500h3.500L12 5.500v13l-4.500-4H4z" fill="currentColor"/><path d="M15 9a4.500 4.500 0 0 1 0 6M17.500 6.500a8 8 0 0 1 0 11" ${S}/>`),
 bat:sv('0 0 24 24',`<rect x="2" y="8" width="17" height="9" rx="2" ${S}/><rect x="4.500" y="10.500" width="10" height="4" rx="1" fill="currentColor"/><path d="M21.500 11v3" ${S}/>`),
 moon:sv('0 0 24 24',`<path d="M19 14.500A8 8 0 0 1 9.500 5a8 8 0 1 0 9.500 9.500z" ${S}/>`),
 power:sv('0 0 24 24',`<path d="M12 3v8M7 6.500a7.500 7.500 0 1 0 10 0" ${S}/>`),
 user:sv('0 0 24 24',`<circle cx="12" cy="9" r="3.500" ${S}/><path d="M5 20a7 7 0 0 1 14 0" ${S}/>`)
};
document.body.insertAdjacentHTML('afterbegin','<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="wg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fcbff"/><stop offset="1" stop-color="#0a64d8"/></linearGradient><linearGradient id="eg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#1a8fe3"/><stop offset=".55" stop-color="#0b57a8"/><stop offset="1" stop-color="#43d17a"/></linearGradient></defs></svg>');

/* ---------- apps ---------- */
const A={
 explorer:{n:'Проводник',i:'folder',w:[820,500],b:explorer},edge:{n:'Microsoft Edge',i:'edge',w:[900,560],b:edge},notepad:{n:'Блокнот',i:'notepad',w:[600,400],b:notepad},
 settings:{n:'Параметры',i:'settings',w:[900,560],b:settings},calc:{n:'Калькулятор',i:'calc',w:[330,490],b:calc},recycle:{n:'Корзина',i:'recycle',w:[620,400],b:recycle},
 word:{n:'Word',i:'word',w:[860,560],b:word},excel:{n:'Excel',i:'excel',w:[900,540],b:excel},ppt:{n:'PowerPoint',i:'ppt',w:[900,540],b:ppt},mail:{n:'Почта',i:'mail',w:[900,540],b:mail},
 store:{n:'Microsoft Store',i:'store',w:[860,540],b:store},photos:{n:'Фотографии',i:'photos',w:[860,540],b:photos},onenote:{n:'OneNote',i:'onenote',w:[820,520],b:onenote},
 todo:{n:'To Do',i:'todo',w:[560,520],b:todo},calendar:{n:'Календарь',i:'calendar',w:[860,540],b:calendar},xbox:{n:'Xbox',i:'xbox',w:[560,580],b:xbox},
 clock:{n:'Часы',i:'clock',w:[520,480],b:clock},paint:{n:'Paint',i:'paint',w:[820,560],b:paint}
};
const PIN=['edge','word','excel','ppt','mail','store','photos','onenote','todo','calendar','xbox','settings','calc','notepad','explorer','clock'];
const TBP=['explorer','edge','store','mail'];

function gen(b,a){b.innerHTML=`<div class="gen">${I[a.i]}<div><b>${a.n}</b><br>Это демонстрационное окно приложения</div></div>`}
function calc(b){
 const L=['%','CE','C','⌫','1/x','x²','√','÷','7','8','9','×','4','5','6','−','1','2','3','+','±','0',',','='];
 b.innerHTML=`<div class="calc"><div class="cd"><small></small><b>0</b></div><div class="cg">${L.map(k=>`<div class="${/\d/.test(k)&&k.length==1?'n':k=='='?'e':''}">${k}</div>`).join('')}</div></div>`;
 let cur='0',acc=null,op=null,fresh=false;const m=b.querySelector('b'),h=b.querySelector('small');
 const f=v=>String(v).replace('.',',');
 const run=(x,y,o)=>o=='+'?x+y:o=='−'?x-y:o=='×'?x*y:o=='÷'?(y?x/y:0):y;
 const show=()=>{m.textContent=f(cur);h.textContent=acc!==null&&op?f(acc)+' '+op:''};
 b.querySelectorAll('.cg div').forEach(d=>d.onclick=()=>{const k=d.textContent,v=parseFloat(cur);
  if(/^\d$/.test(k)){cur=(cur==='0'||fresh)?k:cur+k;fresh=false}
  else if(k==','){if(fresh){cur='0';fresh=false}if(!cur.includes('.'))cur+='.'}
  else if('+−×÷'.includes(k)){acc=(acc!==null&&!fresh)?+run(acc,v,op).toFixed(10):v;op=k;cur=String(acc);fresh=true}
  else if(k=='='){if(op){cur=String(+run(acc,v,op).toFixed(10));acc=null;op=null;fresh=true}}
  else if(k=='C'){cur='0';acc=null;op=null}else if(k=='CE')cur='0';
  else if(k=='⌫')cur=cur.length>1?cur.slice(0,-1):'0';
  else if(k=='±')cur=String(-v);else if(k=='%')cur=String(acc!==null?acc*v/100:0);
  else if(k=='1/x')cur=String(v?+(1/v).toFixed(10):0);else if(k=='x²')cur=String(+(v*v).toFixed(10));else if(k=='√')cur=String(+Math.sqrt(Math.abs(v)).toFixed(10));
  show()})}

/* ---------- wallpapers ---------- */
const WP=['img0','img19','img20','img21','img22','img23','img24','img25','img26','img27','img32','img33','img34','img35'];
let WS=null;try{WS=localStorage.getItem('w11w')}catch(e){}
function drawWall(){
 const f=WS||(document.body.dataset.theme==='dark'?'img19':'img0');
 $('#wall').innerHTML=`<img src="wallpapers/${f}.jpg" alt="" draggable="false">`}
function setWall(f){WS=f;try{localStorage.setItem('w11w',f)}catch(e){}drawWall();document.querySelectorAll('.wp').forEach(x=>x.classList.toggle('on',x.dataset.w===f))}

/* ---------- theme ---------- */
let AC=null;
function applyAcc(){document.body.style.setProperty('--acc',AC||(document.body.dataset.theme==='dark'?'#60cdff':'#0067c0'))}
function setTheme(t){document.body.dataset.theme=t;try{localStorage.setItem('w11t',t)}catch(e){}applyAcc();drawWall()}

/* ---------- windows ---------- */
const W={};let Z=10,F=null,off=0;
function open(id,arg){
 if(id==='pc')id='explorer';
 const a=A[id];if(!a)return;
 if(W[id]){W[id].classList.remove('min');const bd=W[id].querySelector('.wbody');if(arg!==undefined&&bd.load)bd.load(arg);return focus(id)}
 const w=a.w||[620,400],nw=Math.min(w[0],innerWidth-16),nh=Math.min(w[1],innerHeight-70);
 const e=el(`<div class="win" style="left:${Math.max(4,(innerWidth-nw)/2+off*28-40)}px;top:${Math.max(4,(innerHeight-48-nh)/2+off*28-30)}px;width:${nw}px;height:${nh}px"><div class="tbar"><div class="tt">${I[a.i]}<span>${a.n}</span></div><div class="cb" data-a="min"><svg viewBox="0 0 10 10"><path d="M0 5h10"/></svg></div><div class="cb" data-a="max"><svg viewBox="0 0 10 10"><rect x=".5" y=".5" width="9" height="9"/></svg></div><div class="cb x" data-a="x"><svg viewBox="0 0 10 10"><path d="M0 0l10 10M10 0L0 10"/></svg></div></div><div class="wbody"></div><div class="rz"></div></div>`);
 off=(off+1)%6;if(innerWidth<700)e.classList.add('max');
 (a.b||gen)(e.querySelector('.wbody'),a,arg);
 $('#wins').appendChild(e);W[id]=e;
 e.addEventListener('pointerdown',()=>focus(id));
 e.querySelectorAll('.cb').forEach(c=>c.onclick=()=>{const k=c.dataset.a;k=='x'?closeWin(id):k=='min'?minimize(id):e.classList.toggle('max')});
 const bar=e.querySelector('.tbar');bar.ondblclick=ev=>{if(!ev.target.closest('.cb'))e.classList.toggle('max')};
 bar.onpointerdown=ev=>{if(ev.target.closest('.cb')||e.classList.contains('max'))return;const r=e.getBoundingClientRect(),dx=ev.clientX-r.left,dy=ev.clientY-r.top;bar.setPointerCapture(ev.pointerId);
  bar.onpointermove=m=>{e.style.left=Math.min(innerWidth-80,Math.max(-r.width+110,m.clientX-dx))+'px';e.style.top=Math.max(0,Math.min(innerHeight-90,m.clientY-dy))+'px'};bar.onpointerup=()=>bar.onpointermove=null};
 const rz=e.querySelector('.rz');rz.onpointerdown=ev=>{ev.stopPropagation();const r=e.getBoundingClientRect();rz.setPointerCapture(ev.pointerId);
  rz.onpointermove=m=>{e.style.width=Math.max(300,m.clientX-r.left)+'px';e.style.height=Math.max(180,m.clientY-r.top)+'px'};rz.onpointerup=()=>rz.onpointermove=null};
 focus(id)}
function focus(id){F=id;Z++;Object.entries(W).forEach(([k,w])=>w.classList.toggle('foc',k===id));W[id].style.zIndex=Z;renderTB()}
function minimize(id){W[id].classList.add('min');if(F===id)F=null;renderTB()}
function closeWin(id){W[id]&&W[id].remove();delete W[id];if(F===id)F=null;renderTB()}

/* ---------- taskbar ---------- */
function renderTB(){
 const ids=[...TBP,...Object.keys(W).filter(k=>!TBP.includes(k))];
 $('#tbc').innerHTML=`<div class="tbi tbs" data-k="start">${I.start}</div><div class="tbi tbs opt" data-k="search">${I.search}</div><div class="tbi opt" data-k="task">${I.taskview}</div><div class="tbi opt" data-k="wid">${I.widgets}</div>`
 +ids.map(id=>{const r=W[id],act=r&&F===id&&!r.classList.contains('min');return `<div class="tbi${r?' run':''}${act?' act':''}${TBP.indexOf(id)>2?' opt':''}" data-id="${id}">${I[A[id].i]}</div>`}).join('');
 $('#tbc').querySelectorAll('[data-k]').forEach(x=>x.onclick=()=>{const k=x.dataset.k;k=='task'?taskView():k=='wid'?widgets():toggleStart(k==='search'?true:undefined)});
 $('#tbc').querySelectorAll('[data-id]').forEach(x=>x.onclick=()=>{const id=x.dataset.id,w=W[id];if(!w)open(id);else if(w.classList.contains('min')){w.classList.remove('min');focus(id)}else if(F===id)minimize(id);else focus(id)})}

/* ---------- start ---------- */
const chev=I.right;
function rStart(q='',mode=''){
 const b=$('#sbody'),inst=st.g('inst',[]),pins=[...PIN,...inst],back='<button class="all" data-back="1">‹ Назад</button>';
 const row=id=>`<div class="rw" data-a="${id}">${I[A[id].i]}<div><span>${A[id].n}</span><small>Приложение</small></div></div>`;
 const frow=(p,k,v)=>`<div class="rw" data-fp="${esc(p.join('/'))}" data-fk="${esc(k)}">${fileIco(v,k)}<div><span>${esc(k)}</span><small>${esc(['Этот компьютер',...p].join(' › '))}</small></div></div>`;
 const files=f=>{const o=[];(function w(n,p){Object.entries(n.c).forEach(([k,v])=>v.t=='d'?w(v,[...p,k]):f(k)&&o.push([p,k,v]))})(FSR(),[]);return o};
 const have=id=>id!='paint'||inst.includes('paint');
 if(q){const l=q.toLowerCase(),r=Object.keys(A).filter(id=>have(id)&&A[id].n.toLowerCase().includes(l)),fl=files(k=>k.toLowerCase().includes(l)).slice(0,8);
  b.innerHTML='<div class="sh"><span>Лучшее соответствие</span></div>'+(r.length+fl.length?r.map(row).join('')+fl.map(x=>frow(...x)).join(''):'<div class="none">Ничего не найдено</div>')}
 else if(mode=='all')b.innerHTML=`<div class="sh"><span>Все приложения</span>${back}</div>`+Object.keys(A).filter(have).sort((x,y)=>A[x].n.localeCompare(A[y].n)).map(row).join('');
 else if(mode=='rec')b.innerHTML=`<div class="sh"><span>Рекомендуем</span>${back}</div>`+(files(()=>1).map(x=>frow(...x)).join('')||'<div class="none">Файлов пока нет</div>');
 else{const rc=st.g('rec',[]).filter(x=>{try{return node(x.p).c[x.k]}catch(e){return 0}});
  b.innerHTML=`<div class="sh"><span>Закреплённые</span><button class="all" data-m="all">Все приложения ${chev}</button></div><div class="pg">${pins.map(id=>`<div class="pa" data-a="${id}">${I[A[id].i]}<span>${A[id].n}</span></div>`).join('')}</div>
  <div class="sh"><span>Рекомендуем</span><button class="all" data-m="rec">Ещё ${chev}</button></div><div class="rg">${rc.map(x=>frow(x.p,x.k,node(x.p).c[x.k])).join('')||'<div class="none">Здесь появятся недавно открытые файлы</div>'}</div>`}
 b.querySelectorAll('[data-a]').forEach(x=>x.onclick=()=>{open(x.dataset.a);toggleStart(false)});
 b.querySelectorAll('[data-fk]').forEach(x=>x.onclick=()=>{openFile(x.dataset.fp?x.dataset.fp.split('/'):[],x.dataset.fk);toggleStart(false)});
 b.querySelectorAll('[data-m]').forEach(x=>x.onclick=()=>rStart('',x.dataset.m));
 b.querySelectorAll('[data-back]').forEach(x=>x.onclick=()=>rStart())}
function toggleStart(f){const s=$('#start'),o=f===undefined?!s.classList.contains('open'):f;s.classList.toggle('open',o);$('#pm').style.display='none';
 if(o){$('#q').value='';rStart();if(innerWidth>700)setTimeout(()=>$('#q').focus(),60)}}
function power(k){toggleStart(false);const s=$('#shut');s.style.display='flex';s.onclick=null;
 s.innerHTML=k==='sleep'?'':`<div class="spin"></div><div>${k==='off'?'Завершение работы':'Перезагрузка'}</div>`;
 if(k!=='sleep')Object.keys(W).forEach(closeWin);
 const wake=()=>{s.onclick=null;s.innerHTML=`<div class="lg">${I.start}</div><div class="spin"></div>`;setTimeout(()=>s.style.display='none',1700)};
 if(k==='restart')setTimeout(wake,1800);else setTimeout(()=>{if(k==='off')s.innerHTML='';s.onclick=wake},k==='sleep'?300:1800)}

/* ---------- init ---------- */
$('#sico').innerHTML=I.search;$('#uav').innerHTML=I.user;$('#pw').innerHTML=I.power;
$('#q').oninput=e=>rStart(e.target.value.trim());
$('#pw').onclick=()=>{const m=$('#pm');m.style.display=m.style.display==='block'?'none':'block'};
document.querySelectorAll('[data-p]').forEach(x=>x.onclick=()=>power(x.dataset.p));
$('#tray').innerHTML=`<div class="tr opt">${I.chev}</div><div class="tr" id="tq">${I.wifi}${I.vol}${I.bat}</div><div class="tr" id="tc"><div><div id="tm"></div><div id="dt"></div></div></div><div class="tr opt" id="tn">${I.moon}</div>`;
function tick(){const d=new Date(),S_=SET();$('#tm').textContent=d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit',second:S_.secs?'2-digit':undefined,hour12:!S_.h24});$('#dt').textContent=d.toLocaleDateString('ru-RU')}
tick();setInterval(tick,1000);

document.addEventListener('pointerdown',e=>{
 if(!e.target.closest('#start,.tbs'))toggleStart(false);closePanels(e);
 if(!e.target.closest('#ctx'))$('#ctx').style.display='none';
 if(!e.target.closest('.di'))document.querySelectorAll('.di').forEach(x=>x.classList.remove('sel'))});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){toggleStart(false);document.querySelectorAll('.pnl.open').forEach(p=>p.classList.remove('open'))}});
document.addEventListener('contextmenu',e=>{e.preventDefault();
 if(!e.target.closest('#wall,#icons,.di'))return;
 const c=$('#ctx');c.innerHTML=['Вид ›','Сортировка ›','Обновить','<hr>','Создать ›','<hr>','Параметры экрана','Персонализация','<hr>','Открыть в Терминале'].map(t=>t=='<hr>'?t:`<div>${t}</div>`).join('');
 c.style.display='block';c.style.left=Math.min(e.clientX,innerWidth-250)+'px';c.style.top=Math.min(e.clientY,innerHeight-c.offsetHeight-52)+'px';
 c.querySelectorAll('div').forEach(x=>x.onclick=()=>{c.style.display='none';const t=x.textContent;if(/Персонализация|экрана/.test(t))open('settings',/экрана/.test(t)?0:3);else if(t=='Обновить')renderDesk();else if(/^Создать/.test(t)){const n=prompt('Имя файла или папки','Новый текстовый документ.txt');if(n&&!node(['Рабочий стол']).c[n]){const e=n.includes('.')?n.split('.').pop().toLowerCase():'';node(['Рабочий стол']).c[n]=e?{t:'f',x:NEWX(e)}:{t:'d',c:{}};saveFS()}}})});
let th;try{th=localStorage.getItem('w11t')}catch(e){}
setTheme(th||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));
renderTB();
applySet();renderDesk();initShell();$('.user').onclick=()=>{toggleStart(false);open('settings',5)};
