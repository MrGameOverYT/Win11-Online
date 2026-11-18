'use strict';
/* Загружается ДО script.js. Всё, что использует I, A, W, open и т.д., вызывается уже после загрузки. */
const nativeOpen=window.open.bind(window);
const st={g(k,d){try{const v=localStorage.getItem('w11_'+k);return v===null?d:JSON.parse(v)}catch(e){return d}},s(k,v){try{localStorage.setItem('w11_'+k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function toast(t){const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2400)}
function dl(n,t,m='text/plain'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:m+';charset=utf-8'}));a.download=n;a.click()}
const SD={wifi:true,bt:true,night:false,bright:100,vol:70,left:false,h24:true,secs:false,name:'Пользователь',pc:'DESKTOP-WIN11'};
let _S;const SET=()=>_S||(_S={...SD,...st.g('set',{})});const saveSet=()=>st.s('set',SET());
function beep(){try{const c=new(window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),g=c.createGain();g.gain.value=SET().vol/300;o.connect(g);g.connect(c.destination);o.frequency.value=880;o.start();setTimeout(()=>{o.stop();c.close()},600)}catch(e){}}

/* ---------- виртуальная файловая система ---------- */
let _fs,_bn;
const FSR=()=>_fs||(_fs=st.g('fs',null)||FS0()),BN=()=>_bn||(_bn=st.g('bin',[]));
const saveFS=()=>{st.s('fs',FSR());st.s('bin',BN());if(window.renderDesk)renderDesk()};
const node=p=>p.reduce((n,k)=>n.c[k],FSR());
function FS0(){const d=(c={})=>({t:'d',c}),img={};WP.forEach((w,i)=>img['Обои '+(i+1)+'.jpg']={t:'f',img:w});
 return d({'Рабочий стол':d(),'Документы':d({'Добро пожаловать.txt':{t:'f',x:'Это Windows 11 в браузере.\nФайлы, заметки и настройки хранятся в этом браузере.'}}),'Загрузки':d(),'Музыка':d(),'Изображения':d(img),'Видео':d(),'Локальный диск (C:)':d({Windows:d(),'Program Files':d(),'Пользователи':d()})})}
const NEWX=e=>e=='xls'?'{}':e=='ppt'?JSON.stringify({s:[{t:'Заголовок',b:'Текст слайда'}],bg:0}):'';
function fileIco(v,k){return v.t=='d'?(/^Локальный/.test(k)?I.pc:I.folder):v.img?`<img src="wallpapers/thumbs/${v.img}.jpg" alt="">`:({doc:I.word,xls:I.excel,ppt:I.ppt}[k.split('.').pop().toLowerCase()]||I.notepad)}
function recent(p,k){const j=p.join('/');st.s('rec',[{p,k},...st.g('rec',[]).filter(x=>x.k!==k||x.p.join('/')!==j)].slice(0,6))}
function openFile(p,k){const v=node(p).c[k];if(!v)return;const e=k.split('.').pop().toLowerCase();recent(p,k);
 if(v.img)open('photos',v.img);else if(e=='doc')open('word',{p,k});else if(e=='xls')open('excel',{p,k});else if(e=='ppt')open('ppt',{p,k});else open('notepad',{p,k})}
const asktitle=(b,s)=>{const t=b.closest('.win');t&&(t.querySelector('.tt span').textContent=s)};

