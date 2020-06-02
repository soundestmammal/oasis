const axios = require('axios');
const cors = require('cors');
const { yelp } = require('./config/keys');
const User = require('./models/User');
const auth = require('./middleware/auth');

module.exports = function (app) {

    app.get('/yelp', async(req, res) => {
        let lat = req.query.latitude;
        let lng = req.query.longitude;
        let searchbox = req.query.searchbox;
        const options = {
            headers: {'Authorization': yelp}
        }
        const response = await axios.get(`https://api.yelp.com/v3/businesses/search?term=${searchbox}&latitude=${lat}&longitude=${lng}`, options);
        const data = response.data.businesses;
        for(let i = 0; i < data.length; i++) {
                let newObject = {
                    name: data[i].name,
                    coordinates: data[i].coordinates,
                    location: data[i].location.display_address,
                    image: data[i].image_url,
                    price: data[i].price,
                    phone: data[i].phone,
                    categories: data[i].categories,
                    id: data[i].id
                };
                data[i] = {...newObject};
        }
        res.send(data);
    });

    app.get('/yelp/business/:id', async(req, res) => {
        const options = {
            headers: {'Authorization': yelp}
        }
        const response = await axios.get(`https://api.yelp.com/v3/businesses/${req.params.id}`, options);
        res.send(response.data);
    });

    // Forward for forward geocoding. The process of providing a string and receiving the gps information of a location
    // @ params from req.body
    // app.get('/forward', async(req, res) => {
    //     const { lat, lng, location } = req.body;
    //     const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&proximity=${lat},${lng}&key=${openCage}`);
    //     const returnMe = [];
    //     for(let i = 0; i < response.data.results.length; i++) {
    //         returnMe.push(response.data.results[i].formatted);
    //     }
    //     res.send(returnMe);
    // })

    /* Routes for user requests */

    // Create a new user - signup
    app.post('/users', async(req, res) => {
        console.log("This is the /users post route");
        const user = new User(req.body);

        try {
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({ user, token });
        } catch(e) {
            res.status(400).send(e);
        }
    });

    // Authenticate an existing user - login
    app.post('/users/login', async (req, res) => {
        try {
            // find the user
            const user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken();
            res.status(201).send({ user, token });
        } catch(e) {
            res.status(400).send();
        }
    });

    app.post('/users/logout', auth, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            });
            await req.user.save();
            console.log("I successfully logged out a user");
            res.status(201).send({text: "Success"});
        } catch (e) {
            res.status(500).send();
        }
    })
}