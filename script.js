// Language translations
const translations = {
    en: {
        titleLine1: 'Get Unlimited',
        titleLine2: 'Access',
        feature1: 'Unlimited Art Creation',
        feature2: 'Exclusive Styles',
        feature3: 'Magic Avatars With 20% Off',
        yearlyLabel: 'YEARLY ACCESS',
        weeklyLabel: 'WEEKLY ACCESS',
        bestOffer: 'BEST OFFER',
        yearlyPrice: 'Just $39.99 per year',
        yearlyPriceSub: '$0.48 per week',
        weeklyPrice: '$6.99 per week',
        continue: 'Continue',
        terms: 'Terms of Use',
        privacy: 'Privacy Policy',
        restore: 'Restore'
    },
    ru: {
        titleLine1: 'Получите неограниченный',
        titleLine2: 'доступ',
        feature1: 'Неограниченное создание искусства',
        feature2: 'Эксклюзивные стили',
        feature3: 'Магические аватары со скидкой 20%',
        yearlyLabel: 'ГОДОВОЙ ДОСТУП',
        weeklyLabel: 'НЕДЕЛЬНЫЙ ДОСТУП',
        bestOffer: 'ЛУЧШЕЕ ПРЕДЛОЖЕНИЕ',
        yearlyPrice: 'Всего $39.99 в год',
        yearlyPriceSub: '$0.48 в неделю',
        weeklyPrice: '$6.99 в неделю',
        continue: 'Продолжить',
        terms: 'Условия использования',
        privacy: 'Политика конфиденциальности',
        restore: 'Восстановить'
    },
    es: {
        titleLine1: 'Obtén acceso',
        titleLine2: 'ilimitado',
        feature1: 'Creación de arte ilimitada',
        feature2: 'Estilos exclusivos',
        feature3: 'Avatares mágicos con 20% de descuento',
        yearlyLabel: 'ACCESO ANUAL',
        weeklyLabel: 'ACCESO SEMANAL',
        bestOffer: 'MEJOR OFERTA',
        yearlyPrice: 'Solo $39.99 al año',
        yearlyPriceSub: '$0.48 por semana',
        weeklyPrice: '$6.99 por semana',
        continue: 'Continuar',
        terms: 'Términos de uso',
        privacy: 'Política de privacidad',
        restore: 'Restaurar'
    },
    fr: {
        titleLine1: 'Obtenez un accès',
        titleLine2: 'illimité',
        feature1: 'Création d\'art illimitée',
        feature2: 'Styles exclusifs',
        feature3: 'Avatars magiques avec 20% de réduction',
        yearlyLabel: 'ACCÈS ANNUEL',
        weeklyLabel: 'ACCÈS HEBDOMADAIRE',
        bestOffer: 'MEILLEURE OFFRE',
        yearlyPrice: 'Seulement $39.99 par an',
        yearlyPriceSub: '$0.48 par semaine',
        weeklyPrice: '$6.99 par semaine',
        continue: 'Continuer',
        terms: 'Conditions d\'utilisation',
        privacy: 'Politique de confidentialité',
        restore: 'Restaurer'
    },
    de: {
        titleLine1: 'Erhalten Sie unbegrenzten',
        titleLine2: 'Zugang',
        feature1: 'Unbegrenzte Kunstkreation',
        feature2: 'Exklusive Stile',
        feature3: 'Magische Avatare mit 20% Rabatt',
        yearlyLabel: 'JÄHRLICHER ZUGANG',
        weeklyLabel: 'WÖCHENTLICHER ZUGANG',
        bestOffer: 'BESTES ANGEBOT',
        yearlyPrice: 'Nur $39.99 pro Jahr',
        yearlyPriceSub: '$0.48 pro Woche',
        weeklyPrice: '$6.99 pro Woche',
        continue: 'Weiter',
        terms: 'Nutzungsbedingungen',
        privacy: 'Datenschutzrichtlinie',
        restore: 'Wiederherstellen'
    },
    it: {
        titleLine1: 'Ottieni accesso',
        titleLine2: 'illimitato',
        feature1: 'Creazione artistica illimitata',
        feature2: 'Stili esclusivi',
        feature3: 'Avatar magici con sconto del 20%',
        yearlyLabel: 'ACCESSO ANNUALE',
        weeklyLabel: 'ACCESSO SETTIMANALE',
        bestOffer: 'MIGLIOR OFFERTA',
        yearlyPrice: 'Solo $39.99 all\'anno',
        yearlyPriceSub: '$0.48 a settimana',
        weeklyPrice: '$6.99 a settimana',
        continue: 'Continua',
        terms: 'Termini di utilizzo',
        privacy: 'Informativa sulla privacy',
        restore: 'Ripristina'
    }
};

