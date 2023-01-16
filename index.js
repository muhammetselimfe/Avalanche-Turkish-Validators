const search = (validatorNodeID, array) => array.filter(validator => validator.nodeID.includes(validatorNodeID)) // verilen node id'yi verilen array'de arıyor.

function yuvarla(sayi, basamak) {
  basamak = Math.pow(10, basamak)
  return Math.round(sayi * basamak) / basamak
}

axios.post('https://shrouded-meadow-12045.herokuapp.com/http://79.143.179.196:9950/ext/bc/P', {
  "jsonrpc": "2.0",
  "method": "platform.getCurrentValidators",
  "params": {},
  "id": 1
}, {
  headers: {
    // 'Access-Control-Allow-Origin': 'http://79.143.179.196:9950',
    'content-type': 'application/json'
  }
}).then((response) => {
  const validators = response.data.result.validators
  console.log(validators)
//   if (!validators) {
// console.log('Eror due proxy server')
//   }
//   else{
//     console.log(validators)
//   }
  //console.log(search("NodeID-EmPwabyobnM3jYDvQuxZdLBTut5V5pq2n", validators))

  axios.get('https://raw.githubusercontent.com/muhammetselimfe/validator-list/master/validators.json')
    .then((response) => {

      const validatorList = response.data

      //console.log(validatorList[0].username)       

      var tablo = document.createElement("table")
      tablo.setAttribute("id", "t01")
      var trtr = document.createElement("tr")
      tablo.appendChild(trtr)

      var username = document.createElement("th")
      trtr.appendChild(username)
      username.innerText = "Kullanıcı Adı"

      var Nodeid = document.createElement("th")
      trtr.appendChild(Nodeid)
      Nodeid.innerText = "Validator Node ID"

      let fee = document.createElement("th")
      trtr.appendChild(fee)
      fee.innerText = "Fee(%)"

      // let capacity = document.createElement("th") *-*-*-*-*-*-
      // trtr.appendChild(capacity)
      // capacity.innerText = "Kapasite"

      // let location = document.createElement("th") *-*-*-*-
      // trtr.appendChild(location)
      // location.innerText = "Lokasyon"

      let upTime = document.createElement("th")
      trtr.appendChild(upTime)
      upTime.innerText = "UPTIME"

      validatorList.forEach(element => {

        const test = search(element.nodeID, validators)
        //console.log(test)
        test.forEach(element2 => {
          var fee = yuvarla(element2.delegationFee, 2)
          var kap = element2.remainingCapacity
          //console.log(kap)

          var tr = document.createElement("tr")
          var usernameRow = document.createElement("td")
          //usernameRow.setAttribute("id","user")
          usernameRow.style.cssText = "height: 60px;"
          var nodeIDRow = document.createElement("td")
          var feeRow = document.createElement("td")
          // var CapRow = document.createElement("td") *-*-*-*-
          // var LocationRow = document.createElement("td") *-*-*-
          var upTimeRow = document.createElement("td")

          //tr.innerHTML = element.username
          usernameRow.innerHTML = `<a href="https://t.me/${element.username}" target="_blank">${element.username}</a>` //element.username
          nodeIDRow.innerHTML = `<a href="https://vscout.io/validator/${element2.nodeID}" target="_blank">${element2.nodeID}</a>` //element2.nodeID
          feeRow.innerHTML = + fee
          // CapRow.innerHTML = parseInt(element2.remainingCapacity / 10 ** 9) *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
          // LocationRow.innerHTML = element2.country *-*-*-*-*-*-*-
          upTimeRow.innerHTML = parseInt(element2.uptime * 100)

          tr.appendChild(usernameRow)
          tr.appendChild(nodeIDRow)
          tr.appendChild(feeRow)
          // tr.appendChild(CapRow) *-*-*-*-*-*---
          // tr.appendChild(LocationRow) *-*-*-*-*-*-
          tr.appendChild(upTimeRow)

          tablo.appendChild(tr)

          document.body.appendChild(tablo)

        })
      });

      // order operations
      const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

      const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
      )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

      // do the work...
      document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
        const table = th.closest('table');
        Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
          .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
          .forEach(tr => table.appendChild(tr));
      })));
      // Code Source: https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript/49041392#49041392

      var footer = document.createElement("footer")
      footer.setAttribute("id", "footer")
      footer.innerHTML = "Made with ❤️"
      document.body.appendChild(footer)

    })
}).catch((error) => {
  if (error.response) {
    //The response status is an error code
    console.log(error.response.status);
    var h1 = document.getElementById("title")
    h1.innerText = "Service is temporarily unavailable"

  } else if (error.request) {
    //Response not received though the request was sent
    console.log(error.request);
  } else {
    //An error occurred when setting up the request
    console.log(error.message);
  }
});

