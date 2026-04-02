  // Toggle support dropdown and rotation
  const supportBtn = document.querySelector('.navbar-left .dropbtn');
  const dropdownContent = document.querySelector('.navbar-left .dropdown-content');
  const dropdownIcon = document.querySelector('.dropdown-icon');

  supportBtn.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
    dropdownIcon.classList.toggle('rotated');
    supportBtn.classList.toggle('active'); // underline effect
  });

  // Close dropdown if clicked outside
  window.addEventListener('click', e => {
    if (!supportBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
      dropdownContent.classList.remove('show');
      dropdownIcon.classList.remove('rotated');
      supportBtn.classList.remove('active');
    }
  });











// Currency dropdown logic
const currencyBtn = document.getElementById("currencyBtn");
const currencyList = document.getElementById("currencyList");

// Helper: generate safe flag URL
function getFlagUrl(country) {
  // Use ISO2 code if available
  const code = country.cca2?.toLowerCase();
  if (code) return `https://flagcdn.com/w20/${code}.png`;
  // fallback for missing code
  return "https://flagcdn.com/w20/un.png";
}

// Fetch all countries
async function loadCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,currencies,cca2"
    );
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Countries API failed:", data);
      return;
    }

    console.log("Total countries received:", data.length); // debug

    // sort alphabetically
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));

    currencyList.innerHTML = "";

    data.forEach((country) => {
      // safety checks
      if (!country.name || !country.currencies) return;

      const currencyKeys = Object.keys(country.currencies);
      if (currencyKeys.length === 0) return;

      const currencyCode = currencyKeys[0];
      const currency = country.currencies[currencyCode];
      const symbol = currency.symbol || currencyCode;

      const flagUrl = getFlagUrl(country);

      const item = document.createElement("a");
      item.href = "#";

      item.innerHTML = `
        <img src="${flagUrl}" class="flag" onerror="this.src='https://flagcdn.com/w20/un.png'">
        ${country.name.common} | ${currencyCode} ${symbol}
      `;

      item.addEventListener("click", (e) => {
        e.preventDefault();

        currencyBtn.innerHTML = `
          <img src="${flagUrl}" class="flag" onerror="this.src='https://flagcdn.com/w20/un.png'">
          ${country.name.common} | ${currencyCode} ${symbol}
          <img src="images/svg/vector.svg" class="dropdown-icon rotated" alt="">
        `;

        currencyList.classList.remove("show");
      });

      currencyList.appendChild(item);
    });
  } catch (err) {
    console.error("Failed to load countries:", err);
  }
}

// Detect user location
async function detectUserCurrency() {
  try {
    const res = await fetch("https://ipwho.is/");
    const data = await res.json();

    if (!data.success) throw new Error("Location API failed");

    const countryCode = data.country_code.toLowerCase();

    const res2 = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,flags,currencies,cca2`
    );
    const country = await res2.json();

    const c = country;

    if (!c || !c.currencies) throw new Error("Invalid country data");

    const currencyCode = Object.keys(c.currencies)[0];
    const currency = c.currencies[currencyCode];

    const flagUrl = getFlagUrl(c);

    currencyBtn.innerHTML = `
      <img src="${flagUrl}" class="flag" onerror="this.src='https://flagcdn.com/w20/un.png'">
      ${c.name.common} | ${currencyCode} ${currency.symbol || currencyCode}
      <img src="images/svg/vector.svg" class="dropdown-icon" alt="">
    `;
  } catch (err) {
    console.error("Location failed:", err);

    // fallback
    currencyBtn.innerHTML = `
      <img src="https://flagcdn.com/w20/ph.png" class="flag">
      Philippines | PHP ₱
      <img src="images/svg/vector.svg" class="dropdown-icon" alt="">
    `;
  }
}

// Toggle dropdown
currencyBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  currencyList.classList.toggle("show");

  const icon = currencyBtn.querySelector(".dropdown-icon");
  if (icon) icon.classList.toggle("rotated");
});

// Close when clicking outside
window.addEventListener("click", () => {
  currencyList.classList.remove("show");

  const icon = currencyBtn.querySelector(".dropdown-icon");
  if (icon) icon.classList.remove("rotated");
});

// init
loadCountries();
detectUserCurrency();









// ---------- Carousel JS ----------
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const thumbs = Array.from(document.querySelectorAll('.thumb'));
const thumbnails = document.querySelector('.thumbnails');

const thumbPrev = document.getElementById('thumbPrev');
const thumbNext = document.getElementById('thumbNext');
const visibleCount = 5;
let startIndex = 0;

// Track current slide
let currentIndex = 0;

// ---------- Function to update main image ----------
function goToSlide(index) {
  if (index < 0) index = 0;
  if (index >= slides.length) index = slides.length - 1;
  currentIndex = index;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update thumbnails active
  thumbs.forEach(t => t.classList.remove('active'));
  thumbs[currentIndex].classList.add('active');

  // Auto scroll thumbnails
  if (currentIndex < startIndex) {
    startIndex = currentIndex;
    updateThumbnails();
  } else if (currentIndex >= startIndex + visibleCount) {
    startIndex = currentIndex - visibleCount + 1;
    updateThumbnails();
  }
}

// ---------- Thumbnail click ----------
thumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => goToSlide(i));
});

// ---------- Thumbnail navigation ----------
function updateThumbnails() {
  const thumbWidth = 90;
  const gap = 5;
  thumbnails.style.transform = `translateX(-${startIndex * (thumbWidth + gap)}px)`;
}

thumbNext.addEventListener('click', () => {
  if (startIndex + visibleCount < thumbs.length) {
    startIndex += visibleCount - 1;
    if (startIndex + visibleCount > thumbs.length) startIndex = thumbs.length - visibleCount;
    updateThumbnails();
  }
});

thumbPrev.addEventListener('click', () => {
  if (startIndex > 0) {
    startIndex -= visibleCount - 1;
    if (startIndex < 0) startIndex = 0;
    updateThumbnails();
  }
});