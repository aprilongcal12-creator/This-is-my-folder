import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (input.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: input.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderTask = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity
          style={styles.taskContent}
          onPress={() => toggleTask(item.id)}
        >
          <View
            style={[
              styles.checkbox,
              item.completed && styles.checkboxCompleted,
            ]}
          >
            {item.completed && <Text style={styles.check}>✓</Text>}
          </View>

          <Text
            style={[
              styles.taskText,
              item.completed && styles.completedText,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F7FB"
      />

      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>My To-Do List</Text>
          <Text style={styles.subtitle}>
            Stay organized and get things done.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a new task..."
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={addTask}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={addTask}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
          </Text>

          <Text style={styles.completedCounter}>
            {tasks.filter((task) => task.completed).length} Completed
          </Text>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            tasks.length === 0
              ? styles.emptyList
              : styles.list
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>✓</Text>
              <Text style={styles.emptyTitle}>
                No tasks yet
              </Text>
              <Text style={styles.emptyText}>
                Add your first task above.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#202331',
  },

  subtitle: {
    fontSize: 14,
    color: '#858A98',
    marginTop: 5,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#202331',
    borderWidth: 1,
    borderColor: '#E5E7ED',
  },

  addButton: {
    height: 52,
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 15,
    backgroundColor: '#6757D9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  counterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#303441',
  },

  completedCounter: {
    fontSize: 13,
    color: '#6757D9',
    fontWeight: '600',
  },

  list: {
    paddingBottom: 20,
  },

  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ECEEF3',
  },

  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#B7BBC5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  checkboxCompleted: {
    backgroundColor: '#6757D9',
    borderColor: '#6757D9',
  },

  check: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  taskText: {
    flex: 1,
    fontSize: 15,
    color: '#282C38',
    fontWeight: '600',
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#9A9DA7',
  },

  deleteButton: {
    backgroundColor: '#FDECEC',
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: 8,
  },

  deleteText: {
    color: '#E04D4D',
    fontSize: 11,
    fontWeight: '700',
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: -80,
  },

  emptyIcon: {
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: '#EDEAFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 32,
    color: '#6757D9',
    fontWeight: '800',
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#303441',
  },

  emptyText: {
    fontSize: 13,
    color: '#9296A2',
    marginTop: 5,
  },
});