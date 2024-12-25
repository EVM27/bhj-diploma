/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggleButton = document.querySelector(".sidebar-toggle"); 
    const body = document.body; 

    if (toggleButton) { 
      toggleButton.addEventListener("click", (event) => {
        event.preventDefault(); 
       
        if (body.classList.contains("sidebar-open")) {
          body.classList.remove("sidebar-open");
          body.classList.add("sidebar-collapse");
        } else {
          body.classList.remove("sidebar-collapse");
          body.classList.add("sidebar-open");
        }
      });
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const loginButton = document.querySelector(".menu-item_login");
    const registerButton = document.querySelector(".menu-item_register");
    const logoutButton = document.querySelector(".menu-item_logout");

    if (loginButton) {
      loginButton.addEventListener("click", (event) => {
        event.preventDefault();
        const loginModal = App.getModal("login");
        if (loginModal) loginModal.open();
      });
    }

    if (registerButton) {
      registerButton.addEventListener("click", (event) => {
        event.preventDefault();
        const registerModal = App.getModal("register");
        if (registerModal) registerModal.open();
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener("click", (event) => {
        event.preventDefault();
        User.logout((err, response) => {
          if (response && response.success) {
            App.setState("init");
          }
        });
      });
    }
  }
  }
//так и не газобрался, почему не работает гамбургер 

