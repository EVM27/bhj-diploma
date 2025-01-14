/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.setState('user-logged');

        const modalElement = this.element.closest('.modal');
        if (modalElement) {
          const modalId = modalElement.dataset.modalId;
          const modal = App.getModal(modalId);

          if (modal) {
            modal.close();
          } else {
            console.error(`Модальное окно с ID "${modalId}" не найдено.`);
          }
        } else {
          console.error('Модальное окно для закрытия не найдено.');
        }
      } else {
        console.error(err || response.error);
        alert('Ошибка авторизации: ' + (response.error || 'Попробуйте снова.'));
      }
    });
  }
}