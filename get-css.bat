call purgecss --css vendor/bootstrap/css/bootstrap.css --content src/*.html -o ./ --keyframes true --fontFace true
call cssnano bootstrap.css ./src/styles/bootstrap.min.css --discardComments.removeAll
del bootstrap.css