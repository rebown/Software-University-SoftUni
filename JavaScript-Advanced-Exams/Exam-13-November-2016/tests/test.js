
function createList() {
    let data = [];
    return {
        add: function (item) {
            data.push(item)
        },
        shiftLeft: function () {
            if (data.length > 1) {
                let first = data.shift();
                data.push(first);
            }
        },
        shiftRight: function () {
            if (data.length > 1) {
                let last = data.pop();
                data.unshift(last);
            }
        },
        swap: function (index1, index2) {
            if (!Number.isInteger(index1) || index1 < 0 || index1 >= data.length ||
                !Number.isInteger(index2) || index2 < 0 || index2 >= data.length ||
                index1 === index2) {
                return false;
            }
            let temp = data[index1];
            data[index1] = data[index2];
            data[index2] = temp;
            return true;
        },
        toString: function () {
            return data.join(", ");
        }
    };
}

let expect = require('chai').expect;

describe("test", function()  {
   let list;

   beforeEach(() => {
      list = createList();
   });

    describe("has data", () => {
        it("should be empty array", () => {
            expect(list.toString()).to.equal("");
        });
    });

    describe("test add function", () => {
       it("should add two numbers", () => {
           list.add('Pesho');
           list.add(5);
           let obj = {name: "gosho"};
           list.add(obj);
           expect(list.toString()).to.equal('Pesho, 5, [object Object]');
       });
    });

    describe("test shifting left", () => {
       it("should shift the number to left", () => {
           list.add(5);
           list.add(6);
           list.shiftLeft();
          expect(list.toString()).to.be.equal('6, 5');
       });
        it("now work with one parameter", () => {
            list.add(5);
            list.shiftLeft();
            expect(list.toString()).to.be.equal('5');
        });
    });

    describe("test shifting right", () => {
        it("should shift the number to right", () => {
            list.add(5);
            list.add(6);
            list.shiftRight();
            expect(list.toString()).to.be.equal('6, 5');
        });
        it("now work with one parameter", () => {
            list.add(5);
            list.shiftRight();
            expect(list.toString()).to.be.equal('5');
        });
    });

    describe("test swapping elements", () => {
       it("should check if the swap works", () => {
           list.add(5);
           list.add(6);

           //wrong first index
           expect(list.swap(-1,1)).to.be.equal(false);
           expect(list.swap(3,1)).to.be.equal(false);
           expect(list.swap(1.5,1)).to.be.equal(false);
           expect(list.swap('da',1)).to.be.equal(false);

           //wrong second index
           expect(list.swap(1,-1)).to.be.equal(false);
           expect(list.swap(1,3)).to.be.equal(false);
           expect(list.swap(1,1.5)).to.be.equal(false);
           expect(list.swap(1,2)).to.be.equal(false);
           expect(list.swap(1,'ne')).to.be.equal(false);

           //both indexes are wrong
           expect(list.swap(-3,-1)).to.be.equal(false);
           expect(list.swap(5,3)).to.be.equal(false);
           expect(list.swap(2.5,1.5)).to.be.equal(false);
           expect(list.swap(2,1)).to.be.equal(false);
           expect(list.swap('da','ne')).to.be.equal(false);

           //equal indexes
           expect(list.swap(1,1)).to.be.equal(false);

           //correct
           expect(list.swap(0,1)).to.be.equal(true);
       });
       it("should swap string with number", () => {
          list.add('one');
          list.add(1);
          list.swap(0,1);
          expect(list.toString()).to.equal('1, one');
       });
        it("should swap strings", () => {
            list.add('one');
            list.add('two');
            list.swap(0,1);
            expect(list.toString()).to.equal('two, one');
        });
        it("should not change the array", () => {
            list.add('one');
            list.add('two');
            list.swap(0,0);
            expect(list.toString()).to.equal('one, two');
        });
        it("should not change the array", () => {
            list.add('one');
            list.add('two');
            list.swap(-2,0);
            expect(list.toString()).to.equal('one, two');
        });
        it("should not change the array", () => {
            list.add('one');
            list.add('two');
            list.swap(0,5);
            expect(list.toString()).to.equal('one, two');
        });
    });

    describe("test return", () => {
       it("should return correct two numbers", () => {
           list.add(5);
           list.add(6);
           expect(list.toString()).to.equal('5, 6');
       }) ;

        it("should return empty array", () => {
            expect(list.toString()).to.equal('');
        }) ;
    });
});
