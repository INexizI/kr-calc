FROM ruby:3.3.4-alpine

ENV APP_PATH /var/app \
  BUNDLE_VERSION 2.3.9 \
  BUNDLE_PATH /usr/local/bundle/gems \
  TMP_PATH /tmp \
  RAILS_LOG_TO_STDOUT true \
  RAILS_PORT 3000

RUN apk add --update tzdata && \
  cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
  echo "Europe/London" > /etc/timezone

RUN apk add --update --virtual runtime-deps \
  postgresql-client \
  nodejs \
  # libffi-dev \
  # readline \
  # sqlite \
  && rm -rf /var/cache/apk/* \
  && mkdir -p $APP_PATH

WORKDIR $TMP_PATH
ADD Gemfile* ./

RUN gem install bundler -- "$BUNDLE_VERSION" \
  && rm -rf $GEM_HOME/cache/*

RUN apk add --virtual build-deps \
  build-base \
  # openssl-dev \
  postgresql-dev \
  # libc-dev \
  # linux-headers \
  # libxml2-dev \
  # libxslt-dev \
  # readline-dev \
  && bundle install \
  && apk del build-deps

ENV APP_HOME /app
COPY . $APP_HOME
WORKDIR $APP_HOME

ENV RAILS_ENV=development \
  RACK_ENV=development

EXPOSE $RAILS_PORT

CMD ["rails", "server", "-b", "0.0.0.0"]
