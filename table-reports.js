var reports = [];

for (var i in data['report']) {
    var report = data['report'][i];
    reports.push(new Report(report.name.value, report.class.value,
        report.absence.value, report.completedOn.value,report.grade.value));
}

showTable(reports);
drawCheckBoxes(reports);

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

    for(i in arr) {
        var out = "";
        var newRow = document.createElement('tr');
        for(var key in arr[i]){
            if(arr[i][key] === null){
                out += '<td>no ' + key +'</td>';
            } else {
                out += '<td>' + arr[i][key] + '</td>';
            }
        }

        newRow.innerHTML = out;
        document.getElementById("table").appendChild(newRow);
        absenceSum += Number( arr[i].absence);
        if(arr[i].grade !== null){
            gradeSum += Number( arr[i].grade);
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

function showTable(){
    document.getElementById("table").innerHTML = '';
    drawTable(reports);
}

function sortTable(){
    var categoriesBox,
        selectedCategory,
        valuesBox,
        selectedValue,
        sortedReports;

    categoriesBox = document.getElementById('categoriesBox');
    selectedCategory = categoriesBox.selectedOptions[0].value;
    valuesBox = document.getElementById('valuesBox');
    selectedValue = valuesBox.selectedOptions[0].value;
    sortedReports = reports.filter(function(el){
        return String(el[selectedCategory]) === selectedValue;
    });
    document.getElementById("table").innerHTML = '';
    drawTable(sortedReports);
}

function drawCheckBoxes(arr){
    var categories = Object.keys(arr[0]);
    for(var c in categories){
        var option = document.createElement('option');
        option.innerHTML = categories[c];
        option.value = categories[c];
        document.getElementById('categoriesBox').appendChild(option);
    }
    showCategoryValues(arr);
}

function showCategoryValues() {
    var categoriesBox,
        selectedCategory,
        existingValues = [];

    document.getElementById('valuesBox').innerHTML = '';
    categoriesBox = document.getElementById('categoriesBox');
    selectedCategory = categoriesBox.selectedOptions[0].value;

    for (var i in reports) {
        var value = reports[i][selectedCategory];
        if (existingValues.indexOf(value) == -1) {
            if (value === null) {
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