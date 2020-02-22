module.exports = {
    compareTimeDay: function (userTime) {
        return ((new Date(userTime).getTime() + 86400000) > Date.now());
    },
}