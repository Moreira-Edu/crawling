import puppeteer from "puppeteer";
import * as dotenv from "dotenv";

dotenv.config();
const {
  PAGE_URL,
  USER_ID,
  PASSWORD,
  USER_ID_INPUT,
  USER_PASSWORD_INPUT,
  LOGIN_BUTTON,
} = process.env;

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  if (PAGE_URL) await page.goto(PAGE_URL);

  if (USER_ID && USER_ID_INPUT) {
    await page.waitForSelector(USER_ID_INPUT);
    await page.click(USER_ID_INPUT);
    await page.type(USER_ID_INPUT, USER_ID);
  }

  if (PASSWORD && USER_PASSWORD_INPUT) {
    await page.waitForSelector(USER_PASSWORD_INPUT);
    await page.click(USER_PASSWORD_INPUT);
    await page.type(USER_PASSWORD_INPUT, PASSWORD);
  }

  if (LOGIN_BUTTON) {
    await page.waitForSelector(LOGIN_BUTTON);
    await page.click(LOGIN_BUTTON);
  }
})();
