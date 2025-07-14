const mainBlack = "#0d1e24";
const mainWhite = "#e8e4dd";
const pageBackgroundDark = "#414E53";
const mainBlackTransparent = "rgba(13, 30, 36, 0)";
const mainBlackFilled = "rgba(13, 30, 36, 1)";

ScrollTrigger.config({
  invalidateOnRefresh: true,
});

// show hidden elements on animation script loaded
gsap.set("[hide-before-animations-loaded]", { opacity: 1 });
// hide home sections before toDark animation
gsap.set("[hide-before-animation-remove-bg]", {
  opacity: 1,
  background: mainBlackTransparent,
});

// top logo animation
const pageBody = document.querySelector(".body");
const logoTriggerEmableddClass = "logo-scrolltrigger-enabled";
const animatedTopLogo = document.querySelector("svg.top-logo");
const logoGradientColorTransparent = document.querySelector(
  "svg.top-logo #logo-gradient stop:nth-child(1)"
);
const logoGradientColorOrange = document.querySelector(
  "svg.top-logo #logo-gradient stop:nth-child(2)"
);
const logoStarIcon = document.querySelector("svg.top-logo .icon");
if (animatedTopLogo) {
  animateLogo();
}
function animateLogo() {
  const logoTL = gsap.timeline({
    scrollTrigger: {
      toggleActions: "play none none reverse",
      trigger: pageBody,
      start: "200 top",
      toggleClass: {
        targets: animatedTopLogo,
        className: logoTriggerEmableddClass,
      },
    },
  });
  logoTL.to(
    logoStarIcon,
    {
      scale: "1.7",
    },
    "<"
  );
  logoTL.to(
    logoGradientColorOrange,
    {
      attr: {
        offset: "1",
      },
    },
    "<"
  );
  logoTL.to(
    logoGradientColorTransparent,
    {
      attr: {
        offset: ".9",
      },
    },
    "<"
  );
  animatedTopLogo.addEventListener("mouseenter", () => {
    if (animatedTopLogo.classList.contains(logoTriggerEmableddClass)) {
      logoTL.reverse();
    }
    return;
  });
  animatedTopLogo.addEventListener("mouseleave", () => {
    if (animatedTopLogo.classList.contains(logoTriggerEmableddClass)) {
      logoTL.play();
    }
    return;
  });
}
// lotties control
var lottie, animations;
async function animationLoaded(animation) {
  // Return a promise that resolves to true once animation is loaded
  if (animation.isLoaded) {
    return true;
  }
  return new Promise((resolve, reject) => {
    animation.addEventListener("DOMLoaded", () => {
      resolve(true);
    });
  });
}
// Return a promise that resolves to true once all animations are loaded
async function waitForAnimationsLoaded(animations) {
  await Promise.all(animations.map(animationLoaded));
}
async function initAnimations() {
  lottie = Webflow.require("lottie").lottie;
  animations = lottie.getRegisteredAnimations();
  await waitForAnimationsLoaded(animations);
}

var Webflow = Webflow || [];

Webflow.push(() => {
  initAnimations()
    .then(() => {
      // console.log("Initialized animations");
      // do the stuff with animations array
      // handleLottieAnimations(animations);
      handleScrollSliderWithLottieAnimations(animations);
    })
    .catch((error) => {
      console.error(error);
    });
});

const handleLottieAnimations = (animations) => {
  animations.forEach((animation) => {
    animation.stop();
    ScrollTrigger.create({
      trigger: animation.wrapper,
      start: "top 50%",
      end: "bottom top",
      onEnter: () => animation.play(),
      onLeave: () => animation.pause(),
      onEnterBack: () => animation.play(),
      onLeaveBack: () => animation.pause(),
    });
  });
};

// heading group short
const headingGroupsShort = gsap.utils.toArray("[animated-heading-group]");
headingGroupsShort.forEach((headingGroup) => {
  const headingGroupsShortTL = gsap.timeline({
    scrollTrigger: {
      toggleActions: "play none none reverse",
      trigger: headingGroup,
      start: "top 70%",
    },
  });
  animateHeadingGroup(headingGroupsShortTL, headingGroup, {
    duration: 0.4,
    stagger: 0.06,
  });
});

