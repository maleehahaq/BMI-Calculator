function calculateBMI() {
  var weight = parseFloat(document.getElementById("weight").value);
  var weightUnit = document.getElementById("weightUnit").value;
  var height = parseFloat(document.getElementById("height").value);
  var heightUnit = document.getElementById("heightUnit").value;

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("Please enter valid values for weight and height.");
    return;
  }

  // Convert weight to kilograms if entered in pounds
  if (weightUnit === "lbs") {
    weight = weight * 0.453592;
  }

  // Convert height to centimeters
  if (heightUnit === "m") {
    height = height * 100;
  } else if (heightUnit === "ft") {
    height = height * 30.48;
  } else if (heightUnit === "in") {
    height = height * 2.54;
  }

  var bmi = weight / (height / 100) ** 2;
  var bmiCategory = getBMICategory(bmi);

  document.getElementById("bmiValue").textContent = bmi.toFixed(2);
  var bmiCategoryElement = document.getElementById("bmiCategory");
  bmiCategoryElement.textContent = "Category: " + bmiCategory;
  bmiCategoryElement.className = "";
  bmiCategoryElement.classList.add(bmiCategory);

  drawBMIRangeChart(bmi);
}

function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

function drawBMIRangeChart(bmi) {
  var canvas = document.getElementById("bmiChart");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw total BMI range bar
  ctx.fillStyle = "#ecf0f1";
  ctx.fillRect(0, 10, canvas.width, 30);

  // Draw user's BMI marker
  var markerPosition = (bmi / 40) * canvas.width;
  ctx.fillStyle = "#003457";
  ctx.fillRect(markerPosition - 5, 5, 10, 40);

  // Draw text labels
  ctx.fillStyle = "#000000";
  ctx.font = "14px Arial";

  // Draw scale values with space around the first and last values
  for (var i = 0; i <= 40; i += 10) {
    var xPos = (i / 40) * canvas.width;

    // Add space around the first and last values
    if (i === 0) {
      xPos += 5;
    } else if (i === 40) {
      xPos -= 5;
    }

    ctx.fillText(i, xPos - 10, 45);
  }

  // Draw BMI Range and Your BMI labels
  ctx.fillText("BMI Range: 10 - 40", 10, 70);
}
