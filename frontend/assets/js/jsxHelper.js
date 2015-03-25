let jsxHelper = {
  if(bool, v1, v2) {
    if (bool) {
      return v1;
    } else {
      return v2;
    }
  },

  milliseconds(m) {
    return new Promise((cb)=>setTimeout(function(){ cb() }, m));
  }

}

module.exports = jsxHelper;
