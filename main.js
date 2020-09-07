window.addEventListener("load", () => {
  const ques = document.getElementById("question");
  const op1 = document.getElementById("option1");
  const op2 = document.getElementById("option2");
  const op3 = document.getElementById("option3");
  const op4 = document.getElementById("option4");

  const radioSelect = document.getElementsByClassName("radio-container");

  radioSelect[0].addEventListener("click", () => {
    radioSelect[0].querySelector("input").checked = true;
  });
  radioSelect[1].addEventListener("click", () => {
    radioSelect[1].querySelector("input").checked = true;
  });
  radioSelect[2].addEventListener("click", () => {
    radioSelect[2].querySelector("input").checked = true;
  });
  radioSelect[3].addEventListener("click", () => {
    radioSelect[3].querySelector("input").checked = true;
  });

  const url = "https://opentdb.com/api.php?amount=10";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      let q = data.results[0].question;
      let a = data.results[0].correct_answer;
      let b = data.results[0].incorrect_answers[0];
      let c = data.results[0].incorrect_answers[1];
      let d = data.results[0].incorrect_answers[2];
      ques.innerText = q;
      op1.innerText = a;
      op2.innerText = b;
      op3.innerText = c;
      op4.innerText = d;
    });
});
