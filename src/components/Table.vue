<template>
  <div>
    <div v-if="turkishValidators.length > 0" class="card-container">
      <div class="card" v-for="validator in turkishValidators" :key="validator.nodeID">
        <div class="card-header">
          <h3>{{ validator.username }}</h3>
          <a target="_blank" :href="`https://t.me/${validator.username}`" class="telegram-link">Telegram</a>
        </div>
        <div class="card-body">
          <p>
            <a target="_blank" :href="`https://avascan.info/staking/validator/${validator.nodeID}`">
              {{ shortenNodeID(validator.nodeID) }}
            </a>
            <button @click="copyToClipboard(validator.nodeID)" class="copy-button">Copy</button>
          </p>
          <p><strong>Fee (%):</strong> <span class="highlight"> %{{ Number(validator.delegationFee) }}</span></p>
          <p><strong>Uptime (%):</strong> <span class="highlight"> {{ "%" + Number(validator.uptime).toFixed(0) }}</span></p>
          <p><strong>End Time:</strong> <span class="highlight"> {{ new Date(Number(validator.endTime) * 1000).toISOString().split('T')[0] }}</span></p>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Please wait...</h1>
      <p v-if="errorMessage">{{ errorMessage }}</p> <!-- Display error message if any -->
    </div>
    <footer v-if="turkishValidators.length > 0">Made With love ❤️</footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      turkishValidators: [],
      errorMessage: "", // To hold error messages
    };
  },
  mounted() {
    this.fetchValidators(); // Call the method to fetch validators
  },
  methods: {
    async fetchValidators() {
      try {
        const response = await axios.post("https://api.avax.network/ext/bc/P", {
          jsonrpc: "2.0",
          method: "platform.getCurrentValidators",
          params: {},
          id: 1,
        }, {
          headers: {
            "content-type": "application/json",
          },
        });

        const validatorData = await axios.get("https://raw.githubusercontent.com/muhammetselimfe/validator-list/master/validators.json");
        
        // Map through the fetched data and combine it
        validatorData.data.forEach((element) => {
          const found = response.data.result.validators.find(
            (allValidators) => allValidators.nodeID === element.nodeID
          );
          if (found) {
            found.username = element.username;
            this.turkishValidators.push(found);
          }
        });
      } catch (error) {
        this.errorMessage = "Failed to load validators. Please try again later."; // Set error message
        console.error("ERROR: ", error); // Log error for debugging
      }
    },
    copyToClipboard(nodeID) {
      navigator.clipboard.writeText(nodeID).then(() => {
        alert("Node ID copied to clipboard!"); // Notify user
      }).catch(err => {
        console.error("Failed to copy: ", err);
      });
    },
    shortenNodeID(nodeID) {
      // Return the first 10 characters, "..." and the last 4 characters if the ID is longer than 14 characters
      return nodeID.length > 14 ? nodeID.substring(0, 10) + "..." + nodeID.substring(nodeID.length - 4) : nodeID;
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Space between cards */
  justify-content: center; /* Center cards */
  padding: 20px; /* Padding around the container */
}

.card {
  background-color: #F5F5F9; /* Light background for cards */
  border: 2px solid #FF394A; /* Border color for cards */
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px; /* Fixed width for cards */
  transition: transform 0.2s, box-shadow 0.2s; /* Transition for hover effect */
}

.card:hover {
  transform: translateY(-5px); /* Lift effect on hover */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
  color: #161617; /* Keep text color dark on hover */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #161617; /* Dark text color for header */
  border-bottom: 2px solid #FF394A; /* Bottom border for header */
  padding-bottom: 10px; /* Padding for header */
}

.card-body {
  margin-top: 10px;
  color: #161617; /* Dark text color for body */
}

.highlight {
  color: #FF394A; /* Highlight important values with #FF394A */
}

.copy-button {
  background-color: #FF394A; /* Button background color */
  color: #F5F5F9; /* Button text color */
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  padding: 5px 10px; /* Padding for button */
  cursor: pointer; /* Pointer cursor on hover */
  margin-left: 10px; /* Space between Node ID and button */
  transition: background-color 0.3s, transform 0.2s; /* Transition for hover effect */
}

.copy-button:hover {
  background-color: #161617; /* Darker color on hover */
  transform: scale(1.05); /* Slightly enlarge button on hover */
}

footer {
  margin-top: 5%;
  text-align: center; /* Center footer text */
  color: #161617; /* Dark text color for footer */
}

body {
  padding: 100px;
  font-family: "Roboto", sans-serif;
  background: #FF394A; /* Main background color */
  color: #F5F5F9; /* Light text color for body */
}

a {
  color: #FF394A; /* Link color */
  text-decoration: none; /* Remove underline */
}

a:hover {
  text-decoration: underline; /* Underline on hover */
}

.telegram-link {
  background-color: #FF394A; /* Dark background for Telegram link */
  color: #F5F5F9; /* Light text color */
  padding: 5px 10px; /* Padding for button */
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s; /* Transition for hover effect */
}

.telegram-link:hover {
  background-color: #161617; /* Change to dark color on hover */
}
</style>
