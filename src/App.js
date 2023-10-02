// part 1

// src/components/App.js
// import React, { useState } from 'react';

// function App() {
//   const [username, setUsername] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [mediaData, setMediaData] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const ACCESS_TOKEN = "EAAKQ3UctLzkBO1f584kbhiXiiwS3tuXaMdIhL6k97Pov0Dlf35T8WuWsWOVPTssQ9seBruZBE0x16HVkUJnl6dc1ALWdoC1ZAPagKjGVY7Ftq0ZASIIAbfPoQaHQdwR4IBOElBnJ69Uu9vwrdyjl5ozKjpDftDYux2hzcMBJri7IZBoBNKEgYzdyU5PmB6ZBb5DueWGerdv4MrozzN4ZCzLjEljRTjZBSPRg2IZD"; // Replace with your actual access token

//     try {
//       const response = await fetch(`https://graph.facebook.com/v3.2/17841451729950336?fields=business_discovery.username(${username}){followers_count,media_count,username,follows_count,media{comments_count,like_count,timestamp}}&access_token=${ACCESS_TOKEN}`);
//       const data = await response.json();
//       console.log('Data:', data); // Log data to the console
      
//       const afterValue = data.business_discovery.media.paging.cursors.after;
//       console.log('After Value:', afterValue);


//       const dataarray = data.business_discovery.media.data;
//       console.log('Data Array:', dataarray);

//       if (data.business_discovery) {
//         setUserData(data.business_discovery);

//         if (data.business_discovery.media && data.business_discovery.media.data) {
//           // Replace the existing media data with the new data
//           setMediaData(data.business_discovery.media.data);
//         }
//       } else {
//         setUserData(null);
//         setMediaData([]);
//       }

//       setUsername('');
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
   
//   };

//   return (
//     <div>
//       <h1>Instagram User Data</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter Instagram Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button type="submit">Get Data</button>
//       </form>
//       {userData && (
//         <div>
//           <p>Username: {userData.username}</p>
//           <p>Followers: {userData.followers_count}</p>
//           <p>Follows: {userData.follows_count}</p>
//           <p>Media: {userData.media_count}</p>
//           <ul>
//             {mediaData.map((media, index) => (
//               <li key={index}>
//                 <p>Post ID: {media.id}</p>
//                 <p>Comments: {media.comments_count}</p>
//                 <p>Likes: {media.like_count}</p>
//                 <p>Timestamp: {media.timestamp}</p> {/* Add timestamp display */}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


// PART 2

// import React, { useState, useEffect } from 'react';

// function App() {
//   const [username, setUsername] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [mediaData, setMediaData] = useState([]);
//   const [paginationCursor, setPaginationCursor] = useState('');

//   const ACCESS_TOKEN = 'EAAKQ3UctLzkBOx5SXL1TGUEMD0CVaBdQwB0osUhJ5SXD3Xb8V3rZCR7gKFQMXTrZCZAQHzIZAzexglikiWOXE7ZAQeiOF7dzTvoqwBE0L6dI1bC2fCr3ydaODYnpHmELjBVZC0TfvC5JiOjel4ZAHdwfN0Kcff1pSgjaoumZC8Rx8ZBPxf0EnLsgwhaANGaFNL2pYjvEaHKFCO4oXvatKKzmNOfC2C0oceAFA1HYZD'

//   const fetchData = async () => {
//     try {
//       const url = `https://graph.facebook.com/v3.2/17841451729950336?fields=business_discovery.username(${username}){followers_count,media_count,media{comments_count,like_count}}&access_token=${ACCESS_TOKEN}${paginationCursor}`;
      
//       const response = await fetch(url);
//       const data = await response.json();
  
//       if (data.business_discovery) {
//         setUserData(data.business_discovery);
        
//         if (data.business_discovery.media && data.business_discovery.media.data) {
//           const newMediaData = [...mediaData, ...data.business_discovery.media.data];
//           setMediaData(newMediaData);
//         }
  
