var Event = require('../models/Event.js');
var LocationController = require('../controllers/LocationController.js');
var promise = require('bluebird');

module.exports = {
    get: function(params) {
        return new promise(function(resolve, reject) {
            if(params.long != null && params.lat != null) {
                var maxDistance = params.distance || 100;
                var locationParams = {long: params.long, lat: params.lat, distance: maxDistance};
                var results = [];
                LocationController.get(locationParams)
                    .then(function(locations) {
                        locations.forEach(function(location, i) {
                            module.exports.getByLocation(location.id)
                                .then(function(events) {
                                    events.forEach(function(event, i) {
                                        results.push(event.summary());
                                    });
                                });
                        });
                        resolve(results.sort(function(a,b) {
                            return (a.date > b.date) ? 1 : (a.date < b.date ? -1 : 0);
                        })); //hopefully no async problems
                    })
                    .catch(function(err) {
                        reject(err);
                        return;
                    });
            } else if(params.destination != null) {
                var results = [];

                LocationController.get({'name' : params.destination.trim()})
                    .then(function(locations) {
                        if(locations.length == 0) {
                            resolve(results);
                        } else {
                            var p = {
                                long: locations[0].loc[0],
                                lat: locations[0].loc[1]
                            }
                            module.exports.get(p)
                                .then(function(events) {
                                    resolve(events.sort(function(a,b) {
                                        return (a.date > b.date) ? 1 : (a.date < b.date ? -1 : 0);
                                    }));
                                })
                        }
                    })
                    .catch(function(err) {
                        reject(err);
                        return;
                    })

            } else {
                Event.find(params, function(err, events) {
                    if(err) {
                        reject(err);
                        return;
                    }
                    var results = [];

                    events.forEach(function(event, i) {
                        results.push(event.summary());
                    });
                    resolve(results.sort(function(a,b) {
                        return (a.date > b.date) ? 1 : (a.date < b.date ? -1 : 0);
                    }));
                });
            }
        });
    },

    getById: function(id) {
        return new promise(function(resolve, reject) {
            Event.findById(id, function(err, event) {
                if(err || event == null) {
                    reject(new Error('Event Not Found'));
                    return;
                }
                resolve(event.summary());
            });
        });
    },

    getByLocation: function(locationId) {
        return new promise(function(resolve, reject) {
            Event.find({location: locationId}, function(err, events) {
                if(err) {
                    reject(err);
                    return;
                }
                results = [];
                events.forEach(function(event, i) {
                    results.push(event.summary());
                });
                resolve(results);
            });
        });
    },

    post: function(body) {
        return new promise(function(resolve, reject) {
            LocationController.get({'name':body.destination})
                .then(function(locations) {

                    console.log('locations:');
                    console.log(locations);
                    if(locations.length == 0) {
                        reject(new Error('Destination not found'));
                        return;
                    }

                    var newBody = {
                        author: body.author,
                        isPrivate: body.isPrivate,
                        members: body.members,
                        title: body.title,
                        body: body.body,
                        img: body.image,
                        date: body.date,
                        location: locations[0]
                    };

                    Event.create(newBody, function(err, event) {
                        if(err) {
                            reject(err);
                            return;
                        }
                        resolve(event.summary());
                    });
                })
                .catch((err) => {
                    reject("error:" + err);
                })
        });
    },

    put: function(id, params) {
        return new promise(function(resolve, reject) {
            Event.findByIdAndUpdate(id, params, {new:true}, function(err, event) {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(event);
            });
        });
    },

    delete: function(id) {
        return new promise(function(resolve, reject) {
            Event.findByIdAndRemove(id, function(err) {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(); //nothing to return
            });
        });
    }
};