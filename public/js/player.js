const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Submitted...');

    const { name, dob, url, bPlace, career, matches, score, fifty, century, wicket, average } = event.target;

    const newPlayer = {
        name: name.value,
        dob: dob.value || null,
        url: url.value,
        bPlace: bPlace.value,
        career: career.value,
        matches: matches.value ? parseInt(matches.value) : 0,
        score: score.value ? parseInt(score.value) : 0,
        fifty: fifty.value ? parseInt(fifty.value) : 0,
        century: century.value ? parseInt(century.value) : 0,
        wicket: wicket.value ? parseInt(wicket.value) : 0,
        average: average.value ? parseInt(average.value) : 0,
    };


    try {
        // सही बैकएंड पाथ पर रिक्वेस्ट भेजी गई
        const player = await axios.post('http://localhost:3000/players/add', newPlayer);
        event.target.reset();
    } catch (error) {
        alert(error.response?.data?.message || 'Error occurred while saving data.');
    }
}

const searchData = async (search) => {
    try {

        const response = await axios.get(`http://localhost:3000/players/${search}`);

        const player = response.data;
        if (!player.url)
            document.getElementById('playerImage').src = "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";

        document.getElementById('playerImage').src = player.url;
        document.getElementById('dispName').textContent = player.name;
        document.getElementById('dispdob').textContent = player.dob;
        document.getElementById('matchesDisplay').textContent = player.matches;
        document.getElementById('dispruns').textContent = player.score;
        document.getElementById('dispfifty').textContent = player.fifty;
        document.getElementById('dispcentury').textContent = player.century;
        document.getElementById('dispavg').textContent = player.average;
        document.getElementById('dispWickets').textContent = player.wicket;
        document.getElementById('dispcareer').textContent = player.career;





    } catch (error) {
        console.log(error.message);
    }
}