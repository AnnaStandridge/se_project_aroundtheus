export function closeModalWithEsc(e) {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

export function closeModalOnRemoteClick(e) {
  if (e.target.classList.contains("modal_opened")) {
    closeModal(e.target);
  }
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", closeModalWithEsc);
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", closeModalWithEsc);
}
