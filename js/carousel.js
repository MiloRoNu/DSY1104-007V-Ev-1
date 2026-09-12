let currentSlide = 0;
let slideInterval;

document.addEventListener('DOMContentLoaded', () => {
  startInterval();
});

function startInterval() {
  slideInterval = setInterval(() => moveSlide(1), 7000);
}

function moveSlide(i){
  const slides = document.querySelectorAll('.carousel-image');
  slides[currentSlide].classList.remove('active');
  currentSlide += i;

  if (currentSlide >= slides.length) { currentSlide = 0; }
  if (currentSlide < 0) { currentSlide = slides.length - 1;}

  slides[currentSlide].classList.add('active');

  clearInterval(slideInterval);
  startInterval();
}