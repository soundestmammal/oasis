const getAllGF = require('./getAllGF');
/**
 * This is the list ranking algorithm
 * @params  An array of Businesses from Yelp
 * @returns A ranked array of Businesses 
 */

module.exports = async function algorithm(businesses, userLocation) {
    let counter = 0;
    const oneCategories = ["Mexican", "Indian"];
    const zeroCategories = ["Italian", "Pizza"];

    function distance(businessLocation, userLocation){
        let latDiff = userLocation.latitude - businessLocation.latitude;
        let longDiff = userLocation.longitude - businessLocation.longitude;
        let distanceInGPS = Math.sqrt(Math.pow(latDiff, 2) + Math.pow(longDiff, 2));
        return distanceInGPS;
    }

    /**
     * 
     * @param {Object} userLocation 
     * @returns Array{Business} with len >= 0
     * 
     */

    async function queryGlutenFree(userLocation, distance) {
        let glutenFree = await getAllGF();
        for (let i = 0; i < glutenFree.length; i++) {
            let thisDistance = distance(glutenFree[i].coordinates, userLocation);
            glutenFree[i]["distance"] = thisDistance;
        }
        glutenFree = glutenFree.filter((biz) => biz.distance < 1);
        glutenFree.sort((a,b) => a.distance-b.distance);
        counter = glutenFree.length;
        return glutenFree;
    }

    function score(business) {
        for (let i = 0; i < business.categories.length; i++) {
            if (business["categories"][i].title === oneCategories[0] || business["categories"][i].title === oneCategories[1]) {
                return 2;
            } else if (business["categories"][i].title === zeroCategories[0] || business["categories"][i].title === zeroCategories[1]) {
                return 0;
            } else if (business["categories"][i].title === "Gluten-Free") {
                return 3;
            }
        }
        return 1;
    }

    for (let i = 0; i < businesses.length; i++) {
        businesses[i]["score"] = score(businesses[i]);
    }

    const returnMe = [...await queryGlutenFree(userLocation, distance)];
    for (let i = 0; i < returnMe.length; i++){
        returnMe[i]["score"] = 10;
    }

    for (let i = 0; i < businesses.length; i++) {
        if (businesses[i].score === 3) {
            returnMe.push(businesses[i]);
        }
    }

    for (let i = 0; i < businesses.length; i++) {
        if (businesses[i].score === 2) {
            returnMe.push(businesses[i]);
        }
    }

    for (let i = 0; i < businesses.length; i++) {
        if (businesses[i].score === 1) {
            returnMe.push(businesses[i]);
        }
    }

    for (let i = 0; i < businesses.length; i++) {
        if (businesses[i].score === 0) {
            returnMe.push(businesses[i]);
        }
    }

    returnMe.splice(10, 20);
    return returnMe;
}