'use strict';
const dstr=x=>x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');
const MON=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
function mGrid(y,m,sel){const E=st.g('cal',{}),f=(new Date(y,m,1).getDay()+6)%7,n=new Date(y,m+1,0).getDate(),t=dstr(new Date());
 let h='<div class="mg">'+['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d=>`<small>${d}</small>`).join('');
 for(let i=0;i<42;i++){const d=i-f+1;if(d<1||d>n){h+='<span class="o"></span>';continue}const k=y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');h+=`<span class="d${k==t?' td':''}${k==sel?' sl':''}${E[k]&&E[k].length?' ev':''}" data-d="${k}">${d}</span>`}
 return h+'</div>'}

/* ---------- Почта ---------- */
function mail(b){
 const M=st.g('mail',null)||{in:[{id:1,f:'Команда Windows',s:'Добро пожаловать в Windows 11',b:'Это демонстрационная почта. Нажми «Создать письмо», чтобы написать своё.',u:1,d:'Сегодня'},{id:2,f:'Microsoft Store',s:'Новое в Store',b:'В Store можно установить Paint.',u:1,d:'Вчера'},{id:3,f:'Календарь',s:'Совет',b:'События из «Календаря» показываются в виджетах.',u:0,d:'Пн'}],out:[],tr:[]};
 let fo='in',sel=null,comp=false;const sv_=()=>st.s('mail',M),L={in:'Входящие',out:'Отправленные',tr:'Удалённые'};
 function R(){const l=M[fo],m=l.find(x=>x.id==sel);
  b.innerHTML=`<div class="ml"><div class="mf"><div class="mb" data-n="1">✉ Создать письмо</div>${Object.keys(L).map(k=>`<div class="${k==fo&&!comp?'on':''}" data-f="${k}">${L[k]}<small>${M[k].length}</small></div>`).join('')}</div>
  <div class="mi">${l.length?l.map(x=>`<div class="mm${x.u?' un':''}${x.id==sel?' on':''}" data-i="${x.id}"><b>${esc(fo=='out'?'Кому: '+x.f:x.f)}</b><span>${esc(x.s)}</span><small>${esc(x.d)}</small></div>`).join(''):'<div class="none">Писем нет</div>'}</div>
  <div class="mr">${comp?`<input class="mc" id="mt" placeholder="Кому"><input class="mc" id="ms" placeholder="Тема"><textarea class="mc" id="mb" placeholder="Текст письма"></textarea><div class="wdt"><span data-s="send">Отправить</span><span data-s="ext">Открыть в почтовой программе</span><span data-s="x">Отмена</span></div>`:m?`<h3>${esc(m.s)}</h3><small>${esc(fo=='out'?'Кому: ':'От: ')+esc(m.f)} · ${esc(m.d)}</small><p>${esc(m.b).replace(/\n/g,'<br>')}</p><div class="wdt"><span data-s="del">${fo=='tr'?'Удалить навсегда':'Удалить'}</span><span data-s="re">Ответить</span></div>`:'<div class="none">Выберите письмо для чтения</div>'}</div></div>`}
 b.onclick=e=>{const t=e.target.closest('[data-n],[data-f],[data-i],[data-s]');if(!t)return;const d=t.dataset,m=M[fo].find(x=>x.id==sel),g=i=>b.querySelector(i);
  if(d.n){comp=true;R()}else if(d.f){fo=d.f;sel=null;comp=false;R()}else if(d.i){sel=+d.i;comp=false;M[fo].find(x=>x.id==sel).u=0;sv_();R()}
  else if(d.s=='x'){comp=false;R()}
  else if(d.s=='send'){const to=g('#mt').value.trim();if(!to)return toast('Укажите адресата');M.out.unshift({id:Date.now(),f:to,s:g('#ms').value||'(без темы)',b:g('#mb').value,u:0,d:new Date().toLocaleString('ru-RU',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})});sv_();comp=false;fo='out';sel=null;toast('Письмо сохранено в «Отправленные»');R()}
  else if(d.s=='ext'){location.href='mailto:'+encodeURIComponent(g('#mt').value)+'?subject='+encodeURIComponent(g('#ms').value)+'&body='+encodeURIComponent(g('#mb').value)}
  else if(d.s=='del'&&m){M[fo]=M[fo].filter(x=>x.id!=sel);if(fo!='tr')M.tr.unshift(m);sel=null;sv_();R()}
  else if(d.s=='re'&&m){comp=true;R();g('#mt').value=m.f;g('#ms').value='Re: '+m.s}};
 R()}

/* ---------- Microsoft Store ---------- */
function store(b){
 const CAT=[['paint','Paint','Рисуйте и сохраняйте рисунки в PNG'],['word','Word','Текстовый редактор'],['excel','Excel','Таблицы и формулы'],['ppt','PowerPoint','Презентации и показ слайдов'],['photos','Фотографии','Просмотр изображений'],['onenote','OneNote','Заметки'],['todo','To Do','Списки задач'],['calendar','Календарь','События и даты'],['mail','Почта','Письма'],['xbox','Xbox','Змейка и Крестики-нолики'],['clock','Часы','Таймер, секундомер, будильник']];
 b.innerHTML='<div class="sr2"><input placeholder="Поиск приложений"></div><div class="sg"></div>';let q='';
 function R(){const inst=st.g('inst',[]);b.querySelector('.sg').innerHTML=CAT.filter(c=>(c[1]+c[2]).toLowerCase().includes(q)).map(c=>{const has=c[0]!='paint'||inst.includes('paint');return `<div class="sc2">${I[A[c[0]].i]}<div><b>${c[1]}</b><small>${c[2]}</small></div><button data-a="${c[0]}" data-h="${has?1:0}">${has?'Открыть':'Установить'}</button></div>`}).join('')}
 b.querySelector('input').oninput=e=>{q=e.target.value.toLowerCase();R()};
 b.onclick=e=>{const t=e.target.closest('button');if(!t)return;if(t.dataset.h=='1')open(t.dataset.a);else{const i=st.g('inst',[]);i.push('paint');st.s('inst',i);toast('Paint установлен');R()}};R()}

/* ---------- Фотографии ---------- */
function photos(b,a,arg){
 let i=-1;
 function R(){b.innerHTML=i<0?`<div class="ph"><div class="pgd">${WP.map((w,j)=>`<div data-j="${j}"><img src="wallpapers/thumbs/${w}.jpg" alt=""></div>`).join('')}</div></div>`:`<div class="pv2"><div class="wdt"><span data-a="back">← Галерея</span><span data-a="prev">‹</span><span>${i+1} / ${WP.length}</span><span data-a="next">›</span><span data-a="bg">Сделать фоном</span></div><div class="pvi"><img src="wallpapers/${WP[i]}.jpg" alt=""></div></div>`}
 b.onclick=e=>{const t=e.target.closest('[data-j],[data-a]');if(!t)return;const a=t.dataset.a;if(t.dataset.j!==undefined)i=+t.dataset.j;else if(a=='back')i=-1;else if(a=='prev')i=(i+WP.length-1)%WP.length;else if(a=='next')i=(i+1)%WP.length;else if(a=='bg'){setWall(WP[i]);return toast('Фон рабочего стола изменён')}R()};
 b.load=x=>{i=typeof x=='string'?WP.indexOf(x):-1;R()};arg!==undefined?b.load(arg):R()}

/* ---------- OneNote ---------- */
function onenote(b){
 let N=st.g('notes',null)||[{id:1,t:'Моя первая заметка',b:'Здесь можно писать заметки. Они сохраняются в браузере.'}],cur=N[0]&&N[0].id;const sv_=()=>st.s('notes',N);
 function R(){const n=N.find(x=>x.id==cur);b.innerHTML=`<div class="on1"><div class="nl"><div class="mb" data-a="add">＋ Новая заметка</div>${N.map(x=>`<div class="ni${x.id==cur?' on':''}" data-i="${x.id}"><b>${esc(x.t||'Без названия')}</b><small>${esc(x.b.slice(0,40))}</small></div>`).join('')}</div><div class="ne">${n?`<input class="nt" value="${esc(n.t)}" placeholder="Название"><div class="nb" contenteditable="true">${esc(n.b).replace(/\n/g,'<br>')}</div><div class="wdt"><span data-a="del">Удалить заметку</span></div>`:'<div class="none">Нет заметок</div>'}</div></div>`}
 b.oninput=e=>{const n=N.find(x=>x.id==cur);if(!n)return;if(e.target.classList.contains('nt'))n.t=e.target.value;else n.b=e.target.innerText;sv_();const it=b.querySelector('.ni.on');if(it){it.querySelector('b').textContent=n.t||'Без названия';it.querySelector('small').textContent=n.b.slice(0,40)}};
 b.onclick=e=>{const t=e.target.closest('[data-a],[data-i]');if(!t)return;if(t.dataset.i){cur=+t.dataset.i}else if(t.dataset.a=='add'){const n={id:Date.now(),t:'',b:''};N.unshift(n);cur=n.id;sv_()}else{N=N.filter(x=>x.id!=cur);cur=N[0]&&N[0].id;sv_()}R()};R()}

/* ---------- To Do ---------- */
function todo(b){
 let T_=st.g('todo',null)||[{id:1,t:'Попробовать приложения Windows 11',d:0}],f='all';const sv_=()=>st.s('todo',T_);
 function R(){const l=T_.filter(x=>f=='all'||(f=='act'?!x.d:x.d));b.innerHTML=`<div class="td"><h2>Мой день</h2><div class="wdt">${[['all','Все'],['act','Активные'],['done','Выполненные']].map(x=>`<span class="${f==x[0]?'on':''}" data-f="${x[0]}">${x[1]}</span>`).join('')}</div><input class="ta2" placeholder="Добавить задачу и нажать Enter"><div class="tl">${l.length?l.map(x=>`<div class="ti${x.d?' dn':''}"><i data-c="${x.id}">${x.d?'✓':''}</i><span>${esc(x.t)}</span><b data-x="${x.id}">✕</b></div>`).join(''):'<div class="none">Задач нет</div>'}</div><small class="tf">Выполнено ${T_.filter(x=>x.d).length} из ${T_.length}</small></div>`;
  const i=b.querySelector('.ta2');i.onkeydown=e=>{if(e.key=='Enter'&&i.value.trim()){T_.push({id:Date.now(),t:i.value.trim(),d:0});sv_();R();b.querySelector('.ta2').focus()}}}
 b.onclick=e=>{const t=e.target.closest('[data-f],[data-c],[data-x]');if(!t)return;const d=t.dataset;if(d.f)f=d.f;else if(d.c){const x=T_.find(z=>z.id==d.c);x.d=x.d?0:1;sv_()}else{T_=T_.filter(z=>z.id!=d.x);sv_()}R()};R()}

/* ---------- Календарь ---------- */
function calendar(b){
 const n=new Date();let y=n.getFullYear(),m=n.getMonth(),sel=dstr(n);
 function R(){const E=st.g('cal',{}),ev=E[sel]||[];b.innerHTML=`<div class="cl"><div class="cm"><div class="wdt"><span data-a="p">‹</span><b class="mt">${MON[m]} ${y}</b><span data-a="n">›</span><span data-a="t">Сегодня</span></div>${mGrid(y,m,sel)}</div><div class="cs"><h3>${sel.split('-').reverse().join('.')}</h3>${ev.length?ev.map((t,i)=>`<div class="ce"><span>${esc(t)}</span><b data-x="${i}">✕</b></div>`).join(''):'<div class="none">Нет событий</div>'}<input class="ta2" placeholder="Новое событие и Enter"></div></div>`;
  const i=b.querySelector('.ta2');i.onkeydown=e=>{if(e.key=='Enter'&&i.value.trim()){const E=st.g('cal',{});(E[sel]=E[sel]||[]).push(i.value.trim());st.s('cal',E);R();b.querySelector('.ta2').focus()}}}
 b.onclick=e=>{const t=e.target.closest('[data-a],[data-d],[data-x]');if(!t)return;const d=t.dataset;
  if(d.d)sel=d.d;else if(d.a=='p'){m--;if(m<0){m=11;y--}}else if(d.a=='n'){m++;if(m>11){m=0;y++}}else if(d.a=='t'){const z=new Date();y=z.getFullYear();m=z.getMonth();sel=dstr(z)}
  else if(d.x!==undefined){const E=st.g('cal',{});E[sel].splice(+d.x,1);st.s('cal',E)}R()};R()}

/* ---------- Часы ---------- */
function clock(b){
 let tab=0,tm={left:300,init:300,run:0,end:0},sw={ms:0,run:0,t0:0,laps:[]};
 const TZ=[['Местное',undefined],['Москва','Europe/Moscow'],['Лондон','Europe/London'],['Берлин','Europe/Berlin'],['Нью-Йорк','America/New_York'],['Токио','Asia/Tokyo']],f2=n=>String(n).padStart(2,'0'),fm=s=>f2(Math.floor(s/3600))+':'+f2(Math.floor(s%3600/60))+':'+f2(Math.floor(s%60)),fs=ms=>f2(Math.floor(ms/60000))+':'+f2(Math.floor(ms/1000)%60)+','+f2(Math.floor(ms/10)%100);
 const P=()=>tab==0?TZ.map((z,i)=>`<div class="zr"><span>${z[0]}</span><b id="z${i}"></b></div>`).join(''):
  tab==1?`<div class="big" id="tv">${fm(tm.left)}</div><div class="wdt"><input type="number" id="tmn" min="0" max="999" value="${Math.floor(tm.init/60)}"> мин <input type="number" id="tss" min="0" max="59" value="${tm.init%60}"> сек</div><div class="wdt"><button data-a="ts">${tm.run?'Пауза':'Старт'}</button><button data-a="tr">Сброс</button></div>`:
  tab==2?`<div class="big" id="sw">${fs(sw.ms)}</div><div class="wdt"><button data-a="ss">${sw.run?'Стоп':'Старт'}</button><button data-a="sl">Круг</button><button data-a="sr">Сброс</button></div>${sw.laps.map((l,i)=>`<div class="zr"><span>Круг ${sw.laps.length-i}</span><b>${fs(l)}</b></div>`).join('')}`:
  `<div class="wdt"><input type="time" id="at" value="07:00"><button data-a="aa">Добавить будильник</button></div>${st.g('alarms',[]).map(a=>`<div class="zr"><b>${a.t}</b><span><div class="tg${a.on?' on':''}" data-a="at" data-i="${a.id}"></div> <button data-a="ad" data-i="${a.id}">✕</button></span></div>`).join('')||'<div class="none">Будильников нет</div>'}`;
 function R(){b.innerHTML=`<div class="ck"><div class="ct">${['Мировое время','Таймер','Секундомер','Будильник'].map((t,i)=>`<span class="${i==tab?'on':''}" data-t="${i}">${t}</span>`).join('')}</div><div class="cb2">${P()}</div></div>`}
 const g=i=>b.querySelector(i);
 const iv=setInterval(()=>{if(!b.isConnected){clearInterval(iv);return}const n=new Date();
  if(tab==0)TZ.forEach((z,i)=>{const e=g('#z'+i);if(e)e.textContent=n.toLocaleTimeString('ru-RU',{timeZone:z[1]})+' · '+n.toLocaleDateString('ru-RU',{timeZone:z[1],weekday:'short',day:'numeric',month:'short'})});
  if(tab==1&&tm.run){tm.left=Math.max(0,(tm.end-Date.now())/1000);if(tm.left<=0){tm.run=0;beep();toast('⏱ Таймер завершён');R()}else g('#tv').textContent=fm(Math.ceil(tm.left))}
  if(tab==2&&sw.run){sw.ms=Date.now()-sw.t0;g('#sw').textContent=fs(sw.ms)}},100);
 b.onclick=e=>{const t=e.target.closest('[data-t],[data-a]');if(!t)return;const d=t.dataset,a=d.a;
  if(d.t!==undefined){tab=+d.t}
  else if(a=='ts'){if(tm.run){tm.left=Math.max(0,(tm.end-Date.now())/1000);tm.run=0}else{if(tm.left==tm.init||tm.left<=0){tm.init=tm.left=(+g('#tmn').value||0)*60+(+g('#tss').value||0)}if(tm.left>0){tm.end=Date.now()+tm.left*1000;tm.run=1}}}
  else if(a=='tr'){tm.run=0;tm.init=tm.left=(+g('#tmn').value||0)*60+(+g('#tss').value||0)}
  else if(a=='ss'){if(sw.run){sw.ms=Date.now()-sw.t0;sw.run=0}else{sw.t0=Date.now()-sw.ms;sw.run=1}}
  else if(a=='sl'){if(sw.run)sw.laps.unshift(sw.ms)}else if(a=='sr'){sw={ms:0,run:0,t0:0,laps:[]}}
  else if(a=='aa'){const A_=st.g('alarms',[]);A_.push({id:Date.now(),t:g('#at').value||'07:00',on:1});st.s('alarms',A_)}
  else if(a=='at'){const A_=st.g('alarms',[]);const x=A_.find(z=>z.id==d.i);x.on=x.on?0:1;st.s('alarms',A_)}
  else if(a=='ad'){st.s('alarms',st.g('alarms',[]).filter(z=>z.id!=d.i))}R()};R()}

/* ---------- Paint ---------- */
function paint(b){
 b.innerHTML=`<div class="pa2"><div class="wdt"><input type="color" value="#000000"><input type="range" min="1" max="40" value="4"><span data-a="pen" class="on">Кисть</span><span data-a="er">Ластик</span><span data-a="clr">Очистить</span><span data-a="save">Сохранить PNG</span></div><div class="pcv"><canvas width="1000" height="640"></canvas></div></div>`;
 const cv=b.querySelector('canvas'),x=cv.getContext('2d'),col=b.querySelector('[type=color]'),sz=b.querySelector('[type=range]');let er=0,dr=0;
 const fill=()=>{x.fillStyle='#fff';x.fillRect(0,0,1000,640)};fill();x.lineCap=x.lineJoin='round';
 const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*1000/r.width,(e.clientY-r.top)*640/r.height]};
 cv.onpointerdown=e=>{dr=1;cv.setPointerCapture(e.pointerId);const p=pt(e);x.strokeStyle=x.fillStyle=er?'#fff':col.value;x.lineWidth=+sz.value*(er?2:1);x.beginPath();x.moveTo(...p);x.lineTo(p[0]+.1,p[1]);x.stroke()};
 cv.onpointermove=e=>{if(!dr)return;const p=pt(e);x.lineTo(...p);x.stroke();x.beginPath();x.moveTo(...p)};cv.onpointerup=()=>dr=0;
 b.querySelectorAll('[data-a]').forEach(s=>s.onclick=()=>{const a=s.dataset.a;if(a=='clr')fill();else if(a=='save')cv.toBlob(bl=>{const l=document.createElement('a');l.href=URL.createObjectURL(bl);l.download='Рисунок.png';l.click()});else{er=a=='er'?1:0;b.querySelectorAll('[data-a=pen],[data-a=er]').forEach(z=>z.classList.toggle('on',z===s))}})}

