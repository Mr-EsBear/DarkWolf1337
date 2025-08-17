// Add marked.js for markdown parsing
const marked = window.marked;

async function loadPost(postPath) {
    console.log(`Loading post: ${postPath}`);
    try {
        const response = await fetch(postPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${postPath}: ${response.status}`);
        }
        const markdown = await response.text();
        return marked.parse(markdown);
    } catch (error) {
        console.error('Error loading post:', error);
        return '<p>Error loading post</p>';
    }
}

async function loadPosts() {
    try {
        const response = await fetch('js/posts.json');
        const posts = await response.json();
        console.log('Posts loaded:', posts);

        const mainContent = document.querySelector('.main');
        posts.forEach(async post => {
            const content = await loadPost(post.path);
            const article = document.createElement('article');
            article.className = 'post';
            article.innerHTML = `
                <h2>${post.title}</h2>
                <p><small>${post.date}</small></p>
                ${content}
            `;
            mainContent.appendChild(article);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadPosts);
