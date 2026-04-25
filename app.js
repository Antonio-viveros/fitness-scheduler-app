let currentDay = "Monday";

let schedule = JSON.parse(localStorage.getItem("schedule")) || {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: []
};

// Set day when button is clicked
function setDay(day) {
  currentDay = day;
  render();
}

// Add workout
function addWorkout() {
  const inputs = document.querySelectorAll("input");
  const exercise = inputs[0].value;
  const sets = inputs[1].value;
  const reps = inputs[2].value;

  if (!exercise) return;

  schedule[currentDay].push({
    exercise,
    sets,
    reps
  });

  localStorage.setItem("schedule", JSON.stringify(schedule));

  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";

  render();
}

// Delete workout
function deleteWorkout(index) {
  schedule[currentDay].splice(index, 1);
  localStorage.setItem("schedule", JSON.stringify(schedule));
  render();
}

// Render UI
function render() {
  const panel = document.querySelectorAll(".panel")[0];

  let html = `<h2>${currentDay} Workout</h2>`;

  if (schedule[currentDay].length === 0) {
    html += "<p>No workouts added yet</p>";
  } else {
    schedule[currentDay].forEach((w, i) => {
      html += `
        <div style="background:#0f172a;padding:10px;margin:8px 0;border-radius:8px;">
          <strong>${w.exercise}</strong><br/>
          Sets: ${w.sets} | Reps: ${w.reps}
          <br/>
          <button onclick="deleteWorkout(${i})">Delete</button>
        </div>
      `;
    });
  }

  panel.innerHTML = html;
}

// Hook buttons
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".days button");

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

  buttons.forEach((btn, i) => {
    btn.onclick = () => setDay(days[i]);
  });

  render();
});

// Make add button work
document.querySelector(".add-btn").onclick = addWorkout;
