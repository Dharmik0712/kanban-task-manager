app.service('TaskService', function () {
    var storageKey = 'kanbanTasks';

    this.getTasks = function () {
        var storedTasks = localStorage.getItem(storageKey);
        return storedTasks ? JSON.parse(storedTasks) : {
            "To Do": [],
            "In Progress": [],
            "Done": []
        };
    };

    this.saveTasks = function (tasks) {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
    };
});