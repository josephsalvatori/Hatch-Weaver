export const validate = (formElement, formData) => {

	let errors = [];

	[...formData.entries()].forEach((f) => {

		let name = f[0];
		let value = f[1];
		let el = formElement.querySelector(`[name='${name}']`);

		if(!el.classList.contains("validate")) return;

		switch(name) {

			case "email":

				if(value === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
					errors.push({
						name: "email",
						message: "Please enter a valid email address."
					});
				}

				break;

			case "password":

				if(value === "") {
					errors.push({
						name: name,
						message: `${name.charAt(0).toUpperCase()}${name.slice(1)} can not be blank.`
					});
				}

				break;

			case "file":

				let accept = el.accept;

				if(value.size <= 0 || value.name === "") {

					errors.push({
						name: "file",
						message: "A CSV File is required."
					});
				}

				break;

			default:

				break;
		}
	});

	/** Validate checkboxes */
	let checkboxes = formElement.querySelectorAll("[type='checkbox'].validate");

	[...checkboxes].forEach((c) => {

		if(!c.checked) {

			errors.push({
				name: c.name,
				message: `${c.name.charAt(0).toUpperCase()}${c.name.slice(1).replace("_", " ")} must be checked.`
			});
		}
	});

	return errors;
};