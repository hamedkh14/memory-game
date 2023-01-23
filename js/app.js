const emoji = [
  "😀",
  "🤣",
  "🥰",
  "😜",
  "😡",
  "😎",
  "🥶",
  "😷",
  "😀",
  "🤣",
  "🥰",
  "😜",
  "😡",
  "😎",
  "🥶",
  "😷",
];
let data = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let countCorrectAnswer = 0;
let emojiShow = "";
let lockSelectItem = false;
let timer;
let minute = 2;
let second = 0;
let score = 0;

const container = document.querySelectorAll("#container #items")[0];
const btnReset = document.getElementById("btnReset");
const textResult = document.getElementById("textResult");
const result = document.getElementById("result");
const timeScreen = document.getElementById("time");
const scoreScreen = document.getElementById("score");

btnReset.addEventListener("click", handleReset);

function createGame() {
  emoji.forEach((item) => {
    let randomNumber = getRandomNumber(0, data.length);
    while (1) {
      if (data[randomNumber] == "") break;

      randomNumber = getRandomNumber(0, data.length);
    }

    data[randomNumber] = item;
  });

  data.forEach((item) => {
    const divElement = document.createElement("div");
    divElement.setAttribute("data-emoji", item);
    divElement.innerHTML = `
                            <div class="div-back"><span>${item}</span></div>
                            <div class="div-inner"><img src="img/mark.png"></div>
                          `;
    container.appendChild(divElement);
    divElement.addEventListener("click", handleOnClick);
  });

  handleTimer();
}
createGame();

function handleOnClick() {
  if (this.classList.contains("show") || lockSelectItem) return;

  this.classList.add("active");
  if (emojiShow == "") {
    emojiShow = this;
  } else {
    lockSelectItem = true;
    if (
      emojiShow.getAttribute("data-emoji") == this.getAttribute("data-emoji")
    ) {
      emojiShow.classList.add("show");
      this.classList.add("show");
      emojiShow = "";
      countCorrectAnswer = countCorrectAnswer + 2;
      lockSelectItem = false;
    } else {
      setTimeout(() => {
        emojiShow.classList.remove("active");
        this.classList.remove("active");
        emojiShow = "";
        lockSelectItem = false;
      }, 500);
    }

    checkResult();
  }
}

function checkResult() {
  console.log(countCorrectAnswer);
  if (countCorrectAnswer < data.length && minute == 0 && second == 0) {
    result.style.display = "flex";
    textResult.textContent = "Unfortunately, you lost";
    return;
  }

  if (countCorrectAnswer == data.length) {
    result.style.display = "flex";
    textResult.textContent = "congratulations! you won";
    score++;
    scoreScreen.textContent = score;
    clearInterval(timer);
  }
}

function handleTimer() {
  timer = setInterval(() => {
    if (minute == 0 && second == 0) {
      clearInterval(timer);
      checkResult();
      return;
    }

    if (second == 0) {
      second = 59;
      minute--;
    } else {
      second--;
    }

    timeScreen.textContent = `0${minute}:${
      second < 10 ? "0" + second : second
    }`;
  }, 1000);
}

function handleReset() {
  container.innerHTML = "";
  minute = 2;
  second = 0;
  countCorrectAnswer = 0;
  emojiShow = "";
  lockSelectItem = false;

  for (let i = 0; i < data.length; i++) {
    data[i] = "";
  }

  createGame();
  result.style.display = "none";
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
