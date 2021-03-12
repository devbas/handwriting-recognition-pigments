## Recognizing Handwriting in old pigment recipes

- Preprocess images with OpenCV
  1. Dilate the image, to get rid of the text
  2. Median blur the result with a decent sized kernel to further suppress any text.
  3. Calculate the difference between the original and the background we just obtained. The bits that are identical will be black (close to 0 difference), the text will be white (large difference).
  4. Normalize the image, so that we use the full dynamic range.
  5. Truncate the remaining gray away and re-normalize the image
  6. Resize the image (for processing speed)
  7. Find contours using Canny edge detection
  8. Crop the image
  9. Resize the image (for shape standardisation)
  10. Save image

### Experiments

#### RCNN for object localization
Images can have the following objects:


#### Basic CNN for text recognition
Assemble all unique words in a dictionary, 
- Seq-to-Seq learning
- 