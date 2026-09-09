const $=id=>document.getElementById(id);const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));const dateID=d=>d?new Date(d).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}):"";
const imageFallback="data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="560"><rect width="100%" height="100%" fill="#e9eef4"/><text x="50%" y="48%" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="28">SDN Karang Tengah 1</text><text x="50%" y="56%" text-anchor="middle" fill="#94a3b8" font-family="Arial" font-size="18">Gambar belum tersedia</text></svg>`);
const mediaImg=(url,alt,cls)=>`<img class="${cls}" src="${esc(url||imageFallback)}" alt="${esc(alt||"")}" loading="lazy" onerror="this.onerror=null;this.src='${imageFallback}'">`;
const fallbackProfile={
  name:"SDN Karang Tengah 1",
  npsn:"20607151",
  status:"Negeri",
  level:"Sekolah Dasar",
  accreditation:"A",
  students:345,
  staff:20,
  teachers:15,
  principal:"",
  address:"Jalan Raden Saleh No. 118, Karang Tengah, Kecamatan Karang Tengah, Kota Tangerang, Banten 15157",
  city:"Kota Tangerang",
  description:"SD Negeri Karang Tengah 1 merupakan sekolah dasar negeri di Kecamatan Karang Tengah, Kota Tangerang. Portal ini disiapkan sebagai pusat informasi sekolah yang dapat diperbarui dan diverifikasi melalui Admin.",
  vision:"",
  mission:[],
  logo_url:"assets/brand-kt1.svg",
  hero_image_url:"https://file.data.kemendikdasmen.go.id/sekolahkita/20/2060/20607151-13.jpg",
  email:"sdnkarteng1@gmail.com",
  website_url:"http://sdnkarteng1.blogspot.com",
  maps_url:"https://www.google.com/maps/search/?api=1&query=SDN+Karang+Tengah+1+Kota+Tangerang",
  spmb_title:"Informasi SPMB",
  spmb_description:"Informasi jadwal, jalur, persyaratan, dan tautan SPMB dapat diperbarui melalui Admin.",
  spmb_url:"https://spmb.tangerangkota.go.id/"
};
const fallbackRombel=[
{name:"1 A",grade:"Kelas 1",student_count:23},{name:"1 B",grade:"Kelas 1",student_count:21},
{name:"2 A",grade:"Kelas 2",student_count:25},{name:"2 B",grade:"Kelas 2",student_count:25},
{name:"3 A",grade:"Kelas 3",student_count:29},{name:"3 B",grade:"Kelas 3",student_count:28},
{name:"4 A",grade:"Kelas 4",student_count:35},{name:"4 B",grade:"Kelas 4",student_count:35},
{name:"5 A",grade:"Kelas 5",student_count:34},{name:"5 B",grade:"Kelas 5",student_count:32},
{name:"6 A",grade:"Kelas 6",student_count:30},{name:"6 B",grade:"Kelas 6",student_count:29}
];
async function q(table,select="*",filters=[]){if(!window.SDN11?.configured)return[];let req=SDN11.client.from(table).select(select);for(const f of filters){if(f.op==="eq")req=req.eq(f.col,f.val);if(f.op==="order")req=req.order(f.col,{ascending:f.asc??false});if(f.op==="limit")req=req.limit(f.val)}const{data,error}=await req;if(error){console.warn(table,error.message);return[]}return data||[]}
const fallbackImg="data:image/svg+xml;charset=UTF-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600"><rect width="100%" height="100%" fill="#dfe7ed"/><text x="50%" y="50%" text-anchor="middle" fill="#667085" font-family="Arial" font-size="26">SDN Karang Tengah 1</text></svg>');
function img(url,title){return `<img src="${esc(url||fallbackImg)}" alt="${esc(title||"")}" onerror="this.onerror=null;this.src='${fallbackImg}'">`}
async function init(){if($("year"))$("year").textContent=new Date().getFullYear();let p=fallbackProfile,rombel=[],eskul=[],activities=[],programs=[],news=[],announcements=[],achievements=[],gallery=[],documents=[],schedules=[];if(window.SDN11?.configured){const [pr,r,e,a,pg,n,an,ac,g,d,s]=await Promise.all([SDN11.client.from("school_profile").select("*").eq("id",1).maybeSingle(),q("class_groups","*",[{op:"eq",col:"published",val:true},{op:"order",col:"grade",asc:true}]),q("extracurriculars","*",[{op:"eq",col:"active",val:true},{op:"order",col:"name",asc:true}]),q("extracurricular_activities","*, extracurriculars(name)",[{op:"eq",col:"published",val:true},{op:"order",col:"activity_date",asc:false},{op:"limit",val:6}]),q("programs","*",[{op:"eq",col:"published",val:true},{op:"order",col:"sort_order",asc:true}]),q("news","*",[{op:"eq",col:"published",val:true},{op:"order",col:"published_at",asc:false},{op:"limit",val:6}]),q("announcements","*",[{op:"eq",col:"published",val:true},{op:"order",col:"published_at",asc:false},{op:"limit",val:6}]),q("achievements","*",[{op:"eq",col:"published",val:true},{op:"order",col:"year",asc:false},{op:"limit",val:8}]),q("gallery","*",[{op:"eq",col:"published",val:true},{op:"order",col:"created_at",asc:false},{op:"limit",val:12}]),q("documents","*",[{op:"eq",col:"published",val:true},{op:"order",col:"created_at",asc:false}]),q("school_schedules","*",[{op:"eq",col:"published",val:true},{op:"order",col:"sort_order",asc:true}])]);if(pr.data)p={...p,...pr.data};rombel=r;eskul=e;activities=a;programs=pg;news=n;announcements=an;achievements=ac;gallery=g;documents=d;schedules=s}
if(!rombel.length)rombel=fallbackRombel;renderProfile(p);renderPrograms(programs);renderNews(news);renderAnnouncements(announcements);renderAchievements(achievements);renderGallery(gallery);renderRombel(rombel);renderEskul(eskul);renderActivities(activities);renderSchedules(schedules);renderDocuments(documents);$("menuBtn")?.addEventListener("click",()=>$("navMenu").classList.toggle("open"))}
function renderProfile(p){const name=p.name||fallbackProfile.name,logo=p.logo_url||"assets/brand-kt1.svg";$("brandLogo").src=logo;$("footerLogo").src=logo;$("brandName").textContent=name.toUpperCase();$("brandSubtitle").textContent=`Kecamatan Larangan · ${p.city||"Kota Tangerang"}`;$("topbarMeta").textContent=`NPSN ${p.npsn||"-"} · ${p.city||"Kota Tangerang"}`;$("heroSchool").textContent=name;$("heroSubtitle").textContent=p.hero_subtitle||p.vision||"";$("heroImg").src=p.hero_image_url||fallbackProfile.hero_image_url;$("statNpsn").textContent=p.npsn||"—";$("statStatus").textContent=p.status||"—";$("statStudents").textContent=p.students??"—";$("statStaff").textContent=p.staff??"—";$("profileTitle").textContent=p.profile_title||"Berakar di Karang Tengah, tumbuh bersama masyarakat.";$("profileDescription").textContent=p.description||"";$("profileInfo").innerHTML=[["Nama",name],["NPSN",p.npsn],["Status",p.status],["Jenjang",p.level],["Kepala Sekolah",p.principal]].filter(x=>x[1]).map(([a,b])=>`<div><span>${esc(a)}</span><strong>${esc(b)}</strong></div>`).join("");$("visionText").textContent=p.vision||"";const m=Array.isArray(p.mission)&&p.mission.length?p.mission:fallbackProfile.mission;$("missionText").innerHTML=m.map(x=>`<p>${esc(x)}</p>`).join("");$("contactSchool").textContent=name;$("contactAddress").textContent=p.address||"";$("mapLink").href=p.maps_url||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name+" "+(p.city||""))}`;$("contactInfo").innerHTML=[["NPSN",p.npsn],["Status",p.status],["Jenjang",p.level],["Akreditasi",p.accreditation]].filter(x=>x[1]).map(([a,b])=>`<div><span>${esc(a)}</span><strong>${esc(b)}</strong></div>`).join("");$("spmbTitle").textContent=p.spmb_title||"Informasi SPMB";$("spmbDescription").textContent=p.spmb_description||"";$("spmbLink").href=p.spmb_url||"#";$("footerSchool").textContent=name;$("footerCity").textContent=(p.city||"Kota Tangerang")+" · Provinsi Banten";
  if($("socialLinks")){
    const socials=[
      ["Instagram",p.instagram_url,"◎"],
      ["Facebook",p.facebook_url,"f"],
      ["YouTube",p.youtube_url,"▶"],
      ["TikTok",p.tiktok_url,"♪"],
      ["WhatsApp",p.whatsapp_url,"◉"]
    ].filter(x=>x[1]);
    $("socialLinks").innerHTML=socials.length?socials.map(([name,url,icon])=>`<a class="social-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(name)}"><span>${icon}</span>${esc(name)}</a>`).join(""):'<span class="muted">Media sosial belum ditambahkan.</span>';
  }
}
function renderPrograms(items){const x=items.length?items:[{title:"Literasi & Numerasi",description:"Ruang informasi program literasi, numerasi, dan pembelajaran aktif sekolah."},{title:"Karakter & Kebersamaan",description:"Ruang informasi kegiatan pembiasaan, karakter, kedisiplinan, dan kebersamaan warga sekolah."},{title:"Lingkungan & Kesehatan",description:"Ruang informasi kebersihan, UKS, lingkungan, dan budaya hidup sehat."}];$("programList").innerHTML=x.map((v,i)=>`<article class="feature"><div class="num">${String(i+1).padStart(2,"0")}</div><h3>${esc(v.title||v.name)}</h3><p>${esc(v.description||"")}</p></article>`).join("")}
function renderNews(items){$("newsList").innerHTML=items.length?items.map(x=>`<article class="content-card">${img(x.image_url,x.title)}<div class="body"><small>${dateID(x.published_at)||"INFORMASI"}</small><h3>${esc(x.title)}</h3><p>${esc(x.excerpt||"")}</p></div></article>`).join(""):'<div class="empty">Belum ada berita.</div>'}
function renderAnnouncements(items){$("announcementList").innerHTML=items.length?items.map(x=>`<article class="announcement"><strong>${dateID(x.published_at)||"Informasi"}</strong><div><b>${esc(x.title)}</b><p>${esc(x.body||"")}</p></div></article>`).join(""):'<div class="empty">Belum ada pengumuman.</div>'}
function renderAchievements(items){$("achievementList").innerHTML=items.length?items.map(x=>`<article class="achievement-card"><strong>${esc(x.title)}</strong><p>${esc(x.level||"")}</p><small>${esc(x.year||"")}</small></article>`).join(""):'<div class="empty">Belum ada prestasi.</div>'}
function renderGallery(items){$("galleryList").innerHTML=items.length?items.map(x=>`<figure>${img(x.image_url,x.title)}<figcaption>${esc(x.title||"Kegiatan Sekolah")}</figcaption></figure>`).join(""):'<div class="empty">Belum ada foto.</div>'}
function renderRombel(items){$("rombelList").innerHTML=items.length?`<table class="data-table"><thead><tr><th>Rombel</th><th>Tingkat</th><th>Siswa</th><th>Wali Kelas</th><th>Ruang</th></tr></thead><tbody>${items.map(x=>`<tr><td>${esc(x.name)}</td><td>${esc(x.grade)}</td><td>${esc(x.student_count??"-")}</td><td>${esc(x.homeroom_teacher||"-")}</td><td>${esc(x.room||"-")}</td></tr>`).join("")}</tbody></table>`:'<div class="empty">Belum ada data rombel.</div>'}
function renderEskul(items){
  const el=$("eskulList");
  if(!items.length){el.innerHTML='<div class="empty">Belum ada ekstrakurikuler.</div>';return}
  el.innerHTML=items.map(x=>`<article class="content-card eskul-card">${mediaImg(x.image_url,x.name,"eskul-image")}<div class="body"><h3>${esc(x.name)}</h3><p><b>${esc(x.day||"-")}</b>${x.start_time?` · ${esc(x.start_time)}`:""}</p><p>${esc(x.description||"")}</p></div></article>`).join("");
}
function renderActivities(items){$("eskulActivityList").innerHTML=items.length?items.map(x=>`<article class="content-card">${x.image_url?img(x.image_url,x.title):""}<div class="body"><small>${dateID(x.activity_date)}</small><h3>${esc(x.title)}</h3><p>${esc(x.description||"")}</p></div></article>`).join(""):'<div class="empty">Belum ada kegiatan ekstrakurikuler.</div>'}
function renderSchedules(items){$("scheduleList").innerHTML=items.length?items.slice(0,9).map(x=>`<article class="generic-card"><small>${esc(x.day||"")}</small><h3>${esc(x.title)}</h3><p>${esc(x.time_text||"")}${x.class_name?" · "+esc(x.class_name):""}</p></article>`).join(""):'<div class="empty">Belum ada jadwal.</div>'}
function renderDocuments(items){$("documentList").innerHTML=items.length?items.map(x=>`<article class="generic-card"><h3>${esc(x.title)}</h3><p>${esc(x.description||"")}</p><a class="admin-link" href="${esc(x.file_url||"#")}" target="_blank" rel="noopener">Buka Dokumen →</a></article>`).join(""):'<div class="empty">Belum ada dokumen.</div>'}
init();
