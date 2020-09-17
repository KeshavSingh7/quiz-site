window.addEventListener("load", () => {
  //points to the question container
  const ques = document.getElementById("question");
  //pointer container
  const opc = document.getElementsByClassName("options-container");
  //attempted or not attempted
  const ar1 = document.getElementsByClassName("yes-no");
  //current question number
  let qno = 0;
  // craeting a 2d array to store question no., correct answer, and option selected by the user.
  let ar = new Array(10);
  for (let i = 0; i < 10; i++) {
    ar[i] = new Array(3);
  }

  // api fetching
  const url = "https://opentdb.com/api.php?amount=10&encode=url3986";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //doIt function is used to add the question and the options to their specific container.
      function doIt() {
        document.getElementById("qno").innerText = parseInt(qno) + 1;
        let q = decodeURIComponent(data.results[qno].question);
        ques.innerText = q;
        let a = decodeURIComponent(data.results[qno].correct_answer);
        ar[qno][0] = q;
        ar[qno][1] = a;
        let b = data.results[qno].incorrect_answers;
        let arr = new Array(b.length + 1);
        //creating a random position for the correct answer and adding it to it
        let rn = Math.floor(Math.random() * (b.length + 1));
        arr[rn] = a;
        let c = 0;
        //adding the other option to the left off spaces
        for (let i = 0; i < b.length + 1; i++) {
          if (i != rn) {
            b[c] = decodeURIComponent(b[c]);
            arr[i] = b[c++];
          }
        }

        //creating the containers that store the option
        for (let i = 0; i < b.length + 1; i++) {
          let x = document.createElement("div");
          x.classList.add("radio-container");

          let y = document.createElement("input");
          y.setAttribute("type", "radio");
          y.setAttribute("name", "option");
          y.setAttribute("id", `radio${i}`);
          y.setAttribute("class", "radio");

          let z = document.createElement("label");
          z.setAttribute("for", `radio${i}`);
          z.innerText = arr[i];

          //adding font awesome to correct and inncorrect option
          let w;
          if (i == rn) {
            w = document.createElement("i");
            w.setAttribute("class", "fas fa-check");
          } else {
            w = document.createElement("i");
            w.setAttribute("class", "fas fa-times");
          }

          x.appendChild(y);
          x.appendChild(z);
          x.appendChild(w);
          opc[0].appendChild(x);
        }

        //adding a pointer event none ensures that the question is attempted only once
        const radioSelect = document.getElementsByClassName("radio-container");
        for (let i = 0; i < radioSelect.length; i++) {
          radioSelect[i].addEventListener("click", () => {
            radioSelect[i].querySelector("input").checked = true;
            ar[qno][2] = radioSelect[i].querySelector("label").innerText;
            for (let j = 0; j < radioSelect.length; j++) {
              radioSelect[j].style.pointerEvents = "none";
            }
          });
        }

        // checking the answer and displaying the result accordingly
        for (let i = 0; i < b.length + 1; i++) {
          radioSelect[i].addEventListener("click", () => {
            if (
              radioSelect[i].querySelector("input").checked === true &&
              radioSelect[i].querySelector("label").innerText === a
            ) {
              radioSelect[i].classList.add("correct");
              document.getElementById("score").innerText =
                parseInt(document.getElementById("score").innerText) + 1;
            } else {
              radioSelect[i].classList.add("wrong");
              radioSelect[rn].classList.add("correct");
            }
          });
        }
        c = 0;
      }

      //used to check if the previous or next question has been attempted or not
      function checkIt() {
        const radioSelect = document.getElementsByClassName("radio-container");
        if (typeof ar[qno][2] !== "undefined") {
          for (let i = 0; i < radioSelect.length; i++) {
            radioSelect[i].style.pointerEvents = "none";
          }

          if (ar[qno][1] === ar[qno][2]) {
            for (let i = 0; i < radioSelect.length; i++) {
              if (
                radioSelect[i].querySelector("label").innerText === ar[qno][2]
              ) {
                radioSelect[i].classList.add("correct");
                radioSelect[i].querySelector("input").checked = true;
              }
            }
          } else {
            for (let i = 0; i < radioSelect.length; i++) {
              if (
                radioSelect[i].querySelector("label").innerText === ar[qno][1]
              ) {
                radioSelect[i].classList.add("correct");
              }
              if (
                radioSelect[i].querySelector("label").innerText === ar[qno][2]
              ) {
                radioSelect[i].classList.add("wrong");
                radioSelect[i].querySelector("input").checked = true;
              }
            }
          }
        }
      }

      //function for previous button
      document.getElementById("previous").addEventListener("click", () => {
        if (qno == 0) {
          document.getElementById("forfeit-container").style.display = "none";
          document.getElementById("myModal").style.display = "inline-block";
          document.getElementById("realSubmit").style.display = "none";
          document.getElementById("prevText").style.display = "inline-block";
          document.getElementById("nextText").style.display = "none";
        }

        if (qno > 0) {
          qno--;
          opc[0].innerText = "";
          doIt();
          checkIt();
        }
      });

      //function for next button
      document.getElementById("next").addEventListener("click", () => {
        if (qno == 9) {
          document.getElementById("forfeit-container").style.display = "none";
          document.getElementById("myModal").style.display = "inline-block";
          document.getElementById("realSubmit").style.display = "none";
          document.getElementById("prevText").style.display = "none";
          document.getElementById("nextText").style.display = "inline-block";
        }

        if (qno < 9) {
          qno++;
          opc[0].innerText = "";
          doIt();
          checkIt();
        }
      });

      //navigating to the attempted question using modal indiacators
      for (let i = 0; i < 10; i++) {
        if (ar[i][2] === undefined) {
          ar1[i].addEventListener("click", () => {
            opc[0].innerText = "";
            qno = parseInt(ar1[i].innerText) - 1;
            doIt();
            document.getElementById("myModal").style.display = "none";
          });
        }
      }

      doIt();
    });

  //function for submit button
  document.getElementById("submit").addEventListener("click", () => {
    sessionStorage.setItem("score", document.getElementById("score").innerText);
    document.getElementById("forfeit-container").style.display = "none";
    document.getElementById("myModal").style.display = "inline-block";
    document.getElementById("realSubmit").style.display = "flex";
    document.getElementById("prevText").style.display = "none";
    document.getElementById("nextText").style.display = "none";
    for (let i = 0; i < 10; i++) {
      if (ar[i][2] !== undefined) {
        ar1[i].style.background = "greenyellow";
      }
    }
  });

  //function for forfeit button
  document.getElementById("forfeit").addEventListener("click", () => {
    document.getElementById("forfeit-container").style.display = "inline-block";
    document.getElementById("myModal").style.display = "inline-block";
    document.getElementById("realSubmit").style.display = "none";
    document.getElementById("prevText").style.display = "none";
    document.getElementById("nextText").style.display = "none";
  });

  //function for modal close button
  document.getElementById("close").addEventListener("click", () => {
    document.getElementById("myModal").style.display = "none";
  });
});
