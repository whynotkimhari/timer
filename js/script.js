const app = {
    isFinished: false,
    audio: new Audio('../wav/clock-tick.wav'),

    formatNumber: (number) => {
        if (number < 10) return '0' + number;
        else return number;
    },

    countdown: (hours = 0, minutes = 0, seconds = 0) => {
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
        console.log(totalSeconds)
        const TOTAL_MIL = totalSeconds * 1000;

        const id = setInterval(() => {
            hours = Math.floor(totalSeconds / 3600);
            minutes = Math.floor((totalSeconds - hours * 3600) / 60);
            seconds = (totalSeconds - hours * 3600 - minutes * 60);
            totalSeconds--;

            document.querySelector('#hour').innerHTML = app.formatNumber(hours)
            document.querySelector('#minute').innerHTML = app.formatNumber(minutes)
            document.querySelector('#second').innerHTML = app.formatNumber(seconds)

            app.audio.play();
        }, 1000);

        setTimeout(() => {
            clearInterval(id);
            app.notify();
        }, TOTAL_MIL + 1000);


    },

    run: async () => {
        Swal.fire({
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            title: 'Type the time',
            text: 'How many hours do you want to study?',
            input: 'text',
            inputPlaceholder: 'please type in the form of HH/MM/SS',
            inputAttributes: {
                autocapitalize: 'off',
                autocomplete: 'off',
            },
        })
            .then(response => {
                const text = response.value;
                if (text) {
                    const time = text.split('/');

                    console.log(time)

                    if (time.length === 1 && app.check(time[0])) app.countdown(Number(time[0]))

                    else if (
                        time.length === 2 && 
                        app.check(time[0]) && 
                        app.check(time[1])
                    ) app.countdown(Number(time[0]), Number(time[1]))

                    else if (
                        time.length === 3 && 
                        app.check(time[0]) && 
                        app.check(time[1]) && 
                        app.check(time[2])
                    ) app.countdown(Number(time[0]), Number(time[1]), Number(time[2]))

                    else location.reload();
                }

                else location.reload();
            })
    },

    notify: async () => {
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

    check: (str) => {
        if (str.length <= 2 && Number(str) >= 0) return true;
        else return false;
    }
}

app.run();

