import "/src/css/style.scss";
export const progresses = document.querySelectorAll(".progress");

progresses.forEach((progress) => {
  progress.addEventListener("input", function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, white 100%)`;
  });
});