/* ---------- Проводник ---------- */
function explorer(b,a,arg){
 let P=Array.isArray(arg)?arg:[],H=[P],hi=0,sel=null,lt=0,view='g',q='',clip=null;
 const Q=['Этот компьютер','Рабочий стол','Загрузки','Документы','Изображения','Музыка','Видео'];
 b.innerHTML=`<div class="ex"><div class="exc">${[['new','＋ Создать'],0,['cut','Вырезать'],['copy','Копировать'],['paste','Вставить'],['ren','Переименовать'],['del','Удалить'],0,['view','Вид']].map(x=>x?`<span data-c="${x[0]}">${x[1]}</span>`:'<i></i>').join('')}</div>
 <div class="exn"><span class="ar" data-c="back">←</span><span class="ar" data-c="fwd">→</span><span class="ar" data-c="up">↑</span><div class="addr"></div><input class="addr sr" placeholder="Поиск"></div>
 <div class="exm"><div class="exs">${Q.map((t,i)=>`<div data-q="${i}">${t}</div>`).join('')}<hr><div data-q="bin">Корзина</div></div><div class="exf"></div></div><div class="exst"></div></div>`;
 const $$=s=>b.querySelector(s),cn=()=>node(P).c;
 function R(){const en=Object.entries(cn()).filter(([k])=>k.toLowerCase().includes(q)).sort((x,y)=>x[1].t==y[1].t?x[0].localeCompare(y[0]):x[1].t<y[1].t?-1:1);
  $$('.addr').innerHTML=I.pc+' '+['Этот компьютер',...P].map(esc).join(' › ');
  $$('.exf').innerHTML=en.length?`<div class="${view=='g'?'fg':'fl'}">${en.map(([k,v])=>`<div class="fi${k===sel?' sel':''}" data-k="${esc(k)}">${fileIco(v,k)}<span>${esc(k)}</span></div>`).join('')}</div>`:'<div class="none">Папка пуста</div>';
  $$('.exst').textContent=en.length+' элем.'+(sel?' · выбран 1':'')}
 const go=p=>{H=H.slice(0,hi+1);H.push(p);hi++;P=p;sel=null;q='';$$('.sr').value='';R()};
 const C={back(){if(hi>0){hi--;P=H[hi];sel=null;R()}},fwd(){if(hi<H.length-1){hi++;P=H[hi];sel=null;R()}},up(){P.length&&go(P.slice(0,-1))},view(){view=view=='g'?'l':'g';R()},
  new(){const n=prompt('Имя папки или файла (например: заметки.txt, отчёт.doc, таблица.xls, слайды.ppt)','Новая папка');if(!n)return;if(cn()[n])return toast('Такое имя уже есть');const e=n.includes('.')?n.split('.').pop().toLowerCase():'';cn()[n]=e?{t:'f',x:NEWX(e)}:{t:'d',c:{}};saveFS();R()},
  del(){if(!sel)return toast('Сначала выберите элемент');BN().push({k:sel,v:cn()[sel],p:P});delete cn()[sel];sel=null;saveFS();R()},
  ren(){if(!sel)return toast('Сначала выберите элемент');const n=prompt('Новое имя',sel);if(!n||n==sel||cn()[n])return;const c=cn();c[n]=c[sel];delete c[sel];sel=n;saveFS();R()},
  cut(){sel?clip={p:P,k:sel,cut:1}:toast('Сначала выберите элемент')},copy(){sel?clip={p:P,k:sel}:toast('Сначала выберите элемент')},
  paste(){if(!clip)return toast('Буфер пуст');const src=node(clip.p).c[clip.k];if(!src)return;let n=clip.k;while(cn()[n])n='Копия '+n;cn()[n]=JSON.parse(JSON.stringify(src));if(clip.cut){delete node(clip.p).c[clip.k];clip=null}saveFS();R()}};
 b.querySelectorAll('[data-c]').forEach(x=>x.onclick=()=>C[x.dataset.c]());
 b.querySelectorAll('[data-q]').forEach(x=>x.onclick=()=>{const z=x.dataset.q;z=='bin'?open('recycle'):go(z=='0'?[]:[Q[z]])});
 $$('.sr').oninput=e=>{q=e.target.value.toLowerCase();R()};
 $$('.exf').onclick=e=>{const f=e.target.closest('.fi');if(!f){sel=null;return R()}const k=f.dataset.k,n=Date.now();if(sel===k&&n-lt<600){const v=cn()[k];v.t=='d'?go([...P,k]):openFile(P,k)}else{sel=k;R()}lt=n};
 b.load=p=>Array.isArray(p)&&go(p);R()}

/* ---------- Корзина ---------- */
function recycle(b){
 const put=i=>{const x=BN()[i];let d;try{d=node(x.p)}catch(e){}if(!d||d.t!='d')d=node(['Документы']);let n=x.k;while(d.c[n])n='Копия '+n;d.c[n]=x.v;BN().splice(i,1)};
 function R(){const B=BN();b.innerHTML=`<div class="ex"><div class="exc"><span data-a="all">Очистить корзину</span><span data-a="res">Восстановить всё</span></div><div class="exf">${B.length?B.map((x,i)=>`<div class="rr">${fileIco(x.v,x.k)}<div><b>${esc(x.k)}</b><small>Исходное место: ${esc(['Этот компьютер',...x.p].join(' › '))}</small></div><button data-r="${i}">Восстановить</button><button data-d="${i}">Удалить</button></div>`).join(''):'<div class="none">Корзина пуста</div>'}</div></div>`}
 b.onclick=e=>{const t=e.target.closest('button,[data-a]');if(!t)return;const d=t.dataset;if(d.r!==undefined)put(+d.r);else if(d.d!==undefined){if(confirm('Удалить навсегда?'))BN().splice(+d.d,1)}else if(d.a=='all'){if(BN().length&&confirm('Очистить корзину?'))BN().length=0}else if(d.a=='res')while(BN().length)put(0);saveFS();R()};
 R()}

