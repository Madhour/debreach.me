id = 0

with open('data/demo_hashes_hibp.txt', encoding='utf8') as f:
    for line in f:
        pwhash = line[:-3]
        id += 1