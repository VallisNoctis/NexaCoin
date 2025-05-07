// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Conectar wallet
    const connectWalletBtn = document.getElementById('connectWallet');
    
    connectWalletBtn.addEventListener('click', async function() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Solicitar acceso a la cuenta
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                
                // Actualizar el botón
                connectWalletBtn.textContent = account.substring(0, 6) + '...' + account.substring(38);
                connectWalletBtn.style.backgroundColor = '#4CAF50';
                
                // Aquí puedes agregar más lógica después de conectar
                console.log('Cuenta conectada:', account);
                
                // Opcional: Mostrar notificación
                alert('Wallet conectada correctamente!');
                
            } catch (error) {
                console.error('Error al conectar la wallet:', error);
                alert('Error al conectar la wallet: ' + error.message);
            }
        } else {
            alert('Por favor instala MetaMask u otra wallet compatible con Ethereum');
            window.open('https://metamask.io/', '_blank');
        }
    });
    
    // Datos del token inicializados en cero
    document.getElementById('tokenPrice').textContent = '$0.00';
    document.getElementById('marketCap').textContent = '$0.00';
    document.getElementById('holders').textContent = '0';
    
    // Smooth scrolling para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-card, .feature-card, .timeline-phase');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Establecer propiedades iniciales para la animación
    const animatedElements = document.querySelectorAll('.about-card, .feature-card, .timeline-phase');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar la página
});