/* ---------- Блокнот ---------- */
function notepad(b,a,arg){
 let cur=null;
 b.innerHTML=`<div class="np"><div class="npm">${[['new','Новый'],['open','Открыть…'],['save','Сохранить'],['as','Сохранить как…'],['dl','Скачать'],['dt','Дата и время'],['wr','Перенос строк']].map(x=>`<span data-m="${x[0]}">${x[1]}</span>`).join('')}</div><textarea spellcheck="false"></textarea><div class="nps"><span class="pos">Стр 1, стлб 1</span><span class="nm">Без имени</span><span>UTF-8</span></div><input type="file" accept=".txt,text/*" hidden></div>`;
 const ta=b.querySelector('textarea'),fi=b.querySelector('input'),nm=b.querySelector('.nm');
 const name=()=>{const s=cur?cur.k:'Без имени';nm.textContent=s;asktitle(b,s+' — Блокнот')};
 const pos=()=>{const v=ta.value.slice(0,ta.selectionStart).split('\n');b.querySelector('.pos').textContent='Стр '+v.length+', стлб '+(v[v.length-1].length+1)};
 const save=as=>{if(!cur||as){const n=prompt('Имя файла','Новый документ.txt');if(!n)return;cur={p:['Документы'],k:n.includes('.')?n:n+'.txt'}}node(cur.p).c[cur.k]={t:'f',x:ta.value};saveFS();name();toast('Сохранено: '+cur.k)};
 const M={new(){cur=null;ta.value='';name()},open(){fi.click()},save:()=>save(0),as:()=>save(1),dl(){dl(cur?cur.k:'документ.txt',ta.value)},dt(){ta.setRangeText(new Date().toLocaleString('ru-RU'),ta.selectionStart,ta.selectionEnd,'end')},wr(){ta.wrap=ta.wrap=='off'?'soft':'off'}};
 b.querySelectorAll('[data-m]').forEach(x=>x.onclick=()=>M[x.dataset.m]());
 fi.onchange=()=>{const f=fi.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{cur=null;ta.value=r.result;name()};r.readAsText(f)};
 ta.onkeyup=ta.onclick=pos;ta.onkeydown=e=>{if((e.ctrlKey||e.metaKey)&&e.key=='s'){e.preventDefault();save(0)}};
 b.load=x=>{if(x&&x.p){cur=x;ta.value=node(x.p).c[x.k].x||'';name()}};arg?b.load(arg):name()}

/* ---------- Word ---------- */
function word(b,a,arg){
 let cur=null;
 b.innerHTML=`<div class="wd"><div class="wdt">${[['bold','Ж'],['italic','К'],['underline','Ч'],['justifyLeft','⇤'],['justifyCenter','↔'],['justifyRight','⇥'],['insertUnorderedList','• Список'],['insertOrderedList','1. Список']].map(x=>`<span data-x="${x[0]}">${x[1]}</span>`).join('')}<select data-s="fontSize"><option value="3">Обычный</option><option value="2">Мелкий</option><option value="5">Крупный</option><option value="7">Огромный</option></select><input type="color" data-s="foreColor" value="#000000"><i></i><span data-f="new">Новый</span><span data-f="save">Сохранить</span><span data-f="as">Сохранить как…</span><span data-f="dl">Скачать .doc</span></div><div class="wpg"><div class="doc" contenteditable="true" spellcheck="false"></div></div></div>`;
 const doc=b.querySelector('.doc');
 const name=()=>asktitle(b,(cur?cur.k:'Документ')+' — Word');
 const save=as=>{if(!cur||as){const n=prompt('Имя файла','Документ.doc');if(!n)return;cur={p:['Документы'],k:n.includes('.')?n:n+'.doc'}}node(cur.p).c[cur.k]={t:'f',x:doc.innerHTML};saveFS();name();toast('Сохранено: '+cur.k)};
 const F={new(){cur=null;doc.innerHTML='';name()},save:()=>save(0),as:()=>save(1),dl(){dl((cur?cur.k:'Документ.doc'),'<html><head><meta charset="utf-8"></head><body>'+doc.innerHTML+'</body></html>','application/msword')}};
 b.querySelectorAll('[data-x]').forEach(x=>{x.onmousedown=e=>{e.preventDefault();doc.focus();document.execCommand(x.dataset.x)}});
 b.querySelectorAll('[data-s]').forEach(x=>x.oninput=()=>{doc.focus();document.execCommand(x.dataset.s,false,x.value)});
 b.querySelectorAll('[data-f]').forEach(x=>x.onclick=()=>F[x.dataset.f]());
 b.load=x=>{if(x&&x.p){cur=x;doc.innerHTML=node(x.p).c[x.k].x||'';name()}};arg?b.load(arg):(doc.innerHTML='<p>Начните печатать…</p>',name())}

