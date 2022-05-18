const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;

const deepClone = require("../src/index");
describe("deepClone", () => {
  it("是一个函数", () => {
    assert.isFunction(deepClone);
  });

  it("能复制基本类型", () => {
    const number = 123;
    const numberClone = deepClone(number);
    assert(number === numberClone);

    const string = "123123";
    const stringClone = deepClone(string);
    assert(string === stringClone);

    const boolean = true;
    const booleanClone = deepClone(boolean);
    assert(boolean === booleanClone);

    const u = undefined;
    const uClone = deepClone(u);
    assert(u === uClone);

    const empty = null;
    const emptyClone = deepClone(empty);
    assert(empty === emptyClone);

    const symbol = Symbol();
    const symbolClone = deepClone(symbol);
    assert(symbol === symbolClone);

    describe("对象", () => {
      it("能够复制「普通对象」", () => {
        const object = {
          name: "Jason",
          child: {
            name: "Jack",
          },
        };

        const objectClone = deepClone(object);
        assert(object !== objectClone);
        assert(object.name === objectClone.name);
        assert(object.child.name === objectClone.child.name);
      });

      it("能够复制「数组对象」", () => {
        const array = [
          [11, 12],
          [21, 22],
          [31, 32],
        ];
      });

      it("能够复制「函数对象」", () => {
        const functionOrigin = function (x, y) {
          return x + y;
        };
        functionOrigin.a = {
          yyy: {
            zzz: 1,
          },
        };
        const functionClone = deepClone(functionOrigin);
        assert(functionOrigin !== functionClone);
        assert(functionOrigin.a !== functionClone.a);
        assert(functionOrigin.a.yyy !== functionClone.a.yyy);
        assert(functionOrigin.a.yyy.zzz === functionClone.a.yyy.zzz);
        assert(functionOrigin(1, 2) === functionClone(1, 2));
      });
    });
  });
});
