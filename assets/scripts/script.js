function handleMouseEnter() {
  this.classList.add('s-card--hovered');
  document.body.id = `${this.id}-hovered`;
}

function handleMouseLeave() {
  this.classList.remove('s-card--hovered');
  document.body.id = '';
}

function addEventListenersToCards() {
  const cardElements = document.getElementsByClassName('s-card');

  for (let index = 0; index < cardElements.length; index++) {
    const card = cardElements[index];
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
  }
}

document.addEventListener("DOMContentLoaded", addEventListenersToCards, false);

let currentIndex = 1;

function selectCarouselItem(selectedButtonElement) {
  currentIndex = Number(selectedButtonElement.id); // Atualiza o índice global

  const carousel = document.querySelector('.s-cards-carousel');
  const transform = carousel.style.transform || 'rotateY(0deg)';
  const rotateY = transform.match(/rotateY\((-?\d+deg)\)/i) || ['rotateY(0deg)'];
  const rotateYDeg = -120 * (currentIndex - 1);
  const newTransform = transform.replace(rotateY[0], `rotateY(${rotateYDeg}deg)`);

  carousel.style.transform = newTransform;

  const activeButtonElement = document.querySelector('.s-controller__button--active');
  if (activeButtonElement) {
    activeButtonElement.classList.remove('s-controller__button--active');
  }
  selectedButtonElement.classList.add('s-controller__button--active');
}

function changeCarouselItem(direction) {
  const totalItems = 3;
  currentIndex += direction;

  if (currentIndex < 1) currentIndex = totalItems;
  if (currentIndex > totalItems) currentIndex = 1;

  const targetButton = document.getElementById(String(currentIndex));
  if (targetButton) {
    selectCarouselItem(targetButton);
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    changeCarouselItem(-1);
  } else if (event.key === "ArrowRight") {
    changeCarouselItem(1);
  }
});
