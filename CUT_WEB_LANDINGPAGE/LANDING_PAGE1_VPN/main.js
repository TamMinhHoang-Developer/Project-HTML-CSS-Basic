const cards = document.querySelectorAll('.pricing-feedback__slide__area__item');
const cardsContainer = document.querySelector('.pricing-feedback__slide__area');
const leftBtn = document.querySelector('.action__prev');
const rightBtn = document.querySelector('.action__next');
const dotsContainer = document.querySelector('.slide__controller--dot');

const cardsPerPage = 3;
const totalPages = Math.ceil(cards.length / cardsPerPage);
let currentPage = 0;

function renderDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === currentPage ? ' active' : '');
        dot?.addEventListener('click', () => {
            currentPage = i;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    }
}

function updateSlider() {
    cards.forEach((card, idx) => {
        const start = currentPage * cardsPerPage;
        const end = start + cardsPerPage;
        if (idx >= start && idx < end) {
            card.classList.add('active');
            card.classList.remove('overlay');
        } else {
            card.classList.remove('active');
            card.classList.add('overlay');
        }
    });
    renderDots();
    updateStateAction()
}

function updateStateAction() {
    if (currentPage === 0) {
        leftBtn.classList.remove('active');
    } else {
        leftBtn.classList.add('active');
    }

    if (currentPage === totalPages - 1) {
        rightBtn.classList.remove('active');
    } else {
        rightBtn.classList.add('active');
    }
}

leftBtn.addEventListener('click', () => {
    currentPage = (currentPage - 1 + totalPages) % totalPages;

    console.log(currentPage, totalPages);

    updateSlider();

    updateStateAction()
});

rightBtn.addEventListener('click', () => {
    currentPage = (currentPage + 1) % totalPages;
    updateSlider();

    updateStateAction()
});

updateSlider();
