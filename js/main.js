"use strict";

/*
  Pipe & Co — shared global behavior
  This file works on every page.
*/

document.addEventListener("DOMContentLoaded", () => {
    initConfigInjection();
    initHeader();
    initMobileMenu();
    initFaqAccordions();
    initCookieBanner();
    initForms();
    initLibraries();
});

/* ================================
   CONFIG INJECTION
================================ */

function getConfig() {
    return window.SITE_CONFIG || {};
}

function initConfigInjection() {
    const config = getConfig();

    if (!config.companyName) return;

    injectText("[data-company-name]", config.companyName);
    injectText("[data-company-id]", config.companyId);
    injectText("[data-company-address]", config.address);
    injectText("[data-company-email]", config.email);
    injectText("[data-company-phone]", config.phone);
    injectText("[data-footer-text]", config.footerText);
    injectText("[data-disclaimer]", config.disclaimer);
    injectText("[data-service-area]", config.serviceArea);

    injectPhoneLinks(config);
    injectEmailLinks(config);
    injectCurrentYear();
    injectFooterLinks(config);
    injectServiceLinks(config);
    injectSocialLinks(config);
}

function injectText(selector, value) {
    if (!value) return;

    document.querySelectorAll(selector).forEach((element) => {
        element.textContent = value;
    });
}

function injectPhoneLinks(config) {
    const phoneLinks = document.querySelectorAll("[data-phone-link]");
    const phoneHref = formatTelHref(config.phoneHref || config.phone);

    phoneLinks.forEach((link) => {
        link.setAttribute("href", phoneHref);
        link.setAttribute("aria-label", `Call ${config.companyName}`);

        const mode = link.dataset.phoneLink;

        if (mode === "text") {
            link.textContent = config.phone;
        }

        if (mode === "button") {
            const label = link.dataset.phoneLabel || config.phoneButtonText || config.phone;
            const icon = link.querySelector("i, svg");
            link.textContent = label;

            if (icon) {
                link.appendChild(icon);
            }
        }
    });
}

function injectEmailLinks(config) {
    if (!config.email) return;

    document.querySelectorAll("[data-email-link]").forEach((link) => {
        link.setAttribute("href", `mailto:${config.email}`);

        if (link.dataset.emailLink === "text") {
            link.textContent = config.email;
        }
    });
}

function injectCurrentYear() {
    const year = new Date().getFullYear();

    document.querySelectorAll("[data-current-year]").forEach((element) => {
        element.textContent = year;
    });
}

function injectFooterLinks(config) {
    const navContainer = document.querySelector("[data-footer-nav]");
    const legalContainer = document.querySelector("[data-footer-legal]");

    if (navContainer && Array.isArray(config.navLinks)) {
        navContainer.innerHTML = config.navLinks
            .map(
                (link) => `
          <li>
            <a href="${link.href}">${link.label}</a>
          </li>
        `
            )
            .join("");
    }

    if (legalContainer && Array.isArray(config.legalLinks)) {
        legalContainer.innerHTML = config.legalLinks
            .map(
                (link) => `
          <li>
            <a href="${link.href}">${link.label}</a>
          </li>
        `
            )
            .join("");
    }
}

function injectServiceLinks(config) {
    const mobileContainer = document.querySelector("[data-mobile-services]");
    const footerContainer = document.querySelector("[data-footer-services]");
    const tickerContainers = document.querySelectorAll("[data-service-ticker]");

    if (!Array.isArray(config.services)) return;

    if (mobileContainer) {
        mobileContainer.innerHTML = config.services
            .map(
                (service) => `
          <a class="mobile-service-link" href="${service.href}">
            <span class="mobile-service-icon">
              <i data-lucide="${service.icon}"></i>
            </span>
            <span>
              <strong>${service.title}</strong>
              <span>${service.shortText}</span>
            </span>
          </a>
        `
            )
            .join("");
    }

    if (footerContainer) {
        footerContainer.innerHTML = config.services
            .map(
                (service) => `
          <li>
            <a href="${service.href}">${service.title}</a>
          </li>
        `
            )
            .join("");
    }

    if (tickerContainers.length) {
        const tickerItems = [...config.services, ...config.services]
            .map(
                (service) => `
          <a class="service-ticker-link" href="${service.href}">
            <span>
              <i data-lucide="${service.icon}"></i>
            </span>
            ${service.title}
          </a>
        `
            )
            .join("");

        tickerContainers.forEach((container) => {
            container.innerHTML = tickerItems;
        });
    }
}

