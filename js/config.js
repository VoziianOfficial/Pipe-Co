"use strict";

/*
  Pipe & Co — global site settings
  Change values here once, and they will be injected across all pages.
*/

const SITE_CONFIG = {
    companyName: "Pipe & Co",
    companyId: "PCO-48291",

    phone: "(212) 555-0188",
    phoneHref: "+12125550188",
    phoneButtonText: "Call Now",

    email: "hello@pipeandco.com",
    address: "USA Service Area",

    serviceArea: "United States",

    footerText:
        "Pipe & Co helps homeowners compare local plumbing providers through a simple request-based experience. The platform is designed for quote requests, provider discovery, and clear project matching.",

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalLinks: [
        {
            label: "Privacy Policy",
            href: "privacy-policy.html",
        },
        {
            label: "Cookie Policy",
            href: "cookie-policy.html",
        },
        {
            label: "Terms of Service",
            href: "terms-of-service.html",
        },
    ],

    navLinks: [
        {
            label: "Home",
            href: "index.html",
        },
        {
            label: "Services",
            href: "services.html",
        },
        {
            label: "About",
            href: "about.html",
        },
        {
            label: "Contact",
            href: "contact.html",
        },
    ],

    services: [
        {
            title: "Drain Cleaning",
            href: "drain-cleaning.html",
            shortText:
                "Compare local providers for clogged drains, slow water flow, and routine drain issues.",
            icon: "waves",
            image: "assets/images/services/drain-cleaning.jpg",
        },
        {
            title: "Water Heater Requests",
            href: "water-heater.html",
            shortText:
                "Explore provider options for water heater repair, replacement, and installation requests.",
            icon: "thermometer-sun",
            image: "assets/images/services/water-heater.jpg",
        },
        {
            title: "Leak Detection",
            href: "leak-detection.html",
            shortText:
                "Find local companies that may help evaluate hidden leaks, moisture concerns, and pipe issues.",
            icon: "droplets",
            image: "assets/images/services/leak-detection.jpg",
        },
        {
            title: "Bathroom Plumbing",
            href: "bathroom-plumbing.html",
            shortText:
                "Compare providers for bathroom fixture requests, plumbing updates, and repair categories.",
            icon: "shower-head",
            image: "assets/images/services/bathroom-plumbing.jpg",
        },
        {
            title: "Emergency Plumbing",
            href: "emergency-plumbing.html",
            shortText:
                "Start a request for urgent plumbing categories and check provider availability in your area.",
            icon: "siren",
            image: "assets/images/services/emergency-plumbing.jpg",
        },
        {
            title: "Pipe Repair",
            href: "pipe-repair.html",
            shortText:
                "Review local provider options for damaged pipes, aging lines, and residential pipe concerns.",
            icon: "pipette",
            image: "assets/images/services/pipe-repair.jpg",
        },
    ],

    socialLinks: [
        {
            label: "Instagram",
            href: "#",
            icon: "instagram",
        },
        {
            label: "Facebook",
            href: "#",
            icon: "facebook",
        },
        {
            label: "LinkedIn",
            href: "#",
            icon: "linkedin",
        },
    ],
};

window.SITE_CONFIG = SITE_CONFIG;