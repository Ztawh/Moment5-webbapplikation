"use strict";var coursesEl=document.getElementById("courses"),addForm=document.getElementById("add-form"),formBtn=document.getElementById("add-course"),codeInput=document.getElementById("code"),nameInput=document.getElementById("name"),progInput=document.getElementById("prog"),syllabusInput=document.getElementById("syllabus"),editForm=document.getElementById("edit-form");function getCourses(){coursesEl.innerHTML="",fetch("http://localhost:8080/webbtjanst/rest").then((function(e){return e.json()})).then((function(e){e.forEach((function(e){coursesEl.innerHTML+='<div class="course">\n                <div class="courseEl">'.concat(e.course_id,' </div>\n                <div class="courseEl">').concat(e.name,' </div>\n                <div class="courseEl">').concat(e.progression,' </div>\n                <div class="courseEl"><a href="').concat(e.course_syllabus,'" target="_blank">Länk</a></div>\n                <button class="delete-button" id="').concat(e.id,'" onClick="deleteCourse(').concat(e.id,')"><i class="fas fa-trash-alt"></i></button>\n                <button class="edit-button" onClick="editCourse(\'').concat(e.id,"', '").concat(e.course_id,"', '").concat(e.name,"', '").concat(e.progression,"', '").concat(e.course_syllabus,'\')"><i class="far fa-edit"></i></button>\n            </div>')}))}))}function deleteCourse(e){if(!confirm("Är du säker på att du vill ta bort den här kursen?"))return!1;fetch("http://localhost:8080/webbtjanst/rest?id="+e,{method:"DELETE"}).then((function(e){return e.json()})).then((function(e){getCourses()})).catch((function(e){console.log("Error: ",e)}))}function addCourse(){var e=codeInput.value,t=nameInput.value,n=progInput.value,o=syllabusInput.value;if(""==e||""==t||""==n||""==o)return alert("Alla fält måste fyllas i!"),!1;var r={course_id:e,name:t,progression:n,course_syllabus:o};console.log(r),fetch("http://localhost:8080/webbtjanst/rest",{method:"POST",body:JSON.stringify(r)}).then((function(e){return e.json()})).then((function(e){getCourses()})).catch((function(e){console.log("Error: ",e)})),addForm.reset()}function editCourse(e,t,n,o,r){editForm.innerHTML='\n        <form>\n            <h3>Redigera kurs</h3>\n            <label for="code-edit">Kurskod</label>\n            <input type="text" name="code-edit" id="code-edit" value="'.concat(t,'" required>\n\n            <label for="name-edit">Kursnamn</label>\n            <input type="text" name="name-edit" id="name-edit" value="').concat(n,'" required>\n\n            <label for="prog-edit">Progression</label>\n            <input type="text" name="prog-edit" id="prog-edit" value="').concat(o,'" required>\n\n            <label for="syllabus-edit">Kursplan(länk)</label>\n            <input type="text" name="syllabus-edit" id="syllabus-edit" value="').concat(r,'" required>\n\n            <div class="flex-container">\n                <button id="abort" onClick="abortEdit()">Avbryt</button>\n                <button id="save">Spara</button>\n            </div>\n            \n        </form>\n        '),document.getElementById("save").addEventListener("click",(function(t){t.preventDefault(),updateCourse(e)}))}function updateCourse(e){var t=document.getElementById("code-edit"),n=document.getElementById("name-edit"),o=document.getElementById("prog-edit"),r=document.getElementById("syllabus-edit"),s=t.value,a=n.value,u=o.value,c=r.value;if(s.toString(),a.toString(),u.toString(),c.toString(),""==s||""==a||""==u||""==c)return alert("Alla fält måste fyllas i!"),!1;var d={course_id:s,name:a,progression:u,course_syllabus:c};fetch("http://localhost:8080/webbtjanst/rest?id="+e,{method:"PUT",body:JSON.stringify(d)}).then((function(e){return e.json()})).then((function(e){getCourses()})).catch((function(e){console.log("Error: ",e)})),abortEdit()}function abortEdit(){editForm.innerHTML=""}window.addEventListener("load",getCourses),formBtn.addEventListener("click",(function(e){e.preventDefault(),addCourse()}));