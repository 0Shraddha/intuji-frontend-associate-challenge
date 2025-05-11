document.addEventListener("DOMContentLoaded", () => {

  function loadComponent(id, file, callback) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.querySelector(id).innerHTML = data;
        if (callback) callback();  // Run callback after loading
      });
  }

  // Chart options
  const options = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      }
    },
    colors: ['#6C63FF', '#FFD700'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    series: [
      {
        name: 'Label 1',
        data: [12000, 14000, 5000, 9000, 20000, 11000, 17000]
      },
      {
        name: 'Label1',
        data: [5000, 9000, 6000, 11000, 10000, 8500, 10000]
      }
    ],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      labels: {
        style: {
          fontSize: '14px'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val >= 1000 ? (val / 1000) + 'k' : val;
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    },
    grid: {
      borderColor: '#eee'
    }
  };

  // Transaction Details
  const transactions = [
    {
      icon: "../assets/images/icons/gallery.svg",
      title: "Figma",
      amount: 100,
      date: "August 20, 2022",
      status: "Completed"
    },
    {
      icon: "../assets/images/icons/gallery.svg",
      title: "Youtube",
      amount: 120,
      date: "August 20, 2022",
      status: "Completed"
    },
    {
      icon: "../assets/images/icons/gallery.svg",
      title: "Spotify",
      amount: 15,
      date: "August 20, 2022",
      status: "Completed"
    },
    {
      icon: "../assets/images/icons/gallery.svg",
      title: "Freepik",
      amount: 300,
      date: "August 20, 2022",
      status: "Completed"
    }
  ];
  
  function renderTransactions() {
    const transactionList = document.querySelector('.transaction-list');
    
    // Clear existing content
    transactionList.innerHTML = '';
    
    // Loop through each transaction and create HTML
    transactions.forEach(transaction => {
      const transactionItem = document.createElement('div');
      transactionItem.className = 'transaction-item';
      
      transactionItem.innerHTML = `
        <div class="transaction-header">
          <div class="image-section">
            <img src="${transaction.icon}" alt="" class="icon-section">
          </div>
          <div class="text-section">
            <div class="transaction">
              <div class="title">
                <p>${transaction.title}</p>
                <p style="margin-right: 16px;">$ ${transaction.amount}</p>
              </div>
              <div class="metadata">
                <div class="date">
                  ${transaction.date}
                </div>
                <div class="status">
                  ${transaction.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      transactionList.appendChild(transactionItem);
    });
  }
  

  // Load layout components
  loadComponent("#sidebar-container", "components/sidebar.html");
  loadComponent("#header-container", "components/header.html");
  loadComponent("#overview-container", "components/overview-cards.html");

  // Load chart AFTER transactions component has been loaded
  loadComponent("#transactions", "components/transactions.html", () => {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render().then(() => {
      // Wait a bit to ensure legend is rendered
      setTimeout(() => {
        const legend = document.querySelector(".apexcharts-legend");
    
        if (legend) {
          const dropdown = document.createElement("select");
          dropdown.id = "chart-range";
          dropdown.style.marginLeft = "12px";
          dropdown.style.padding = "2px 6px";
          dropdown.style.border = "1px solid #ccc";
          dropdown.style.borderRadius = "4px";
          dropdown.innerHTML = `
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Yearly</option>
          `;
    
          // Append beside legend
          legend.appendChild(dropdown);
    
          // Add event listener to update chart
          dropdown.addEventListener("change", function () {
            const value = this.value;
            if (value === "weekly") {
              chart.updateSeries([
                { name: 'Label 1', data: [12000, 14000, 5000, 9000, 20000, 11000, 17000] },
                { name: 'Label1', data: [5000, 9000, 6000, 11000, 10000, 8500, 10000] }
              ]);
            } else {
              chart.updateSeries([
                { name: 'Label 1', data: [50000, 62000, 48000, 71000] },
                { name: 'Label1', data: [30000, 40000, 35000, 45000] }
              ]);
              chart.updateOptions({
                xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr'] }
              });
            }
          });
        }
      }, 300); // Small delay to ensure ApexCharts finishes rendering
    });

    renderTransactions();
  })
  



});
