import puppeteer from "puppeteer";
import fs from 'fs'

const url = `https://books.toscrape.com/catalogue/page-$.html`

const browser = await puppeteer.launch()
const page = await browser.newPage()

const allBooks = []
let currentPg = 1
const maxPg = 2

while(currentPg <= maxPg){
      await page.goto(`https://books.toscrape.com/catalogue/page-${currentPg}.html`)

      // want to extract (img link, ratings, title, price, inStock, link
      const data = await page.evaluate(() => {
            return books = Array.from(document.querySelectorAll('.product_pod'), (book)=> {
                  const imgLink = book?.querySelector('a img.thumbnail')?.getAttribute('src')
                  const title = book?.querySelector('h3 a')?.getAttribute('title')
                  const ratings = book?.querySelector('p.star-rating')?.className?.split(' ')[1]
                  const price = book?.querySelector('p.price_color')?.textContent
                  const inStock = book?.querySelector('p.price_color')?.textContent ? true : false
                  const productLink = book?.querySelector('.image_container a')?.getAttribute('href')
            
                  return{
                              imgLink,
                              title,
                              ratings,
                              price,
                              inStock,
                              productLink
                        }

                  });
            }
      )
      allBooks.push(...data)
      console.log(`Data of pg ${currentPg}`, data)
      currentPg++
}
fs.writeFileSync('data.json', JSON.stringify(allBooks, null, 2))
console.log('data logged successfully')

await browser.close();
