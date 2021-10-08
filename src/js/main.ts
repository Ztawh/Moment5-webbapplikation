
// Variabler
let coursesEl = document.getElementById("courses");
let addForm = <HTMLFormElement>document.getElementById("add-form");
let formBtn = document.getElementById("add-course");
let codeInput = <HTMLInputElement>document.getElementById("code");
let nameInput = <HTMLInputElement>document.getElementById("name");
let progInput = <HTMLInputElement>document.getElementById("prog");
let syllabusInput = <HTMLInputElement>document.getElementById("syllabus");
let editForm = document.getElementById("edit-form");

// Lyssnare
window.addEventListener("load", getCourses);
formBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addCourse();
});

// Funktioner
// Hämta alla kurser och skriv ut
function getCourses() {
    coursesEl.innerHTML = "";

    fetch("http://localhost:8080/webbtjanst/rest")
        .then(response => response.json())
        .then(data => {
            data.forEach(course => {
                coursesEl.innerHTML +=
                    `<div class="course">
                <div class="courseEl">${course.course_id} </div>
                <div class="courseEl">${course.name} </div>
                <div class="courseEl">${course.progression} </div>
                <div class="courseEl"><a href="${course.course_syllabus}" target="_blank">Länk</a></div>
                <button class="delete-button" id="${course.id}" onClick="deleteCourse(${course.id})"><i class="fas fa-trash-alt"></i></button>
                <button class="edit-button" onClick="editCourse('${course.id}', '${course.course_id}', '${course.name}', '${course.progression}', '${course.course_syllabus}')"><i class="far fa-edit"></i></button>
            </div>`;
            })
        });
};

function deleteCourse(id: number) {
    // Begär bekräftelse
    if(confirm("Är du säker på att du vill ta bort den här kursen?")) {
        // Skickar sen till webbtjänsten samt skriver ut kurserna på nytt
        fetch("http://localhost:8080/webbtjanst/rest?id=" + id, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => {
                getCourses();
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    } else {
        return false; // Om användaren inte vill radera händer ingenting
    }
};

function addCourse() {
    let code: string = codeInput.value;
    let name: string = nameInput.value;
    let prog: string = progInput.value;
    let syllabus: string = syllabusInput.value;

    // Kontrollerar värden

    if(code == "" || name == "" || prog == "" || syllabus == ""){
        alert("Alla fält måste fyllas i!");
        return false;
    };

    let course = { "course_id": code, "name": name, "progression": prog, "course_syllabus": syllabus };

    console.log(course);

    

    fetch("http://localhost:8080/webbtjanst/rest", {
        method: "POST",
        body: JSON.stringify(course),
    })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log("Error: ", error);
        });

    addForm.reset();
}

function editCourse(id: number, courseId: string, courseName: string, courseProg: string, courseSyllabus: string) {

    editForm.innerHTML =
        `
        <form>
            <h3>Redigera kurs</h3>
            <label for="code-edit">Kurskod</label>
            <input type="text" name="code-edit" id="code-edit" value="${courseId}" required>

            <label for="name-edit">Kursnamn</label>
            <input type="text" name="name-edit" id="name-edit" value="${courseName}" required>

            <label for="prog-edit">Progression</label>
            <input type="text" name="prog-edit" id="prog-edit" value="${courseProg}" required>

            <label for="syllabus-edit">Kursplan(länk)</label>
            <input type="text" name="syllabus-edit" id="syllabus-edit" value="${courseSyllabus}" required>

            <div class="flex-container">
                <button id="abort" onClick="abortEdit()">Avbryt</button>
                <button id="save">Spara</button>
            </div>
            
        </form>
        `;

    let save = document.getElementById("save");

    save.addEventListener("click", function (e) {
        e.preventDefault();
        updateCourse(id);
    });
}

function updateCourse(id: number) {

    let codeInputEdit = <HTMLInputElement>document.getElementById("code-edit");
    let nameInputEdit = <HTMLInputElement>document.getElementById("name-edit");
    let progInputEdit = <HTMLInputElement>document.getElementById("prog-edit");
    let syllabusInputEdit = <HTMLInputElement>document.getElementById("syllabus-edit");

    let code = codeInputEdit.value;
    let name = nameInputEdit.value;
    let prog = progInputEdit.value;
    let syllabus = syllabusInputEdit.value;

    code.toString();
    name.toString();
    prog.toString();
    syllabus.toString();

    // Kontrollerar värden

    if(code == "" || name == "" || prog == "" || syllabus == ""){
        alert("Alla fält måste fyllas i!");
        return false;
    };

    let course = { "course_id": code, "name": name, "progression": prog, "course_syllabus": syllabus };

    //console.log(course);

    fetch("http://localhost:8080/webbtjanst/rest?id=" + id, {
        method: "PUT",
        body: JSON.stringify(course),
    })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log("Error: ", error);
        });

    abortEdit();
};


function abortEdit() {
    editForm.innerHTML = "";
}
