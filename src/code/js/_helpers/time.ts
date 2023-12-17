/**
 * Verbose date/time display helper
 */
type DatePartsDefinition = {
	year: number,
	month: number,
	monthName: string,
	monthNameShort: string,
	day: number,
	dayName: string,
	dayNameShort: string,
	hour: number,
	minute: number,
	seconds: number,
};

/**
 *
 * @param type the format, we use
 * @returns
 */
const formatString = (type: string, dateObject: DatePartsDefinition, timezone: string = "") => {

	// check basic cases
	if(type === "t") return `${processFormat("h", dateObject)}:${dateObject.minute.toString().padStart(2, "0")} ${dateObject.hour > 11 ? "PM" : "AM"}`;
	if(type === "tt") return `${processFormat("h", dateObject)}:${dateObject.minute.toString().padStart(2, "0")}:${dateObject.seconds.toString().padStart(2, "0")} ${dateObject.hour > 11 ? "PM" : "AM"}`;
	if(type === "ttt") return `${processFormat("h", dateObject)}:${dateObject.minute.toString().padStart(2, "0")}:${dateObject.seconds.toString().padStart(2, "0")} ${dateObject.hour > 11 ? "PM" : "AM"} ${timezone}`;
	if(type === "T") return `${dateObject.hour}:${dateObject.minute.toString().padStart(2, "0")}`;
	if(type === "TT") return `${dateObject.hour}:${dateObject.minute.toString().padStart(2, "0")}:${dateObject.seconds.toString().padStart(2, "0")} ${timezone}`;
	if(type === "TTT") return `${dateObject.hour}:${dateObject.minute.toString().padStart(2, "0")}:${dateObject.seconds.toString().padStart(2, "0")} ${timezone}`;
	if(type === "DD") return `${dateObject.monthNameShort} ${dateObject.day}, ${dateObject.year}`;
	if(type === "DDD") return `${dateObject.monthName} ${dateObject.day}, ${dateObject.year}`;
	if(type === "DDDD") return `${dateObject.dayName}, ${dateObject.monthName} ${dateObject.day}, ${dateObject.year}`;
	if(type === "OO") return `${dateObject.monthNameShort} ${processFormat("o", dateObject)}, ${dateObject.year}`;
	if(type === "OOO") return `${dateObject.monthName} ${processFormat("o", dateObject)}, ${dateObject.year}`;
	if(type === "OOOO") return `${dateObject.dayName}, ${dateObject.monthName} ${processFormat("o", dateObject)}, ${dateObject.year}`;

	// breakdown the pattern for the output string
	let pattern = type.split(/([^a-zA-Z]+)/);

	[...pattern].forEach((v, i) => {
		pattern[i] = processFormat(v, dateObject, timezone);
	});

	return pattern.join("");
};

/**
 *
 * @param token
 * @param dateObject
 * @returns
 */
const processFormat = (token: string, dateObject: DatePartsDefinition, timezone = "") => {

	let string = token;

	switch(token) {
		case "a":
			string = dateObject.hour > 11 ? "pm" : "am";
			break;
		case "A":
			string = dateObject.hour > 11 ? "PM" : "AM";
			break;
		case "s":
			string = dateObject.seconds.toString();
			break;
		case "ss":
			string = dateObject.seconds.toString().padStart(2, "0");
			break;
		case "m":
			string = dateObject.minute.toString();
			break;
		case "mm":
			string = dateObject.minute.toString().padStart(2, "0");
			break;
		case "h":
			string = (dateObject.hour > 12 ? dateObject.hour - 12 : dateObject.hour).toString();
			break;
		case "hh":
			string = (dateObject.hour > 12 ? dateObject.hour - 12 : dateObject.hour).toString().padStart(2, "0");
			break;
		case "H":
			string = dateObject.hour.toString();
			break;
		case "HH":
			string = dateObject.hour.toString().padStart(2, "0");
			break;
		case "d":
			string = dateObject.day.toString();
			break;
		case "dd":
			string = dateObject.day.toString().padStart(2, "0");
			break;
		case "o":
			string = dateObject.day.toString() + getOrdinal(dateObject.day);
			break;
		case "oo":
			string = dateObject.day.toString().padStart(2, "0") + getOrdinal(dateObject.day);
			break;
		case "ccc":
		case "EEE":
			string = dateObject.dayNameShort;
			break;
		case "cccc":
		case "EEEE":
			string = dateObject.dayName;
			break;
		case "ccccc":
		case "EEEEE":
			string = dateObject.dayName.slice(0, 1);
			break;
		case "L":
		case "M":
			string = (dateObject.month + 1).toString();
			break;
		case "LL":
		case "MM":
			string = (dateObject.month + 1).toString().padStart(2, "0");
			break;
		case "LLL":
		case "MMM":
			string = dateObject.monthNameShort;
			break;
		case "LLLL":
		case "MMMM":
			string = dateObject.monthName;
			break;
		case "LLLLL":
		case "MMMMM":
			string = dateObject.monthName.slice(0, 1);
			break;
		case "y":
			string = dateObject.year.toString();
			break;
		case "yy":
			string = dateObject.year.toString().slice(2, 4);
			break;
		case "yyyy":
			string = dateObject.year.toString().padStart(4, "0");
			break;
		case "Z":
			string = timezone;
			break;
	}

	return string;
};

