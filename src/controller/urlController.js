

//********************************************* createShortURL *********************************************** */

const createShortURL = function (req, res){

        const urlBody = req.body


        if(Object.keys(urlBody).length == 0){

            return res.status(400).send({
                status: false,
                message: "empty feild can't accept"
            })

        }

        

        







} 



//********************************************* getURL *********************************************** */


const getURL = function (req, res){



} 

module.exports.createShortURL = createShortURL
module.exports.getURL = getURL



