$(document).ready(function() {

    var loggedIn = false;

    $('#loginBtn').click(function() {
        //  Show Loading
        $.mobile.loading("show", {
            text: "Signing In...",
            textVisible: true,
            theme: "b",
        });
        var username = $("#sid").val();
        var password = $("#password").val();
        var dataString = 'sid=' + username + '&password=' + password;
        var wrongInput = '<p class="invalid-password">Invalid username or password</p>';
        $.ajax({
            method: "POST",
            type: "json",
            url: "http://5.196.109.144/index.php",
            data: dataString,
            cache: false,
            success: function(response) {
                if (response.status == "success") {
                    loggedIn = true;
                    $('.student-name').text(response.name);
                    getData();
                    $.mobile.loading("hide"); // Hide loading if success
                    $.mobile.changePage('#user-profile'); // Go to user-profile page if succeed
                } else {
                    $('.invalid-password').remove();
                   
                        navigator.vibrate(3000);
                    $('.loginform').append(wrongInput);
                    $('.invalid-password').slideDown();
                    $.mobile.loading("hide"); // Hide loading if failed
                }
            }
        });
        function getData() {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "http://5.196.109.144/student.php",
                data: dataString,
                cache: false,
                success: function(response) {
                    var htmlData = '<ul class="student-data">'
                    if (loggedIn = true) {
                        for (var i = 0; i < response.length; i += 1) {
                            var row = '<ul class="table-row">';
                            htmlData += row;
                            htmlData += ' <li> Module: ' + response[i].moduleName;
                            htmlData += ' <li> Grade: ' + response[i].grade;
                            htmlData += ' <li> Teacher: ' + response[i].teacherName;
                            htmlData += ' <li> Start Date: ' + response[i].startDate;
                            htmlData += '</ul>';
                        }
                        htmlData += '</li>'
                        $('.user-profile').append(htmlData);
                    } else {
                        alert("A problem occured, Please login again.");
                    }
                }
            });
        }
        return false;
    });
    $('#logoutBtn').click(function() {
        loggedIn = false;
        $('.student-data').remove();
    });
});
