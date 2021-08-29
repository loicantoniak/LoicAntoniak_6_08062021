export default function modalForm(data) {
  /**
   * DOM Elements
   */
  const modalFormContainer = document.querySelector(".modal_form");
  const btnContact = document.querySelector(".btn-contact");
  const btnClose = document.querySelector(".modal_form-close");
  const photographerName = document.querySelector(".modal_form_photographer_name")

  btnContact.addEventListener("click", openModal);
  btnClose.addEventListener("click", closeModal);
  photographerName.innerHTML = data.name

  // open modal form
  function openModal() {
    modalFormContainer.style.display = "block";
  }

  // close modal form
  function closeModal() {
    modalFormContainer.style.display = "none";
  }

  }

