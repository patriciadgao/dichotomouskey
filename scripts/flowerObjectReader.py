import csv
import json

# def escape_quotes(st):
#     return st.replace("'",r"\'").replace('"',r'\"')

flowers = []

with open("scripts/flowers.tsv") as file:
    tsv = csv.reader(file, delimiter="\t")
    isFirst = True

    for line in tsv:
        if isFirst:
            isFirst = False
        else:
            name = line[0]
            genus = line[1]
            colors = line[2].split(';')
            petals = line[3]
            edge = line[4].split(';')
            size = line[5]
            shape = line[6]
            tree = line[7]
            description = line[8]
            flowers.append({
                'name': name,
                'genus': genus,
                'colors': colors,
                'petals': petals,
                'edge': edge,
                'size': size,
                'shape': shape,
                'tree': tree,
                'description': description
            })

with open('src/flowers/flowers.js', 'w') as flower_file:
    flower_file.write('export const flowers = %s;' % json.dumps(flowers))