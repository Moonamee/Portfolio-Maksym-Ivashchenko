document.addEventListener("DOMContentLoaded", function() {
  const isFirstVisit = sessionStorage.getItem("isFirstVisit");
  const welcomePage = document.getElementById("welcome-page");
  const loadingScreen = document.getElementById("loading-screen");

  function hideLoadingScreen() {
    loadingScreen.style.transition = "opacity 1s";
    loadingScreen.style.opacity = 0;

    setTimeout(function() {
      loadingScreen.style.display = "none";
      welcomePage.style.display = "block";
    }, 1000);
  }

  if (!isFirstVisit) {
    loadingScreen.style.display = "flex";
    welcomePage.style.display = "none";
  }
  
  window.addEventListener("load", function() {
    hideLoadingScreen();

    sessionStorage.setItem("isFirstVisit", true);
  });

  const languageLinks = document.querySelectorAll(".language-container a");
  languageLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
      sessionStorage.setItem("isFirstVisit", true);
    });
  });
});

// Swiper
const swiper = new Swiper(".mySwiper", {
  allowTouchMove: false,
  speed: 800,
  direction: "vertical",
});

// Button download cv
// EN
function downloadFile() {
  const url = "./doc/Resume%20Maksym%20Ivashchenko.pdf";
  const filename = "Resume Maksym Ivashchenko.pdf";
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  if (typeof link.download === "undefined") {
    link.target = "_blank";
  }
  link.click();
}
// UA
function downloadFileUa() {
  const url = "./doc/Resume%20Maksym%20Ivashchenko_ua.pdf";
  const filename = "Resume Maksym Ivashchenko_ua.pdf";
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  if (typeof link.download === "undefined") {
    link.target = "_blank";
  }
  link.click();
}

// Keyboard UP/DOWN Page Slide
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    swiper.slidePrev();
    setActiveLink(links[swiper.activeIndex].id);
    showCorrespondingText(links[swiper.activeIndex].id);
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    swiper.slideNext();
    setActiveLink(links[swiper.activeIndex].id);
    showCorrespondingText(links[swiper.activeIndex].id);
  }
});

const links = [
  { id: "homeLink", slide: 0 },
  { id: "aboutLink", slide: 1 },
  { id: "projectLink", slide: 2 },
  { id: "resumeLink", slide: 3 },
  { id: "contactLink", slide: 4 },
];

links.forEach((link) => {
  const element = document.getElementById(link.id);
  element.addEventListener("click", (e) => {
    e.preventDefault();
    swiper.slideTo(link.slide);
    setActiveLink(link.id);
    showCorrespondingText(link.id);
  });
});

function setActiveLink(linkId) {
  const activeLink = document.querySelector(".header-nav__link.active");
  if (activeLink) {
    activeLink.classList.remove("active");
  }
  const link = document.getElementById(linkId);
  link.parentNode.classList.add("active");
}

// Head logo slide change
const portFolioMe = document.getElementById("portFolioMe");
const aboutMe = document.getElementById("aboutMe");
const projectMe = document.getElementById("projectMe");
const resuMe = document.getElementById("resuMe");
const contactMe = document.getElementById("contactMe");
const spans = [portFolioMe, aboutMe, projectMe, resuMe, contactMe];

function showCorrespondingText(linkId) {
  spans.forEach((span) => {
    span.classList.remove("fade-in");
    span.classList.add("fade-out");
    span.style.pointerEvents = "none";
  });

  setTimeout(() => {
    portFolioMe.style.display = linkId === "homeLink" ? "block" : "none";
    aboutMe.style.display = linkId === "aboutLink" ? "block" : "none";
    projectMe.style.display = linkId === "projectLink" ? "block" : "none";
    resuMe.style.display = linkId === "resumeLink" ? "block" : "none";
    contactMe.style.display = linkId === "contactLink" ? "block" : "none";

    spans.forEach((span) => {
      span.classList.remove("fade-out");
      span.classList.add("fade-in");
      span.style.pointerEvents = "auto";
    });
  }, 500);
}



// About Read more swipe to Resume
const readMore = document.getElementById("aboutReadMore");

readMore.addEventListener("click", function () {
  const resumeLink = links.find((link) => link.id === "resumeLink");
  swiper.slideTo(resumeLink.slide);
  setActiveLink(resumeLink.id);
});
// Swiper -----

// Splide -----
const splide = new Splide(".splide");
splide.mount();
// Splide -----

