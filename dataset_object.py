import json
from os import listdir
from mrcnn.utils import Dataset
from mrcnn.config import Config
from mrcnn.model import MaskRCNN
from numpy import asarray
from numpy import zeros
from matplotlib import pyplot 

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
      # extract image id
      image_id = filename.rpartition('.')[0]
      
      iterator = iterator + 1

      # skip all images after 120 if we are building the train set
      if is_train and iterator >= 120:
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

class RecipeConfig(Config): 
  # define the name of the configuration 
  NAME = 'recipe_cfg'
  # number of classes (background + recipe) 
  NUM_CLASSES = 7
  # number of training steps per epoch
  STEPS_PER_EPOCH = 30

# train set
train_set = RecipeDataset()
train_set.load_dataset('data/', is_train=True)
train_set.prepare()
print(f'Train: {len(train_set.image_ids)}')

# test/val set
test_set = RecipeDataset()
test_set.load_dataset('data/', is_train=False)
test_set.prepare()
print(f'Test: {len(test_set.image_ids)}')

config = RecipeConfig()
config.display()

# define the model 
model = MaskRCNN(mode='training', model_dir='./', config=config)

# load weights and exclude the output layers
model.load_weights('mask_rcnn_coco.h5', by_name=True, exclude=['mrcnn_class_logits', 'mrcnn_bbox_fc', 'mrcnn_bbox', 'mrcnn_mask'])

# train weights (output layers or heads)
model.train(train_set, test_set, learning_rate=config.LEARNING_RATE, epochs=5, layers='heads')
