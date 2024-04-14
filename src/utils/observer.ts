"use strict";
(function () {

  window.addEventListener("load", init);

  /**
   * Initialization function that should handle anything that needs to occur on page load.
   */
  function init() {
    setDynamicElementsObserver();
  }

  function setDynamicElementsObserver() {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    };

    // This observer will be run on all elements with the dynamic-item 
    // class. This class sets their opacity and some other styles to the
    // pre-animation state. Shown is the post-animation state. The animation
    // only happens once, since entries the screen is not intersecting don't
    // get their "shown" class removed.

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("shown");
          observer.unobserve(entry.target);
        } 
        // else {
        //   entry.target.classList.remove("shown");
        // }
      });
    }, options);

    const dynamicElements = document.querySelectorAll(".dynamic-item");
    dynamicElements.forEach((element) => observer.observe(element));

    const clientTips = document.querySelectorAll(".client-tip");
    clientTips.forEach((element) => observer.observe(element));
  }

})();