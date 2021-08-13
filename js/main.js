/* =================

author: Karan Mhatre
email: me@karanmhatre.com
website: karanmhatre.com

================= */

// Better to traverse the DOM thenleast possible
// you can use `var` instead of `const` for legacy browser support
const loadingScreen = document.querySelector(".loading-screen");
const mainNavigation = document.querySelector(".main-navigation");

// Function to add and remove the page transition screen
function pageTransitionIn() {
  // GSAP methods can be chained and return directly a promise
  // but here, a simple tween is enough

  return (
    gsap
      // .timeline()
      // .set(loadingScreen, { transformOrigin: 'bottom left'})
      // .to(loadingScreen, { duration: .5, scaleY: 1 })
      .to(loadingScreen, {
        duration: 0.5,
        scaleY: 1,
        transformOrigin: "bottom left",
      })
  );
}
// Function to add and remove the page transition screen
function pageTransitionOut(container) {
  // GSAP methods can be chained and return directly a promise

  return gsap
    .timeline({ delay: 1 }) // More readable to put it here
    .add("start") // Use a label to sync screen and content animation
    .to(
      loadingScreen,
      {
        duration: 0.5,
        scaleY: 0,
        skewX: 0,
        transformOrigin: "top left",
        ease: "power1.out",
      },
      "start"
    )
    .call(contentAnimation, [container], "start");
}

// Function to animate the content of each page
function contentAnimation(container) {
  // Query from container
  // $(container.querySelector('.green-heading-bg')).addClass('show')
  // GSAP methods can be chained and return directly a promise
  const segments = document.querySelectorAll(".bg-segment");
  return gsap
    .timeline()
    .from(segments, {
      duration: 0.42,
      width: 0,
      // opacity: 0,
      stagger: 0.25,
    })
    .from(mainNavigation, { duration: 0.5, translateY: -10, opacity: 0 });
}

$(function () {
  barba.init({
    transitions: [
      {
        async leave(data) {
          console.log("leave data: " + JSON.stringify(data));
          await pageTransitionIn();
          data.current.container.remove();
        },
        async enter(data) {
          console.log("enter data: " + JSON.stringify(data));
          await pageTransitionOut(data.next.container);
        },
        async once(data) {
          console.log("begin data: " + JSON.stringify(data));
          await contentAnimation(data.next.container);
        },
      },
    ],
  });
});
