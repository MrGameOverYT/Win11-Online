'use strict';
function showPanel(id,html,bind){
 document.querySelectorAll('.pnl.open').forEach(x=>x.id!=id&&x.classList.remove('open'));
 let p=document.getElementById(id);if(!p){p=document.createElement('div');p.id=id;p.className='pnl';document.body.appendChild(p)}
 if(p.classList.contains('open'))return p.classList.remove('open');
 toggleStart(false);p.innerHTML=html;p.classList.add('open');bind&&bind(p)}
function closePanels(e){document.querySelectorAll('.pnl.open').forEach(p=>{if(!e.target.closest('#'+p.id+',#tq,#tc,#tn,[data-k=wid]'))p.classList.remove('open')})}

function quick(){
 const S=SET(),dark=document.body.dataset.theme=='dark';
 const tl=(k,l,i,on)=>`<div class="qtl${on?' on':''}" data-k="${k}">${i}<span>${l}</span></div>`;
 showPanel('qs',`<div class="qt">${tl('wifi','Wi‑Fi',I.wifi,S.wifi)}${tl('bt','Bluetooth','ᛒ',S.bt)}${tl('night','Ночной свет',I.moon,S.night)}${tl('theme','Тёмная тема','◐',dark)}</div>
 <label class="qr">☀<input type="range" data-s="bright" min="30" max="100" value="${S.bright}"></label><label class="qr">🔊<input type="range" data-s="vol" min="0" max="100" value="${S.vol}"></label><div class="qb">Батарея: …</div>`,p=>{
  if(navigator.getBattery)navigator.getBattery().then(b=>p.querySelector('.qb').textContent='Батарея: '+Math.round(b.level*100)+'%'+(b.charging?' · заряжается':''));else p.querySelector('.qb').textContent='Батарея: недоступно в этом браузере';
  p.querySelectorAll('.qtl').forEach(x=>x.onclick=()=>{const k=x.dataset.k;if(k=='theme')setTheme(document.body.dataset.theme=='dark'?'light':'dark');else{SET()[k]=!SET()[k];saveSet();applySet()}x.classList.toggle('on')});
  p.querySelectorAll('[data-s]').forEach(x=>x.oninput=()=>{SET()[x.dataset.s]=+x.value;saveSet();applySet()})})}

function flyout(){
 let y=new Date().getFullYear(),m=new Date().getMonth();
 const u=(st.g('mail',{in:[]}).in||[]).filter(x=>x.u).length;
 showPanel('fl',`<div class="fh"><b>${new Date().toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'})}</b></div><div class="wdt"><span data-a="p">‹</span><b class="mt"></b><span data-a="n">›</span></div><div class="fm"></div><div class="fn">${u?'Непрочитанных писем: '+u:'Нет новых уведомлений'}</div><div class="wdt"><span data-a="o">Открыть календарь</span></div>`,p=>{
  const R=()=>{p.querySelector('.mt').textContent=MON[m]+' '+y;p.querySelector('.fm').innerHTML=mGrid(y,m,dstr(new Date()))};R();
  p.onclick=e=>{const a=e.target.closest('[data-a]');if(!a)return;const k=a.dataset.a;if(k=='p'){m--;if(m<0){m=11;y--}}else if(k=='n'){m++;if(m>11){m=0;y++}}else{p.classList.remove('open');return open('calendar')}R()}})}

function taskView(){
 toggleStart(false);document.querySelectorAll('.pnl.open').forEach(x=>x.classList.remove('open'));
 let o=document.getElementById('tv');if(o)return o.remove();
 o=document.createElement('div');o.id='tv';const ids=Object.keys(W);
 o.innerHTML=ids.length?`<div class="tvg">${ids.map(id=>`<div class="tvc" data-i="${id}"><div class="tvh">${I[A[id].i]}<span>${A[id].n}</span></div><div class="tvp">${I[A[id].i]}</div></div>`).join('')}</div>`:'<div class="tve">Нет открытых окон</div>';
 o.onclick=e=>{const c=e.target.closest('[data-i]');if(c){W[c.dataset.i].classList.remove('min');focus(c.dataset.i)}o.remove()};document.body.appendChild(o)}

function widgets(){
 const T_=st.g('todo',[]).filter(x=>!x.d),ev=st.g('cal',{})[dstr(new Date())]||[],n=new Date(),h=n.getHours();
 showPanel('wd',`<div class="wh"><b>${h<6?'Доброй ночи':h<12?'Доброе утро':h<18?'Добрый день':'Добрый вечер'}, ${esc(SET().name)}</b><small>${n.toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'})} · ${n.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})}</small></div>
 <div class="wc" data-o="todo"><b>Задачи (${T_.length})</b>${T_.slice(0,4).map(x=>`<div>• ${esc(x.t)}</div>`).join('')||'<div>Всё выполнено</div>'}</div>
 <div class="wc" data-o="calendar"><b>События сегодня</b>${ev.map(x=>`<div>• ${esc(x)}</div>`).join('')||'<div>Событий нет</div>'}</div>
 <div class="wc"><b>Быстрая заметка</b><textarea placeholder="Напишите что-нибудь…">${esc(st.g('wnote',''))}</textarea></div>`,p=>{
  p.querySelector('textarea').oninput=e=>st.s('wnote',e.target.value);
  p.querySelectorAll('[data-o]').forEach(x=>x.onclick=()=>{p.classList.remove('open');open(x.dataset.o)})})}

