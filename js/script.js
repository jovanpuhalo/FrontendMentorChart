let eftchData = [];
const today = Date();

fetch("./data.json") // fetch data
  .then((res) => res.json())
  .then((result) => {
    eftchData.push(...result);

    const maxAmount = Math.max(...eftchData.map((day) => day.amount)); //the largest amount relative to which we will create the chart

    eftchData.forEach((day, index) => {
      const dayColumn = document.querySelector(`.column--${index + 1}`); //we select the column

      dayColumn.style.height = `${(day.amount * 100) / maxAmount}%`; //we set the height in percent depending on maxAmount and today's amount

      dayColumn.querySelector(`.column--value`).textContent = `$${day.amount}`; //we also add to the child div

      if (today.slice(0, 3).toLowerCase() === day.day) {
        //we look for a column that matches the present day and paint it a different color, we achieve a hover with a mouseenter
        dayColumn.style.backgroundColor = "hsl(186, 34%, 60%)";
        dayColumn.addEventListener("mouseenter", () => {
          dayColumn.style.backgroundColor = "hsl(186, 33%, 72%)";
        });
        dayColumn.addEventListener("mouseleave", () => {
          dayColumn.style.backgroundColor = "hsl(186, 34%, 60%)";
        });
      }
    });
  });
