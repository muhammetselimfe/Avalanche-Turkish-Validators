<template>
  <div v-if="dataReady">
    <h1>Validator List</h1>
    <table id="fifthTable">
      <thead>
        <tr>
          <th>User Name</th>
          <th>Node ID</th>
          <th>Fee(%)</th>
          <th>Capacity</th>
          <th>Up Time</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="node in turkishValidators" :key="node.id">
          <td>{{ node.username }}</td>
          <td>{{ node.nodeID }}</td>
          <td>{{ node.delegationFee / 1 }}</td>
          <td>{{ (node.remainingCapacity / 10 ** 9).toFixed(0) + " 🔺" }}</td>
          <td>{{ "%" + (node.uptime * 100).toFixed(0) }}</td>
          <td>{{ node.country }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
const axios = require("axios");

export default {
  created() {
    axios
      .get("https://vscout.io/dev/api/validators")
      .then((response) => {
        axios
          .get(
            "https://raw.githubusercontent.com/muhammetselimfe/validator-list/master/validators.json"
          )
          .then((res) => {
            res.data.map((element) => {
              let found = response.data.validators.find((allValidators) => {
                return allValidators.nodeID == element.nodeID;
              });
              if (found) {
                found.username = element.username;
                this.turkishValidators.push(found);
              }
            });
          });
      })
      .catch((error) => console.log("ERROR: " + error))
      .then((this.dataReady = true));
  },
  data() {
    return {
      turkishValidators: [],
      dataReady: false,
      ascending: false,
      sortColumn: "",
    };
  },
  methods: {
    sortTable: function sortTable(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }

      var ascending = this.ascending;

      this.turkishValidators.sort(function (a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1;
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1;
        }
        return 0;
      });
      console.log("test");
    },
  },
  computed: {
    columns: function columns() {
      if (this.turkishValidators.length == 0) {
        return [];
      }
      return Object.keys(this.turkishValidators[0]);
    },
  },
};
</script>

<style>
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

* {
  font-weight: bold;
}
</style>
