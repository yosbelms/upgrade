var Jasmine = require('jasmine');
var jasmine = new Jasmine();

global.upgrade  = require('../upgrade.js');

describe('upgrade', function() {
    var Upg = upgrade(function(obj) {
        obj.someFn = function() {
            obj.prop = true
        }
    })

    it('should return a function that patch an object', function() {
        var obj = Upg()
        obj.someFn()

        expect(typeof obj.someFn).toBe('function')
        expect(obj.prop).toBe(true)
    })

    it('should override with config object', function() {
        var obj = Upg(null, {
            someFn: null
        })

        expect(typeof obj.someFn).not.toBe('function')
    })
})

describe('upgrade.is', function(){
    it('should return duck-type check object function', function() {
        var copy = Object.assign;

        var U = upgrade(function(u) {
            u.fn1 = function(){}
            u.fn2 = function(){}
        })

        var obj1 = {
            fn1:function(){}
        }

        var obj2 = {
            fn2:function(){}
        }

        expect(upgrade.is(obj1, U)).toBe(false)
        expect(upgrade.is(obj2, U)).toBe(false)
        expect(upgrade.is(copy(copy({}, obj1), obj2), U)).toBe(true)
    })
})


jasmine.execute();