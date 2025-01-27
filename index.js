require('dotenv').config();
const { PORT, PUBLIC_PATH, INDEX_FILE } = process.env;
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');//ttt
const cookieSession = require('cookie-session');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync', {
    serialize: (data) => encrypt(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decrypt(data))
  });
const db = low(new FileSync('db.json'));
if(!db.get('users').value())
    setDefaultUser(db);

const app = express();
app.use(express.static(`${__dirname}/${PUBLIC_PATH}`));

app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['authorized', 'login'],
}));

const api = require('./routes');
app.use('/', api);
app.use(morgan('tiny'));

app.get('*', function (_, res) {
    res.sendFile(path.resolve(`${__dirname}/${PUBLIC_PATH}`, INDEX_FILE));
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));


function setDefaultUser(database){
    database.defaults({
        users: [
          { name: "demo", email: "demo@demo", password: "demo", id: "1" }
        ],
        accounts: [
          { name: "Банк", user_id: "1", id: "1" },
          { name: "Магазин", user_id: "1", id: "2" },
          { name: "Бизнес", user_id: "1", id: "3" }
        ],
        transactions: [
            { account_id: "1", created_at: "2019-09-15 10:24:02", id: "1", name: "Кредит", sum: 5000, type: "expense", user_id: "1" },
            { account_id: "1", created_at: "2019-09-17 15:53:02", id: "2", name: "Баланс на дебетовке", sum: 3200, type: "income", user_id: "1" },
            { account_id: "1", created_at: "2019-09-19 20:12:02", id: "3", name: "Копилка", sum: 1500, type: "income", user_id: "1" },
            { account_id: "2", created_at: "2019-09-26 16:23:02", id: "4", name: "Молочные продукты", sum: 100, type: "income", user_id: "1" },
            { account_id: "2", created_at: "2019-09-25 15:03:02", id: "5", name: "Фрукты", sum: 250, type: "income", user_id: "1" },
            { account_id: "2", created_at: "2019-09-25 15:03:02", id: "17", name: "Овощи", sum: 300, type: "income", user_id: "1" },
            { account_id: "2", created_at: "2019-09-26 14:47:02", id: "6", name: "Мясо", sum: 600, type: "income", user_id: "1" },
            { account_id: "2", created_at: "2019-09-27 13:27:02", id: "7", name: "Долг в банк", sum: 5000, type: "expense", user_id: "1" },
            { account_id: "3", created_at: "2017-10-15 13:27:02", id: "9", name: "На банду", sum: 15000, type: "expense", user_id: "1" },
            { account_id: "3", created_at: "2017-09-17 13:27:02", id: "10", name: "На стволы", sum: 6000, type: "expense", user_id: "1" },
            { account_id: "3", created_at: "2017-12-27 13:27:02", id: "11", name: "Прибыль с банка", sum: 1500000, type: "income", user_id: "1" },
            { account_id: "3", created_at: "2018-01-15 13:27:02", id: "12", name: "Прибыль с магазина", sum: 300000, type: "income", user_id: "1" },
            { account_id: "3", created_at: "2018-01-15 13:27:02", id: "13", name: "Подарок сизого", sum: 20000, type: "income", user_id: "1" },
            { account_id: "3", created_at: "2017-09-15 13:27:02", id: "14", name: "На охрану", sum: 60000, type: "expense", user_id: "1" },
            { account_id: "3", created_at: "2017-10-15 13:27:02", id: "15", name: "На бумер", sum: 300000, type: "expense", user_id: "1" }
        ]
      }).write()
}
