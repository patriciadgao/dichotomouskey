# from PIL import Image
# import os
# import csv
# import json
# from datetime import date

# flowers = []

# # load each flower photo from the flower photos folder
# flower_path = "src/flowers/photos"

# # figure out which small photos we already have 
# small_photo_path = "src/flowers/photos/small"
# small_photos = os.listdir(small_photo_path)

# with open("scripts/flowers.tsv") as file:
#     tsv = csv.reader(file, delimiter="\t")
#     is_first = True

#     for line in tsv:
#         if is_first:
#             is_first = False
#         else:
#             # generate generic information
#             name = line[0]
#             genus = line[1]
#             colors = line[2].split(';')
#             petals = line[3]
#             edge = line[4].split(';')
#             size = line[5]
#             shape = line[6]
#             tree = line[7]
#             description = line[8]

#             # determine if flower is new or not
#             new = False

#             # if flower is new, crop its image
#             if name + "_small.jpg" not in small_photos:
#                 # set new to true 
#                 new = True

#                 # figure out if width is greater than height 
#                 img = Image.open(flower_path + "/" + name + ".jpg")
#                 w = img.size[0]
#                 h = img.size[1]

#                 if w > h:
#                     left = (w-h)/2
#                     top = 0
#                     right = (w+h)/2
#                     bottom = h
#                 else:
#                     left = 0
#                     top = (h-w)/2
#                     right = w
#                     bottom = (h+w)/2

#                 # crop image to be square
#                 img = img.crop((left, top, right, bottom))

#                 # resize image to be 576 x 576 px
#                 img = img.resize((576, 576), Image.Resampling.LANCZOS)

#                 # save it in its current place 
#                 img.save(flower_path + "/" + name + ".jpg")

#                 # resize image to be 144 x 144 px
#                 img = img.resize((144, 144), Image.Resampling.LANCZOS)

#                 # rotate image
#                 # img = img.rotate(-90)

#                 # save new image 
#                 img.save(flower_path + "/small/" + name + "_small.jpg")
            
#             # add info to flower list
#             flowers.append({
#                 'name': name,
#                 'genus': genus,
#                 'colors': colors,
#                 'petals': petals,
#                 'edge': edge,
#                 'size': size,
#                 'shape': shape,
#                 'tree': tree,
#                 'description': description,
#                 'new': new
#             })

# with open('src/flowers/flowers.js', 'w') as flower_file:
#     flower_file.write('export const flowers = %s;' % json.dumps(flowers))

# # write today's updated date into a constant for the footer
# with open('src/flowers/lastUpdated.js', 'w') as last_updated_file:
#     last_updated_file.write("export const lastUpdated = '" + str(date.today()) + "';")

from PIL import Image
import os
import csv
import json
from datetime import date

flowers = []

# load each flower photo from the flower photos folder
flower_path = "src/flowers/photos"

with open("scripts/flowers.tsv") as file:
    tsv = csv.reader(file, delimiter="\t")
    is_first = True

    for line in tsv:
        if is_first:
            is_first = False
        else:
            name = line[0]
            # make a small version of the flower image
            # figure out if width is greater than height 
            img = Image.open(flower_path + "/" + name + ".jpg")
            w = img.size[0]
            h = img.size[1]

            if w > h:
                left = (w-h)/2
                top = 0
                right = (w+h)/2
                bottom = h
            else:
                left = 0
                top = (h-w)/2
                right = w
                bottom = (h+w)/2

            # crop image to be square
            img = img.crop((left, top, right, bottom))

            # resize image to be 576 x 576 px
            img = img.resize((576, 576), Image.Resampling.LANCZOS)

            # save it in its current place 
            img.save(flower_path + "/" + name + ".jpg")