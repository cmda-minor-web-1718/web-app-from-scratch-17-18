import sections from './render.js'
var localStorageData = {
  setItem: function(data){
    localStorage.setItem('filmdata', JSON.stringify(data))
  },
  getItem: function(){
    if (JSON.parse(localStorage.getItem('filmdata')) !=null ) {
      console.log('filmdata bestaat')
      this.use()
    }
  else{
    console.log('geen filmdata')
    // document.body.innerHTML += "Hallo"
  }
  },
  use: function(){
    var savedata = JSON.parse(localStorage.getItem('filmdata'))
    sections.render(savedata)
  }
}

export default localStorageData
