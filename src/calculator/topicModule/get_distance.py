from pickle import load
import os
import re
import nltk
import warnings
import numpy as np
from scipy.spatial.distance import euclidean
warnings.filterwarnings('ignore')

full_path = os.path.realpath(__file__)
vectorizer_path = full_path.replace('get_distance.py', 'my_vectorizer.pkl')
vectorizer = load(open(vectorizer_path, 'rb'))
_SQRT2 = np.sqrt(2)  # sqrt(2) with default precision np.float64
NUM_TOPICS = 9


def get_keywords_on_selected_topics(model, vectorizer, topic_number, top_n=NUM_TOPICS):
    topic = model.components_[topic_number]
    keywords = [(vectorizer.get_feature_names()[i], topic[i])
                for i in topic.argsort()[:-top_n - 1:-1]]
    return keywords


def transform_text(model, text):
    return model.transform(vectorizer.transform([text]))[0]


def get_topic(text_transformed):
    values = np.array(text_transformed)
    return np.argmax(values)


def find_hashtags(tweet):
    '''This function will extract hashtags'''
    return re.findall('(#[A-Za-z]+[A-Za-z0-9-_]+)', tweet)


def hellinger(p, q):
    p_sqrt = np.sqrt(p)
    q_sqrt = np.sqrt(q)
    if np.isnan(p_sqrt).any() or np.isnan(q_sqrt).any():
        return 1
    return euclidean(np.sqrt(p), np.sqrt(q)) / _SQRT2


def remove_links(tweet):
    '''Takes a string and removes web links from it'''
    tweet = re.sub(r'http\S+', '', tweet)  # remove http links
    tweet = re.sub(r'bit.ly/\S+', '', tweet)  # rempve bitly links
    return tweet


def remove_users(tweet):
    '''Takes a string and removes retweet and @user information'''
    tweet = re.sub('(RT\s@[A-Za-z]+[A-Za-z0-9-_]+)',
                   '', tweet)  # remove retweet
    tweet = re.sub('(@[A-Za-z]+[A-Za-z0-9-_]+)',
                   '', tweet)  # remove tweeted at
    return tweet


my_stopwords = nltk.corpus.stopwords.words('english')
word_rooter = nltk.stem.snowball.PorterStemmer(ignore_stopwords=False).stem
my_punctuation = '!"$%&\'()*+,-./:;<=>?[\\]^_`{|}~•@'


def clean_tweet(tweet: str):
    tweet = remove_users(tweet)
    tweet = remove_links(tweet)
    tweet = tweet.lower()  # lower case
    tweet = re.sub('['+my_punctuation + ']+', ' ', tweet)  # strip punctuation
    tweet = re.sub('\s+', ' ', tweet)  # remove double spacing
    tweet = re.sub('([0-9]+)', '', tweet)  # remove numbers
    tweet_token_list = [word for word in tweet.split(' ')
                        if word not in my_stopwords]  # remove stopwords
    tweet_token_list = [word_rooter(word) if '#' not in word else ''
                        for word in tweet_token_list]  # apply word rooter
    tweet = ' '.join(tweet_token_list)
    return tweet

nmf_model_path = full_path.replace('get_distance.py', 'nmf_model.pkl')
nmf_model = load(open(nmf_model_path, 'rb'))


def get_distance(tweet: str):
    hashtags = find_hashtags(tweet)
    number_of_hashtags = len(hashtags)
    clean_tweet_string = clean_tweet(tweet)
    values_of_text = transform_text(nmf_model, clean_tweet_string)
    values_of_hashtags = []
    for ht in hashtags:
        transform = transform_text(nmf_model, clean_tweet(ht[1:]))
        values_of_hashtags.append(transform)
    arr = np.array(values_of_hashtags)
    sum_of_values_of_hashtags = arr.sum(axis=0)
    sum_of_values_of_hashtags = sum_of_values_of_hashtags / \
        len(values_of_hashtags)
    
    # TO-DO: Check if there's no hashtag

    # Check array values
    if np.all(sum_of_values_of_hashtags == sum_of_values_of_hashtags[0]):
        print('Invalid hashtag - the hashtag(s) does not exist on the database')
    elif (np.all(values_of_text == values_of_text[0])):
        print('Invalid tweet text')
    else:
        hellinger_distance = hellinger(
            sum_of_values_of_hashtags, values_of_text)
        print('Distance: ', hellinger_distance)
        # if the hellinger distance is 25% of the total credibility value
        print('Value to sum to the model: ', (1 - hellinger_distance)*25)


# Example
# get_distance("Black teenage boys are not men. They are children. Stop referring to a 17 year old as a man. #ferguson")


import sys 
get_distance(sys.argv[1])
print("First name: " + sys.argv[1])
