/* =====================================================
   STUDENT ACCOUNTS
   These are NOT displayed on the login screen.
===================================================== */

const students = [

    {
        id: "STU001",
        password: "12345",
        name: "Rohan"
    },

    {
        id: "STU002",
        password: "12345",
        name: "Arun"
    },

    {
        id: "STU003",
        password: "12345",
        name: "Karthik"
    },

    {
        id: "STU004",
        password: "12345",
        name: "Rahul"
    },

    {
        id: "STU005",
        password: "12345",
        name: "Vijay"
    },

    {
        id: "STU006",
        password: "12345",
        name: "Priya"
    },

    {
        id: "STU007",
        password: "12345",
        name: "Praveena"
    },

    {
        id: "STU008",
        password: "12345",
        name: "Ajay"
    }
];



/* =====================================================
   FACULTY
===================================================== */

const faculty = [

    {
        id: "FAC001",
        name: "Ms. Ambika",
        department: "Computer Science"
    },

    {
        id: "FAC002",
        name: "Dr.Preethi",
        department: "Information Technology"
    },

    {
        id: "FAC003",
        name: "Dr. Manoj Kumar",
        department: "Cyber Security"
    },

    {
        id: "FAC004",
        name: "Prof. Anitha",
        department: "Computer Applications"
    },

    {
        id: "FAC005",
        name: "Ms. Padama Priya",
        department: ""
    }


];



/* =====================================================
   LOCAL STORAGE
===================================================== */

let feedbackData =
    JSON.parse(
        localStorage.getItem("feedbackData")
    ) || [];


let currentStudent =
    JSON.parse(
        localStorage.getItem("currentStudent")
    ) || null;



/* =====================================================
   PAGE ELEMENTS
===================================================== */

const loginPage =
    document.getElementById("loginPage");

const studentPage =
    document.getElementById("studentPage");

const adminLoginPage =
    document.getElementById("adminLoginPage");

const adminPage =
    document.getElementById("adminPage");


const loginForm =
    document.getElementById("loginForm");

const adminLoginForm =
    document.getElementById("adminLoginForm");

const feedbackForm =
    document.getElementById("feedbackForm");

const feedbackModal =
    document.getElementById("feedbackModal");



/* =====================================================
   SHOW PAGE
===================================================== */

function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(function(p) {

            p.classList.remove("active");

        });


    page.classList.add("active");

}



/* =====================================================
   STUDENT LOGIN
===================================================== */

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id =
            document
                .getElementById("studentId")
                .value
                .trim()
                .toUpperCase();


        const password =
            document
                .getElementById("password")
                .value
                .trim();


        const message =
            document.getElementById(
                "loginMessage"
            );


        const student =
            students.find(function(s) {

                return (
                    s.id === id &&
                    s.password === password
                );

            });


        if (!student) {

            message.textContent =
                "Invalid Student ID or Password.";

            message.style.color = "red";

            return;

        }


        currentStudent = {

            id: student.id,

            name: student.name

        };


        localStorage.setItem(
            "currentStudent",
            JSON.stringify(currentStudent)
        );


        document.getElementById(
            "studentName"
        ).textContent = currentStudent.name;


        message.textContent = "";


        loginForm.reset();


        showPage(studentPage);


        loadFaculty();


        loadMyFeedback();

    }
);



/* =====================================================
   STUDENT LOGOUT
===================================================== */

document
    .getElementById("studentLogout")
    .addEventListener(
        "click",
        function() {

            currentStudent = null;

            localStorage.removeItem(
                "currentStudent"
            );


            showPage(loginPage);


            loginForm.reset();

        }
    );



/* =====================================================
   OPEN ADMIN LOGIN
===================================================== */

document
    .getElementById("showAdminLogin")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "adminLoginMessage"
                )
                .textContent = "";


            document
                .getElementById(
                    "adminLoginForm"
                )
                .reset();


            showPage(adminLoginPage);

        }
    );



/* =====================================================
   BACK TO STUDENT LOGIN
===================================================== */

document
    .getElementById("backToStudent")
    .addEventListener(
        "click",
        function() {

            showPage(loginPage);

        }
    );



