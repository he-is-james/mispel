import re
import json
import time
import requests


def chunks(lst, n):
  """Yield successive n-sized chunks from lst."""
  for i in range(0, len(lst), n):
    yield lst[i:i + n]

def get_definition(word):
  response = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}")
  if response.status_code == 200:
    definition = response.json()[0]['meanings'][0]['definitions'][0]['definition']
    pattern = re.compile(word)
    return re.sub(pattern, lambda m: '_' * len(m.group()), definition)
  return None

with open("WordList.txt") as f:
  raw_words = f.readlines()
  words = set()
  for line in raw_words:
    if len(line) > 2:
      word = line.split("\",")[1][2:]
      words.add(word)

  items = [] 
  total = 0
  with open("words.json", "r+") as f:
    fd = json.load(f)
    fd['words'] = []
    for chunk in chunks(list(words), 420):
      counter = 0
      for word in chunk:
        if definition := get_definition(word):
          item = {'word' : word, 'definition': definition}
          fd['words'].append(item)
          counter += 1
          total += 1
      print(f"Chunk finished, wrote {counter} words")
      time.sleep(320)
    json.dump(fd, f)
  print(f"We have {total} words")
