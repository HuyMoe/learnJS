var courseApi = 'http://localhost:3000/courses'

fetch(courseApi)
    .then(function (res) {
        return res.json()
    })
    .then(function (courses) {
        console.log(courses)
    })