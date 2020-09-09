window.addEventListener("load", () => {
  const ques = document.getElementById("question");
  const opc = document.getElementsByClassName("options-container");
  let qno = 0;

  const url = "https://opentdb.com/api.php?amount=10";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      function doIt() {
        let q = data.results[qno].question;
        q = q.replaceAll("&quot;", '"').replaceAll("&#039;", "'");
        ques.innerText = q;
        let a = data.results[qno].correct_answer;
        let b = data.results[qno].incorrect_answers;
        let arr = new Array(b.length + 1);
        let rn = Math.floor(Math.random() * (b.length + 1));
        arr[rn] = a;
        let c = 0;
        for (let i = 0; i < b.length + 1; i++) {
          if (i != rn) {
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

      document.getElementById("previous").addEventListener("click", () => {
        if (qno > 0) {
          qno--;
          opc[0].innerText = "";
          doIt();
        }
      });

      document.getElementById("next").addEventListener("click", () => {
        if (qno < 9) {
          qno++;
          opc[0].innerText = "";
          doIt();
        }
      });

      doIt();
    });
});
