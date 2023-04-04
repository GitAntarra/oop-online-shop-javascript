const { createInterface } = require("readline");

const onlineShopApp = require("./onlineShopApp");
const listDataBarang = require("./listDataBarang");
const userData = require("./userData");

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tokoOL = new onlineShopApp(listDataBarang, []);

const readLineAsync = (msg) => {
  return new Promise((resolve) => {
    readline.question(msg, (userRes) => {
      resolve(userRes);
    });
  });
};

const startApp = async () => {
  console.log(`Welcome to TestImplementation TB1:`);
  const username = await readLineAsync("Username: ");
  const password = await readLineAsync("Password: ");

  let credential = false;
  await Promise.all(
    userData.map(async (n) => {
      if (n.username === username && n.password === password) {
        credential = true;
      }
    })
  );

  if (credential) {
    console.log(`Welcome ${username}`);
    showProducts();
  } else {
    console.log(`Login Failed, Login again!`);
    startApp();
  }
};

const selectedItem = async () => {
  const id = await readLineAsync("ID product: ");
  const qty = await readLineAsync("Quantity: ");
  const resultSelect = tokoOL.selectBarang(id, qty);
  console.log(resultSelect);
  const moreItem = await readLineAsync("More Item: \n 1. Yes\n 2. No\n");
  if (moreItem === "1") {
    selectedItem();
  } else {
    questionAll();
  }
};

const showProducts = async () => {
  console.log("-------------------List Product------------------");
  console.log(" ID | NAME | STOCK ");
  tokoOL.getDataBarang().map((n) => {
    console.log(` ${n.id} | ${n.name} | ${n.stock} | ${n.price}  `);
  });
  console.log("-------------------------------------------------");

  questionAll();
};

const showCart = async () => {
  console.log("-------------------List Cart---------------------");
  tokoOL.getDataCart().map((n) => {
    console.log(` ${n.id} | ${n.name} | ${n.qty} | ${n.tprice}  `);
  });
  console.log("-------------------------------------------------");
  questionAll();
};

const checkOut = async () => {
  console.log("-------------------Check Out---------------------");
  const h = await tokoOL.checkout();
  console.log(h);
  console.log("-------------------------------------------------");
  questionAll();
};

const questionAll = async () => {
  const userRes = await readLineAsync(
    "Select option: \n 1. Show Products\n 2. Show Cart\n 3. Checkout\n 4. Select Item\nType Number options: "
  );
  if (userRes === "1") {
    showProducts();
  }
  if (userRes === "2") {
    showCart();
  }
  if (userRes === "3") {
    checkOut();
  }
  if (userRes === "4") {
    selectedItem();
  }
  readline.close;
};

startApp();
