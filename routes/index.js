var express = require('express');
var router = express.Router();
const Marker = require('../models/markers');
require('../models/connection')

router.post('/places', (req, res) => {
 
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
    Marker.find({nickname: req.params.nickname}).then(data => {
        res.json({ result: true, places: data })
    })
})

router.delete('/places', (req, res) => {
    Marker.deleteOne({nickname: req.body.nickname, name: req.body.name}).then((deletedDoc) => {
        if (deletedDoc.deletedCount > 0) {
            res.json({result : true})
        } else {
            res.json({ result: false, error: 'Place not found'})
        }
    })
})






module.exports = router;
