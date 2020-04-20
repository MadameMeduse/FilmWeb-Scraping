const puppeteer = require('puppeteer');

async function getFilms(username, password) {
	try {
		const browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null
		});

		const page = await browser.newPage();
		const url = 'https://www.filmweb.pl/login';

		await page.goto(url, { waitUntil: 'networkidle0' });

		// Login
		await Promise.all([
			page.waitForSelector('.rodo__buttons button'),
			page.click('.rodo__buttons button'),
			page.waitForSelector('.authPage__list'),
			page.click('.authButton--filmweb'),
			page.waitForSelector('.materialForm__input'),
			page.click('input[name="j_username"]'),
			page.keyboard.type(toString(username)),
			page.click('input[name="j_password"]'),
			page.keyboard.type(toString(password)),
			page.click('.materialForm__submit'),
			page.waitForNavigation({ waitUntil: 'networkidle0' }),
			page.screenshot({ path: 'filmweb.png' })
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

				return JSON.stringify(properties);
			});
		});
		console.log(results);
		await browser.close();
	} catch (error) {
		console.error(error);
	}
}

getFilms();

// nehodo8477@wwrmails.com
// NPqao0u
