import { Page } from "puppeteer";

export const catchHistoric = async (page: Page) => {
  const title = "Extrato Histórico Simples";

  const columnsSpan = await page.$x(
    "//*[@id='Grid1ContainerDiv']/table/tbody/tr/th/span"
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

  const historic: { [key: string]: string[] } = rows.reduce((acc) => {
    const row = rows.splice(0, columns.length - 1);

    return { ...acc, [row[0]!]: row };
  }, {});

  return {
    title,
    columns,
    historic,
  };
};
