const mongoose = require('mongoose');
const User = require('./models/User')


const start  = async () => {
  try {

mongoose.connection.on('error', err => {
    console.log(1234356567, err)
    logError(err);
  }).on('open', async () => {
    console.log('Once opemn')
    try {
      // Обновление всех документов в коллекции
      // await User.updateMany({}, {$unset : {todo: 1}});
      await User.updateMany({}, { $unset: { todos: 1 } });

    // Удаление всех пустых массивов "todo" (если есть)
    await User.updateMany({ todos: { $exists: true, $size: 0 } }, { $unset: { todos: 1 } });
  
      console.log('Миграция данных завершена успешно.');
  
      // Закрыть соединение с базой данных
      mongoose.connection.close();
    } catch (error) {
      console.error('Ошибка миграции данных:', error);
    }
  });

  await mongoose.connect('mongodb://localhost:27017/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

} catch(e) {
  console.log(e)
}
}

start()


