<script>

</script>

<div class="tooltip-hover" on:focusout on:mouseleave>
	<slot />
	<div class="tooltip" role="tooltip">
		<slot name="message" />
	</div>
</div>

<style lang="scss">
.tooltip {
	background-color: var(--theme-color-font);
	border-radius: var(--border-radius-input);
	color: var(--theme-color-background);
	left: 50%;
	font-size: 13px;
	max-width: 210px;
	padding: 4px 8px;
	position: absolute;
	text-align: center;
	top: -5px;
	transform: translateX(-50%) translateY(-100%);
	visibility: hidden;
	width: max-content;
}

.tooltip:after {
	border-color: var(--theme-color-font) transparent transparent transparent;
	border-width: 6px;
	border-style: solid;
	content: "";
	left: 50%;
	margin-left: -6px;
	position: absolute;
	top: calc(100% - 1px);
}

.tooltip-hover {
	position: relative;
}

.tooltip-hover:hover:not(:focus-visible) .tooltip {
	visibility: visible;
}

.tooltip-hover:has(:focus-visible) .tooltip {
	visibility: visible
}
</style>