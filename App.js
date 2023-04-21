import * as React from 'react';
import {
  Button,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#F5F7FB',
    overflowX: 'hidden',
    textAlign: 'center',
    paddingTop:
      Platform.OS === 'ios'
        ? Constants.statusBarHeight + 20
        : Constants.statusBarHeight + 100,
  },
  textWrapper: {
    padding: 20,
    gap: 20,
  },
  blue: { color: '#293264' },
  blueCircle: {
    backgroundColor: '#DEEBF8',
    width: '200px',
    height: '200px',
    borderRadius: '200px',
    position: 'absolute',
    bottom: -50,
    left: -50,
  },
  yellowCircle: {
    backgroundColor: '#FFFAD1',
    width: '200px',
    height: '200px',
    borderRadius: '90px',
    position: 'absolute',
    top: -50,
    right: -50,
  },
  heading: {
    color: '#293264',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 18 : 'inherit',
  },
  h1: {
    color: '#293264',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: Platform.OS === 'ios' ? 20 : 'initial',
  },
  input: {
    padding: Platform.OS === 'ios' ? 0 : 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input2: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  marginBottom20: {
    marginBottom: 20,
  },
  iosMargin: {
    marginBottom: Platform.OS === 'ios' ? 20 : 'inherit',
  },
});

function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = React.useState('9');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('Easy');

  return (
    <View style={styles.container}>
      <View style={styles.yellowCircle}></View>
      <View style={styles.blueCircle}></View>
      <View style={styles.textWrapper}>
        <Text style={styles.h1}>Quizzical</Text>
        <Text style={[styles.blue, styles.iosMargin]}>
          Click Start for a short 5 question quiz on a category and difficulty
          level of your choice
        </Text>
        <Text
          style={[styles.heading, styles.iosMargin]}
          nativeID="categoryLabel">
          Category
        </Text>
        <Picker
          style={[styles.input, styles.iosMargin]}
          accessibilityLabelledBy="categoryLabel"
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
          <Picker.Item label="General Knowledge" value="9">
            General Knowledge
          </Picker.Item>
          <Picker.Item label="Entertainment: Books" value="10">
            Entertainment: Books
          </Picker.Item>
          <Picker.Item label="Entertainment: Film" value="11">
            Entertainment: Film
          </Picker.Item>
          <Picker.Item label="Entertainment: Music" value="12">
            Entertainment: Music
          </Picker.Item>
          <Picker.Item label="Entertainment: Musicals" value="13">
            Entertainment: Musicals
          </Picker.Item>
          <Picker.Item label="Entertainment: TV" value="14">
            Entertainment: TV
          </Picker.Item>
          <Picker.Item label="Entertainment: Video Games" value="15">
            Entertainment: Video Games
          </Picker.Item>
          <Picker.Item label="Entertainment: Board Games" value="16">
            Entertainment: Board Games
          </Picker.Item>
          <Picker.Item label="Science & Nature" value="17">
            Science & Nature
          </Picker.Item>
          <Picker.Item label="Science: Computers" value="18">
            Science: Computers
          </Picker.Item>
          <Picker.Item label="Science: Mathematics" value="19">
            Science: Mathematics
          </Picker.Item>
          <Picker.Item label="Mythology" value="20">
            Mythology
          </Picker.Item>
          <Picker.Item label="Sports" value="21">
            Sports
          </Picker.Item>
          <Picker.Item label="Geography" value="22">
            Geography
          </Picker.Item>
          <Picker.Item label="History" value="23">
            History
          </Picker.Item>
          <Picker.Item label="Politics" value="24">
            Politics
          </Picker.Item>
          <Picker.Item label="Art" value="25">
            Art
          </Picker.Item>
          <Picker.Item label="Celebrities" value="26">
            Celebrities
          </Picker.Item>
          <Picker.Item label="Animals" value="27">
            Animals
          </Picker.Item>
          <Picker.Item label="Vehicles" value="28">
            Vehicles
          </Picker.Item>
          <Picker.Item label="Entertainment: Comics" value="29">
            Entertainment: Comics
          </Picker.Item>
          <Picker.Item label="Science: Gadgets" value="30">
            Science: Gadbets
          </Picker.Item>
          <Picker.Item label="Entertainment: Anime & Manga" value="31">
            Entertainment: Anime & Manga
          </Picker.Item>
          <Picker.Item label="Entertainment: Cartoon & Animations" value="32">
            Entertainment: Cartoon & Animations
          </Picker.Item>
        </Picker>
        <Text
          style={[styles.heading, styles.iosMargin]}
          nativeID="difficultyLabel">
          Difficulty
        </Text>
        <Picker
          style={styles.input2}
          selectedValue={selectedDifficulty}
          onValueChange={(itemValue) => setSelectedDifficulty(itemValue)}>
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker>

        <Button
          title="Start"
          color="#4D5B9E"
          onPress={() =>
            navigation.navigate('Quiz', {
              selectedCategory: selectedCategory,
              selectedDifficulty: selectedDifficulty,
            })
          }
        />
      </View>
    </View>
  );
}

