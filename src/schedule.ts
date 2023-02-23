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

  const actualSemester: { [key: string]: string[] } = rows.reduce((acc) => {
    const row = rows.splice(0, columns.length);

    return { ...acc, [row[0]!]: rows };
  }, {});

  const weekColumnsSpan = await page.$x("//*[@id='TABLE3']/tbody/tr/td/span");
  const weekColumns = await Promise.all(
    weekColumnsSpan.map(async (el) =>
      (await el.getProperty("textContent")).jsonValue()
    )
  );

  const scheduleColumnsSpan = await page.$x(
    "//*[@id='TABLE3']/tbody/tr/td/div/table/tbody/tr/th/span"
  );
  const scheduleColumns = [
    ...new Set(
      await Promise.all(
        scheduleColumnsSpan.map(async (el) =>
          (await el.getProperty("textContent")).jsonValue()
        )
      )
    ),
  ];
  const scheduleRowsSpan = await page.$x(
    "//*[@id='TABLE3']/tbody/tr/td/div/table/tbody"
  );
  const scheduleRows = await Promise.all(
    scheduleRowsSpan.map(async (el) =>
      (await el.getProperty("textContent")).jsonValue()
    )
  );

  const rowsRegex =
    /(?<hour>[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2})(?<abbr>[\w]{6})(?<class>a)/gim;

  const daysSchedule = scheduleRows.map((row) => {
    const matches = [...row!.matchAll(rowsRegex)].map((match) => {
      return { ...match.groups };
    });
    return matches;
  });

  const schedule = weekColumns.reduce((acc, day, i) => {
    return {
      ...acc,
      [day!]: daysSchedule[i],
    };
  }, {});

  console.log(
    "actualSemester:",
    actualSemester,
    "scheduleColumns:",
    scheduleColumns,
    "schedule",
    schedule
  );
};
