const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();
const url = 'https://www.cedulaprofesional.sep.gob.mx/cedula/presidencia/indexAvanzada.action';

const mainSEP = async (nombre, paterno, materno) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(5 * 60 * 1000);
    await page.goto(url);

    // const form = await page.$('#tableGenerales');
    await page.type('#nombre', nombre, {delay: 100});
    await page.type('#paterno', paterno, {delay: 100});
    await page.type('#materno', materno, {delay: 100});

    await page.click('#dijit_form_Button_0_label');

    await page.waitForSelector('.dojoxGridRow');
  
    const data = await page.$$eval('.dojoxGridRow', (rows) => {
        return rows.map((row) => {
        const cells = row.querySelectorAll('.dojoxGridCell');
        return {
            id: cells[0].textContent,
            firstName: cells[1].textContent,
            lastName: cells[2].textContent,
            middleName: cells[3].textContent,
            grade: cells[4].textContent
        };
        });
    });

    await browser.close();

    return JSON.stringify(data);
}

router.get('/', async (req,res) => {
    const {nombre, paterno, materno} = req.query;

    if(!nombre || !paterno || !materno) {
        return res.status(400).send('Missing query parameters');
    }
    const response = await mainSEP(nombre, paterno, materno);

    res.send(response);
});

module.exports = router;
