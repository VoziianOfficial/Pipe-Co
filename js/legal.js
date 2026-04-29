"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initLegalSidebarActiveState();
});

function initLegalSidebarActiveState() {
    const currentPage = window.location.pathname.split("/").pop() || "privacy-policy.html";
    const links = document.querySelectorAll(".legal-sidebar a");

    links.forEach((link) => {
        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("is-active");
            link.setAttribute("aria-current", "page");
        }
    });
}