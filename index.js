const puppeteer = require('puppeteer');

async function getFilms(username, password) {
	try {
		const browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null
		});

		const page = await browser.newPage();
		const url = 'https://www.filmweb.pl/login';
		const username = 'nehodo8477@wwrmails.com';
		const password = 'NPqao0u';

		await page.goto(url, { waitUntil: 'networkidle0' });
		// Login
		//Rodo button
		await page.waitForSelector('.rodo__buttons button');
		await page.click('.rodo__buttons button');
		//Login by filmweb account
		await page.waitForSelector('.authButton--filmweb');
		await page.click('.authButton--filmweb');
		//typing username
		await page.waitForSelector('input[name="j_username"]');
		await page.click('input[name="j_username"]');
		await page.keyboard.type(username);
		//typing password
		await page.waitForSelector('input[name="j_password"]');
		await page.click('input[name="j_password"]');
		await page.keyboard.type(password);
		//submit
		await page.waitForSelector('.materialForm__submit');
		await page.click('.materialForm__submit');
		await page.waitForNavigation({ waitUntil: 'networkidle0' });
		//skip the add button
		await page.waitForSelector('.ws__skipButton');
		await page.click('.ws__skipButton');
		await page.waitForNavigation({ waitUntil: 'networkidle0' });

		//get user actual name after login to enter the films section
		const userHref = document.querySelector('#userHeaderButton a').getAttribute('href');
		const filmSectionUrl = `https://www.filmweb.pl${userHref}/films`;

		await page.waitForSelector('#userHeaderButton a');
		await page.goto(filmSectionUrl, { waitUntil: 'networkidle0' });
		await page.waitForNavigation({ waitUntil: 'networkidle0' });
		await page.screenshot({ path: 'filmweb.png' });

		const results = await page.$$eval('.voteBoxes__box', (films) => {
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

				//zwraca plik JSON o nazwie userFilms
				return fs.writeFileSync('userFilms.json', JSON.stringify(properties));
			});
		});
		console.log(JSON.stringify(properties));

		await browser.close();
	} catch (error) {
		console.error('something went wrong');
	}
	debugger;
}

getFilms();

// nehodo8477@wwrmails.com
// NPqao0u
