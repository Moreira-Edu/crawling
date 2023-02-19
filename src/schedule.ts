import { Page } from "puppeteer";

export const classSchedule = async (page: Page) => {
  const columnsSpan = await page.$x(
    "//*[@id='Grid1ContainerTbl']/tbody/tr/th/span"
  );
  const columns = await Promise.all(
    columnsSpan.map(async (el) =>
      (await el.getProperty("textContent")).jsonValue()
    )
  );

  const rowsSpan = await page.$x(
    "//*[@id='Grid1ContainerTbl']/tbody/tr/td/span"
  );
  const rows = await Promise.all(
    rowsSpan.map(async (el) =>
      (await el.getProperty("textContent")).jsonValue()
    )
  );

  console.log(columns, rows);
};
