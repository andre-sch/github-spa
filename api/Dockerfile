FROM maven

COPY . .
RUN mvn package
CMD java -jar target/api-1.0.0.jar