/* ---------- Xbox (игры) ---------- */
function xbox(b){
 let g=0;
 function R(){b.innerHTML=`<div class="xb"><div class="ct">${['Змейка','Крестики-нолики'].map((t,i)=>`<span class="${i==g?'on':''}" data-g="${i}">${t}</span>`).join('')}</div><div class="gm"></div></div>`;g?ttt(b.querySelector('.gm')):snake(b.querySelector('.gm'))}
 b.onclick=e=>{const t=e.target.closest('[data-g]');if(t){g=+t.dataset.g;R()}};R()}
function snake(c){
 c.innerHTML='<canvas width="400" height="400"></canvas><div class="sc3"></div><div class="wdt"><button data-d="0,-1">▲</button><button data-d="-1,0">◀</button><button data-d="0,1">▼</button><button data-d="1,0">▶</button><button data-d="r">Заново</button></div>';
 const cv=c.querySelector('canvas'),x=cv.getContext('2d');let s,d,n,f,sc,over,iv;
 const spawn=()=>{do f=[Math.floor(Math.random()*20),Math.floor(Math.random()*20)];while(s.some(p=>p[0]==f[0]&&p[1]==f[1]))};
 const rst=()=>{s=[[10,10],[9,10],[8,10]];d=n=[1,0];sc=0;over=0;spawn();draw()};
 function draw(){x.fillStyle='#111';x.fillRect(0,0,400,400);x.fillStyle='#e74856';x.fillRect(f[0]*20+2,f[1]*20+2,16,16);x.fillStyle='#16c60c';s.forEach(p=>x.fillRect(p[0]*20+1,p[1]*20+1,18,18));c.querySelector('.sc3').textContent='Счёт: '+sc+(over?' — игра окончена':'  ·  стрелки на клавиатуре или кнопки')}
 const turn=(a,e)=>{if(d[0]+a!=0||d[1]+e!=0)n=[a,e]};
 c.onclick=e=>{const t=e.target.closest('[data-d]');if(!t)return;t.dataset.d=='r'?rst():turn(...t.dataset.d.split(',').map(Number))};
 const kd=e=>{if(!cv.isConnected){document.removeEventListener('keydown',kd);clearInterval(iv);return}if(F!=='xbox')return;const m={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];if(m){e.preventDefault();turn(...m)}};document.addEventListener('keydown',kd);
 iv=setInterval(()=>{if(!cv.isConnected){clearInterval(iv);return}if(over)return;d=n;const h=[s[0][0]+d[0],s[0][1]+d[1]];if(h[0]<0||h[1]<0||h[0]>19||h[1]>19||s.some(p=>p[0]==h[0]&&p[1]==h[1])){over=1;return draw()}s.unshift(h);if(h[0]==f[0]&&h[1]==f[1]){sc++;spawn()}else s.pop();draw()},130);rst()}
