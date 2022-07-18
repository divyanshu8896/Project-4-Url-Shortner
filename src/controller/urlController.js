const urlModel = require('../model/urlModel')
const valid = require('../validation/validation')
const shortid = require('shortid')



const baseURL = "localhost:3000/"
const rexURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/



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
                message: "you have already shorted this URL"
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

        const findCode = await urlModel.findOne({ urlCode: url })


        if (!findCode) {
            return res.status(404).send({
                status: false,
                message: "url not found"
            })
        }





        // res.redirect(findCode.longUrl)

        // return res.status(302).send({
        //     status:true,
        //     data: findCode.longUrl,

        // })

        return res.redirect(findCode.longUrl, 302)


    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

module.exports.createShortURL = createShortURL
module.exports.getURL = getURL



