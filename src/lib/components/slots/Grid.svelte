<script>
export let max = 3;
export let min = 1;
export let breakEven = false;
export let flexLast = false;
export let gap = true;

/** Cap max columns */
if(max > 5) max = 5;
</script>

<div class="grid-area-{max} grid-min-{min} {gap === true ? "gap-x-[var(--grid-gap-x,_30px)] gap-y-[var(--grid-gap-y,_30px)]" : ""} {breakEven === true ? "grid-break-even" : ""} {flexLast === true ? "grid-flex" : ""}">
	<slot />
</div>

<style lang="scss">
@import "./src/code/css/abstracts";

:global(.grid-area-1),
:global(.grid-area-2),
:global(.grid-area-3),
:global(.grid-area-4),
:global(.grid-area-5),
:global(.grid-area-6) {
	align-self: start;
	display: grid;
	justify-self: start;

	> :global(*) {
		width: 100%;
	}
}

:global(.grid-align-stretch),
:global(.grid-align-center),
:global(.grid-align-start),
:global(.grid-align-end) {

	> :global(*) {
		display: flex;
		flex-direction: column;
	}
}

:global(.grid-align-center) {
	justify-content: center;
}

:global(.grid-align-start) {
	justify-content: normal;
}

:global(.grid-align-end) {
	justify-content: flex-end;
}

:global(.grid-min-2) {
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

:global(.grid-content) {

}

:global(.grid-break-even) {

}

:global(.grid-gap) {

}

@include screen-min-md {

	:global(.grid-area-2),
	:global(.grid-area-3),
	:global(.grid-area-4),
	:global(.grid-area-5),
	:global(.grid-area-6) {
		grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
	}

	:global(.grid-area-2.grid-flex),
	:global(.grid-area-3.grid-flex),
	:global(.grid-area-4.grid-flex),
	:global(.grid-area-5.grid-flex),
	:global(.grid-area-6.grid-flex) {

		> :global(*) {

			&:last-child:nth-child(2n - 1) {
				grid-column: span 2;
			}
		}
	}

	:global(.grid-align-stretch > * > :first-child) {
		flex-grow: 1;
	}

	:global(.grid-align-stretch > * > .grid > :first-child) {
		height: 100%;
	}
}

@include desktop {

	:global(.grid-area-3),
	:global(.grid-area-4),
	:global(.grid-area-5),
	:global(.grid-area-6) {
		grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
	}

	:global(.grid-area-3.grid-flex),
	:global(.grid-area-4.grid-flex),
	:global(.grid-area-5.grid-flex),
	:global(.grid-area-6.grid-flex) {

		> :global(*) {

			&:last-child:nth-child(2n - 1) {
				grid-column: auto;
			}

			&:last-child:nth-child(3n - 1) {
				grid-column: span 2;
			}

			&:last-child:nth-child(3n - 2) {
				grid-column: span 3;
			}
		}
	}
}

@include screen-min-xl {

	:global(.grid-area-4),
	:global(.grid-area-5),
	:global(.grid-area-6) {
		grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
	}

	:global(.grid-area-4.grid-flex),
	:global(.grid-area-5.grid-flex),
	:global(.grid-area-6.grid-flex) {

		> :global(*) {

			&:last-child:nth-child(3n - 1),
			&:last-child:nth-child(3n - 2) {
				grid-column: auto;
			}

			&:last-child:nth-child(4n - 1) {
				grid-column: span 2;
			}

			&:last-child:nth-child(4n - 2) {
				grid-column: span 3;
			}

			&:last-child:nth-child(4n - 3) {
				grid-column: span 4;
			}
		}
	}
}

@include screen-min-2xl {

	:global(.grid-area-5),
	:global(.grid-area-6) {
		grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
	}

	:global(.grid-area-5.grid-flex),
	:global(.grid-area-6.grid-flex) {

		> :global(*) {

			&:last-child:nth-child(4n - 1),
			&:last-child:nth-child(4n - 2),
			&:last-child:nth-child(4n - 3) {
				grid-column: auto;
			}

			&:last-child:nth-child(5n - 1) {
				grid-column: span 2;
			}

			&:last-child:nth-child(5n - 2) {
				grid-column: span 3;
			}

			&:last-child:nth-child(5n - 3) {
				grid-column: span 4;
			}

			&:last-child:nth-child(5n - 4) {
				grid-column: span 5;
			}
		}
	}
}

@include screen-min-3xl {

	:global(.grid-area-6) {
		grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
	}

	:global(.grid-area-6.grid-flex) {

		> :global(*) {

			&:last-child:nth-child(5n - 1),
			&:last-child:nth-child(5n - 2),
			&:last-child:nth-child(5n - 3),
			&:last-child:nth-child(5n - 4) {
				grid-column: auto;
			}

			&:last-child:nth-child(6n - 1) {
				grid-column: span 2;
			}

			&:last-child:nth-child(6n - 2) {
				grid-column: span 3;
			}

			&:last-child:nth-child(6n - 3) {
				grid-column: span 4;
			}

			&:last-child:nth-child(6n - 4) {
				grid-column: span 5;
			}

			&:last-child:nth-child(6n - 5) {
				grid-column: span 6;
			}
		}
	}
}
</style>