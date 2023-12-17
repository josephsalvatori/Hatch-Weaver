const formatter = Intl.NumberFormat("en-US", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

export const format = (num, trim) => {

	let price = formatter.format(num);

	if(trim === true) {
		price = price.toString().replace(".00", "");
	}

	return price;
};