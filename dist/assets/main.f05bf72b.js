import{S as v,P as g,W as w,a as E,c as I,O as x,T as f}from"./lights.460ad7dd.js";import{a as T,u as b}from"./toruses.2c7d9438.js";function l(t,e,s,u){const d=document.getElementById(e);if(!!d)switch(u){case"string":let c=function(){o<t.length&&(d.innerHTML+=t.charAt(o),o++,setTimeout(c,s))},o=0;c();break}}const a={data:null,timestamp:null,ttl:30*60*1e3};function _(t){const e=Date.now();if(a.data&&a.timestamp&&e-a.timestamp<a.ttl){p(a.data);return}fetch("https://habitica.com/api/v3/user",{method:"GET",headers:t}).then(s=>{if(s.status===200)return s.json();throw new Error(`Error: ${s.status}`)}).then(s=>{a.data=s,a.timestamp=e,p(s)}).catch(s=>{console.error(s)})}function p(t){const e=t.data.stats,s=t.data;document.getElementById("lvl").innerHTML=`
        <div class="stat-level">
            <p>Level: ${e.lvl}</p>
            <p>Class: ${e.class.toUpperCase()}</p>
        </div>`,document.getElementById("health").innerHTML=`
        <div class="stat-row">
            <div class="stat-header">
                <h6 class="stat-label">Health</h6>
                <span class="stat-value">${e.hp.toFixed(1)}/${e.maxHealth}</span>
            </div>
            <div class="progress-container">
                <progress class="progress progress-health" value="${e.hp}" max="${e.maxHealth}"></progress>
            </div>
        </div>`,document.getElementById("exp").innerHTML=`
        <div class="stat-row">
            <div class="stat-header">
                <h6 class="stat-label">Exp</h6>
                <span class="stat-value">${e.exp.toFixed(1)}/${e.toNextLevel}</span>
            </div>
            <div class="progress-container">
                <progress class="progress progress-exp" value="${e.exp}" max="${e.toNextLevel}"></progress>
            </div>
        </div>`,document.getElementById("mana").innerHTML=`
        <div class="stat-row">
            <div class="stat-header">
                <h6 class="stat-label">Mana</h6>
                <span class="stat-value">${e.mp.toFixed(1)}/${e.maxMP}</span>
            </div>
            <div class="progress-container">
                <progress class="progress progress-mana" value="${e.mp}" max="${e.maxMP}"></progress>
            </div>
        </div>`,document.getElementById("lastUpdate").innerHTML=`
        <div class="stat-info">Stats last logged in: ${s.auth.timestamps.loggedin.slice(0,10)}</div>`,document.getElementById("streak").innerHTML=`
        <div class="stat-info">Streak: ${s.achievements.streak}</div>`}var n,i,r;i=new v;n=new g(75,window.innerWidth/window.innerHeight,.1,1e3);r=new w({canvas:document.querySelector("#bg")});const y=new Headers({"x-api-user":"90235cb9-1702-4ea4-a931-51b5a96ac3ba","x-api-key":"030b0de9-26dc-45a5-bd02-4a19cbd90b2e"});_(y);r.setPixelRatio(window.devicePixelRatio);r.setSize(window.innerWidth,window.innerHeight);n.position.setZ(30);r.render(i,n);function H(){n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight)}window.addEventListener("resize",H,!1);T(i);E(i);I(i,200);const m=new x(n,r.domElement);m.enableZoom=!1;const L=new f().load("https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");i.background=L;function h(t){b(t),requestAnimationFrame(h),m.update(),r.render(i,n)}h();let P=[],S=["#one","#spotify","#two","#three","#four","#five","#six","#seven","#eight"];for(let t=0;t<8;t++)P.push(document.querySelector(S[t]));l("FullStack | ASU | NIT Calicut","designation",50,"string");l("Welcome to my website. It is very much a work in progress as I'll be updating it often.","intro1",20,"string");l("This website is meant to capture much of what I have learned and value in life. It is also supposed to help me communicate with people on what I'm working on presently.","intro2",50,"string");
