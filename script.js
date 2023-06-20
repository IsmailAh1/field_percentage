// Set the API key and endpoint URL
const apiKey = "here is the key";
const chatGPTUrl = "https://api.openai.com/v1/chat/completions";

// Set the headers to be included in the request
const myHeaders = {
  "Content-Type": "application/json",
  "customer-id": "3591146274",
  "x-api-key": apiKey,
};

// Define an async function to make the API call
async function fun_call(abstract_input, field_input) {
  // Prepare the request body
  const raw = JSON.stringify({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    messages: [
      {
        role: "user",
        content: `give the perenage directly, followed by one sentence as a description. how much present (out of 100%) would the following abstract "${abstract_input}" could fit 
    in the ${field_input} field.`,
      },
    ],
  });
  // Set the options for the fetch request
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // Make the API call and return the response
  const response = await fetch(chatGPTUrl, requestOptions);
  return response;
}

// Get the HTML form element and the-answer element
const form = document.querySelector("form");
const answer_Content = document.getElementById("output");

// Add a listener to the form submission event
form.addEventListener("submit", async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the input value from the form
  const field_input = document.getElementById("field").value;
  const abstract_input = document.getElementById("abstract").value;

  try {
    // Call the API with the input value and parse the response as JSON
    const response = await fun_call(abstract_input, field_input);
    const json = await response.json();
    // Extract the steps from the API response and format them for display
    const answer = json.choices[0].message.content;
    // Update the HTML with the formatted steps
    answer_Content.innerHTML = answer;
  } catch (error) {
    // Log any errors to the console
    console.error(error);
  }
});
