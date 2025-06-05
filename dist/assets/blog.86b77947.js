import"./modulepreload-polyfill.c7c6310f.js";import{S as y,P as N,W as P,a as v,c as C,O as S,T as $}from"./lights.14fabfbd.js";const b="https://cms.explosion.fun/graphql";async function T(){const t=`
      query GetAllPosts {
        posts {
          nodes {
            id
            title
            content
            slug
            excerpt
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
              }
            }
            categories {
              nodes {
                name
              }
            }
          }
        }
      }
    `;try{return(await(await fetch(b,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:t})})).json()).data.posts.nodes}catch(n){return console.error("Error fetching blog posts:",n),[]}}async function I(t){const n=`
      query GetPostBySlug($slug: String!) {
        postBy(slug: $slug) {
          id
          title
          content
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    `;try{return(await(await fetch(b,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:n,variables:{slug:t}})})).json()).data.postBy}catch(e){return console.error("Error fetching post:",e),null}}function L(t){const n=document.querySelector("main"),e=document.createElement("div");e.className="blog-container";const s=document.createElement("h1");if(s.textContent="Blog Posts",s.className="blog-title",e.appendChild(s),t.length===0){const a=document.createElement("p");a.textContent="No blog posts found.",a.className="no-posts",e.appendChild(a),n.appendChild(e);return}const r={};t.forEach(a=>{a.categories.nodes.forEach(c=>{r[c.name]||(r[c.name]=[]),r[c.name].push(a)})}),Object.entries(r).forEach(([a,c])=>{const m=document.createElement("section");m.className="category-section";const u=document.createElement("h2");u.textContent=a,u.className="category-title",m.appendChild(u);const p=document.createElement("div");p.className="scrollable-container";const g=document.createElement("div");g.className="posts-grid",c.forEach(o=>{var f,w;const h=document.createElement("article");h.className="post-card",h.innerHTML=`
          ${(w=(f=o.featuredImage)==null?void 0:f.node)!=null&&w.sourceUrl?`<img src="${o.featuredImage.node.sourceUrl}" alt="${o.title}" class="post-image">`:""}
          <h2 class="post-title">
            <a href="?slug=${o.slug}">${o.title}</a>
          </h2>
          <div class="post-meta">
            <span class="post-author">By ${o.author.node.firstName} ${o.author.node.lastName}</span>
            <span class="post-date">${new Date(o.date).toLocaleDateString()}</span>
          </div>
          <div class="post-excerpt">
            ${o.excerpt||(o.content?o.content.substring(0,200)+"...":"No content available")}
          </div>
        `,g.appendChild(h)}),p.appendChild(g),m.appendChild(p),e.appendChild(m)}),n.appendChild(e)}function x(t){var r,a;const n=document.querySelector("main"),e=document.createElement("div");e.className="scrollable-container";const s=document.createElement("div");s.className="single-post",s.innerHTML=`
      ${(a=(r=t.featuredImage)==null?void 0:r.node)!=null&&a.sourceUrl?`<img src="${t.featuredImage.node.sourceUrl}" alt="${t.title}" class="post-image">`:""}
      <article class="post-content">
        <h1 class="post-title">${t.title}</h1>
        <div class="post-meta">
          <span class="post-author">By ${t.author.node.firstName} ${t.author.node.lastName}</span>
          <span class="post-date">${new Date(t.date).toLocaleDateString()}</span>
        </div>
        <div class="post-categories">
          ${t.categories.nodes.map(c=>`<span class="category">${c.name}</span>`).join("")}
        </div>
        <div class="post-body">
          ${t.content}
        </div>
        <a href="blog.html" class="back-link">\u2190 Back to Blog</a>
      </article>
    `,e.appendChild(s),n.appendChild(e)}async function B(){const n=new URLSearchParams(window.location.search).get("slug");if(n){const e=await I(n);e?(x(e),document.title=`${e.title} - Reubens Blog`):document.querySelector("main").innerHTML="<p>Post not found.</p>"}else{const e=await T();L(e)}}document.addEventListener("DOMContentLoaded",B);var i,d,l;d=new y;i=new N(75,window.innerWidth/window.innerHeight,.1,1e3);l=new P({canvas:document.querySelector("#bg")});l.setPixelRatio(window.devicePixelRatio);l.setSize(window.innerWidth,window.innerHeight);i.position.setZ(30);l.render(d,i);function O(){i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),l.setSize(window.innerWidth,window.innerHeight)}window.addEventListener("resize",O,!1);v(d);C(d,200);const D=new S(i,l.domElement);D.enableZoom=!1;const _=new $().load("https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");d.background=_;function E(t){requestAnimationFrame(E),l.render(d,i)}E();
