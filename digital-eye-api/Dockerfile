FROM gcr.io/tensorflow/tensorflow:latest-devel
WORKDIR /tensorflow
RUN git pull
WORKDIR /

# Setup directory and copy script for API server
RUN mkdir -p /var/www/app

ADD ./digital-eye-api-server.py /var/www/app/digital-eye-api-server.py

# Setup Eve
RUN pip install eve

# Define environment variable
ENV NAME DIGITAL-EYE-API

##############################################################################################################################
# Commands to run after building docker file #
# RUN $docker run -it -init -p 5000:5000 -v $HOME/projects/digital-eye-api/projects:/digital-eye-projects/ digital-eye-api

# NOT NEEDeD REALLY RUN $docker run -it -v $HOME/projects/digital-eye-api/projects/cnet-fd-page:/digital-eye-project/ digital-eye-trainer
# $PWD/../
# Archive models #
# RUN $mkdir /digital-eye-project/ml-model/archive/{todays-date-time-dir}/
# RUN $copy /digital-eye-project/ml-model/current/* /digital-eye-project/ml-model/archive/{todays-date-time-dir}/*
# Remove old model #
# RUN rm -r /digital-eye-project/ml-model/current/*
# Training command # 
# RUN $python tensorflow/examples/image_retraining/retrain.py --bottleneck_dir=/digital-eye-project/ml-model/current/bottlenecks --how_many_training_steps 90 --model_dir=/digital-eye-project/ml-model/current/inception --output_graph=/digital-eye-project/ml-model/current/retrained_graph.pb --output_labels=/digital-eye-project/ml-model/current/retrained_labels.txt --image_dir /digital-eye-project/labels
# Setup for training if using same container as API BUT NOT running API py script
# RUN $python tensorflow/examples/image_retraining/retrain.py --bottleneck_dir=/digital-eye-projects/cnet-article-page/ml-model/current/bottlenecks --how_many_training_steps 100 --model_dir=/digital-eye-projects/cnet-article-page/ml-model/current/inception --output_graph=/digital-eye-projects/cnet-article-page/ml-model/current/retrained_graph.pb --output_labels=/digital-eye-projects/cnet-article-page/ml-model/current/retrained_labels.txt --image_dir /digital-eye-projects/cnet-article-page/labels

# To eval image ??????#
# WORKDIR /
# RUN $python /digital-eye-project/eval-imgs/pagetester_class.py untested/{test-image-file-name}.jpg