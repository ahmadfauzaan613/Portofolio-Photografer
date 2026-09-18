const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');

if (menuButton && menu) {
  const mobileNavigation = window.matchMedia('(max-width: 760px)');

  const setMenuState = (isOpen) => {
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menu.hidden = !isOpen;
    document.body.classList.toggle('menu-open', isOpen);
  };

  menuButton.addEventListener('click', () => {
    setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      menuButton.focus();
    }
  });

  const syncNavigation = () => {
    if (mobileNavigation.matches) {
      setMenuState(false);
    } else {
      menu.hidden = false;
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  };

  mobileNavigation.addEventListener('change', syncNavigation);
  syncNavigation();
}

const contactForm = document.querySelector('[data-contact-form]');
const formNotice = document.querySelector('[data-form-notice]');

if (contactForm && formNotice) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    formNotice.hidden = false;
    formNotice.focus();
  });
}
