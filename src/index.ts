import puppeteer from "puppeteer";
import {
  LOGIN_BUTTON,
  PAGE_URL,
  PASSWORD,
  USER_ID,
  USER_ID_INPUT,
  USER_PASSWORD_INPUT,
} from "../dotenv";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    if (
      request.resourceType() === "image" ||
      request.resourceType() === "stylesheet"
    )
      request.abort();
    else request.continue();
  });

  if (PAGE_URL) await page.goto(PAGE_URL, { waitUntil: "networkidle0" });

  if (USER_ID_INPUT && USER_ID) {
    const input = await page.waitForSelector(USER_ID_INPUT, { visible: true });
    await input?.focus();
    await page.type(USER_ID_INPUT, USER_ID, { delay: 15 });
  }

  if (USER_PASSWORD_INPUT && PASSWORD) {
    const input = await page.waitForSelector(USER_PASSWORD_INPUT, {
      visible: true,
    });
    await input?.focus();
    await page.type(USER_PASSWORD_INPUT, PASSWORD, { delay: 15 });
  }

  if (LOGIN_BUTTON) {
    await page.waitForSelector(LOGIN_BUTTON);
    await page.click(LOGIN_BUTTON);
  }
})();
