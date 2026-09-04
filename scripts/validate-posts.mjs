import fs from "node:fs";
import path from "node:path";
const directory=path.resolve("src/content/posts");
const files=fs.readdirSync(directory).filter(f=>f.endsWith(".json"));
const slugs=new Set(),titles=new Set(),errors=[];
for(const file of files){try{const post=JSON.parse(fs.readFileSync(path.join(directory,file),"utf8"));for(const key of ["slug","title","summary","category","publishedAt","paragraphs"])if(!post[key])errors.push(`${file}: ${key} is required`);if(!["finance","engineering"].includes(post.category))errors.push(`${file}: invalid category`);if(slugs.has(post.slug))errors.push(`${file}: duplicate slug`);if(titles.has(post.title))errors.push(`${file}: duplicate title`);if(!Array.isArray(post.paragraphs)||post.paragraphs.length<5||post.paragraphs.length>6)errors.push(`${file}: 5-6 paragraphs required`);const body=Array.isArray(post.paragraphs)?post.paragraphs.join(""):"";if(body.length<380||body.length>620)errors.push(`${file}: body must be 380-620 characters`);if(post.sections)errors.push(`${file}: section headings are not allowed`);slugs.add(post.slug);titles.add(post.title)}catch(error){errors.push(`${file}: ${error.message}`)}}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log(`Validated ${files.length} posts.`);
