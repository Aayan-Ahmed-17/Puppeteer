import puppeteer from "puppeteer";

const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.goto('https://books.toscrape.com/')


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

console.log(data, data?.length)