import puppeteer from "puppeteer";

const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.goto('https://books.toscrape.com/')

const data = await page.evaluate(() => {
      const bookElements = document.querySelectorAll('.product_pod');
      const arr = Array.from(bookElements)
      const title = arr.map(e => e.querySelector('h3 a').getAttribute('title'))
      return title
})

console.log(data)