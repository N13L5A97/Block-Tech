// const randomButton = document.querySelector('#randomButton')
const tempString = document.querySelector('#temp')
console.log(tempString)

const temp = parseInt(tempString.innerHTML)

if (temp > 0) {
  console.log('Het is lekker weer, ga naar buiten!')
  alert('Het is lekker weer, ga naar buiten!')
}
