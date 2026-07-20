"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const isFrench = document.documentElement.lang === "fr";
  const menuToggles = document.querySelectorAll(".checkbox1");

  menuToggles.forEach((toggle) => {
    const label = document.querySelector(`label[for="${toggle.id}"]`);
    const menu = toggle.parentElement?.querySelector(".mobile__menu");

    if (!label || !menu) return;

    label.setAttribute("role", "button");
    label.setAttribute("aria-controls", `${toggle.id}-menu`);
    label.setAttribute("aria-expanded", "false");
    label.setAttribute("aria-label", "Open navigation");
    menu.id = `${toggle.id}-menu`;

    const setMenuState = (isOpen) => {
      label.setAttribute("aria-expanded", String(isOpen));
      label.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
      );
      document.body.classList.toggle("body-menu-active", isOpen);
    };

    toggle.addEventListener("change", () => setMenuState(toggle.checked));

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.checked = false;
        setMenuState(false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.checked) {
        toggle.checked = false;
        setMenuState(false);
        label.focus();
      }
    });
  });

  document
    .querySelector(".header-main .container__main__button")
    ?.addEventListener("click", () => {
      window.location.href = "services.html";
    });

  document.querySelectorAll(".sending__form__left").forEach((formSection) => {
    const form = formSection.querySelector("form");
    const submitButton = formSection.querySelector(".send__button");
    const email = form?.querySelector(".email_block_edit");
    const question = form?.querySelector(".question_block_edit");
    const consent = formSection.querySelector(".custom-checkbox");

    if (!form || !submitButton) return;

    if (email) {
      email.type = "email";
      email.name = "email";
      email.autocomplete = "email";
      email.required = true;
      email.setAttribute("aria-label", isFrench ? "Adresse e-mail" : "Email address");
    }

    if (question) {
      question.name = "question";
      question.required = true;
      question.setAttribute("aria-label", isFrench ? "Votre question" : "Your question");
    }

    submitButton.addEventListener("click", (event) => {
      if (submitButton.form === form) return;

      event.preventDefault();

      if (consent && !consent.checked) {
        consent.setCustomValidity(
          isFrench
            ? "Veuillez accepter la politique de confidentialité."
            : "Please accept the privacy policy.",
        );
        consent.reportValidity();
        return;
      }

      consent?.setCustomValidity("");
      form.requestSubmit();
    });

    consent?.addEventListener("change", () => consent.setCustomValidity(""));
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu-link, .footer-menu-link").forEach((link) => {
    const linkPage = link.getAttribute("href")?.split("/").pop();
    if (linkPage === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
});