// Supported languages
const supportedLanguages = ['en', 'ru', 'es', 'fr', 'de', 'it'];

// Get language from URL parameter
function getLanguageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    return supportedLanguages.includes(lang) ? lang : 'en';
}

// Set language
function setLanguage(lang) {
    const currentLang = translations[lang] || translations.en;
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (currentLang[key]) {
            element.textContent = currentLang[key];
            
            // Check if text needs scaling for longer languages
            checkTextOverflow(element, key);
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Check if text overflows and scale if needed
function checkTextOverflow(element, key) {
    // Reset any previous scaling
    element.classList.remove('text-scaled', 'text-scaled-sm');
    
    // Force reflow to get accurate measurements
    void element.offsetWidth;
    
    // Check for specific elements that might overflow
    const overflowKeys = ['titleLine1', 'titleLine2', 'feature1', 'feature2', 'feature3', 'yearlyPrice', 'weeklyPrice', 'yearlyPriceSub'];
    
    if (overflowKeys.includes(key)) {
        const parent = element.parentElement;
        const parentWidth = parent ? (parent.offsetWidth || parent.clientWidth) : window.innerWidth;
        const elementWidth = element.scrollWidth;
        const maxWidth = parentWidth * 0.95;
        
        if (elementWidth > maxWidth && maxWidth > 0) {
            element.classList.add('text-scaled');
            
            // Check again after first scaling
            void element.offsetWidth;
            if (element.scrollWidth > maxWidth) {
                element.classList.remove('text-scaled');
                element.classList.add('text-scaled-sm');
            }
        }
    }
}

// Subscription selection
function initSubscriptionSelection() {
    const yearlyOption = document.getElementById('yearly-option');
    const weeklyOption = document.getElementById('weekly-option');
    
    // Default: yearly selected
    yearlyOption.classList.add('selected');
    
    yearlyOption.addEventListener('click', () => {
        yearlyOption.classList.add('selected');
        weeklyOption.classList.remove('selected');
    });
    
    weeklyOption.addEventListener('click', () => {
        weeklyOption.classList.add('selected');
        yearlyOption.classList.remove('selected');
    });
}

// Initialize continue button URL
function initContinueButton() {
    const continueBtn = document.getElementById('continue-btn');
    const urlParams = new URLSearchParams(window.location.search);
    const continueUrl = urlParams.get('continue') || '#';
    continueBtn.href = continueUrl;
}

// Initialize toolbar links (if needed)
function initToolbarLinks() {
    // Based on requirements, toolbar elements (left to right) link to apple.com and google.com
    // If toolbar elements exist in the DOM, they should link to these URLs
    const toolbarElements = document.querySelectorAll('.toolbar-link');
    if (toolbarElements.length > 0) {
        toolbarElements[0].href = 'https://apple.com/';
        if (toolbarElements.length > 1) {
            toolbarElements[1].href = 'https://google.com/';
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Set language
    const lang = getLanguageFromURL();
    setLanguage(lang);
    
    // Initialize subscription selection
    initSubscriptionSelection();
    
    // Initialize continue button
    initContinueButton();
    
    // Initialize toolbar links
    initToolbarLinks();
    
    // Re-check text overflow after a short delay to ensure layout is complete
    setTimeout(() => {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            checkTextOverflow(element, key);
        });
    }, 100);
    
    // Handle window resize for text scaling
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const elements = document.querySelectorAll('[data-i18n]');
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                checkTextOverflow(element, key);
            });
        }, 150);
    });
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            checkTextOverflow(element, key);
        });
    }, 200);
});

