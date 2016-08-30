(function() {

    // creates a new upgrade
    function upgrade(fn) {
        return function $upgrade(obj, cfg) {
            obj = obj || {}
            fn(obj)
            // apply config after apply upgrade
            cfg && upgrade.copy(obj, cfg)
            return obj
        }
    }

    // returns whether an upgrade has been applied to an objects or not, by duck-typing checking
    upgrade.in = function $in(obj, upgrade) {
        var name, ref = upgrade({})
        for (name in ref) {
            if (ref.hasOwnProperty(name)) {
                if (!(obj.hasOwnProperty(name) && typeof ref[name] === typeof obj[name])) {
                    return false
                }
            }
        }
        return true
    }

    // copies object properties from src to dst, return dst
    upgrade.copy = typeof Object.assign === 'function'
        ? Object.assign
        : function copy(dst, src) {
            for (var name in src) {
                src.hasOwnProperty(name) && (dst[name] = src[name])
            }
            return dst
        }

    // expose
    if (typeof module !== 'undefined') {
        module.exports = upgrade;    
    } else if (typeof self !== 'undefined') {
        self.upgrade = upgrade;
    }

})()