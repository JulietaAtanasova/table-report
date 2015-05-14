var url = "JSONData.txt";
var json;

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        json = JSON.parse(xmlhttp.responseText);
        console.log(json);
        drawCheckBoxes(json);
        drawTable(json['report']);
    } else {
        console.log("Error reading json file", xmlhttp.statusText);
    }
};

function drawTable(arr) {
    var absenceSum = 0,
        gradeSum = 0,
        gradeCount = 0,
        averageGrade = 0,
        tableHeader,
        tableFooter,
        i;

    tableHeader = document.createElement('thead');
    tableHeader.innerHTML = '<td>Name</td><td>Class</td><td>Absence</td><td>Completed On</td><td>Grade</td>';
    document.getElementById("table").appendChild(tableHeader);

    for(i = 0; i < arr.length; i++) {
        var out = "";
        var newRow = document.createElement('tr');
        out += '<td>' + arr[i]['name']['value'] +'</td>';
        out += '<td>' + arr[i]['class']['value'] +'</td>';
        out += '<td>' + arr[i]['absence']['value'] +'</td>';
        out += '<td>' + arr[i]['completedOn']['value'] +'</td>';
        out += '<td>' + arr[i]['grade']['value'] +'</td>';
        newRow.innerHTML = out;
        document.getElementById("table").appendChild(newRow);
        absenceSum += Number( arr[i]['absence']['value']);
        if(arr[i]['grade']['value'] !== null){
            gradeSum += Number( arr[i]['grade']['value']);
            gradeCount++;
        }
    }

    averageGrade = gradeSum/gradeCount;
    tableFooter = document.createElement('tfoot');
    tableFooter.innerHTML = '<td></td><td>Total absence: </td><td>' +
                             absenceSum + '</td><td>Average grade:</td><td>' +
                             averageGrade.toFixed(2) + '</td>';
    document.getElementById("table").appendChild(tableFooter);
}

function drawCheckBoxes(arr){
    var categories = Object.keys(arr['report'][0]);
    for(var c in categories){
        var option = document.createElement('option');
        option.innerHTML = categories[c];
        option.value = categories[c];
        document.getElementById('categoriesBox').appendChild(option);
    }
    showCategoryValues();
}

function sort(){
    var categoriesBox = document.getElementById('categoriesBox');
    var selectedCategory = categoriesBox.selectedOptions[0].value;
    var valuesBox = document.getElementById('valuesBox');
    var selectedValue = valuesBox.selectedOptions[0].value;
    var filtredJSON = json['report'].filter(function(el){
        console.log(selectedCategory);
        return el[selectedCategory].value == selectedValue;
    });
    document.getElementById("table").innerHTML = '';
    drawTable(filtredJSON);
}

function showCategoryValues(){
    document.getElementById('valuesBox').innerHTML = '';
    var categoriesBox = document.getElementById('categoriesBox');
    var selectedCategory = categoriesBox.selectedOptions[0].value;
    var existingValues = [];

    for(var i in json['report']){
        var value = json['report'][i][selectedCategory].value;
        if(value && existingValues.indexOf(value) == -1 ) {
            existingValues.push(value);
            var newOption = document.createElement('option');
            newOption.innerHTML = value;
            newOption.value = value;
            document.getElementById('valuesBox').appendChild(newOption);
            var box = document.getElementById('valuesBox');
        }
    }
}