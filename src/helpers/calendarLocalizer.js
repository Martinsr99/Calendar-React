import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import esES from "date-fns/locale/es";
import enUS from "date-fns/locale/en-US";
import { dateFnsLocalizer } from "react-big-calendar";

const locales = {
    "en-US": enUS,
    "es": esES,
  };
  
export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});