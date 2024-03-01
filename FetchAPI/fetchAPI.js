var courseApi = 'http://localhost:3000/courses'

function start() {
    getCourses(renderCourses)
    handleCreateForm()
}
start()

function getCourses (callback) {
    fetch(courseApi)
        .then(function(res) {
           return res.json()
        })
        .then(callback)
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses')
    var htmls = courses.map(function(course) {
        return `
        <li class="list-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="deleteCourses(${course.id})">Xóa</button>
            <button onclick="updateBtn(${course.id})">Sửa</button>
        </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('')
}

function createID() {
    var ID =  Math.floor(Math.random() * 10000)
    fetch(courseApi)
    .then(function(res) {
       return res.json()
    })
    .then(function(course) {
        var test = course.filter(c => c.id === ID )
        while(test.lenght == 0 ) {
            ID =  Math.floor(Math.random() * 10000)
            test = course.filter(c => c.id === ID )  
    }
    })
    
    return ID.toString()
}

function createCourses(data, callback) {
    data.id = createID()
    var options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
        .then(function(res) {
            res.json()
        })
        .then(callback)
}

function updateBtn(id) {
    fetch(courseApi)
        .then(function(res) {
            return res.json()
        })
        .then(function(course) {
             course.forEach(function(courseID) {
                var name = document.querySelector('input[name="name"]')
                var description = document.querySelector('input[name="description"]')
                var saveBtn = document.querySelector('#save-btn')
                var createBtn = document.querySelector('#create-btn')

                if(courseID.id == id) {
                    name.setAttribute("value", courseID.name)
                    description.setAttribute("value", courseID.description)
                    saveBtn.setAttribute("onclick", `saveButton(${courseID.id})`)
                    createBtn.classList.add("hide")
                    saveBtn.classList.remove("hide")
                }
            })
        })
}

function saveButton(id) {
    var name = document.querySelector('input[name="name"]').value
    var description = document.querySelector('input[name="description"]').value
    var data = {
        name: name,
        description: description
    }
    updateCourses(data, function() {
        getCourses(renderCourses)
    },id)

}

function updateCourses(data, callback, id) {
    var options = {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi + '/' + id, options)
        .then(function(res) {
            res.json()
        })
        .then(callback)
}

function deleteCourses(id) {
    var options = {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        }
    }
    fetch(courseApi + '/' + id, options)
        .then(function(res) {
            res.json()
        })
        .then(function() {
            getCourses(renderCourses)
        })
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create-btn')

    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value
        var data = {
            name: name,
            description: description
        }
        createCourses(data, function() {
            getCourses(renderCourses)
        })
    }

}


