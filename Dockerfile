FROM node:8

EXPOSE 80

ENV WDIR /sonosplus

WORKDIR $WDIR

RUN npm install -g yarn
RUN git clone https://github.com/jishi/node-sonos-http-api.git && cd node-sonos-http-api && npm install
RUN ls


COPY . $WDIR
RUN cd frontend && npm install && npm run build
RUN cd backend && npm install
# RUN npm install

CMD cd node-sonos-http-api; ( npm start & ); cd ../; ( node index.js );
