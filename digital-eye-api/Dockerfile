FROM gcr.io/tensorflow/tensorflow:latest-devel
LABEL maintainer "Christopher Hamm" email "<email@christopherhamm.com>"

WORKDIR /tensorflow
RUN git pull
WORKDIR /

# Setup directory and copy script for API server
RUN mkdir -p /var/www/app

# Copy over api server script
ADD ./digital-eye-api-server.py /var/www/app/digital-eye-api-server.py

# Setup Eve
RUN pip install eve

# Define environment variable
ENV NAME DIGITAL-EYE-API

##############################################################################################################################
# Commands to run after building docker file #
# RUN $docker run -it -init -p 5000:5000 -v $PWD/../projects:/digital-eye-projects/ digital-eye-api

# NOT NEEDeD REALLY RUN $docker run -it -v $PWD/../projects/cnet-fd-page:/digital-eye-project/ digital-eye-trainer