function injectSocialLinks(config) {
    const container = document.querySelector("[data-footer-socials]");

    if (!container || !Array.isArray(config.socialLinks)) return;

    container.innerHTML = config.socialLinks
        .map(
            (social) => `
        <a href="${social.href}" aria-label="${social.label}">
          <i data-lucide="${social.icon}"></i>
        </a>
      `
        )
        .join("");
}

function formatTelHref(value) {
    if (!value) return "#";

    const cleaned = String(value).replace(/[^\d+]/g, "");

    return `tel:${cleaned}`;
}

/* ================================
   HEADER
================================ */

function initHeader() {
    const header = document.querySelector(".site-header");

    if (!header) return;

    const updateHeaderState = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    updateHeaderState();

    window.addEventListener("scroll", updateHeaderState, {
        passive: true,
    });

    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".nav-link, .mobile-nav-link, .footer-links a");

    links.forEach((link) => {
        const href = link.getAttribute("href");

        if (!href) return;

        if (href === currentPath) {
            link.classList.add("is-active");
            link.setAttribute("aria-current", "page");
        }
    });
}

/* ================================
   MOBILE MENU
================================ */

function initMobileMenu() {
    const toggle = document.querySelector("[data-mobile-menu-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    const serviceButton = document.querySelector("[data-mobile-services-toggle]");
    const serviceList = document.querySelector("[data-mobile-services]");
    const focusableSelectors =
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    if (!toggle || !menu) return;

    const openMenu = () => {
        toggle.classList.add("is-open");
        menu.classList.add("is-open");
        document.body.classList.add("no-scroll");
        toggle.setAttribute("aria-expanded", "true");
        menu.setAttribute("aria-hidden", "false");

        const firstFocusable = menu.querySelector(focusableSelectors);
        if (firstFocusable) firstFocusable.focus();
    };

    const closeMenu = () => {
        toggle.classList.remove("is-open");
        menu.classList.remove("is-open");
        document.body.classList.remove("no-scroll");
        toggle.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
        toggle.focus();
    };

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu.classList.contains("is-open")) {
            closeMenu();
        }
    });

    menu.addEventListener("click", (event) => {
        const clickedLink = event.target.closest("a");

        if (clickedLink) {
            closeMenu();
        }
    });

    trapFocus(menu, toggle, focusableSelectors);

    if (serviceButton && serviceList) {
        serviceButton.addEventListener("click", () => {
            const isOpen = serviceList.classList.toggle("is-open");

            serviceButton.classList.toggle("is-open", isOpen);
            serviceButton.setAttribute("aria-expanded", String(isOpen));
        });
    }
}

function trapFocus(container, trigger, selectors) {
    document.addEventListener("keydown", (event) => {
        if (event.key !== "Tab") return;
        if (!container.classList.contains("is-open")) return;

        const focusableElements = Array.from(container.querySelectorAll(selectors));

        if (!focusableElements.length) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        }

        if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }

        if (!container.contains(document.activeElement)) {
            event.preventDefault();
            trigger.focus();
        }
    });
}

/* ================================
   FAQ
================================ */

function initFaqAccordions() {
    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length) return;

    faqItems.forEach((item, index) => {
        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!button || !answer) return;

        const answerId = answer.id || `faq-answer-${index + 1}`;

        answer.id = answerId;
        button.setAttribute("aria-controls", answerId);
        button.setAttribute("aria-expanded", "false");

        button.addEventListener("click", () => {
            const isOpen = item.classList.contains("is-open");

            faqItems.forEach((otherItem) => {
                const otherButton = otherItem.querySelector(".faq-question");
                const otherAnswer = otherItem.querySelector(".faq-answer");

                otherItem.classList.remove("is-open");

                if (otherButton) otherButton.setAttribute("aria-expanded", "false");
                if (otherAnswer) otherAnswer.style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add("is-open");
                button.setAttribute("aria-expanded", "true");
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }
        });
    });
}

