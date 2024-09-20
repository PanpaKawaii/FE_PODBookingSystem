document.getElementById('signup').addEventListener('click', function() {
    const img = document.getElementById('movingImg');
    img.classList.remove("img-left") //Add if unavailable, remove if available
    img.classList.add("img-right") //Add if unavailable, remove if available
    img.style.marginRight = '50%';
    document.querySelector('body').style.backgroundColor = '#b4b7fa';
});

document.getElementById('login').addEventListener('click', function() {
    const img = document.getElementById('movingImg');
    img.classList.remove("img-right") //Add if unavailable, remove if available
    img.classList.add("img-left") //Add if unavailable, remove if available
    img.style.marginRight = '0%';
    document.querySelector('body').style.backgroundColor = '#ffffb0';
});

function resetInputsBox1() {
    var inputs = document.querySelectorAll('.form-box1 input');
    inputs.forEach(function(input) {
        input.value = '';
    });
}

function resetInputsBox2() {
    var inputs = document.querySelectorAll('.form-box2 input');
    inputs.forEach(function(input) {
        input.value = '';
    });
}