//         if (data.business_discovery.media && data.business_discovery.media.paging && data.business_discovery.media.paging.cursors) {
//           setPaginationCursor(`&after=${data.business_discovery.media.paging.cursors.after}`);
//         } else {
//           setPaginationCursor('');
//         }
//       } else {
//         console.error('Invalid response data.');
//       }
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   const handleLoadMore = () => {
//     fetchData();
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMediaData([]);
//     setPaginationCursor('');
//     await fetchData();
//   };

//   useEffect(() => {
//     if (paginationCursor) {
//       fetchData();
//     }
//   }, [paginationCursor]);

  

//   return (
//     <div>
//       <h1>Instagram User Data</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter Instagram Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button type="submit">Get Data</button>
//       </form>
//       {userData && (
//         <div>
//           <p>Username: {userData.username}</p>
//           <p>Followers: {userData.followers_count}</p>
//           <p>Media: {userData.media_count}</p>
//           <ul>
//             {mediaData.map((media, index) => (
//               <li key={index}>
//                 <p>Post ID: {media.id}</p>
//                 <p>Comments: {media.comments_count}</p>
//                 <p>Likes: {media.like_count}</p>
//               </li>
//             ))}
//           </ul>
//           {paginationCursor && (
//       <button onClick={handleLoadMore}>Load More</button>
//     )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


//  PART 3

// import React, { useState, useEffect } from 'react';

// const App = () => {
//   const [mediaData, setMediaData] = useState([]);
//   const [paginationCursor, setPaginationCursor] = useState('');
//   const [limit, setLimit] = useState(4);

//   const fetchData = async (limit, cursorType, cursor) => {
//     try {
//       const endpoint = `https://graph.facebook.com/v3.2/17841451729950336/media`;
//       const params = {
//         fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username',
//         limit,
//         access_token: 'EAAKQ3UctLzkBOx5SXL1TGUEMD0CVaBdQwB0osUhJ5SXD3Xb8V3rZCR7gKFQMXTrZCZAQHzIZAzexglikiWOXE7ZAQeiOF7dzTvoqwBE0L6dI1bC2fCr3ydaODYnpHmELjBVZC0TfvC5JiOjel4ZAHdwfN0Kcff1pSgjaoumZC8Rx8ZBPxf0EnLsgwhaANGaFNL2pYjvEaHKFCO4oXvatKKzmNOfC2C0oceAFA1HYZD',
//       };

//       if (cursorType && cursor) {
//         params[cursorType] = cursor;
//       }

//       const usersMedia = await makeApiCall(endpoint, params);

//       if (usersMedia) {
//         setMediaData(usersMedia.data);

//         if (usersMedia.paging && usersMedia.paging.cursors) {
//           setPaginationCursor(`&${cursorType}=${usersMedia.paging.cursors[cursorType]}`);
//         } else {
//           setPaginationCursor('');
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const makeApiCall = async (endpoint, params) => {
//     try {
//       const url = `${endpoint}?${new URLSearchParams(params).toString()}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error making API call:', error);
//       return null;
//     }
//   };

//   const handleLoadPrevious = () => {
//     fetchData(limit, 'before', paginationCursor);
//   };

//   const handleLoadNext = () => {
//     fetchData(limit, 'after', paginationCursor);
//   };

//   useEffect(() => {
//     fetchData(limit, 'after', paginationCursor);
//   }, [paginationCursor]);

//   return (
//     <div>
//       <h1>Instagram Graph API Pagination and Cursors</h1>
//       <hr />
//       <br />
//       <div className="nav-container">
//         {paginationCursor && (
//           <button onClick={handleLoadPrevious}>PREVIOUS</button>
//         )}
//         <button className="nav-next" onClick={handleLoadNext}>NEXT</button>
//       </div>
//       <ul className="pages-list">
//         {mediaData.map((media) => (
//           <li className="pages-list-item" key={media.id}>
//             {media.media_type === 'IMAGE' || media.media_type === 'CAROUSEL_ALBUM' ? (
//               <img className="pages-media" src={media.media_url} alt={media.caption} />
//             ) : (
//               <video className="pages-media" controls>
//                 <source src={media.media_url} />
//               </video>
//             )}
//             <h4>{media.caption}</h4>
//             <div>
//               Link to Post:
//               <br />
//               <a target="_blank" href={media.permalink}>
//                 {media.permalink}
//               </a>
//             </div>
//             <br />
//             <div>Post at: {media.timestamp}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;


// PART 4


// import React, { useState, useEffect } from 'react';

// function App() {
//   const [username, setUsername] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [mediaData, setMediaData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const ACCESS_TOKEN = "EAAJFkSYT9iIBO0lMt2Qok9x41VAbtBSRzeUR9X9bT5st4m0DImawJIOdjexw1OFHCiBucxPSaO4OIBcaDtobn4bXlohLzwTnmo4yCKlVZCTKeWDCPw8TNOF6OEY6nqoTV594TxkVns8xThmgp9litSKMuUOFW6q9uVv0en81Pb6ThXsiWUsmpY0jT5dL2tNdFxTuKkH6zKcqvB8bunLxPcwZDZD"; // Replace with your actual access token

//   const fetchMediaData = async (afterValue) => {
//     try {
//       const response = await fetch(`https://graph.facebook.com/v3.2/17841451729950336?fields=business_discovery.username(${username}){followers_count,media_count,username,follows_count,media.after(${afterValue}){comments_count,like_count,timestamp}}&access_token=${ACCESS_TOKEN}`);
//       const data = await response.json();

//       if (data.business_discovery.media) {
//         const newMediaData = data.business_discovery.media.data;
//         setMediaData((prevMediaData) => [...prevMediaData, ...newMediaData]);

//         if (data.business_discovery.media.paging && data.business_discovery.media.paging.cursors.after) {
//           // If there is a next page, recursively fetch more data
//           fetchMediaData(data.business_discovery.media.paging.cursors.after);
//         } else {
//           // If there is no next page, finish loading
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Start loading

//     try {
//       const response = await fetch(`https://graph.facebook.com/v3.2/17841451729950336?fields=business_discovery.username(${username}){followers_count,media_count,username,follows_count,media{comments_count,like_count,timestamp}}&access_token=${ACCESS_TOKEN}`);
//       const data = await response.json();

//       if (data.business_discovery) {
//         setUserData(data.business_discovery);

//         if (data.business_discovery.media && data.business_discovery.media.data) {
//           // Replace the existing media data with the new data
//           setMediaData(data.business_discovery.media.data);

//           if (data.business_discovery.media.paging && data.business_discovery.media.paging.cursors.after) {
//             // If there is a next page, fetch more data
//             fetchMediaData(data.business_discovery.media.paging.cursors.after);
//           } else {
//             setLoading(false); // Finish loading if there is no next page
//           }
//         } else {
//           setLoading(false);
//         }
//       } else {
//         setUserData(null);
//         setMediaData([]);
//         setLoading(false);
//       }

//       setUsername('');
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   };

// //   useEffect(() => {
// //     // You can do something when mediaData changes here
// //   }, [mediaData]);

//   return (
//     <div>
//       <h1>Instagram User Data</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter Instagram Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button type="submit" disabled={loading}>Get Data</button>
//       </form>
//       {userData && (
//         <div>
//           <p>Username: {userData.username}</p>
//           <p>Followers: {userData.followers_count}</p>
//           <p>Follows: {userData.follows_count}</p>
//           <p>Media: {userData.media_count}</p>
//           <ul>
//             {mediaData.map((media, index) => (
//               <li key={index}>
//                 <p>Post ID: {media.id}</p>
//                 <p>Comments: {media.comments_count}</p>
//                 <p>Likes: {media.like_count}</p>
//                 <p>Timestamp: {media.timestamp}</p> {/* Add timestamp display */}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// PART 5 (with table form)

// import React, { useState, useEffect } from 'react';

// function App() {
//   const [username, setUsername] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [mediaData, setMediaData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const ACCESS_TOKEN = "EAAKQ3UctLzkBO8XdiSw8vGTwT6PbxBTOLSa2a7BjPKaXye3aTFljJZBIW4suOZASmZCuc8pIOX0LufJg9lDXZBWzf05N8cPy46PF05kBpkk0bW4dvZCojhlUS9eYt2ZBgxatVtTmZBotTc9huydFKw7YWjLxqsghN8SaEZC2OuPzyZB9SCD28oKylWamQYpMZAdF4wKbtZAcLrcl33PzItcWSWogZC8C4wZDZD"; // Replace with your actual access token

//   const fetchMediaData = async (afterValue) => {
//     try {
//       const response = await fetch(`https://graph.facebook.com/v3.2/17841451729950336?fields=business_discovery.username(${username}){followers_count,media_count,username,follows_count,media.after(${afterValue}){comments_count,like_count,timestamp}}&access_token=${ACCESS_TOKEN}`);
//       const data = await response.json();

//       if (data.business_discovery.media) {
//         const newMediaData = data.business_discovery.media.data;
//         setMediaData((prevMediaData) => [...prevMediaData, ...newMediaData]);

//         if (data.business_discovery.media.paging && data.business_discovery.media.paging.cursors.after) {
//           // If there is a next page, recursively fetch more data
//           fetchMediaData(data.business_discovery.media.paging.cursors.after);
//         } else {
//           // If there is no next page, finish loading
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Start loading

//     try {
//       const response = await fetch(`https://graph.facebook.com/v3.2/17841451729950336?fields=business_discovery.username(${username}){followers_count,media_count,username,follows_count,media{comments_count,like_count,timestamp}}&access_token=${ACCESS_TOKEN}`);
//       const data = await response.json();

//       if (data.business_discovery) {
//         setUserData(data.business_discovery);

//         if (data.business_discovery.media && data.business_discovery.media.data) {
//           // Replace the existing media data with the new data
//           setMediaData(data.business_discovery.media.data);

//           if (data.business_discovery.media.paging && data.business_discovery.media.paging.cursors.after) {
//             // If there is a next page, fetch more data
//             fetchMediaData(data.business_discovery.media.paging.cursors.after);
//           } else {
//             setLoading(false); // Finish loading if there is no next page
//           }
//         } else {
//           setLoading(false);
//         }
//       } else {
//         setUserData(null);
//         setMediaData([]);
//         setLoading(false);
//       }

//       setUsername('');
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // You can do something when mediaData changes here
//   }, [mediaData]);

//   return (
//     <div>
//       <h1>Instagram User Data</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter Instagram Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button type="submit" disabled={loading}>Get Data</button>
//       </form>
//       {userData && (
//         <div>
//           <p>Username: {userData.username}</p>
//           <p>Followers: {userData.followers_count}</p>
//           <p>Follows: {userData.follows_count}</p>
//           <p>Media: {userData.media_count}</p>
//         </div>
//       )}
//       <table>
//         <thead>
//           <tr>
//             <th>Index</th>
//             <th></th>
//             <th></th>
//             <th>|</th>
//             <th></th>
//             <th></th>
//             <th>Post ID</th>
//             <th></th>
//             <th></th>
//             <th>|</th>
//             <th></th>
//             <th></th>
//             <th>Likes</th>
//             <th></th>
//             <th></th>
//             <th>|</th>
//             <th></th>
//             <th></th>
//             <th>Comments</th>
//             <th></th>
//             <th></th>
//             <th>|</th>
//             <th></th>
//             <th></th>
//             <th>Timestamp</th>
//           </tr>
//         </thead>
//         <tbody>
//           {mediaData.map((media, index) => (
//             <tr key={index}>
//               <td>{index}</td>
//               <td></td>
//               <td></td>
//               <td>{ "|" }</td>
//               <td></td>
//               <td></td>
//               <td>{media.id}</td>
//               <td></td>
//               <td></td>
//               <td>{ "|" }</td>
//               <td></td>
//               <td></td>
//               <td>{media.like_count}</td>
//               <td></td>
//               <td></td>
//               <td>{ "|" }</td>
//               <td></td>
//               <td></td>
//               <td>{media.comments_count}</td>
//               <td></td>
//               <td></td>
//               <td>{ "|" }</td>
//               <td></td>
//               <td></td>
//               <td>{media.timestamp}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;


// part 6 (with dropdown)
import React, { useState, useEffect } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('all'); // Default option is 'all'

  const ACCESS_TOKEN = "EAAKQ3UctLzkBO69yS8NfZC5h0UEYzkEddOD2sONysUYTJ2tLnyoo1fsZAQio8nkETOEYDtuq8xZAU8dJ6xzp9an2jfjVsKExDBPvhyxpixZANvbIY9KQML81oFOvD5kmbrHF6fziBEivw9ra35ZBICmsfwmzPbjZCWENGr0Y20VACqWZAZByTOX1wqpT6gMPsJ4ZBZB5vxZB0mTJJsw3i25ZBxa2gKFPXwZDZD"; // Replace with your actual access token

  const fetchMediaData = async (afterValue) => {
    try {
       const limit = 25; 
      const response = await fetch(`https://graph.facebook.com/v3.2/17841451729950336?fields=business_discovery.username(${username}){followers_count,media_count,username,follows_count,media.limit(${limit}).after(${afterValue}){comments_count,like_count,timestamp}}&access_token=${ACCESS_TOKEN}`);
      const data = await response.json();

      if (data.business_discovery.media) {
        const newMediaData = data.business_discovery.media.data;
        setMediaData((prevMediaData) => [...prevMediaData, ...newMediaData]);

        if (data.business_discovery.media.paging && data.business_discovery.media.paging.cursors.after) {
          
          if (mediaData.length < 50) {
            fetchMediaData(data.business_discovery.media.paging.cursors.after);
          } else {
            // If you have fetched a total of 50 posts, finish loading
            setLoading(false);
          }
        } else {
          // If there is no next page, finish loading
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch(`https://graph.facebook.com/v3.2/17841451729950336?fields=business_discovery.username(${username}){followers_count,media_count,username,follows_count,media{comments_count,like_count,timestamp}}&access_token=${ACCESS_TOKEN}`);
      const data = await response.json();

      if (data.business_discovery) {
        setUserData(data.business_discovery);

        if (data.business_discovery.media && data.business_discovery.media.data) {
          // Replace the existing media data with the new data
          setMediaData(data.business_discovery.media.data);

          if (data.business_discovery.media.paging && data.business_discovery.media.paging.cursors.after) {
            // If there is a next page, fetch more data
            fetchMediaData(data.business_discovery.media.paging.cursors.after);
          } else {
            setLoading(false); // Finish loading if there is no next page
          }
        } else {
          setLoading(false);
        }
      } else {
        setUserData(null);
        setMediaData([]);
        setLoading(false);
      }

      setUsername('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // You can do something when mediaData changes here
  }, [mediaData]);

  // Function to format a timestamp based on selected option
  const formatTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const day = dateObj.getDate();


    switch (selectedOption) {
      case 'day':
        return `${month} ${day}, ${year}`;
      case 'month':
        return `${month}, ${year}`;
      case 'year':
        return `${year}`;
      default:
        return timestamp; // Default to showing the full timestamp
    }
  };

  // Function to group and sum likes and comments for timestamps with the same value
  const groupAndSumData = () => {
    const groupedData = {};
    mediaData.forEach((media) => {
      const formattedTimestamp = formatTimestamp(media.timestamp);
      if (!groupedData[formattedTimestamp]) {
        groupedData[formattedTimestamp] = {
          likes: 0,
          comments: 0,
        };
      }
      groupedData[formattedTimestamp].likes += media.like_count;
      groupedData[formattedTimestamp].comments += media.comments_count;
    });
    return groupedData;
  };

  const groupedData = groupAndSumData();

  return (
    <div>
      <h1>Instagram User Data</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Instagram Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" disabled={loading}>Get Data</button>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="all">All</option>
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </form>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Followers: {userData.followers_count}</p>
          <p>Follows: {userData.follows_count}</p>
          <p>Media: {userData.media_count}</p>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Timestamp</th>
            <th>Likes</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((timestamp, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{timestamp}</td>
              <td>{groupedData[timestamp].likes}</td>
              <td>{groupedData[timestamp].comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
