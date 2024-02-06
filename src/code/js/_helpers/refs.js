export const refs = {
	alignment: {
		"fill": "stretch",
		"center": "center",
		"top": "start",
		"bottom": "end"
	},
	aspect: {
		"none": "",
		"1:1": "1/1",
		"4:3": "4/3",
		"9:16": "9/16",
		"16:9": "16/9"
	},
	buttonStyles: {
		"": "btn",
		"none": "btn",
		"primary": "btn",
		"secondary": "btn-secondary",
		"primary-reverse": "btn-reverse",
		"secondary-reverse": "btn-secondary-reverse",
		"icon": "btn-icon",
		"inherit": "btn-inherit",
		"inherit-reverse": "btn-inherit-reverse",
		"pill": "btn-pill",
		"text": "btn-text",
		"option": "btn-option",
		"material": "btn-material"
	},
	colors: {
		"text-1": "var(--color-brand-text)",
		"text-2": "var(--color-brand-text-alt)",
		"background-1": "var(--color-brand-background)",
		"background-2": "var(--color-brand-background-alt)",
		"accent-1": "var(--color-brand-accent-1)",
		"accent-2": "var(--color-brand-accent-2)",
		"accent-3": "var(--color-brand-accent-3)",
		"accent-4": "var(--color-brand-accent-4)",
		"accent-5": "var(--color-brand-accent-5)",
		"accent-6": "var(--color-brand-accent-6)"
	},
	months: {
		"1": "Jan",
		"2": "Feb",
		"3": "Mar",
		"4": "Apr",
		"5": "May",
		"6": "Jun",
		"7": "Jul",
		"8": "Aug",
		"9": "Sep",
		"10": "Oct",
		"11": "Nov",
		"12": "Dec"
	},
	paddings: {
		"none": "",
		"top": "ct",
		"top-bottom": "cy",
		"bottom": "cb",
		"left": "cl",
		"left-right": "cx",
		"right": "cr",
		"no-top": "cx cb",
		"no-bottom": "cx ct",
		"all": "ca",
	},
	playback: {
		"none": {
			autoplay: false,
			loop: false
		},
		"autoplay": {
			autoplay: true,
			loop: false
		},
		"autoplay-loop": {
			autoplay: true,
			loop: "loop"
		},
		"loop": {
			autoplay: false,
			loop: "loop"
		}
	},
	purchaseStatus: {
		"AUTHORIZED": "Payment Authorized",
		"PAID": "Paid",
		"PARTIALLY_PAID": "Partially Paid",
		"PARTIALLY_REFUNDED": "Partially Refunded",
		"PENDING": "Payment Pending",
		"REFUNDED": "Refunded",
		"VOIDED": "Voided"
	},
	shippingStatus: {
		"FULFILLED": "Delivered",
		"IN_PROGRESS": "In Progress",
		"ON_HOLD": "On Hold",
		"OPEN": "Pending Delivery",
		"PARTIALLY_FULFILLED": "Partially Delivered",
		"PENDING_FULFILLMENT": "Pending Delivery",
		"RESTOCKED": "Undelivered",
		"SCHEDULED": "Scheduled",
		"UNFULFILLED": "Undelivered"
	},
	tableHeaders: {
		"address_1": "Street Address",
		"address_2": "Apt/Unit",
		"city": "City",
		"email": "Email",
		"first_name": "First Name",
		"last_activity": "Last Activity Date",
		"last_name": "Last Name",
		"phone": "Phone Number",
		"province": "State/Region",
		"provincecode": "State/Region Code",
		"zip": "Zip Code",
		"country": "Country",
		"countrycode": "Country Code",
		"birthday": "Date of Birth",
		"ip": "IP Address"
	}
};