function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateRandomStrings(count: number, length: number): string[] {
  const randomStrings = [];
  for (let i = 0; i < count; i++) {
    randomStrings.push(generateRandomString(length));
  }
  return randomStrings;
}

const randomStrings = generateRandomStrings(1000, 10); // Generates 1000 random strings of length 10

// make a fetch api call to the back-end
fetch('http://localhost:3000/api/scraper', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:12345678'),
  },
  body: JSON.stringify({
    urls: randomStrings.map((str) => `https://nodejs.org/${str}`),
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
