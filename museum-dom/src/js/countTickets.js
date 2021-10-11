export let countTickets = () => {
  let checkedInput = document.querySelectorAll(".input_radio");
  let price = document.querySelector(".price_tiket");
  let inputValueBasic = document.querySelector(".input_number_basic").value;
  let plusBtnBasic = document.querySelector(".plus_btn_basic");
  let minusBtnBasic = document.querySelector(".minus_btn_basic");
  let inputValueSenior = document.querySelector(".input_number_senior").value;
  let plusBtnSenior = document.querySelector(".plus_btn_senior");
  let minusBtnSenior = document.querySelector(".minus_btn_senior");
  let selectType = document.querySelector(
    "#tickets > div > div > div > div > div.user_container > div > label:nth-child(5) > label > select"
  ).options;
  let select = document.querySelector(
    "#tickets > div > div > div > div > div.user_container > div > label:nth-child(5) > label > select"
  );
  let basicPricePopup = document.querySelector(
    "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(2) > p > span"
  );
  let seniorPricePopup = document.querySelector(
    "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(3) > p > span"
  );
  let inputValueBasicPopup = document.querySelector(
    "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(2) > div > input"
  ).value;
  let inputValueSeniorPopup = document.querySelector(
    "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(3) > div > input"
  ).value;
  let doubleCountBasic = document.querySelector(
    "#tickets > div > div > div > div > div.ticket_price_container > div.total_ticket > div.price_all.price_basic > div > span"
  );
  let doubleCountSenior = document.querySelector(
    "#tickets > div > div > div > div > div.ticket_price_container > div.total_ticket > div.price_all.price_senior.title_underline > div > span"
  );
  let popupPriceBasic = document.querySelector(
    "#tickets > div > div > div > div > div.ticket_price_container > div.total_ticket > div.price_all.price_basic > div > p > span"
  );
  let popupPriceSenior = document.querySelector(
    "#tickets > div > div > div > div > div.ticket_price_container > div.total_ticket > div.price_all.price_senior.title_underline > div > p > span"
  );
  let priceAllPopupBasic = document.querySelector(
    "#tickets > div > div > div > div > div.ticket_price_container > div.total_ticket > div.price_all.price_basic > p > span"
  );
  let priceAllPopupSenior = document.querySelector(
    "#tickets > div > div > div > div > div.ticket_price_container > div.total_ticket > div.price_all.price_senior.title_underline > p > span"
  );
  let doubleTypeTicket = document.querySelector(
    "#tickets > div > div > div > div > div.ticket_price_container > div.overview_content > div.overview_ticket > div > div:nth-child(5) > p"
  );
  let allPricePopup = document.querySelector(".allPricePopup");

  let priceTicketBasic = 0;
  let priceTicketSenior = 0;
  let countBasic = 0;
  let countSenior = 0;
  let dataTicket = {
    priceTicketBasic: priceTicketBasic,
    priceTicketSenior: priceTicketSenior,
    countBasic: countBasic,
    countSenior: countSenior,
    price: price.innerText,
    ValueCheckedInput: "",
    priceInputBasic: "",
    priceInputSenior: "",
    priceSelect: "",
  };

  //data in localStorage
  let dataCheckedTicket = JSON.parse(localStorage.getItem("dataTicket"));
  // console.log("inputValueBasic", typeof inputValueBasic);
  if (dataCheckedTicket) {
    console.log("dataCheckedTicket", dataCheckedTicket);
    countBasic = dataCheckedTicket["countBasic"];
    countSenior = dataCheckedTicket["countSenior"];
    price.innerHTML = dataCheckedTicket["price"];
    document.querySelector(".input_number_basic").value =
      dataCheckedTicket["countBasic"];
    document.querySelector(".input_number_senior").value =
      dataCheckedTicket["countSenior"];
    priceTicketSenior = dataCheckedTicket["priceTicketSenior"];
    priceTicketBasic = dataCheckedTicket["priceTicketBasic"];
    for (let i = 0; i < checkedInput.length; i++) {
      if (checkedInput[i].value !== dataCheckedTicket["ValueCheckedInput"]) {
        checkedInput[i].removeAttribute("checked");
        // console.log("checkedInput[i].value", checkedInput[i]);
      } else {
        if (checkedInput[i].value === dataCheckedTicket["ValueCheckedInput"]) {
          checkedInput[i].checked = true;
        }
      }
    }
    //popup localStorage
    for (let i = 0; i < selectType.length; i++) {
      if (selectType[i].value === dataCheckedTicket["ValueCheckedInput"]) {
        selectType[i].selected = true;
      }
    }
    basicPricePopup.innerHTML = dataCheckedTicket["priceInputBasic"];
    seniorPricePopup.innerHTML = dataCheckedTicket["priceInputSenior"];
    document.querySelector(
      "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(2) > div > input"
    ).value = dataCheckedTicket["countBasic"];
    document.querySelector(
      "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(3) > div > input"
    ).value = dataCheckedTicket["countSenior"];
    doubleCountBasic.innerHTML = dataCheckedTicket["countBasic"];
    doubleCountSenior.innerHTML = dataCheckedTicket["countSenior"];
    popupPriceBasic.innerHTML = dataCheckedTicket["priceInputBasic"];
    popupPriceSenior.innerHTML = dataCheckedTicket["priceInputSenior"];
    allPricePopup.innerHTML = dataCheckedTicket["price"];
    priceAllPopupBasic.innerHTML = dataCheckedTicket["priceTicketBasic"];
    priceAllPopupSenior.innerHTML = dataCheckedTicket["priceTicketSenior"];
    doubleTypeTicket.innerHTML = dataCheckedTicket["ValueCheckedInput"];
  }

  //checked input
  for (let i = 0; i < checkedInput.length; i++) {
    checkedInput[i].addEventListener("change", (e) => {
      if (checkedInput[i].checked) {
        let ticketType = checkedInput[i].getAttribute("data");
        priceTicketBasic = +inputValueBasic * +ticketType;
        dataTicket["priceTicketBasic"] = String(priceTicketBasic);
        priceTicketSenior = +inputValueSenior * (+ticketType / 2);
        dataTicket["priceTicketSenior"] = String(priceTicketSenior);
        // console.log("checkedInput[i]", checkedInput[i].value);

        price.innerHTML = priceTicketSenior + priceTicketBasic;
        dataTicket["price"] = price.innerHTML;
        dataTicket["ValueCheckedInput"] += checkedInput[i].value;
        dataTicket["priceInputBasic"] += String(
          checkedInput[i].getAttribute("data")
        );
        dataTicket["priceInputSenior"] += String(
          checkedInput[i].getAttribute("data") / 2
        );
        localStorage.setItem("dataTicket", JSON.stringify(dataTicket));
      }
    });
  }
  //input number Basic
  plusBtnBasic.addEventListener("click", (e) => {
    e.preventDefault();
    countBasic++;
    dataTicket["countBasic"] = String(countBasic);
    inputValueBasic = countBasic;
    document.querySelector(".input_number_basic").value = inputValueBasic;
    if (countBasic >= 20) {
      countBasic = 19;
    }
    for (let i = 0; i < checkedInput.length; i++) {
      if (checkedInput[i].checked) {
        let ticketType = checkedInput[i].getAttribute("data");
        priceTicketBasic = +inputValueBasic * +ticketType;
        dataTicket["priceTicketBasic"] = String(priceTicketBasic);
        console.log(priceTicketBasic);
        // console.log("checkedInput[i].data", ticketType);
        price.innerHTML = priceTicketSenior + priceTicketBasic;
        dataTicket["price"] = price.innerHTML;
        localStorage.setItem("dataTicket", JSON.stringify(dataTicket));
      }
    }
  });
  minusBtnBasic.addEventListener("click", (e) => {
    e.preventDefault();
    countBasic--;
    dataTicket["countBasic"] = String(countBasic);
    inputValueBasic = countBasic;
    document.querySelector(".input_number_basic").value = inputValueBasic;
    if (countBasic <= 0) {
      countBasic = 0;
      document.querySelector(".input_number_basic").value = 0;
    }
    for (let i = 0; i < checkedInput.length; i++) {
      if (checkedInput[i].checked) {
        let ticketType = checkedInput[i].getAttribute("data");
        if (priceTicketBasic === 0) {
          priceTicketBasic = 0;
          dataTicket["priceTicketBasic"] = String(priceTicketBasic);
        } else {
          priceTicketBasic -= +ticketType;
          dataTicket["priceTicketBasic"] = String(priceTicketBasic);
          console.log(priceTicketBasic);
        }
        price.innerHTML = priceTicketSenior + priceTicketBasic;
        dataTicket["price"] = price.innerHTML;
        localStorage.setItem("dataTicket", JSON.stringify(dataTicket));
      }
    }
  });
  //input number Senior
  plusBtnSenior.addEventListener("click", (e) => {
    countSenior++;
    if (countSenior >= 20) {
      countSenior = 20;
    }
    dataTicket["countSenior"] = String(countSenior);
    inputValueSenior = countSenior;
    document.querySelector(".input_number_senior").value = inputValueSenior;
    for (let i = 0; i < checkedInput.length; i++) {
      if (checkedInput[i].checked) {
        let ticketType = checkedInput[i].getAttribute("data");
        priceTicketSenior = +inputValueSenior * (+ticketType / 2);
        dataTicket["priceTicketSenior"] = String(priceTicketSenior);
        console.log(priceTicketSenior);
        price.innerHTML = priceTicketSenior + priceTicketBasic;
        dataTicket["price"] = price.innerHTML;
        localStorage.setItem("dataTicket", JSON.stringify(dataTicket));
      }
    }
    e.preventDefault();
  });
  minusBtnSenior.addEventListener("click", (e) => {
    countSenior--;
    dataTicket["countSenior"] = String(countSenior);
    inputValueSenior = countSenior;
    document.querySelector(".input_number_senior").value = inputValueSenior;
    if (countSenior <= 0) {
      countSenior = 0;
      document.querySelector(".input_number_senior").value = 0;
    }
    for (let i = 0; i < checkedInput.length; i++) {
      if (checkedInput[i].checked) {
        let ticketType = checkedInput[i].getAttribute("data");
        if (priceTicketSenior != 0) {
          priceTicketSenior -= +ticketType / 2;
          dataTicket["priceTicketSenior"] = String(priceTicketSenior);
        } else {
          priceTicketSenior = 0;
          dataTicket["priceTicketSenior"] = String(priceTicketSenior);
        }

        console.log(priceTicketSenior);
        price.innerHTML = priceTicketSenior + priceTicketBasic;
        dataTicket["price"] = price.innerHTML;
        localStorage.setItem("dataTicket", JSON.stringify(dataTicket));
      }
    }

    e.preventDefault();
  });

  //popup data
  let minusBtnBasicPopup = document.querySelector(
    "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(2) > div > span.minus_btn.minus_btn_basic"
  );
  let plusBtnBasicPopup = document.querySelector(
    "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(2) > div > span.plus_btn.plus_btn_basic"
  );
  let minusBtnSeniorPopup = document.querySelector(
    "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(3) > div > span.minus_btn.minus_btn_senior"
  );
  let plusBtnSeniorPopup = document.querySelector(
    "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(3) > div > span.plus_btn.plus_btn_senior"
  );
  // select;
  // selectType;
  // basicPricePopup;
  // seniorPricePopup;
  // inputValueBasicPopup;
  // inputValueSeniorPopup;
  // doubleCountBasic;
  // doubleCountSenior;
  // popupPriceBasic;
  // popupPriceSenior;
  // priceAllPopupBasic;
  // priceAllPopupSenior;
  // allPricePopup;
  // let dataTicket = {
  //   priceTicketBasic: priceTicketBasic,
  //   priceTicketSenior: priceTicketSenior,
  //   countBasic: countBasic,
  //   countSenior: countSenior,
  //   price: price.innerText,
  //   ValueCheckedInput: "",
  //   priceInputBasic: "",
  //   priceInputSenior: "",
  // priceSelect:'',
  // };

  let priceSelect = selectType[selectType.selectedIndex].getAttribute("data");
  select.addEventListener("change", (e) => {
    let dataSelect =
      e.target.options[e.target.selectedIndex].getAttribute("data");
    console.log("selectType", e.target.value);
    basicPricePopup.innerHTML = dataSelect;
    seniorPricePopup.innerHTML = dataSelect / 2;
    popupPriceBasic.innerHTML = dataSelect;
    popupPriceSenior.innerHTML = dataSelect / 2;
    priceAllPopupBasic.innerHTML = +dataSelect * +countBasic;
    priceAllPopupSenior.innerHTML = (+dataSelect / 2) * +countSenior;
    allPricePopup.innerHTML =
      +dataSelect * +countBasic + (+dataSelect / 2) * +countSenior;
    doubleTypeTicket.innerHTML = e.target.options[e.target.selectedIndex].value;
    dataTicket["price"] = allPricePopup.innerHTML;
    dataTicket["priceInputBasic"] = dataSelect;
    dataTicket["priceInputSenior"] = String(dataSelect / 2);
    dataTicket["ValueCheckedInput"] =
      selectType[selectType.selectedIndex].value;
    dataTicket["priceSelect"] = dataSelect;
    dataTicket["priceTicketBasic"] = String(+dataSelect * +countBasic);
    console.log("countBasic", countBasic);
    localStorage.setItem("dataTicket", JSON.stringify(dataTicket));
  });
  plusBtnBasicPopup.addEventListener("click", (e) => {
    e.preventDefault();
    countBasic++;
    dataTicket["countBasic"] = String(countBasic);
    inputValueBasicPopup = countBasic;
    document.querySelector(
      "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(2) > div > input"
    ).value = inputValueBasicPopup;
    doubleCountBasic.innerHTML = inputValueBasicPopup;
    if (countBasic >= 20) {
      countBasic = 19;
    }
    priceAllPopupBasic.innerHTML = String(+priceSelect * +inputValueBasicPopup);
    console.log(priceSelect);
    dataTicket["priceTicketBasic"] = String(
      +priceSelect * +inputValueBasicPopup
    );
    allPricePopup.innerHTML = String(
      +priceAllPopupBasic.innerHTML + +priceAllPopupSenior.innerHTML
    );
    dataTicket["price"] = allPricePopup.innerHTML;
    console.log("price.innerHTML", price.innerHTML);
    localStorage.setItem("dataTicket", JSON.stringify(dataTicket));
  });
  minusBtnBasicPopup.addEventListener("click", (e) => {
    e.preventDefault();
    countBasic--;
    if (countBasic <= 0) {
      countBasic = 0;
    }
    dataTicket["countBasic"] = String(countBasic);
    inputValueBasicPopup = countBasic;
    document.querySelector(
      "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(2) > div > input"
    ).value = inputValueBasicPopup;
    doubleCountBasic.innerHTML = countBasic;
    console.log("countBasic", countBasic);
    if (countBasic <= 0) {
      countBasic = 0;
      document.querySelector(
        "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(2) > div > input"
      ).value = 0;
      doubleCountBasic.innerHTML = 0;
    }
    priceAllPopupBasic.innerHTML = String(+priceSelect * +inputValueBasicPopup);
    allPricePopup.innerHTML = String(
      +priceAllPopupBasic.innerHTML + +priceAllPopupSenior.innerHTML
    );
    dataTicket["price"] = allPricePopup.innerHTML;
    dataTicket["priceTicketBasic"] = priceAllPopupBasic.innerHTML;
    localStorage.setItem("dataTicket", JSON.stringify(dataTicket));
  });
  plusBtnSeniorPopup.addEventListener("click", (e) => {
    console.log("click");
    e.preventDefault();
    countSenior++;
    if (countSenior >= 20) {
      countSenior = 20;
    }
    dataTicket["countSenior"] = String(countSenior);
    inputValueSeniorPopup = countSenior;
    doubleCountSenior.innerHTML = countSenior;
    document.querySelector(
      "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(3) > div > input"
    ).value = inputValueSeniorPopup;
    priceAllPopupSenior.innerHTML = String(
      +priceSelect * +inputValueSeniorPopup
    );
    dataTicket["priceTicketSenior"] = priceAllPopupSenior.innerHTML;
    allPricePopup.innerHTML = String(
      +priceAllPopupBasic.innerHTML + +priceAllPopupSenior.innerHTML
    );
    dataTicket["price"] = allPricePopup.innerHTML;
    localStorage.setItem("dataTicket", JSON.stringify(dataTicket));
  });
  minusBtnSeniorPopup.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click");
    countSenior--;
    if (countBasic <= 0) {
      countBasic = 0;
    }
    dataTicket["countSenior"] = String(countSenior);
    inputValueSeniorPopup = countSenior;
    document.querySelector(
      "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(3) > div > input"
    ).value = inputValueSeniorPopup;
    priceAllPopupSenior.innerHTML = String(
      +priceSelect * +inputValueSeniorPopup
    );
    doubleCountSenior.innerHTML = countSenior;
    console.log("priceAllPopupSenior", priceAllPopupSenior);
    if (countSenior <= 0) {
      countSenior = 0;
      doubleCountSenior.innerHTML = 0;
      document.querySelector(
        "#tickets > div > div > div > div > div.user_container > div > div.entry_ticket > div:nth-child(3) > div > input"
      ).value = 0;
    }
    dataTicket["priceTicketSenior"] = priceAllPopupSenior.innerHTML;
    allPricePopup.innerHTML = String(
      +priceAllPopupBasic.innerHTML + +priceAllPopupSenior.innerHTML
    );
    dataTicket["price"] = allPricePopup.innerHTML;
    localStorage.setItem("dataTicket", JSON.stringify(dataTicket));
    ///
  });
};

countTickets();
