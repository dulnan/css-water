onload = function () {
  function createElement (name) {
    return myDocument.createElement(name)
  }

  var appendChild = function (target, child) {
    target.appendChild(child)
  }

  var myDocument = document
  var body = myDocument.body

  // Math functions.
  var math = Math
  var sinus = math.sin
  var random = math.random
  var squareroot = math.sqrt

  var ms = "ms";
  var animation = 'animation';

  A.innerHTML = '__STYLE__';
  for (j = 15; j > 0; j--) {
    var row = createElement("p");

    for (i = 50; i > 0; i--) {
      var cell = createElement("i");
      var cellStyle = cell.style;
      cellStyle[animation + 'Delay'] = sinus(i * random() * 5) * i * (20 * j) - 9999 + ms;
      cellStyle[animation + 'Duration'] = (sinus((j * i) / 5) + 800) * squareroot(j / 2) + ms;

      row.appendChild(cell);
      appendChild(row, cell)
    }
    appendChild(body, row)
  }
}
