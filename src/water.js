var doc = document;
var math = Math;
var ms = "ms";
var sinus = math.sin;
onload = function() {
    for (j=15; j>0; j--) {
        var row = doc.createElement('p');

        for (i=50; i>0; i--){
            var cell = doc.createElement('i');
            var cellStyle = cell.style;
            var cellAnimationDelay = sinus(i*math.random()*5)*i*(20*j)-9999+ms;
            var cellAnimationDuration = ((sinus(j*i/5))+800)*math.sqrt(j/2)+ms;

            cellStyle.webkitAnimationDelay = cellAnimationDelay;
            cellStyle.webkitAnimationDuration = cellAnimationDuration;

            row.appendChild(cell);
        };
    doc.body.appendChild(row);
}}