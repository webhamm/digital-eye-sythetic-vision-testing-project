#!/bin/bash
# ------------------------------------------------------------------------------------------------------------------------
# Copy over old model for preservation
cd /digital-eye-projects/ml-model/
mkdir -p archive/$(date +%Y%m%d_%H%M%S)
mkdir -p archive/$(date +%Y%m%d_%H%M%S) 
cp -r current/* archive/$(date +%Y%m%d_%H%M)*
rm -r current/*
# ------------------------------------------------------------------------------------------------------------------------

# ------------------------------------------------------------------------------------------------------------------------
# PLACEHOLDER to move images from /digital-eye-projects/eval-imgs/tested-labels/* to  /digital-eye-projects/labels/* .. 
# Need to figure out how to prevent override copy
# ------------------------------------------------------------------------------------------------------------------------

# ------------------------------------------------------------------------------------------------------------------------
# GO RETRAIN
cd /tensorflow
python tensorflow/examples/image_retraining/retrain.py --bottleneck_dir=/digital-eye-projects/ml-model/current/bottlenecks \
--how_many_training_steps 100 --model_dir=/digital-eye-projects/ml-model/current/inception \
--output_graph=/digital-eye-projects/ml-model/current/retrained_graph.pb \
--output_labels=/digital-eye-projects/ml-model/current/retrained_labels.txt --image_dir /digital-eye-projects/labels \
/
# ------------------------------------------------------------------------------------------------------------------------
