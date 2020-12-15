FROM node:12

WORKDIR /manage-learn-services/dhiti-service

#copy package.json file
COPY package.json /manage-learn-services/dhiti-service

#install node packges
RUN npm install

#copy all files 
COPY . /manage-learn-services/dhiti-service

#expose the application port
EXPOSE 4700

#start the application
CMD node app.js