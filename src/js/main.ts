
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
                <p><b>Kurskod: </b> ${course.course_id} </p>
                <p><b>Kursnamn: </b> ${course.name} </p>
                <p><b>Progression: </b> ${course.progression} </p>
                <p><b>Kurskod: </b> ${course.course_syllabus} </p>
                <button id="${course.id}" onClick="deleteCourse(${course.id})">Ta bort</button>
                <button class="edit" onClick="editCourse('${course.id}', '${course.course_id}', '${course.name}', '${course.progression}', '${course.course_syllabus}')">Redigera</button>
            </div>`;
            })
        });
};

function deleteCourse(id: number) {
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
};

function addCourse() {
    let code = codeInput.value;
    let name = nameInput.value;
    let prog = progInput.value;
    let syllabus = syllabusInput.value;

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
            <label for="code-edit">Kurskod</label>
            <input type="text" name="code-edit" id="code-edit" value="${courseId}">

            <label for="name-edit">Kursnamn</label>
            <input type="text" name="name-edit" id="name-edit" value="${courseName}">

            <label for="prog-edit">Progression</label>
            <input type="text" name="prog-edit" id="prog-edit" value="${courseProg}">

            <label for="syllabus-edit">Kursplan</label>
            <input type="text" name="syllabus-edit" id="syllabus-edit" value="${courseSyllabus}">

            
            <button id="save">Spara</button>
        </form>

        <button onClick="abortEdit()">Avbryt</button>
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
