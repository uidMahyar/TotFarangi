// منطق جستجو، فیلتر دسته، ستاره (دسته اصلی) و نمایش کارت‌ها
const COL=['#0a7ea4','#7b5ea7','#2e8b57','#d9822b','#b5446e','#2a9d8f','#3b6fd8','#c0392b','#8e6c1e','#4a5568','#6a4c93'];
let fav={};try{fav=JSON.parse(localStorage.getItem('kf')||'{}')}catch(e){}
function sv(){try{localStorage.setItem('kf',JSON.stringify(fav))}catch(e){}}
function tog(i){const t=D[i][1];if(fav[t])delete fav[t];else fav[t]=1;sv();render()}
const fm=x=>x==='t'?'توافقی':(+x*1000).toLocaleString('fa');
function pr(i){return '<div class="pr">'+P[i].split('|').map(e=>{const k=e.lastIndexOf('='),p=e.slice(k+1);return '<div><span>'+e.slice(0,k)+'</span><b>'+p.split('/').map(fm).join(' / ')+(p==='t'?'':' تومان')+'</b></div>'}).join('')+'</div>'}
const $=id=>document.getElementById(id);
const nz=s=>s.replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[\u200c\u200f]/g,' ').replace(/[۰-۹]/g,d=>d.charCodeAt(0)-1776).replace(/[٠-٩]/g,d=>d.charCodeAt(0)-1632).toLowerCase();
const H=D.map((c,i)=>nz([K[c[0]],c[1],c[2],c[3],c[4],c[5],P[i]].join(' ')));
let cat=-1;
function render(){
 const w=nz($('q').value).split(/\s+/).filter(Boolean);let out='',n=0;
 D.forEach((c,i)=>{
  if(cat>=0&&c[0]!==cat)return;if(cat===-2&&!fav[c[1]])return;if(!w.every(x=>H[i].includes(x)))return;n++;
  const st=(c[4]||DS).split('|').map(s=>'<li>'+s+'</li>').join('');
  const ln=c[2]?'<div class="ln">'+c[2].split(' ').map(d=>'<a href="https://'+d+'" target="_blank" rel="noopener noreferrer">'+d+'</a>').join('')+'</div>':'';
  out+='<article style="--c:'+COL[c[0]]+'"><div class="hd"><span class="av">'+K[c[0]].charAt(0)+'</span><div class="tt"><h2>'+c[1]+'</h2><div class="k">'+K[c[0]]+'</div></div><button class="st'+(fav[c[1]]?' on':'')+'" data-f="'+i+'" aria-label="دسته اصلی">★</button></div>'+ln+(c[3]?'<p class="nt'+(c[2]||c[6]?'':' w')+'">'+c[3]+'</p>':(c[2]||c[6]?'':'<p class="nt w">'+NL+'</p>'))+(c[2]?'<ol>'+st+'</ol>':'')+pr(i)+'<button class="op" data-o="'+i+'">باز کردن پوشه و مراحل کامل ◂</button><div class="tg">'+c[5].split('|').map(t=>'<button data-t="'+t+'">'+t+'</button>').join('')+'</div></article>';
 });
 $('m').innerHTML=out||'<div class="e">'+(cat===-2&&!w.length?'هنوز چیزی در «دسته اصلی» نیست؛ روی ★ هر کارت بزن.':'چیزی پیدا نشد. بخشی از نام یا یک برچسب کوتاه‌تر را امتحان کن.')+'</div>';
 $('n').textContent=n.toLocaleString('fa')+' مورد';const nf='★ دسته اصلی ('+Object.keys(fav).length.toLocaleString('fa')+')';$('fvb').textContent=nf;$('nf').textContent=nf;
}
$('cats').innerHTML='<button data-c="-1" aria-pressed="true">همه</button><button class="fv" id="fvb" data-c="-2" aria-pressed="false">★ دسته اصلی</button>'+K.map((k,i)=>'<button data-c="'+i+'" aria-pressed="false">'+k+'</button>').join('');
function setCat(v){cat=v;[].forEach.call($('cats').children,x=>x.setAttribute('aria-pressed',+x.dataset.c===v));[].forEach.call(document.querySelectorAll('.nv button'),x=>x.setAttribute('aria-pressed',+x.dataset.c===-2?v===-2:v!==-2));render()}
$('cats').onclick=e=>{const b=e.target.closest('button');if(b)setCat(+b.dataset.c)};
document.querySelector('.nv').onclick=e=>{const b=e.target.closest('button');if(b){setCat(+b.dataset.c);scrollTo(0,0)}};
$('m').onclick=e=>{const o=e.target.closest('button[data-o]');if(o){openF(+o.dataset.o);return}const s=e.target.closest('button[data-f]');if(s){tog(+s.dataset.f);return}const b=e.target.closest('button[data-t]');if(!b)return;$('q').value=b.dataset.t;render();scrollTo({top:0})};
let tm;$('q').addEventListener('input',()=>{clearTimeout(tm);tm=setTimeout(render,120)});
render();

function openF(i){
 const c=D[i],x=X[c[1]],f=$('fd'),L=a=>a.map(s=>'<li>'+s+'</li>').join('');
 const ln=c[2]?'<div class="ln">'+c[2].split(' ').map(d=>'<a href="https://'+d+'" target="_blank" rel="noopener noreferrer">'+d+'</a>').join('')+'</div>':'';
 const b=x?x.map((v,j)=>'<div class="sv'+(j?'':' open')+'"><button class="sh"><span>'+v.t+'</span>'+(v.p?'<b>'+fm(v.p)+' تومان</b>':'')+'</button><div class="sb">'+(v.m?'<h3>مدارک و اطلاعات لازم</h3><ul>'+L(v.m)+'</ul>':'')+'<h3>مراحل</h3><ol>'+L(v.s)+'</ol>'+(v.n?'<p class="nt w">'+v.n+'</p>':'')+'</div></div>').join(''):'<p class="nt w">توضیح کامل این پوشه هنوز اضافه نشده؛ فعلاً مراحل عمومی و قیمت‌ها را ببین.</p><ol>'+L((c[4]||DS).split('|'))+'</ol>'+pr(i);
 f.innerHTML='<div class="fb"><button class="bk" data-b="1">→ بازگشت</button><h2>'+c[1]+'</h2><div class="k">'+K[c[0]]+'</div></div><div class="fi">'+ln+(c[3]?'<p class="nt">'+c[3]+'</p>':'')+b+'</div>';
 f.hidden=false;f.scrollTop=0;document.body.style.overflow='hidden';
}
function closeF(){$('fd').hidden=true;document.body.style.overflow=''}
$('fd').onclick=e=>{if(e.target.closest('[data-b]'))closeF();const h=e.target.closest('.sh');if(h)h.parentNode.classList.toggle('open')};
document.onkeydown=e=>{if(e.key==='Escape')closeF()};
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});
