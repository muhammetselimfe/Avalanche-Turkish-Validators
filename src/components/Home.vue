<template>
  <div>
    <div v-if="turkishValidators.length > 0" class="card-container">
      <!-- Use the ValidatorCard component for each validator -->
      <ValidatorCard
        v-for="validator in turkishValidators"
        :key="validator.nodeID"
        :validator="validator"
      />
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
import ValidatorCard from './ValidatorCard.vue'; // Import the new component

export default {
  components: {
    ValidatorCard, // Register the component
  },
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
