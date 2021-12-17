const fetchShortUrl = async (longurl) => {
    const postData = {
        long_url: longurl
    };
    const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_BITLY_AUTHORIZATION_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    return response.json();
};

export default fetchShortUrl;