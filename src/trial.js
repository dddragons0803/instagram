const ACCESS_TOKEN = 'EAAKQ3UctLzkBO9MM1YOSGwfJZB7L8LpZCoc2nstIXnMpUnXsPN0ZAxmQYSJfhO2be246ewxzx388ACjDnI3IFAhVL6Tl0bA2DGE9BT49HC2z1IZAtkp31Wkg80qv1fDmik1SfDZBDCl2vpF5ZBje0DuymUdwoZASmKm1ppBxdMhYxwdWj3kVfK2O7fhSNrIHEeSlsN04zGFpy3GR3JOYfwCPo2AHZCYjV9xWZBvoZD'; // Replace with your Facebook Graph API access token
const API_ENDPOINT = 'https://graph.facebook.com/v3.2/17841451729950336?fields=business_discovery.username(programmer.me){followers_count,media_count,media{comments_count,like_count,timestamp}}'; // Replace with the desired endpoint
const LIMIT = 25; // Number of items per page

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const getAllData = async () => {
  let allData = [];
  let nextUrl = `${API_ENDPOINT}?limit=${LIMIT}&access_token=${ACCESS_TOKEN}`;

  while (nextUrl) {
    const responseData = await fetchData(nextUrl);

    if (!responseData) {
      break; // Stop if there's an error fetching data
    }

    const { data, paging } = responseData;
    allData = allData.concat(data);

    if (paging && paging.next) {
      nextUrl = paging.next; // Get the next page URL
    } else {
      nextUrl = null; // No more pages
    }
  }

  return allData;
};

// Usage
getAllData().then((data) => {
  if (data) {
    console.log('All Data:', data);
  } else {
    console.log('Failed to fetch all data.');
  }
});
