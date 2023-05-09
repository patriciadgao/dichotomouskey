import csv

print("export const flowers = [")

def escape_quotes(st):
    return st.replace("'",r"\'").replace('"',r'\"')

with open("scripts/flowers.tsv") as file:
    tsv = csv.reader(file, delimiter="\t")
    isFirst = True

    for line in tsv:
        if isFirst:
            isFirst = False
        else:
            name = escape_quotes(line[0])
            genus = line[1]
            colors = line[2].split(';')
            petals = line[3]
            edge = line[4].split(';')
            size = line[5]
            shape = line[6]
            tree = line[7]
            description = escape_quotes(line[8])
            print("{")
            print("\tname: '" + name + "',")
            print("\tgenus: '" + genus + "',")
            print("\tcolors: " + str(colors) + ",")
            print("\tpetals: '" + petals + "',")
            print("\tedge: " + str(edge) + ",")
            print("\tsize: '" + size + "',")
            print("\tshape: '" + shape + "',")
            print("\ttree: '" + tree + "',")
            print("\tdescription: '" + description + "',")
            print("},")
print("];")