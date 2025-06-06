// GraphQL endpoint
const GraphQL_Endpoint = import.meta.env["VITE_GRAPHQL_ENDPOINT"] || "https://cms.explosion.fun/graphql";

// Function to fetch all blog posts
export async function fetchBlogPosts() {
  const query = `
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
    `;

  try {
    const response = await fetch(GraphQL_Endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return data.data.posts.nodes;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Function to fetch a single post by slug
export async function fetchPostBySlug(slug) {
  const query = `
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
    `;

  try {
    const response = await fetch(GraphQL_Endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { slug }
      }),
    });

    const data = await response.json();
    return data.data.postBy;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Function to render blog posts list
export function renderBlogPosts(posts) {
  const main = document.querySelector('main');

  const blogContainer = document.createElement('div');
  blogContainer.className = 'blog-container';

  const title = document.createElement('h1');
  title.textContent = 'Blog Posts';
  title.className = 'blog-title';
  blogContainer.appendChild(title);

  if (posts.length === 0) {
    const noPosts = document.createElement('p');
    noPosts.textContent = 'No blog posts found.';
    noPosts.className = 'no-posts';
    blogContainer.appendChild(noPosts);
    main.appendChild(blogContainer);
    return;
  }

  // Group posts by category
  const categoryMap = {};
  posts.forEach(post => {
    post.categories.nodes.forEach(category => {
      if (!categoryMap[category.name]) {
        categoryMap[category.name] = [];
      }
      categoryMap[category.name].push(post);
    });
  });

  // Create sections for each category
  Object.entries(categoryMap).forEach(([categoryName, categoryPosts]) => {
    const categorySection = document.createElement('section');
    categorySection.className = 'category-section';

    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = categoryName;
    categoryTitle.className = 'category-title';
    categorySection.appendChild(categoryTitle);

    const scrollableContainer = document.createElement('div');
    scrollableContainer.className = 'scrollable-container';

    const postsGrid = document.createElement('div');
    postsGrid.className = 'posts-grid';

    categoryPosts.forEach(post => {
      const postCard = document.createElement('article');
      postCard.className = 'post-card';

      postCard.innerHTML = `
          ${post.featuredImage?.node?.sourceUrl ? `<img src="${post.featuredImage.node.sourceUrl}" alt="${post.title}" class="post-image">` : ''}
          <h2 class="post-title">
            <a href="?slug=${post.slug}">${post.title}</a>
          </h2>
          <div class="post-meta">
            <span class="post-author">By ${post.author.node.firstName} ${post.author.node.lastName}</span>
            <span class="post-date">${new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div class="post-excerpt">
            ${post.excerpt || (post.content ? post.content.substring(0, 200) + '...' : 'No content available')}
          </div>
        `;

      postsGrid.appendChild(postCard);
    });

    scrollableContainer.appendChild(postsGrid);
    categorySection.appendChild(scrollableContainer);
    blogContainer.appendChild(categorySection);
  });

  main.appendChild(blogContainer);
}

// Function to render a single post
export function renderSinglePost(post) {
  const main = document.querySelector('main');

  const scrollableContainer = document.createElement('div');
  scrollableContainer.className = 'scrollable-container';

  const postContainer = document.createElement('div');
  postContainer.className = 'single-post';

  postContainer.innerHTML = `
      ${post.featuredImage?.node?.sourceUrl ? `<img src="${post.featuredImage.node.sourceUrl}" alt="${post.title}" class="post-image">` : ''}
      <article class="post-content">
        <h1 class="post-title">${post.title}</h1>
        <div class="post-meta">
          <span class="post-author">By ${post.author.node.firstName} ${post.author.node.lastName}</span>
          <span class="post-date">${new Date(post.date).toLocaleDateString()}</span>
        </div>
        <div class="post-categories">
          ${post.categories.nodes.map(cat => `<span class="category">${cat.name}</span>`).join('')}
        </div>
        <div class="post-body">
          ${post.content}
        </div>
        <a href="blog.html" class="back-link">← Back to Blog</a>
      </article>
    `;

  scrollableContainer.appendChild(postContainer);
  main.appendChild(scrollableContainer);
}

// Main initialization function for blog content
export async function initBlog() {
  // Check if we're viewing a specific post
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  if (slug) {
    // Fetch and display single post
    const post = await fetchPostBySlug(slug);
    if (post) {
      renderSinglePost(post);
      document.title = `${post.title} - Reubens Blog`;
    } else {
      document.querySelector('main').innerHTML = '<p>Post not found.</p>';
    }
  } else {
    // Fetch and display all posts
    const posts = await fetchBlogPosts();
    renderBlogPosts(posts);
  }
}