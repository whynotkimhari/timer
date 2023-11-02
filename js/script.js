const app = {
    defaults: [
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
    specialColors: [
        '#f3ca20',
        '#e2d810',
        '#ef9d10f',
        '#f5f0e1',
        '#ffc13b',
        '#ecc19c',
        '#e5e5dc',
        '#fff1e1'
    ],
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

    // hslToRgb: (h, s, l) => {
    //     h = (h + 360) % 360;

    //     // Ensure saturation and lightness are within the range [0, 1]
    //     s = Math.min(1, Math.max(0, s));
    //     l = Math.min(1, Math.max(0, l));

    //     // Helper function to convert hue to RGB
    //     function hue2rgb(p, q, t) {
    //         if (t < 0) t += 1;
    //         if (t > 1) t -= 1;
    //         if (t < 1 / 6) return p + (q - p) * 6 * t;
    //         if (t < 1 / 2) return q;
    //         if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    //         return p;
    //     }

    //     let r, g, b;

    //     if (s === 0) {
    //         r = g = b = l;
    //     } else {
    //         const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    //         const p = 2 * l - q;
    //         r = hue2rgb(p, q, h / 360 + 1 / 3);
    //         g = hue2rgb(p, q, h / 360);
    //         b = hue2rgb(p, q, h / 360 - 1 / 3);
    //     }


    //     app.red = Math.round(r * 255),
    //     app.green = Math.round(g * 255),
    //     app.blue = Math.round(b * 255)
    // },

    setColorCode: () => {
        return Swal.fire({
            title: 'Background Color',
            html: '<input type="color" id="colorPicker">',
            showCancelButton: true,
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

            app.idTimeOut = setTimeout(() => {
                clearInterval(app.idInterval);
                app.notify();
            }, app.TOTAL_MIL);
        }
        else if(app.totalSeconds === 0) app.notify()
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
            text: 'How many hours do you want to study?',
            input: 'text',
            inputPlaceholder: 'please type in HH:MM:SS or default will be 2 hours',
            inputAttributes: {
                autocapitalize: 'off',
                autocomplete: 'off',
            },
        })
        .then(response => {
            const text = response.value;
            if (text) {
                const time = text.split(':');

                if (time.length === 1 && app.check(time[0])) {
                    app.hours = Number(time[0])
                    app.totalSeconds = app.hours * 3600 + app.minutes * 60 + app.seconds;
                    app.fixedValue = app.totalSeconds;
                    app.countdown()
                }

                else if (
                    time.length === 2 &&
                    app.check(time[0]) &&
                    app.check(time[1])
                ) {
                    app.hours = Number(time[0]),
                    app.minutes = Number(time[1]),
                    app.totalSeconds = app.hours * 3600 + app.minutes * 60 + app.seconds;
                    app.fixedValue = app.totalSeconds;
                    app.countdown()
                }

                else if (
                    time.length === 3 &&
                    app.check(time[0]) &&
                    app.check(time[1]) &&
                    app.check(time[2])
                ) {
                    app.hours = Number(time[0]),
                    app.minutes = Number(time[1]),
                    app.seconds = Number(time[2]),
                    app.totalSeconds = app.hours * 3600 + app.minutes * 60 + app.seconds;
                    app.fixedValue = app.totalSeconds;
                    app.countdown()
                }

                else location.reload();
            }

            else {
                app.totalSeconds = app.hours * 3600 + app.minutes * 60 + app.seconds;
                app.fixedValue = app.totalSeconds;
                app.countdown()
            }
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
        if(app.totalSeconds > 0 && app.totalSeconds < app.fixedValue) {
            if(!app.isPause) {
                clearInterval(app.idInterval);
                clearTimeout(app.idTimeOut);
            }
            else app.countdown()
    
            app.isPause = !app.isPause;
        }
    },

    check: str => {
        if (str.length <= 2 && Number(str) >= 0) return true;
        else return false;
    },

    run: async () => {
        app.setColorCode()
        .then(res => {
            app.colorCode = res.isConfirmed ? document.getElementById('colorPicker').value : app.defaults[Math.floor(Math.random() * app.defaults.length)]

            app.hexToRGB(app.colorCode)
            document.querySelectorAll('.container--children').forEach(el => {
                el.style.backgroundColor = `rgb(${app.red},${app.green},${app.blue})`
            })

            document.querySelector('body').style.backgroundColor = `rgba(${app.red},${app.green},${app.blue}, 0.95)`

            if (app.specialColors.indexOf(app.colorCode) !== -1) {
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