// find the tempature in the html
const tempString = document.querySelector('#temp')
console.log(tempString)

// make string into number
const temp = parseInt(tempString.innerHTML)

// check if temp is higher than 0 and give user alert
if (temp > 0) {
  console.log('Het is lekker weer, ga naar buiten!')
  alert('Het is lekker weer, ga naar buiten!')
}