// heading groups long
const headingGroupsLong = gsap.utils.toArray("[animated-heading-group-long]");
headingGroupsLong.forEach((headingGroup) => {
  const headingGroupsLongTL = gsap.timeline({
    scrollTrigger: {
      toggleActions: "play none none reverse",
      trigger: headingGroup,
      start: "top 70%",
    },
  });
  animateHeadingGroup(headingGroupsLongTL, headingGroup, {
    duration: 0.25,
    stagger: 0.04,
  });
});

// hero-light first comet
gsap.from(".hero_comet", {
  y: "-15%",
  delay: 0.5,
  duration: 1,
  scrollTrigger: {
    toggleActions: "play none none reverse",
    trigger: ".hero_light",
    start: "top center",
  },
  repeat: -1,
  yoyo: true,
  ease: "none",
});
gsap.from(".hero_comet svg .glow", {
  r: 0,
  delay: 0.5,
  duration: 2,
  ease: "none",
});

// show full size of the top planet before toDark animation
const heroCircleWrap = document.querySelector(".hero_circle_wrap");
const heroCircle = document.querySelector(".hero_circle_v3");
// to dark animations
const toDark = gsap.timeline({
  scrollTrigger: {
    toggleActions: "play none none reverse",
    trigger: heroCircleWrap,
    start: "top 50%",
  },
});
const darkHeroCircleGradient =
  "radial-gradient(30% 30% at 50% -15%, #2F4046 0%, #0D1E24 77%)";
toDark.to(
  heroCircle,
  {
    top: "10%",
    background: darkHeroCircleGradient,
    duration: 1,
    onStart: function () {
      heroCircleWrap?.classList.add("dark");
    },
    onReverseComplete: function () {
      heroCircleWrap?.classList.remove("dark");
    },
  },
  "<"
);
toDark.to(
  ".page_wrap",
  {
    backgroundColor: mainBlack, // pageBackgroundDark - in case we need visible grid
    color: "#fff",
    duration: 1,
  },
  "<"
);
toDark.to(
  ".mouse-blur",
  {
    boxShadow: "0 0 150px 150px rgb(13, 30, 36)",
  },
  "<"
);
toDark.to(
  "svg .js-anumated-background-grid-color",
  {
    fill: mainBlack,
    duration: 1,
  },
  "<"
);
toDark.to("[add-dark-bg-on-animation-end]", {
  duration: 0.1,
  background: mainBlack,
});

// dark hero title
const toDartHeroTitle = gsap.timeline({
  scrollTrigger: {
    toggleActions: "play none none reverse",
    trigger: heroCircleWrap,
    start: "top 50%",
  },
});
const heroHeadingGroup = document.querySelector(
  "[hero-dark-animated-heading-group]"
);
animateHeadingGroup(toDartHeroTitle, heroHeadingGroup);

// add comets animation trigger. same trigger with different on onLeaveBack option
const toDarkComets = gsap.timeline({
  scrollTrigger: {
    toggleActions: "play none none reset",
    trigger: heroCircleWrap,
    start: "top 50%",
  },
});
toDarkComets.add(getHeroDarkCometTopTimeline(), "<");
toDarkComets.add(getHeroDarkCometBottomTimeline(), "<");

// hide scaled top planet to show grid background under it
gsap.to(heroCircleWrap, {
  zIndex: -1,
  scrollTrigger: {
    trigger: "[hide_scaled_planet_trigger]",
    toggleActions: "play none none reverse",
    start: "top 90%",
  },
});

// return mouse-blur color
toDark.to(".mouse-blur", {
  boxShadow: "0 0 150px 150px rgb(218, 211, 200)",
  scrollTrigger: {
    trigger: "[hide_scaled_planet_trigger]",
    toggleActions: "play none none reverse",
    start: "top 90%",
  },
});

// scroll slider 2
function handleScrollSliderWithLottieAnimations(animations) {
  const slideTriggers = gsap.utils.toArray(".scroll_slider_2 .sticky_wrap");
  const slideLotties = animations.filter((a) => {
    a.stop();
    return a.wrapper.className === "lottie_animation_2";
  });
  slideTriggers.forEach((slideTrigger, idx) => {
    ScrollTrigger.create({
      trigger: slideTrigger,
      start: "top 50%",
      end: "bottom 40%",
      preventOverlaps: true,
      onEnter: () => {
        if (idx === 0) {
          slideLotties[0].play();
        }
        if (idx > 0) {
          gsap.to(".lottie_track", {
            xPercent: -25 * idx,
          });
          slideLotties[idx].play();
        }
      },
      onEnterBack: () => {
        if (idx < slideTriggers.length) {
          gsap.to(".lottie_track", {
            xPercent: -25 * idx,
          });
        }
      },
    });
  });
}