// Dark mode change -----
const themeMode = document.querySelector(".theme-mode");
const img = themeMode.querySelector("img");
let savedTheme = localStorage.getItem("theme");
if (!savedTheme) {
  savedTheme = "light";
}
document.body.classList.add(savedTheme);
if (savedTheme === "dark") {
  img.src = "./img/header/theme_dark_moon.svg";
  document.body.style.backgroundColor = "#121212";
} else {
  img.src = "./img/header/theme_light__sun.svg";
  document.body.style.backgroundColor = "";
}
themeMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    img.src = "./img/header/theme_dark_moon.svg";
    document.body.style.backgroundColor = "#121212";
    savedTheme = "dark";
  } else {
    img.src = "./img/header/theme_light__sun.svg";
    document.body.style.backgroundColor = "";
    savedTheme = "light";
  }
  localStorage.setItem("theme", savedTheme);
});
// Dark mode change -----

// Language open/close -----
function toggleOptions() {
  const options = document.querySelector(".options");
  const isOptionsOpen = options.classList.contains("open");
  if (!isOptionsOpen) {
    options.classList.add("open");
    document.addEventListener("click", handleOutsideClick);
  } else {
    options.classList.remove("open");
    document.removeEventListener("click", handleOutsideClick);
  }
}
function handleOptionClick(lang) {
  const selectedOption = document.querySelector(".selected-option");
  selectedOption.innerText = lang;
  toggleOptions();
}
function handleOutsideClick(event) {
  const options = document.querySelector(".options");
  const target = event.target;
  const isOutsideClick =
    !options.contains(target) && !target.classList.contains("selected-option");
  if (isOutsideClick) {
    options.classList.remove("open");
    document.removeEventListener("click", handleOutsideClick);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const options = document.querySelector(".options");
  options.classList.remove("open");
});
// Language open/close -----

// POPUP PROJECT
const viewButtons = [
  document.getElementById("view-slide1"),
  document.getElementById("view-slide2"),
  document.getElementById("view-slide3"),
  document.getElementById("view-slide4"),
  document.getElementById("view-slide5"),
];
const popupSlides = [
  document.getElementById("popup-slide1"),
  document.getElementById("popup-slide2"),
  document.getElementById("popup-slide3"),
  document.getElementById("popup-slide4"),
  document.getElementById("popup-slide5"),
];
const closeButtons = [
  document.getElementById("close-slide1"),
  document.getElementById("close-slide2"),
  document.getElementById("close-slide3"),
  document.getElementById("close-slide4"),
  document.getElementById("close-slide5"),
];
const arrowContainer = document.querySelector(".splide__arrows");

viewButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    popupSlides[index].style.display = "flex";
    arrowContainer.style.display = "none";
  });
});

closeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    popupSlides[index].style.display = "none";
    arrowContainer.style.display = "flex";
  });
});

// Popup Resize Mobile
const devices = [
  {
    button: document.querySelector(".bx-devices"),
    popupContent: document.querySelector(".popup-content"),
  },
  {
    button: document.querySelector(".devices2"),
    popupContent: document.querySelector(".popup-content2"),
  },
  {
    button: document.querySelector(".devices3"),
    popupContent: document.querySelector(".popup-content3"),
  },
  {
    button: document.querySelector(".devices4"),
    popupContent: document.querySelector(".popup-content4"),
  },
  {
    button: document.querySelector(".devices5"),
    popupContent: document.querySelector(".popup-content5"),
  },
];

devices.forEach((device) => {
  let isExpanded = false;

  device.button.addEventListener("click", () => {
    if (isExpanded) {
      device.popupContent.style.width = "100%";
      isExpanded = false;
    } else {
      device.popupContent.style.width = "420px";
      isExpanded = true;
    }
  });

  device.popupContent.style.transition = "width 0.6s ease";
});

// Read more Aperture
const readMoreButton = document.getElementById("readMoreButton");
const popupReadMore = document.getElementById("popupReadMore");
const closeReadMore = document.getElementById("closeReadMore");
let isPopupVisible = false;
readMoreButton.addEventListener("click", function () {
  if (!isPopupVisible) {
    popupReadMore.classList.add("show");
    isPopupVisible = true;
  }
});
closeReadMore.addEventListener("click", function () {
  if (isPopupVisible) {
    popupReadMore.classList.add("hide");
    isPopupVisible = false;
    setTimeout(function () {
      popupReadMore.classList.remove("show");
      popupReadMore.classList.remove("hide");
    }, 500);
  }
});

// Read more Bright Light
const readMoreButtonNext = document.getElementById("readMoreButtonNext");
const popupReadMoreNext = document.getElementById("popupReadMoreNext");
const closeReadMoreNext = document.getElementById("closeReadMoreNext");
let isPopupVisibleNext = false;

