var url = "JSONData.txt";
var json;

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        json = JSON.parse(xmlhttp.responseText);
        drawCheckBoxes(json);
        drawTable(json['report']);
    } else {
        console.log("Error", xmlhttp.statusText);
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
        if(arr[i]['grade']['value'] === null){
            out += '<td>' + 'no grade' +'</td>';
        } else {
            out += '<td>' + arr[i]['grade']['value'] +'</td>';
        }

        newRow.innerHTML = out;
        document.getElementById("table").appendChild(newRow);
        absenceSum += Number( arr[i]['absence']['value']);
        if(arr[i]['grade']['value'] !== null){
            gradeSum += Number( arr[i]['grade']['value']);
            gradeCount++;
        }
    }

    averageGrade = gradeSum/gradeCount;
    if(isNaN(averageGrade)){
        averageGrade = 0;
    }
    tableFooter = document.createElement('tfoot');
    tableFooter.innerHTML = '<td></td><td>Total absence: </td><td>' + absenceSum +
                            '</td><td>Average grade:</td><td>' + averageGrade.toFixed(2) + '</td>';
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

function sortTable(){
    var categoriesBox,
        selectedCategory,
        valuesBox,
        selectedValue,
        filtredJson;

    categoriesBox = document.getElementById('categoriesBox');
    selectedCategory = categoriesBox.selectedOptions[0].value;
    valuesBox = document.getElementById('valuesBox');
    selectedValue = valuesBox.selectedOptions[0].value;
    filtredJson = json['report'].filter(function(el){
        return String(el[selectedCategory].value) === selectedValue;
    });
    document.getElementById("table").innerHTML = '';
    drawTable(filtredJson);
}

function showCategoryValues(){
    var categoriesBox,
        selectedCategory,
        existingValues = [];

    document.getElementById('valuesBox').innerHTML = '';
    categoriesBox = document.getElementById('categoriesBox');
    selectedCategory = categoriesBox.selectedOptions[0].value;

    for(var i in json['report']){
        var value = json['report'][i][selectedCategory].value;
        if(existingValues.indexOf(value) == -1 ) {
            if(value === null){
                existingValues.push(value);
                value = 'no ' + selectedCategory;
                var option = document.createElement('option');
                option.innerHTML = value;
                option.value = null;
                document.getElementById('valuesBox').appendChild(option);
                continue;
            }
            existingValues.push(value);
            var newOption = document.createElement('option');
            newOption.innerHTML = value;
            newOption.value = value;
            document.getElementById('valuesBox').appendChild(newOption);
        }
    }
}

function showTable(){
    document.getElementById("table").innerHTML = '';
    drawTable(json['report']);
}