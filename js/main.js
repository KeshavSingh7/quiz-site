window.addEventListener("load", () => {
  const ques = document.getElementById("question");
  const opc = document.getElementsByClassName("options-container");
  let qno = 0;
  let ar = new Array(10);
  for (let i = 0; i < 10; i++) {
    ar[i] = new Array(3);
  }

  const url = "https://opentdb.com/api.php?amount=10&encode=url3986";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      function doIt() {
        document.getElementById("qno").innerText = parseInt(qno) + 1;
        let q = decodeURIComponent(data.results[qno].question);
        ques.innerText = q;
        let a = decodeURIComponent(data.results[qno].correct_answer);
        ar[qno][0] = q;
        ar[qno][1] = a;
        let b = data.results[qno].incorrect_answers;
        let arr = new Array(b.length + 1);
        let rn = Math.floor(Math.random() * (b.length + 1));
        arr[rn] = a;
        let c = 0;
        for (let i = 0; i < b.length + 1; i++) {
          if (i != rn) {
            b[c] = decodeURIComponent(b[c]);
            arr[i] = b[c++];
          }
        }

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
      }

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

      document.getElementById("previous").addEventListener("click", () => {
        if (qno > 0) {
          qno--;
          opc[0].innerText = "";
          doIt();
          checkIt();
        }

        if (qno == 0) {
          document.getElementById("realForfeit").style.display = "none";
          document.getElementById("myModal").style.display = "inline-block";
          document.getElementById("realSubmit").style.display = "none";
          document.getElementById("prevText").style.display = "inline-block";
          document.getElementById("nextText").style.display = "none";
        }
      });

      document.getElementById("next").addEventListener("click", () => {
        if (qno < 9) {
          qno++;
          opc[0].innerText = "";
          doIt();
          checkIt();
        }

        if (qno == 9) {
          document.getElementById("realForfeit").style.display = "none";
          document.getElementById("myModal").style.display = "inline-block";
          document.getElementById("realSubmit").style.display = "none";
          document.getElementById("prevText").style.display = "none";
          document.getElementById("nextText").style.display = "inline-block";
        }
      });

      doIt();
    });
  document.getElementById("submit").addEventListener("click", () => {
    sessionStorage.setItem("score", document.getElementById("score").innerText);
    document.getElementById("realForfeit").style.display = "none";
    document.getElementById("myModal").style.display = "inline-block";
    document.getElementById("realSubmit").style.display = "inline-block";
    document.getElementById("prevText").style.display = "none";
    document.getElementById("nextText").style.display = "none";
    document.getElementById("modal-content").style.pointerEvents = "none";
  });

  document.getElementById("forfeit").addEventListener("click", () => {
    document.getElementById("realForfeit").style.display = "inline-block";
    document.getElementById("myModal").style.display = "inline-block";
    document.getElementById("realSubmit").style.display = "none";
    document.getElementById("prevText").style.display = "none";
    document.getElementById("nextText").style.display = "none";
    document.getElementById("modal-content").style.pointerEvents = "none";
  });

  document.getElementById("close").addEventListener("click", () => {
    document.getElementById("myModal").style.display = "none";
  });
  document.getElementById("Mymodal").addEventListener("click", () => {
    document.getElementById("myModal").style.display = "none";
  });
});