const testimonialsCometTL = getTestimonialsCometBottomTimeline();

// logo loop
const logoLoopTL = gsap.timeline({
  paused: true,
  repeat: -1,
});
logoLoopTL.fromTo(
  ".logo-slider",
  {
    xPercent: 0,
  },
  {
    xPercent: -100,
    duration: 50, // replace this for initial speed of the marquee
    ease: "none",
  }
);
ScrollTrigger.create({
  trigger: ".logo-slider",
  animation: logoLoopTL,
  start: "top 100%",
  end: "top 0%",
  toggleActions: "play pause reverse pause",
});

// portfolio images loop
const portfolioLoopTL = gsap.timeline({
  paused: true,
  repeat: -1,
});
portfolioLoopTL.fromTo(
  ".portfolio_slider.right",
  {
    xPercent: 0,
  },
  {
    xPercent: -100,
    duration: 50, // replace this for initial speed of the marquee
    ease: "none",
  }
);
portfolioLoopTL.fromTo(
  ".portfolio_slider.left",
  {
    xPercent: 0,
  },
  {
    xPercent: 100,
    duration: 50, // replace this for initial speed of the marquee
    ease: "none",
  },
  "<"
);

ScrollTrigger.create({
  trigger: "[portfolio-loop-trigger]",
  animation: portfolioLoopTL,
  start: "top 90%",
  end: "bottom 10%",
  toggleActions: "play pause play pause",
});

// animated decors
const animatedDecors = gsap.utils.toArray(".bg_decor.animated-from-bottom");
animatedDecors.forEach((decorElement) => {
  gsap.to(decorElement, {
    scrollTrigger: {
      toggleActions: "play none none reverse",
      trigger: decorElement,
      start: "top bottom",
      scrub: true,
    },
    y: "20%",
  });
});
const animatedDecorsTop = gsap.utils.toArray(".bg-decor.animated-from-top");
animatedDecorsTop.forEach((decorElement) => {
  gsap.to(decorElement, {
    scrollTrigger: {
      toggleActions: "play pause pause reverse",
      trigger: decorElement,
      start: "top bottom",
      scrub: true,
    },
    y: "-20%",
  });
});

// section with animated comet left
const withAnimatedComet = gsap.timeline({
  scrollTrigger: {
    toggleActions: "play none none reverse",
    trigger: ".with_animated_comet",
    start: "top 50%",
  },
});
withAnimatedComet.fromTo(
  ".comet_left svg .comet",
  {
    opacity: 0,
  },
  {
    motionPath: {
      path: ".comet_left svg .tail",
      autoRotate: 180,
      align: ".comet_left svg .tail",
      alignOrigin: [0.5, 0.5],
    },
    opacity: 1,
    duration: 1,
  }
);
const cometLeftTail = document.querySelector(".comet_left svg .tail");
const cometLeftTailLength = cometLeftTail?.getTotalLength();
gsap.set(cometLeftTail, { strokeDasharray: cometLeftTailLength });
withAnimatedComet.fromTo(
  cometLeftTail,
  {
    strokeDashoffset: cometLeftTailLength,
  },
  {
    strokeDashoffset: "0",
    duration: 1,
  },
  "<"
);
withAnimatedComet.from(".comet_left svg .comet_glow_1", {
  r: 0,
  opacity: 0,
  duration: 0.5,
});
withAnimatedComet.from(
  ".comet_left svg .comet_glow_2",
  {
    r: 0,
    opacity: 0,
    duration: 0.5,
  },
  "<"
);

// button groups
const buttonGroups = gsap.utils.toArray(".scrolable_button_group");
buttonGroups.forEach((buttonsGroup) => {
  const buttons = gsap.utils.toArray(buttonsGroup.querySelectorAll(".button"));
  const closestHeadingGroup = buttonsGroup.closest("[group-with-buttons]");
  const animationTriggerElement = closestHeadingGroup
    ? closestHeadingGroup.querySelector("[animated-heading-group]")
    : buttonsGroup;
  gsap.from(buttons, {
    opacity: "0",
    yPercent: 100,
    stagger: 0.1,
    delay: 1,
    scrollTrigger: {
      trigger: animationTriggerElement,
      toggleActions: "play none none reverse",
      start: "top 70%",
    },
  });
});

