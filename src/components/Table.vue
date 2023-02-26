<template>
  <div v-if="turkishValidators[0]">
    <table>
      <tr>
        <th>User Name</th>
        <th>Node ID</th>
        <th>Fee(%)</th>
        <th>uptime(%)</th>
        <th>End Time</th>
      </tr>
      <tr v-for="validator in turkishValidators" :key="validator">
        <td>
          <a target="_blank" :href="`https://t.me/${validator.username}`">
            {{ validator.username }}</a
          >
        </td>
        <td>
          <a
            target="_blank"
            :href="`https://avascan.info/staking/validator/${validator.nodeID}`"
            >{{ validator.nodeID }}</a
          >
        </td>
        <td>%{{  Number(validator.delegationFee)  }}</td>
        <td>{{ "%" + Number(validator.uptime).toFixed(0) }}</td>
        <td> {{ new Date(Number(validator.endTime)*1000).toISOString().split('T')[0]
 }} </td>
      </tr>
    </table>
  </div>
  <div v-else>
    <h1>Please wait...</h1>
  </div>
  <footer v-if="turkishValidators[0]">Made With love ❤️</footer>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      turkishValidators: [],
    };
  },
  mounted() {
    axios
      .post(
        "https://api.avax.network/ext/bc/P",
        {
          jsonrpc: "2.0",
          method: "platform.getCurrentValidators",
          params: {},
          id: 1,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log(response.data.result.validators)
        axios
          .get(
            "https://raw.githubusercontent.com/muhammetselimfe/validator-list/master/validators.json"
          )
          .then((res) => {
            res.data.map((element) => {
              let found = response.data.result.validators.find(
                (allValidators) => {
                  return allValidators.nodeID == element.nodeID;
                }
              );
              if (found) {
                found.username = element.username;
                this.turkishValidators.push(found);
              }
            });
            console.log(this.turkishValidators)
          });
      })
      .catch((error) => console.log("ERROR: " + error))
      .then((this.dataReady = true));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
footer {
  margin-top: 5%;
}

table {
  width: 100%;
  table-layout: auto;
}
body {
  padding: 100px;
}

th {
  background-color: rgba(255, 255, 255, 0.3);

  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
}

td {
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 16px;
  color: #fff;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);

  height: 30px;
  overflow-x: auto;
  margin-top: 0px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

body {
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
  font-family: "Roboto", sans-serif;
}

a {
  color: white;
}

* {
  font-weight: bold;
}
</style>
