const apiKey = 'fdfb6b105d33a600d1f08b46fa46844e'; // Input your Last.fm API key here

const form = document.getElementById('artistForm');
const artistInput = document.getElementById('artistInput');
const artistInfo = document.getElementById('artistInfo');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const artistName = artistInput.value.trim();

    if (artistName !== '') {
        getArtistInfo(artistName);
    }
});

async function getArtistInfo(artistName) {
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.getTopTracks&artist=${artistName}&api_key=${apiKey}&format=json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if the response contains top tracks
        if (data.toptracks && data.toptracks.track && data.toptracks.track.length > 0) {
            // Extract relevant information from the response
            const topTracks = data.toptracks.track;

            // Display the top tracks on the webpage
            artistInfo.innerHTML = `
                <h2>${artistName} - Top Tracks</h2>
                <ul>
                    ${topTracks.map(track => `<li>${track.name}</li>`).join('')}
                </ul>
            `;
        } else {
            // No top tracks found for the specified artist
            artistInfo.innerHTML = `<p>No information found for ${artistName}. Please check the spelling and try again.</p>`;
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        artistInfo.innerHTML = '<p>Error fetching artist information. Please try again.</p>';
    }
}
