/* jshint esversion: 6 */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let sportsSchema = mongoose.Schema({
    id : {type : Number, required : true, unique : true},
    name : {type : String, required: true}
});

let Sports = mongoose.model('Sports', sportsSchema);

const ListSports = {
    get : function(){
        return Sports.find()
            .then(sports => {
                return sports;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    post : function (newSport) {
        return Sports.create(newSport)
            .then(sport => {
                return sport;
            }).catch(err => {
                throw new Error(err);
        });
    },
    delete : function (id) {
        return Sports.findOneAndDelete({_id: id})
            .then(sport => {
                return sport;
            }).catch(err => {
                throw new Error(err);
        });
    }
};

module.exports = {ListSports};