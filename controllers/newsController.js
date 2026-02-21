const axios = require('axios');
const { users } = require('./authController');

const getNews = async (req, res) => {
    try {
        const email = req.user.email;
        const user = users.find(u => u.email === email);


        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const preferences = user.preferences.length > 0 ? user.preferences : ['general'];


        const apiKey = process.env.NEWS_API_KEY;
        const articles = [];

        for (const pref of preferences) {
            const response = await axios.get(
                `https://newsapi.org/v2/top-headlines?country=us&category=${pref}&apiKey=${apiKey}`
            );
            articles.push(...response.data.articles);
        }
        res.status(200).json({ news: articles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch personalized news' });
    }
};

module.exports = { getNews };