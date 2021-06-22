var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["fieldname"] = document.getElementById("fieldname").value;
    formData["designation"] = document.getElementById("designation").value;
    formData["salary"] = document.getElementById("salary").value;
    // formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fieldname;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.designation;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    // cell4 = newRow.insertCell(3);
    // cell4.innerHTML = data.city;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("fieldname").value = "";
    document.getElementById("designation").value = "";
    document.getElementById("salary").value = "";
    // document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fieldname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("designation").value = selectedRow.cells[1].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
    // document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fieldname;
    selectedRow.cells[1].innerHTML = formData.designation;
    selectedRow.cells[2].innerHTML = formData.salary;
    // selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if ((document.getElementById("fieldName")||{}).value||"") {
        isValid = false;
        document.getElementById("fieldNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fieldNameValidationError").classList.contains("hide"))
            document.getElementById("fieldNameValidationError").classList.add("hide");
    }
    return isValid;
}
$(document).ready(function() {
    $("#formButton").click(function() {
      $("#tab-one").toggle();
    });
  });
//   $(document).ready(function() {
//     $("#submit").click(function() {
//       $("#tab-one").toggle();
//     });
//   });
$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#employeeList tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
$.ajax({
    url: '/data.json',
    dataType: 'json',
    success: function(data) {
        for (var i=0; i<data.length; i++) {
            var row = $('<tr><td>' + data[i].fieldname+ '</td><td>' + data[i].designation + '</td><td>' + data[i].salary + '</td></tr>');
            $('#employeeList').append(row);
        }
    },
    error: function(jqXHR, textStatus, errorThrown){
        alert('Error: ' + textStatus + ' - ' + errorThrown);
    }
});
