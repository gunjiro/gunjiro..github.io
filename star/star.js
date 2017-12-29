window.addEventListener("DOMContentLoaded", draw, false);

function draw() {
    var canvas = document.getElementById("star");
    canvas.width = 400;
    canvas.height = 400;
    var context = canvas.getContext("2d");
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.transform(1, 0, 0, -1, (canvas.width / 2), (canvas.height / 2));

    var rate = 0;

    id = window.setInterval(function () {
        var point;
        for (var i = 0; i < 10; i++) {
            for (var r = 90; r <= 110; r += 1) {
                point = star(r, rate);
                context.strokeStyle = "hsl(" + (360 * rate) + ", 100%, 50%)"
                context.beginPath();
                context.moveTo(point.x, point.y);
                context.lineTo(point.x, point.y);
                context.closePath();
                context.stroke();
            }
            rate += 0.001;
        }

        if (rate >= 1) {
            window.clearInterval(id);
        }
    }, 1);
}

function createPoint(x, y) {
    return {x: x, y: y};
}

function createAugmentedMatrix(a, b, tx) {
    return function (c, d, ty) {
        return {
            a: a, b: b, tx: tx,
            c: c, d: d, ty: ty
        };
    }
}

function multiply(augmentedMatrix, point) {
    return {
        x: augmentedMatrix.a * point.x + augmentedMatrix.b * point.y + augmentedMatrix.tx,
        y: augmentedMatrix.c * point.x + augmentedMatrix.d * point.y + augmentedMatrix.ty
    };
}

function rotate(angle, point) {
    var matrix = createAugmentedMatrix(Math.cos(angle), -Math.sin(angle), 0)
                                      (Math.sin(angle), Math.cos(angle), 0);
    return multiply(matrix, point);
}

function length(points) {
    var result = 0;
    var pvev;

    if (points.length !== 0) {
        prev = points[0];
    }

    points.forEach(function (point) {
        result += Math.sqrt(Math.pow(point.x - prev.x, 2), Math.pow(point.y - pvev.y, 2));
        pvev = point;
    });

    return result;
}

function star(r, rate) {
    var points = createPoints(r);
    var side = sideLength(r);
    var start = Math.floor(rate * 5);
    var end = (start + 1 < points.length) ? (start + 1) : start;
    var sideRate = rate * 5 - start;
    var matrix = createAugmentedMatrix(1, 0, (points[end].x - points[start].x) * sideRate)
                                      (0, 1, (points[end].y - points[start].y) * sideRate);

    return multiply(matrix, points[start]);
}

function createPoints(r) {
    var angle = 4 * Math.PI / 5;
    var points = [createPoint(0, r)];

    for (var i = 1; i <= 5; i++) {
        points.push(rotate(angle, points[i - 1]));
    }

    return points;
}

function sideLength(r) {
    var angle = 2 * Math.PI / 5;
    return 2 * r * Math.sin(angle);
}