setInterval(()=>{const n=new Date(),h=String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0'),k=n.toDateString()+h,L=st.g('alarms',[]);
 L.forEach(a=>{if(a.on&&a.t==h&&a.last!==k){a.last=k;st.s('alarms',L);toast('⏰ Будильник '+a.t);beep()}})},5000);

let dLt=0,dId=null;
function mkDi(html,n,cls,fn,key){const d=el(`<div class="di${cls}"><div class="ic">${html}</div><span>${esc(n)}</span></div>`);
 d.onclick=e=>{e.stopPropagation();document.querySelectorAll('.di').forEach(x=>x.classList.remove('sel'));d.classList.add('sel');const t=Date.now();if(dId===key&&t-dLt<500)fn();dLt=t;dId=key};return d}
function renderDesk(){const c=document.getElementById('icons');c.innerHTML='';
 [['recycle','Корзина','',()=>open('recycle'),I.recycle],['pc','Этот компьютер','',()=>open('explorer'),I.pc],['edge','Microsoft Edge',' sc',()=>open('edge'),I.edge]].forEach(([k,n,cl,fn,h])=>c.appendChild(mkDi(h,n,cl,fn,k)));
 Object.entries(node(['Рабочий стол']).c).forEach(([k,v])=>c.appendChild(mkDi(fileIco(v,k),k,'',()=>v.t=='d'?open('explorer',['Рабочий стол',k]):openFile(['Рабочий стол'],k),'f:'+k)))}

function initShell(){document.getElementById('tq').onclick=quick;document.getElementById('tc').onclick=flyout;document.getElementById('tn').onclick=flyout}

/* ---------- Edge ---------- */
function edge(b){
 const HOME=[['Википедия','https://ru.wikipedia.org'],['Викисловарь','https://ru.wiktionary.org'],['Викитека','https://ru.wikisource.org'],['Commons','https://commons.wikimedia.org']];
 let T_=[{h:[],i:-1}],ai=0;
 b.innerHTML='<div class="eg"><div class="etabs"></div><div class="etool"><span data-e="back">←</span><span data-e="fwd">→</span><span data-e="rel">⟳</span><span data-e="home">⌂</span><input class="addr" placeholder="Поиск или ввод веб-адреса"><span data-e="ext" title="Открыть в обычном браузере">↗</span></div><div class="epage"></div></div>';
 const g=s=>b.querySelector(s),cu=()=>T_[ai],url=()=>cu().h[cu().i]||'';
 function R(){const t=cu(),u=url();
  g('.etabs').innerHTML=T_.map((x,i)=>`<div class="etab${i==ai?' on':''}" data-t="${i}">${I.edge}<span>${esc(x.h[x.i]?x.h[x.i].replace(/^https?:\/\//,'').slice(0,22):'Новая вкладка')}</span><b data-x="${i}">✕</b></div>`).join('')+'<span data-e="new">＋</span>';
  g('.addr').value=u;const p=g('.epage');
  if(!SET().wifi)p.innerHTML=`<div class="ebox">${I.wifi}<h3>Нет подключения к Интернету</h3><small>Включите Wi‑Fi в быстрых параметрах или в «Параметры → Сеть»</small></div>`;
  else if(!u)p.innerHTML=`<div class="ebox">${I.edge}<input placeholder="Поиск в Википедии или адрес сайта"><div class="hq">${HOME.map(h=>`<div data-u="${h[1]}">${h[0]}</div>`).join('')}</div></div>`;
  else p.innerHTML=`<div class="enote">Если страница не открылась, сайт запрещает встраивание. <a data-e="ext">Открыть в новой вкладке браузера</a></div><iframe src="${esc(u)}" referrerpolicy="no-referrer"></iframe>`}
 const nav=v=>{v=v.trim();if(!v)return;const u=/^https?:\/\//i.test(v)?v:/^[^\s]+\.[a-zа-я]{2,}(\/|$)/i.test(v)?'https://'+v:'https://ru.wikipedia.org/w/index.php?search='+encodeURIComponent(v);const t=cu();t.h=t.h.slice(0,t.i+1);t.h.push(u);t.i++;R()};
 const E={back(){if(cu().i>-1){cu().i--;R()}},fwd(){if(cu().i<cu().h.length-1){cu().i++;R()}},rel(){R()},home(){cu().i=-1;R()},new(){T_.push({h:[],i:-1});ai=T_.length-1;R()},ext(){url()&&nativeOpen(url(),'_blank')}};
 b.onclick=e=>{const t=e.target.closest('[data-e],[data-t],[data-x],[data-u]');if(!t)return;const d=t.dataset;
  if(d.x!==undefined){e.stopPropagation();T_.splice(+d.x,1);if(!T_.length)T_=[{h:[],i:-1}];ai=Math.min(ai,T_.length-1);R()}else if(d.t!==undefined){ai=+d.t;R()}else if(d.u)nav(d.u);else E[d.e]()};
 b.onkeydown=e=>{if(e.key=='Enter'&&e.target.tagName=='INPUT')nav(e.target.value)};R()}
