<script>
  import { onMount } from 'svelte';
  import { initializeApp } from 'firebase/app';
  import { getFirestore, collection, addDoc  } from 'firebase/firestore';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDPagCA5YMt9k3hcts7mfdua2tqrLSAMu8",
  authDomain: "chess-experiment-23797.firebaseapp.com",
  projectId: "chess-experiment-23797",
  storageBucket: "chess-experiment-23797.appspot.com",
  messagingSenderId: "1050409862908",
  appId: "1:1050409862908:web:da6606a32325f4ea89f979"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  let chess_color = '';
  let fine_or_coarse = '';

  // Default values for form fields
  let ranking = ''; // Default value for chess ranking (use for Blitz)
  let age = ''; // Default value for age
  let gender = '';
  let computer = '';
  let englishLevel = ''; // Default value for English level
  let nationality = ''; // Default value for nationality
  let chessLearningAge = ''; // Default value for age started learning chess
  let hasFideRating = 'no'; // Default value for FIDE rating question
  let fideRating = ''; // Default value for FIDE rating (hidden by default)
  let randomString = '';
  let formSubmitted = false;

  // Function to generate a random string of 16 digits
  function generateRandomString() {
    const digits = '0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      result += digits[randomIndex];
    }
    return result;
  }

  onMount(() => {
    // Generate the random string when the component is mounted
    randomString = generateRandomString();
    chess_color = Math.random() < 0.5 ? 'black' : 'white';
    fine_or_coarse = Math.random() < 0.5 ? 'fine' : 'coarse';
  });

  function handleSubmit() {
    // Check if age and ranking are greater than 0 before proceeding
    if (age <= 17 || ranking <= 500) {
      alert("Age and Ranking should be greater than 0.");
      return;
    }

    // Send the participant data to the Firebase Firestore database
    const userCollectionRef = collection(db, 'User');
    addDoc(userCollectionRef, {
      ranking,
      chess_color,
      fine_or_coarse,
      age,
      gender,
      computer,
      englishLevel,
      nationality,
      chessLearningAge,
      fideRating, // Include FIDE rating in the database
      randomString,
    });

    // Store the randomString in a cookie on the user's device
    document.cookie = `randomString=${randomString}; expires=${new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000 // Cookie expiration set to 30 days from now
    ).toUTCString()}`;

    document.cookie = `chess_color=${chess_color}; expires=${new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000 // Cookie expiration set to 30 days from now
    ).toUTCString()}`;

    document.cookie = `fine_or_coarse=${fine_or_coarse}; expires=${new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000 // Cookie expiration set to 30 days from now
    ).toUTCString()}`;

    // Hide the form and display a success message
    formSubmitted = true;
  }
  let buttonVisible2 = true;
  let showText2 = false; 
  let showText3 = false;// Initialize the variable to control text visibility
  
  // Function to handle the button click
  function handleButtonClick() {
    showText2 = true; // Set showText to true when the button is clicked
    buttonVisible2 = false;
  }
  function handleButtonClick2() {
    showText3 = true; // Set showText to true when the button is clicked
    showText2 = false; 
  }
</script>

