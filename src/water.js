var aside = ''

onload = function () {
  for (j = 15; j > 0; j--) {
    aside += '<main>'

    for (i = 50; i > 0; i--) {
      var animationDelay = (Math.sin(i * Math.random() * 5) * i * (20 * j) - 10000);
      var animationDuration = (Math.sin((j * i) / 5) + 1000) * Math.sqrt(j / 2);

      aside += '<aside style="animation:aside ' + animationDuration + 'ms ease-in '+animationDelay+'ms infinite alternate"></aside>'
    }

    aside += '</main>'
  }

  document.body.innerHTML = aside + '<style>__STYLE__'
}
