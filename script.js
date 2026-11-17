const wins=['explorer','notepad','edge','settings','recycle'];
let z=10;

function openWin(name){
  const w=document.getElementById('win-'+name);
  if(!w) return;
  w.classList.remove('hidden');
  w.style.zIndex=++z;
  document.querySelector('.tb-btn[onclick*="'+name+'"]')?.classList.add('active');
}
function closeWin(name){ document.getElementById('win-'+name).classList.add('hidden'); setInactive(name); }
function minimize(name){ document.getElementById('win-'+name).classList.add('hidden'); setInactive(name); }
function toggleMax(name){
  const w=document.getElementById('win-'+name);
  if(w.dataset.max==='1'){
    Object.assign(w.style, JSON.parse(w.dataset.prev));
    w.classList.remove('max'); w.dataset.max='0';
  }else{
    w.dataset.prev=JSON.stringify({left:w.style.left,top:w.style.top,width:w.style.width,height:w.style.height});
    Object.assign(w.style,{left:'0px',top:'0px',width:'100vw',height:'calc(100vh - 48px)'});
    w.classList.add('max'); w.dataset.max='1';
  }
}
function toggleWin(name){
  const w=document.getElementById('win-'+name);
  if(w.classList.contains('hidden')) openWin(name); else minimize(name);
}
function setInactive(name){ document.querySelector('.tb-btn[onclick*="'+name+'"]')?.classList.remove('active'); }

function setAccent(c,el){
  document.documentElement.style.setProperty('--accent',c);
  document.querySelectorAll('.sw').forEach(s=>s.classList.remove('active'));
  el.classList.add('active');
}

// dragging
document.querySelectorAll('.titlebar').forEach(tb=>{
  tb.addEventListener('mousedown',e=>{
    if(e.target.classList.contains('wbtn')) return;
    const win=tb.closest('.win');
    if(win.dataset.max==='1') return;
    win.style.zIndex=++z;
    const sx=e.clientX, sy=e.clientY;
    const ol=parseInt(win.style.left), ot=parseInt(win.style.top);
    function move(e){
      win.style.left=(ol+e.clientX-sx)+'px';
      win.style.top=Math.max(0,ot+e.clientY-sy)+'px';
    }
    function up(){document.removeEventListener('mousemove',move);document.removeEventListener('mouseup',up);}
    document.addEventListener('mousemove',move);
    document.addEventListener('mouseup',up);
  });
});
document.querySelectorAll('.win').forEach(w=>w.addEventListener('mousedown',()=>w.style.zIndex=++z));

// start menu
function toggleStart(){
  const sm=document.getElementById('startmenu');
  const ov=document.getElementById('overlay');
  const open=sm.classList.toggle('open');
  ov.classList.toggle('show',open);
  document.getElementById('start-btn').classList.toggle('active',open);
}
function closeStart(){
  document.getElementById('startmenu').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('start-btn').classList.remove('active');
}

// clock
function tick(){
  const now=new Date();
  document.getElementById('time').textContent=now.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'});
  document.getElementById('date').textContent=now.toLocaleDateString('ru-RU',{day:'2-digit',month:'2-digit',year:'numeric'});
}
tick(); setInterval(tick,1000*10);
