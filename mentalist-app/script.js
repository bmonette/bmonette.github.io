console.log("🧠 script.js is loaded!");

document.addEventListener("DOMContentLoaded", () => {
  const steps = [
    "Think of a number between 1 and 10.",
    "Multiply it by 2.",
    "Add 8 to the result.",
    "Divide it by 2.",
    "Now subtract your original number.",
    "Convert the result into a letter (1 = A, 2 = B, etc).",
    "Think of a country that starts with that letter.",
    "Take the last letter of that country.",
    "Think of a fruit that starts with that letter.",
    "You're thinking of Denmark and Kiwi, aren't you?",
    "Interesting... kiwis don't grow in Denmark. 😉"
  ];

  let currentStep = 0;

  const message = document.getElementById("message");
  const nextBtn = document.getElementById("nextBtn");

  // Show the first message right away
  message.innerText = steps[0];

  nextBtn.addEventListener("click", () => {
    currentStep++;

    if (currentStep < steps.length) {
      message.innerText = steps[currentStep];
      nextBtn.innerText = currentStep === steps.length - 1 ? "Reveal" : "Next";
    } else {
      message.innerText = "Mind = Blown 🤯";
      nextBtn.style.display = "none";
    }
  });
});
