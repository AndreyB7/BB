// live file
const pricings = document.querySelectorAll(".pricing");
pricings.forEach((pricing) => priceSlider(pricing));
window.onresize = () => pricings.forEach((pricing) => priceSlider(pricing));

function priceSlider(pricingEl) {
  // get data from the page script element
  const pricingTypeEL = pricingEl.querySelector("[data-pricing-type]");

  if (!pricingTypeEL) return;

  // choose data type from 'fixed' or 'ongoing' data-pricing-type
  const pricingData =
    {
      fixed: packageDataFixed,
      ongoing: packageDataOngoing,
    }[pricingTypeEL.dataset.pricingType] || null;

  if (!pricingData) return;

  const priceLevelButtonsWrap = pricingEl.querySelectorAll(
    ".price_level_buttons"
  );

  // button highlight animation
  let buttonHightlight,
    priceLevelButtons = [];

  priceLevelButtonsWrap.forEach((wrapEl) => {
    // if element not hidden by responsive css
    if (wrapEl.offsetHeight !== 0 && wrapEl.offsetWidth !== 0) {
      priceLevelButtons = wrapEl.querySelectorAll(".price_level_button");
      buttonHightlight = wrapEl.querySelector(".button_hightlight");
    }
  });

  // ge element to data display
  const priceDescription = pricingEl.querySelector(".pricing_text");
  const priceHoldrEl = pricingEl.querySelector(".price_title");
  const priceDescriptionListDivElements = pricingEl.querySelectorAll(
    ".pricing_list_item div"
  );

  // breack if something is missing
  if (
    !buttonHightlight ||
    !priceLevelButtons.length === 0 ||
    !priceDescription ||
    !priceHoldrEl ||
    !priceDescriptionListDivElements.length === 0
  ) {
    return;
  }

  priceLevelButtons.forEach((priceLevelButton, idx) => {
    priceLevelButton.addEventListener("click", (e) => {
      e.preventDefault;
      priceButtonClickHandler(priceLevelButton, idx);
    });
  });

  // set initial value
  priceButtonClickHandler(priceLevelButtons[0], 0);

  async function priceButtonClickHandler(buttonEl, elIdx) {
    // move hightlight element
    buttonHightlight.style.top = buttonEl.offsetTop + "px";
    buttonHightlight.style.left = buttonEl.offsetLeft + "px";
    buttonHightlight.style.width = buttonEl.offsetWidth + "px";
    buttonHightlight.style.height = buttonEl.offsetHeight + "px";

    priceLevelButtons.forEach((pb) => pb.classList.remove("active"));
    buttonEl.classList.add("active");

    // fade only elements that will be changed
    const elementsToFadeAnimation = Array.from(
      priceDescriptionListDivElements
    ).filter(
      (el, listIdx) =>
        el.innerText.length !==
          pricingData.descriptions[elIdx][listIdx].lenght &&
        el.innerText !== pricingData.descriptions[elIdx][listIdx]
    );

    const isDescriptionChanged =
      priceDescription.innerText !== pricingData.subtitles[elIdx];

    // fade out all changes
    const fadeOutPromises = [
      fadeOut(priceHoldrEl),
      ...Array.from(elementsToFadeAnimation).map((el) => fadeOut(el)),
    ];

    isDescriptionChanged && fadeOutPromises.push(fadeOut(priceDescription));

    await Promise.all(fadeOutPromises);

    priceDescription.innerText = pricingData.subtitles[elIdx];
    priceHoldrEl.innerText = pricingData.prices[elIdx];
    priceDescriptionListDivElements.forEach((el, listIdx) => {
      el.innerText = pricingData.descriptions[elIdx][listIdx];
    });

    // fade in all changes
    fadeIn(priceHoldrEl);
    isDescriptionChanged && fadeIn(priceDescription);
    elementsToFadeAnimation.forEach((el) => fadeIn(el));
  }
}

function fadeOut(element) {
  return new Promise((resolve) => {
    let opacity = 1;

    let fadeEffect = setInterval(function () {
      if (opacity <= 0) {
        clearInterval(fadeEffect);
        resolve();
      } else {
        opacity -= 0.1;
        element.style.opacity = opacity;
      }
    }, 10);
  });
}

function fadeIn(element) {
  let opacity = 0;

  let fadeEffect = setInterval(function () {
    if (opacity >= 1) {
      clearInterval(fadeEffect);
    } else {
      opacity += 0.1;
      element.style.opacity = opacity;
    }
  }, 10);
}
