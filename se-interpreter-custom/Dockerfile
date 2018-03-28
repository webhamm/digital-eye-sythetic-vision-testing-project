FROM node:8
LABEL maintainer "Christopher Hamm" email "<email@christopherhamm.com>"

RUN mkdir -p /var/www/app
WORKDIR /var/www/app

# Setup the NPM libraries for app inside /var/www/app
RUN npm install se-interpreter
RUN npm install png-to-jpeg
RUN npm install request

#RUN apk update && apk add bash

ADD ./ /var/www/app

ADD ./step_types/SceneCheck.js /var/www/app/node_modules/se-interpreter/step_types/SceneCheck.js
ADD ./step_types/saveScreenshot.js /var/www/app/node_modules/se-interpreter/step_types/saveScreenshot.js
ADD ./step_types/Eval.js /var/www/app/node_modules/se-interpreter/step_types/Eval.js
ADD ./step_types/setMaximizeWindow.js /var/www/app/node_modules/se-interpreter/step_types/setMaximizeWindow.js

CMD ['bash']