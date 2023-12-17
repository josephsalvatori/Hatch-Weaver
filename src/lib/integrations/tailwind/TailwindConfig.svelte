<script>
/**
 * This is a development mode injecting for Tailwind Play CDN
 */
import tailwindConfig from "../../../../tailwind.config.json";
</script>

{@html `<script src="https://cdn.tailwindcss.com/"></script>`}
{@html `<script> tailwind.config = ${JSON.stringify(tailwindConfig)}; </script>`}