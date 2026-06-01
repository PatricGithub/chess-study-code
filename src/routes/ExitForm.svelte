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

  let question1 = "";
  let formSubmitted = false;
  let question2 = "";
  let question3 = "";
  let question4 = "";
  let question5 = ""; 

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
    let previousCookie; // Variable to store the previously collected cookie
  
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
  let chess_color;
    onMount(() => {
      // Get the value of the previously collected cookie by name 'randomString'
      previousCookie = getCookieValue('randomString');
    chess_color = getCookieValue('chess_color');
    });
  
    function sendToFirebase() {
      
      const userCollectionRef = collection(db, 'Exit-Survey');
      addDoc(userCollectionRef, {
        previousCookie,
        chess_color, 
      question2,
      question3,
      question4,
      question5, 
  });
  
      // After sending the data, redirect to the thank_you page
      formSubmitted = true;
    }
  
    function redirectToAnotherPage() {
      // Replace "YOUR_URL_HERE" with the URL of the page you want to redirect to
      window.location.href = 'thank_you';
    }
  </script>
  
  <div class="form-container">
    {#if !formSubmitted}
    <h1>Exit Survey</h1>
    <form on:submit|preventDefault={sendToFirebase}>
  
      <label for="question2">1. Did you find the instructions clear and easy to follow?</label>
    <select id="question2" name="question2" bind:value={question2}  required>
      <option value="" disabled selected>Select an option</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select><br><br>
  
    <label for="question3">2. How confident are you in the accuracy of your responses? (Scale: 1 - Not confident at all, 5 - Very confident)</label>
    <select id="question3" name="question3" bind:value={question3}  required>
      <option value="" disabled selected>Select an option</option>
      <option value="1">1 - Not confident at all</option>
      <option value="2">2 - Slightly confident</option>
      <option value="3">3 - Moderately confident</option>
      <option value="4">4 - Confident</option>
      <option value="5">5 - Very confident</option>
    </select><br><br>
  
      <label for="question4">3. Which segmentation was easier for you, the smallest or largest unit task?</label>
      <select id="question4" name="question4" bind:value={question4} required>
        <option value="" disabled selected>Select an option</option>
        <option value="smallest">Smallest unit task</option>
        <option value="largest">Largest unit task</option>
      </select>


      <label for="question5">4. Rate the speed of the video recording! Would you slow it down/ speed it up/ was it just right?</label>
      <select id="question5" name="question5" bind:value={question5} required>
        <option value="" disabled selected>Select an option</option>
        <option value="slow">Slow it down</option>
        <option value="speed">Speed it up</option>
        <option value="just-right">Just right</option>
      </select>
      <br><br>

      <button type="submit" class="button" style="background-color: blue; width: 100%">Submit</button>
    </form>{/if}
  </div>

  

  {#if formSubmitted}
<div class="text-column">  
  <h1>Thank You!</h1>
  <p>Thank you for participating in our experiment. Your responses have been successfully submitted.</p>
  <p><strong>Contact information for questions or concerns</strong><br>If you have any questions about the upcoming procedure, please direct them to Patric Pfoertner M.Sc., PhD Candidate (f85787@students.nbu.bg or p.pfoertner@psychology4.me)
  </p>
</div>
{/if}
  <style>
    input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
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
textarea{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
.invisible-input {
    position: absolute;
    top: -99999px;
    left: -99999px;
  } 
  </style>
  