/**** */
const price = document.getElementById('price')

//Getting live price
const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd'

function updatePrices() {
  axios
    .get(COINGECKO_URL)
    .then((res) => {
      console.log(res.data['avalanche-2'].usd)
      price.innerText = res.data['avalanche-2'].usd + '$'

    })
    .catch((e) => {
      console.error(e)
    })
}

updatePrices()

/** */
const donateMin = document.getElementById('donateMin')
const donateMedium = document.getElementById('donateMedium')
const donateMax = document.getElementById('donateMax')

donateMin.addEventListener('click', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
      initPayButtonMin()
    } catch (err) {
      console.log('User denied account access')
      alert('User denied account access')
    }
  } else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider)
    initPayButtonMin()
  } else {
    console.log('No Metamask (or other Web3 Provider) installed')
    alert('No Metamask (or other Web3 Provider) installed')
  }
})

const initPayButtonMin = () => {

  const paymentAddress = '0xc171Ff6c23960Be438DBdC7eE536F65703c8Ad61'
  //const amountEth = 1

  web3.eth.sendTransaction({
    from: web3.givenProvider.selectedAddress,
    to: paymentAddress,
    value: web3.utils.toWei('0.1')
  }, (err, transactionId) => {
    if (err) {
      console.log('Payment failed', err)
      alert('Payment failed')
    } else {
      console.log('Payment successful', transactionId)
      if (window.confirm('Payment successful, check on explorer')) {
        window.open('https://cchain.explorer.avax-test.network/tx/' + transactionId, '_blank');
      };

    }
  })

}

donateMedium.addEventListener('click', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
      initPayButtonMedium()
    } catch (err) {
      console.log('User denied account access')
      alert('User denied account access')
    }
  } else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider)
    initPayButtonMedium()
  } else {
    console.log('No Metamask (or other Web3 Provider) installed')
    alert('No Metamask (or other Web3 Provider) installed')
  }
})

const initPayButtonMedium = () => {

  const paymentAddress = '0xc171Ff6c23960Be438DBdC7eE536F65703c8Ad61'

  web3.eth.sendTransaction({
    from: web3.givenProvider.selectedAddress,
    to: paymentAddress,
    value: web3.utils.toWei('0.5')
  }, (err, transactionId) => {
    if (err) {
      console.log('Payment failed', err)
      alert('Payment failed')
    } else {
      console.log('Payment successful', transactionId)
      if (window.confirm('Payment successful, check on explorer')) {
        window.open('https://cchain.explorer.avax-test.network/tx/' + transactionId, '_blank');
      };

    }
  })

}

donateMax.addEventListener('click', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
      initPayButtonMax()
    } catch (err) {
      console.log('User denied account access')
      alert('User denied account access')
    }
  } else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider)
    initPayButtonMax()
  } else {
    console.log('No Metamask (or other Web3 Provider) installed')
    alert('No Metamask (or other Web3 Provider) installed')
  }
})

const initPayButtonMax = () => {

  const paymentAddress = '0xc171Ff6c23960Be438DBdC7eE536F65703c8Ad61'

  web3.eth.sendTransaction({
    from: web3.givenProvider.selectedAddress,
    to: paymentAddress,
    value: web3.utils.toWei('1')
  }, (err, transactionId) => {
    if (err) {
      console.log('Payment failed', err)
      alert('Payment failed')
    } else {
      console.log('Payment successful', transactionId)
      if (window.confirm('Payment successful, check on explorer')) {
        window.open('https://cchain.explorer.avax-test.network/tx/' + transactionId, '_blank');
      };

    }
  })

}












