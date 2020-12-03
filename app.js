const express = require('express');
const bodyparser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const app = express();
app.use(bodyparser.urlencoded({
    extended: false
}));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Library API",
            version: '1.0.0',
        },
    },
    apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /home:
 *   get:
 *     description: Home Page
 *     responses:
 *       200:
 *         description: Success
 * 
 */
app.get('/home', (req, res) => {
    res.send("Hey there!!")
});


/**
 * @swagger
 * /home_post:
 *   post:
 *     description: Swagger Post
 *     parameters: 
 *      - name: name
 *        in: formData
 *        description: Your Name
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
app.post('/home_post', (req, res) => {
    const yourName = req.body.name;
    res.send("Hey, " + yourName + " have a nice day!")
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is live at ${PORT}`);
});