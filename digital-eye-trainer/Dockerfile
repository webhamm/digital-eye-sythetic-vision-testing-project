FROM gcr.io/tensorflow/tensorflow:latest-devel
LABEL maintainer "Christopher Hamm" email "<email@christopherhamm.com>"
WORKDIR /tensorflow
RUN git pull
WORKDIR /

# Setup retrain script for trainer
RUN mkdir /var/opt/script
ADD ./bin/retrain.sh /var/opt/script/retrain.sh

# Define environment variable
ENV NAME DIGITAL-EYE-TRAINER

# This container is much smaller since it doesn't require same libaries as the ML VISION API service
# docker run -it -p 5000:5000 -v $PWD/../projects:/digital-eye-projects/ digital-eye-trainer