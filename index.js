var payButton = document.getElementById('donation-button')

window.addEventListener('load', async () => {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
        initPayButton()
      } catch (err) {
        console.log('User denied account access')
        alert('User denied account access')
      }
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider)
      initPayButton()
    } else {
      console.log('No Metamask (or other Web3 Provider) installed')
      alert('No Metamask (or other Web3 Provider) installed')
    }
  })

  const initPayButton = () => {
    payButton.onclick = () =>{
      // paymentAddress is where funds will be send to
      const paymentAddress = '0x916fd3fbb0C0F5495D1a03a100bC3731115c8C16'
      //const amountEth = 1

      web3.eth.sendTransaction({
        from: web3.givenProvider.selectedAddress,
        to: paymentAddress,
        value: web3.utils.toWei('1', 'ether')
      }, (err, transactionId) => {
        if  (err) {
          console.log('Payment failed', err)
          alert('Payment failed')
        } else {
          console.log('Payment successful', transactionId)
          if (window.confirm('Payment successful, check on explorer'))
            {
                window.open('https://cchain.explorer.avax-test.network/tx/' +transactionId, '_blank');
            };
          
        }
      })
    }
  }