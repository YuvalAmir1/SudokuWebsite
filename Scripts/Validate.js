function validateInfo(signUp) {
    var form = document.getElementById("form1");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var firstName, lastName, gender, email, phone, city;
    if (signUp) {
        firstName = document.getElementById("firstName").value;
        lastName = document.getElementById("lastName").value;
        phone = document.getElementById("phone").value;
        gender = document.getElementById("gender").value;
    }
    var errorDiv = document.getElementById("errorText");
    errorDiv.innerHTML = "";
    var output;
    var vUsername = validateUsername(username, errorDiv);
    var vPassword = validatePassword(password, errorDiv);
    output = vUsername && vPassword;
    if (signUp) {
        var vFirstName = validateFirstName(firstName, errorDiv);
        var vLastName = validateLastName(lastName, errorDiv);
        var vPhone = validatePhone(phone, errorDiv);
        var vCity = validateCity(city, errorDiv);
        output = output && vFirstName && vLastName && vPhone && vCity;
    }
    if (output) {
        form.submit();
        clearForm(signUp);
    }
}
function clearForm(signUp) {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("errorText").innerHTML = "";
    if (signUp) {
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("gender").value = "other";
        document.getElementById("email").value = "";
        document.getElementById("birthDate").value = "";
        document.getElementById("city").value = "";
    }
}
function validateUsername(username, errorDiv) {
    var om = overMinimum(username, 3, errorDiv, "שם המשתמש צריך להיות בעורך של לפחות 3 תווים.");
    var um = underMaximum(username, 16, errorDiv, "שם המשתמש צריך להיות בעורך של פחות מ16 תווים");
    var fc = firstCharIsAnEnlishLetter(username, errorDiv, "שם המשתמש צריך להתחיל באות באנגלית.");
    var oe = onlyLeagalCharactersAndEnglish(username, [".", "_", "-", "*", "&", "!", "#"], errorDiv, "שם המשתמש מכיל תו לא תקין.");
    return om && um && fc && oe;
}
function validatePassword(password, errorDiv) {
    var om = overMinimum(password, 6, errorDiv, "הסיסמה צריכה להיות בעורך של לפחות 6 תווים.");
    var um = underMaximum(password, 31, errorDiv, "הסיסמה צריכה להיות בעורך של פחות מ31 תווים.");
    var oe = onlyLeagalCharactersAndEnglish(password, [".", "_", "-", "*", "&", "!", "#"], errorDiv, "הסיסמה מכילה תו לא תקין.");
    var ou = atLeastOneUpperCase(password, errorDiv, "הסיסמה צריכה להכיל אות גדולה.");
    var ol = atLeastOneLowerCase(password, errorDiv, "הסיסמה צריכה להכיל אות קטנה.");
    var os = atLeastOneSpecialCharacter(password, [".", "_", "-", "*", "&", "!", "#"], errorDiv, "הסיסמה צריכה להכיל סימן מיוחד.");
    return om && um && oe && ou && ol;
}
function validateFirstName(firstName, errorDiv) {
    var um = underMaximum(firstName, 16, errorDiv, "שם פרטי צריך להיות בעורך של פחות מ16 תווים.");
    var om = overMinimum(firstName, 1, errorDiv, "שם פרטי צריך להיות בעורך של לפחות שתי תווים.");
    var eoh = onlyEnglishOrOnlyHebrew(firstName, errorDiv, "שם פרטי לא יכול להכיל גם אנגלית וגם עברית.");
    var nw = noWhitespace(firstName, errorDiv, "שם פרטי לא יכול להכיל רוחים.");
    return um && om && eoh && nw;
}
function validateLastName(lastName, errorDiv) {
    var um = underMaximum(lastName, 16, errorDiv, "שם משפחה צריך להיות בעורך של פחות מ16 תווים.");
    var om = overMinimum(lastName, 1, errorDiv, "שם משפחה צריך להיות בעורך של לפחות שתי תווים.");
    var eow = onlyEnglishOrOnlyHebrew(lastName, errorDiv, "שם משפחה לא יכול להכיל גם אנגלית וגם עברית.");
    return um && om && eow;
}
function validatePhone(phone, errorDiv) {
    if (phone) /* check if number was inputed */ {
        var sl = setLenght(phone, 8, errorDiv, "מספר טלפון בעורך לא תקין.");
        var on = onlyNumbers(phone, errorDiv, "טלפון צריך להכיל רק מספרים.");
        return sl && on;
    }
    return true;
}
function validateCity(city, errorDiv) {
    if (typeof (city) === "undefined")
        return true;
    return underMaximum(city, 16, errorDiv, "העיר לא יכולה להיות בעורך של יותר מ15 תווים.");
}
function overMinimum(input, minimum, errorDiv, errorMessage) {
    if (input.length < minimum) {
        errorDiv.innerHTML += errorMessage + "<br />";
        return false;
    }
    return true;
}
function underMaximum(input, maximum, errorDiv, errorMessage) {
    if (input.length > maximum) {
        errorDiv.innerHTML += errorMessage + "<br />";
        return false;
    }
    return true;
}
function firstCharIsAnEnlishLetter(input, errorDiv, errorMessage) {
    if (/[a-z]/i.test(input[0])) {
        return true;
    }
    errorDiv.innerHTML += errorMessage + "<br />";
    return false;
}
function onlyLeagalCharactersAndEnglish(input, allowedCharcters, errorDiv, errorMessage) {
    var found;
    for (var i = 0; i < input.length; i++) {
        if (!/[a-z]|[0-9]/i.test(input[i])) {
            found = false;
            for (var j = 0; j < allowedCharcters.length; j++) {
                if (input[i] == allowedCharcters[j]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                errorDiv.innerHTML += errorMessage + "<br />";
                return false;
            }
        }
    }
    return true;
}
function atLeastOneUpperCase(input, errorDiv, errorMessage) {
    if (input.toLowerCase() === input) {
        errorDiv.innerHTML += errorMessage + "<br />";
        return false;
    }
    return true;
}
function atLeastOneLowerCase(input, errorDiv, errorMessage) {
    if (input.toUpperCase() === input) {
        errorDiv.innerHTML += errorMessage + "<br />";
        return false;
    }
    return true;
}
function atLeastOneNumber(input, errorDiv, errorMessage) {
    if (!/\d/.test(input)) {
        errorDiv.innerHTML += errorMessage + "<br />";
        return false;
    }
    return true;
}
function atLeastOneSpecialCharacter(input, specialCharacters, errorDiv, errorMessage) {
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < specialCharacters.length; j++) {
            if (input[i] === specialCharacters[j]) {
                return true;
            }
        }
    }
    errorDiv.innerHTML += errorMessage + "<br />";
    return false;
}
function onlyEnglishOrOnlyHebrew(input, errorDiv, errorMessage) {
    if (/[a-z]/i.test(input) && /[א-ת]/.test(input)) {
        errorDiv.innerHTML += errorMessage + "<br />";
        return false;
    }
    return true;
}
function noWhitespace(input, errorDiv, errorMessage) {
    if (/\s/.test(input)) {
        errorDiv.innerHTML += errorMessage + "<br />";
        return false;
    }
    return true;
}
function setLenght(input, length, errorDiv, errorMessage) {
    if (input.length !== length) {
        errorDiv.innerHTML += errorMessage + "<br />";
        return false;
    }
    return true;
}
function onlyNumbers(input, errorDiv, errorMessage) {
    if (!/^\d+$/.test(input)) {
        errorDiv.innerHTML += errorMessage + "<br />";
        return false;
    }
    return true;
}
//# sourceMappingURL=Validate.js.map