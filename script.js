let timeLeft = 30 * 60; // 30 minutes in seconds
const timerDisplay = document.getElementById('timer');

// Function to update the timer every second
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft > 0) {
        timeLeft--;
    } else {
        // Time is up, auto-submit the quiz
        alert('Time is up! Submitting your answers...');
        document.getElementById('quizForm').submit();
    }
}

// Start the timer countdown
setInterval(updateTimer, 1000); // Update every second

document.getElementById('quizForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    
    let physicsMarks = 0;
    let chemistryMarks = 0;

    // Correct answers for each question
    const correctAnswers = {
        // Physics questions
        q1: 'b', q2: 'b', q3: 'c', q4: 'b', q5: 'b', q6: 'a', q7: 'b', q8: 'c', q9: 'a', q10: 'b',
        // Chemistry questions
        q11: 'b', q12: 'b', q13: 'b', q14: 'a', q15: 'c', q16: 'c', q17: 'c', q18: 'b', q19: 'a', q20: 'a'
    };

    // Get user's answers
    const userAnswers = {};
    for (let i = 1; i <= 20; i++) {
        userAnswers['q' + i] = document.querySelector(`input[name="q${i}"]:checked`)?.value;
    }

    // Check answers and calculate marks
    Object.keys(correctAnswers).forEach((key) => {
        if (userAnswers[key] === correctAnswers[key]) {
            // Physics questions: q1 to q10
            if (key <= 'q10') {
                physicsMarks += 2.5;
            } else { // Chemistry questions: q11 to q20
                chemistryMarks += 2.5;
            }
        }
    });

    // Store student info in localStorage
    const student = JSON.parse(localStorage.getItem('currentStudent'));
    student.physicsMarks = physicsMarks;
    student.chemistryMarks = chemistryMarks;
    
    localStorage.setItem('student_' + student.rollNumber, JSON.stringify(student));

    // Redirect to the 4th website (Admin marks view)
    window.location.href = "https://musaddik09.github.io/Result/";

    // Optionally reset the form after submission
    document.getElementById('quizForm').reset();

    // Hide result display to prevent showing marks to the student
    document.getElementById('result').style.display = 'none';

    // Inform the student that their answers have been submitted
    alert("Your answers have been submitted. Thank you!");
});
