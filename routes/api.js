var express = require('express');
var router = express.Router();
// index is default file if no file specified
var controllers = require('../controllers/index.js');

router.get('/:resource', function(req, res, next) {
    
    var resource = req.params.resource;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource Request: ' + resource
        });
        return
    }
    
    controller
    .get(req.query)
    .then(function(results) {
        res.json({
            confirmation: 'success',
            results: results
        });
    })
    .catch(function(err) {
        res.json({
            confirmation: 'fail',
            message: err
        })
    });
});


router.get('/:resource/:id', function(req, res, next) {
    
    var resource = req.params.resource;
    var id = req.params.id;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource Request: ' + resource
        });
        return
    }
    
    // result is the payload
    controller
    .getById(id)
    .then(function(result) {      
        res.json({
            confirmation: 'success',
            result: result
        });
    })
    .catch(function(err) {
        res.json({
            confirmation: 'fail',
            message: err
        })
    });    
});

router.post('/:resource', function(req, res, next) {

    var resource = req.params.resource;
    var controller = controllers[resource];    
    
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource Request: ' + resource
        });
        return
    }
    
    controller
    .post(req.body)
    .then(function(result) {
        res.json({
            confirmation: 'success',
            message: result
        });
    })
    .catch(function(err) {
        res.json({
            confirmation: 'fail',
            message: err
        });
    });
});

router.delete('/:resource/:id', function(req, res, next) {
    
    var resource = req.params.resource;
    var id = req.params.id;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource Request: ' + resource
        });
        return
    }
    
    // result is the payload
    controller
    .delete(id)
    .then(function(id) {       
        res.json({
            confirmation: 'success',
            message: id
        });
    })
    .catch(function(err) {
        res.json({
            confirmation: 'fail',
            message: err
        });
    });
    
});

router.put('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource Request: '+resource
		})

		 return
	}

	controller
    .put(req.params.id, req.body)
    .then(function(result) {
        res.json({
            confirmation: 'success',
            message: result
        });
    })
    .catch(function(err) {
        res.json({
            confirmation: 'fail',
            message: err
        })
    });
})

module.exports = router;