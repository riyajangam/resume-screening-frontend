import React, { useState } from 'react';
import './SelectionPages.css';

const SkillSelection = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const skills = [
    { id: 1, name: 'JavaScript', category: 'Programming Language' },
    { id: 2, name: 'Python', category: 'Programming Language' },
    { id: 3, name: 'React', category: 'Frontend Framework' },
    { id: 4, name: 'Node.js', category: 'Backend Framework' },
    { id: 5, name: 'HTML/CSS', category: 'Web Development' },
    { id: 6, name: 'SQL', category: 'Database' },
    { id: 7, name: 'AWS', category: 'Cloud Computing' },
    { id: 8, name: 'Docker', category: 'DevOps' }
  ];

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const quizQuestions = {
    JavaScript: {
      beginner: [
        {
          id: 1,
          question: "What is the correct way to declare a variable in JavaScript?",
          options: [
            "variable x;",
            "var x;",
            "x = variable;",
            "declare x;"
          ],
          correct: 1
        },
        {
          id: 2,
          question: "Which operator is used for strict equality comparison?",
          options: [
            "==",
            "===",
            "=",
            "!="
          ],
          correct: 1
        },
        {
          id: 3,
          question: "What does 'DOM' stand for in JavaScript?",
          options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Output Mode",
            "Document Order Model"
          ],
          correct: 0
        },
        {
          id: 4,
          question: "Which method adds an element to the end of an array?",
          options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
          ],
          correct: 0
        },
        {
          id: 5,
          question: "What is the purpose of the 'typeof' operator?",
          options: [
            "To check if a variable is defined",
            "To determine the type of a value",
            "To convert between types",
            "To create new types"
          ],
          correct: 1
        },
        {
          id: 6,
          question: "How do you write a comment in JavaScript?",
          options: [
            "// This is a comment",
            "<!-- This is a comment -->",
            "** This is a comment **",
            "# This is a comment"
          ],
          correct: 0
        },
        {
          id: 7,
          question: "What is the result of: '5' + 3 in JavaScript?",
          options: [
            "8",
            "53",
            "Error",
            "undefined"
          ],
          correct: 1
        },
        {
          id: 8,
          question: "Which function is used to parse a string to an integer?",
          options: [
            "parseInt()",
            "stringToInt()",
            "toInteger()",
            "convertInt()"
          ],
          correct: 0
        },
        {
          id: 9,
          question: "What is an arrow function in JavaScript?",
          options: [
            "A shorter way to write function expressions",
            "A type of loop",
            "A way to draw arrows on canvas",
            "A mathematical function"
          ],
          correct: 0
        },
        {
          id: 10,
          question: "Which keyword is used to declare a constant variable?",
          options: [
            "const",
            "let",
            "var",
            "constant"
          ],
          correct: 0
        }
      ],
      intermediate: [
        {
          id: 1,
          question: "What is closure in JavaScript?",
          options: [
            "A function that has access to its outer function's scope",
            "A way to close browser windows",
            "A method to end loops",
            "A type of variable declaration"
          ],
          correct: 0
        },
        {
          id: 2,
          question: "What is the purpose of the 'this' keyword?",
          options: [
            "Refers to the current object",
            "Refers to the parent object",
            "Refers to the global object",
            "Refers to the function itself"
          ],
          correct: 0
        },
        {
          id: 3,
          question: "What does 'JSON' stand for?",
          options: [
            "JavaScript Object Notation",
            "JavaScript Online Network",
            "Java Standard Object Naming",
            "JavaScript Organized Nodes"
          ],
          correct: 0
        },
        {
          id: 4,
          question: "What is event bubbling in JavaScript?",
          options: [
            "Events propagate from child to parent elements",
            "Events create bubbles on the screen",
            "Events happen simultaneously",
            "Events are cancelled"
          ],
          correct: 0
        },
        {
          id: 5,
          question: "What is a Promise in JavaScript?",
          options: [
            "An object representing eventual completion of an async operation",
            "A guarantee that code will run",
            "A type of variable",
            "A way to make functions faster"
          ],
          correct: 0
        },
        {
          id: 6,
          question: "What is the difference between 'let' and 'var'?",
          options: [
            "let has block scope, var has function scope",
            "let is faster than var",
            "var is newer than let",
            "There is no difference"
          ],
          correct: 0
        },
        {
          id: 7,
          question: "What is destructuring in JavaScript?",
          options: [
            "Extracting values from arrays or objects",
            "Breaking code into smaller functions",
            "Removing unused variables",
            "Optimizing code performance"
          ],
          correct: 0
        },
        {
          id: 8,
          question: "What is the spread operator used for?",
          options: [
            "Expanding arrays or objects",
            "Spreading events across elements",
            "Creating copies of functions",
            "Spreading data across servers"
          ],
          correct: 0
        },
        {
          id: 9,
          question: "What are template literals?",
          options: [
            "String literals allowing embedded expressions",
            "HTML templates",
            "Code templates",
            "Variable templates"
          ],
          correct: 0
        },
        {
          id: 10,
          question: "What is the purpose of 'async/await'?",
          options: [
            "To write asynchronous code in a synchronous manner",
            "To make code run faster",
            "To create animations",
            "To handle errors"
          ],
          correct: 0
        }
      ],
      advanced: [
        {
          id: 1,
          question: "What is the event loop in JavaScript?",
          options: [
            "Mechanism that handles asynchronous callbacks",
            "A type of for loop",
            "A way to loop through events",
            "A browser feature for animations"
          ],
          correct: 0
        },
        {
          id: 2,
          question: "What are JavaScript generators?",
          options: [
            "Functions that can be paused and resumed",
            "Functions that generate random numbers",
            "Functions that create other functions",
            "Functions that generate HTML"
          ],
          correct: 0
        },
        {
          id: 3,
          question: "What is memoization?",
          options: [
            "Caching results of expensive function calls",
            "Memorizing code patterns",
            "A memory optimization technique",
            "A type of variable declaration"
          ],
          correct: 0
        },
        {
          id: 4,
          question: "What are JavaScript Proxies?",
          options: [
            "Objects that wrap another object to intercept operations",
            "Server proxies for API calls",
            "Browser proxy settings",
            "Network proxies"
          ],
          correct: 0
        },
        {
          id: 5,
          question: "What is the difference between 'null' and 'undefined'?",
          options: [
            "null is assigned value, undefined is default",
            "undefined is assigned value, null is default",
            "They are the same",
            "null is for objects, undefined is for primitives"
          ],
          correct: 0
        },
        {
          id: 6,
          question: "What is currying in JavaScript?",
          options: [
            "Transforming a function with multiple arguments into nested functions",
            "A way to cook functions",
            "A performance optimization",
            "A type of loop"
          ],
          correct: 0
        },
        {
          id: 7,
          question: "What are Web Workers?",
          options: [
            "JavaScript running in background threads",
            "Web developers",
            "Browser workers",
            "Server workers"
          ],
          correct: 0
        },
        {
          id: 8,
          question: "What is the purpose of 'Symbol' in JavaScript?",
          options: [
            "To create unique property keys",
            "To create mathematical symbols",
            "To represent special characters",
            "To create icons"
          ],
          correct: 0
        },
        {
          id: 9,
          question: "What is the difference between '==' and '==='?",
          options: [
            "'==' performs type coercion, '===' does not",
            "'===' performs type coercion, '==' does not",
            "They are the same",
            "'==' is faster than '==='"
          ],
          correct: 0
        },
        {
          id: 10,
          question: "What is the Temporal Dead Zone?",
          options: [
            "The time between variable declaration and initialization",
            "A browser performance issue",
            "A memory leak scenario",
            "A network delay issue"
          ],
          correct: 0
        }
      ]
    }
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
  };

  const handleTakeQuiz = () => {
    if (selectedSkill && selectedLevel) {
      setShowQuiz(true);
      setQuizCompleted(false);
      setQuizScore(0);
    }
  };

  const handleQuizComplete = (score) => {
    setQuizScore(score);
    setQuizCompleted(true);
    
    // Save quiz result to user profile
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const quizResults = userData.quizResults || [];
    
    const newResult = {
      skill: selectedSkill.name,
      level: selectedLevel,
      score: score,
      date: new Date().toISOString(),
      totalQuestions: 10
    };
    
    userData.quizResults = [...quizResults, newResult];
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleBackToSkills = () => {
    setShowQuiz(false);
    setQuizCompleted(false);
    setSelectedSkill(null);
    setSelectedLevel('');
  };

  if (showQuiz && selectedSkill && selectedLevel) {
    return (
      <div className="selection-page">
        <div className="selection-container">
          <div className="quiz-section">
            <div className="quiz-header">
              <button className="back-button" onClick={handleBackToSkills}>
                <i className="fas fa-arrow-left"></i> Back to Skills
              </button>
              <h2>Skill Assessment: {selectedSkill.name}</h2>
              <p>Level: {selectedLevel}</p>
            </div>
            
            {!quizCompleted ? (
              <QuizComponent 
                skill={selectedSkill}
                level={selectedLevel}
                questions={quizQuestions[selectedSkill.name]?.[selectedLevel] || quizQuestions.JavaScript.beginner}
                onQuizComplete={handleQuizComplete}
              />
            ) : (
              <div className="quiz-results">
                <div className="result-card">
                  <div className="result-icon">
                    {quizScore >= 70 ? (
                      <i className="fas fa-trophy"></i>
                    ) : quizScore >= 50 ? (
                      <i className="fas fa-star"></i>
                    ) : (
                      <i className="fas fa-redo-alt"></i>
                    )}
                  </div>
                  <h3>Quiz Completed!</h3>
                  <div className="score-display">
                    <span className="score">{quizScore}%</span>
                    <div className="score-bar">
                      <div 
                        className="score-fill" 
                        style={{width: `${quizScore}%`}}
                      ></div>
                    </div>
                  </div>
                  <p className="result-message">
                    {quizScore >= 70 
                      ? "Excellent! You have strong knowledge in this skill."
                      : quizScore >= 50 
                      ? "Good job! You have a decent understanding."
                      : "Keep practicing! Review the material and try again."
                    }
                  </p>
                  <div className="result-actions">
                    <button className="btn-primary" onClick={handleBackToSkills}>
                      Select Another Skill
                    </button>
                    <button className="btn-secondary" onClick={() => setQuizCompleted(false)}>
                      Retry Quiz
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="selection-page">
      <div className="selection-container">
        <div className="selection-header">
          <h1>Skill Selection & Assessment</h1>
          <p>Select your skills and test your knowledge with our interactive quizzes</p>
        </div>

        <div className="skill-selection-card">
          {/* Skill Selection */}
          <div className="selection-section">
            <h2>Select Programming Language</h2>
            <div className="skills-grid">
              {skills.map(skill => (
                <div
                  key={skill.id}
                  className={`skill-card ${selectedSkill?.id === skill.id ? 'selected' : ''}`}
                  onClick={() => handleSkillSelect(skill)}
                >
                  <div className="skill-icon">
                    {skill.name.charAt(0)}
                  </div>
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <span className="skill-category">{skill.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Proficiency Level */}
          {selectedSkill && (
            <div className="proficiency-section">
              <h2>Select Proficiency Level</h2>
              <div className="levels-grid">
                {proficiencyLevels.map(level => (
                  <div
                    key={level.value}
                    className={`level-card ${selectedLevel === level.value ? 'selected' : ''}`}
                    onClick={() => setSelectedLevel(level.value)}
                  >
                    <div className="level-icon">
                      {level.value === 'beginner' && '🌱'}
                      {level.value === 'intermediate' && '🚀'}
                      {level.value === 'advanced' && '🏆'}
                    </div>
                    <h4>{level.label}</h4>
                    <p>
                      {level.value === 'beginner' && 'Basic understanding of concepts'}
                      {level.value === 'intermediate' && 'Practical experience and projects'}
                      {level.value === 'advanced' && 'Expert level knowledge and leadership'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          {selectedSkill && selectedLevel && (
            <div className="action-section">
              <button 
                className="start-quiz-btn"
                onClick={handleTakeQuiz}
              >
                <i className="fas fa-play"></i>
                Start {selectedSkill.name} Assessment ({selectedLevel})
                <i className="fas fa-arrow-right"></i>
              </button>
              <p className="quiz-info">
                You'll take a {selectedLevel}-level quiz for {selectedSkill.name} with 10 questions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Quiz Component
const QuizComponent = ({ skill, level, questions, onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(answers[questions[currentQuestion + 1].id] || null);
    } else {
      calculateScore();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] || null);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correct) {
        correct++;
      }
    });
    const score = Math.round((correct / questions.length) * 100);
    onQuizComplete(score);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-component">
      <div className="quiz-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{width: `${progress}%`}}></div>
        </div>
        <div className="progress-text">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="question-section">
        <h3 className="question">{question.question}</h3>
        <div className="options">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option ${selectedAnswer === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="quiz-navigation">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="nav-button prev"
        >
          <i className="fas fa-arrow-left"></i>
          Previous
        </button>
        
        <button
          onClick={nextQuestion}
          disabled={selectedAnswer === null}
          className="nav-button next"
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default SkillSelection;