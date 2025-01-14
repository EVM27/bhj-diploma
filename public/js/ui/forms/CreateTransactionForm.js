/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsSelect = this.element.querySelector(".accounts-select");
    if (!accountsSelect) return;

    Account.list(User.current(), (err, response) => {
      if (response && response.success) {
        accountsSelect.innerHTML = ""; 
        response.data.forEach((account) => {
          const option = document.createElement("option");
          option.value = account.id;
          option.textContent = account.name;
          accountsSelect.appendChild(option);
        });
      } else {
        console.error(err || "Ошибка при загрузке списка счетов");
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    console.log("Отправляемые данные:", data);

  Transaction.create(data, (err, response) => {
    if (err) {
      console.error("Ошибка при создании транзакции:", err);
      return;
    }

    if (response && response.success) {
      console.log("Транзакция успешно создана:", response);
      this.element.reset();
      App.getModal("newIncome").close();
      App.getModal("newExpense").close();
      App.update();
    } else {
      console.error("Ошибка при создании транзакции:", response ? response.error : "Неизвестная ошибка");
    }
  });
  }
}