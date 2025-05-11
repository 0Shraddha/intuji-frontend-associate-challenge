document.addEventListener("DOMContentLoaded", () => {
    function loadComponent(id, file) {
      fetch(file)
        .then(response => response.text())
        .then(data => {
          document.querySelector(id).innerHTML = data;
        });
    }
  
    loadComponent("#sidebar-container", "components/sidebar.html");
    loadComponent("#header-container", "components/header.html");
    loadComponent("#overview-container", "components/overview-cards.html");
    loadComponent("#analytics", "components/analytics-section.html");
  
    console.log("hello from scripts");
  });
  
 