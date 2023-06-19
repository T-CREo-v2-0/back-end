import os
import pickle

full_path = os.path.realpath(__file__)

# RandomForestClassifier_ENG-Colab.sav
filename_ENG = full_path.replace('classifiers.py', 'RandomForestClassifier_ENG-Colab.sav')
load_ENGmodel = pickle.load(open(filename_ENG, 'rb'))

# RandomForestClassifier_ESP-Colab.sav
filename_ESP = full_path.replace('classifiers.py', 'RandomForestClassifier_ESP-Colab.sav')
load_ESPmodel = pickle.load(open(filename_ESP, 'rb'))
