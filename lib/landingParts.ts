import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const landingDirectory = join(process.cwd(), '_landing')
export function getBySlug(slug:string){
    const filePath = join(landingDirectory,slug)
    return matter(fs.readFileSync(filePath, 'utf8'))
}
export function getPortfolioItems(){
    return fs.readdirSync(join(landingDirectory,"portfolio"))
}