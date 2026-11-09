const express = require("express");
const cron = require("node-cron");
const app = express();

const axios = require("axios");
const PORT = 4000;

// Route for the homepage
app.get("/", (req, res) => {
  res.send("Hello from slave server");
});

// Route for the cron job endpoint
app.get("/cronServer", (req, res) => {
  res.send("cron job running");
});


// Define your cron job

cron.schedule('*/5 * * * *', () => {
  // This function runs every 30 seconds
  console.log('Running a task every 5 minute');
  // You can call an endpoint or perform a task here
  // Example: Call the /cronServer endpoint programmatically
  axios.get('https://rent-management-api-124l.onrender.com')
    .then(response => console.log(response.data))
    .catch(error => console.error('Error calling /cronServer:', error.message));
  //call master
    axios.get('https://render-health-master.onrender.com') 
    .then(response => console.log(response.data))
    .catch(error => console.error('Error calling /cronServer:', error.message));
});


app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
