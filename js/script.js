/* MERIDIAN – Spicy Masalas | vanilla JS: layout, animation, menu, forms, 3D */
(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const page=document.body.dataset.page;
const links=[['index.html','Welcome'],['about.html','About'],['menu.html','Menu'],['reservations.html','Reservations'],['contact.html','Contact']];

/* ---------- shared header + footer ---------- */
document.body.insertAdjacentHTML('afterbegin',`<header><div class="wrap"><a class="logo" href="index.html">MERIDIAN</a>
<button class="burger" aria-label="Toggle menu" aria-expanded="false"><i></i><i></i><i></i></button>
<nav>${links.map(([h,t])=>`<a href="${h}"${h===page?' class="on" aria-current="page"':''}>${t}</a>`).join('')}</nav></div></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div class="f1"><div class="wrap fg">
<div><h5>Working Hours</h5><div class="cols"><p>Monday To Thursday<br>8:30 am to 10:30 pm</p><p>Friday to Saturday<br>10:00 am to 19:00 pm</p><p>Sunday<br>Available for Private</p></div></div>
<div><h5>Our Locations</h5><div class="cols"><p>701B, Street of lanvegar, Marsomara,<br>Pin 10567, NY</p><p>701AC, Street of lunaegar, lipmara,<br>Pin 10589, NY</p></div></div></div></div>
<div class="f2"><div class="soc"><a href="#" aria-label="Facebook"><i class="fa fa-facebook"></i></a><a href="#" aria-label="Twitter"><i class="fa fa-twitter"></i></a><a href="#" aria-label="Google Plus"><i class="fa fa-google-plus"></i></a><a href="#" aria-label="LinkedIn"><i class="fa fa-linkedin"></i></a></div>
<p>© Meridian ${new Date().getFullYear()} • Handcrafted with love</p></div></footer><a href="#" class="top" aria-label="Back to top"><i class="fa fa-angle-up"></i></a>`);
const hd=$('header'),burger=$('.burger'),nav=$('nav'),topBtn=$('.top');
burger.onclick=()=>{const o=nav.classList.toggle('open');burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
$$('nav a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');burger.classList.remove('open');document.body.style.overflow=''});

/* ---------- scroll: sticky header, parallax, back-to-top ---------- */
const px=$$('[data-px]');let tick=false;
const onScroll=()=>{tick=false;hd.classList.toggle('sticky',scrollY>60);topBtn.classList.toggle('show',scrollY>700);
 px.forEach(e=>{const r=e.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;e.style.transform=`translate3d(0,${(r.top+r.height/2-innerHeight/2)*-.18}px,0)`})};
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();

/* ---------- reveal on scroll ---------- */
$$('.reveal').forEach(el=>{const sib=[...el.parentElement.children].filter(c=>c.classList.contains('reveal'));el.style.transitionDelay=sib.indexOf(el)*.12+'s'});
const rio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;rio.unobserve(e.target);e.target.classList.add('in');setTimeout(()=>{e.target.style.transitionDelay='';e.target.classList.add('done')},1600)}),{threshold:.15});
$$('.reveal').forEach(e=>rio.observe(e));

/* ---------- animated counters ---------- */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const n=+e.target.dataset.count,t0=performance.now();
 const f=t=>{const p=Math.min((t-t0)/1800,1);e.target.textContent=Math.round(n*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.6});
$$('[data-count]').forEach(e=>cio.observe(e));

/* ---------- 3D tilt cards ---------- */
if(matchMedia('(hover:hover)').matches)$$('[data-tilt]').forEach(e=>{
 e.addEventListener('pointermove',ev=>{const r=e.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;e.style.transform=`perspective(700px) rotateY(${x*16}deg) rotateX(${-y*16}deg) translateZ(12px)`});
 e.addEventListener('pointerleave',()=>e.style.transform='')});

/* ---------- hero slider ---------- */
const slides=$$('.hero .slide'),caps=$$('.cap'),dots=$$('.dots button');
if(slides.length>1){let i=0,t;const go=n=>{i=(n+slides.length)%slides.length;[slides,caps,dots].forEach(a=>a.forEach((e,k)=>e.classList.toggle('on',k===i)))};
 const play=()=>{clearInterval(t);t=setInterval(()=>go(i+1),6500)};dots.forEach((d,k)=>d.onclick=()=>{go(k);play()});play()}

