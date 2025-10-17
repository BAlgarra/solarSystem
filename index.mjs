import express from 'express';
import fetch from "node-fetch";
const solarSystem = (await import('npm-solarsystem')).default

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// root route
app.get('/', async (req, res) => {
    // let riResponse = await fetch("https://pixabay.com/api/?key=  &q=solar+system")
    let riResponse = await fetch("https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=solar+system");
    let riData = await riResponse.json();
    // let randomImageURL = riData.hits[0].largeImageURL;
    const randomIndex = Math.floor(Math.random() * riData.hits.length);
    const randomImage = riData.hits[randomIndex].largeImageURL;

    console.log(riData);
    // console.log(randomImageURL);
    res.render('home.ejs', {randomImage});
});

// mercury route
app.get('/mercury', (req, res) => {
    let planetInfo = solarSystem.getMercury();
    console.log(planetInfo);
    res.render('mercury.ejs', { planetInfo }) // can also use "planetInfo" = planetInfo
});

// venus route
app.get('/venus', (req, res) => {
    let planetInfo = solarSystem.getVenus();
    console.log(planetInfo);
    res.render('venus.ejs', { planetInfo }) // can also use "planetInfo" = planetInfo
});

// Generic route
app.get('/planet', (req, res) => {
    let planet_name = req.query.planetName;
        let planetInfo = solarSystem[`get${planet_name}`]();
    
    console.log(planetInfo);
    res.render('planetInfo.ejs', { planetInfo, planet_name }) // can also use "planetInfo" = planetInfo
});

app.get('/nonplanet', (req, res) => {
    let nonplanet_name = req.query.nonplanetName;
        let nonplanetInfo = solarSystem[`get${nonplanet_name}`]();
    
    console.log(nonplanetInfo);
    res.render('nonPlanetInfo.ejs', { nonplanetInfo, nonplanet_name }) // can also use "planetInfo" = planetInfo
});

app.get('/nasaPOD', (req, res) => {
  
    res.render('nasaPOD.ejs') // can also use "planetInfo" = planetInfo
});

app.listen(3000, () => {
    console.log('server started');
});