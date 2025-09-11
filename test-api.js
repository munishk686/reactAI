// Simple test for the API
const testText = "I love this new feature! It's absolutely amazing and works perfectly.";

fetch('http://localhost:3001/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: testText })
})
.then(response => response.json())
.then(data => {
  console.log('API Response:', data);
})
.catch(error => {
  console.error('Error:', error);
});
