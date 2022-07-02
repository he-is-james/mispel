with open("WordList.txt") as f:
  raw_words = f.readlines()
  words = set()
  for line in raw_words:
    if len(line) > 2:
      word = line.split(",")[1][2:]
      words.add(word.strip("\""))
  print(f"We have {len(words)} words")