/**
 * Returns an ordinal number, e.g.: "21st", "32nd", "43rd", "13th"
 * @param {number} num
 * @returns
 */
const getOrdinal = (num: number) => {

	let ordinal = "th";
	let last = +num.toString().slice(-2);

	switch(last % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
	}

	return ordinal;
};

/**
 * Returns the month name in english
 * @param month
 * @param length
 * @returns
 */
const monthName = (month: number, length: string = "long") => {

	let text = "";

	switch(month) {
		case 0:
			text = (length === "long" ? "January" : "Jan");
			break;
		case 1:
			text = (length === "long" ? "February" : "Feb");
			break;
		case 2:
			text = (length === "long" ? "March" : "Mar");
			break;
		case 3:
			text = (length === "long" ? "April" : "Apr");
			break;
		case 4:
			text = "May";
			break;
		case 5:
			text = (length === "long" ? "June" : "Jun");
			break;
		case 6:
			text = (length === "long" ? "July" : "Jul");
			break;
		case 7:
			text = (length === "long" ? "August" : "Aug");
			break;
		case 8:
			text = (length === "long" ? "September" : "Sep");
			break;
		case 9:
			text = (length === "long" ? "October" : "Oct");
			break;
		case 10:
			text = (length === "long" ? "November" : "Nov");
			break;
		case 11:
			text = (length === "long" ? "December" : "Dec");
			break;
		default:
			break;
	}

	return text;
}

const dayName = (day: number, length: string = "long") => {

	let text = "";

	switch(day) {
		case 0:
			text = (length === "long" ? "Sunday" : "Sun");
			break;
		case 1:
			text = (length === "long" ? "Monday" : "Mon");
			break;
		case 2:
			text = (length === "long" ? "Tuesday" : "Tue");
			break;
		case 3:
			text = (length === "long" ? "Wednesday" : "Wed");
			break;
		case 4:
			text = (length === "long" ? "Thursday" : "Thu");
			break;
		case 5:
			text = (length === "long" ? "Friday" : "Fri");
			break;
		case 6:
			text = (length === "long" ? "Saturday" : "Sat");
			break;
		default:
			break;
	}

	return text;
}

/**
 *
 * @param date input datetime object
 * @returns {object}
 */
export const time = (date: Date|string = new Date()) : object => {

	let utc = (typeof date === "string") ? new Date(date) : date;
	let offset = utc.getTimezoneOffset();
	let offsetDate = new Date(utc);
	let local = new Date(offsetDate.setMinutes(offsetDate.getMinutes() - offset));
	let intl = new Intl.DateTimeFormat();
	let resolved = intl.resolvedOptions();

	let utcParts = {
		year: utc.getUTCFullYear(),
		month: utc.getUTCMonth(),
		monthName: monthName(utc.getUTCMonth()),
		monthNameShort: monthName(utc.getUTCMonth(), "short"),
		day: utc.getUTCDate(),
		dayName: dayName(utc.getUTCDay()),
		dayNameShort: dayName(utc.getUTCDay(), "short"),
		hour: utc.getUTCHours(),
		minute: utc.getUTCMinutes(),
		seconds: utc.getUTCSeconds()
	};

	let localParts = {
		year: utc.getFullYear(),
		month: utc.getMonth(),
		monthName: monthName(utc.getMonth()),
		monthNameShort: monthName(utc.getMonth(), "short"),
		day: utc.getDate(),
		dayName: dayName(utc.getDay()),
		dayNameShort: dayName(utc.getDay(), "short"),
		hour: utc.getHours(),
		minute: utc.getMinutes(),
		seconds: utc.getSeconds(),
	};

	let timezoneName = (utc.toLocaleDateString("en-US", { timeZoneName: "short" }))?.split(" ")[1];

	/**
	 * @property {function} format
	 */
	return {
		date: utc,
		dateParts: utcParts,
		local: local,
		localParts: localParts,
		locale: resolved.locale,
		localeTime: utc.toLocaleTimeString(),
		localeDate: utc.toLocaleDateString(),
		localeDateTime: utc.toLocaleString(),
		timezone: resolved.timeZone,
		timezoneName: timezoneName,
		timezoneOffset: -(offset / 60),
		/**
		 * Formatting function for this helper
		 * @param type output format for date/time string, uses Lexon syntax
		 * @returns
		 */
		format(type = "cccc, MMMM o, y h:mm:ss A") {
			return formatString(type, localParts, timezoneName);
		}
	};
}