/* ---------- menu tabs ---------- */
const dishes=$('#dishes');
if(dishes){const D='Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.';
 const M={Mains:[['Pizza Mexicana',17],['Pizza Manjoli Masko',18],['Pizza Valichande',16],['Pizza Lagrotas Nanos',14],['Lasagna Merocka',8],['Lejongas Lasagna',12],['Lasagna Mermer',15]],
 Starters:[['Spiced Samosa',6],['Masala Fries',7],['Chilli Paneer',9],['Tandoori Wings',10],['Garlic Naan',4],['Onion Bhaji',5],['Aloo Chaat',7]],
 Dessert:[['Gulab Jamun',6],['Rasmalai',7],['Mango Kulfi',5],['Saffron Kheer',6],['Chai Chocolate Cake',8],['Jalebi Stack',5],['Masala Brownie',7]],
 Drinks:[['Masala Chai',3],['Mango Lassi',5],['Spiced Lemonade',4],['Cardamom Coffee',4],['Rose Sherbet',5],['Iced Tamarind',5],['Saffron Milk',6]]};
 const tabs=$('#tabs');
 const show=k=>{$$('button',tabs).forEach(b=>b.classList.toggle('on',b.textContent===k));$('#msub').textContent=k;
  dishes.innerHTML=M[k].map(([n,p],i)=>`<div class="dish" style="animation-delay:${i*80}ms"><div><h4>${n}</h4><p>${D}</p></div><span class="price"><small>$</small>${String(p).padStart(2,'0')}</span></div>`).join('')};
 tabs.innerHTML=Object.keys(M).map(k=>`<button>${k}</button>`).join('');tabs.onclick=e=>{if(e.target.tagName==='BUTTON')show(e.target.textContent)};show('Mains')}

/* ---------- forms (front-end only) ---------- */
$$('[data-fill=time]').forEach(s=>{for(let h=12;h<=22;h++)s.add(new Option(`${h>12?h-12:h}:00 ${h<12?'AM':'PM'}`,h+':00'))});
$$('[data-fill=people]').forEach(s=>{for(let n=1;n<=10;n++)s.add(new Option(n+(n>1?' People':' Person'),n));s.value=2});
$$('input[type=date]').forEach(d=>{const t=new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);d.min=d.value=t});
$$('form[data-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;
 const n=$('.note',f);n.textContent=f.dataset.form;n.classList.add('show');f.reset();$$('input[type=date]',f).forEach(d=>d.value=d.min)}));

