var express = require('express');
var router = express.Router();


const Marker = require('../models/markers');
const { checkBody } = require('../modules/checkBody')

//test
router.post('/places', (req, res) => {

    if (!checkBody(req.body, ['nickname', "name", "latitude", 'longitude'])){
        res.json({result: false, error: 'Missing or empty fields'})
        return
    }
 
            const newMarker =  new Marker({
                nickname : req.body.nickname,
                name: req.body.name,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
            })
            newMarker.save().then(() => {
                res.json({result : true})
            })
        })


router.get('/places/:nickname', (req, res) => {
    Marker.find({nickname: {$regex: new RegExp(req.params.nickname, "i") }}).then(data => {
        res.json({ result: true, places: data })
    })
})

router.delete('/places', (req, res) => {
    if (!checkBody(req.body, [ 'nickname', "name" ])){
        res.json({result: false, error: 'Missing or empty fields'})
        return
    }

    Marker.deleteOne({nickname:{ $regex: new RegExp(req.body.nickname, "i")}, name: req.body.name}).then((deletedDoc) => {
        if (deletedDoc.deletedCount > 0) {
            res.json({result : true})
        } else {
            res.json({ result: false, error: 'Place not found'})
        }
    })
})






module.exports = router;
