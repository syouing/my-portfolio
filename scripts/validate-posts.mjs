import fs from "node:fs";
import path from "node:path";
const directory = path.resolve("src/content/posts");
const files = fs.readdirSync(directory).filter((file) => file.endsWith(".json"));
const coverLibrary = JSON.parse(fs.readFileSync(path.resolve("content/cover-library.json"), "utf8"));
const slugs = new Set();
const titles = new Set();
const errors = [];
const posts = [];

for (const file of files) {
  try {
    const post = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
    for (const key of ["slug", "title", "summary", "category", "publishedAt", "paragraphs", "references", "cover"]) {
      if (!post[key]) errors.push(`${file}: ${key} is required`);
    }
    if (!["finance", "engineering"].includes(post.category)) errors.push(`${file}: invalid category`);
    if (slugs.has(post.slug)) errors.push(`${file}: duplicate slug`);
    if (titles.has(post.title)) errors.push(`${file}: duplicate title`);
    if (!Array.isArray(post.paragraphs) || post.paragraphs.length < 8 || post.paragraphs.length > 12) errors.push(`${file}: 8-12 paragraphs required`);
    const body = Array.isArray(post.paragraphs) ? post.paragraphs.join("") : "";
    if (body.length < 1000 || body.length > 1600) errors.push(`${file}: body must be 1000-1600 characters, excluding references`);
    if (!Array.isArray(post.references) || post.references.length < 2) errors.push(`${file}: at least 2 references required`);
    else for (const [index, reference] of post.references.entries()) {
      if (!reference?.title || !reference?.publisher || !reference?.url) errors.push(`${file}: reference ${index + 1} requires title, publisher, and url`);
      else try {
        const url = new URL(reference.url);
        if (url.protocol !== "https:") errors.push(`${file}: reference ${index + 1} must use https`);
      } catch {
        errors.push(`${file}: reference ${index + 1} has an invalid url`);
      }
    }
    if (!coverLibrary[post.category]?.includes(post.cover)) errors.push(`${file}: cover must come from the ${post.category} cover library`);
    if (post.cover && !fs.existsSync(path.resolve("public", post.cover))) errors.push(`${file}: cover file does not exist`);
    if (post.sections) errors.push(`${file}: section headings are not allowed`);
    slugs.add(post.slug);
    titles.add(post.title);
    posts.push({ ...post, file });
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
  }
}

posts.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
for (let index = 1; index < posts.length; index += 1) {
  if (posts[index].cover === posts[index - 1].cover) errors.push(`${posts[index].file}: cover must differ from the immediately previous post`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${files.length} posts and ${Object.values(coverLibrary).flat().length} covers.`);
