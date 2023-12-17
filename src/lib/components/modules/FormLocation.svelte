<script>
import FormField from "$lib/components/molecules/FormField.svelte";
import Form from "$lib/components/slots/Form.svelte";
import Grid from "$lib/components/slots/Grid.svelte";
import { onDestroy } from "svelte";
import { page } from "$app/stores";

export let locationData = {};

let results = {};
let errors = [];
let randomId = Math.floor(Math.random() * 8998) + 1001;

const id = locationData?._id || randomId;

onDestroy(() => {

});
</script>

{#key id}
<section class="p-[var(--content-gutter)] m-auto w-full">
	<Form method={"POST"} action={(locationData?._id ? "/account/settings/locations/?/updateLocation" : "/account/settings/locations/?/addLocation")} let:errors={errors} let:results={results} callback={(results, form) => {
		form.dispatchEvent(new CustomEvent("closeModal", { bubbles: true }));
	}} btnText={(locationData?._id ? "Update Location" : "Add Location")}>
		<FormField id={randomId} name={"org_id"} value={$page?.data?.organization?._id} type="hidden" />
		{#if locationData?._id}
			<FormField id={randomId} name={"_id"} value={locationData?._id} type="hidden" />
		{/if}
		<div class="w-full">
			<Grid max={2} flexLast={true}>
				<div class="w-full">
					<div class="richtext mb-[var(--content-gap)]">
						<legend class="h4">Location Details</legend>
					</div>
					<Grid max={3} flexLast={true}>
						<FormField error={errors.find((k) => k.name === "name")} id={randomId} label={"Name"} name="name" value={locationData?.name} type="text" validate={true} autocomplete={"off"} />
						<FormField error={errors.find((k) => k.name === "address_1")} id={randomId} label={"Address 1"} name="address_1" value={locationData?.address_1} type="text" />
						<FormField error={errors.find((k) => k.name === "address_2")} id={randomId} label={"Address 2"} name="address_2" value={locationData?.address_2} type="text" />
						<FormField error={errors.find((k) => k.name === "city")} id={randomId} label={"City"} name="city" value={locationData?.city} type="text" />
						<FormField error={errors.find((k) => k.name === "state")} id={randomId} label={"State"} name="state" value={locationData?.state} type="text" />
						<FormField error={errors.find((k) => k.name === "zip")} id={randomId} label={"Zip"} name="zip" value={locationData?.zip} type="text" />
						<FormField error={errors.find((k) => k.name === "phone")} id={randomId} label={"Phone"} name="phone" value={locationData?.phone} type="text" />
					</Grid>
				</div>
			</Grid>
		</div>
	</Form>
</section>
{/key}