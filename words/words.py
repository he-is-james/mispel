import json
import time
import requests

def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

with open("WordList.txt") as f:
  raw_words = f.readlines()
  words = set()
  for line in raw_words:
    if len(line) > 2:
      word = line.split("\",")[1][2:]
      words.add(word)

  items = [] 
  with open("words.json", "r+") as f:
    fd = json.load(f)
    fd['words'] = []
    for chunk in chunks(list(words), 420):
      for word in chunk:
        print(word)
        response = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}")
        if response.status_code == 200:
          definition = response.json()[0]['meanings'][0]['definitions'][0]['definition']
          if definition:
            item = {'word' : word, 'definition': definition}
            fd['words'].append(item)
      print(f"Chunk finished, wrote {len(chunk)} words")
      time.sleep(320)
    json.dump(fd, f)

  print(f"We have {len(items)} words")