/* ================================
   COOKIE BANNER
================================ */

function initCookieBanner() {
    const banner = document.querySelector("[data-cookie-banner]");
    const acceptButton = document.querySelector("[data-cookie-accept]");
    const declineButton = document.querySelector("[data-cookie-decline]");
    const storageKey = "pipeCoCookieChoice";

    if (!banner || !acceptButton || !declineButton) return;

    const savedChoice = localStorage.getItem(storageKey);

    if (!savedChoice) {
        banner.classList.add("is-visible");
        banner.setAttribute("aria-hidden", "false");
    } else {
        banner.classList.remove("is-visible");
        banner.setAttribute("aria-hidden", "true");
    }

    const saveChoice = (choice) => {
        localStorage.setItem(storageKey, choice);
        banner.classList.remove("is-visible");
        banner.setAttribute("aria-hidden", "true");
    };

    acceptButton.addEventListener("click", () => saveChoice("accepted"));
    declineButton.addEventListener("click", () => saveChoice("declined"));
}

/* ================================
   FORMS
================================ */

function initForms() {
    const forms = document.querySelectorAll("[data-request-form]");

    forms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const message = form.querySelector("[data-form-message]");
            const requiredFields = Array.from(form.querySelectorAll("[required]"));

            const hasEmptyFields = requiredFields.some((field) => {
                const isCheckbox = field.type === "checkbox";

                if (isCheckbox) {
                    return !field.checked;
                }

                return !field.value.trim();
            });

            if (hasEmptyFields) {
                showFormMessage(
                    message,
                    "Please complete the required fields before submitting your request.",
                    "error"
                );
                markInvalidFields(requiredFields);
                return;
            }

            showFormMessage(
                message,
                "Thanks — your request is ready. In a live setup, this form would send the details to the matching system.",
                "success"
            );

            form.reset();

            requiredFields.forEach((field) => {
                field.removeAttribute("aria-invalid");
            });
        });
    });
}

function markInvalidFields(fields) {
    fields.forEach((field) => {
        const isInvalid =
            field.type === "checkbox" ? !field.checked : !field.value.trim();

        if (isInvalid) {
            field.setAttribute("aria-invalid", "true");
        } else {
            field.removeAttribute("aria-invalid");
        }

        field.addEventListener(
            "input",
            () => {
                field.removeAttribute("aria-invalid");
            },
            { once: true }
        );

        field.addEventListener(
            "change",
            () => {
                field.removeAttribute("aria-invalid");
            },
            { once: true }
        );
    });
}

function showFormMessage(element, text, type) {
    if (!element) return;

    element.textContent = text;
    element.className = `form-message form-message--${type}`;
}

/* ================================
   LIBRARIES
================================ */

function initLibraries() {
    initLucideIcons();
    initAos();
    initGsapSharedAnimations();
}

function initLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

function initAos() {
    if (window.AOS && typeof window.AOS.init === "function") {
        window.AOS.init({
            duration: 760,
            easing: "ease-out-cubic",
            once: true,
            offset: 90,
        });
    }
}

function initGsapSharedAnimations() {
    if (!window.gsap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const revealItems = document.querySelectorAll("[data-reveal]");

    revealItems.forEach((item) => {
        window.gsap.fromTo(
            item,
            {
                y: 26,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: window.ScrollTrigger
                    ? {
                        trigger: item,
                        start: "top 86%",
                    }
                    : undefined,
            }
        );
    });

    const floatItems = document.querySelectorAll("[data-float]");

    floatItems.forEach((item, index) => {
        window.gsap.to(item, {
            y: index % 2 === 0 ? -12 : 12,
            duration: 2.8 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    });
}