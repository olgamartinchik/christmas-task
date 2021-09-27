export let countTickets = () => {
  let count = 0;
  let inputValueBasic = document.querySelector(".input_number_basic").value;
  let plusBtnBasic = document.querySelector(".plus_btn_basic");
  let minusBtnBasic = document.querySelector(".minus_btn_basic");
  let inputValueSenior = document.querySelector(".input_number_senior").value;
  let plusBtnSenior = document.querySelector(".plus_btn_senior");
  let minusBtnSenior = document.querySelector(".minus_btn_senior");
  plusBtnBasic.addEventListener("click", (e) => {
    // console.log('click',inputValueBasic)
    count++;
    inputValueBasic = count;

    document.querySelector(".input_number_basic").value = inputValueBasic;
  });
  minusBtnBasic.addEventListener("click", (e) => {
    // console.log('click',inputValueBasic)
    count--;
    inputValueBasic = count;

    document.querySelector(".input_number_basic").value = inputValueBasic;
    if (count <= 0) {
      count = 0;
      document.querySelector(".input_number_basic").value = 0;
    }
  });
  plusBtnSenior.addEventListener("click", (e) => {
    count++;
    inputValueSenior = count;
    document.querySelector(".input_number_senior").value = inputValueSenior;
  });
  minusBtnSenior.addEventListener("click", (e) => {
    count--;
    inputValueSenior = count;
    document.querySelector(".input_number_senior").value = inputValueSenior;
    if (count <= 0) {
      count = 0;
      document.querySelector(".input_number_senior").value = 0;
    }
  });
};

countTickets();
