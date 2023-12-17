
/**
 * focusTrap
 * @param {*} node
 * @param {*} enabled
 * @returns
 */
export const focusTrap = (node, enabled) => {

	const elementList = `a[href], button, form, input, textarea, select, details, [tabindex]:not([tabindex="-1"])`;

	let elemFirst, elemLast;

	function onFirstElemKeydown(e) {

		if(e.shiftKey && e.code === "Tab") {
			e.preventDefault();
			elemLast.focus();
		}
	}

	function onLastElemKeydown(e) {

		if(!e.shiftKey && e.code === "Tab") {
			e.preventDefault();
			elemFirst.focus();
		}
	}

	function onCleanup() {

		if(elemFirst) elemFirst.removeEventListener("keydown", onFirstElemKeydown);
		if(elemLast) elemLast.removeEventListener("keydown", onLastElemKeydown);
	}

	const onScanElements = (observed) => {

		if(enabled === false) return;

		const focusableElems = Array.from(node.querySelectorAll(elementList));

		if(focusableElems.length) {

			elemFirst = focusableElems[0];
			elemLast = focusableElems[focusableElems.length - 1];

			// TODO: Make this accessible
			if(!observed) elemFirst.focus();

			elemFirst.addEventListener("keydown", onFirstElemKeydown);
			elemLast.addEventListener("keydown", onLastElemKeydown);
		}
	}

	onScanElements(false);

	const onObserverChange = (records, observer) => {

		if(records.length) {
			onCleanup();
			onScanElements(true);
		}

		return observer;
	};

	const observer = new MutationObserver(onObserverChange);

	observer.observe(node, { childList: true, subtree: true });

	return {
		update(args) {
			enabled = args;
			args ? onScanElements(false) : onCleanup()
		},
		destroy() {
			onCleanup();
			observer.disconnect();
		}
	}
}