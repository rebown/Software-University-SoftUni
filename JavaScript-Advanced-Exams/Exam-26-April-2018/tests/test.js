let expect = require('chai').expect;
let SubscriptionCard = require('../2.SubscriptionCard');


describe("TEST", function() {
    //checking the constructor
    it("should be working correct with  initialiased with 3 parameters", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        expect(card.firstName).to.equal("Pesho");
        expect(card.lastName).to.equal("Petrov");
        expect(card.SSN).to.equal("00000000");
    });
    it("should be undefined if no params are sent", function() {
        let card = new SubscriptionCard();
        expect(card.firstName).to.equal(undefined);
        expect(card.lastName).to.equal(undefined);
        expect(card.SSN).to.equal(undefined);
    });
    it("should return old value for first name if tried to be change", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.firstName = "Gosho";
        expect(card.firstName).to.equal("Pesho");
    });
    it("should return old value for last name if tried to be change", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.lastName = "Petrov";
        expect(card.lastName).to.equal("Petrov");
    });
    it("should return old value for SSN if tried to be change", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.SSN = "11111";
        expect(card.SSN).to.equal("00000000");
    });

    //Checking if the card is blocked
    it("should return false card is not blocked", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-05-25'), new Date('2018-06-24'));
        expect(card.isBlocked).to.equal(false);
    });
    it("should return false card is not added", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        expect(card.isBlocked).to.equal(false);
    });
    it("should return true if card is blocked", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-05-25'), new Date('2018-06-24'));
        card.block();
        expect(card.isBlocked).to.equal(true);
    });
    it("should return true if card is blocked", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-05-25'), new Date('2018-06-24'));
        card.block();
        card.unblock();
        expect(card.isBlocked).to.equal(false);
    });
    it("should return true if card is blocked", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-05-25'), new Date('2018-06-24'));
        card.unblock();
        card.block();
        expect(card.isBlocked).to.equal(true);
    });
    //block unblock

    //Check if adding the subscription works
    it("should add subscription correct", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-05-25'), new Date('2018-06-24'));
        expect(card._subscriptions[0].line).to.eql('120');
        expect(card._subscriptions.length).to.equal(1);
        expect(card._subscriptions[0].startDate).to.eql(new Date('2018-05-25'));
        expect(card._subscriptions[0].endDate).to.eql(new Date('2018-06-24'));
    });
    it("should add subscription correct", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-05-25'), new Date('2018-06-24'));
        card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
        expect(card._subscriptions[0].line).to.eql('120');
        expect(card._subscriptions[0].startDate).to.eql(new Date('2018-05-25'));
        expect(card._subscriptions[0].endDate).to.eql(new Date('2018-06-24'));
        expect(card._subscriptions[1].line).to.eql('*');
        expect(card._subscriptions.length).to.equal(2);
        expect(card._subscriptions[1].startDate).to.eql(new Date('2018-05-25'));
        expect(card._subscriptions[1].endDate).to.eql(new Date('2018-06-24'));
    });
    it("should receive undefined if no subscribtion", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        expect(card._subscriptions.length).to.equal(0);
        expect(card._subscriptions[0]).to.eql(undefined);
        expect(card._subscriptions).to.eql([]);
    });

    //isValid
    it("should return false if card is empty", function() {
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        expect(card.isValid('120', new Date('2018-04-22'))).to.equal(false);
    });
    it("should return true if details are correct", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120', new Date('2018-04-22'))).to.equal(true);

    });
    it("should return false if it is one day before the date", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120', new Date('2018-04-21'))).to.equal(false);

    });
    it("should return fase if it is one day after the date", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120', new Date('2018-05-22'))).to.equal(false);

    });
    it("should return true if it is on the date", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120', new Date('2018-04-22'))).to.equal(true);

    });
    it("should return true if it is on the end date", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120',new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('130', new Date('2018-05-21'))).to.equal(false);
    });


    it("should return true if it is inside", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120',new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120', new Date('2018-05-10'))).to.equal(true);

    });
    it("should return false if line is different", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120',new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('121', new Date('2018-05-10'))).to.equal(false);

    });

    it("should return true with *", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('*',new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('121', new Date('2018-03-23'))).to.equal(false);

    });
    it("should return false when card is blocked", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.block();
        card.addSubscription('*',new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('121', new Date('2018-04-23'))).to.equal(false);

    });



    it("should return true on start date with *", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('*',new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120',new Date('2018-04-22'))).to.equal(true);

    });
    it("should return true on end date with *", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('*',new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120',new Date('2018-05-21'))).to.equal(true);

    });
    it("should return false before start date with *", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('*',new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120',new Date('2018-04-21'))).to.equal(false);

    });
    it("should return false after end date with *", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('*',new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120',new Date('2018-05-22'))).to.equal(false);

    });


    it("should return true if the card is blocked", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.block();
        expect(card.isBlocked).to.equal(true);

    });
    it("should return false if the card is unblocked", function(){
        let card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.unblock();
        expect(card.isBlocked).to.equal(false);

    });
});


// const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
// card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
// c
// card.block();
// card.unblock();
// console.log(card.isValid('120', new Date('2018-04-22')));
// card.firstName = 'Gosho';
// console.log(card.firstName);

