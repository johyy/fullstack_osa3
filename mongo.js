const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://johyy:${password}@cluster0.as1dcc1.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
];

/*
Person.insertMany(persons)
  .then(result => {
    console.log('persons saved!');
    return Person.find({});
  })
  .then(result => {
    result.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  });
*/

if (process.argv.length > 3) {
    const newPerson = new Person({
        name: name,
        number: number

    })

    newPerson.save().then(result => {
        console.log('added', name, 'number', number, 'to phonebook')
        mongoose.connection.close()
    })

} else {

    console.log('phonebook: ')
    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
