import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  Pressable,
  Animated,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Profile Screen</Text>
    </View>
  );
};

const ToDoListScreen = ({ navigation }) => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addTodo = () => {
    if (todo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: todo,
        },
      ]);
      setTodo("");
    }
  };

  const completeTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  const clearAllTodos = () => {
    setTodos([]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const TodoItem = ({ item, onComplete, isDarkMode }) => {
    const opacity = new Animated.Value(1);

    const handleComplete = () => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onComplete(item.id);
      });
    };

    return (
      <Animated.View
        style={[
          styles.todoContainer,
          { backgroundColor: isDarkMode ? "#444" : "#fff", opacity },
        ]}
      >
        <Text style={[styles.todo, { color: isDarkMode ? "#fff" : "#000" }]}>
          {item.text}
        </Text>
        <Pressable style={styles.deleteButton} onPress={handleComplete}>
          <Text style={styles.deleteButtonText}>Complete</Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#fff" },
      ]}
    >
      <Pressable
        style={[
          styles.darkModeButton,
          { backgroundColor: isDarkMode ? "#333" : "#4A90E2" },
        ]}
        onPress={() => setIsDarkMode((prevMode) => !prevMode)}
      >
        <Text style={styles.buttonText}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Text>
      </Pressable>

      <Text style={[styles.header, { color: isDarkMode ? "#fff" : "#333" }]}>
        Task Manager
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            color: isDarkMode ? "#fff" : "#000",
            backgroundColor: isDarkMode ? "#333" : "#f7f7f7",
            borderColor: isDarkMode ? "#555" : "#ddd",
          },
        ]}
        placeholder="Add a new task..."
        placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
        value={todo}
        onChangeText={(text) => setTodo(text)}
      />
      <Button title="Add Task" onPress={addTodo} />

      <Button title="Clear All Tasks" onPress={clearAllTodos} color="#ff6666" />

      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onComplete={completeTask}
            isDarkMode={isDarkMode}
          />
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ToDoList" component={ToDoListScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    borderRadius: 10,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  todo: {
    fontSize: 18,
    width: "70%",
  },
  deleteButton: {
    backgroundColor: "#ff6666",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  header: {
    color: "#333",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  darkModeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
