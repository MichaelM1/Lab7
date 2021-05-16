// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too



document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

      });

      const header = document.querySelector("header");
      const settingsbutton = header.querySelector("img");
      settingsbutton.addEventListener('click', () => {
        router.setState("settings");
      });

      const homebutton = header.querySelector("h1");
      homebutton.addEventListener("click", () => {
        router.setState("home");
      });
      
      const main = document.querySelector('main');
      const singleentrybutton = main.querySelectorAll("journal-entry");
      singleentrybutton.forEach( element => 
          element.addEventListener('click', () => {
            router.setState(element);
          })
      );
    });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}