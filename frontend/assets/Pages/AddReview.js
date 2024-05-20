import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Button } from 'react-native';
import { AntDesign, Feather } from "@expo/vector-icons";
import tw from "twrnc";
import { MaterialIcons } from '@expo/vector-icons';

const AddReview = () => {
  const [titleText, setTitleText] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = () => {
    // Here, you can perform the necessary actions to save the review, rating, and media
    console.log('Title:', titleText);
    console.log('Review Text:', reviewText);
    console.log('Rating:', rating);
    console.log('Media:', selectedFile);
  

    // Optionally, you can make an API request to save the data including media
  };

  const handleSearch = () => {
    // Here, you can perform the necessary actions to search for registered businesses
    console.log('Search Query:', searchQuery);

    // Optionally, you can make an API request to search for businesses based on the query
  };

 /* const handleMediaUpload = async () => {
    try {
      const { granted } = await RNFS.requestReadExternalStoragePermission();
      if (!granted) {
        console.log('Permission denied');
        return;
      }
  
      const res = await RNFS.launchImagePicker();
      if (res.didCancel) {
        console.log('File picker canceled');
        return;
      }
  
      setSelectedFile(res);
      // Send the selectedFile to your Node.js server
      // using fetch or axios
    } catch (error) {
      console.log('Error:', error);
    }
  };*/
  const renderRatingStars = () => {
    const starIcons = [];

    for (let i = 1; i <= 5; i++) {
      starIcons.push(
        <TouchableOpacity
          key={i}
          style={[styles.ratingButton, rating >= i && styles.selectedRatingButton]}
          onPress={() => setRating(i)}
        >
          <Text style={styles.star}>{rating >= i ? '★' : '☆'}</Text>
        </TouchableOpacity>
      );
    }

    return starIcons;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Businesses"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      
    {/*  <View style={styles.mediaContainer}>
  <Text style={styles.mediaLabel}>Media:</Text>
  <TouchableOpacity style={styles.mediaButton} onPress={handleMediaUpload}>
    <MaterialIcons name="attach-file" size={24} color="black" />
    <Text style={styles.mediaButtonText}>Attach File</Text>
  </TouchableOpacity>
  {selectedFile && (
    <Text style={styles.selectedFileText}>{selectedFile.name}</Text>
  )}
</View>
*/}

      
      <Text style={styles.title}>Add a Review</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={titleText}
          onChangeText={setTitleText}
        />
        <TextInput
          style={[styles.input, styles.reviewInput]}
          placeholder="Review Text"
          value={reviewText}
          onChangeText={setReviewText}
          multiline
        />
        <Text style={styles.label}>Rating:</Text>
        <View style={styles.ratingContainer}>{renderRatingStars()}</View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 20,
    backgroundColor: '#F2E8DE'
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mediaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mediaLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  mediaButtonText: {
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  reviewInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  ratingButton: {
    marginRight: 10,
  },
  star: {
    fontSize: 24,
    color: '#FFD700',
  },
  selectedRatingButton: {
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AddReview;