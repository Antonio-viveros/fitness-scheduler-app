let currentDay = "Monday";

let schedule = JSON.parse(localStorage.getItem("schedule")) || {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: []
};

/* ---------------- DAY SWITCH ---------------- */
function setDay(day) {
  currentDay = day;
  render();
}

/* ---------------- ADD WORKOUT ---------------- */
function addWorkout() {
  const inputs = document.querySelectorAll("input");

  const exercise = inputs[0].value;
  const sets = inputs[1].value;
  const reps = inputs[2].value;

  if (!exercise) return;

  schedule[currentDay].push({ exercise, sets, reps });

  localStorage.setItem("schedule", JSON.stringify(schedule));

  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";

  render();
}

/* ---------------- DELETE WORKOUT ---------------- */
function deleteWorkout(index) {
  schedule[currentDay].splice(index, 1);
  localStorage.setItem("schedule", JSON.stringify(schedule));
  render();
}

/* ---------------- DASHBOARD ---------------- */
function updateDashboard() {
  let totalWorkouts = 0;

  Object.keys(schedule).forEach(day => {
    totalWorkouts += schedule[day].length;
  });

  document.getElementById("totalWorkouts").innerText =
    "Total Workouts: " + totalWorkouts;

  document.getElementById("totalExercises").innerText =
    "Total Exercises: " + totalWorkouts;
}

/* ---------------- RENDER ---------------- */
function render() {
  const panel = document.querySelectorAll(".panel")[1];

  let html = `<h2>${currentDay} Workout</h2>`;

  if (schedule[currentDay].length === 0) {
    html += "<p>No workouts added yet</p>";
  } else {
    schedule[currentDay].forEach((w, i) => {
      html += `
        <div class="workout">
          <strong>${w.exercise}</strong><br/>
          Sets: ${w.sets || "-"} | Reps: ${w.reps || "-"}
          <br/>
          <button onclick="deleteWorkout(${i})">Delete</button>
        </div>
      `;
    });
  }

  panel.innerHTML = html;

  updateDashboard();
}

/* ---------------- TIMER ---------------- */
let timer;
let timeLeft = 60;

function startTimer(seconds) {
  clearInterval(timer);
  timeLeft = seconds;

  document.getElementById("timerDisplay").innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timerDisplay").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("⏱ Rest complete!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 60;
  document.getElementById("timerDisplay").innerText = timeLeft;
}

/* ---------------- INIT ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".days button");
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

  buttons.forEach((btn, i) => {
    btn.onclick = () => setDay(days[i]);
  });

  document.querySelector(".add-btn").onclick = addWorkout;

  render();
});
