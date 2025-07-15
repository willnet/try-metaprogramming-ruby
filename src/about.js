import { LanguageManager } from './i18n.js';

// About page specific translations
const aboutTranslations = {
  ja: {
    aboutPageTitle: 'About - メタプログラミングクイズ',
    backToQuiz: 'クイズに戻る'
  },
  en: {
    aboutPageTitle: 'About - Ruby Metaprogramming Quiz',
    backToQuiz: 'Back to Quiz'
  }
};

class AboutApp {
  constructor() {
    this.languageManager = new LanguageManager();
    this.init();
  }

  init() {
    this.setupLanguageToggle();
    this.setupLanguageDisplay();
    this.updateLanguageDisplay();
  }

  setupLanguageToggle() {
    const languageButtons = document.querySelectorAll('.language-btn');
    
    languageButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const lang = e.currentTarget.dataset.lang;
        this.languageManager.setLanguage(lang);
        this.updateLanguageButtons();
        this.updateLanguageDisplay();
      });
    });

    // Set initial active button
    this.updateLanguageButtons();
  }

  updateLanguageButtons() {
    const currentLang = this.languageManager.getCurrentLanguage();
    const buttons = document.querySelectorAll('.language-btn');
    
    buttons.forEach(button => {
      if (button.dataset.lang === currentLang) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  setupLanguageDisplay() {
    this.languageManager.onLanguageChange(() => {
      this.updateLanguageDisplay();
    });
  }

  updateLanguageDisplay() {
    const currentLang = this.languageManager.getCurrentLanguage();
    
    // Update elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      
      // Check about page specific translations first
      if (aboutTranslations[currentLang] && aboutTranslations[currentLang][key]) {
        element.textContent = aboutTranslations[currentLang][key];
      } else {
        // Fall back to main translations
        element.textContent = this.languageManager.t(key);
      }
    });

    // Update page title
    const titleElement = document.querySelector('title');
    if (titleElement) {
      titleElement.textContent = aboutTranslations[currentLang].aboutPageTitle;
    }

    // Show/hide content based on language
    const aboutSections = document.querySelectorAll('.about-section');
    aboutSections.forEach(section => {
      const sectionLang = section.getAttribute('data-lang');
      if (sectionLang === currentLang) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AboutApp();
});