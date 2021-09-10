export default function modalForm(data) {
  /**
   * DOM Elements
   */
  const modalFormContainer = document.querySelector(".modal_form");
  const btnContact = document.querySelector(".btn-contact");
  const btnClose = document.querySelector(".modal_form-close");
  const submitBtn = document.querySelector(".btn-submit");
  const form = document.querySelector("#form-contact");
  const formData = document.querySelectorAll(".formData");
  const inputs = form.getElementsByTagName("input");
  const textarea = form.querySelector("textarea");
  const photographerName = document.querySelector(
    ".modal_form_photographer_name"
  );
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const main = document.querySelector(".photographer_content");

  btnContact.addEventListener("click", openModal);
  btnClose.addEventListener("click", closeModal);
  photographerName.innerHTML = data.name;

  document.addEventListener("keydown", function (e) {
    const keyCode = e.keyCode;

    if (
      modalFormContainer.getAttribute("aria-hidden") === "false" &&
      keyCode === 27
    ) {
      closeModal();
    }
  });

  const error = {
    firstName: {
      empty: "Veuillez renseigner votre prénom",
      notValide: "Ce champ doit comporter au minimum 2 caractères valides",
    },
    lastName: {
      empty: "Veuillez renseigner votre nom",
      notValide: "Ce champ doit comporter au minimum 2 caractères valides",
    },
    email: {
      empty: "Veuillez renseigner votre email",
      notValide: "Votre email n'est pas valide",
    },
    message: {
      empty: "Veuillez saisir votre message",
      notValide: "Ce champ doit comporter au minimum 2 caractères",
    },
  };

  // open modal form
  function openModal() {
    modalFormContainer.style.display = "block";
    modalFormContainer.setAttribute("aria-hidden", false);
    modalFormContainer.setAttribute("aria-modal", true);
    main.setAttribute("aria-hidden", true);
    header.setAttribute("aria-hidden", true);
    body.classList.add("no-scroll");
  }

  // close modal form
  function closeModal() {
    modalFormContainer.style.display = "none";
    modalFormContainer.setAttribute("aria-hidden", true);
    modalFormContainer.setAttribute("aria-modal", false);
    main.setAttribute("aria-hidden", false);
    header.setAttribute("aria-hidden", false);
    body.classList.remove("no-scroll");
  }

  const showDataError = (input, condition, error) => {
    if (condition) {
      input.parentElement.setAttribute("data-error", error);
      input.setAttribute("aria-invalid", true);
    } else {
      input.parentElement.removeAttribute("data-error");
      input.setAttribute("aria-invalid", false);
    }
  };

  // Check if input is empty
  const checkInputIsEmpty = (input, error) => {
    const value = input.value;
    showDataError(input, value === "", error);
  };

  // Check if input is valid
  const validInput = (input, error) => {
    // Create RegExp for diff validation
    const emailRegExp = new RegExp(
      "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
      "g"
    );
    const textRegExp = new RegExp(/^(?=.{2,50}$)[A-zÀ-ú]+(?:['-][A-zÀ-ú]+)*$/);
    // Test Input
    let regExpInput;
    const type = input.type;
    const id = input.id;

    if (type === "email") regExpInput = emailRegExp;
    if (type === "text") regExpInput = textRegExp;
    if (id === "message") regExpInput = textRegExp;

    const testInput = regExpInput.test(input.value);

    showDataError(input, !testInput, error);
  };

  const inputValidation = () => {
    for (let i = 0; i < inputs.length; i++) {
      const name = inputs[i].name;
      const notEmpty = inputs[i].value !== "";

      if (inputs[i].type === "submit") return;
      else {
        checkInputIsEmpty(inputs[i], error[name].empty);
        notEmpty && validInput(inputs[i], error[name].notValide);
      }
    }
  };

  const textareaValidation = () => {
    checkInputIsEmpty(textarea, error.message.empty);
    const notEmpty = textarea.value !== "";
    notEmpty && validInput(textarea, error.message.notValide);
  };

  /**
   * Check if form is valid before submitting
   */
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    inputValidation();
    textareaValidation();
    const allFormData = [...formData];
    const dataError = (formdata) => formdata.getAttribute("data-error");
    // True if an error exist
    const checkIfOneErrorExist = allFormData.some(dataError);

    if (!checkIfOneErrorExist) {
      modalFormContainer.style.display = "none";

      for (let input of inputs) {
        if (input.type !== "submit") console.log(input.value);
      }
      console.log(textarea.value);

      form.reset();
    }
  });
}
