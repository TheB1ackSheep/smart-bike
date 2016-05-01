"use strict";

var Firebase = require('firebase');

module.exports = class Motocycle{
       
    static getAllMotocycles(cb){
        var ref = new Firebase("https://smart-bike.firebaseio.com/motocycles");
        ref.once("value", function(data) {
           if(typeof cb == 'function')
                cb.call(null, data.val()); 
        });
    }
    
    delete(){
        // this.ref.child(this.id).remove();
    }
    
}

