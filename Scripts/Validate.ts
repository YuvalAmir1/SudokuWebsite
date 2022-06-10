function validateInfo(signUp) {
    let form = <HTMLFormElement>document.getElementById("form1");

    let username = (<HTMLInputElement>document.getElementById("username")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;

    let firstName, lastName, gender, email, phone, city;
    if (signUp) {
        firstName = (<HTMLInputElement>document.getElementById("firstName")).value;
        lastName = (<HTMLInputElement>document.getElementById("lastName")).value;
        phone = (<HTMLInputElement>document.getElementById("phone")).value;
        gender = (<HTMLInputElement>document.getElementById("gender")).value;
    }

    let errorDiv = document.getElementById("errorText")
    errorDiv.innerHTML = "";
    let output;
    let vUsername = validateUsername(username, errorDiv);
    let vPassword = validatePassword(password, errorDiv);
    output = vUsername && vPassword;

    if (signUp) {
        let vFirstName = validateFirstName(firstName, errorDiv);
        let vLastName = validateLastName(lastName, errorDiv);
        let vPhone = validatePhone(phone, errorDiv);
        output = output && vFirstName && vLastName && vPhone;
    }

    if (output) {
        form.submit();
        clearForm(signUp);
    }
}

function clearForm(signUp) {
    (<HTMLInputElement>document.getElementById("username")).value = "";
    (<HTMLInputElement>document.getElementById("password")).value = "";
    document.getElementById("errorText").innerHTML = "";

    if (signUp) {
        (<HTMLInputElement>document.getElementById("firstName")).value = "";
        (<HTMLInputElement>document.getElementById("lastName")).value = "";
        (<HTMLInputElement>document.getElementById("phone")).value = "";
        (<HTMLInputElement>document.getElementById("gender")).value = "other";
        (<HTMLInputElement>document.getElementById("email")).value = "";
        (<HTMLInputElement>document.getElementById("birthDate")).value = "";
        (<HTMLInputElement>document.getElementById("city")).value = "";
    }

}

function validateUsername(username, errorDiv) {
    let om = overMinimum(username, 3, errorDiv, "שם המשתמש צריך להיות בעורך של לפחות 3 תווים.");
    let um = underMaximum(username, 16, errorDiv, "שם המשתמש צריך להיות בעורך של פחות מ16 תווים");
    let fc = firstCharIsAnEnlishLetter(username, errorDiv, "שם המשתמש צריך להתחיל באות באנגלית.");
    let oe = onlyLeagalCharactersAndEnglish(username, [".", "_", "-", "*", "&", "!", "#"], errorDiv, "שם המשתמש מכיל תו לא תקין.");
    return om && um && fc && oe;
}

function validatePassword(password, errorDiv) {
    let om = overMinimum(password, 6, errorDiv, "הסיסמה צריכה להיות בעורך של לפחות 6 תווים.");
    let um = underMaximum(password, 31, errorDiv, "הסיסמה צריכה להיות בעורך של פחות מ31 תווים.");
    let oe = onlyLeagalCharactersAndEnglish(password, [".", "_", "-", "*", "&", "!", "#"], errorDiv, "הסיסמה מכילה תו לא תקין.");
    let ou = atLeastOneUpperCase(password, errorDiv, "הסיסמה צריכה להכיל אות גדולה.");
    let ol = atLeastOneLowerCase(password, errorDiv, "הסיסמה צריכה להכיל אות קטנה.");
    let os = atLeastOneSpecialCharacter(password, [".", "_", "-", "*", "&", "!", "#"], errorDiv, "הסיסמה צריכה להכיל סימן מיוחד.")
    return om && um && oe && ou && ol;
}

function validateFirstName(firstName, errorDiv) {
    let um = underMaximum(firstName, 16, errorDiv, "שם פרטי צריך להיות בעורך של פחות מ16 תווים.");
    let om = overMinimum(firstName, 1, errorDiv, "שם פרטי צריך להיות בעורך של לפחות שתי תווים.");
    let eoh = onlyEnglishOrOnlyHebrew(firstName, errorDiv, "שם פרטי לא יכול להכיל גם אנגלית וגם עברית.");
    let nw = noWhitespace(firstName, errorDiv, "שם פרטי לא יכול להכיל רוחים.");
    return um && om && eoh && nw;
}

function validateLastName(lastName, errorDiv) {
    let um = underMaximum(lastName, 16, errorDiv, "שם משפחה צריך להיות בעורך של פחות מ16 תווים.");
    let om = overMinimum(lastName, 1, errorDiv, "שם משפחה צריך להיות בעורך של לפחות שתי תווים.");
    let eow = onlyEnglishOrOnlyHebrew(lastName, errorDiv, "שם משפחה לא יכול להכיל גם אנגלית וגם עברית.");
    return um && om && eow;
}

function validatePhone(phone, errorDiv) {
    if (phone) /* check if number was inputed */ {
        let sl = setLenght(phone, 8, errorDiv, "מספר טלפון בעורך לא תקין.");
        let on = onlyNumbers(phone, errorDiv, "טלפון צריך להכיל רק מספרים.");
        return sl && on;
    }
    return true;
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
        return true
    }
    errorDiv.innerHTML += errorMessage + "<br />";
    return false;
}

function onlyLeagalCharactersAndEnglish(input, allowedCharcters, errorDiv, errorMessage) {
    let found;

    for (let i = 0; i < input.length; i++) {
        if (!/[a-z]|[0-9]/i.test(input[i])) {
            found = false;
            for (let j = 0; j < allowedCharcters.length; j++) {
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
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < specialCharacters.length; j++) {
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