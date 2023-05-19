window.onload = function() {
  fetch('https://cdn.jsdelivr.net/gh/fesaone/simplekredit/form.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('form').innerHTML = data;
      // Execute script after the HTML is loaded
      executeScript();
    });
};

function executeScript() {
  var script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/gh/fesaone/simplekredit/script.js"; 
  document.body.appendChild(script);
}
