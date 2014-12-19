angular.module('app', ['ngDraggable']).
    controller('MainCtrl', function ($scope) {
        $scope.todo = [
            {title:'Todo1', descr:'descr Todo1', parent: 'todo'},
            {title:'Todo2', descr:'descr Todo2', parent: 'todo'}
        ];
        $scope.doing = [];
        $scope.done = [];


        var noteCount = function(){
            $scope.noteCounter = $scope.todo.length + $scope.doing.length + $scope.done.length;
        }
        $scope.$watch('todo',noteCount,true);
        $scope.$watch('doing',noteCount,true);
        $scope.$watch('done',noteCount,true);


        $scope.removeNote = function(data){

           if(data.parent == 'todo'){
               $scope.onDragSuccessTodo(data);
           }
           if(data.parent == 'doing'){
                $scope.onDragSuccessDoing(data);
           }
           if(data.parent == 'done'){
                $scope.onDragSuccessDone(data);
           }
        }

        $scope.addNote = function(){
            $scope.todo.push({title:$scope.title, descr: $scope.descr, parent: 'todo'});
        }

        $scope.onDropCompleteTodo = function(data,evt){
            if(data.parent == 'done') {
                $scope.done.push(data);
                return;
            };
            var index = $scope.todo.indexOf(data);
            if (index == -1){
                data.parent = 'todo';
                $scope.todo.push(data);
            }

        }
        $scope.onDropCompleteDoing = function(data,evt){

            var index = $scope.doing.indexOf(data);
            if (index == -1){
                data.parent = 'doing';
                $scope.doing.push(data);
            }

        }
        $scope.onDropCompleteDone = function(data,evt){
            if(data.parent == 'todo') {
                $scope.todo.push(data);
                return;
            };
            var index = $scope.done.indexOf(data);
            if (index == -1) {
                data.parent = 'done';
                $scope.done.push(data);
            }

        }


        $scope.onDragSuccessTodo = function(data,evt){
            var index = $scope.todo.indexOf(data);
            if (index > -1) {
                $scope.todo.splice(index, 1);
            }
        }
        $scope.onDragSuccessDoing = function(data,evt){
            var index = $scope.doing.indexOf(data);
            if (index > -1) {
                $scope.doing.splice(index, 1);
            }
        }
        $scope.onDragSuccessDone = function(data,evt){
            var index = $scope.done.indexOf(data);
            if (index > -1) {
                $scope.done.splice(index, 1);
            }
        }

    });