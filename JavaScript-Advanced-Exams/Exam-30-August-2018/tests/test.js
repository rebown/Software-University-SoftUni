let expect = require("chai").expect;
let HolidayPackage = require('../HolidayPackage');

describe("TESTS", function() {
    it("should be initialiased with TWO STRING params", function() {
        let holidayPackage = new HolidayPackage('Italy', 'Summer');
        expect(holidayPackage.destination).to.equal('Italy');
        expect(holidayPackage.season).to.equal('Summer');
        expect(typeof holidayPackage.destination).to.equal('string');
        expect(typeof holidayPackage.season).to.equal('string');
    });
    it("insuranceIncluded should get default value",function() {
        let holidayPackage = new HolidayPackage('Italy', 'Summer');
        expect(holidayPackage._insuranceIncluded).to.equal(false);

    });
    it("insuranceIncluded should set devalue true",function() {
        let holidayPackage = new HolidayPackage('Italy', 'Summer');
        holidayPackage._insuranceIncluded = 'true';
        expect(holidayPackage._insuranceIncluded).to.equal('true');

    });
    // it("insuranceIncluded should throw error for not boolean value",function() {
    //     let holidayPackage = new HolidayPackage('Italy', 'Summer');
    //     holidayPackage.insuranceIncluded = 5;
    //     expect(holidayPackage.insuranceIncluded).to.equal(new Error('Insurance status must be a boolean'));
    //
    // });
    describe("showVacationer TEST", function() {
        it("it should show 1 vacationer correctly", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');
            holidayPackage.addVacationer('Ivan Ivanov');
            expect(holidayPackage.showVacationers()).to.equal("Vacationers:\n" +"Ivan Ivanov")
        })
        it("it should show 2 vacationers correctly", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Joro Ivanov');
            expect(holidayPackage.showVacationers()).to.equal("Vacationers:\n" +"Ivan Ivanov\n"+"Joro Ivanov")
        })
        it("should return error if no vacationers", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');
            expect(holidayPackage.showVacationers()).to.equal("No vacationers are added yet");
        })
    })
    describe("addVacationer TEST", function() {
        it("it should add  vacationer correctly", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Joro Ivanov');
            expect(holidayPackage.vacationers[0]).to.equal("Ivan Ivanov")
            expect(holidayPackage.vacationers[1]).to.equal("Joro Ivanov")
        })
        it("it should throw error if invalid name", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');
            expect(() => holidayPackage.addVacationer(5)).to.throw()
            expect(() => holidayPackage.addVacationer(' ')).to.throw()
            expect(() => holidayPackage.addVacationer()).to.throw()

            expect(() => holidayPackage.addVacationer('Ivan')).to.throw()
            expect(() => holidayPackage.addVacationer('Ivan Mitev Dadoov')).to.throw()
        })
    })
    describe("generateHolidayPackage TEST",function() {
       it("should throw error if vacationer length < 1", function() {
           let holidayPackage = new HolidayPackage('Italy', 'Summer');
           expect(() => holidayPackage.generateHolidayPackage()).to.throw()
       })
        it("should calulate correct if season is Winter no insurance", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Winter');
            holidayPackage.addVacationer('Ivan Ivanov');
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: Italy\nVacationers:\nIvan Ivanov\nPrice: 600")
        })
        it("should calulate correct if season is Autumn  no insurance", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Autumn');
            holidayPackage.addVacationer('Ivan Ivanov');
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: Italy\nVacationers:\nIvan Ivanov\nPrice: 400")
        })
        it("should calulate correct if season is Spring  no insurance", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Autumn');
            holidayPackage.addVacationer('Ivan Ivanov');
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: Italy\nVacationers:\nIvan Ivanov\nPrice: 400")
        })
        it("should calulate correct if season is Autumn  with insurance", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Autumn');
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: Italy\nVacationers:\nIvan Ivanov\nPrice: 500")
        })
        it("should calulate correct if season is Spring  no insurance", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Spring');
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: Italy\nVacationers:\nIvan Ivanov\nPrice: 500")
        })
        it("should calulate correct if season is Summer no insurance", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');
            holidayPackage.addVacationer('Ivan Ivanov');
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: Italy\nVacationers:\nIvan Ivanov\nPrice: 600")
        })
        it("should calulate correct if season is Summer or Winter with insurance", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: Italy\nVacationers:\nIvan Ivanov\nPrice: 700")
        })
        it("should throw error if no vacationers", function() {
            let holidayPackage = new HolidayPackage('Italy', 'Summer');
            expect(() => holidayPackage.generateHolidayPackage()).to.throw()
        })

    });

});


// let holidayPackage = new HolidayPackage('Italy', 'Summer');
//
// console.log(holidayPackage.showVacationers());
//
// // should throw an error
// try {
//     holidayPackage.generateHolidayPackage();
// } catch (err) {
//     console.log('Error: ' + err.message);
// }
//
// // should throw an error
// try {
//     holidayPackage.addVacationer('');
// } catch (err) {
//     console.log('Error: ' + err.message);
// }
//
// // should throw an error
// try {
//     holidayPackage.addVacationer('Ivan');
// } catch (err) {
//     console.log('Error: ' + err.message);
// }
//
// holidayPackage.addVacationer('Ivan Ivanov');
// holidayPackage.addVacationer('Petar Petrov');
// holidayPackage.addVacationer('Georgi Georgiev');
//
// console.log(holidayPackage.showVacationers());
//
// // should throw an error
// try {
//     holidayPackage.insuranceIncluded = 'true';
// } catch (err) {
//     console.log('Error: ' + err.message);
// }
//
// holidayPackage.insuranceIncluded = true;
//
// console.log(holidayPackage.generateHolidayPackage());
