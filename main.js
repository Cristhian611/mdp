let abiArray = [
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: 'count', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]
const inputAddress = document.getElementById('address')
const btnSend = document.getElementById('send')
const balancePetsText = document.getElementById('balancePets_text')
let myAddress = ''

const web3 = new Web3('https://bsc-dataseed1.binance.org:443')

setInterval(() => {
  myAddress = inputAddress.value
  if (web3.utils.isAddress(myAddress)) {
    inputAddress.style.border = '4px solid #4cd137'
  } else if (!web3.utils.isAddress(myAddress) && myAddress.length >= 1) {
    inputAddress.style.border = '4px solid #ff6b6b'
  } else if (myAddress.length === 0) {
    inputAddress.style.border = '4px solid #999'
  }
}, 100)

btnSend.addEventListener('click', async (event) => {
  event.preventDefault()
  myAddress = inputAddress.value
  if (web3.utils.isAddress(myAddress)) {
    const mdpToken = await new web3.eth.Contract(abiArray, '0xea2e87ff1bc1E52b640452694E2F143F7f8D64bE')
    const balancePets = await mdpToken.methods.balanceOf(myAddress).call()
    balancePetsText.textContent = `🐶 ${balancePets}`
    console.log(mdpToken)
  } else {
    console.log('no es una address')
  }
})

// const getBalancePets = async () => {
//   const mdpToken = await new web3.eth.Contract(abiArray, '0xea2e87ff1bc1E52b640452694E2F143F7f8D64bE')
//   console.log(mdpToken)
//   const balance = await mdpToken.methods.balanceOf(myAddress).call()
//   console.log(balance)
// }

// getBalancePets()
