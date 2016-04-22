"use strict";define("ember-sudoku-solver/app",["exports","ember","ember-sudoku-solver/resolver","ember-load-initializers","ember-sudoku-solver/config/environment"],function(e,t,n,r,a){var l=void 0;t["default"].MODEL_FACTORY_INJECTIONS=!0,l=t["default"].Application.extend({modulePrefix:a["default"].modulePrefix,podModulePrefix:a["default"].podModulePrefix,Resolver:n["default"]}),(0,r["default"])(l,a["default"].modulePrefix),e["default"]=l}),define("ember-sudoku-solver/components/alert-message",["exports","ember"],function(e,t){e["default"]=t["default"].Component.extend({classNames:["alert"],classNameBindings:["contextCls","closeable:alert-dismissible","closeable:fade","closeable:in"],attributeBindings:["role"],role:"alert",type:"info",closeable:!0,contextCls:t["default"].computed("context",function(){return"alert-"+this.get("type")})})}),define("ember-sudoku-solver/components/app-version",["exports","ember-cli-app-version/components/app-version","ember-sudoku-solver/config/environment"],function(e,t,n){var r=n["default"].APP.name,a=n["default"].APP.version;e["default"]=t["default"].extend({version:a,name:r})}),define("ember-sudoku-solver/components/file-download-link",["exports","ember"],function(e,t){e["default"]=t["default"].Component.extend({tagName:"a",attributeBindings:["download","target"],target:"_blank",blob:null,download:null,onBlobChange:t["default"].observer("blob",function(){this.createObjUrl(this.get("blob"))}),onInsert:t["default"].on("didInsertElement",function(){this.createObjUrl(this.get("blob"))}),createObjUrl:function(e){e&&window.URL&&window.URL.createObjectURL&&this.$().prop("href",window.URL.createObjectURL(e))}})}),define("ember-sudoku-solver/components/file-input-btn",["exports","ember"],function(e,t){e["default"]=t["default"].Component.extend({tagName:"label",classNames:["file-input","btn"],classNameBindings:["btn-classes"],attributeBindings:["accept"],supportsFileApi:!0,"btn-classes":"btn-secondary","read-file-as-text":!1,accept:"",onInit:t["default"].on("init",function(){this.set("supportsFileApi",window.File&&window.FileReader&&window.FileList&&window.Blob)}),readFile:function(e){var t=this,n=new FileReader;n.onerror=function(){t.get("on-read-file")&&t.get("on-read-file")(!1)},n.onload=function(n){t.get("on-read-file")&&t.get("on-read-file")(!0,e.name,n.target.result)},n.readAsText(e)},actions:{fileChange:function(e){this.get("on-change")&&this.get("on-change")(e),this.get("supportsFileApi")&&this.get("read-file-as-text")&&e&&e.length>0&&this.readFile(e[0])}}})}),define("ember-sudoku-solver/components/file-input",["exports","ember"],function(e,t){e["default"]=t["default"].Component.extend({tagName:"input",attributeBindings:["type","accept"],type:"file",accept:null,change:function(e){this.get("on-change")&&this.get("on-change")(e.target.files)}})}),define("ember-sudoku-solver/components/sudoku-grid",["exports","ember"],function(e,t){e["default"]=t["default"].Component.extend({classNames:["sudoku-grid"],grid:[],numRows:9,numCols:9,onInit:t["default"].on("init",function(){t["default"].isEmpty(this.get("grid"))&&this.buildGridCells()}),onGridChange:t["default"].observer("grid",function(){t["default"].isEmpty(this.get("grid"))&&this.buildGridCells()}),buildGridCells:function(){var e=[],t=void 0,n=void 0;for(t=0;t<this.get("numRows");t++){var r=[];for(n=0;n<this.get("numCols");n++)r.push({value:!1,prefilled:!1});e.push(r)}this.set("grid",e)}})}),define("ember-sudoku-solver/controllers/index",["exports","ember"],function(e,t){e["default"]=t["default"].Controller.extend({puzzleGrid:[],puzzleIsLoaded:t["default"].computed.notEmpty("puzzleGrid"),isSolving:!1,isSolved:!1,solveSuccess:!1,solvedPuzzleBlob:null,disableSolve:t["default"].computed.or("isSolving","isSolved"),sudokuPuzzle:t["default"].inject.service("sudokuPuzzle"),solutionFilename:"",fileError:null,actions:{loadPuzzleFile:function(e,t,n){var r=void 0,a=t.split(".");return this.setProperties({isSolved:!1,solveSuccess:!1,fileError:null}),e?(this.set("solutionFilename",a.length>0?a[0]+".sln.txt":"solution.txt"),(r=this.get("sudokuPuzzle").puzzleTextToArray(n))?void this.set("puzzleGrid",r):void this.set("fileError","Sorry, the selected file is not in the correct format.")):void this.set("fileError","Unable to read the selected file.")},solvePuzzle:function(){t["default"].isEmpty(this.get("puzzleGrid"))||(this.set("isSolving",!0),t["default"].run.next(this,function(){var e=this.get("sudokuPuzzle").solve(this.get("puzzleGrid")),t=void 0;this.setProperties({isSolving:!1,isSolved:!0,solveSuccess:e.success,puzzleGrid:e.grid}),e.success&&window.Blob&&(t=this.get("sudokuPuzzle").puzzleArrayToText(e.grid),this.set("solvedPuzzleBlob",new Blob([t],{type:"text/plain"})))}))},clearPuzzle:function(){this.setProperties({isSolved:!1,solveSuccess:!1,solvedPuzzleBlob:null,fileError:null,puzzleGrid:[]})}}})}),define("ember-sudoku-solver/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ember-sudoku-solver/config/environment"],function(e,t,n){e["default"]={name:"App Version",initialize:(0,t["default"])(n["default"].APP.name,n["default"].APP.version)}}),define("ember-sudoku-solver/initializers/container-debug-adapter",["exports","ember-resolver/container-debug-adapter"],function(e,t){e["default"]={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0];e.register("container-debug-adapter:main",t["default"]),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("ember-sudoku-solver/initializers/export-application-global",["exports","ember","ember-sudoku-solver/config/environment"],function(e,t,n){function r(){var e=arguments[1]||arguments[0];if(n["default"].exportApplicationGlobal!==!1){var r,a=n["default"].exportApplicationGlobal;r="string"==typeof a?a:t["default"].String.classify(n["default"].modulePrefix),window[r]||(window[r]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete window[r]}}))}}e.initialize=r,e["default"]={name:"export-application-global",initialize:r}}),define("ember-sudoku-solver/resolver",["exports","ember-resolver"],function(e,t){e["default"]=t["default"]}),define("ember-sudoku-solver/router",["exports","ember","ember-sudoku-solver/config/environment"],function(e,t,n){var r=t["default"].Router.extend({location:n["default"].locationType});r.map(function(){}),e["default"]=r}),define("ember-sudoku-solver/routes/index",["exports","ember"],function(e,t){e["default"]=t["default"].Route.extend({})}),define("ember-sudoku-solver/services/sudoku-puzzle",["exports","ember"],function(e,t){e["default"]=t["default"].Service.extend({puzzleTextToArray:function(e){var n=[],r=void 0,a=void 0,l=void 0,o=void 0;if("string"!=typeof e||t["default"].isBlank(e))return!1;if(r=t["default"].$.trim(e).split("\n"),9!==r.length)return!1;for(l=0;l<r.length;l++){var i=[];if(a=t["default"].$.trim(r[l]).split(""),9!==a.length)return!1;for(o=0;o<a.length;o++){var d=void 0;if("X"===a[o].toUpperCase())i.push({value:!1,prefilled:!1});else{if(d=parseInt(a[o],10),isNaN(d)||1>d||d>9)return!1;i.push({value:d,prefilled:!0})}}n.push(i)}return n},puzzleArrayToText:function(e){var n="";return!t["default"].isArray(e)||e.length<1?n:(e.forEach(function(e){!t["default"].isArray(e)||e.length<1||(e.forEach(function(e){n+=e.value||"X"}),n+="\n")}),t["default"].$.trim(n))},rowHasDupe:function(e,t,n){var r=void 0;for(r=0;r<n[e].length;r++)if(n[e][r].value===t)return!0;return!1},colHasDupe:function(e,t,n){var r=void 0;for(r=0;r<n.length;r++)if(n[r][e].value===t)return!0;return!1},regionHasDupe:function(e,t,n,r){for(var a=0,l=0,o=3,i=void 0,d=void 0;e>=a+o;)a+=o;for(;t>=l+o;)l+=o;for(i=l;l+o>i;i++)for(d=a;a+o>d;d++)if(r[i][d].value===n)return!0;return!1},cellIsValid:function(e,t,n,r){return!this.rowHasDupe(t,n,r)&&!this.colHasDupe(e,n,r)&&!this.regionHasDupe(e,t,n,r)},getEmptyCells:function(e){var t=[],n=void 0,r=void 0;for(n=0;n<e.length;n++)for(r=0;r<e[n].length;r++)e[n][r].prefilled||t.push([n,r]);return t},solve:function(e){var n={success:!1,grid:e},r=this.getEmptyCells(e),a=9,l=void 0,o=void 0,i=void 0,d=void 0,s=void 0;for(i=0;i<r.length;){for(l=r[i][0],o=r[i][1],d=n.grid[l][o].value+1,s=!1;!s&&a>=d;)this.cellIsValid(o,l,d,n.grid)?(s=!0,t["default"].set(n.grid[l][o],"value",d),i++):d++;if(!s&&(t["default"].set(n.grid[l][o],"value",0),i--,0>i))break}return n.success=i===r.length,n}})}),define("ember-sudoku-solver/templates/application",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{fragmentReason:{name:"triple-curlies"},revision:"Ember@2.5.0",loc:{source:null,start:{line:1,column:0},end:{line:8,column:6}},moduleName:"ember-sudoku-solver/templates/application.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("div");e.setAttribute(n,"class","container");var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("footer");e.setAttribute(r,"class","footer");var a=e.createTextNode("\n    ");e.appendChild(r,a);var a=e.createElement("small");e.setAttribute(a,"class","pull-xs-right"),e.appendChild(r,a);var a=e.createTextNode("\n    ");e.appendChild(r,a);var a=e.createElement("small"),l=e.createTextNode("© ");e.appendChild(a,l);var l=e.createElement("a");e.setAttribute(l,"href","http://billdami.com");var o=e.createTextNode("Bill Dami");e.appendChild(l,o),e.appendChild(a,l);var l=e.createTextNode(" 2016. | \n    ");e.appendChild(a,l);var l=e.createElement("a");e.setAttribute(l,"href","https://github.com/billdami/ember-sudoku-solver");var o=e.createTextNode("GitHub");e.appendChild(l,o),e.appendChild(a,l),e.appendChild(r,a);var a=e.createTextNode("\n  ");e.appendChild(r,a),e.appendChild(n,r);var r=e.createTextNode("\n");return e.appendChild(n,r),e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(e.childAt(t,[0]),1,1),r},statements:[["content","outlet",["loc",[null,[2,2],[2,12]]]]],locals:[],templates:[]}}())}),define("ember-sudoku-solver/templates/components/alert-message",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{fragmentReason:{name:"triple-curlies"},revision:"Ember@2.5.0",loc:{source:null,start:{line:1,column:0},end:{line:5,column:0}},moduleName:"ember-sudoku-solver/templates/components/alert-message.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("  ");e.appendChild(t,n);var n=e.createElement("button");e.setAttribute(n,"type","button"),e.setAttribute(n,"class","close"),e.setAttribute(n,"data-dismiss","alert"),e.setAttribute(n,"aria-label","Close");var r=e.createTextNode("\n    ");e.appendChild(n,r);var r=e.createElement("span");e.setAttribute(r,"aria-hidden","true");var a=e.createTextNode("×");e.appendChild(r,a),e.appendChild(n,r);var r=e.createTextNode("\n  ");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{fragmentReason:{name:"missing-wrapper",problems:["wrong-type","multiple-nodes"]},revision:"Ember@2.5.0",loc:{source:null,start:{line:1,column:0},end:{line:7,column:0}},moduleName:"ember-sudoku-solver/templates/components/alert-message.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(2);return r[0]=e.createMorphAt(t,0,0,n),r[1]=e.createMorphAt(t,1,1,n),e.insertBoundary(t,0),r},statements:[["block","if",[["get","closeable",["loc",[null,[1,6],[1,15]]]]],[],0,null,["loc",[null,[1,0],[5,7]]]],["content","yield",["loc",[null,[6,0],[6,9]]]]],locals:[],templates:[e]}}())}),define("ember-sudoku-solver/templates/components/file-download-link",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{fragmentReason:{name:"missing-wrapper",problems:["wrong-type"]},revision:"Ember@2.5.0",loc:{source:null,start:{line:1,column:0},end:{line:2,column:0}},moduleName:"ember-sudoku-solver/templates/components/file-download-link.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),r},statements:[["content","yield",["loc",[null,[1,0],[1,9]]]]],locals:[],templates:[]}}())}),define("ember-sudoku-solver/templates/components/file-input-btn",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{fragmentReason:{name:"missing-wrapper",problems:["wrong-type","multiple-nodes"]},revision:"Ember@2.5.0",loc:{source:null,start:{line:1,column:0},end:{line:2,column:9}},moduleName:"ember-sudoku-solver/templates/components/file-input-btn.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(2);return r[0]=e.createMorphAt(t,0,0,n),r[1]=e.createMorphAt(t,2,2,n),e.insertBoundary(t,0),e.insertBoundary(t,null),r},statements:[["inline","file-input",[],["accept",["subexpr","@mut",[["get","accept",["loc",[null,[1,20],[1,26]]]]],[],[]],"on-change",["subexpr","action",["fileChange"],[],["loc",[null,[1,37],[1,58]]]]],["loc",[null,[1,0],[1,60]]]],["content","yield",["loc",[null,[2,0],[2,9]]]]],locals:[],templates:[]}}())}),define("ember-sudoku-solver/templates/components/sudoku-grid",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){var e=function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:7,column:12},end:{line:9,column:12}},moduleName:"ember-sudoku-solver/templates/components/sudoku-grid.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("              ");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(t,1,1,n),r},statements:[["content","col.value",["loc",[null,[8,14],[8,27]]]]],locals:[],templates:[]}}();return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:5,column:8},end:{line:11,column:8}},moduleName:"ember-sudoku-solver/templates/components/sudoku-grid.hbs"},isEmpty:!1,arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("          ");e.appendChild(t,n);var n=e.createElement("td"),r=e.createTextNode("\n");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("          ");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=e.childAt(t,[1]),a=new Array(2);return a[0]=e.createAttrMorph(r,"class"),a[1]=e.createMorphAt(r,1,1),a},statements:[["attribute","class",["concat",["sudoku-grid-cell ",["subexpr","if",[["get","col.prefilled",["loc",[null,[6,43],[6,56]]]],"prefilled",""],[],["loc",[null,[6,38],[6,73]]]]]]],["block","if",[["get","col.value",["loc",[null,[7,18],[7,27]]]]],[],0,null,["loc",[null,[7,12],[9,19]]]]],locals:["col"],templates:[e]}}();return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:3,column:4},end:{line:13,column:4}},moduleName:"ember-sudoku-solver/templates/components/sudoku-grid.hbs"},isEmpty:!1,arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("      ");e.appendChild(t,n);var n=e.createElement("tr");e.setAttribute(n,"class","sudoku-grid-row");var r=e.createTextNode("\n");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("      ");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(e.childAt(t,[1]),1,1),r},statements:[["block","each",[["get","row",["loc",[null,[5,16],[5,19]]]]],[],0,null,["loc",[null,[5,8],[11,17]]]]],locals:["row"],templates:[e]}}();return{meta:{fragmentReason:{name:"triple-curlies"},revision:"Ember@2.5.0",loc:{source:null,start:{line:1,column:0},end:{line:15,column:8}},moduleName:"ember-sudoku-solver/templates/components/sudoku-grid.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("table");e.setAttribute(n,"class","table table-bordered sudoku-grid-table");var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("tbody"),a=e.createTextNode("\n");e.appendChild(r,a);var a=e.createComment("");e.appendChild(r,a);var a=e.createTextNode("  ");e.appendChild(r,a),e.appendChild(n,r);var r=e.createTextNode("\n");return e.appendChild(n,r),e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(e.childAt(t,[0,1]),1,1),r},statements:[["block","each",[["get","grid",["loc",[null,[3,12],[3,16]]]]],[],0,null,["loc",[null,[3,4],[13,13]]]]],locals:[],templates:[e]}}())}),define("ember-sudoku-solver/templates/index",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{fragmentReason:{name:"missing-wrapper",problems:["wrong-type","multiple-nodes"]},revision:"Ember@2.5.0",loc:{source:null,start:{line:1,column:0},end:{line:4,column:31}},moduleName:"ember-sudoku-solver/templates/index.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(4);return r[0]=e.createMorphAt(t,0,0,n),r[1]=e.createMorphAt(t,2,2,n),r[2]=e.createMorphAt(t,4,4,n),r[3]=e.createMorphAt(t,6,6,n),e.insertBoundary(t,0),e.insertBoundary(t,null),r},statements:[["inline","partial",["navbar"],[],["loc",[null,[1,0],[1,20]]]],["inline","partial",["puzzle-msgs"],[],["loc",[null,[2,0],[2,25]]]],["inline","partial",["welcome-msg"],[],["loc",[null,[3,0],[3,25]]]],["inline","sudoku-grid",[],["grid",["subexpr","@mut",[["get","puzzleGrid",["loc",[null,[4,19],[4,29]]]]],[],[]]],["loc",[null,[4,0],[4,31]]]]],locals:[],templates:[]}}())}),define("ember-sudoku-solver/templates/navbar",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:4,column:6},end:{line:8,column:6}},moduleName:"ember-sudoku-solver/templates/navbar.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("        ");e.appendChild(t,n);var n=e.createElement("button");e.setAttribute(n,"type","button"),e.setAttribute(n,"class","btn btn-block btn-primary-outline");var r=e.createTextNode("\n          ");e.appendChild(n,r);var r=e.createElement("i");e.setAttribute(r,"class","fa fa-lightbulb-o"),e.appendChild(n,r);var r=e.createTextNode(" ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\n        ");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=e.childAt(t,[1]),a=new Array(3);return a[0]=e.createAttrMorph(r,"disabled"),a[1]=e.createElementMorph(r),a[2]=e.createMorphAt(r,3,3),a},statements:[["attribute","disabled",["get","disableSolve",["loc",[null,[5,83],[5,95]]]]],["element","action",["solvePuzzle"],[],["loc",[null,[5,98],[5,122]]]],["inline","if",[["get","isSolving",["loc",[null,[6,49],[6,58]]]],"Working...","Solve!"],[],["loc",[null,[6,44],[6,82]]]]],locals:[],templates:[]}}(),t=function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:9,column:8},end:{line:15,column:8}},moduleName:"ember-sudoku-solver/templates/navbar.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("          ");e.appendChild(t,n);var n=e.createElement("i");e.setAttribute(n,"class","fa fa-upload"),e.appendChild(t,n);var n=e.createTextNode(" Load File\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:8,column:6},end:{line:16,column:6}},moduleName:"ember-sudoku-solver/templates/navbar.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),e.insertBoundary(t,null),r},statements:[["block","file-input-btn",[],["accept","text/plain","read-file-as-text",!0,"on-read-file",["subexpr","action",["loadPuzzleFile"],[],["loc",[null,[12,23],[12,48]]]],"btn-classes","btn-block btn-primary-outline"],0,null,["loc",[null,[9,8],[15,27]]]]],locals:[],templates:[e]}}(),n=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:33,column:6},end:{line:37,column:6}},moduleName:"ember-sudoku-solver/templates/navbar.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("        ");e.appendChild(t,n);var n=e.createElement("button");e.setAttribute(n,"type","button"),e.setAttribute(n,"class","btn btn-primary-outline");var r=e.createTextNode("\n          ");e.appendChild(n,r);var r=e.createElement("i");e.setAttribute(r,"class","fa fa-lightbulb-o"),e.appendChild(n,r);var r=e.createTextNode(" ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\n        ");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=e.childAt(t,[1]),a=new Array(3);return a[0]=e.createAttrMorph(r,"disabled"),a[1]=e.createElementMorph(r),a[2]=e.createMorphAt(r,3,3),a},statements:[["attribute","disabled",["get","disableSolve",["loc",[null,[34,73],[34,85]]]]],["element","action",["solvePuzzle"],[],["loc",[null,[34,88],[34,112]]]],["inline","if",[["get","isSolving",["loc",[null,[35,49],[35,58]]]],"Working...","Solve!"],[],["loc",[null,[35,44],[35,82]]]]],locals:[],templates:[]}}(),r=function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:38,column:8},end:{line:44,column:8}},moduleName:"ember-sudoku-solver/templates/navbar.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("          ");e.appendChild(t,n);var n=e.createElement("i");e.setAttribute(n,"class","fa fa-upload"),e.appendChild(t,n);var n=e.createTextNode(" Load File\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:37,column:6},end:{line:45,column:6}},moduleName:"ember-sudoku-solver/templates/navbar.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),e.insertBoundary(t,null),r},statements:[["block","file-input-btn",[],["accept","text/plain","read-file-as-text",!0,"on-read-file",["subexpr","action",["loadPuzzleFile"],[],["loc",[null,[41,23],[41,48]]]],"btn-classes","btn-primary-outline"],0,null,["loc",[null,[38,8],[44,27]]]]],locals:[],templates:[e]}}();return{meta:{fragmentReason:{name:"triple-curlies"},revision:"Ember@2.5.0",loc:{source:null,start:{line:1,column:0},end:{line:51,column:6}},moduleName:"ember-sudoku-solver/templates/navbar.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("div");e.setAttribute(n,"class","nav-ct");var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("div");e.setAttribute(r,"class","collapse hidden-sm-up"),e.setAttribute(r,"id","navbar-collapsed-content");var a=e.createTextNode("\n    ");e.appendChild(r,a);var a=e.createElement("div");e.setAttribute(a,"class","bg-inverse p-a-1");var l=e.createTextNode("\n");e.appendChild(a,l);var l=e.createComment("");e.appendChild(a,l);var l=e.createTextNode("      ");e.appendChild(a,l);var l=e.createElement("button");e.setAttribute(l,"type","button"),e.setAttribute(l,"class","btn btn-block btn-secondary-outline");var o=e.createTextNode("\n        Clear\n      ");e.appendChild(l,o),e.appendChild(a,l);var l=e.createTextNode("\n    ");e.appendChild(a,l),e.appendChild(r,a);var a=e.createTextNode("\n  ");e.appendChild(r,a),e.appendChild(n,r);var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("nav");e.setAttribute(r,"class","navbar navbar-light bg-faded");var a=e.createTextNode("\n    ");e.appendChild(r,a);var a=e.createElement("button");e.setAttribute(a,"class","navbar-toggler hidden-sm-up pull-xs-right"),e.setAttribute(a,"type","button"),e.setAttribute(a,"data-toggle","collapse"),e.setAttribute(a,"data-target","#navbar-collapsed-content"),e.setAttribute(a,"aria-controls","navbar-collapsed-content");var l=e.createTextNode("\n      ☰\n    ");e.appendChild(a,l),e.appendChild(r,a);var a=e.createTextNode("\n    ");e.appendChild(r,a);var a=e.createElement("span");e.setAttribute(a,"class","navbar-brand");var l=e.createElement("i");e.setAttribute(l,"class","fa fa-th"),e.appendChild(a,l);var l=e.createTextNode(" ");e.appendChild(a,l);var l=e.createElement("strong"),o=e.createTextNode("sudoku");e.appendChild(l,o),e.appendChild(a,l);var l=e.createTextNode(" solver");e.appendChild(a,l),e.appendChild(r,a);var a=e.createTextNode("\n    ");e.appendChild(r,a);var a=e.createElement("div");e.setAttribute(a,"class","pull-xs-right hidden-xs-down");var l=e.createTextNode("\n");e.appendChild(a,l);var l=e.createComment("");e.appendChild(a,l);var l=e.createTextNode("      ");e.appendChild(a,l);var l=e.createElement("button");e.setAttribute(l,"type","button"),e.setAttribute(l,"class","btn btn-secondary-outline");var o=e.createTextNode("\n        Clear\n      ");e.appendChild(l,o),e.appendChild(a,l);var l=e.createTextNode("\n    ");e.appendChild(a,l),e.appendChild(r,a);var a=e.createTextNode("\n  ");e.appendChild(r,a),e.appendChild(n,r);var r=e.createTextNode("\n");return e.appendChild(n,r),e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=e.childAt(t,[0]),a=e.childAt(r,[1,1]),l=e.childAt(a,[3]),o=e.childAt(r,[3,5]),i=e.childAt(o,[3]),d=new Array(6);return d[0]=e.createMorphAt(a,1,1),d[1]=e.createAttrMorph(l,"disabled"),d[2]=e.createElementMorph(l),d[3]=e.createMorphAt(o,1,1),d[4]=e.createAttrMorph(i,"disabled"),d[5]=e.createElementMorph(i),d},statements:[["block","if",[["get","puzzleIsLoaded",["loc",[null,[4,12],[4,26]]]]],[],0,1,["loc",[null,[4,6],[16,13]]]],["attribute","disabled",["get","isSolving",["loc",[null,[17,83],[17,92]]]]],["element","action",["clearPuzzle"],[],["loc",[null,[17,95],[17,119]]]],["block","if",[["get","puzzleIsLoaded",["loc",[null,[33,12],[33,26]]]]],[],2,3,["loc",[null,[33,6],[45,13]]]],["attribute","disabled",["get","isSolving",["loc",[null,[46,73],[46,82]]]]],["element","action",["clearPuzzle"],[],["loc",[null,[46,85],[46,109]]]]],locals:[],templates:[e,t,n,r]}}())}),define("ember-sudoku-solver/templates/puzzle-msgs",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){var e=function(){var e=function(){var e=function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:7,column:10},end:{line:9,column:10}},moduleName:"ember-sudoku-solver/templates/puzzle-msgs.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("            ");e.appendChild(t,n);var n=e.createElement("i");e.setAttribute(n,"class","fa fa-download"),e.appendChild(t,n);var n=e.createTextNode(" Download Solution\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:5,column:6},end:{line:11,column:6}},moduleName:"ember-sudoku-solver/templates/puzzle-msgs.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("        ");e.appendChild(t,n);var n=e.createElement("p"),r=e.createTextNode("\n");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("        ");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(e.childAt(t,[1]),1,1),r},statements:[["block","file-download-link",[],["blob",["subexpr","@mut",[["get","solvedPuzzleBlob",["loc",[null,[7,37],[7,53]]]]],[],[]],"download",["subexpr","@mut",[["get","solutionFilename",["loc",[null,[7,63],[7,79]]]]],[],[]],"class","btn btn-success"],0,null,["loc",[null,[7,10],[9,33]]]]],locals:[],templates:[e]}}();return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:3,column:4},end:{line:12,column:4}},moduleName:"ember-sudoku-solver/templates/puzzle-msgs.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("      ");e.appendChild(t,n);var n=e.createElement("p"),r=e.createTextNode("The puzzle was solved successfully! Click 'Download Solution' to download a .txt file containing the completed puzzle.");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(t,3,3,n),e.insertBoundary(t,null),r},statements:[["block","if",[["get","solvedPuzzleBlob",["loc",[null,[5,12],[5,28]]]]],[],0,null,["loc",[null,[5,6],[11,13]]]]],locals:[],templates:[e]}}();return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:2,column:2},end:{line:13,column:2}},moduleName:"ember-sudoku-solver/templates/puzzle-msgs.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),e.insertBoundary(t,null),r},statements:[["block","alert-message",[],["type","success","closeable",!1],0,null,["loc",[null,[3,4],[12,22]]]]],locals:[],templates:[e]}}(),t=function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:14,column:4},end:{line:16,column:4}},moduleName:"ember-sudoku-solver/templates/puzzle-msgs.hbs"
},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("      ");e.appendChild(t,n);var n=e.createElement("p"),r=e.createTextNode("Sorry, it appears that this puzzle does not have a valid solution. :'-(");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:13,column:2},end:{line:17,column:2}},moduleName:"ember-sudoku-solver/templates/puzzle-msgs.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),e.insertBoundary(t,null),r},statements:[["block","alert-message",[],["type","danger","closeable",!1],0,null,["loc",[null,[14,4],[16,22]]]]],locals:[],templates:[e]}}();return{meta:{fragmentReason:{name:"missing-wrapper",problems:["wrong-type"]},revision:"Ember@2.5.0",loc:{source:null,start:{line:1,column:0},end:{line:18,column:0}},moduleName:"ember-sudoku-solver/templates/puzzle-msgs.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),e.insertBoundary(t,null),r},statements:[["block","if",[["get","solveSuccess",["loc",[null,[2,8],[2,20]]]]],[],0,1,["loc",[null,[2,2],[17,9]]]]],locals:[],templates:[e,t]}}(),t=function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:20,column:2},end:{line:22,column:2}},moduleName:"ember-sudoku-solver/templates/puzzle-msgs.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    ");e.appendChild(t,n);var n=e.createElement("p"),r=e.createComment("");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(e.childAt(t,[1]),0,0),r},statements:[["content","fileError",["loc",[null,[21,7],[21,20]]]]],locals:[],templates:[]}}();return{meta:{fragmentReason:!1,revision:"Ember@2.5.0",loc:{source:null,start:{line:19,column:0},end:{line:23,column:0}},moduleName:"ember-sudoku-solver/templates/puzzle-msgs.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),e.insertBoundary(t,null),r},statements:[["block","alert-message",[],["type","danger","closeable",!1],0,null,["loc",[null,[20,2],[22,20]]]]],locals:[],templates:[e]}}();return{meta:{fragmentReason:{name:"missing-wrapper",problems:["wrong-type","multiple-nodes"]},revision:"Ember@2.5.0",loc:{source:null,start:{line:1,column:0},end:{line:23,column:7}},moduleName:"ember-sudoku-solver/templates/puzzle-msgs.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(2);return r[0]=e.createMorphAt(t,0,0,n),r[1]=e.createMorphAt(t,1,1,n),e.insertBoundary(t,0),e.insertBoundary(t,null),r},statements:[["block","if",[["get","isSolved",["loc",[null,[1,6],[1,14]]]]],[],0,null,["loc",[null,[1,0],[18,7]]]],["block","if",[["get","fileError",["loc",[null,[19,6],[19,15]]]]],[],1,null,["loc",[null,[19,0],[23,7]]]]],locals:[],templates:[e,t]}}())}),define("ember-sudoku-solver/templates/welcome-msg",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{fragmentReason:{name:"missing-wrapper",problems:["multiple-nodes"]},revision:"Ember@2.5.0",loc:{source:null,start:{line:1,column:0},end:{line:14,column:0}},moduleName:"ember-sudoku-solver/templates/welcome-msg.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("  ");e.appendChild(t,n);var n=e.createElement("strong"),r=e.createTextNode("Welcome!");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode(" \n  ");e.appendChild(t,n);var n=e.createElement("p"),r=e.createTextNode("\n    To start solving sudoku puzzles, click 'Load File' and select a .txt file containing a 9x9 grid \n    of \"X\" letters to represent grid cells, except for the pre-filled cells, which should be a number\n    between 1 and 9. Once loaded, click 'Solve!' to complete the puzzle.\n  ");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n  ");e.appendChild(t,n);var n=e.createElement("p"),r=e.createTextNode("\n    ");e.appendChild(n,r);var r=e.createElement("small"),a=e.createTextNode("\n      ");e.appendChild(r,a);var a=e.createElement("strong"),l=e.createTextNode("Note:");e.appendChild(a,l),e.appendChild(r,a);var a=e.createTextNode(" This app uses HTML5 features like browser-based file reading, and it is only \n      compatible with modern browsers (Chrome, Firefox 3.6+, IE 10+)\n    ");e.appendChild(r,a),e.appendChild(n,r);var r=e.createTextNode("\n  ");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode(" \n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{fragmentReason:{name:"missing-wrapper",problems:["wrong-type"]},revision:"Ember@2.5.0",loc:{source:null,start:{line:1,column:0},end:{line:14,column:18}},moduleName:"ember-sudoku-solver/templates/welcome-msg.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),e.insertBoundary(t,null),r},statements:[["block","alert-message",[],["type","info","closeable",!0],0,null,["loc",[null,[1,0],[14,18]]]]],locals:[],templates:[e]}}())}),define("ember-sudoku-solver/config/environment",["ember"],function(e){var t="ember-sudoku-solver";try{var n=t+"/config/environment",r=e["default"].$('meta[name="'+n+'"]').attr("content"),a=JSON.parse(unescape(r));return{"default":a}}catch(l){throw new Error('Could not read config from meta tag with name "'+n+'".')}}),runningTests||require("ember-sudoku-solver/app")["default"].create({name:"ember-sudoku-solver",version:"0.0.1+26fee0bb"});