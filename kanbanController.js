var app = angular.module("kanbanApp", ["dndLists"]);

app.controller("KanbanController", function ($scope) {
    $scope.themeClass = "light-theme";

    $scope.toggleTheme = function () {
        $scope.themeClass = $scope.themeClass === "light-theme" ? "dark-theme" : "light-theme";
    };

    $scope.newTask = { name: "", dueDate: "", priority: "Low" };

    $scope.taskCategories = JSON.parse(localStorage.getItem("tasks")) || {
        "To Do": [],
        "In Progress": [],
        "Completed": [],
    };

    $scope.addTask = function () {
        if (!$scope.newTask || !$scope.newTask.name) return;

        let task = {
            name: $scope.newTask.name,
            dueDate: $scope.newTask.dueDate || "No Due Date",
            priority: $scope.newTask.priority || "Low"
        };

        $scope.taskCategories["To Do"].push(task);
        $scope.sortTasks("To Do");
        $scope.newTask = {};
        $scope.saveTasks();
    };

    $scope.deleteTask = function (task, status) {
        let index = $scope.taskCategories[status].indexOf(task);
        if (index > -1) {
            $scope.taskCategories[status].splice(index, 1);
            $scope.saveTasks();
        }
    };

    $scope.markAsCompleted = function (task, currentStatus) {
        if (currentStatus !== "Completed") {
            $scope.taskCategories[currentStatus] = $scope.taskCategories[currentStatus].filter(t => t !== task);
            $scope.taskCategories["Completed"].push(task);
            $scope.saveTasks();
        }
    };

    $scope.saveEdit = function (task, status) {
        $scope.sortTasks(status);
        $scope.saveTasks();
    };

    $scope.getSectionClass = function (status) {
        return {
            todo: status === "To Do",
            "in-progress": status === "In Progress",
            completed: status === "Completed",
        };
    };
    $scope.formatDate = function(dateStr) {
        if (!dateStr) return 'No Due Date';
        let date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };
    
    $scope.enableDateEdit = function(task) {
        task.editingDueDate = true;
    };
    
    $scope.saveDateEdit = function(task, status) {
        task.editingDueDate = false;
        $scope.saveEdit(task, status);
    };
    
    $scope.sortTasks = function (status) {
        $scope.taskCategories[status].sort((a, b) => {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    };

    $scope.saveTasks = function () {
        localStorage.setItem("tasks", JSON.stringify($scope.taskCategories));
    };
});
