(function() {

    // creates a new upgrade
    function upgrade(fn) {
        return function $upgrade(obj, cfg) {
            obj = obj || {}
            fn(obj)
            // apply config after apply upgrade
            cfg && copy(obj, cfg)
            return obj
        }
    }

    // returns whether an object satisfaces an upgrade method structure by duck-typing checking
    upgrade.is = function is(obj, upgrade) {
        var name, type, ref = upgrade({})
        for (name in ref) {
            if (ref.hasOwnProperty(name) && typeof ref[name] === 'function') {
                if (!obj.hasOwnProperty(name) && typeof obj[name] !== 'function') {
                    return false
                }
            }
        }
        return true
    }

    // copies object properties from src to dst, return dst
    function copy(dst, src) {
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