// animated section bg
const animatedBgSection = gsap.utils.toArray(".section_animated_bg");
animatedBgSection.forEach((animSection) => {
  const animatedBgTop = animSection.querySelector(".animated_bg");
  const animatedBgBottom = animSection.querySelector(".animated_bg_bottom");
  if (animatedBgTop) {
    gsap.from(animatedBgTop, {
      scrollTrigger: {
        toggleActions: "play none none reverse",
        trigger: animSection,
        start: "top 50%",
      },
      marginLeft: "3%",
      marginRight: "3%",
      y: "3vh",
      borderRadius: "50px",
      duration: 0.5,
    });
  }
  if (animatedBgBottom) {
    gsap.to(animatedBgBottom, {
      scrollTrigger: {
        toggleActions: "play none none reverse",
        trigger: animSection,
        start: "bottom 40%",
      },
      marginLeft: "3%",
      marginRight: "3%",
      y: "-3vh",
      borderRadius: "50px",
      duration: 0.5,
    });
  }
});

// animated heading with comet and cards
const animatedHeadingCometCardsWrap = document.querySelector(
  "[animated-heading-comet-cards]"
);
const hedingWithCometRight =
  animatedHeadingCometCardsWrap?.querySelector("[animated-heading]");

const animatedHeadingCometCardsTL = gsap.timeline({
  scrollTrigger: {
    trigger: hedingWithCometRight,
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
});
// // heading
const typeSplitHedingWithCometRight = new SplitType(hedingWithCometRight, {
  types: "lines, words",
  tagName: "span",
});
animatedHeadingCometCardsTL.from(typeSplitHedingWithCometRight.words, {
  y: "100%",
  opacity: 0,
  duration: 0.5,
  stagger: 0.05,
});
// // comet
const cometRightWrap = document.querySelector(".comet_right");
const cometRightComet = document.querySelector(".comet_right svg .comet");
const cometRightTail = document.querySelector(".comet_right svg .tail");
const cometRightTailLength = cometRightTail?.getTotalLength();
const cometRightPathGradientEndOffset = document.querySelector(
  ".comet_right svg #right-coment-tail stop:nth-child(1)"
);
gsap.set(cometRightWrap, {
  width: "104%",
  marginRight: "-2%",
});
animatedHeadingCometCardsTL.set(cometRightPathGradientEndOffset, {
  attr: { offset: "0" }, // return att for repeats
});
animatedHeadingCometCardsTL.fromTo(
  cometRightComet,
  {
    opacity: 0,
  },
  {
    motionPath: {
      path: cometRightTail,
      align: cometRightTail,
      alignOrigin: [0.5, 0.5],
    },
    opacity: 1,
    duration: 1,
  }
);
gsap.set(cometRightTail, { strokeDasharray: cometRightTailLength });
animatedHeadingCometCardsTL.fromTo(
  cometRightTail,
  {
    strokeDashoffset: cometRightTailLength,
  },
  {
    strokeDashoffset: "0",
    duration: 1,
  },
  "<"
);
animatedHeadingCometCardsTL.to(
  cometRightPathGradientEndOffset,
  {
    attr: { offset: "1" },
    duration: 1,
  },
  "-=50%"
);
animatedHeadingCometCardsTL.to(
  cometRightWrap,
  {
    x: "60%",
    duration: 1,
  },
  "<"
);
// cards
const cards = gsap.utils.toArray(".cards .card");
cards.forEach((card, index) => {
  animatedHeadingCometCardsTL.fromTo(
    card,
    {
      yPercent: 15 * (index + 1),
      opacity: "0",
    },
    {
      yPercent: 0, // 20 * index,
      opacity: "1",
      delay: 0.05 * index, // stagger
      duration: 0.3,
      ease: "power1.out",
    },
    "<"
  );
});
const servicesCometTL = gsap.timeline({
  scrollTrigger: {
    toggleActions: "play none none reverse",
    trigger: ".services_comet",
    start: "top 20%",
  },
});
servicesCometTL.from(".services_comet", {
  y: "-100%",
  delay: 0.25,
  opacity: 0,
  duration: 1,
});
servicesCometTL.from(".services_comet svg .glow_1", {
  r: 0,
  duration: 1,
});
servicesCometTL.from(
  ".services_comet svg .glow_2",
  {
    r: 0,
    duration: 1,
  },
  "<"
);

// mouse glow
document.addEventListener("mousemove", mouseMove);
gsap.set(".mouse-blur", { opacity: 0 });
let xCTo = gsap.quickTo(".mouse-blur", "left", {
  duration: 0.2,
  ease: "power3",
});
let yCTo = gsap.quickTo(".mouse-blur", "top", {
  duration: 0.2,
  ease: "power3",
});
let isVisible = false;
function mouseMove(e) {
  if (!isVisible) {
    gsap.set(".mouse-blur", { opacity: 1 });
    isVisible = true;
  }
  const cursorPosition = {
    left: e.clientX,
    top: e.clientY,
  };

  xCTo(cursorPosition.left);
  yCTo(cursorPosition.top);
}

// team images
const teamImages = gsap.utils.toArray(".team_image");
gsap.from(teamImages, {
  opacity: "0",
  yPercent: 100,
  stagger: 0.04,
  scrollTrigger: {
    trigger: ".team_images",
    toggleActions: "play none none reverse",
    start: "top center",
  },
});

// testimonials slider - trigger actions on active slide
const slidesToObserve = document.querySelectorAll(".w-slide");
const testimonialHeadings = gsap.utils.toArray(".testimonial_heading");
const testimonialHeadingsSplited = testimonialHeadings.map((heading) => {
  return new SplitType(heading, {
    types: "words",
    tagName: "span",
  });
});

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (
      mutation.attributeName === "aria-hidden" &&
      !mutation.target.getAttribute("aria-hidden") // visible slide, aria-hidden changed to 'true'
    ) {
      const slideDescription = mutation.target.getAttribute("aria-label");
      const currentSlideIndex = Number(slideDescription[0]) - 1;
      gsap.fromTo(
        testimonialHeadingsSplited[currentSlideIndex].words,
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          delay: 0.3,
          duration: 0.5,
          stagger: 0.04,
        }
      );
    }
  });
});
slidesToObserve.forEach((slide) => {
  observer.observe(slide, {
    attributeFilter: ["aria-hidden"],
  });
});