/* ---------- Excel ---------- */
function excel(b,a,arg){
 let cur=null,D={};const C='ABCDEFGHIJ',N=25;
 const rng=(x,y)=>{const i=C.indexOf(x[0]),j=C.indexOf(y[0]),r1=+x.slice(1),r2=+y.slice(1),o=[];for(let c=Math.min(i,j);c<=Math.max(i,j);c++)for(let r=Math.min(r1,r2);r<=Math.max(r1,r2);r++)o.push(C[c]+r);return o};
 const sum=v=>v.reduce((s,x)=>s+x,0);
 const val=(r,d=0)=>{const x=D[r];if(x===undefined||x==='')return '';if(x[0]!=='=')return !isNaN(x)?+x:x;if(d>30)return '#ЦИКЛ';
  try{const e=x.slice(1).toUpperCase().replace(/(SUM|AVERAGE|AVG|MIN|MAX|COUNT)\(([A-J]\d+):([A-J]\d+)\)/g,(m,f,p,z)=>{const v=rng(p,z).map(q=>val(q,d+1)).filter(v=>typeof v=='number');return f=='SUM'?sum(v):f=='COUNT'?v.length:!v.length?0:f=='MIN'?Math.min(...v):f=='MAX'?Math.max(...v):sum(v)/v.length}).replace(/[A-J]\d+/g,q=>{const v=val(q,d+1);return typeof v=='number'?'('+v+')':'0'});
  if(!/^[\d+\-*/().\s]*$/.test(e))return '#ИМЯ?';const v=Function('"use strict";return ('+e+')')();return isFinite(v)?+v.toFixed(10):'#ДЕЛ/0!'}catch(_){return '#ОШИБКА'}};
 b.innerHTML=`<div class="xl"><div class="wdt"><span data-x="new">Новый</span><span data-x="save">Сохранить</span><span data-x="as">Сохранить как…</span><span data-x="csv">Скачать CSV</span><input class="fx" placeholder="Формулы: =A1+B1*2, =SUM(A1:A5), AVERAGE, MIN, MAX, COUNT" readonly></div><div class="xg"><table><tr><th></th>${[...C].map(c=>`<th>${c}</th>`).join('')}</tr>${[...Array(N)].map((_,r)=>`<tr><th>${r+1}</th>${[...C].map(c=>`<td><input data-r="${c}${r+1}"></td>`).join('')}</tr>`).join('')}</table></div></div>`;
 const tb=b.querySelector('table'),fx=b.querySelector('.fx');
 const refresh=()=>tb.querySelectorAll('input').forEach(i=>{if(i!==document.activeElement)i.value=val(i.dataset.r)})
 const name=()=>asktitle(b,(cur?cur.k:'Книга1')+' — Excel');
 const save=as=>{if(!cur||as){const n=prompt('Имя файла','Книга1.xls');if(!n)return;cur={p:['Документы'],k:n.includes('.')?n:n+'.xls'}}node(cur.p).c[cur.k]={t:'f',x:JSON.stringify(D)};saveFS();name();toast('Сохранено: '+cur.k)};
 const X={new(){cur=null;D={};refresh();name()},save:()=>save(0),as:()=>save(1),csv(){const rows=[];for(let r=1;r<=N;r++)rows.push([...C].map(c=>'"'+String(val(c+r)).replace(/"/g,'""')+'"').join(','));dl((cur?cur.k:'Книга1')+'.csv',rows.join('\n'),'text/csv')}};
 b.querySelectorAll('[data-x]').forEach(x=>x.onclick=()=>X[x.dataset.x]());
 tb.addEventListener('focusin',e=>{const r=e.target.dataset.r;if(r){e.target.value=D[r]||'';fx.value=e.target.value}});
 tb.addEventListener('input',e=>{if(e.target.dataset.r)fx.value=e.target.value});
 tb.addEventListener('focusout',e=>{const r=e.target.dataset.r;if(r){const v=e.target.value.trim();v?D[r]=v:delete D[r];e.target.value=val(r);refresh()}});
 tb.addEventListener('keydown',e=>{const r=e.target.dataset.r;if(r&&e.key=='Enter'){e.target.blur();const n=tb.querySelector(`[data-r="${r[0]}${+r.slice(1)+1}"]`);n&&n.focus()}});
 b.load=x=>{if(x&&x.p){cur=x;try{D=JSON.parse(node(x.p).c[x.k].x||'{}')}catch(e){D={}}refresh();name()}};arg?b.load(arg):name()}

/* ---------- PowerPoint ---------- */
function ppt(b,a,arg){
 let cur=null,S_=[{t:'Заголовок презентации',b:'Подзаголовок'}],i=0,bg=0;const TH=[['Светлая','#ffffff','#1a1a1a'],['Синяя','#1f4fd8','#ffffff'],['Тёмная','#14161c','#ffffff']];
 b.innerHTML=`<div class="pp"><div class="wdt">${[['add','＋ Слайд'],['del','Удалить слайд'],['show','▶ Показ'],['save','Сохранить'],['as','Сохранить как…']].map(x=>`<span data-p="${x[0]}">${x[1]}</span>`).join('')}<select>${TH.map((t,j)=>`<option value="${j}">${t[0]}</option>`).join('')}</select></div><div class="ppm"><div class="ppl"></div><div class="pps"><div class="sl"><h1 contenteditable="true"></h1><div class="sb" contenteditable="true"></div></div></div></div></div>`;
 const sl=b.querySelector('.sl'),h1=sl.querySelector('h1'),sb=sl.querySelector('.sb'),ls=b.querySelector('.ppl'),sel=b.querySelector('select');
 const th=()=>{sl.style.background=TH[bg][1];sl.style.color=TH[bg][2];sel.value=bg};
 const L=()=>{ls.innerHTML=S_.map((s,j)=>`<div class="th${j==i?' on':''}" data-j="${j}"><small>${j+1}</small><b>${esc(s.t||'Без названия')}</b></div>`).join('')};
 const show=()=>{h1.textContent=S_[i].t;sb.innerText=S_[i].b;th();L()};
 const name=()=>asktitle(b,(cur?cur.k:'Презентация1')+' — PowerPoint');
 const save=as=>{if(!cur||as){const n=prompt('Имя файла','Презентация1.ppt');if(!n)return;cur={p:['Документы'],k:n.includes('.')?n:n+'.ppt'}}node(cur.p).c[cur.k]={t:'f',x:JSON.stringify({s:S_,bg})};saveFS();name();toast('Сохранено: '+cur.k)};
 function present(){let k=i;const o=el('<div class="show" tabindex="0"><div class="sl big"></div></div>');document.body.appendChild(o);const p=o.firstElementChild;
  const D=()=>{p.style.background=TH[bg][1];p.style.color=TH[bg][2];p.innerHTML=`<h1>${esc(S_[k].t)}</h1><div class="sb">${esc(S_[k].b).replace(/\n/g,'<br>')}</div><small>${k+1} / ${S_.length}</small>`};D();o.focus();
  const nx=d=>{k=Math.max(0,Math.min(S_.length-1,k+d));D()};o.onclick=e=>nx(e.clientX<innerWidth/4?-1:1);
  o.onkeydown=e=>{if(e.key=='Escape'){o.remove();document.fullscreenElement&&document.exitFullscreen()}else if(['ArrowRight',' ','PageDown','Enter'].includes(e.key))nx(1);else if(['ArrowLeft','PageUp','Backspace'].includes(e.key))nx(-1)};
  o.requestFullscreen&&o.requestFullscreen().catch(()=>{})}
 const P_={add(){S_.splice(i+1,0,{t:'Новый слайд',b:''});i++;show()},del(){if(S_.length<2)return toast('Нельзя удалить единственный слайд');S_.splice(i,1);i=Math.min(i,S_.length-1);show()},show:present,save:()=>save(0),as:()=>save(1)};
 b.querySelectorAll('[data-p]').forEach(x=>x.onclick=()=>P_[x.dataset.p]());
 sel.onchange=()=>{bg=+sel.value;th()};
 h1.oninput=()=>{S_[i].t=h1.textContent;const e=ls.querySelector('.on b');if(e)e.textContent=S_[i].t||'Без названия'};sb.oninput=()=>{S_[i].b=sb.innerText};
 ls.onclick=e=>{const t=e.target.closest('[data-j]');if(t){i=+t.dataset.j;show()}};
 b.load=x=>{if(x&&x.p){cur=x;try{const d=JSON.parse(node(x.p).c[x.k].x);S_=Array.isArray(d)?d:d.s;bg=d.bg||0}catch(e){}i=0;show();name()}};arg?b.load(arg):(show(),name())}
