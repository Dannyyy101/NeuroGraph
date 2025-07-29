FROM maven:3.9.11-ibm-semeru-21-noble

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Build the application
RUN mvn clean install -DskipTests

CMD ["java", "-jar", "/app/target/backend-0.0.1-SNAPSHOT.jar"]