const footerCometTL = getFooterCometTL();

// resize invalidation
const resizeHandler = () => {
  toDarkComets.invalidate();
  toDarkComets.play();
  testimonialsCometTL.invalidate();
  testimonialsCometTL.play();
  footerCometTL.invalidate();
  footerCometTL.play();
};

const timer = gsap.delayedCall(0.2, resizeHandler).pause();

window.addEventListener("resize", () => {
  timer.restart(true);
  toDarkComets.pause();
  testimonialsCometTL.pause();
  footerCometTL.pause();
});

const animatedBlocks = gsap.utils.toArray("[block-fade-in]");
animatedBlocks.forEach((animatedBlock) => {
  gsap.from(animatedBlock, {
    scrollTrigger: {
      toggleActions: "play none none reverse",
      trigger: animatedBlock,
      start: "top 90%",
      // markers: true,
      // uncomment line 749 to see triggers debug markers
    },
    y: "15%",
    opacity: 0,
    duration: 0.5,
  });
});

//** FUNCTIONS */
// animate heading group
function animateHeadingGroup(timeline, headingGroup, options) {
  if (!headingGroup) return null;
  const defaultOptions = {
    duration: 1,
    stagger: 0.1,
  };
  options = { ...defaultOptions, ...options };

  const headingGroupTL = timeline;
  const headings = headingGroup.querySelectorAll("[animated-heading]");
  const subheading = headingGroup.querySelector("[animated-subheading]");
  const buttons = headingGroup.querySelectorAll("[animated-buttons]");
  if (headings.length) {
    headings.forEach((heading) => {
      const typeSplit = new SplitType(heading, {
        types: "lines, words",
        tagName: "span",
      });
      headingGroupTL.from(typeSplit.words, {
        y: "100%",
        opacity: 0,
        duration: options.duration,
        stagger: options.stagger,
      });
    });
  }
  if (subheading) {
    headingGroupTL.from(
      subheading,
      {
        y: "100%",
        opacity: 0,
        duration: 0.5,
      },
      "-=50%"
    );
  }
  if (buttons.length) {
    buttons.forEach((button) => {
      headingGroupTL.from(
        button,
        {
          y: "100%",
          opacity: 0,
          duration: 0.5,
        },
        "<"
      );
    });
  }
}