readMoreButtonNext.addEventListener("click", function () {
  if (!isPopupVisibleNext) {
    popupReadMoreNext.classList.add("show");
    isPopupVisibleNext = true;
  }
});

closeReadMoreNext.addEventListener("click", function () {
  if (isPopupVisibleNext) {
    popupReadMoreNext.classList.add("hide");
    isPopupVisibleNext = false;
    setTimeout(function () {
      popupReadMoreNext.classList.remove("show");
      popupReadMoreNext.classList.remove("hide");
    }, 500);
  }
});
// Read more Taster
const readMoreButtonTaster = document.getElementById("readMoreButtonTaster");
const popupReadMoreTaster = document.getElementById("popupReadMoreTaster");
const closeReadMoreTaster = document.getElementById("closeReadMoreTaster");
let isPopupVisibleTaster = false;

readMoreButtonTaster.addEventListener("click", function () {
  if (!isPopupVisibleTaster) {
    popupReadMoreTaster.classList.add("show");
    isPopupVisibleTaster = true;
  }
});

closeReadMoreTaster.addEventListener("click", function () {
  if (isPopupVisibleTaster) {
    popupReadMoreTaster.classList.add("hide");
    isPopupVisibleTaster = false;
    setTimeout(function () {
      popupReadMoreTaster.classList.remove("show");
      popupReadMoreTaster.classList.remove("hide");
    }, 500);
  }
});
// Read more Farmzi
const readMoreButtonFarmzi = document.getElementById("readMoreButtonFarmzi");
const popupReadMoreFarmzi = document.getElementById("popupReadMoreFarmzi");
const closeReadMoreFarmzi = document.getElementById("closeReadMoreFarmzi");
let isPopupVisibleFarmzi = false;

readMoreButtonFarmzi.addEventListener("click", function () {
  if (!isPopupVisibleFarmzi) {
    popupReadMoreFarmzi.classList.add("show");
    isPopupVisibleFarmzi = true;
  }
});

closeReadMoreFarmzi.addEventListener("click", function () {
  if (isPopupVisibleFarmzi) {
    popupReadMoreFarmzi.classList.add("hide");
    isPopupVisibleFarmzi = false;
    setTimeout(function () {
      popupReadMoreFarmzi.classList.remove("show");
      popupReadMoreFarmzi.classList.remove("hide");
    }, 500);
  }
});

// Read more Ozart
const readMoreButtonOzart = document.getElementById("readMoreButtonOzart");
const popupReadMoreOzart = document.getElementById("popupReadMoreOzart");
const closeReadMoreOzart = document.getElementById("closeReadMoreOzart");
let isPopupVisibleOzart = false;

readMoreButtonOzart.addEventListener("click", function () {
  if (!isPopupVisibleOzart) {
    popupReadMoreOzart.classList.add("show");
    isPopupVisibleOzart = true;
  }
});

closeReadMoreOzart.addEventListener("click", function () {
  if (isPopupVisibleOzart) {
    popupReadMoreOzart.classList.add("hide");
    isPopupVisibleOzart = false;
    setTimeout(function () {
      popupReadMoreOzart.classList.remove("show");
      popupReadMoreOzart.classList.remove("hide");
    }, 500);
  }
});
// Read more Player
const readMoreButtonPlayer = document.getElementById("readMoreButtonPlayer");
const popupReadMorePlayer = document.getElementById("popupReadMorePlayer");
const closeReadMorePlayer = document.getElementById("closeReadMorePlayer");
let isPopupVisiblePlayer = false;

readMoreButtonPlayer.addEventListener("click", function () {
  if (!isPopupVisiblePlayer) {
    popupReadMorePlayer.classList.add("show");
    isPopupVisiblePlayer = true;
  }
});

closeReadMorePlayer.addEventListener("click", function () {
  if (isPopupVisiblePlayer) {
    popupReadMorePlayer.classList.add("hide");
    isPopupVisiblePlayer = false;
    setTimeout(function () {
      popupReadMorePlayer.classList.remove("show");
      popupReadMorePlayer.classList.remove("hide");
    }, 500);
  }
});

