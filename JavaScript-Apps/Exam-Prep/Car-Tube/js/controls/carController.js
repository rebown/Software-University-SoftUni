let carController = (() => {
    function loadCars() {
        // Request cars
        return requester.get('appdata', 'cars', 'kinvey');
    }

    function createCar(carInfo) {
        return requester.post('appdata', 'cars', 'kinvey', carInfo);
    }

    function loadCar(carId) {

        return requester.get('appdata', 'cars/' + carId, 'kinvey');
    }

    function editCar(carInfo, carId) {

        return requester.update('appdata','cars/' + carId, 'kinvey', carInfo);
    }

    function deleteCar(carId) {

        return requester.remove('appdata', 'cars/' + carId, 'kinvey');
    }
    //
    // function loadUser(){
    //
    //     return requester.get('user', sessionStorage.getItem('userId'), 'kinvey');
    // }


    return {
        loadCars,
        createCar,
        loadCar,
        editCar,
        deleteCar
    }
})();