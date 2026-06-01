<script>
    import { onMount } from 'svelte';
    import { initializeApp } from 'firebase/app';
    import { getFirestore, collection, addDoc } from 'firebase/firestore';
  
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
  
    let timeLeft = 100;
    let inputValue = '';
    let chess_color;
    let fine_or_coarse;

    function startCountdown() {
      const interval = setInterval(() => {
        timeLeft -= 1;
        if (timeLeft <= 0) {
          clearInterval(interval);
          submitForm();
        }
      }, 1000); // 1 second interval
    }
    let randomString; // Variable to store the previously collected cookie

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
  // Get the value of the previously collected cookie by name 'randomString'
  randomString = getCookieValue('randomString');
  chess_color = getCookieValue('chess_color');
  fine_or_coarse = getCookieValue('fine_or_coarse'); 
});
    function submitForm() {
      const formData = {
        inputValue,
        chess_color,
        fine_or_coarse,
        randomString,
      };
  
      // Assuming you have a collection named "formDataCollection" in Firestore
      addDoc(collection(db, 'Distrator-Task'), formData)
        .then(() => {
          // Form submission successful, redirect to another page
          window.location.href = 'instructions_two'; // Replace with the desired URL
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
        });
    }
  
    onMount(() => {
      startCountdown();
      randomString = getCookieValue('randomString');
      chess_color = getCookieValue('chess_color');
      fine_or_coarse = getCookieValue('fine_or_coarse');
    });
  </script>
  
  <main>
    <h1>Random Number Generation</h1>
    {#if timeLeft > 0}
      <p>Time left: {timeLeft} seconds</p>
    {:else}
      <p>Time's up! Redirecting...</p>
    {/if}
  
    <form on:submit|preventDefault={submitForm}>
      <label>
        Please enter your random numbers here:
        <input type="number" bind:value={inputValue} />
      </label>
      <button type="submit" style="position: absolute; top: -200px">Submit</button>
    </form>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 20px;
    }
  
    form {
      margin-top: 20px;
    }
    input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
  </style>
  