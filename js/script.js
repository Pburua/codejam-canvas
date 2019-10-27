let canvas = document.getElementById('canvas');
let jsonData2x2 = [];
let jsonData32x32 = [];
let image = new Image();

fetch('./data/4x4.json')
    .then(function (response) {
        return response.json();
    }).then(function (jsonData0) {
    jsonData2x2 = jsonData0;
//
}).then(function () {

    fetch('./data/32x32.json')
        .then(function (response) {
            return response.json();
        }).then(function (jsonData0) {
        jsonData32x32 = jsonData0;
        console.log(jsonData0);
    })

}).then(function () {

    fetch('./data/image.png')
        .then(function (response) {
            return response;
        }).then(function (imageData0) {
        image.src = imageData0.url;
        // console.log(imageData0);
    })

}).then(function () {

    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 512;
        ctx.fillStyle = 'lightgray';
        ctx.fillRect(0, 0, 512, 512);

        let button4x4 = document.querySelector('#switcher>.window__item:nth-of-type(1)');

        button4x4.addEventListener('click', function () {
            let step = 512 / 4;

            for (let i = 0; i < jsonData2x2.length; i++)
                for (let j = 0; j < jsonData2x2[i].length; j++) {

                    // console.log(jsonData[i][j]);
                    ctx.fillStyle = '#' + jsonData2x2[i][j];
                    // ctx.fillStyle = "rgba(" + 255 + "," + 0 + "," + 0 + "," + (255 / 255) + ")";
                    ctx.fillRect(i * step, j * step, (i + 1) * step, (j + 1) * step);

                }
        });

        let button32x32 = document.querySelector('#switcher>.window__item:nth-of-type(2)');

        button32x32.addEventListener('click', function () {
            let step = 512 / 32;

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 512, 512);

            for (let i = 0; i < jsonData32x32.length; i++)
                for (let j = 0; j < jsonData32x32[i].length; j++) {

                    // console.log(jsonData[i][j]);
                    // ctx.fillStyle = '#'+jsonData32x32[i][j];

                    ctx.fillStyle = "rgba(" + jsonData32x32[i][j][0] + "," + jsonData32x32[i][j][1] + ","
                        + jsonData32x32[i][j][2] + "," + (jsonData32x32[i][j][3] / 255) + ")";
                    // console.log(jsonData32x32[i][j][3] / 255);
                    ctx.fillRect(i * step, j * step, (i + 1) * step, (j + 1) * step);

                }
        });

        let button512x512 = document.querySelector('#switcher>.window__item:nth-of-type(3)');

        button512x512.addEventListener('click', function () {

            ctx.drawImage(image, 0, 0, 512, 512)
        });


    }

});
