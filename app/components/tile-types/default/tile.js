'use strict';

tileTypes

.run(['tileState', function(tileState){
    tileState.addTemplate(
    {
        size: "",
        colour: "purple",
        icon: "file-text-o",
        type: "default",
        name: "Content tile",
        description: "Supply content",
        template: {
            size: "",
            colour: "purple",
            name: "new content",
            icon: "file-text-o",
            position: 0,
            settings: {},
            type: "default"
        }
        
    }
    );
}])
.controller('defaultTileController', ['tileState', 'callApi', '$scope', function (tileState, callApi, $scope) {
    //make sure the inserted tile is not a template
    if(!$scope.tiletemplate && callApi.state.tiles[$scope.tileindex].template){
        callApi.state.tiles[$scope.tileindex] = callApi.state.tiles[$scope.tileindex].template;
        $scope.tile = callApi.state.tiles[$scope.tileindex];
    }
    this.tileEdit = function ($event) {
        
        var obj = $($event.target).closest(".tile");
        if (obj.hasClass('selected')) {
            obj.removeClass('selected');
            tileState.setTile();
        } else {
            $(".tile.selected").removeClass('selected');
            $($event.target).closest(".tile").addClass('selected');
            tileState.setTile($scope.tile);
            tileState.tileindex = $scope.tileindex;
            tileState.edit = true;
            
        }
    };
    
    this.tileTemplateUrl = function(){
       return  "components/tile-types/default/tile.html";
    };

}])

.controller('defaultMenuController', ['callApi', 'tileState', function(callApi, tileState){
    this.tileDelete = function (){
        console.log('index',tileState);
        callApi.deleteTile(tileState.tileindex);
        tileState.setTile();
        
    };
}])

;