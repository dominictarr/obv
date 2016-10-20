
module.exports = function (filter) {
  var value, listeners = []
  function trigger (_value) {
    value = _value
    var length = listeners.length
    for(var i = 0; i< length && value === _value; i++) {
      var listener = listeners[i]
      //if we remove a listener, must decrement i also
      if(listener(value)) listeners.splice(i--, 1)
    }
  }

  function many (ready) {
    if(value) {
      if(ready(value))
        return //don't remove because we didn't add it
    }
    var i = listeners.push(ready) - 1
    return function () { //manually remove...
      //fast path, will happen if an earlier listener has not been removed.
      if(listeners[i] !== ready)
        i = listeners.indexOf(ready)
      listeners.splice(i, 1)
    }
  }

  many.set = function (_value) {
    if(filter ? filter(value, _value) : true) trigger(many.value = _value)
    return many
  }

  return many
}