/* =====================================================
   LOAD FACULTY
===================================================== */

function loadFaculty() {

    const container =
        document.getElementById(
            "facultyContainer"
        );


    container.innerHTML = "";


    faculty.forEach(function(member) {


        const alreadySubmitted =
            feedbackData.some(function(item) {

                return (
                    item.studentId ===
                        currentStudent.id &&

                    item.facultyId ===
                        member.id
                );

            });


        const card =
            document.createElement("div");


        card.className =
            "faculty-card";


        card.innerHTML = `

            <h2>
                ${member.name}
            </h2>

            <p>
                ${member.department}
            </p>

            <div class="feedback-status">

                ${
                    alreadySubmitted
                        ? "✅ Feedback Submitted"
                        : "📝 Feedback Not Submitted"
                }

            </div>

            <button
                class="feedback-btn"
                type="button"
                ${
                    alreadySubmitted
                        ? "disabled"
                        : ""
                }
                onclick="openFeedback('${member.id}')"
            >

                ${
                    alreadySubmitted
                        ? "Already Submitted"
                        : "Give Feedback"
                }

            </button>

        `;


        container.appendChild(card);

    });

}



/* =====================================================
   OPEN FEEDBACK
===================================================== */

function openFeedback(facultyId) {

    if (!currentStudent) {

        alert(
            "Please login first."
        );

        return;

    }


    const member =
        faculty.find(function(f) {

            return f.id === facultyId;

        });


    if (!member) return;


    const alreadySubmitted =
        feedbackData.some(function(item) {

            return (
                item.studentId ===
                    currentStudent.id &&

                item.facultyId ===
                    facultyId
            );

        });


    if (alreadySubmitted) {

        alert(
            "You have already submitted feedback for this faculty."
        );

        return;

    }


    feedbackForm.reset();


    document.getElementById(
        "feedbackFacultyName"
    ).textContent =
        "Feedback for " + member.name;


    document.getElementById(
        "selectedFacultyId"
    ).value = facultyId;


    document
        .getElementById(
            "feedbackMessage"
        )
        .textContent = "";


    feedbackModal.classList.add(
        "show"
    );

}



/* =====================================================
   CLOSE FEEDBACK MODAL
===================================================== */

document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeModal
    );


function closeModal() {

    feedbackModal.classList.remove(
        "show"
    );

    feedbackForm.reset();

}



/* Close modal outside */

window.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            feedbackModal
        ) {

            closeModal();

        }

    }
);



/* =====================================================
   GET RADIO VALUE
===================================================== */

function getRadioValue(name) {

    const selected =
        document.querySelector(
            `input[name="${name}"]:checked`
        );


    if (!selected) {

        return "";

    }


    return selected.value;

}



/* =====================================================
   GET CHECKBOX VALUES
===================================================== */

function getCheckboxValues(name) {

    return Array.from(

        document.querySelectorAll(
            `input[name="${name}"]:checked`
        )

    ).map(function(input) {

        return input.value;

    });

}



/* =====================================================
   SUBMIT FEEDBACK
===================================================== */

feedbackForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (!currentStudent) {

            alert(
                "Please login first."
            );

            return;

        }


        const facultyId =
            document.getElementById(
                "selectedFacultyId"
            ).value;


        const member =
            faculty.find(function(f) {

                return f.id === facultyId;

            });


        if (!member) {

            alert(
                "Faculty not found."
            );

            return;

        }


        /* Duplicate check */

        const duplicate =
            feedbackData.some(function(item) {

                return (

                    item.studentId ===
                        currentStudent.id &&

                    item.facultyId ===
                        facultyId

                );

            });


        if (duplicate) {

            alert(
                "You have already submitted feedback for this faculty."
            );

            closeModal();

            return;

        }


        /* Get all answers */

        const rating =
            getRadioValue("rating");


        const teaching =
            getRadioValue("teaching");


        const liked =
            getCheckboxValues("liked");


        const improvement =
            getCheckboxValues(
                "improvement"
            );


        const difficultTopics =
            getRadioValue(
                "difficultTopics"
            );


        const doubts =
            getRadioValue(
                "doubts"
            );


        const interaction =
            getRadioValue(
                "interaction"
            );


        const materials =
            getRadioValue(
                "materials"
            );


        const practical =
            getRadioValue(
                "practical"
            );


        const timeManagement =
            getRadioValue(
                "timeManagement"
            );


        const communication =
            getRadioValue(
                "communication"
            );


        const overall =
            getRadioValue(
                "overall"
            );


        const comment =
            document
                .getElementById("comment")
                .value
                .trim();



        /* =============================================
           CREATE FEEDBACK
        ============================================= */

        const newFeedback = {

            id: Date.now(),


            /* Internal information
               Only admin uses these */

            studentId:
                currentStudent.id,

            studentName:
                currentStudent.name,


            /* Faculty */

            facultyId:
                member.id,

            facultyName:
                member.name,

            department:
                member.department,


            /* Answers */

            rating:
                Number(rating),

            teaching:
                teaching,

            liked:
                liked,

            improvement:
                improvement,

            difficultTopics:
                difficultTopics,

            doubts:
                doubts,

            interaction:
                interaction,

            materials:
                materials,

            practical:
                practical,

            timeManagement:
                timeManagement,

            communication:
                communication,

            overall:
                overall,

            comment:
                comment,


            date:
                new Date()
                    .toLocaleString()

        };


        /* Save */

        feedbackData.push(
            newFeedback
        );


        localStorage.setItem(
            "feedbackData",
            JSON.stringify(
                feedbackData
            )
        );


        const message =
            document.getElementById(
                "feedbackMessage"
            );


        message.textContent =
            "✅ Feedback submitted successfully!";

        message.style.color =
            "green";


        setTimeout(
            function() {

                closeModal();

                loadFaculty();

                loadMyFeedback();

            },
            700
        );

    }
);



/* =====================================================
   LOAD MY FEEDBACK
===================================================== */

