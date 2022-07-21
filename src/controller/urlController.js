const urlModel = require('../model/urlModel')
const shortid = require('shortid')

const baseURL = "localhost:3000/"
const rexURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

const redis = require("redis");

const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
  17605,
  "redis-17605.c264.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("yjw5qim7K0AWtzBfzURfNtfi24KzJmx5", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});



//1. connect to the server
//2. use the commands :

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);



//********************************************* createShortURL *********************************************** */
const createShortURL = async function (req, res) {

    try {
        const urlBody = req.body
        const { longUrl } = urlBody

        if (!longUrl) {
            return res.status(400).send({
                status: false,
                message: "Long URL is mandatory"
            })
        }

        if (!rexURL.test(longUrl)) {
            return res.status(400).send({
                status: false,
                message: "please enter the valid URL"
            })
        }

        const uniqueLongURL = await urlModel.findOne({ longUrl: longUrl })

        if (uniqueLongURL) {

            return res.status(400).send({
                status: false,
                message: "you have already shorted this URL",
                shortUrl: uniqueLongURL.shortUrl
            })
        }

        const url = shortid.generate()

        const uniqueURL = await urlModel.findOne({ urlCode: url })

        if (uniqueURL) {

            return res.status(400).send({
                status: false,
                message: "please enter the valid URL"
            })
        }

        let obj = {

            urlCode: url,
            shortUrl: baseURL + url,
            longUrl: longUrl
        }

        await urlModel.create(obj)

        return res.status(201).send({
            status: true,
            data: obj
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }

}


//********************************************* getURL *********************************************** */

const getURL = async function (req, res) {

    try {
        const url = req.params.urlCode

        if (!url) {
            return res.status(400).send({
                status: false,
                message: "shortUrl is missing"
            })
        }

        if (!shortid.isValid(url)) {
            return res.status(400).send({
                status: false,
                message: "invalid shortUrl"
            })
        }


        let cahcedURLData = await GET_ASYNC(`${req.params.urlCode}`)

        if(cahcedURLData) {
            return res.redirect(302, cahcedURLData)
        } else {
          let longUrlData = await urlModel.findOne({ urlCode: url });

          if (!longUrlData) {
            return res.status(404).send({
                status: false,
                message: "url not found"
            })
        }

          await SET_ASYNC(`${req.params.urlCode}`, longUrlData.longUrl)
          return res.redirect(302, longUrlData.longUrl)
        }


        
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

module.exports = { createShortURL, getURL }