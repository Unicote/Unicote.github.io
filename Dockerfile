FROM alpine:edge

RUN apk add git curl hugo bash --update

COPY . /app
RUN cd /app
RUN git clone https://github.com/unicote/Unicote.github.io -b main /public

RUN git config --global user.email "arvogl874@gmail.com"
RUN git config --global user.name "Unicote"

WORKDIR /app

CMD ["bash", "push.sh"]
