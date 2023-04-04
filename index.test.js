const tokoOnline = require("./index");
const listDataBarang = require("./listDataBarang");

describe("some module", () => {
  const tokoOL = new tokoOnline(listDataBarang, []);

  test("Return a tokoOnline as object", function () {
    expect(typeof tokoOL).toBe("object");
  });

  describe("Module selected product", () => {
    const id = 1;
    const total = 8;
    const selectedData = listDataBarang.find((x) => x.id === id);
    // const product = tokoOL.getDataBarang();
    let cart = [];
    let tobeIt = !selectedData ? "product not found" : false;
    if (!tobeIt) {
      tobeIt = selectedData.stock < total ? "not enough stock" : false;
    }
    if (!tobeIt) {
      tobeIt = `your selected ${selectedData.name} total: ${total}`;
      //   const i = listDataBarang.findIndex((x) => x.id === id);
      //   product[i].stock = product[i].stock - total;

      selectedData.stock = total;
      cart.push(selectedData);
    }
    it("Selected with 3 cases ('not found', 'not enough stock', 'success')", () => {
      expect(tokoOL.selectBarang(id, total)).toBe(tobeIt);
    });

    // test("Check product after selected product", () => {
    //   expect(tokoOL.getDataBarang()).toBe(product);
    // });

    it("Check cart after selected product", () => {
      expect(JSON.stringify(tokoOL.getDataCart())).toBe(JSON.stringify(cart));
    });
  });

  describe("Module Checkout normal case after transaction", () => {
    const cart = tokoOL.getDataCart();
    const dataBarang = tokoOL.getDataBarang();
    let tobeCart = "transaction success";
    if (!cart) {
      tobeCart = "cart is empty";
    }

    // decress stok product
    for (var i = 0; i < cart.length; i++) {
      const x = dataBarang.findIndex((x) => x.id === cart[i].id);
      if (x < 0) {
        tobeCart = "product not found";
        break;
      }
      if (dataBarang[x].stock < cart[i].stock) {
        tobeCart = "not enough stock";
        break;
      }
    }

    it("get checkout", () => {
      expect(tokoOL.checkout()).toBe(tobeCart);
    });

    it("list cart become empty", () => {
      expect(JSON.stringify(tokoOL.getDataCart())).toBe(JSON.stringify([]));
    });
  });

  describe("Module Checkout anomali case *out of stock*", () => {
    const tokoOL2 = new tokoOnline(listDataBarang, [
      { id: 2, name: "rokok", stock: 50 },
    ]);

    it("get checkout", () => {
      expect(tokoOL2.checkout()).toBe("not enough stock");
    });
  });

  describe("Module Checkout anomali case *product deleted*", () => {
    const tokoOL2 = new tokoOnline(listDataBarang, [
      { id: 5, name: "bubur", stock: 50 },
    ]);

    it("get checkout", () => {
      expect(tokoOL2.checkout()).toBe("product not found");
    });
  });

  describe("Module Checkout anomali case *not product selected*", () => {
    const tokoOL2 = new tokoOnline(listDataBarang, []);

    it("get checkout", () => {
      expect(tokoOL2.checkout()).toBe("cart is empty");
    });
  });

  test("Case not input param id or total", function () {
    expect(tokoOL.selectBarang()).toBe(false);
  });

  test("When type exception number", function () {
    expect(tokoOL.getDiscount("1000000")).toBe(false);
  });

  test("Return discount", function () {
    expect(tokoOL.getDiscount(1000000)).toBe(35000);
  });

  test("Return discount", function () {
    expect(tokoOL.getDiscount(1000000)).toBe(35000);
  });

  test("Return discount", function () {
    expect(tokoOL.getDiscount(30000)).toBe(0);
  });
});
