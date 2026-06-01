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
  let buttonVisible = true;
  let showText = false;
  function handleButtonClick() {
    showText = true; // Set showText to true when the button is clicked
    buttonVisible = false;
  }
  </script>
  
  <style>
	/* Add your CSS styling here */
  </style>
  <br><br>
  <br><br>

{#if buttonVisible}
  <h1>General instruction</h1>
  <p>Now the training finished and the real study begins. You will be presented with a total of two chess games. Each of them show a total of 80 moves, which you will have to divide twice (into smallest and largest units). <br><br>
    Note the variation of the problem and the colour of the pieces you are expected to consider when segmenting each time. These will be <strong>bolded</strong> in the text. <br><br>
    After the completion of a chess board you need to answer one question. <br><br>
    In between the smallest/largest segments version of the task, you will be involved in a random number generation task for 100 sec and at the end you will be asked some general questions about the study and the task you are involved in.</p><br>

    <button type="submit" class="button" on:click={handleButtonClick} style="background-color: blue;width:100%">Continue</button>
    {/if}


    {#if showText}
<div style="text-align: center;">


  {#if fine_or_coarse === 'fine'}

  <h1>Smallest Unit Task</h1>
  <p>You will see a three second countdown before a chess game of 80 moves.</p>
  <p>Your task will be to divide it into the <strong>smallest and most meaningful</strong> possible units for <strong>{chess_color}'s</strong> game. </p>
  <p>Press the red button when one meaningful unit ends and another begins. </p>  
  <h1><a href="/board_one" class="button" style="background-color: green;">I understand</a></h1>
    {/if}
  {#if fine_or_coarse === 'coarse'}

  <h1>Largest Unit Task</h1>
  <p>You will see a three second countdown before a chess game of 80 moves.</p>
  <p>Your task will be to divide it into the <strong>largest and most meaningful</strong> possible units for <strong>{chess_color}'s</strong> game. </p>
  <p>Press the red button when one meaningful unit ends and another begins.</p> 
  <h1><a href="/board_one" class="button" style="background-color: green;">I understand</a></h1>
  {/if}
</div>
  {/if}