(function (body, animatedClassName, disabledClassName, selector, threshold, rootMargin) {
  // If disabled, do nothing
  if (!window.IntersectionObserver) {
    body.classList.add(disabledClassName);
    return;
  }
  body.classList.remove(disabledClassName);

  const intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach((entry) => entry.target.classList.toggle(animatedClassName,entry.intersectionRatio >= threshold));
  }, {
    rootMargin: rootMargin,
    threshold: threshold
  });
  const elements = document.querySelectorAll(selector + ":not(" + animatedClassName + ")");
  console.log("Found elements to animate", elements);
  elements.forEach((element) => intersectionObserver.observe(element));
})(document.body, 'kt-animated', 'kt-disabled', '[data-ktanimate]', 0.5, '0% 50%');