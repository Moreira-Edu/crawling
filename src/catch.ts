import { Page } from "puppeteer";
import {
  LEAVE_SEMESTER,
  MAX_SEMESTER,
  SEMESTER_COMPLETED,
  USER_CYCLE,
  USER_EMAIL,
  USER_NAME,
  USER_PP,
  USER_PR,
  USER_MAX_PR,
  USER_RA,
} from "../dotenv";

export const catchInfo = async (page: Page) => {
  const leaveSemester = await page.$eval(LEAVE_SEMESTER!, (span) =>
    span.innerHTML.trim()
  );
  const MaxSemester = await page.$eval(MAX_SEMESTER!, (span) =>
    span.innerHTML.trim()
  );
  const completedSemester = await page.$eval(SEMESTER_COMPLETED!, (span) =>
    span.innerHTML.trim()
  );
  const userCycle = await page.$eval(USER_CYCLE!, (span) =>
    span.innerHTML.trim()
  );
  const userEmail = await page.$eval(USER_EMAIL!, (span) =>
    span.innerHTML.trim()
  );
  const userName = await page.$eval(USER_NAME!, (span) =>
    span.innerHTML.trim()
  );
  const userPp = await page.$eval(USER_PP!, (span) => span.innerHTML.trim());
  const userPr = await page.$eval(USER_PR!, (span) => span.innerHTML.trim());
  const userMaxPr = await page.$eval(USER_MAX_PR!, (span) =>
    span.innerHTML.trim()
  );
  const userRa = await page.$eval(USER_RA!, (span) => span.innerHTML.trim());

  return {
    userName,
    userEmail,
    userRa,
    userCycle,

    MaxSemester,
    completedSemester,
    leaveSemester,

    userPp,
    userPr,
    userMaxPr,
  };
};
