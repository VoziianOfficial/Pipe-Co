"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initServicesBoardTilt();
});

function initServicesBoardTilt() {
    const board = document.querySelector(".services-hero-board");

    if (!board) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    board.addEventListener("pointermove", (event) => {
        const rect = board.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        board.style.transform = `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
    });

    board.addEventListener("pointerleave", () => {
        board.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
}