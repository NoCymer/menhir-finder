FROM node:latest

# some installs
RUN apt-get update -y && \
    apt-get install -y zip unzip

WORKDIR /app

# Extract and copy NodeJS Src Code and dependancies
ADD app-nodejs-tf.tar .

# NodeJS will listen on 3000
EXPOSE 3000

# Add execution rights on entrypoint script
RUN chmod 744 ./launch.sh

ENTRYPOINT [ "./launch.sh" ]
