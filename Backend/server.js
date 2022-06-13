const express = require("express")
const app = express()
const mongoose = require("mongoose")
const env = require("dotenv")
const cors = require("cors")
const bcrypt = require('bcrypt')
const User = require("./models/register.model")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

env.config({ path: ".env" })

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { dbName: "Account" });
mongoose.connection.once("open", () => {
    console.log("MongoDB conncetion established !!")
})

app.post("/register", async (req, res) => {
    try {
        const userData = { ...req.body }

        // #####   CHECK IF USER ALREADY EXISTS  #####
        const data = await User.find({ email: userData.email })
        if (data.length) {
            res.sendStatus(409)
            return
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(userData.password, salt)
        userData.password = hashedPassword

        // #####   CREATE USER   #####
        User.create({ ...userData }, function (err, data) {
            if (err) {
                console.log(err)
                res.sendStatus(500)
                return
            }
            res.sendStatus(201)
            // saved!
        });
    } catch (error) {
        console.log(error)
    }

})

app.get("/login/:email/:password", async (req, res) => {
    const email = req.params.email
    const password = req.params.password
    if (!email.trim() || !password.trim()) {
        res.sendStatus(401)
        return
    }

    User.findOne({ email: email }, (err, data) => {
        try {
            if (err) {
                console.log(err)
                res.sendStatus(500)
            }
            if (data) {
                const isMatch = bcrypt.compareSync(password, data.password)
                if (isMatch) res.status(200).send(data)
                else res.sendStatus(401)
            } else {
                res.send("Please Register Yourself")
            }

        } catch (error) {
            console.log(error)
        }
    })
})
app.listen(4000, () => {
    console.log("Server is running")
})