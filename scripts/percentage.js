document.getElementById('calculate').addEventListener('click', function() {
    const number = parseFloat(document.getElementById('number').value);
    const percent = parseFloat(document.getElementById('percent').value);

    if (isNaN(number) || isNaN(percent)) {
        document.getElementById('result').textContent = "Veuillez entrer des nombres valides.";
        return;
    }

    const result = (number * percent) / 100;
    document.getElementById('result').textContent = `Résultat : ${result}`;
});