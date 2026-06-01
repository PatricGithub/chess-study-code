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
  
    const slideshowDuration = 3000; // 2 seconds per image
    let timestamps = []; // Array to store the collected timestamps  
    let isBorderGreen = true;
  
    // Add a variable to store the countdown value
    let countdown = 4;  
    let countdown2 = 0;
    let formSubmitted = false;
    let randomString = 0;
    let showForm = false;
    let showCountdown = false;
  
    // Function to decrement the countdown value every second
    function startCountdown() {
      showCountdown = true;
      const countdownInterval = setInterval(() => {
        countdown -= 1;
        countdown2 += 1;
        if (countdown <= 0) {
          // If the countdown reaches 0, stop the interval and show the form
          clearInterval(countdownInterval);
          isExperimentStarted = true;
          showCountdown = false;
          startSlideshow();
          startTimer(); 
          startTime2 = Date.now();
          isBorderGreen = true;
        }
      }, 1000);
    }
  
    // Generate the array of .webp image URLs 38 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const images = [];
    for (let i = 11; i <= 38; i++) {
      images.push(`stimuli/training/board-${i}.webp`);
    }
  
    let currentIndex = 0;
    let isExperimentStarted = false;
    let timerInterval;
    let startTime2;
    let chess_color;
    let fine_or_coarse;
    let themes = "";
    
   
    function startSlideshow() {
      if (currentIndex < images.length) {
        currentIndex++;
        setTimeout(startSlideshow, slideshowDuration);
      } else {
        // The slideshow is finished, start the countdown
        currentIndex = 0;
        isExperimentStarted = false; 
        clearInterval(timerInterval);
        showForm = true;
      }
    }
  
  
    function startTimer() {
      timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime2;
        console.log(`Elapsed Time: ${elapsedTime} ms`);
      }, 1000); // Update every second
    }
  
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

    onMount(() => {
      // Get the value of the previously collected cookie by name 'randomString'
      previousCookie = getCookieValue('randomString');
      chess_color = getCookieValue('chess_color');
      fine_or_coarse = getCookieValue('fine_or_coarse');
      randomString = previousCookie;
      startCountdown()
    });
    
  
    function sendToFirebase() {
      const formData = {
        randomString,
        chess_color,
        fine_or_coarse,
        timestamps,
        themes,
      };
  
      // Assuming you have a collection named "formDataCollection" in Firestore
      addDoc(collection(db, 'Training-1'), formData)
        .then(() => {
          // Form submission successful, redirect to another page
          window.location.href = 'training'; // Replace with the desired URL
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
        });
    }

    function collectTimestamp() {
        const currentTime = Date.now();
        const milliseconds = currentTime - startTime2; // Calculate the elapsed time in milliseconds
        timestamps = [...timestamps, { milliseconds }];
        console.log(`Milliseconds: ${milliseconds}`); // Display the elapsed time in milliseconds in the console
        handleButtonClick()
      }

    function handleButtonClick() { 
      const imageContainer = document.getElementById('imageContainer');
      imageContainer.style.borderColor = 'red'; // Set the border color to red when the button is clicked
      setTimeout(() => {
        imageContainer.style.borderColor = 'black'; // Set the border color back to black after 2 seconds
      }, 1250);
    }
  </script>
  
  <style>
    input{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }
    .image-container {
     display: inline-block;
      border: 7px solid black;
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
  </style>
  
  <!-- Your existing code -->
  
<div class="text-column">  
  
  
    {#if isExperimentStarted && currentIndex < images.length} 
    <div id="slideshow" style="padding-top:6rem"> 
    <img src={images[currentIndex]} class="image-container" alt={`Image ${currentIndex + 1}`} style={`border: 7px solid ${isBorderGreen ? 'black' : 'red'}`} id="imageContainer" />
    <h1><button on:click={collectTimestamp} class="button" style="min-width: 200px;">Button</button></h1>
  </div>
    {/if}
  
  
  {#if countdown2 > 0 && showCountdown}
    <!-- Display the countdown timer -->
    <h1>{countdown}s</h1> 
  {/if}
  
  {#if !isExperimentStarted && showForm || currentIndex >= images.length} 
    <!-- Button to send the data to Firebase -->
    <form on:submit|preventDefault={sendToFirebase}>   
      {#if !formSubmitted}

      <br><br>
      <label for="themes">What meaningful units did you discover?</label>
      <input type="text" id="themes" name="themes"  bind:value={themes}>
      <p style="margin: 0;">Name as many as you can recall, seperate them by comma. The idea is to understand what meaning you have discovered in each example.</p>
      <h1><button type="submit" class="button" style="background-color: blue; min-width: 200px;">END</button></h1>
      {/if}
    </form>
  {/if} 
  </div>