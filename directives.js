app.directive('dndDraggable', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.attr('draggable', 'true');
        }
    };
});