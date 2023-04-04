const listDataBarang = require("./listDataBarang");

class onlineShopApp {
  constructor(dataBarang, dataCart) {
    this.dataBarang = dataBarang;
    this.dataCart = dataCart;
  }

  getDataBarang() {
    return this.dataBarang;
  }

  getDataCart() {
    return this.dataCart;
  }

  getDiscount(amount) {
    const typeAmount = typeof amount;
    if (typeAmount !== "number") {
      return false;
    }
    const discount = 10; //percent
    const minTotalPrice = 50000;
    const maxDiscount = 35000;
    let totalDiscount = 0;
    if (amount >= minTotalPrice) {
      totalDiscount = (amount * discount) / 100;
    }

    if (totalDiscount > maxDiscount) {
      totalDiscount = maxDiscount;
    }

    return totalDiscount;
  }

  selectBarang(id, total) {
    if (id === undefined || total === undefined) {
      return false;
    }
    id = parseInt(id);
    total = parseInt(total);
    const getIndex = this.dataBarang.findIndex((x) => x.id === id);
    if (getIndex < 0) {
      return "product not found";
    }

    if (this.dataBarang[getIndex].stock < total) {
      return "not enough stock";
    }

    const getDataBarang = this.dataBarang.find((x) => x.id === id);
    const selectedItem = {
      id: getDataBarang.id,
      name: getDataBarang.name,
      qty: total,
      tprice: getDataBarang.price * total,
    };

    this.dataCart.push(selectedItem);

    return `your selected ${selectedItem.name} total: ${total}`;
  }

  checkout() {
    const cart = this.dataCart;
    if (cart.length === 0) {
      return "cart is empty";
    }

    // decress stok product
    for (var i = 0; i < cart.length; i++) {
      const x = this.dataBarang.findIndex((x) => x.id === cart[i].id);
      if (x < 0) {
        return "product not found";
      }
      if (this.dataBarang[x].stock < cart[i].qty) {
        return "not enough stock";
      }
      this.dataBarang[x].stock = this.dataBarang[x].stock - cart[i].qty;
    }

    this.dataCart = [];
    let totalB = 0;
    let result = "Items: \n";
    cart.map((c) => {
      result += `${c.name} quantity ${c.qty} Total: Rp, ${c.tprice} \n`;
      totalB += c.tprice;
    });
    result += `Total, ${totalB}\nDiscount: ${this.getDiscount(
      parseInt(totalB)
    )}\nTotal Price: ${totalB - this.getDiscount(parseInt(totalB))}`;
    return result;
  }
}

// const tokoOL = new onlineShopApp(listDataBarang, []);
// console.log(tokoOL.selectBarang(1, 5));

// const tokoOL = new tokoOnline(listDataBarang, [
//   { id: 2, name: "rokok", stock: 50 },
// ]);

// console.log(tokoOL.checkout());
// setTimeout(() => {
//   tokoOL.getDataBarang().map((n) => {
//     console.log(` ${n.id} | ${n.name} | ${n.stock} `);
//   });
//   console.log(tokoOL.getDataCart());
// }, 300);

// console.log("-------------Transaction Toko Online-------------");
// console.log("-------------------------------------------------");
// console.log("-------------------Data Barang-------------------");
// console.log(" ID | NAME | STOCK ");
// tokoOL.getDataBarang().map((n) => {
//   console.log(` ${n.id} | ${n.name} | ${n.stock} `);
// });
// console.log("-------------------------------------------------");
// console.log("--");
// console.log("--");
// console.log("-------------------------------------------------");

// setTimeout(() => {
//   console.log("Transaction");
//   console.log(tokoOL.selectBarang(1, 5), tokoOL.selectBarang(2, 10));
//   console.log("-------------------Cart Data-------------------");
//   console.log(" ID | NAME | STOCK ");
//   tokoOL.getDataCart().map((n) => {
//     console.log(` ${n.id} | ${n.name} | ${n.stock} `);
//   });
// }, 3000);

module.exports = onlineShopApp;
