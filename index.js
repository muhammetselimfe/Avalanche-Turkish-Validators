const search = (validatorNodeID, array) => array.filter(validator => validator.nodeID.includes(validatorNodeID)) // Searches for the given node id in the given array.
var div = document.getElementById("main")
function Rolling(number, digit) {
  digit = Math.pow(10, digit)
  return Math.round(number * digit) / digit
}

axios.get('https://vscout.io/dev/api/validators')
  .then((response) => {
    const validators = response.data.validators
    //console.log(validators)        
    //console.log(search("NodeID-9oP7KmQjtxi7rK5GKmRXFNuNpPmr2vzfw",validators))

    axios.get('https://raw.githubusercontent.com/muhammetselimfe/validator-list/master/validators.json')
      .then((response) => {

        const validatorList = response.data

        //console.log(validatorList[0].username)       

        let tablo = document.createElement("table")
        tablo.setAttribute("id", "t01")
        let tr = document.createElement("tr")
        tablo.appendChild(tr)

        let username = document.createElement("th")
        tr.appendChild(username)
        username.innerText = "Kullanıcı Adı"

        let Nodeid = document.createElement("th")
        tr.appendChild(Nodeid)
        Nodeid.innerText = "Validator Node ID"

        let fee = document.createElement("th")
        tr.appendChild(fee)
        fee.innerText = "Fee(%)"

        let capacity = document.createElement("th")
        tr.appendChild(capacity)
        capacity.innerText = "Kapasite"

        let location = document.createElement("th")
        tr.appendChild(location)
        location.innerText = "Lokasyon"

        let upTime = document.createElement("th")
        tr.appendChild(upTime)
        upTime.innerText="UPTIME"

        validatorList.forEach(element => {

          const test = search(element.nodeID, validators)
          //console.log(test)
          test.forEach(elementSecondForEach => {
            let fee = Rolling(elementSecondForEach.delegationFee, 2)
            //console.log(kap)

            let tr = document.createElement("tr")
            let userNameRow = document.createElement("td")
            //userNameRow.setAttribute("id","user")
            userNameRow.style.cssText = "height: 70px;" //** */
            let nodeIDRow = document.createElement("td")
            let feeRow = document.createElement("td")
            let CapRow = document.createElement("td")
            let LocationRow = document.createElement("td")
            let upTimeRow = document.createElement("td")

            userNameRow.innerHTML = `<a href="https://t.me/${element.username}" target="_blank">${element.username}</a>` //element.username
            nodeIDRow.innerHTML = `<a href="https://vscout.io/validator/${elementSecondForEach.nodeID}" target="_blank">${elementSecondForEach.nodeID}</a>` //elementSecondForEach.nodeID
            feeRow.innerHTML =  + fee
            CapRow.innerHTML = parseInt(elementSecondForEach.remainingCapacity / 10 ** 9)
            LocationRow.innerHTML = elementSecondForEach.country
            upTimeRow.innerHTML = parseInt(elementSecondForEach.uptime*100)

            tr.appendChild(userNameRow)
            tr.appendChild(nodeIDRow)
            tr.appendChild(feeRow)
            tr.appendChild(CapRow)
            tr.appendChild(LocationRow)
            tr.appendChild(upTimeRow)

            tablo.appendChild(tr)

            div.appendChild(tablo)

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

        let footer = document.createElement("footer")
        footer.setAttribute("id", "footer")
        footer.innerHTML = "Made with ❤️"
        document.body.appendChild(footer)
      })
  })













