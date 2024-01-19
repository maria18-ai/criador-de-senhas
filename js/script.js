// seleção dos elementos 
const generatePasswordButton = document.querySelector("#generator-password");

const generatePasswordElement = document.querySelector("#generator-password-element");

// novas funcionalidades 
const openCloseGeneratorButton = document.querySelector("#open-generator-password");
const generatePasswordContainer = document.querySelector("#generator-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordBtn = document.querySelector("#copy-password");

// conta "logada"
const loginContainer = document.querySelector("#login-container");
const sendLogin = document.querySelector("#send");

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmpassword");


// funções 
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26)+ 97);
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
}

const getSymbol = () => {
    const symbols = "(){}[]=<>/.,!@#$%*&-+*";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {

    let password = "";

    // novas funções
    const passwordLength = +lengthInput.value;

    const generators = [];

    if(lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase)
    }

    if(numbersInput.checked) {
        generators.push(getNumber)
    }

    if(symbolsInput.checked) {
        generators.push(getSymbol)
    }

    console.log(generators.length)

    if(generators.length === 0) {
        return;
    }



    for(i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue = 
                generators[Math.floor(Math.random() * generators.length)]();

            password += randomValue
        });
    };

    password = password.slice(0, passwordLength);

    generatePasswordElement.style.display = "block"
    generatePasswordElement.querySelector("h4").innerText = password
};

// eventos
generatePasswordButton.addEventListener("click", () => {
    generatePassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    );
});

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide")
});

copyPasswordBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const password = generatePasswordElement.querySelector("h4").innerText

    navigator.clipboard.writeText(password).then(() => {

        copyPasswordBtn.innerText = "Copiado!"

        setTimeout(() => {
            copyPasswordBtn.innerText = "Copiar"
        }, 1000);

    });
});

sendLogin.addEventListener("click", (e) => {
    e.preventDefault();

    loginContainer.style.display = "flex"

    setTimeout(() => {
        loginContainer.style.display = "none"
    }, 2000);

    name.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
});