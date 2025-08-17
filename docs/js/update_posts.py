import os
import json
import re

# Paths
posts_dir = "docs/_posts"
output_file = "docs/js/posts.json"

def extract_metadata(content):
    """Extract metadata (title, date) from YAML front matter."""
    metadata = {}
    yaml_match = re.search(r"---\n(.*?)\n---", content, re.DOTALL)
    if yaml_match:
        yaml_content = yaml_match.group(1)
        for line in yaml_content.split("\n"):
            if ": " in line:
                key, value = line.split(": ", 1)
                metadata[key.strip()] = value.strip()
    return metadata

def generate_posts_json():
    """Generate posts.json from markdown files."""
    posts = []
    for filename in os.listdir(posts_dir):
        if filename.endswith(".md"):
            file_path = os.path.join(posts_dir, filename)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
                metadata = extract_metadata(content)
                posts.append({
                    "path": f"_posts/{filename}",
                    "title": metadata.get("title", "Untitled"),
                    "date": metadata.get("date", "Unknown Date")
                })
    # Write to posts.json
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2)
    print(f"Updated {output_file} with {len(posts)} posts.")

if __name__ == "__main__":
    generate_posts_json()