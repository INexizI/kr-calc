FROM ruby:3.1.1-alpine

RUN apk add --update tzdata && \
    cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
    echo "Europe/London" > /etc/timezone

RUN apk add --update --virtual runtime-deps postgresql-client nodejs libffi-dev readline sqlite

WORKDIR /tmp
ADD Gemfile* ./

RUN apk add --virtual build-deps build-base openssl-dev postgresql-dev libc-dev linux-headers libxml2-dev libxslt-dev readline-dev && \
    bundle install && \
    apk del build-deps

ENV APP_HOME /app
COPY . $APP_HOME
WORKDIR $APP_HOME

ENV RAILS_ENV=development \
  RACK_ENV=development

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
