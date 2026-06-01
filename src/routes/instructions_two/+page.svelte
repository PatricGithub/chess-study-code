<!-- SecondExperimentInstructions.svelte -->
<script>
	import { onMount } from 'svelte'; 
  let chess_color;
  let fine_or_coarse;
	// Function to get the value of a cookie by name
	function getCookieValue(name) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  } 

   onMount(() => {
    chess_color = getCookieValue('chess_color');
    fine_or_coarse = getCookieValue('fine_or_coarse');
  });
  </script>
  
  <style>
	/* Add your CSS styling here */
  </style>
  <br><br>
  <br><br>
<div style="text-align: center;">
 
  {#if fine_or_coarse === 'fine'}

  <h1>Largest Unit Task</h1>
  <p>You will see a three second countdown before a chess game of 80 moves.</p>
  <p>Your task will be to divide it into the <strong>largest and most meaningful</strong> possible units for <strong>{chess_color}'s</strong> game. </p>
  <p>Press the red button when one meaningful unit ends and another begins.</p> 
  <h1><a href="/board_three" class="button" style="background-color: green;">I understand</a></h1>
    {/if}
  {#if fine_or_coarse === 'coarse'}

  <h1>Smallest Unit Task</h1>
  <p>You will see a three second countdown before a chess game of 80 moves.</p>
  <p>Your task will be to divide it into the <strong>smallest and most meaningful</strong> possible units for <strong>{chess_color}'s</strong> game. </p>
  <p>Press the red button when one meaningful unit ends and another begins. </p> 
  <h1><a href="/board_three" class="button" style="background-color: green;">I understand</a></h1>
  {/if}
</div>