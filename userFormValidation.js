window.onload = function() {
  fetch('database/form.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('form').innerHTML = data;
      // Load your JavaScript file after the HTML is loaded
      var script = document.createElement('script');
      script.src = "database/countData.js"; 
      document.body.appendChild(script);
    });
};
