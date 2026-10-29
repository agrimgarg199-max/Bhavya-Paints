const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const palettes = {
  mitti: {
    name: "Mitti & marigold",
    colors: [
      { name: "Terracotta", hex: "#c76d4b" },
      { name: "Marigold", hex: "#efbd4c" },
      { name: "Chai cream", hex: "#f0e2c7" },
      { name: "Olive leaf", hex: "#7c8260" },
    ],
  },
  bagicha: {
    name: "A little bagicha",
    colors: [
      { name: "Mango leaf", hex: "#567354" },
      { name: "Guava", hex: "#a9b58c" },
      { name: "Jasmine", hex: "#f0ead9" },
      { name: "Jamun", hex: "#68536c" },
    ],
  },
  gulabi: {
    name: "Gulabi skies",
    colors: [
      { name: "Gulabi", hex: "#dc8b91" },
      { name: "Dusk", hex: "#86758f" },
      { name: "Cloud", hex: "#eee6dc" },
      { name: "Peach chai", hex: "#e6a478" },
    ],
  },
};

const moodButtons = document.querySelectorAll(".mood-button");
const paletteName = document.querySelector(".palette-name");
const paletteNumber = document.querySelector(".palette-number");
const paletteAsk = document.querySelector(".palette-ask");
const surpriseButton = document.querySelector(".surprise-button");

function showPalette(key) {
  const palette = palettes[key];
  if (!palette || !paletteName || !paletteNumber || !paletteAsk) return;

  paletteName.textContent = palette.name;
  paletteNumber.textContent = `${String(Object.keys(palettes).indexOf(key) + 1).padStart(2, "0")} — 03`;
  paletteAsk.href = `mailto:bhavyapaints0@gmail.com?subject=${encodeURIComponent(`${palette.name} colours`)}`;

  document.querySelectorAll(".palette-swatch").forEach((swatch, index) => {
    const color = palette.colors[index];
    if (!color) return;

    const chip = swatch.querySelector("span");
    const label = swatch.querySelector("b");
    if (!chip || !label) return;
    swatch.style.setProperty("--swatch-color", color.hex);
    label.textContent = color.name;
  });

  moodButtons.forEach((button) => {
    const isActive = button.dataset.palette === key;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.palette;
    if (key) showPalette(key);
  });
});

if (surpriseButton) {
  surpriseButton.addEventListener("click", () => {
    const choices = Object.keys(palettes);
    const activeKey = document.querySelector(".mood-button.is-active")?.dataset.palette;
    const options = choices.filter((key) => key !== activeKey);
    const nextKey = options[Math.floor(Math.random() * options.length)];
    if (nextKey) showPalette(nextKey);
  });
}

showPalette("mitti");