// Modal interior
function openModal(img) {
  const images = document.querySelectorAll(".grid-item img");
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalImg = document.createElement("img");
  let currentImgIndex = Array.from(images).indexOf(img);
  let nextImgIndex = (currentImgIndex + 1) % images.length;
  modalImg.src = images[currentImgIndex].src;
  modalImg.alt = images[currentImgIndex].alt;
  const modalArrowLeft = document.createElement("div");
  modalArrowLeft.classList.add("modal-arrow", "modal-arrow-left");
  modalArrowLeft.innerHTML = "&#8249;";
  modalArrowLeft.addEventListener("click", function (event) {
    event.stopPropagation();
    currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
    nextImgIndex = (currentImgIndex + 1) % images.length;
    modalImg.classList.add("fade-out");
    setTimeout(function () {
      modalImg.src = images[currentImgIndex].src;
      modalImg.alt = images[currentImgIndex].alt;
      modalImg.classList.remove("fade-out");
    }, 300);
  });
  const modalArrowRight = document.createElement("div");
  modalArrowRight.classList.add("modal-arrow", "modal-arrow-right");
  modalArrowRight.innerHTML = "&#8250;";
  modalArrowRight.addEventListener("click", function (event) {
    event.stopPropagation();
    currentImgIndex = (currentImgIndex + 1) % images.length;
    nextImgIndex = (currentImgIndex + 1) % images.length;
    modalImg.classList.add("fade-out");
    setTimeout(function () {
      modalImg.src = images[currentImgIndex].src;
      modalImg.alt = images[currentImgIndex].alt;
      modalImg.classList.remove("fade-out");
    }, 300);
  });
  modal.appendChild(modalImg);
  modal.appendChild(modalArrowLeft);
  modal.appendChild(modalArrowRight);
  document.body.appendChild(modal);
  modal.addEventListener("click", function () {
    modal.classList.add("fade-out");
    setTimeout(function () {
      document.body.removeChild(modal);
    }, 200);
  });
}

// massage form
function sendEmail(event) {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  if (name && email && message) {
    if (!email.includes("@")) {
      showModal("Please enter a valid email address");
      return;
    }
    var emailAddress = "maxgleroy@gmail.com";
    var subject = "New Message";
    var body =
      "Name: " + name + "%0D%0AEmail: " + email + "%0D%0AMessage: " + message;
    var mailtoLink =
      "mailto:" + emailAddress + "?subject=" + subject + "&body=" + body;
    window.location.href = mailtoLink;
    showModal(
      "Please open your email client and create a new email. Copy and paste the following email address: " +
        emailAddress
    );
  } else {
    showModal("Please fill in all fields");
  }
}

function copyEmail() {
  var emailAddress = "maxgleroy@gmail.com";
  var tempInput = document.createElement("input");
  tempInput.value = emailAddress;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  showModal("Email address copied!");
}

function showModal(message) {
  var modal = document.getElementById("mailModal");
  var modalMessage = document.getElementById("mail-modal-message");
  var closeBtn = document.getElementsByClassName("mail-close")[0];
  modalMessage.textContent = message;
  modal.style.display = "block";
  if (message.includes("Please open your email client")) {
    var copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy email";
    copyBtn.onclick = copyEmail;
    copyBtn.classList.add("copy-email-button");
    modalMessage.appendChild(copyBtn);
  }
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// Whatsapp
var whatsappBtn = document.getElementById("whatsappBtn");
whatsappBtn.addEventListener("click", function () {
  var phoneNumber = "+380666392839";
  var whatsappLink = "https://wa.me/" + phoneNumber;
  window.open(whatsappLink);
});
// Telegram
var telegramBtn = document.getElementById("telegramBtn");
telegramBtn.addEventListener("click", function () {
  var phoneNumber = "+380666392839";
  var telegramLink =
    "https://t.me/share/url?url=" +
    encodeURIComponent("https://t.me/" + phoneNumber);
  window.open(telegramLink);
});
// Insta
var instagramBtn = document.getElementById("instagramBtn");
instagramBtn.addEventListener("click", function () {
  var instagramLink = "https://www.instagram.com/direct/inbox/?hl=ru";
  window.open(instagramLink);
});
// Linkedin
var linkedinBtn = document.getElementById("linkedinBtn");
linkedinBtn.addEventListener("click", function () {
  var linkedinLink = "https://www.linkedin.com/in/max-ivashchenko-7b8337290/";
  window.open(linkedinLink);
});
// Git
var githubBtn = document.getElementById("githubBtn");
githubBtn.addEventListener("click", function () {
  var githubLink = "https://github.com/Moonamee";
  window.open(githubLink);
});
// FB
var facebookBtn = document.getElementById("facebookBtn");
facebookBtn.addEventListener("click", function () {
  var facebookLink = "https://www.facebook.com/profile.php?id=100082964130525";
  window.open(facebookLink);
});
