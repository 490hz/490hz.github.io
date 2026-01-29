setInterval(() => {
    createSpellCircle(document.getElementById('spell-effects'));
}, 3000);
function createSpellCircle(container) {
    const circle = document.createElement('div');
    circle.classList.add('spell-circle');
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    circle.style.left = `${x}%`;
    circle.style.top = `${y}%`;
    const size = Math.random() * 100 + 50;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    const colors = ['rgba(255, 77, 109, 0.3)', 'rgba(185, 28, 28, 0.3)', 'rgba(255, 158, 0, 0.3)'];
    circle.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.random() * 10 + 10;
    circle.style.animation = `spellCircle ${duration}s infinite ease-in-out`;
    container.appendChild(circle);
}
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    document.querySelector('.anime-bg').style.background = `
        radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, 
        rgba(255, 77, 109, 0.2) 0%, 
        rgba(185, 28, 28, 0.2) 30%, 
        rgba(26, 15, 26, 0.5) 70%)
    `;
    if (Math.random() > 0.7) {
        createParticle(e.clientX, e.clientY);
    }
});
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    const colors = ['#ff4d6d', '#b91c1c', '#ff9e00', '#ffbe0b'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 6 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    document.body.appendChild(particle);
    let opacity = 1;
    let posX = x;
    let posY = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    const animate = () => {
        opacity -= 0.02;
        posX += Math.cos(angle) * speed;
        posY += Math.sin(angle) * speed;
        particle.style.opacity = opacity;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };
    requestAnimationFrame(animate);
}
const scrollElements = document.querySelectorAll('.scroll-animate');
const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
};
const displayScrollElement = (element) => {
    element.classList.add('active');
};
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 80)) {
            displayScrollElement(el);
        }
    });
};
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});
handleScrollAnimation();
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.skill-icon');
        icon.style.transform = 'scale(1.3) rotate(15deg)';
        item.style.boxShadow = '0 0 30px rgba(255, 77, 109, 0.5)';
    });
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.skill-icon');
        icon.style.transform = '';
        item.style.boxShadow = '';
    });
});
const socialItems = document.querySelectorAll('.social-item');
socialItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.social-icon');
        icon.style.color = '#ff4d6d';
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        item.style.boxShadow = '0 0 30px rgba(255, 77, 109, 0.5)';
    });
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.social-icon');
        icon.style.color = '';
        icon.style.transform = '';
        item.style.boxShadow = '';
    });
});
const header = document.querySelector('header');
header.addEventListener('mouseenter', () => {
    document.querySelector('h1').style.textShadow = '0 0 30px rgba(255, 77, 109, 0.9)';
});
header.addEventListener('mouseleave', () => {
    document.querySelector('h1').style.textShadow = '';
});
window.addEventListener('load', createSpinningFlowers);
function createSpinningFlowers() {
    const container = document.getElementById('spinning-flowers-container');
    const positions = [
        { top: '30%', left: '20%', delay: 0.2 },
        { top: '70%', right: '30%', delay: 0.5 },
        { top: '50%', left: '50%', delay: 0.8 },
        { bottom: '20%', left: '40%', delay: 1.1 },
        { top: '20%', right: '40%', delay: 1.4 }
    ];
    positions.forEach((pos, index) => {
        const flower = document.createElement('div');
        flower.classList.add('spinning-flower', `spinning-flower-${index + 1}`);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '60');
        svg.setAttribute('height', '60');
        svg.setAttribute('viewBox', '0 0 100 100');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M50 10 C60 30 70 40 90 50 C70 60 60 70 50 90 C40 70 30 60 10 50 C30 40 40 30 50 10');
        path.setAttribute('fill', '#ff4d6d');
        svg.appendChild(path);
        flower.appendChild(svg);
        flower.style.top = pos.top;
        flower.style.left = pos.left;
        flower.style.right = pos.right;
        flower.style.bottom = pos.bottom;
        flower.style.animationDelay = `${pos.delay}s`;
        container.appendChild(flower);
    });
}
const skillsContainer = document.querySelector('.skills-container');
const contactsContainer = document.querySelector('.contacts-container');
if (skillsContainer && contactsContainer) {
    contactsContainer.style.width = skillsContainer.offsetWidth + 'px';
    contactsContainer.style.height = skillsContainer.offsetHeight + 'px';
    window.addEventListener('resize', () => {
        contactsContainer.style.width = skillsContainer.offsetWidth + 'px';
        contactsContainer.style.height = skillsContainer.offsetHeight + 'px';
    });
}

const audio = document.getElementById('bg-music');
const muteButton = document.getElementById('mute-toggle');

document.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().catch(e => console.log("Autoplay prevented:", e));
    }
}, { once: true });

muteButton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteButton.classList.toggle('unmuted', !audio.muted);
    muteButton.innerHTML = audio.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
});

document.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false;
        muteButton.classList.add('unmuted');
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}, { once: true });

window.addEventListener('load', function() {
    const video = document.querySelector('video');
    const loader = document.querySelector('.loader');
    
    function hideLoader() {
        loader.classList.add('loader-hidden');
        loader.addEventListener('transitionend', () => {
            loader.remove();
        });
    }

    if (video.readyState >= 3) {
        hideLoader();
    } else {
        video.addEventListener('canplaythrough', hideLoader);
        video.addEventListener('error', hideLoader);
        
        setTimeout(hideLoader, 5000);
    }
    
    video.load();
});

document.addEventListener('click', function() {
    const video = document.querySelector('video');
    if (video.paused) {
        video.play().catch(e => console.log("Video play prevented:", e));
    }
}, { once: true });
