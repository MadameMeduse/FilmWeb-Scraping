const puppeteer = require('puppeteer');

async function getFilms(username, password) {
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null
	});

	const page = await browser.newPage();
	const url = 'https://www.filmweb.pl/login';

	await page.goto(url, { waitUntil: 'networkidle0' });

	// click and wait for navigation
	await Promise.all([
		page.waitForSelector('.rodo__buttons > button'),
		page.click('.rodo__buttons > button'),
		page.waitForSelector('.authButton--filmweb'),
		page.click('.authButton--filmweb'),
		page.waitForSelector('.materialForm__input'),
		page.type('input [name = "j_username"]', username),
		page.type('input [name = "j_password"]', password),
		page.click('materialForm__submit button'),
		page.waitForNavigation({ waitUntil: 'networkidle0' })
	]);

	const results = await page.$$eval('.userVotesPage__results', (films) => {
		return films.map((film) => {
			const properties = {};
			const titleElement = film.querySelector('.filmPreview__title');
			const userRatingElement = film.querySelector('.userRate__rate');
			const communityRatingElement = film.querySelector('.rateBox__rate');
			const yearElement = film.querySelector('.filmPreview__year');
			const genreElement = film.querySelector('.filmPreview__info--genres a');

			properties.title = titleElement.innerText;
			properties.userRating = userRatingElement.innerText;
			properties.communityRating = communityRatingElement.innerText;
			properties.year = yearElement.innerText;
			properties.genre = genreElement.innerText;

			return properties;
		});
	});

	console.log(results);

	browser.close();
}

getFilms('nehodo8477@wwrmails.com', 'NPqao0u');
