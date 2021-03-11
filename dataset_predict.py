import json
from os import listdir
from mrcnn.utils import Dataset
from mrcnn.config import Config
from mrcnn.model import MaskRCNN
from numpy import zeros
from numpy import asarray
from numpy import expand_dims
from numpy import mean
from matplotlib import pyplot 
from mrcnn.utils import compute_ap
from mrcnn.utils import trim_zeros
from mrcnn.utils import compute_matches
from mrcnn.model import load_image_gt
from mrcnn.model import mold_image
import numpy as np
import matplotlib
from matplotlib import pyplot
from matplotlib.patches import Rectangle
matplotlib.use('TkAgg')


class RecipeDataset(Dataset):

  # load the dataset definitions
  def load_dataset(self, dataset_dir, is_train=True):
    # define dataset classes
    self.add_class('dataset', 0, 'title')
    self.add_class('dataset', 1, 'ingredient')
    self.add_class('dataset', 2, 'ingredient_amount')
    self.add_class('dataset', 3, 'description')
    self.add_class('dataset', 4, 'pigment_id')
    self.add_class('dataset', 5, 'delimiter')

    images_dir = dataset_dir + 'images400/'
    annotations_dir = dataset_dir + 'segment_annotations/'
    iterator = 0

    for filename in listdir(images_dir):

      if filename == '.DS_Store': 
        continue 
      
      # extract image id
      image_id = filename.rpartition('.')[0]
      
      iterator = iterator + 1

      # skip all images after 120 if we are building the train set
      if is_train and (iterator >= 25 or iterator < 15):
        continue

      # skip all images before 120 if we are building the test/val set
      if not is_train and iterator < 120:
        continue

      img_path = images_dir + filename
      ann_path = annotations_dir + image_id + '.json'

      self.add_image('dataset', image_id=image_id, path=img_path, annotation=ann_path)

      

  def extract_boxes(self, filename):
    print(filename)

    with open(filename) as f:
      ann_dict = json.load(f)
    
    boxes = list()

    if 'annotations' in ann_dict['labels']['attributes']: 
      for ann in ann_dict['labels']['attributes']['annotations']:
        xmin = int(ann['points'][0][0])
        ymin = int(ann['points'][0][1])
        xmax = int(ann['points'][1][0])
        ymax = int(ann['points'][1][1])
        box_info = [xmin, ymin, xmax, ymax, ann['class']]

        boxes.append(box_info)
    
    width = 400
    height = 400

    return boxes, width, height

  # load the masks for an image
  def load_mask(self, image_id):
    # get details of image
    info = self.image_info[image_id]

    # define box file location
    path = info['annotation']

    # load json
    boxes, w, h = self.extract_boxes(path)

    # create one array for all masks, each on a different channel
    masks = zeros([h, w, len(boxes)], dtype='uint8')

    # create masks
    class_ids = list()
    for i in range(len(boxes)): 
      box = boxes[i]
      row_s, row_e = box[1], box[3]
      col_s, col_e = box[0], box[2]
      masks[row_s:row_e, col_s:col_e, i] = 1
      class_ids.append(self.class_names.index(box[4]))
    
    return masks, asarray(class_ids, dtype='int32')

  # load an image reference
  def image_reference(self, image_id):
    info = self.image_info[image_id]
    return info['path']

class PredictionConfig(Config): 
  # define the name of the configuration 
  NAME = 'recipe_cfg'
  # number of classes (background + recipe) 
  NUM_CLASSES = 7

  USE_MINI_MASK=False

  # simplify GPU config
  GPU_COUNT = 1
  IMAGES_PER_GPU = 1

# plot a number of photos with ground truth and predictions
def plot_actual_vs_predicted(dataset, model, cfg, n_images=5):
	# load image and mask
	for i in range(n_images):
		# load the image and mask
		image = dataset.load_image(i)
		mask, _ = dataset.load_mask(i)
		# convert pixel values (e.g. center)
		scaled_image = mold_image(image, cfg)
		# convert image into one sample
		sample = expand_dims(scaled_image, 0)
		# make prediction
		yhat = model.detect(sample, verbose=0)[0]
		# define subplot
		pyplot.subplot(n_images, 2, i*2+1)
		# turn off axis labels
		pyplot.axis('off')
		# plot raw pixel data
		pyplot.imshow(image)
		if i == 0:
			pyplot.title('Actual')
		# plot masks
		for j in range(mask.shape[2]):
			pyplot.imshow(mask[:, :, j], cmap='gray', alpha=0.3)
		# get the context for drawing boxes
		pyplot.subplot(n_images, 2, i*2+2)
		# turn off axis labels
		pyplot.axis('off')
		# plot raw pixel data
		pyplot.imshow(image)
		if i == 0:
			pyplot.title('Predicted')
		ax = pyplot.gca()
		# plot each box
		for box in yhat['rois']:
			# get coordinates
			y1, x1, y2, x2 = box
			# calculate width and height of the box
			width, height = x2 - x1, y2 - y1
			# create the shape
			rect = Rectangle((x1, y1), width, height, fill=False, color='red')
			# draw the box
			ax.add_patch(rect)
    
    pyplot.savefig('test')
      # pyplot.show()


# load the train dataset
train_set = RecipeDataset()
train_set.load_dataset('data/', is_train=True)
train_set.prepare()
print('Train: %d' % len(train_set.image_ids))

# load the test dataset
test_set = RecipeDataset()
test_set.load_dataset('data/', is_train=False)
test_set.prepare()
print('Test: %d' % len(test_set.image_ids))

# create config
cfg = PredictionConfig()
# define the model
model = MaskRCNN(mode='inference', model_dir='./', config=cfg)
# load model weights
model.load_weights('./recipe_cfg20210311T1303/mask_rcnn_recipe_cfg_0005.h5', by_name=True)

# plot predictions for train dataset
plot_actual_vs_predicted(train_set, model, cfg)
# plot predictions for test dataset
plot_actual_vs_predicted(test_set, model, cfg)
