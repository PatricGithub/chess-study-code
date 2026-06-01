<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { onMount } from 'svelte';

	let previousCookie = ''; // Declare a variable to store the value of the previous cookie

// Function to get the value of a cookie by name
function getCookieValue(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Function to check if the 'randomString' cookie is available and update the 'previousCookie' value
function checkCookie() {
  previousCookie = getCookieValue('randomString');
}

onMount(() => {
  // Check the cookie status on mount and update 'previousCookie'
  checkCookie();
});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		<strong>
		to the Research Study<br /> Event Segmentation in Chess</strong>
		{#if previousCookie}
		<p style="color: red; font-size: 20px">
		You can not participate as you already participated: <strong>{previousCookie}</strong>
		</p>
		{/if}
		<br><br>
		<a href="/about" class="button {previousCookie ? 'hidden' : ''}">Continue</a>

	</h1>
</section>

<style>
	.hidden {
    display: none;
  }
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
