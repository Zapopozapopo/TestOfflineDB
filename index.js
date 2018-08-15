const db = require('./offlineDatabase')

const id = db.ref( "users" ).push({name: "Alice" , email: "alice@email.com"});
console.log(id);

const id2 = db.ref( "users" ).push({name: "Bob" , address: {city: "New York" ,country: "US" }});
console.log(id2);

db.ref( "users/ID1" ).once(console.log);

db.ref( "users/ID2/address/city" ).once(console.log);
db.ref( "users/ID2" ).once(console.log);

db.ref( "users/ID2/address" ).remove();

db.ref( "users/ID2" ).once(console.log);

db.ref( "users" ).remove();

db.ref( "users" ).once(console.log);