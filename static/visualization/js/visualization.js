var selectGroup = -1;
var selectPage = -1;




function tab(btn){
    var leftTab = document.getElementById("pageManage");
    var rightTab = document.getElementById("parts");
    if(btn.innerHTML == "页面管理"){
        leftTab.style.display = "block";
        rightTab.style.display = "none";
    }else{
        leftTab.style.display = "none";
        rightTab.style.display = "block";
    }
}

/*
table
    row table
            row

*/

function incGroup(){
    var parent = document.getElementById("base");
    var parentRow = parent.insertRow();
    var child = document.createElement("table");
    var newRow = child.insertRow();
    
    var newCell = newRow.insertCell();
    
    //content
    var content = document.createElement("div");
    content.innerHTML = "未命名组";
    newCell.appendChild(content);
    
    parentRow.onclick = function(){getGroupIndex(this)};
    parentRow.appendChild(child);
}

function incPage(){
    var parent = document.getElementById("base");
    var table = parent.rows[selectGroup].firstChild;
    
    var newRow = table.insertRow();
    var newCell = newRow.insertCell();
    newRow.onclick = function(){getPageIndex(this)};
    
    //content
    var content = document.createElement("div");
    content.innerHTML = "未命名页面";
    newCell.appendChild(content);
}

function getGroupIndex(row){
    selectGroup = row.rowIndex;
    refreshTab();
}

function getPageIndex(row){
    selectPage = row.rowIndex;
    refreshTab();
}

function refreshTab(){
    var table = document.getElementById("base");
    len1 = table.rows.length;
    
        for (var i = 0;i < len1 ; i++){
            tempTable = table.rows[i].firstChild;
            var len2 = tempTable.rows.length;
            refreshGroup(tempTable.rows[0],i);
            for (var a = 1;a < len2 ;a++){
                refreshPage(tempTable.rows[a],a,i);
            }
        }
}
               
function refreshGroup(row,i){
    if (i == selectGroup){
        row.style.color = "blue";
    }else{
        row.style.color = "black";
    }
}
function refreshPage(row,a,i){
    if (a == selectPage && i == selectGroup){
        row.style.color = "red";
    }else{
        row.style.color = "black";
    }
}               
               