// hero comet top
gsap.set(".comet_top", {
  opacity: 1, // show on script loaded
});
function getHeroDarkCometTopTimeline() {
  // dark hero comet top
  gsap.set(".comet_top", {
    width: "104%",
    marginLeft: "-2%",
    marginRight: "-2%",
  });
  const cometTopWrap = document.querySelector(".hero_dark_comet_top");
  let cometTopWrapRotate = 0;
  const updateRotate = (currentRotateFunc) => {
    const currentRotate = currentRotateFunc();
    currentRotate == 0
      ? (cometTopWrapRotate += 5)
      : currentRotate > 0
      ? (cometTopWrapRotate -= 10)
      : (cometTopWrapRotate = 0);
  };
  const cometTopBody = document.querySelector(
    ".hero_dark_comet_top svg .comet"
  );
  const cometTopPath = document.querySelector(
    ".hero_dark_comet_top svg.animation-path path"
  );
  const cometPathGradientEndOffset = document.querySelector(
    ".hero_dark_comet_top svg #tail-gradient stop:nth-child(1)"
  );

  const cometTopPathLength = cometTopPath?.getTotalLength();
  gsap.set(cometTopPath, { strokeDasharray: cometTopPathLength });

  const cometTopTL = gsap.timeline({
    defaults: { duration: 8, ease: "none" },
    repeat: -1,
    repeatRefresh: true,
  });
  cometTopTL.set(cometTopWrap, {
    rotation: () => cometTopWrapRotate,
  });
  cometTopTL.set(cometPathGradientEndOffset, {
    attr: { offset: "0" },
  });
  cometTopTL.to(
    cometTopBody,
    {
      motionPath: {
        path: cometTopPath,
        align: cometTopPath,
        alignOrigin: [0.5, 0.5],
        autoRotate: 175,
      },
      opacity: 1,
    },
    "<"
  );
  cometTopTL.fromTo(
    cometTopPath,
    {
      strokeDashoffset: cometTopPathLength,
    },
    {
      strokeDashoffset: "0",
    },
    "<"
  );
  cometTopTL.to(
    cometPathGradientEndOffset,
    {
      attr: { offset: "1" },
      ease: "power1.in",
      duration: 7,
    },
    "-=80%"
  );
  return cometTopTL;
}

// hero comet bottom
function getHeroDarkCometBottomTimeline() {
  // dark hero comet bottom
  gsap.set(".comet_bottom", {
    width: "104%",
    marginLeft: "-2%",
    marginRight: "-2%",
  });
  const cometBottomBody = document.querySelector(
    ".hero_dark_comet_bottom svg .comet"
  );
  const cometBottomPath = document.querySelector(
    ".hero_dark_comet_bottom svg.animation-path path"
  );
  const cometBottomPathGradientEndOffset = document.querySelector(
    ".hero_dark_comet_bottom svg #tail-gradient-bottom stop:nth-child(1)"
  );

  const cometBottomPathLength = cometBottomPath?.getTotalLength();
  gsap.set(cometBottomPath, { strokeDasharray: cometBottomPathLength });

  gsap.set(cometBottomBody, {
    opacity: 0, // hide on load
  });

  const cometBottomTL = gsap.timeline({
    defaults: { duration: 8, ease: "none" },
    repeat: -1,
  });

  cometBottomTL.set(cometBottomBody, {
    opacity: 1, // show on timeline start
  });

  cometBottomTL.to(
    cometBottomBody,
    {
      motionPath: {
        path: cometBottomPath,
        align: cometBottomPath,
        alignOrigin: [0.5, 0.5],
      },
      opacity: 1,
    },
    "<"
  );
  cometBottomTL.fromTo(
    cometBottomPath,
    {
      strokeDashoffset: cometBottomPathLength,
    },
    {
      strokeDashoffset: "0",
    },
    "<"
  );
  cometBottomTL.fromTo(
    cometBottomPathGradientEndOffset,
    {
      attr: { offset: "0" },
    },
    {
      attr: { offset: "1" },
      ease: "power1.in",
      duration: 7,
    },
    "-=80%"
  );
  return cometBottomTL;
}

