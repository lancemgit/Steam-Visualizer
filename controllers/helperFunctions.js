module.exports = {
    compareTimeDay: function (userTime) {
        return (userTime + 86400) < Date.now();
    },
}