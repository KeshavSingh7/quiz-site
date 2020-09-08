window.addEventListener("load", () => {
  const ques = document.getElementById("question");
  const opc = document.getElementsByClassName("options-container");

  const url = "https://opentdb.com/api.php?amount=10";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let q = data.results[0].question;
      q = q.replaceAll("&quot;", '"').replaceAll("&#039;", "'");
      ques.innerText = q;
      let a = data.results[0].correct_answer;
      let b = data.results[0].incorrect_answers;
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
      //const radioSelect = document.getElementsByClassName("radio");
      for (let i = 0; i < b.length + 1; i++) {
        radioSelect[i].addEventListener("click", () => {
          if (
            radioSelect[i].querySelector("input").checked === true &&
            radioSelect[i].querySelector("label").innerText === a
          ) {
            console.log(radioSelect[i].checked === true);
            console.log(radioSelect[i].querySelector("label").innerText === a);
            radioSelect[i].classList.add("correct");
          } else {
            console.log(radioSelect[i].checked === true);
            console.log(radioSelect[i].querySelector("label").innerText === a);
            radioSelect[i].classList.add("wrong");
          }
        });
      }
    });
});
