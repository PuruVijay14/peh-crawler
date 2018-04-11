const puppeteer = require("puppeteer");

(async () => {
  try {
    var browser = await puppeteer.launch({
      executablePath: `C:/Program Files (x86)/Google/Chrome/Application/chrome.exe`,
      headless: false,

    });
    const page = await browser.newPage();
    await page.goto("https://pokeheroes.com/login", {
      waitUntil: "load"
    });

    const username = `input[name="username_login"]`;
    const password = `input[name="password_login"]`;
    const submit = `input[type="submit"]`;

    /** Input the username */
    await page.click(username);
    await page.keyboard.type("Puru");

    /** Input the password */
    await page.click(password);
    await page.keyboard.type("1123581321@PV-2101");

    /** click the submit button */
    await page.click(submit);

    /** Wait for submit */
    await page.waitForNavigation();

    /** Go to the random interactions clicklist */
    await page.goto(`https://pokeheroes.com/pokemon_lite?cl_type=random`);

    const pokemon = page.evaluate(() =>
      document.querySelector(`input.train_button`)
    );
    const egg = page.evaluate(() =>
      document.querySelector(`a.warmButton > input`)
    );

    while (true) {
      if (!!pokemon) {
        /** It's a pokemon */
        await page.click(`input.train_button`);
      } else {
        /** It's an egg */
        await page.click(`a.warmButton > input`);
      }
      await page.waitFor(400);
    }
  } catch (e) {
    console.log(e);
  }

  await browser.close()
})();

function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}