#!flask/bin/python
# Filed needs to be copied into a splace to run
from flask import Flask, render_template, Blueprint, request, redirect, url_for, flash, abort, jsonify
import tensorflow as tf, sys
import os
import shutil
os.environ['TF_CPP_MIN_LOG_LEVEL']='2'

app = Flask(__name__)

class vision_api_reponse(object):
    def __init__(self, label, score):
        self.label = label
        self.score = score

def digital_eye_api_check(project,image_name):
    #Response with scores
    api_response = []

    # change this as you see fit
    image_dir = "/digital-eye-projects/" + project + "/eval-imgs/untested/"
    image_path = image_dir + image_name

    app.logger.info('%s project name', project) 
    app.logger.info('%s image name', image_name) 
    app.logger.info('%s image_path name', image_path)

    # read in the image_data
    image_data = tf.gfile.FastGFile(image_path, 'rb').read()

    # Loads label file, strips off carriage return
    label_lines = [line.rstrip() for line in tf.gfile.GFile("/digital-eye-projects/" + project + "/ml-model/current/retrained_labels.txt")]

    # Unpersists graph from file
    with tf.gfile.FastGFile("/digital-eye-projects/" + project + "/ml-model/current/retrained_graph.pb", 'rb') as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())
        _ = tf.import_graph_def(graph_def, name='')

    with tf.Session() as sess:
        # Feed the image_data as input to the graph and get first prediction
        softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')

        predictions = sess.run(softmax_tensor, \
            {'DecodeJpeg/contents:0': image_data})

        # Sort to show labels of first prediction in order of confidence
        top_k = predictions[0].argsort()[-len(predictions[0]):][::-1]

        #winning label
        winning_label = "na"
        winning_score = 0
    
        for node_id in top_k:
            human_string = label_lines[node_id]
            score = predictions[0][node_id]
            app.logger.info('%s (score = %.5f)' % (human_string, score))
            if score > winning_score:
                winning_score = score
                winning_label = human_string

        app.logger.info('api_response %s', api_response)

        app.logger.info('full path to go to' , "/digital-eye-projects/" + project + "/eval-imgs/tested-labels/" + winning_label.replace(" ", "-") + "/" + image_name)
        shutil.move(image_path, "/digital-eye-projects/" + project + "/eval-imgs/tested-labels/" + winning_label.replace(" ", "-") + "/" + image_name)
        return winning_label

@app.route('/digital-eye-api/v1.0/test')
def index():
    project = request.args.get('project', '')
    image_name = request.args.get('image_name', '')
    app.logger.info('%s before project name', project) 
    app.logger.info('%s before image name', image_name)  
    return jsonify({'response': digital_eye_api_check(project, image_name)})

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')