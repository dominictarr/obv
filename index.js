
module.exports = function (filter) {
  var value = null, listeners = [], oncers = []
  function trigger (_value) {
    value = _value
    var length = listeners.length
    for(var i = 0; i< length && value === _value; i++) {
      var listener = listeners[i](value)
      //if we remove a listener, must decrement i also
    }
    // decrement from length, incase a !immediately
    // listener is added during a trigger
    var l = oncers.length
    var _oncers = oncers
    oncers = []
    while(l-- && _value === value) {
      _oncers.shift()(value)
    }
  }

  function many (ready, immediately) {
    function rm () { //manually remove...
      //fast path, will happen if an earlier listener has not been removed.
      if(listeners[i] !== boundReady)
        i = listeners.indexOf(boundReady)
      listeners.splice(i, 1)
    }

    const boundReady = ready.bind(rm)

    var i = listeners.push(boundReady) - 1

    if(value !== null && immediately !== false) boundReady(value)

    return rm
  }

  many.set = function (_value) {
    if(filter ? filter(value, _value) : true) trigger(many.value = _value)
    return many
  }

  many.once = function (once, immediately) {
    if(value !== null && immediately !== false) {
      once(value)
      return function () {}
    }
    else {
      var i = oncers.push(once) - 1
      return function () {
        if(oncers[i] !== once)
          i = oncers.indexOf(once)
      }
    }
  }

  return many
}


