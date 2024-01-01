import json

f = open("file2.json", encoding="utf8")

# returns JSON object as
# a dictionary
data = json.load(f)
new_list = []
c = 0

for j, k in enumerate(data):
    # print(data[j])
    if k.get("model") == "songs.song":
        data[j]["pk"] = j


print(data)

# with open("sample1.json", "w") as outfile:
#     json.dump(data, outfile)
# json.dump(data)
