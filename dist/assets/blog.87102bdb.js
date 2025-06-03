import{S as m,P as g,W as h,a as w,c as f,O as y,T as b}from"./lights.460ad7dd.js";const l="https://cms.explosion.fun/graphql";async function E(){const t=`
      query GetAllPosts {
        posts {
          nodes {
            id
            title
            content
            slug
            excerpt
            date
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
    `;try{return(await(await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:t})})).json()).data.posts.nodes}catch(n){return console.error("Error fetching blog posts:",n),[]}}async function P(t){const n=`
      query GetPostBySlug($slug: String!) {
        postBy(slug: $slug) {
          id
          title
          content
          slug
          date
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
    `;try{return(await(await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:n,variables:{slug:t}})})).json()).data.postBy}catch(e){return console.error("Error fetching post:",e),null}}function v(t){const n=document.querySelector("main"),e=document.createElement("div");e.className="blog-container";const r=document.createElement("h1");if(r.textContent="Blog Posts",r.className="blog-title",e.appendChild(r),t.length===0){const s=document.createElement("p");s.textContent="No blog posts found.",s.className="no-posts",e.appendChild(s),n.appendChild(e);return}const c=document.createElement("div");c.className="posts-grid",t.forEach(s=>{const d=document.createElement("article");d.className="post-card",d.innerHTML=`
        <h2 class="post-title">
          <a href="?slug=${s.slug}">${s.title}</a>
        </h2>
        <div class="post-meta">
          <span class="post-author">By ${s.author.node.firstName} ${s.author.node.lastName}</span>
          <span class="post-date">${new Date(s.date).toLocaleDateString()}</span>
        </div>
        <div class="post-categories">
          ${s.categories.nodes.map(u=>`<span class="category">${u.name}</span>`).join("")}
        </div>
        <div class="post-excerpt">
          ${s.excerpt||s.content.substring(0,200)+"..."}
        </div>
      `,c.appendChild(d)}),e.appendChild(c),n.appendChild(e)}function S(t){const n=document.querySelector("main"),e=document.createElement("div");e.className="single-post",e.innerHTML=`
      <article class="post-content">
        <h1 class="post-title">${t.title}</h1>
        <div class="post-meta">
          <span class="post-author">By ${t.author.node.firstName} ${t.author.node.lastName}</span>
          <span class="post-date">${new Date(t.date).toLocaleDateString()}</span>
        </div>
        <div class="post-categories">
          ${t.categories.nodes.map(r=>`<span class="category">${r.name}</span>`).join("")}
        </div>
        <div class="post-body">
          ${t.content}
        </div>
        <a href="blog.html" class="back-link">\u2190 Back to Blog</a>
      </article>
    `,n.appendChild(e)}async function N(){const n=new URLSearchParams(window.location.search).get("slug");if(n){const e=await P(n);e?(S(e),document.title=`${e.title} - Reubens Blog`):document.querySelector("main").innerHTML="<p>Post not found.</p>"}else{const e=await E();v(e)}}document.addEventListener("DOMContentLoaded",N);var a,i,o;i=new m;a=new g(75,window.innerWidth/window.innerHeight,.1,1e3);o=new h({canvas:document.querySelector("#bg")});o.setPixelRatio(window.devicePixelRatio);o.setSize(window.innerWidth,window.innerHeight);a.position.setZ(30);o.render(i,a);function C(){a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),o.setSize(window.innerWidth,window.innerHeight)}window.addEventListener("resize",C,!1);w(i);f(i,200);const T=new y(a,o.domElement);T.enableZoom=!1;const $=new b().load("https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");i.background=$;function p(t){requestAnimationFrame(p),o.render(i,a)}p();
