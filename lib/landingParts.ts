import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export function getBySlug(slug:string){
    const filePath = join(process.cwd(), '_landing',`${slug}.md`)
    return matter(fs.readFileSync(filePath, 'utf8'))
}