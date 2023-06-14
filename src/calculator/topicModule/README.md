#### Install

Virtual enviroment

  ```bash
  python -m venv venv
  source venv/bin/activate
  ```

Install dependencies

  ```bash
  pip install -r requirements.txt
  ```

#### Run

  ```bash
  python get_distance.py
  ```

Then you can open a virtual environment with `poetry shell`.

#### Get hellinger distance

Run `python get_distance.py` and modify the example..

#### Integrate it into the Credibility Model

If the other parameters of the Credibiltity are 75%
and the hellinger distance is 25% -> Sum: `(1 - hellinger_distance)*25`

### Example:

#### other parameters: 0.60
#### hellinger distance: 0.1
#### total credibility: 0.60 + ( 0.9 x 25% ) = 0.60 + 0.225 = 0.825