/* ---------- 3D spice bowl (Three.js) ---------- */
(function spice3D(){
const box=$('#spice3d');if(!box)return;const T=window.THREE;let ren;
try{if(!T)throw 0;ren=new T.WebGLRenderer({antialias:true,alpha:true})}catch(e){box.classList.add('nogl');return}
ren.setPixelRatio(Math.min(devicePixelRatio,2));box.appendChild(ren.domElement);
const sc=new T.Scene(),cam=new T.PerspectiveCamera(35,1,.1,100),V=(x,y)=>new T.Vector2(x,y),
 std=(c,m=.1,r=.6)=>new T.MeshStandardMaterial({color:c,metalness:m,roughness:r,side:T.DoubleSide});
sc.add(new T.AmbientLight(0xffffff,.65));
const key=new T.DirectionalLight(0xffe3b8,1.2);key.position.set(5,9,7);sc.add(key);
const rim=new T.PointLight(0xc49d5f,1.6,40);rim.position.set(-7,4,-5);sc.add(rim);
const g=new T.Group();sc.add(g);
/* golden bowl (lathe) */
g.add(new T.Mesh(new T.LatheGeometry([[0,0],[1.1,0],[1.7,.2],[2.3,.8],[2.65,1.5],[2.78,1.58],[2.6,1.62],[2.5,1.45],[2.15,.85],[1.55,.4],[0,.32]].map(p=>V(...p)),64),std(0xc49d5f,.55,.35)));
/* masala mound + speckles */
const h=r=>.2+Math.sqrt(Math.max(0,1-(r/2.3)**2))*1.1,mp=[];for(let r=0;r<=2.3;r+=.1)mp.push(V(r,h(r)));
const mound=new T.Mesh(new T.LatheGeometry(mp,64),std(0xb5290f,0,1));mound.position.y=.9;g.add(mound);
const N=700,sp=new T.InstancedMesh(new T.SphereGeometry(.055,8,6),std(0xffffff,0,.8),N),m4=new T.Matrix4(),cols=[0xe5a50a,0x5e8c2a,0x8b5a2b,0xd23a1c,0x2b1b12];
for(let i=0;i<N;i++){const r=Math.sqrt(Math.random())*2.2,a=Math.random()*6.283;m4.setPosition(Math.cos(a)*r,.9+h(r)+.03,Math.sin(a)*r);sp.setMatrixAt(i,m4);sp.setColorAt(i,new T.Color(cols[i%5]))}
sp.instanceColor.needsUpdate=true;g.add(sp);
/* orbiting spices: star anise, cinnamon, chillies */
const fl=[],add=(m,r,hh,s,a)=>{g.add(m);fl.push({m,r,h:hh,s,a})};
const st=new T.Shape();for(let i=0;i<16;i++){const a=i*Math.PI/8,r=i%2?.5:1;st[i?'lineTo':'moveTo'](Math.sin(a)*r,Math.cos(a)*r)}
const sg=new T.ExtrudeGeometry(st,{depth:.16,bevelEnabled:true,bevelThickness:.05,bevelSize:.04,bevelSegments:2});sg.center();
for(let i=0;i<3;i++){const s=new T.Mesh(sg,std(0x6b3a1c,.1,.55));s.scale.setScalar(.5+i*.08);add(s,3.4+i*.3,2.2+i*.7,.35+i*.08,i*2.1)}
for(let i=0;i<4;i++)add(new T.Mesh(new T.CylinderGeometry(.09,.09,2,12),std(0x9a4f24,0,.8)),3.6,1+i*.6,.28,i*1.6+.5);
for(let i=0;i<3;i++){const p=new T.Group(),b=new T.Mesh(new T.ConeGeometry(.17,1.3,14),std(0xc41e0e,.1,.4)),s=new T.Mesh(new T.CylinderGeometry(.06,.06,.25,8),std(0x3f7a22));b.position.y=-.2;s.position.y=.55;p.add(b,s);add(p,3.3,1.8+i*.5,-.3-i*.07,i*2.1+1)}
/* golden dust */
const pg=new T.BufferGeometry(),pa=new Float32Array(900);for(let i=0;i<900;i++)pa[i]=(Math.random()-.5)*(i%3===1?7:11);pg.setAttribute('position',new T.BufferAttribute(pa,3));
const dust=new T.Points(pg,new T.PointsMaterial({color:0xe3c58a,size:.05,transparent:true,opacity:.8}));sc.add(dust);
/* interaction: drag to spin, pointer tilt, pause off-screen */
let vis=false,drag=false,lx=0,vy=.004,ty=0,t=0;const el=ren.domElement;
new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(box);
el.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;el.setPointerCapture(e.pointerId);box.classList.add('grab')});
el.addEventListener('pointermove',e=>{const r=box.getBoundingClientRect();ty=((e.clientY-r.top)/r.height-.5)*.5;if(drag){const d=e.clientX-lx;lx=e.clientX;g.rotation.y+=d*.012;vy=d*.012}});
['pointerup','pointercancel'].forEach(n=>el.addEventListener(n,()=>{drag=false;box.classList.remove('grab')}));
const size=()=>{const w=box.clientWidth,hh=box.clientHeight;ren.setSize(w,hh,false);cam.aspect=w/hh;cam.position.set(0,4.2,w/hh<1.1?16:12.5);cam.lookAt(0,1.2,0);cam.updateProjectionMatrix()};
new ResizeObserver(size).observe(box);size();
(function loop(){requestAnimationFrame(loop);if(!vis)return;t+=.016;
 if(!drag){g.rotation.y+=vy;vy+=(.004-vy)*.04}g.rotation.x+=(ty*.5-g.rotation.x)*.05;
 fl.forEach((o,i)=>{const a=o.a+t*o.s;o.m.position.set(Math.cos(a)*o.r,o.h+Math.sin(t*1.3+i)*.2,Math.sin(a)*o.r);o.m.rotation.x=t*.4+i;o.m.rotation.z=t*.3+i});
 dust.rotation.y=t*.05;ren.render(sc,cam)})();
})();
})();
