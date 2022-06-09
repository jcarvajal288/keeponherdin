FROM    clojure:lein
COPY    . /app
WORKDIR /app
RUN     lein deps
CMD     lein ring server-headless 8000

EXPOSE 8000


