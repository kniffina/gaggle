var Post = require('../models/Post.js');
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
                                .then(function(posts) {
                                    posts.forEach(function(post, i) {
                                        results.push(post.summary());
                                    });
                                });
                        });
                        resolve(results.sort(function(a,b) {
                            return (a.date > b.date) ? 1 : (a.date < b.date ? -1 : 0);
                        }));
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
                                .then(function(posts) {
                                    resolve(posts.sort(function(a,b) {
                                        return (a.date > b.date) ? 1 : (a.date < b.date ? -1 : 0);
                                    }));
                                });
                        }
                    })
                    .catch(function(err) {
                        reject(err);
                        return;
                    })
            } else {
                Post.find(params, function(err, posts) {
                    if(err) {
                        reject(err);
                        return;
                    }
                    var results = [];
                    posts.forEach(function(post, i) {
                        results.push(post.summary());
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
            Post.findById(id, function(err, post) {
                if(err || post == null) {
                    reject(new Error('Post Not Found'));
                    return;
                }
                resolve(post.summary());
            });
        });
    },

    getByLocation: function(locationId) {
        return new promise(function(resolve, reject) {
            Post.find({location: locationId}, function(err, posts) {
                if(err) {
                    reject(err);
                    return;
                }
                results = [];
                posts.forEach(function(post, i) {
                    results.push(post.summary());
                });
                resolve(results);
            });
        });
    },

    post: function(body) {
        return new promise(function(resolve, reject) {
            LocationController.get({'name':body.destination}, function(err, locations) {
                if(err) {
                    reject(err);
                    return;
                }
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
                    img: body.img,
                    location: locations[0]
                };

                Post.create(newBody, function(err, post) {
                    if(err) {
                        reject(err);
                        return;
                    }
                    resolve(post.summary());
                });
            });
        });
    },

    put: function(id, params) {
        return new promise(function(resolve, reject) {
            Post.findByIdAndUpdate(id, params, {new:true}, function(err, post) {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(post.summary());
            });
        });
    },

    delete: function(id) {
        return new promise(function(resolve, reject) {
            Post.findByIdAndRemove(id, function(err) {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(); //nothing to return
            });
        });
    }

};