// TODO refacttor to one bottom comet animation handle
function getTestimonialsCometBottomTimeline() {
  gsap.set(".testimonials_comet_bottom", {
    width: "104%",
    marginLeft: "-2%",
    marginRight: "-2%",
  });
  const testimonialsCometBottomBody = document.querySelector(
    ".testimonials_comet_bottom svg .comet"
  );
  const testimonialsCometBottomPath = document.querySelector(
    ".testimonials_comet_bottom svg.animation-path path"
  );
  const testimonialsCometBottomPathGradientEndOffset = document.querySelector(
    ".testimonials_comet_bottom svg #testimonials-comet-tail-gradient stop:nth-child(1)"
  );

  const testimonialsCometBottomPathLength =
    testimonialsCometBottomPath?.getTotalLength();
  gsap.set(testimonialsCometBottomPath, {
    strokeDasharray: testimonialsCometBottomPathLength,
  });

  gsap.set(testimonialsCometBottomBody, {
    opacity: 0, // hide on load
  });

  const testimonialsCometTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".testimonials_comet_bottom",
      start: "top 80%",
      toggleActions: "play none none play",
    },
    defaults: { duration: 8, ease: "none" },
    delay: 1,
    repeat: -1,
  });

  testimonialsCometTL.set(testimonialsCometBottomBody, {
    opacity: 1, // show on timeline start
  });
  testimonialsCometTL.set(testimonialsCometBottomPathGradientEndOffset, {
    attr: { offset: "0" },
  });

  testimonialsCometTL.to(
    testimonialsCometBottomBody,
    {
      motionPath: {
        path: testimonialsCometBottomPath,
        align: testimonialsCometBottomPath,
        alignOrigin: [0.5, 0.5],
      },
      opacity: 1,
    },
    "<"
  );
  testimonialsCometTL.fromTo(
    testimonialsCometBottomPath,
    {
      strokeDashoffset: testimonialsCometBottomPathLength,
    },
    {
      strokeDashoffset: "0",
    },
    "<"
  );
  testimonialsCometTL.to(
    testimonialsCometBottomPathGradientEndOffset,
    {
      attr: { offset: "1" },
      ease: "power1.in",
      duration: 7,
    },
    "-=80%"
  );
  return testimonialsCometTL;
}

// footer comet
function getFooterCometTL() {
  const cometFooterWrap = document.querySelector(".footer_comet");
  gsap.set(cometFooterWrap, {
    width: "104%",
    marginLeft: "-2%",
    marginRight: "-2%",
  });

  const cometFooterBody = document.querySelector(".footer_comet svg .comet");
  const cometFooterPath = document.querySelector(
    ".footer_comet svg.animation-path path"
  );
  const cometFooterPathGradientEndOffset = document.querySelector(
    ".footer_comet svg #footer-tail-gradient stop:nth-child(1)"
  );

  const cometFooterPathLength = cometFooterPath?.getTotalLength();
  gsap.set(cometFooterPath, { strokeDasharray: cometFooterPathLength });

  const footerCometTL = gsap.timeline({
    scrollTrigger: {
      trigger: cometFooterWrap,
      start: "top bottom",
      toggleActions: "play pause play reset",
    },
    defaults: { duration: 8, ease: "none" },
    repeat: -1,
  });
  footerCometTL.set(cometFooterPathGradientEndOffset, {
    attr: { offset: "0" },
  });
  footerCometTL.to(
    cometFooterBody,
    {
      motionPath: {
        path: cometFooterPath,
        align: cometFooterPath,
        alignOrigin: [0.5, 0.5],
      },
      opacity: 1,
    },
    "<"
  );
  footerCometTL.fromTo(
    cometFooterPath,
    {
      strokeDashoffset: cometFooterPathLength,
    },
    {
      strokeDashoffset: "0",
    },
    "<"
  );
  footerCometTL.to(
    cometFooterPathGradientEndOffset,
    {
      attr: { offset: "1" },
      ease: "power1.in",
      duration: 7,
    },
    "-=80%"
  );
  return footerCometTL;
}