function ttt(c){
 let B=Array(9).fill(''),end=0;const W3=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
 const win=p=>W3.find(l=>l.every(i=>B[i]==p)),full=()=>B.every(Boolean);
 const bot=()=>{const m=B.map((v,i)=>v?-1:i).filter(i=>i>=0);for(const p of['O','X'])for(const i of m){B[i]=p;const w=win(p);B[i]='';if(w)return i}return B[4]?m[Math.floor(Math.random()*m.length)]:4};
 function R(){const w=win('X')||win('O'),msg=win('X')?'Вы победили!':win('O')?'Победил компьютер':full()?'Ничья':'Ваш ход (X)';end=!!(w||full());
  c.innerHTML=`<div class="tt3">${B.map((v,i)=>`<div data-i="${i}">${v}</div>`).join('')}</div><div class="sc3">${msg}</div><div class="wdt"><button data-r="1">Новая игра</button></div>`}
 c.onclick=e=>{const t=e.target.closest('[data-i],[data-r]');if(!t)return;if(t.dataset.r){B=Array(9).fill('');return R()}const i=+t.dataset.i;if(B[i]||end)return;B[i]='X';if(!win('X')&&!full())B[bot()]='O';R()};R()}

/* ---------- Параметры ---------- */
function applySet(){const S=SET();document.documentElement.style.filter=(S.bright<100||S.night)?`brightness(${S.bright}%)${S.night?' sepia(.35)':''}`:'';
 document.body.classList.toggle('tl',S.left);const u=document.getElementById('uname');if(u)u.textContent=S.name;const q=document.getElementById('tq');if(q)q.classList.toggle('woff',!S.wifi);if(window.tick)tick()}