<style> 
input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
select{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box; 
  background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+) no-repeat 95% 50%;
    -moz-appearance: none; 
    -webkit-appearance: none; 
    appearance: none; 
    background-color: white; 
    border-radius: 0px;
    border-color: white;
    height: 45px;
}
.invisible-input {
  position: absolute;
  top: -99999px;
  left: -99999px;
}  
  .form-container p {
    font-size: 13px;
    display: block;
    margin-top: 0;
    margin-bottom: 0px;
  }
  .form-container label {
    font-size: 17px;
    font-weight: 500;
    display: block;
    margin-top: 20px;
    margin-bottom: 0px;
  }
  </style>

  {#if !formSubmitted}
  <h1>Data Collection</h1>
  <div class="form-container">
    <form on:submit|preventDefault={handleSubmit}>
      <label for="ranking">Your Chess.com Ranking <strong style="color: red;">(Blitz)</strong> minimum of 600</label>
      <input type="number" id="ranking" bind:value={ranking} min="600" required>
      <p>Please provide your Chess.com ranking for Blitz.</p>
  
      <label for="age">Your Age</label>
      <input type="number" id="age" bind:value={age} min="18" required>
      <p>Please enter your age (must be greater than or equal to 18).</p>
  
      <label for="gender">Your Gender</label>
      <select id="gender" bind:value={gender} required>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
  
      <label for="englishLevel">Your English Level</label>
      <select id="englishLevel" bind:value={englishLevel} required>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
        <option value="Fluent">Fluent</option>
      </select>
  
      <label for="computer">The Device you are using</label>
      <select id="computer" bind:value={computer} required>
        <option value="Computer">Computer</option>
        <option value="Tablet">Tablet</option>
        <option value="Phone">Phone</option> 
      </select>
  
      <label for="nationality">Your Nationality</label>
      <input type="text" id="nationality" bind:value={nationality} required>
      <p>Please enter your nationality.</p>
  
      <label for="chessLearningAge">Age You Started Learning to Play Chess</label>
      <input type="number" id="chessLearningAge" bind:value={chessLearningAge} min="1" required>
      <p>Please enter the age at which you started learning to play chess (must be greater than 0).</p>
  
      <label for="hasFideRating">Do you have a FIDE rating?</label>
      <select id="hasFideRating" bind:value={hasFideRating} required>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      <p>If you have a FIDE rating, please select "Yes" and provide your rating below.</p>
  
      {#if hasFideRating === 'yes'}
        <label for="fideRating">Your FIDE Rating</label>
        <input type="number" id="fideRating" bind:value={fideRating} min="1" required>
        <p>Please provide your FIDE rating.</p>
      {/if}
  
      <input
        bind:value={randomString}
        readonly
        class="invisible-input"
        on:click={() => { navigator.clipboard.writeText(randomString); alert('Copied to clipboard!'); }}
      />
      <br>
      <button type="submit" class="button" style="background-color: blue;width:100%">Continue</button>
    </form>
  </div>
  {/if}


{#if formSubmitted}
{#if buttonVisible2}
<h1>General instruction</h1>
  <p>You will be presented with a video of two chess games twice and asked to parse them once into the <strong>smallest</strong> possible and once into the <strong>largest</strong> possible segments that are <strong>meaningful</strong> to you in each case. <br><br>

    There is no right or wrong answer as the meaning you will find and use in this segmentation task depends solely on your knowledge, experience and understanding of the game of chess. <br><br>
    
    Read the instructions carefully to be sure which segmentation task you are expected to perform, i.e. segmenting the smallest or largest meaning units. <br><br> 
    
    The task might appear difficult to you at the beginning, but <strong>in time</strong> you will understand it better. This task was never used with chess, however it was succesfully used in studies of continuous actions.<br><br>

    Let's start with a short training session to get used to the study procedure.</p><br>

    <button type="submit" class="button" on:click={handleButtonClick} style="background-color: blue;width:100%">Continue</button>
{/if}
{/if}
{#if showText2}
<h1>General Training Instruction</h1>
<p>
This is the training session that should help you get used to the segmentation task. <br><br> A video of a chess game will be presented to you twice at a predetermined speed. Please pay attention to the version you are in, i.e. the <strong>smallest/largest</strong> segmentation of the task, which will be highlighted in each instruction before the task.<br><br>
In either case, the task consists of breaking the chess game into units that are meaningful to you by pressing the red button below the virtual chess board. <br><br>If your answer has been registered, you will see a quick change in the border colour from black to red.</p><br>
<button type="submit" class="button" on:click={handleButtonClick2} style="background-color: blue;width:100%">Continue</button>
{/if}
{#if showText3}
<div class="success-message">
  


  {#if fine_or_coarse === 'fine'}
  <h1>Smallest Unit Task</h1>
  <p>You will see a three second countdown before a chess game of 25 moves.</p>
  <p>Your task will be to divide it into the <strong>smallest and most meaningful</strong> possible units for <strong>{chess_color}'s</strong> game. </p>
  <p>Press the red button when one meaningful unit ends and another begins.
  </p> 

  <h1><a href="/pre_training" class="button" style="background-color: green;">I understand</a></h1>
    {/if}
  {#if fine_or_coarse === 'coarse'}
  <h1>Largest Unit Task</h1>
  <p>You will see a three second countdown before a chess game of 25 moves.</p>
  <p>Your task will be to divide it into the <strong>largest and most meaningful</strong> possible units for <strong>{chess_color}'s</strong> game. </p>
  <p>Press the red button when one meaningful unit ends and another begins.</p> 

  <h1><a href="/pre_training" class="button" style="background-color: green;">I understand</a></h1>
  {/if}
   
  <!-- Additional success message or instructions -->
</div>{/if} 