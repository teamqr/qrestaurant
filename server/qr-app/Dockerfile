FROM eclipse-temurin:21-jdk-alpine

RUN apk upgrade --update-cache --available && \
   apk add openssl && \
   rm -rf /var/cache/apk/*

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN ./mvnw dependency:go-offline

COPY src ./src

RUN openssl genrsa -out ./src/main/resources/certificates/keypair.pem 2048
RUN openssl rsa -in ./src/main/resources/certificates/keypair.pem -pubout -out ./src/main/resources/certificates/public.pem
RUN openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in ./src/main/resources/certificates/keypair.pem -out ./src/main/resources/certificates/private.pem
RUN rm ./src/main/resources/certificates/keypair.pem

CMD ["./mvnw", "spring-boot:run"]
