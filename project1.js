// Student Marks Analyser Project

// 1. Validation Helper
function isValid(m) {
  return typeof m === "number" && !isNaN(m) && m >= 0 && m <= 100;
}

// 2. Grade Helper
function getGrade(m) {
  if (m >= 90) return "A";
  if (m >= 75) return "B";
  if (m >= 50) return "C";
  return "F";
}

// 3. Calculation Helpers
const total = (arr) => arr.reduce((s, m) => s + m, 0);
const average = (arr) => (arr.length ? total(arr) / arr.length : 0);

// 4. Search Helper
function findStudent(names, marks, name) {
  const i = names.findIndex(n => n.toLowerCase() === name.toLowerCase());
  return i === -1 ? "Student not found" : `${names[i]}: ${marks[i]} (Grade ${getGrade(marks[i])})`;
}

// 5. Core Analyser & Report Function
function analyzeStudents(names, marks) {
console.log("       STUDENT MARKS ANALYSER REPORT    ");


  // Handle empty lists
  if (!names || names.length === 0 || !marks || marks.length === 0) {
    console.log("Status: No student records found (Empty dataset).");
    return;
  }

  // Handle length mismatch
  if (names.length !== marks.length) {
    console.log("Error: Names and marks arrays length mismatch!");
    return;
  }

  // Handle invalid marks
  if (!marks.every(isValid)) {
    console.log("Status: Invalid marks found in dataset!");
    return;
  }

  // Calculate statistics
  const t = total(marks);
  const avg = average(marks);
  const highest = Math.max(...marks);
  const lowest = Math.min(...marks);

  console.log(`Summary Statistics:`);
  console.log(`   Total Marks : ${t}`);
  console.log(`   Average     : ${avg.toFixed(2)}`);
  console.log(`   Highest     : ${highest}`);
  console.log(`   Lowest      : ${lowest}\n`);

  console.log(`Individual Student Breakdown:`);
  names.forEach((n, i) => {
    console.log(`   • ${n.padEnd(8)} - Marks: ${String(marks[i]).padEnd(3)} - Grade: ${getGrade(marks[i])}`);
  });
  console.log("");

  // Sort results (High to Low)
  const sortedStudents = names.map((n, i) => ({ name: n, mark: marks[i] }));
  sortedStudents.sort((a, b) => b.mark - a.mark);
  
  console.log(`Leaderboard (Sorted High to Low):`);
  sortedStudents.forEach((s, rank) => {
    console.log(`   ${rank + 1}. ${s.name} — ${s.mark} marks`);
  });
}

// --- Test Execution ---
const names = ["Amit", "Sara", "John", "Priya"];
const marks = [78, 92, 55, 88];

analyzeStudents(names, marks);
console.log(`Search Result: ${findStudent(names, marks, "sara")}`);