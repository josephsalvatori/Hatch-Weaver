<script>
import Development from "$lib/components/slots/Development.svelte";
import SliceSwitch from "$lib/components/utilities/SliceSwitch.svelte";

</script>

<Development name={"Typeography"}>
	<div class="grid dk:grid-cols-2 gap-[var(--grid-gutter)]">
		<div class="richtext">
			<!-- Headlines -->
			<p class="eyebrow">Headlines</p>
			<hr>
			<h1 class="h1">H1 Headline</h1>
			<h2 class="h2">H2 Headline</h2>
			<h3 class="h3">H3 Headline</h3>
			<h4 class="h4">H4 Headline</h4>
			<h5 class="h5">H5 Headline</h5>
			<h6 class="h6">H6 Headline</h6>
			<hr>
			<!-- Headlines -->
			<p class="eyebrow">Body Text - Paragraph / Inline Bold / Inline Italic / Inline Link</p>
			<hr>
			<p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Curabitur mattis pellentesque enim, <em>non facilisis ante eleifend ut</em>. Nunc vehicula elit nunc. <a href="/demo/">Maecenas vel luctus enim</a>, vitae cursus neque. Morbi consequat sapien libero, nec gravida tortor fermentum vel.</p>
			<hr>
			<!-- Headlines -->
			<p class="eyebrow">Body Text - Unordered / Ordered List Items</p>
			<hr>
			<ul>
				<li>Lorem ipsum dolor sit amet</li>
				<li>consectetur adipiscing elit</li>
				<li>Curabitur mattis pellentesque enim</li>
				<li>non facilisis ante eleifend ut</li>
			</ul>
			<ol>
				<li>Lorem ipsum dolor sit amet</li>
				<li>consectetur adipiscing elit</li>
				<li>Curabitur mattis pellentesque enim</li>
				<li>non facilisis ante eleifend ut</li>
			</ol>
			<hr>
			<!-- Headlines -->
			<p class="eyebrow">Body Text - Superscript / Subscript</p>
			<hr>
			<p>Lorem ipsum dolor sit amet, consectetur <sup>adipiscing</sup> elit. Curabitur mattis pellentesque enim, non facilisis ante eleifend ut. Nunc vehicula <sub>elit</sub> nunc. Maecenas vel luctus enim, vitae cursus neque. Morbi consequat sapien libero, nec gravida tortor fermentum vel.</p>
		</div>
		<div class="richtext">
			<p class="eyebrow">Example within richtext blocks</p>
			<hr>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mattis pellentesque enim, non facilisis ante eleifend ut. Nunc vehicula elit nunc. Maecenas vel luctus enim, vitae cursus neque. Morbi consequat sapien libero, nec gravida tortor fermentum vel.</p>
			<h1>H1 Headline</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mattis pellentesque enim, non facilisis ante eleifend ut. Nunc vehicula elit nunc. Maecenas vel luctus enim, vitae cursus neque. Morbi consequat sapien libero, nec gravida tortor fermentum vel.</p>
			<h2>H2 Headline</h2>
			<p>Fusce ut ultrices purus, id aliquam velit. Nullam rhoncus laoreet semper. Etiam erat sapien, ultricies a eleifend a, commodo at justo. Fusce scelerisque sollicitudin malesuada. Praesent porta ipsum a ante venenatis efficitur. Nulla mattis ex eget convallis imperdiet. In varius facilisis eros eu ornare.</p>
			<h3>H3 Headline</h3>
			<p>Nam vel dapibus ligula. Proin dolor libero, bibendum at mi a, aliquam iaculis elit. Nam vitae nibh viverra, interdum mauris nec, porta nulla. Etiam venenatis sit amet augue sodales lobortis. Duis luctus bibendum neque, eu rhoncus sem hendrerit tincidunt. Pellentesque non turpis ac quam ornare feugiat et sed metus.</p>
			<h4>H4 Headline</h4>
			<p>Morbi eget orci egestas, commodo augue et, cursus magna. Praesent in auctor metus. Aenean sed sollicitudin orci. Nam a ante nec lectus lacinia euismod. Integer molestie arcu ac lectus auctor, non finibus magna tincidunt. Pellentesque non dui volutpat, fermentum lacus vulputate, tincidunt est.</p>
			<h5>H5 Headline</h5>
			<p>Phasellus non lorem fringilla, faucibus nisl ac, tincidunt odio. In luctus in elit quis aliquam. Curabitur elementum sem vel pharetra viverra. Aenean pellentesque dignissim diam, eget euismod erat blandit at. Nullam pulvinar nisi sit amet arcu aliquet mattis.</p>
			<h6>H6 Headline</h6>
			<p>Nunc diam mi, lacinia a blandit eu, imperdiet faucibus nibh. Duis lobortis euismod odio, interdum egestas turpis tempus ut. Praesent diam elit, luctus nec maximus sit amet, rhoncus facilisis augue. Ut vestibulum est et justo blandit convallis.</p>
		</div>
	</div>
</Development>