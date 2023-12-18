<script>
import SliceSwitch from "$lib/components/utilities/SliceSwitch.svelte";

/** @type {import("@prismicio/client").Content.CarouselSlice} */
export let slice;

let index = Math.floor(Math.random() * 99) + 1;
</script>

<SliceSwitch slice={slice} index={index} />