function settings(b,a,arg){
 let tab=typeof arg=='number'?arg:3;const S=()=>SET();
 const TB=['Система','Bluetooth и устройства','Сеть и Интернет','Персонализация','Приложения','Учётные записи','Время и язык'];
 const tg=(k,l,d='')=>`<div class="srow"><div><b>${l}</b><small>${d}</small></div><div class="tg${S()[k]?' on':''}" data-tg="${k}"></div></div>`,
  rg=(k,l,mi,ma)=>`<div class="srow"><b>${l}</b><input type="range" data-in="${k}" min="${mi}" max="${ma}" value="${S()[k]}"></div>`,
  tx=(k,l)=>`<div class="srow"><b>${l}</b><input class="stx" data-in="${k}" value="${esc(S()[k])}"></div>`,
  ro=(l,v)=>`<div class="srow"><b>${l}</b><span>${v}</span></div>`;
 const C=['#0078d4','#0099bc','#7a4fd6','#c239b3','#d13438','#ca5010','#107c10','#767676'];
 const PG=[
  ()=>`<h2>Система</h2>${tx('pc','Имя устройства')}${rg('bright','Яркость',30,100)}${rg('vol','Громкость',0,100)}${tg('night','Ночной свет','Тёплые цвета экрана')}<h5>О системе</h5>${ro('Windows 11 Pro','веб-версия')}${ro('Язык',navigator.language)}${ro('Ядер процессора',navigator.hardwareConcurrency||'—')}${ro('Память',navigator.deviceMemory?navigator.deviceMemory+' ГБ':'—')}${ro('Экран',screen.width+'×'+screen.height)}`,
  ()=>`<h2>Bluetooth и устройства</h2>${tg('bt','Bluetooth',S().bt?'Включён':'Выключен')}${ro('Устройства',S().bt?'Поблизости ничего не найдено':'Включите Bluetooth для поиска')}`,
  ()=>`<h2>Сеть и Интернет</h2>${tg('wifi','Wi‑Fi',S().wifi?'Подключено':'Отключено')}${ro('Состояние браузера',navigator.onLine?'Есть подключение':'Нет сети')}${ro('Тип соединения',(navigator.connection&&navigator.connection.effectiveType)||'—')}<small class="hint">Если Wi‑Fi выключен, Edge показывает страницу «Нет подключения».</small>`,
  ()=>{const cw=WS||(document.body.dataset.theme=='dark'?'img19':'img0');return `<h2>Персонализация</h2><h5>Выберите тему</h5><div class="tcs"><div class="tcard" data-t="light"><div class="pv l"></div>Светлая</div><div class="tcard" data-t="dark"><div class="pv d"></div>Тёмная</div></div><h5>Фон рабочего стола</h5><div class="wps">${WP.map(w=>`<div class="wp${w===cw?' on':''}" data-w="${w}"><img src="wallpapers/thumbs/${w}.jpg" alt=""></div>`).join('')}</div><h5>Цвет элементов</h5><div class="sws">${C.map(c=>`<div class="sw" data-c="${c}" style="background:${c}"></div>`).join('')}</div><h5>Панель задач</h5>${tg('left','Выравнивание по левому краю')}`},
  ()=>{const inst=st.g('inst',[]);return `<h2>Приложения</h2>${Object.keys(A).filter(id=>id!='paint'||inst.includes('paint')).map(id=>`<div class="srow"><span class="ai">${I[A[id].i]}<b>${A[id].n}</b></span><span><button data-o="${id}">Открыть</button>${id=='paint'?'<button data-u="paint">Удалить</button>':''}</span></div>`).join('')}`},
  ()=>`<h2>Учётные записи</h2>${tx('name','Имя пользователя')}${ro('Тип','Локальная учётная запись')}<div class="srow"><div><b>Сбросить данные</b><small>Файлы, заметки, письма и настройки демо будут удалены</small></div><button data-reset="1">Сбросить</button></div>`,
  ()=>{const n=new Date();return `<h2>Время и язык</h2>${tg('h24','24-часовой формат')}${tg('secs','Показывать секунды на панели задач')}${ro('Сейчас',n.toLocaleString('ru-RU'))}${ro('Часовой пояс',Intl.DateTimeFormat().resolvedOptions().timeZone)}`}];
 function R(){b.innerHTML=`<div class="st"><div class="sn"><div class="su">${I.user}<div><b>${esc(S().name)}</b><small>Локальная учётная запись</small></div></div>${TB.map((t,i)=>`<div class="${i==tab?'on':''}" data-tab="${i}">${t}</div>`).join('')}</div><div class="sp">${PG[tab]()}</div></div>`}
 b.onclick=e=>{const t=e.target.closest('[data-tab],[data-tg],[data-t],[data-w],[data-c],[data-o],[data-u],[data-reset]');if(!t)return;const d=t.dataset;
  if(d.tab!==undefined)tab=+d.tab;else if(d.tg){SET()[d.tg]=!SET()[d.tg];saveSet();applySet()}else if(d.t)setTheme(d.t);else if(d.w)setWall(d.w);else if(d.c){AC=d.c;applyAcc()}
  else if(d.o){open(d.o);return}else if(d.u){st.s('inst',st.g('inst',[]).filter(x=>x!='paint'));closeWin('paint')}
  else if(d.reset){if(!confirm('Удалить все данные демо и перезагрузить страницу?'))return;try{Object.keys(localStorage).filter(k=>k.startsWith('w11')).forEach(k=>localStorage.removeItem(k))}catch(_){}location.reload();return}R()};
 b.oninput=e=>{const k=e.target.dataset.in;if(!k)return;SET()[k]=e.target.type=='range'?+e.target.value:e.target.value;saveSet();applySet()};
 b.load=n=>{if(typeof n=='number'){tab=n;R()}};R()}
