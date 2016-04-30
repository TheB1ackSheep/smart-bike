"use strict";

var Firebase = require('firebase');

module.exports = class SafeZone{
    constructor(name, zone, zoom){
        this.id = 'zone_'+this.makeId();
        this.name = name;
        this.zone = zone;
        this.zoom = zoom;
        var path = '';
        for(var key in zone){
            if(key != 'length'){
                path += zone[key].lat + ',' + zone[key].lng + '|';
            }
        }
        /* final path to make a complete polygon */
        path += zone[0].lat + ',' + zone[0].lng;
        
        path = 'https://maps.googleapis.com/maps/api/staticmap?path=color:0xff0000ff|weight:5|fillcolor:0xFFFF0033|'+path+'&size=300x300&maptype=roadmap&key=AIzaSyBhawEm90dKJ899ccqLgavc7vtOj0IJuXw';
        this.data = {
            id: this.id,
            name: this.name, 
            zone: this.zone,
            zoom: this.zoom,
            path: path
        };
        this.ref = new Firebase("https://smart-bike.firebaseio.com/safezones");
    }
    
    static getAllSafeZones(cb){
        var ref = new Firebase("https://smart-bike.firebaseio.com/safezones");
        ref.once("value", function(data) {
           if(typeof cb == 'function')
                cb.call(null, data.val()); 
        });
    }
    
    save(cb){
        var ref = this.ref.child(this.id);
        var that = this;
        ref.once("value", function(data) {
            data = data.val();
            if(data == null)
                ref.set(that.data);
            if(typeof cb == 'function')
                cb.call(null, data == null);
        });
    }
    
    delete(){
        this.ref.child(this.id).remove();
    }
    
    /* by csharptest.net */
    makeId()
    {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}

