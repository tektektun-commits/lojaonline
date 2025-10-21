// Inicialização global: remova chamadas abaixo se não usar certas features (galeria, contador, abas)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar a galeria de imagens
    initImageGallery();
    
    // Inicializar contador regressivo para oferta flash
    initCountdown();
    
    // Inicializar funcionalidade de abas (Se você adicionar as abas no HTML)
    initTabs();
});

// Função para inicializar a galeria de imagens
// Galeria: se mudar IDs/classes no HTML, ajuste seletores dentro desta função
function initImageGallery() {
    // Se trocar o id da imagem principal, altere aqui
const mainImage = document.getElementById('main-image');
    // Se mudar a classe das miniaturas, ajuste o seletor
const thumbnails = document.querySelectorAll('.thumbnail');
    // Ajuste as classes dos botões se renomear no HTML
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    // Se remover o contador no HTML, proteja o uso deste seletor
const counter = document.querySelector('.image-counter');
    
    let currentIndex = 0;
    const totalImages = thumbnails.length;
    
    // Se não houver miniaturas ou a imagem principal, interrompe a função
    // Caso vá desativar a galeria, você pode simplesmente não chamar initImageGallery()
    if (totalImages === 0 || !mainImage) return;
    
    // Função para atualizar a imagem principal
    // Dica: use `data-src` nas miniaturas para apontar para a imagem grande
    function updateMainImage(index) {
        // Garantir que o índice está dentro dos limites
        currentIndex = Math.max(0, Math.min(index, totalImages - 1));

        // Remover classe ativa de todas as miniaturas
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        // Adicionar classe ativa à miniatura selecionada
        thumbnails[currentIndex].classList.add('active');
        
        // Obter a tag <img> dentro da miniatura
        const thumbnailImg = thumbnails[currentIndex].querySelector('img');
        
        // Se a miniatura tem data-src, usa-o. Caso contrário, usa o src da miniatura.
        const selectedThumbSrc = thumbnailImg.dataset.src || thumbnailImg.src; 
        
        mainImage.src = selectedThumbSrc;
        
        // Atualizar o contador
        counter.textContent = `${currentIndex + 1}/${totalImages}`;
        
        // Atualizar estado dos botões de navegação
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalImages - 1;
    }
    
    // Adicionar evento de clique às miniaturas
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateMainImage(index);
        });
    });
    
    // Adicionar evento de clique ao botão anterior
    prevBtn.addEventListener('click', () => {
        updateMainImage(currentIndex - 1);
    });
    
    // Adicionar evento de clique ao botão próximo
    nextBtn.addEventListener('click', () => {
        updateMainImage(currentIndex + 1);
    });
    
    // Adicionar navegação com as setas do teclado
    // Remova este bloco se não quiser suporte a teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            updateMainImage(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            updateMainImage(currentIndex + 1);
        }
    });
    
    // Adicionar suporte a gestos de deslize para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Gestos mobile: remova estes eventos se não precisar de swipe
    mainImage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    mainImage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        // Deslize para a esquerda (próxima imagem)
        if (touchStartX - touchEndX > swipeThreshold) {
            updateMainImage(currentIndex + 1);
        }
        
        // Deslize para a direita (imagem anterior)
        if (touchEndX - touchStartX > swipeThreshold) {
            updateMainImage(currentIndex - 1);
        }
    }
    
    // **Ajuste de Inicialização:**
    // O JS vai pegar a imagem que está no data-src da primeira miniatura 
    // e setar na imagem principal.
    if (thumbnails[0] && thumbnails[0].querySelector('img').dataset.src) {
        mainImage.src = thumbnails[0].querySelector('img').dataset.src;
    }
    // Inicializar a galeria para setar a classe 'active' e o contador
    updateMainImage(currentIndex);
}

// Timer de contagem regressiva
// Contador: ajuste a duração alterando totalSeconds, ou remova a chamada em DOMContentLoaded
function initCountdown() {
    // Iniciar o timer com 5 minutos
    // Para mudar: ex. 10 minutos -> 10 * 60; 30s -> 30
    let totalSeconds = 5 * 60;
    const countdownElement = document.getElementById('countdown');
    
    if (countdownElement) {
        // Função para atualizar o timer
        function updateTimer() {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
            // Formatar com zeros à esquerda
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(seconds).padStart(2, '0');
            
            // Atualizar o elemento HTML
            countdownElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
            
            // Decrementar o tempo
            if (totalSeconds > 0) {
                totalSeconds--;
                setTimeout(updateTimer, 1000);
            } else {
                // Texto quando expirar: troque "EXPIRADO" para a mensagem desejada
                countdownElement.textContent = "EXPIRADO";
                // Caso queira ação: ex. desabilitar o botão de compra ou mudar preço
                // DICA: selecione o botão pelo seletor e aplique .disabled = true ou troque o texto
            }
        }
        
        // Iniciar o timer
        updateTimer();
    }
}

// Função para inicializar as abas de conteúdo (deixada aqui para caso você queira usá-la)
// Abas: só habilite se tiver botões .tab-button e conteúdos .tab-content
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // ... lógica de abas ...
            });
        });
        
        // Ativar a primeira aba por padrão
        if (tabButtons[0] && tabContents[0]) {
            tabButtons[0].classList.add('active');
            tabContents[0].classList.add('active');
        }
    }
}