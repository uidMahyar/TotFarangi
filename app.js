// منطق جستجو، فیلتر دسته و نمایش کارت‌ها
const fm=x=>x==='t'?'توافقی':(+x*1000).toLocaleString('fa');
function pr(i){return '<div class="pr">'+P[i].split('|').map(e=>{const k=e.lastIndexOf('='),p=e.slice(k+1);return '<div><span>'+e.slice(0,k)+'</span><b>'+p.split('/').map(fm).join(' / ')+(p==='t'?'':' تومان')+'</b></div>'}).join('')+'</div>'}
const $=id=>document.getElementById(id);
const nz=s=>s.replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[\u200c\u200f]/g,' ').replace(/[۰-۹]/g,d=>d.charCodeAt(0)-1776).replace(/[٠-٩]/g,d=>d.charCodeAt(0)-1632).toLowerCase();
const H=D.map((c,i)=>nz([K[c[0]],c[1],c[2],c[3],c[4],c[5],P[i]].join(' ')));
let cat=-1;
function render(){
 const w=nz($('q').value).split(/\s+/).filter(Boolean);let out='',n=0;
 D.forEach((c,i)=>{
  if(cat>=0&&c[0]!==cat)return;if(!w.every(x=>H[i].includes(x)))return;n++;
  const st=(c[4]||DS).split('|').map(s=>'<li>'+s+'</li>').join('');
  const ln=c[2]?'<div class="ln">'+c[2].split(' ').map(d=>'<a href="https://'+d+'" target="_blank" rel="noopener noreferrer">'+d+'</a>').join('')+'</div>':'';
  out+='<article><h2>'+c[1]+'</h2><div class="k">'+K[c[0]]+'</div>'+ln+(c[3]?'<p class="nt'+(c[2]||c[6]?'':' w')+'">'+c[3]+'</p>':(c[2]||c[6]?'':'<p class="nt w">'+NL+'</p>'))+(c[2]?'<ol>'+st+'</ol>':'')+pr(i)+'<div class="tg">'+c[5].split('|').map(t=>'<button data-t="'+t+'">'+t+'</button>').join('')+'</div></article>';
 });
 $('m').innerHTML=out||'<div class="e">چیزی پیدا نشد. بخشی از نام یا یک برچسب کوتاه‌تر را امتحان کن.</div>';
 $('n').textContent=n.toLocaleString('fa')+' مورد';
}
$('cats').innerHTML=['همه',...K].map((k,i)=>'<button data-c="'+(i-1)+'" aria-pressed="'+(i===0)+'">'+k+'</button>').join('');
$('cats').onclick=e=>{const b=e.target.closest('button');if(!b)return;cat=+b.dataset.c;[...$('cats').children].forEach(x=>x.setAttribute('aria-pressed',x===b));render()};
$('m').onclick=e=>{const b=e.target.closest('button[data-t]');if(!b)return;$('q').value=b.dataset.t;render();scrollTo({top:0})};
let tm;$('q').addEventListener('input',()=>{clearTimeout(tm);tm=setTimeout(render,120)});
render();
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});
