const mappa = new Mappa('Leaflet');
let mymap;
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
let canvas;
let IssImage;
const options = {
    lat: 0,
    lng: 0,
    zoom: 1.5,
    style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}
let x = 0;
let y = 0;

function preload() {
    IssImage = loadImage('iss200.png');
}

function setup() {
    background(100);
    canvas = createCanvas(800, 600);
    mymap = mappa.tileMap(options);
    mymap.overlay(canvas);
    getData();
    setInterval(getData, 1000);
}

function getData() {
    loadJSON(api_url, gotData);
}

function gotData(data) {
    console.log(data);
    const pix = mymap.latLngToPixel(data.latitude, data.longitude);
    x = pix.x;
    y = pix.y;
}

function draw() {
    clear();
    console.log(x);
    console.log(y);
    image(IssImage, x, y, 50, 32);
}