<script>
    import { onMount } from 'svelte';
    import { initializeApp } from 'firebase/app';
    import { getFirestore, collection, addDoc  } from 'firebase/firestore';
    let understandTask = '';
    function handleSelect(event) {
    understandTask = event.target.value;
    }
    let question = ''; // Variable to store the user's response
  let showReason = false; // Variable to track whether to show the reason textarea or not

  // Function to handle the user's selection
  function handleSelect2(event) {
    question = event.target.value;
    showReason = question === 'yes'; // Show the reason textarea if the answer is 'yes'
  }
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
    let isBorderGreen = false;
  
    // Add a variable to store the countdown value
    let countdown = 4;  
    let countdown2 = 0;
    let formSubmitted = false;
    let randomString = 0;
    let showForm = false;
    let showCountdown = false;
    let currentIndex = 0;
    let isExperimentStarted = false;
    let timerInterval;
    let showStartButton = true; // Variable to control the visibility of the "Start" button
    let startTime2;
    let chess_color;
    let fine_or_coarse;
    let reason = "";
  
    // Function to decrement the countdown value every second
    function startCountdown() {
      showStartButton = false;
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

  
    function startSlideshow() {
      if (currentIndex < images.length) {
        currentIndex++;
        setTimeout(startSlideshow, slideshowDuration);
      } else {
        // The slideshow is finished, start the countdown
        isExperimentStarted = false; 
        showForm = true;
        currentIndex = 0;
        clearInterval(timerInterval);
      }
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

    let pictureSpeed = '';
    let manageStudy = ''; // Variable to store the user's response for the first question
    let needMoreTraining = ''; 
    let themes = "";

    onMount(() => {
      // Get the value of the previously collected cookie by name 'randomString'
      previousCookie = getCookieValue('randomString');
      chess_color = getCookieValue('chess_color');
      fine_or_coarse = getCookieValue('fine_or_coarse');
      randomString = previousCookie;
    });

    let showText2 = false;  

    function sendToFirebase() {
      const formData = {
        randomString,
        chess_color,
        fine_or_coarse,
        themes,
        timestamps, 
      };
  
      // Assuming you have a collection named "formDataCollection" in Firestore
      addDoc(collection(db, 'Training-2'), formData)
        .then(() => {
          showText2 = true;
           showForm = false;
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
        });
    }

    function sendToFirebase2() {
      const formData = {
        randomString,
        understandTask,
        chess_color,
        question,
        pictureSpeed,
        reason,
        fine_or_coarse, 
        manageStudy, 
      };
  
      // Assuming you have a collection named "formDataCollection" in Firestore
      addDoc(collection(db, 'Training-Exit Survey'), formData)
        .then(() => {
          // Form submission successful, redirect to another page
          window.location.href = 'instructions_one'; // Replace with the desired URL
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
        });
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
  
    /* Class to change the border color to green */
    .green-border {
      border-color: green;
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
  {#if showStartButton} 
  {#if fine_or_coarse === 'fine'}
  <h1>Largest Unit Task</h1>
  <p>You will see the same game of 25 moves after the countdown.</p>
  <p>But, your task will be to divide it into the <strong>largest and most meaningful</strong> possible units for <strong>{chess_color}'s</strong> game. </p>
  <p>Press the red button when one meaningful unit ends and another begins.
  </p> 

  <h1><button on:click={startCountdown} class="button" style="background-color: green;min-width: 200px;">I understand</button></h1>
    {/if}
  {#if fine_or_coarse === 'coarse'}
  <h1>Smallest Unit Task</h1>
  <p>You will see the same game of 25 moves after the countdown.</p>
  <p>But, your task will be to divide it into the <strong>smallest and most meaningful</strong> possible units for <strong>{chess_color}'s</strong> game. </p>
  <p>Press the red button when one meaningful unit ends and another begins.</p> 
  <h1><button on:click={startCountdown} class="button" style="background-color: green;min-width: 200px;">I understand</button></h1>
  {/if}
  {/if}
  
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
    <form on:submit|preventDefault={sendToFirebase}>   
    <label for="themes">What meaningful units did you discover?</label>
    <input type="text" id="themes" name="themes"  bind:value={themes}>
    <p style="margin: 0;">Name as many as you can recall, seperate them by comma. The idea is to understand what meaning you have discovered in each example.</p>
    <button type="submit" class="button" style="background-color: blue;width:100%">Continue</button>
  </form> 
  {/if} 
  {#if showText2}
    <!-- Button to send the data to Firebase -->
  <h1>Exit Survey Training</h1>
    <form on:submit|preventDefault={sendToFirebase2}>   
      {#if !formSubmitted}
      <label for="understandTask">Do you understand the task better now (meaningful units)?</label>
        <select id="understandTask" name="understandTask" bind:value={understandTask} required on:change={handleSelect}>
        <option value="" disabled selected>Select an option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        </select>
        {#if understandTask === 'no'}
         <p style="color: red;">The task might appear difficult to you at the beginning, but in time you will understand it better. We understand that training might be challenging, but remember, you are free to go if you wish.</p>
        {/if}
        <br><br>
        <label for="question">Did you find this task difficult?</label>
            <select id="question" name="question" bind:value={question} required on:change={handleSelect2}>
            <option value="" disabled selected>Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            </select>
            {#if showReason}

                 <label for="reason">Why was the task difficult for you?</label>
                <input type="text" id="reason" name="reason"  bind:value={reason}>
                <p style="color: red;">The task might appear difficult to you at the beginning, but in time you will understand it better. We understand that training might be challenging, but remember, you are free to go if you wish.</p>
            {/if}<br><br>
            <label for="manageStudy">Do you think you will manage in the actual study?</label>
            <select id="manageStudy" name="manageStudy" bind:value={manageStudy} required>
              <option value="" disabled selected>Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select> 
            <label for="pictureSpeed">Were the pictures changing too fast or were they ok?</label>
            <select id="pictureSpeed" name="pictureSpeed" bind:value={pictureSpeed} required>
            <option value="" disabled selected>Select an option</option>
            <option value="too-fast">The pictures were changing too fast</option>
            <option value="ok">The picture speed was ok</option>
            </select> 
      <h1><button type="submit" class="button" style="background-color: blue; min-width: 200px;">END</button></h1>
      {/if}
    </form>
  {/if}
  </div>