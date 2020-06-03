import puppeteer from "puppeteer"

const app = async () => {
  const browser = await puppeteer.launch()

  const companyList = ["nikkei", "asahi", "yomiuri", "mainiti"]

  await Promise.all(
    companyList.map((company) => fetchHeadline(browser, company))
  )

  await browser.close()
}

const fetchHeadline = async (browser: puppeteer.Browser, company: string) => {
  debugger
  const page = await browser.newPage()
  if (company == "nikkei") {
    await page.goto("https://www.nikkei.com/")
    const nikkeiEl = await page.$(".k-card--headline.k-card.k-card--largest")

    const nikkeiTitle = await nikkeiEl?.$eval(
      ".k-card__title-piece",
      (el) => el.textContent
    )
    console.log(nikkeiTitle)
    await nikkeiEl?.screenshot({ path: "nikkei.png" })
  }
  if (company == "asahi") {
    await page.goto("https://www.asahi.com/")
    const asahiEl = await page.$(".List.ListHeadline.HeadlineFst.HomeTop")
    await asahiEl?.screenshot({ path: "asahi.png" })

    const asahiTitle = await asahiEl?.$eval(
      ".HeadlineTop a",
      (e) => e.childNodes[0].textContent
    )
    console.log(asahiTitle)
  }
  if (company == "yomiuri") {
    await page.goto("https://www.yomiuri.co.jp/")
    const yomiuriEl = await page.$(
      ".p-category-latest-sec-list.p-list.p-list-col2 .p-list-item"
    )
    await yomiuriEl?.screenshot({ path: "yomiuri.png" })
    const yomiuriTitle = await yomiuriEl?.$eval(
      ".c-list-title.c-list-title--large a",
      (el) => el.textContent
    )
    console.log(yomiuriTitle)
  }
  if (company == "mainiti") {
    await page.goto("https://mainichi.jp/")
    const mainitiEl = await page.$(".main-box .headline-top")
    await mainitiEl?.screenshot({ path: "mainiti.png" })
    const mainitiTitle = await mainitiEl?.$eval("a", (el) => el.textContent)
    console.log(mainitiTitle)
  }
  await page.close()
}

app()
