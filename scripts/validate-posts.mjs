import fs from "node:fs";
import path from "node:path";
const directory=path.resolve("src/content/posts");
const files=fs.readdirSync(directory).filter(f=>f.endsWith(".json"));
const slugs=new Set(),titles=new Set(),errors=[];
for(const file of files){try{const post=JSON.parse(fs.readFileSync(path.join(directory,file),"utf8"));for(const key of ["slug","title","summary","category","publishedAt","sections"])if(!post[key])errors.push(`${file}: ${key} is required`);if(!["finance","engineering"].includes(post.category))errors.push(`${file}: invalid category`);if(slugs.has(post.slug))errors.push(`${file}: duplicate slug`);if(titles.has(post.title))errors.push(`${file}: duplicate title`);if(!Array.isArray(post.sections)||post.sections.length<2)errors.push(`${file}: at least 2 sections required`);slugs.add(post.slug);titles.add(post.title)}catch(error){errors.push(`${file}: ${error.message}`)}}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log(`Validated ${files.length} posts.`);
