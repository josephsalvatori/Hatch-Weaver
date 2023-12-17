<script>
import { refs } from "$js/_helpers/refs";
import { slugify } from "$js/_helpers/slugify";
import { stringHash } from "$js/_helpers/hash";

export let accept = null;
export let autocomplete = null;
export let checked = null;
export let disclaimer = null;
export let error = false;
export let id = Math.floor(Math.random() * 100000);
export let hideSpacing = false;
export let label = null;
export let min = 0;
export let max = null;
export let name = "";
export let options = [];
export let placeholder = null;
export let price = false;
export let style = null;
export let type = "text";
export let validate = false;
export let value = null;

const btnStyle = (style !== null) ? refs.buttonStyles[slugify(style)] : "";

let debounceTimer;

const debounce = (event) => {

	clearTimeout(debounceTimer);

	debounceTimer = setTimeout(() => {

		if(event.target.type === "number") {

			if(event.target.value < event.target.min) value = min;
			if(event.target.max > 0 && event.target.value > event.target.max) value = max;

			return;
		}

		value = event.target.value;

	}, 300);
};

const fieldId = stringHash(`${id}_${name}`);
</script>

{#if type === "textarea"}
	Textarea
{:else if type === "select"}
	<div class="select-group" class:error={(validate && error)}>
		<label for={fieldId}>{label || name}{#if validate === true}<sup>*</sup>{/if}</label>
		<select id={fieldId}>
			{#each options as option}
				<option value={option.value || option}>{option}</option>
			{/each}
		</select>
	</div>
{:else if type === "checkbox" || type === "radio"}
	<div class="input-group {btnStyle}" class:error={(validate && error)}>
		{#if style !== "option" && hideSpacing === false}
			<div class="label">{@html disclaimer || "&nbsp;"}</div>
		{/if}
		<div class="input-size">
			<input class="input sr-only" class:validate={validate} autocomplete={autocomplete} id={fieldId} name={name} type={type} checked={checked} value={value} />
			<label for={fieldId}>{@html label || name}{#if validate === true}<sup>*</sup>{/if}</label>
		</div>
	</div>
{:else if type === "number"}
	<div class="input-group relative {btnStyle}" class:error={(validate && error)}>
		<label for={fieldId}>{label || name}{#if validate === true}<sup>*</sup>{/if}</label>
		<input class="input appearance-none" id={fieldId} placeholder={placeholder} name={name} max={max} min={min} type={type} value={value} on:input={debounce} on:focus={event => event.target.select()} />
		{#if price === true}
			<span class="pointer-events-none absolute bottom-[10px] left-[10px]">$</span>
		{/if}
	</div>
{:else if type === "hidden"}
	<input class="input" id={fieldId} name={name} type={"hidden"} value={value} />
{:else}
	<div class="input-group {btnStyle}" class:error={(validate && error)}>
		<label for={fieldId}>{label || name}{#if validate === true}<sup>*</sup>{/if}</label>
		<input class="input" class:validate={validate} accept={accept} autocomplete={autocomplete} role={(autocomplete === "off") ? "presentation" : null} placeholder={placeholder} id={fieldId} name={name} type={type} value={value} />
	</div>
{/if}

<style>

</style>