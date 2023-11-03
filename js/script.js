const create_options = (max) => {
    htmls = ""
    for (let i = 0; i <= max; i++) {
        htmls += `<option value="${i}">${i}</option>`
    }
    return htmls
}

const app = {
    DEFAULT_COLOR: [
        '#000000',
        '#ba9ee0',
        '#e52165',
        '#0d1137',
        '#d72631',
        '#a2d5c6',
        '#077b8a',
        '#5c3c92',
        '#e2d810',
        '#d9138a',
        '#12a4d9',
        '#322e2f',
        '#f3ca20',
        '#e75874',
        '#be1558',
        '#fbcbc9',
        '#322514',
        '#ef9d10f',
        '#3b4d61',
        '#6b7b8c',
        '#1e3d59',
        '#f5f0e1',
        '#ff6e40',
        '#ffc13b',
        '#ecc19c',
        '#1e847f',
        '#26495c',
        '#c4a35a',
        '#c66b3d',
        '#e5e5dc',
        '#d9a5b3',
        '#1868ae',
        '#c6d7eb',
        '#408ec6',
        '#7a2048',
        '#1e2761',
        '#8a307f',
        '#79a7d3',
        '#6883bc',
        '#1d3c45',
        '#d2601a',
        '#fff1e1',
        '#aed6dc',
        '#ff9a8d',
        '#4a536b',
        '#da68a0',
        '#77c593',
        '#ed3572',
        '#316879',
        '#f47a60',
        '#7fe7dc',
        '#ced7d8',
        '#d902ee',
        '#ffd79d',
        '#f162ff',
        '#320d3e',
        '#ffcce7',
        '#daf2dc',
        '#81b7d2',
        '#4d5198',
        '#ddc3a5',
        '#201e20',
        '#e0a96d',

        '#edca82',
        '#097770',
        '#e0cdbe',
        '#a9c0a6',

        '#e1dd72',
        '#a8c66c',
        '#1b6535',

        '#d13ca4',
        '#ffea04',
        '#fe3a9e',

        '#e3b448',
        '#cbd18f',
        '#3a6b35',

        '#f6ead4',
        '#a2a595',
        '#b4a284',

        '#79cbb8',
        '#500472',

        '#f5beb4',
        '#9bc472',
        '#cbf6db',

        '#b85042',
        '#e7e8d1',
        '#a7beae',

        '#d71b3b',
        '#e8d71e',
        '#16acea',
        '#4203c9',

        '#829079',
        '#ede6b9',
        '#b9925e',

        '#1fbfb8',
        '#05716c',
        '#1978a5',
        '#031163',

        '#7fc3c0',
        '#cfb845',
        '#141414',

        '#efb5a3',
        '#f57e7e',
        '#315f72',


    ],
    SPECIAL_COLOR: [
        '#f3ca20',
        '#e2d810',
        '#ef9d10f',
        '#f5f0e1',
        '#ffc13b',
        '#ecc19c',
        '#e5e5dc',
        '#fff1e1'
    ],

    HTML_OPTIONS: `
        <div id="html-options">
            <div class="row">
                <select id="select-hour">
                    ${create_options(99)}
                </select>
            </div>
            <div class="row">
                <select id="select-minute">
                    ${create_options(59)}
                </select>
            </div>
            <div class="row">
                <select id="select-second">
                    ${create_options(59)}
                </select>
            </div>
        </div>
    `,

    colorCode: '',
    red: 0,
    green: 0,
    blue: 0,
    isPause: false,
    audio: new Audio('wav/clock-tick.wav'),
    finish: new Audio('wav/finish.mp3'),

    fixedValue: 0,
    totalSeconds: 0,
    hours: 2,
    minutes: 0,
    seconds: 0,
    TOTAL_MIL: 0,

    idInterval: null,
    idTimeOut: null,

    hexToRGB: (colorCode) => {
        app.red = parseInt(colorCode.substring(1, 3), 16)
        app.green = parseInt(colorCode.substring(3, 5), 16)
        app.blue = parseInt(colorCode.substring(5, 7), 16)
    },

    setColorCode: () => {
        return Swal.fire({
            title: 'Background Color',
            html: '<input type="color" id="colorPicker">',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonText: 'Take this',
            cancelButtonText: 'Random color',
        })
    },

    formatNumber: number => {
        if (number < 10) return '0' + number;
        return number;
    },

    countdown: () => {
        if (app.totalSeconds > 0) {
            app.totalSeconds = app.hours * 3600 + app.minutes * 60 + app.seconds;
            app.TOTAL_MIL = app.totalSeconds * 1000;

            app.idInterval = setInterval(() => {
                app.audio.play();
                app.totalSeconds--;
                app.hours = Math.floor(app.totalSeconds / 3600);
                app.minutes = Math.floor((app.totalSeconds - app.hours * 3600) / 60);
                app.seconds = (app.totalSeconds - app.hours * 3600 - app.minutes * 60);

                document.querySelector('#hour').innerHTML = app.formatNumber(app.hours)
                document.querySelector('#minute').innerHTML = app.formatNumber(app.minutes)
                document.querySelector('#second').innerHTML = app.formatNumber(app.seconds)
            }, 1000);

            document.querySelector('body').addEventListener('click', app.changeState);
            // document.addEventListener("keydown", (e) => {
            //     if (e.key === " ") app.changeState();
            // })

            app.idTimeOut = setTimeout(() => {
                clearInterval(app.idInterval);
                app.notify();
            }, app.TOTAL_MIL);
        }
        else if (app.totalSeconds === 0) app.notify()
    },

    setTime: async () => {
        Swal.fire({
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            title: 'Study time',
            showCancelButton: true,
            allowOutsideClick: true,
            cancelButtonText: '2-hours study session',
            html: app.HTML_OPTIONS,
        })
        .then(response => {
            if (response.isConfirmed) {
                app.hours = Number(document.querySelector('#select-hour').value)
                app.minutes = Number(document.querySelector('#select-minute').value)
                app.seconds = Number(document.querySelector('#select-second').value)
            }

            else if (response.dismiss == Swal.DismissReason.backdrop) location.reload()

            app.totalSeconds = app.hours * 3600 + app.minutes * 60 + app.seconds;
            app.fixedValue = app.totalSeconds;
            app.countdown()
        })
    },

    notify: async () => {
        app.finish.play()
        Swal.fire({
            icon: 'success',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            title: 'Congratulations!!!',
            text: 'You have successfully completed your study time. Take some rest'
        })
    },

    changeState: () => {
        if (app.totalSeconds > 0 && app.totalSeconds < app.fixedValue) {
            if (!app.isPause) {
                clearInterval(app.idInterval);
                clearTimeout(app.idTimeOut);
            }
            else app.countdown()

            app.isPause = !app.isPause;
        }
    },

    run: async () => {
        app.setColorCode()
        .then(res => {
            if (res.isConfirmed) app.colorCode = document.getElementById('colorPicker').value
            else if (res.dismiss == Swal.DismissReason.backdrop) location.reload()
            else app.colorCode = app.DEFAULT_COLOR[Math.floor(Math.random() * app.DEFAULT_COLOR.length)]

            app.hexToRGB(app.colorCode)
            document.querySelectorAll('.container--children').forEach(el => {
                el.style.backgroundColor = `rgb(${app.red},${app.green},${app.blue})`
            })

            document.querySelector('body').style.backgroundColor = `rgba(${app.red},${app.green},${app.blue}, 0.95)`

            if (app.SPECIAL_COLOR.indexOf(app.colorCode) !== -1) {
                document.querySelector('.footer h4 a').style.color = '#000000'
                document.querySelectorAll('.container--children').forEach(el => {
                    el.style.color = '#000000'
                })
            }
        })
        .then(app.setTime)
    }
}

app.run()