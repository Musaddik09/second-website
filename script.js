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
        q1: 'b', // Physics question 1
        q2: 'b', // Physics question 2
        q3: 'c', 
        q4: 'b',
        q5: 'b',
        q6: 'a',
        q7: 'b',
        q8: 'c',
        q9: 'a',
        q10:'b',
        q11:'b',// Cemetery question 1
        q12:'b',// Cemetery question 2
        q13:'b',
        q14:'a',
        q15:'c',
        q16:'c',
        q17:'c',
        q18:'b',
        q19:'a',
        q20:'a',
    };

    // Get user's answers
    const userAnswers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value,
        q4: document.querySelector('input[name="q4"]:checked')?.value
    };

    // Check answers and calculate marks
    Object.keys(correctAnswers).forEach((key) => {
        if (userAnswers[key] === correctAnswers[key]) {
            marks += 2.5; // Each correct answer gives 2.5 marks
        }
    });
    
    const student = JSON.parse(localStorage.getItem('currentStudent'));

            // Add marks to the student info
            student.physicsMarks = physicsMarks;
            student.chemistryMarks = chemistryMarks;

    localStorage.setItem('student_' + student.rollNumber, JSON.stringify(student));

            // Redirect to the 4th website (Admin marks view)
            window.location.href = "https://musaddik09.github.io/Result/" 


    // Optionally reset the form after submission
    document.getElementById('quizForm').reset();

    // Hide any result display
    alert("Your answers have been submitted. Thank you!");

    // Prevent showing marks to the student
    document.getElementById('result').style.display = 'none';
});
