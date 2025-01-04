/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.setState('user-logged');
        const modal = this.element.closest('.modal');
        if (modal) {
          Modal.close(modal.dataset.modalId);
        }
      } else {
        console.error(err || response.error);
        alert('Ошибка регистрации: ' + (response.error || 'Попробуйте снова.'));
      }
    });
  }
}