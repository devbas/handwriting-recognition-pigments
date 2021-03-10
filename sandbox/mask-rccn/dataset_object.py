class RecipeDataset(Dataset):

  # load the dataset definitions
  def load_dataset(self, dataset_dir, is_train=True):
    # define dataset classes
    self.add_class('dataset', 0, 'pigment')
    self.add_class('dataset', 1, 'ingredient')
    self.add_class('dataset', 2, 'ingredient_amount')
    self.add_class('dataset', 3, 'description')
    self.add_class('dataset', 4, 'pigment_id')

    images_dir = dataset_dir + '/images/'
    annotations_dir = dataset_dir + '/segment_annotations/'

    for filename in os.listdir(images_dir):
      # extract image id


  # load the masks for an image
  def load_mask(self, image_id):
    # ...

  # load an image reference
  def image_reference(self, image_id):
    # ...

# prepare the dataset
train_set = RecipeDataset()
train_set.load_dataset(...)
train_set.prepare()