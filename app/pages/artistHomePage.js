import { items } from "../../data/data.js";

export function initArtistHomePage() {
  const navBar = document.querySelector(".fa-bars");
  //menu
  navBar.addEventListener("click", function () {
    console.log("clicked");
    const navMenu = document.querySelector(".navMenu");
    if (navMenu.style.display === "block") {
      navMenu.style.display = "none";
    } else {
      navMenu.style.display = "block";
    }
  });

  //local storage name
  const currentArtist = localStorage.getItem("nameArtist");

  document.querySelector("#artist").innerHTML = currentArtist;

  const soldItemsNum = document.querySelector("#soldItems");

  const itemsByArtist = items.filter((item) => item.artist === currentArtist);


  //chart
  const soldItems = itemsByArtist.filter((item) => Boolean(item.dateSold));
  soldItemsNum.innerText = `${soldItems.length}/${itemsByArtist.length}`;
  console.log(`${soldItems.length}/${itemsByArtist.length}`);

  const sum = soldItems.reduce((acc, item) => acc + item.priceSold, 0);
  const income = document.querySelector("#income");

  income.innerText = `$${sum}`;

  console.log(sum);
  let myChartDest = Chart.getChart("myChart");
  if (myChartDest) {
    myChartDest.destroy();
  }

  const ctx = document.getElementById("myChart");

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: generateLabels(7),
      datasets: [
        {
          label: "amount",
          backgroundColor: "#a26a5e",
          borderColor: "#000",
          data: items.priceSold,
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
    },
  });

  const last7 = document.querySelector("#last7");
  const last14 = document.querySelector("#last14");
  const last30 = document.querySelector("#last30");
  const lastOneYear = document.querySelector("#lastOneYear");

  last7.addEventListener("click", function () {
    const labels = generateLabels(7);

    myChart.data.labels = labels;

    const newDate = labels.map((label) => {
      let sum = 0;

      soldItems.forEach((item) => {
        if (label === formatDate(item.dateSold)) {
          sum = sum + item.priceSold;
        }
      });

      return sum;
    });

    myChart.data.datasets[0].data = newDate;

    myChart.update();
  });

  last14.addEventListener("click", function () {
    const labels = generateLabels(14);

    myChart.data.labels = labels;

    const newDate = labels.map((label) => {
      let sum = 0;

      soldItems.forEach((item) => {
        if (label === formatDate(item.dateSold)) {
          sum = sum + item.priceSold;
        }
      });

      return sum;
    });

    myChart.data.datasets[0].data = newDate;

    myChart.update();
  });

  last30.addEventListener("click", function () {
    const labels = generateLabels(30);

    myChart.data.labels = labels;

    const newDate = labels.map((label) => {
      let sum = 0;

      soldItems.forEach((item) => {
        if (label === formatDate(item.dateSold)) {
          sum = sum + item.priceSold;
        }
      });

      return sum;
    });

    myChart.data.datasets[0].data = newDate;

    myChart.update();
  });

  lastOneYear.addEventListener("click", function () {
    const labels = generateMonthsInAYear(12);

    myChart.data.labels = labels;

    const newDate = labels.map((label) => {
      let sum = 0;

      soldItems.forEach((item) => {
        if (label === item.dateSold) {
          sum = sum + item.priceSold;
        }
      });

      return sum;
    });

    myChart.data.datasets[0].data = newDate;

    myChart.update();
  });
}

function generateMonthsInAYear(monthsAgo) {
  let arr = [];
  let monthsArr = [];
  for (let i = 0; i < monthsAgo; i++) {
    const currentDate = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    currentDate.setDate(1);
    for (i = 0; i <= 11; i++) {
      monthsArr.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    arr = monthsArr.map(
      (month) =>
        `${months[new Date(month).getMonth()]} ${new Date(month).getFullYear()}`
    );
  }
  return arr;
}

function generateLabels(daysAgo) {
  const arr = [];

  for (let i = 0; i < daysAgo; i++) {
    const start = new Date();

    const startDate = start.getDate();

    const currentDate = start.setDate(startDate - i);

    const formattedDate = formatDate(currentDate);
    console.log(formattedDate);
    arr.push(formattedDate);
  }

  return arr;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-gb");
}
