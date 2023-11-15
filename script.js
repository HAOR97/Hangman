const startButton = document.querySelector(".start-menu button");
const error = document.querySelector(".error");
const startMenuInput = document.querySelector(".start-menu input");
const startMenu = document.querySelector(".start-menu");
const playMenu = document.querySelector(".play-menu");
let word = "";

//start - menu;
startButton.addEventListener("click", () => {
  word = startMenuInput.value.toUpperCase();
  if (!word) {
    error.hidden = false;
    error.innerHTML = "Input some word";
    setTimeout(() => {
      error.hidden = true;
    }, 3000);
    return;
  }

  if (validation(word, error)) {
    return;
  }
  startMenu.hidden = true;
  startPlay();
});

function validation(word, error) {
  if (word.length < 3) {
    error.hidden = false;
    error.innerHTML = "Word need have min 4 letters";
    setTimeout(() => {
      error.hidden = true;
    }, 3000);
    return true;
  }

  if (!/^[A-Za-z0-9]*$/.test(word)) {
    error.hidden = false;
    error.innerHTML = "Word can only have numbers and letters";
    setTimeout(() => {
      error.hidden = true;
    }, 3000);
    return true;
  }
}

//play-menu

const timerText = document.querySelector(".time span");
const buttonCheck = document.querySelector(".characters button");
const listText = document.querySelector(".characters span");
const requiredWord = document.querySelector(".required-word span");
const img = document.querySelector(".img img");

function startPlay() {
  playMenu.hidden = false;

  let timer;
  let sec = 0;
  let min = 0;
  var lista = [];
  let life = 0;

  //set timer
  timer = setInterval(() => {
    if (sec >= 60) {
      min++;
      sec = 0;
    }
    if (min == 3) {
      playMenu.hidden = true;
      finish("Game over");
    }
    timerText.innerHTML = (min == 0 ? "00" : min) + ":" + sec;
    sec++;
  }, 1000);

  //set word and _ _ _ _
  let listaChar = [];
  for (let i = 0; i < word.length; i++) {
    listaChar.push("_ ");
  }
  listaChar.map((el) => {
    requiredWord.innerHTML += el;
  });

  //click button
  buttonCheck.addEventListener("click", () => {
    const character = document
      .querySelector(".characters input")
      .value.toUpperCase();
    document.querySelector(".characters input").value = "";
    if(character.length > 1){
      console.log('pokrenuto vise od 1 karakter')
      error.hidden = false;
      error.innerHTML = "can have onli one letter";
      setTimeout(() => {
        error.hidden = true;
      }, 3000);
    }
    else if(!/^[A-Za-z0-9]*$/.test(character)){
      error.hidden = false;
    error.innerHTML = "Word can only have numbers and letters";
    setTimeout(() => {
      error.hidden = true;
    }, 3000);
    }
    else{
    //already typed character
    console.log('false pokrenut')
    if (lista.includes(character)) {
      error.hidden = false;
      error.innerHTML = "Already checked this character";
      setTimeout(() => {
        error.hidden = true;
      }, 2000);
    }
    //new character
    else {
      lista.push(character);
      listText.innerHTML += character;
      let pogodjen = false;
      for (let i = 0; i < word.length; i++) {
        if (character == word[i]) {
          listaChar[i] = word[i];
          pogodjen = true;
        }
      }

      if (pogodjen) {
        requiredWord.innerHTML = "";
        listaChar.map((el) => {
          requiredWord.innerHTML += el;
        });

        if (!listaChar.includes("_ ")) {
          playMenu.hidden = true;
          finish("Game win");
        }
      } else {
        life++;
        img.setAttribute("src", `./img/hangman-${life}.svg`);
        if (life > 5) {
          playMenu.hidden = true;
          finish("Game over");
        }
      }
    }}
  });
}
const statusText = document.querySelector(".status");
const endMenu = document.querySelector(".end-menu");
const newButton = document.querySelector(".newBtn");
const againButton = document.querySelector(".againBtn");

function finish(status) {
  endMenu.hidden = false;
  statusText.innerHTML = status;

  newButton.addEventListener("click", () => {
    location.replace(location.href);
  });
}