function QuizScreen({ route, navigation }) {
  const [score, setScore] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);
  const [questionsIndex, setQuestionsIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const { selectedCategory, selectedDifficulty } = route.params;
  const [answered, setAnswered] = React.useState(false);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const handleSelection = (answer, correctAnswer, question) => {
    question.userAnswer = answer;

    setAnswered(true);
    if (!answered && answer === correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setAnswered(false);
    setQuestionsIndex((prev) => prev + 1);
  };

  React.useEffect(() => {
    // problem with interpolation
    // difficulty needs to be lowercase - otherwise you will get {reponse_code: 2}
    setLoading(true);
    fetch(
      `https://opentdb.com/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedDifficulty.toLowerCase()}&type=multiple&encode=url3986`
    )
      .then((res) => res.json())
      .then((data) => {
        const combinedAnswers = data.results.map((q) => {
          const answerArr = shuffle([...q.incorrect_answers, q.correct_answer]);

          const allAnswers = answerArr.map((answer) => {
            return {
              id: uuid.v4(),
              answer: decodeURIComponent(answer),
            };
          });

          return {
            id: uuid.v4(),
            question: decodeURIComponent(q.question),
            answers: allAnswers,
            correctAnswer: decodeURIComponent(q.correct_answer),
            userAnswer: null,
          };
        });
        setQuestions(combinedAnswers);
        setLoading(false);
      });
  }, [selectedDifficulty, selectedCategory]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#293264',
        backgroundColor: '#F5F7FB',
        gap: 10,
        overflowX: 'hidden',
        paddingTop:
          Platform.OS === 'ios'
            ? Constants.statusBarHeight + 100
            : Constants.statusBarHeight,
      }}>
      <View style={styles.yellowCircle}></View>
      <View style={styles.blueCircle}></View>
      {loading && <ActivityIndicator size="large" color="#293264" />}
      {!loading && (
        <View>
          <View>
            {questionsIndex < 5 ? (
              <Text style={[styles.heading, styles.marginBottom20]}>
                Question {questionsIndex + 1}
              </Text>
            ) : null}
            {questions[questionsIndex] && (
              <Question
                answered={answered}
                question={questions[questionsIndex]}
                handleSelection={handleSelection}
              />
            )}
          </View>
          {questionsIndex === 5 && <Results score={score} />}
          <View
            style={{ flexDirection: 'row', gap: 50, justifyContent: 'center' }}>
            // gap doesn't work on ios
            <Button
              title="Reset"
              color="black"
              onPress={() => navigation.navigate('Home')}
            />
            {questionsIndex < 5 ? (
              <Button
                title={questionsIndex >= 4 ? 'Results' : 'Next'}
                color="#4D5B9E"
                disabled={!answered}
                onPress={() => handleNext()}
              />
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
}

const Question = ({ question, handleSelection, answered }) => {
  // for ios needed to add maxHeight
  // buttons have no styling

  return (
    <View
      style={{
        gap: 10,
        padding: 20,
        textAlign: 'left',
        maxHeight: Platform.OS === 'ios' ? '80%' : 'initial',
      }}>
      <Text style={styles.heading}>{question.question}</Text>
      <FlatList
        data={question.answers}
        renderItem={({ item }) => (
          <Pressable
            style={{ paddingTop: 10, paddingBottom: 20 }}
            onPress={() =>
              handleSelection(item.answer, question.correctAnswer, question)
            }>
            <Text
              style={{
                borderRadius: 20,
                padding: 10,
                border: '1px solid #4D5B9E',
                color:
                  answered &&
                  (item.answer === question.correctAnswer ||
                    question.userAnswer === item.answer)
                    ? '#fff'
                    : '#4D5B9E',
                backgroundColor:
                  answered && item.answer === question.correctAnswer
                    ? 'green'
                    : answered && question.userAnswer === item.answer
                    ? 'red'
                    : '',
              }}>
              {item.answer}
            </Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

function Results({ score }) {
  return (
    <View style={{ marginBottom: Platform.OS === 'ios' ? 0 : 20 }}>
      <Text style={styles.heading}>{score} / 5 questions correct</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
