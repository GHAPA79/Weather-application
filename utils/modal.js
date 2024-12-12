const modal = document.getElementById("modal");
const modalText = modal.querySelector("p");
const closeModalButton = modal.querySelector("span");

const showModal = (text) => {
    modalText.innerText = text;
    modal.style.display = "flex";
};

const removeModal = () => {
    modal.style.display = "none";
};

closeModalButton.addEventListener("click", removeModal);

export { showModal };
