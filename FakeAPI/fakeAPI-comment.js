var users = [
    {
        id: 1,
        name: 'hung vo',
    },
    {
        id: 2,
        name: 'hung pham',
    },    
    {
        id: 3,
        name: 'chung pham',
    }
];

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'hoc code js'
    },
    {
        id: 2,
        user_id: 2,
        content: 'hoc code php'
    },
 
 
];

function getComment () {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(comments)
        }, 1000)
    })
}

function getUser (userIds) {
    return new Promise (function (resolve) {
        setTimeout(function () {
            var result = users.filter(function (user) {
                return userIds.includes(user.id)
            })
            resolve(result)
        }, 1000)
    })
}

getComment()
    .then(function (comments) {
       var userIds = comments.map(function (useId) {
            return useId.user_id
        })
        return getUser(userIds)
            .then(function (users) {
                return {
                    users: users,
                    comments: comments
                }
            })
    })
    .then(function (data) {
        var commentBlock =document.querySelector('.comment-block')
        var html = ''

        data.comments.forEach(function (comment) {
            var user = data.users.find(function (user) {
                return user.id === comment.user_id
            })
            html += `<li>${user.name}: ${comment.content}</li>`
        })
        commentBlock.innerHTML = html
    })

