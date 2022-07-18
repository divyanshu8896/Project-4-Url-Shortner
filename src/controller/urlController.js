const urlModel = require('../model/urlModel')
const shortid = require('shortid')


const baseURL = "localhost:3000/"



//********************************************* createShortURL *********************************************** */


const createShortURL = async function (req, res){

        const urlBody = req.body
        const { longUrl } =  urlBody
        


        // if(Object.keys(urlBody).length == 0){

        //     return res.status(400).send({
        //         status: false,
        //         message: "empty feild can't accept"
        //     })

        // }

        if(!longUrl){
            return res.status(400).send({
                status: false,
                message: "Long URL is mandatory"
            })
        }



        if(/^(ftp|https?):\/\/+(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/.test(longUrl)){
            return res.status(400).send({
                status: false,
                message: "please enter the valid URL"
            })

        }
        const url = shortid.generate()

        const obj = {

            urlCode: url,
            shortUrl: baseURL + url,
            longUrl: longUrl
            }

        
       

        console.log(url);


        const urlData = await urlModel.create(obj)


        
        res.status(201).send({
            status:true,
            data: urlData
        })






} 



//********************************************* getURL *********************************************** */


const getURL = async function (req, res){


    const url = req.params.urlCode

    const findCode = await urlModel.findOne({urlCode:url})

    
    if(!findCode){
        return res.status(404).send({
            status: false,
            message: "url not found"
        })
    }





    // res.redirect(findCode.longUrl)

    res.status(200).send({
        status:true,
        data: findCode.longUrl,
        
    })
    
    return res.redirect(findCode.longUrl)
    

} 

module.exports.createShortURL = createShortURL
module.exports.getURL = getURL



