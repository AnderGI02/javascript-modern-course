export const toggleClassListHidden = (element) => {
  const isElementsCategoryNotTheSame = () => category && category !== element.getAttribute("data-category");
    if (isElementsCategoryNotTheSame()) {
      element.classList.add("hidden");
    } else {
      element.classList.remove("hidden");
    }
}