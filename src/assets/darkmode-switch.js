var darkModeEnabled = false;

function isDarkModeSupported() {
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        return true;
    }

    return false;
}

function onDarkModeSelected() {
    document.body.classList.add('native');
    document.querySelectorAll('.darkmode-switch-icon').forEach(icon => {
        icon.style.filter = 'invert(100%)';
    });
}

function onLightModeSelected() {
    document.body.classList.remove('native');
    document.querySelectorAll('.darkmode-switch-icon').forEach(icon => {
        icon.style.filter = '';
    });
}

var checkbox = document.getElementById('darkmode-switch');

let animateCssTransition = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition');
    }, 1000);
};

checkbox.addEventListener('click', function(event) {
    if (!isDarkModeSupported()) {
        alert('Sorry! Darkmode is not supported with this browser.');
        event.preventDefault();
        return;
    }
});

checkbox.addEventListener('change', function() {
    if (this.checked) {
        darkModeEnabled = true;
        animateCssTransition();
        onDarkModeSelected();
        document.querySelector("link[href='styles.css']").href =
            'styles-darkmode.css';
    } else {
        darkModeEnabled = false;
        animateCssTransition();
        onLightModeSelected();
        document.querySelector("link[href='styles-darkmode.css']").href =
            'styles.css';
    }
});

var dmButton = document.querySelector('button.darkmode-button');

dmButton.addEventListener('keydown', function(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
        checkbox.click();
    }
});

var mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
mediaQueryList.addEventListener('change', () => {
    var darkModeEndabledByOS = window.matchMedia('(prefers-color-scheme: dark)')
        .matches;
    var labelEl = document.getElementById('switch-label');

    // disable manual swith if dark mode is enabled OS-wide
    checkbox.checked = darkModeEndabledByOS;
    darkModeEndabledByOS
        ? labelEl.classList.add('inputDisabled')
        : labelEl.classList.remove('inputDisabled');
    darkModeEndabledByOS
        ? (checkbox.disabled = true)
        : (checkbox.disabled = false);
    darkModeEndabledByOS ? onDarkModeSelected() : onLightModeSelected();
});
