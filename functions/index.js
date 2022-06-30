const functions = require("firebase-functions");
const express = require("express"); 
const cors = require("cors");
const stripe = require("stripe")('sk_test_51Ks5J4SCNecEda9Qqbsi81wjlBH5qC0c6CKpqjrWKlxsnA5zWZnr9oe8dlFuzQYzHYhpBsfmWNoM3atE6AjUL2mf00breWO4oz');
//sk_test_51Ks5J4SCNecEda9Qqbsi81wjlBH5qC0c6CKpqjrWKlxsnA5zWZnr9oe8dlFuzQYzHYhpBsfmWNoM3atE6AjUL2mf00breWO4oz
//API

// App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get('/', (request, response) => response.status(200).send('hello world'));
app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment Request Recieved for this amount >>>', total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "INR",
    });

    

    response.status(201).send({clientSecret:paymentIntent.client_secret,})
})
// - Listen command
exports.api = functions.https.onRequest(app);

//http://localhost:5001/challenge-3593b/us-central1/api

//
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//const stripe = require("stripe")('sk_testsk_test_51Ks5J4SCNecEda9Qqbsi81wjlBH5qC0c6CKpqjrWKlxsnA5zWZnr9oe8dlFuzQYzHYhpBsfmWNoM3atE6AjUL2mf00breWO4oz_51Ks5J4SCNecEda9Qqbsi81wjlBH5qC0c6CKpqjrWKlxsnA5zWZnr9oe8dlFuzQYzHYhpBsfmWNoM3atE6AjUL2mf00breWO4oz');