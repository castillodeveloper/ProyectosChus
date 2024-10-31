const items = document.querySelectorAll('.item');
let isSpinning = false;
const audio = document.getElementById("ruleta-sound");

function openBox() {
    if (isSpinning) return;
    isSpinning = true;

    const resultElement = document.getElementById("result");
    const roulette = document.getElementById("roulette");

    // Reiniciar el contenido y el estado de la ruleta
    resultElement.innerHTML = "";
    roulette.style.transition = "transform 0s";
    roulette.style.transform = "translateX(0)";

    // Seleccionar un ítem al azar
    const selectedIndex = Math.floor(Math.random() * items.length);
    const cycles = 6; // Número de ciclos de giro
    const itemWidth = 150; // Ancho de cada ítem
    const totalDistance = (cycles * items.length * itemWidth) + (selectedIndex * itemWidth); // Distancia total a girar

    // Reproducir sonido de ruleta
    audio.currentTime = 0;
    audio.play();

    // Iniciar el giro después de una breve pausa
    setTimeout(() => {
        roulette.style.transition = "transform 6s cubic-bezier(0.33, 1, 0.68, 1)";
        roulette.style.transform = `translateX(-${totalDistance}px)`;
    }, 50);

    // Abrir el modal cuando el giro termine
    setTimeout(() => {
        openModal(items[selectedIndex].textContent, items[selectedIndex].style.backgroundColor);
        audio.pause();
        audio.currentTime = 0;
        isSpinning = false;
    }, 6000); // Sincronizado con la duración de la transición
}

// Abrir modal con el resultado
function openModal(itemName, itemColor) {
    const modal = document.getElementById("item-modal");
    const modalItemName = document.getElementById("modal-item-name");

    modalItemName.textContent = itemName;
    modalItemName.style.color = itemColor;
    modal.style.display = "block";
}

// Cerrar el modal
function closeModal() {
    const modal = document.getElementById("item-modal");
    modal.style.display = "none";
}
