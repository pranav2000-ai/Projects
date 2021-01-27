var matrix;
var megaMatrix = [];
var symbolSize = 25;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    fill(0);
    background(0);
    var x = 0;
    var y = random(-1000, 0);
    for (var i = 0; i < width / symbolSize; i++) {
        matrix = new Stream();
        matrix.symbolGenerate(x, y);
        megaMatrix.push(matrix);
        x += symbolSize;
    }
    textSize(symbolSize);
}

function draw() {
    background(0, 150);
    for (var i = 0; i < width / symbolSize; i++) {
        megaMatrix[i].render();
    }
}

function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.first = first;
    this.switchInterval = round(random(2, 10));
    this.value;
    this.setToRandomValue = function() {
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
        }
    }
    this.rain = function() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream() {
    this.stream = [];
    this.streamTotal = round(random(5, 20));
    this.speed = random(3, 8);

    this.symbolGenerate = function(x, y) {
        var first = round(random(0, 4)) == 1;
        for (var i = 0; i <= this.streamTotal; i++) {
            symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomValue();
            this.stream.push(symbol);
            y -= symbolSize;
            first = false;
        }
        this.render = function() {
            for (var i = 0; i <= this.streamTotal; i++) {
                c = this.stream[i];
                if (c.first) {
                    fill(180, 255, 180);
                } else {
                    fill(0, 255, 70);
                }
                text(c.value, c.x, c.y);
                c.rain();
                c.setToRandomValue();
            }
        }
    }
}