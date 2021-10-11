import { validate } from "schema-utils";

let getPopupData = () => {
  let popupDate = document.querySelector(".input_popup_data");
  let popupTime = document.querySelector(".input_popup_time");
  let popupName = document.querySelector(".input_popup_name");
  let popupEmail = document.querySelector(".input_popup_email");
  let popupPhone = document.querySelector(".input_popup_phone");
  let submitBtn = document.querySelector(".bye_btn");

  popupDate.addEventListener("blur", () => validateDate(false), false);
  popupTime.addEventListener("blur", () => validateTime(false), false);
  popupName.addEventListener("blur", () => validateName(false), false);
  popupEmail.addEventListener("blur", () => validateEmail(false), false);
  popupPhone.addEventListener("blur", () => validatePhone(false), false);
  submitBtn.addEventListener("click", formSubmit, false);
  let dataForm = {
    popupDate: "",
    popupTime: "",
    popupName: "",
    popupEmail: "",
    popupPhone: "",
  };
  let getDataForm = JSON.parse(localStorage.getItem("dataForm"));
  if (getDataForm) {
    popupDate.value = getDataForm["popupDate"];
    popupTime.value = getDataForm["popupTime"];
    popupName.value = getDataForm["popupName"];
    popupEmail.value = getDataForm["popupEmail"];
    popupPhone.value = getDataForm["popupPhone"];
  }
  console.log("getDataForm", getDataForm);
  function validateDate(a) {
    let errorCount = 0;
    if (!popupDate.value) {
      document.querySelector(".errorDate").innerHTML = "Выберите дату";
      dataForm["popupDate"] = popupDate.value;
      localStorage.setItem("dataForm", JSON.stringify(dataForm));
      errorCount++;
      if (a) {
        popupDate.focus();
      }
    } else {
      document.querySelector(".errorDate").innerHTML = "";
      dataForm["popupDate"] = popupDate.value;
      localStorage.setItem("dataForm", JSON.stringify(dataForm));
    }

    return errorCount;
  }
  function validateTime(a) {
    let errorCount = 0;
    if (!popupTime.value) {
      document.querySelector(".errorTime").innerHTML = "Выберите время";
      dataForm["popupTime"] = popupTime.value;
      localStorage.setItem("dataForm", JSON.stringify(dataForm));
      errorCount++;
      if (a) {
        popupTime.focus();
      }
    } else {
      document.querySelector(".errorTime").innerHTML = "";
      dataForm["popupTime"] = popupTime.value;
      localStorage.setItem("dataForm", JSON.stringify(dataForm));
    }
    return errorCount;
  }

  function validateName(a) {
    let errorCount = 0;
    let str = popupName.value.toLowerCase().trim();
    popupName.value = str;
    console.log("str", str.length);
    if (!str || str.length <= 3 || str.length > 15 || str.search(/\d/) != -1) {
      document.querySelector(".errorName").innerHTML =
        "Поле должно содержать более одной буквы";
      dataForm["popupName"] = popupName.value;
      localStorage.setItem("dataForm", JSON.stringify(dataForm));
      errorCount++;
      if (a) {
        popupName.focus();
        popupName.value.trim();
      }
    } else if (str.length >= 2) {
      document.querySelector(".errorName").innerHTML = "";
      dataForm["popupName"] = popupName.value;
      localStorage.setItem("dataForm", JSON.stringify(dataForm));
    }
    return errorCount;
  }
  function validateEmail(a) {
    let errorCount = 0;
    let email = popupEmail.value.toLowerCase().trim();
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (
      !email ||
      email.length <= 3 ||
      email.length > 15 ||
      reg.test(email) == false
    ) {
      document.querySelector(".errorEmail").innerHTML =
        "Введите корректную почту";
      dataForm["popupEmail"] = popupEmail.value;
      localStorage.setItem("dataForm", JSON.stringify(dataForm));
      errorCount++;
      if (a) {
        popupEmail.focus();
        popupEmail.value.trim();
      }
    } else {
      document.querySelector(".errorEmail").innerHTML = "";
      dataForm["popupEmail"] = popupEmail.value;
      localStorage.setItem("dataForm", JSON.stringify(dataForm));
    }
    return errorCount;
  }
  function validatePhone(a) {
    console.log("popupPhone", popupPhone);
    let errorCount = 0;
    let phone = popupPhone.value.trim();
    let reg = /^\d[\d\(\)\ -]{4,10}\d$/;

    // let reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (!phone || !reg.test(popupPhone.value)) {
      document.querySelector(
        ".errorPhon"
      ).innerHTML = `Номер: до 10 цифр,(),пробелы или " - "`;
      dataForm["popupPhone"] = popupPhone.value;
      localStorage.setItem("dataForm", JSON.stringify(dataForm));
      errorCount++;
      if (a) {
        popupPhone.focus();
        popupPhone.value.trim();
      }
    } else {
      document.querySelector(".errorPhon").innerHTML = "";
      dataForm["popupPhone"] = popupPhone.value;
      localStorage.setItem("dataForm", JSON.stringify(dataForm));
    }
    return errorCount;
  }

  function formSubmit(e) {
    let errorCount = 0;
    errorCount += validateDate(!errorCount);
    errorCount += validateTime(!errorCount);
    errorCount += validateName(!errorCount);
    errorCount += validateEmail(!errorCount);
    errorCount += validatePhone(!errorCount);
    document.querySelector(".errorSubmit").innerHTML = "Ваш заказ оформлен";
    if (errorCount) {
      e.preventDefault();
      document.querySelector(".errorSubmit").innerHTML = "заполните форму";
      return;
    }
  }
};
getPopupData();
