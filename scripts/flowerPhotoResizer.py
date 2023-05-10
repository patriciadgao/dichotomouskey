from PIL import Image
import os

filename = "x"

# load each flower photo from the flower photos folder
directory = "src/flowers/photos"

# figure out which small photos we already have 
smallPhotoDirectory = "src/flowers/photos/small"
smallPhotos = os.listdir(smallPhotoDirectory)

for filename in os.listdir(directory):
    if filename[-4:] == ".jpg" and filename[:-4] + "_small.jpg" not in smallPhotos:
        # figure out if width is greater than height 
        img = Image.open(directory + "/" + filename)
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

        # resize image to be 144 x 144 px
        img = img.resize((144, 144), Image.Resampling.LANCZOS)

        # rotate image
        img = img.rotate(-90)

        # save new image 
        img.save(directory + "/small/" + filename[:-4] + "_small.jpg")