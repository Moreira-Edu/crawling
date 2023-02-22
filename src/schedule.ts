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

  // const schedule = weekColumns.reduce((acc, day) => {
  //   return {
  //     ...acc,
  //     [day!]: scheduleRows.reduce((acc) => {
  //       const row = scheduleRows.splice(0, scheduleColumns.length - 1);
  //       return { ...acc, [row[1]!]: row };
  //     }, {}),
  //   };
  // }, {});
  const days = scheduleRows.map((row) => {
    const matches = [...row!.matchAll(rowsRegex)];
    const [...result] = matches.map((match) => {
      return { ...match.groups };
    });

    if (result.length < 1) result.pop();
    return result;
  });
  console.log(days);
};
