function User(name, jobTitle) {
    this.email = data.name;
    this.name = data.jobTitle;
    this.login = false;
}

User.prototype.login = function() {
    this.online = true;
    console.log(this.email, 'has logged in');
}

User.prototype.login = function() {
    this.online = false;
    console.log(this.email, 'has logged out');
}

function Admin(...args) {
    User.apply(this, args);
    this.role = 'admin';
}

Admin.prototype = Object.create(User.prototype);

Admin.prototype.deleteUser = function(u) {
    users = users.filter(user => {
        return user.email != u.email;
    });
}
