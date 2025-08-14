// Add marked.js for markdown parsing
const marked = window.marked;

async function loadPost(postPath) {
    try {
        const response = await fetch(postPath);
        const markdown = await response.text();
        const content = marked.parse(markdown);
        return content;
    } catch (error) {
        console.error('Error loading post:', error);
        return '<p>Error loading post</p>';
    }
}

async function loadPosts() {
    const posts = [
        '_posts/2003-02-11-the-beaver-government.md',
        '_posts/2003-02-14-moon-landing-europe.md',
        '_posts/2025-08-14-the-truth-about-moon-landing.md'
    ];
    
    const mainContent = document.querySelector('.main');
    
    for (const post of posts) {
        const content = await loadPost(post);
        const article = document.createElement('article');
        article.className = 'post';
        article.innerHTML = content;
        mainContent.appendChild(article);
    }
}
