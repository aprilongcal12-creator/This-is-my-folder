import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Note = {
  id: string;
  title: string;
  description: string;
};

const STORAGE_KEY = '@vannas_notes';

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedNotes !== null) {
          const parsedNotes = JSON.parse(savedNotes);

          if (Array.isArray(parsedNotes)) {
            setNotes(parsedNotes);
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load saved notes.');
      } finally {
        setIsLoaded(true);
      }
    };

    loadNotes();
  }, []);

  useEffect(() => {
    const saveNotes = async () => {
      if (!isLoaded) return;

      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(notes)
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to save notes.');
      }
    };

    saveNotes();
  }, [notes, isLoaded]);

  const saveNote = () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Reminder', 'Please fill in both fields.');
      return;
    }

    if (editingId !== null) {
      setNotes(previousNotes =>
        previousNotes.map(note =>
          note.id === editingId
            ? {
                ...note,
                title: title.trim(),
                description: description.trim(),
              }
            : note
        )
      );

      setEditingId(null);
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
      };

      setNotes(previousNotes => [newNote, ...previousNotes]);
    }

    setTitle('');
    setDescription('');
  };

  const editNote = (note: Note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.id);
  };

  const deleteNote = (id: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setNotes(previousNotes =>
              previousNotes.filter(note => note.id !== id)
            );

            if (editingId === id) {
              setEditingId(null);
              setTitle('');
              setDescription('');
            }
          },
        },
      ]
    );
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your notes...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <Text style={styles.title}>
          Vanna's Notes ♡
        </Text>

        <View style={styles.form}>

          <Text style={styles.formTitle}>
            {editingId ? 'EDIT YOUR NOTE' : 'CREATE A NEW NOTE'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Note title"
            placeholderTextColor="#C77A99"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Write your note here..."
            placeholderTextColor="#C77A99"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveNote}
          >
            <Text style={styles.buttonText}>
              {editingId ? 'UPDATE NOTE' : 'ADD NOTE'}
            </Text>
          </TouchableOpacity>

          {editingId !== null && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={cancelEdit}
            >
              <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>
          )}

        </View>

        <Text style={styles.sectionTitle}>
          MY NOTES ({notes.length})
        </Text>

        {notes.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              No notes yet ♡
            </Text>
          </View>
        ) : (
          notes.map(note => (
            <View key={note.id} style={styles.noteCard}>

              <Text style={styles.noteTitle}>
                {note.title}
              </Text>

              <Text style={styles.noteDescription}>
                {note.description}
              </Text>

              <View style={styles.actionRow}>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editNote(note)}
                >
                  <Text style={styles.buttonText}>EDIT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteNote(note.id)}
                >
                  <Text style={styles.buttonText}>DELETE</Text>
                </TouchableOpacity>

              </View>

            </View>
          ))
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    padding: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
  },

  loadingText: {
    fontSize: 20,
    color: '#D63384',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D63384',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 30,
  },

  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    marginBottom: 30,
  },

  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D63384',
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#FFF0F5',
    borderWidth: 1,
    borderColor: '#F4A6C1',
    borderRadius: 12,
    padding: 15,
    fontSize: 17,
    color: '#7A284B',
    marginBottom: 15,
  },

  descriptionInput: {
    height: 110,
    textAlignVertical: 'top',
  },

  saveButton: {
    backgroundColor: '#E75480',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: '#999999',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#D63384',
    marginBottom: 15,
  },

  emptyBox: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D63384',
  },

  noteCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#E75480',
  },

  noteTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#D63384',
    marginBottom: 10,
  },

  noteDescription: {
    fontSize: 17,
    color: '#555555',
    lineHeight: 25,
  },

  actionRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#E75480',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#C2185B',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
});