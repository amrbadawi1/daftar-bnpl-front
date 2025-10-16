import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addWeeks,
  differenceInDays,
  differenceInMinutes,
  differenceInSeconds,
  endOfDay,
  endOfMonth,
  endOfWeek,
  getDate,
  getDay,
  getHours,
  getISOWeek,
  getMinutes,
  getMonth,
  getYear,
  isSameDay,
  isSameMonth,
  isSameSecond,
  max,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setYear,
  startOfDay,
  startOfMinute,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks
} from "./chunk-D5YUNRXD.js";
import {
  __assign
} from "./chunk-LEABZSFV.js";
import "./chunk-OUOAADPF.js";

// node_modules/.pnpm/calendar-utils@0.10.4/node_modules/calendar-utils/date-adapters/esm/date-fns/index.js
function getTimezoneOffset(date) {
  return new Date(date).getTimezoneOffset();
}
function adapterFactory() {
  return {
    addDays,
    addHours,
    addMinutes,
    addSeconds,
    differenceInDays,
    differenceInMinutes,
    differenceInSeconds,
    endOfDay,
    endOfMonth,
    endOfWeek,
    getDay,
    getMonth,
    isSameDay,
    isSameMonth,
    isSameSecond,
    max,
    setHours,
    setMinutes,
    startOfDay,
    startOfMinute,
    startOfMonth,
    startOfWeek,
    getHours,
    getMinutes,
    getTimezoneOffset
  };
}

// node_modules/.pnpm/angular-calendar@0.31.1_@an_ca125a35a173466876f02b52be0e8541/node_modules/angular-calendar/date-adapters/esm/date-fns/index.js
function adapterFactory2() {
  return __assign(__assign({}, adapterFactory()), { addWeeks, addMonths, subDays, subWeeks, subMonths, getISOWeek, setDate, setMonth, setYear, getDate, getYear });
}
export {
  adapterFactory2 as adapterFactory
};
//# sourceMappingURL=angular-calendar_date-adapters_date-fns.js.map
