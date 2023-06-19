import os
import re
import gc
import ast
from functools import partial

full_path = os.path.realpath(__file__)

# dic_es.txt and dic_en.txt are dictionaries with the same structure:
file1 = open(full_path.replace('diccionario.py', 'dic_es.txt'), "r", encoding='utf-8-sig')
file2 = open(full_path.replace('diccionario.py', 'dic_en.txt'), "r", encoding='utf-8-sig')

content1 = file1.read()
content2 = file2.read()

dict_es = ast.literal_eval(content1)
dict_en = ast.literal_eval(content2)

file1.close()
file2.close()

def helper(dic, match):
    word = match.group(0)
    return dic.get(word, word)

def agregar_texto(text):
    word_re = re.compile(r'\b[a-zA-Z]+\b')
    new = word_re.sub(partial(helper, dict_en), text)
    return new
    del new
    gc.collect()

def add_text(text):
    word_re = re.compile(r'\b[a-zA-Z]+\b')
    new = word_re.sub(partial(helper, dict_en), text)
    return new
    del new
    gc.collect()