function loadMyFeedback() {

    const container =
        document.getElementById(
            "myFeedbackContainer"
        );


    container.innerHTML = "";


    if (!currentStudent) {

        return;

    }


    const myFeedback =
        feedbackData.filter(
            function(item) {

                return (
                    item.studentId ===
                    currentStudent.id
                );

            }
        );


    if (myFeedback.length === 0) {

        container.innerHTML = `

            <div class="no-feedback">

                You have not submitted
                any feedback yet.

            </div>

        `;

        return;

    }



    myFeedback.forEach(
        function(item) {

            const stars =
                "⭐".repeat(
                    item.rating
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "my-feedback-card";


            card.innerHTML = `

                <h3>
                    ${item.facultyName}
                </h3>


                <div class="feedback-line">

                    <strong>
                        Rating:
                    </strong>

                    ${stars}

                </div>


                <div class="feedback-line">

                    <strong>
                        Teaching:
                    </strong>

                    ${item.teaching}

                </div>


                <div class="feedback-line">

                    <strong>
                        What I liked:
                    </strong>

                    ${
                        item.liked.length
                            ? item.liked.join(", ")
                            : "None selected"
                    }

                </div>


                <div class="feedback-line">

                    <strong>
                        Improvement:
                    </strong>

                    ${
                        item.improvement.length
                            ? item.improvement.join(", ")
                            : "None selected"
                    }

                </div>


                <div class="feedback-line">

                    <strong>
                        Difficult Topics:
                    </strong>

                    ${item.difficultTopics}

                </div>


                <div class="feedback-line">

                    <strong>
                        Doubt Clarification:
                    </strong>

                    ${item.doubts}

                </div>


                <div class="feedback-line">

                    <strong>
                        Class Interaction:
                    </strong>

                    ${item.interaction}

                </div>


                <div class="feedback-line">

                    <strong>
                        Study Materials:
                    </strong>

                    ${item.materials}

                </div>


                <div class="feedback-line">

                    <strong>
                        Practical Learning:
                    </strong>

                    ${item.practical}

                </div>


                <div class="feedback-line">

                    <strong>
                        Time Management:
                    </strong>

                    ${item.timeManagement}

                </div>


                <div class="feedback-line">

                    <strong>
                        Communication:
                    </strong>

                    ${item.communication}

                </div>


                <div class="feedback-line">

                    <strong>
                        Overall:
                    </strong>

                    ${item.overall}

                </div>


                <div class="feedback-line">

                    <strong>
                        Comment:
                    </strong>

                    ${
                        item.comment
                            ? item.comment
                            : "No additional comment"
                    }

                </div>


                <div class="feedback-line">

                    <strong>
                        Submitted:
                    </strong>

                    ${item.date}

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}



/* =====================================================
   ADMIN LOGIN
===================================================== */

adminLoginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const username =
            document
                .getElementById(
                    "adminUsername"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "adminPassword"
                )
                .value
                .trim();


        const message =
            document.getElementById(
                "adminLoginMessage"
            );


        /* ADMIN CREDENTIALS */

        if (
            username === "admin" &&
            password === "admin123"
        ) {

            message.textContent = "";

            adminLoginForm.reset();

            showPage(
                adminPage
            );

            loadAdminDashboard();

        }

        else {

            message.textContent =
                "❌ Invalid admin username or password.";

            message.style.color =
                "red";

        }

    }
);



/* =====================================================
   ADMIN DASHBOARD
===================================================== */

function loadAdminDashboard() {


    document.getElementById(
        "totalStudents"
    ).textContent =
        students.length;


    document.getElementById(
        "totalFaculty"
    ).textContent =
        faculty.length;


    document.getElementById(
        "totalFeedback"
    ).textContent =
        feedbackData.length;


    let average = 0;


    if (
        feedbackData.length > 0
    ) {

        const total =
            feedbackData.reduce(
                function(sum, item) {

                    return (
                        sum +
                        Number(
                            item.rating
                        )
                    );

                },
                0
            );


        average =
            (
                total /
                feedbackData.length
            ).toFixed(1);

    }


    document.getElementById(
        "averageRating"
    ).textContent =
        average;


    loadFeedbackTable();

}



/* =====================================================
   ADMIN FEEDBACK TABLE
===================================================== */

function loadFeedbackTable() {

    const table =
        document.getElementById(
            "feedbackTable"
        );


    table.innerHTML = "";


    if (
        feedbackData.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td colspan="7">

                    No feedback available.

                </td>

            </tr>

        `;

        return;

    }


    feedbackData.forEach(
        function(item) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>

                    <strong>
                        ${item.studentName}
                    </strong>

                    <br>

                    ${item.studentId}

                </td>


                <td>

                    ${item.facultyName}

                    <br>

                    ${item.department}

                </td>


                <td>

                    ${
                        "⭐".repeat(
                            item.rating
                        )
                    }

                </td>


                <td>

                    ${item.teaching}

                </td>


                <td>

                    ${
                        item.improvement.length
                            ? item.improvement.join(
                                ", "
                              )
                            : "None"
                    }

                </td>


                <td>

                    ${
                        item.comment
                            ? item.comment
                            : "No comment"
                    }

                </td>


                <td>

                    ${item.date}

                </td>

            `;


            table.appendChild(
                row
            );

        }
    );

}



/* =====================================================
   ADMIN LOGOUT
===================================================== */

document
    .getElementById("adminLogout")
    .addEventListener(
        "click",
        function() {

            showPage(
                loginPage
            );

        }
    );



/* =====================================================
   CLEAR ALL FEEDBACK
===================================================== */

document
    .getElementById("clearFeedback")
    .addEventListener(
        "click",
        function() {

            const confirmDelete =
                confirm(
                    "Are you sure you want to delete ALL feedback?"
                );


            if (!confirmDelete) {

                return;

            }


            feedbackData = [];


            localStorage.removeItem(
                "feedbackData"
            );


            loadAdminDashboard();


            if (currentStudent) {

                loadFaculty();

                loadMyFeedback();

            }

        }
    );



/* =====================================================
   AUTO LOGIN AFTER REFRESH
===================================================== */

if (currentStudent) {

    document.getElementById(
        "studentName"
    ).textContent =
        currentStudent.name;


    showPage(
        studentPage
    );


    loadFaculty();

    loadMyFeedback();

}

else {

    showPage(
        loginPage
    );

}