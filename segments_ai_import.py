import json
from segments import SegmentsClient

api_key = 'acfddf1284e3881abeaf4b0b83234cc7d1fbafaf'
client = SegmentsClient(api_key)

# Process annotations from segments.ai
def process_segments_ai_annotations(samples, dest_folder, client, segments_labelset_name, segments_dataset_name):

  segments_classnames = client.get_dataset(segments_dataset_name) 
  classnames = segments_classnames['task_attributes']['categories']

  for sample in samples:

    sample_name = sample['name']
    image_id = sample_name.rpartition('.')[0] # strip away the file extension
    ann_filename = image_id + '.json'

    labels = client.get_label(sample['uuid'], segments_labelset_name)

    if 'annotations' in labels['attributes']:
      for i in range(len(labels['attributes']['annotations'])): 
        segments_label_id = labels['attributes']['annotations'][i]['category_id']
        labels['attributes']['annotations'][i]['class'] = next((item['name'] for item in classnames if item['id'] == segments_label_id), None)

    sample['labels'] = labels

    with open(dest_folder + ann_filename, 'w') as f:
      json.dump(sample, f)

segments_dataset_name = 'devbas/Test'  
samples = client.get_samples(segments_dataset_name)
dest_folder = 'data/segment_annotations/'
segments_labelset_name = 'ground-truth'

process_segments_ai_annotations(samples, dest_folder, client, segments_labelset_name, segments_dataset_name)
