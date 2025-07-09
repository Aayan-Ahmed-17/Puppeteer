import puppeteer from "puppeteer";

const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.goto('https://books.toscrape.com/')


// want to extract (img link, ratings, title, price, inStock, link
const data = await page.evaluate(() => {
      const bookElements = document.querySelectorAll('.product_pod');
      const arr = Array.from(bookElements)
      const imgLink = arr.map(e => e.querySelector('a img.thumbnail').getAttribute('src'))
      const title = arr.map(e => e.querySelector('h3 a').getAttribute('title'))
      // const 
      return imgLink
})

console.log(data)