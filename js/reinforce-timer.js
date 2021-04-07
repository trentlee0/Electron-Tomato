const Timer = require('timer.js');

class ReinforceTimer {
    name;
    timer;
    isPausedToContinued;
    oncontinue;

    constructor({name = "timer", tick = 1, onstart = null, ontick = null, onpause = null, oncontinue = null, onstop = null, onend = null}) {
        this.isPausedToContinued = false;
        this.name = name;
        this.oncontinue = oncontinue;
        this.timer = new Timer({
            tick: tick,
            onstart: onstart,
            ontick: (ms) => {
                if (ontick) {
                    ontick(Math.round(ms / 1000));
                }
            },
            onpause: onpause,
            onstop: onstop,
            onend: onend
        });
    }

    start(second) {
        if (second)
            this.timer.start(second);
        else
            this.timer.start();
        return this;
    }

    stop() {
        this.timer.stop();
        return this;
    }

    off(option) {
        if (option)
            this.timer.off(option);
        else
            this.timer.off();
        return this;
    }

    pause() {
        this.timer.pause();
        return this;
    }

    continue() {
        this.isPausedToContinued = true;
        this.timer.start();
        if (this.oncontinue) this.oncontinue();
        return this;
    }

    getName() {
        return this.name;
    }

    getDuration() {
        return Math.round(this.timer.getDuration() / 1000);
    }

    /**
     * initialized: 初始化未开始
     * started: 开始计时未暂停
     * paused:  暂停
     * continued: 由暂停转继续
     * stopped: 结束
     * @return {string}
     */
    getStatus() {
        if (this.isPausedToContinued && this.timer.getStatus() !== 'paused' && this.timer.getStatus() !== 'stopped') {
            return "continued";
        }
        return this.timer.getStatus();
    }

    on(event, listener) {
        this.timer.on(event, listener);
    }

    static formatTime(second) {
        let ss = Math.floor(second % 60);
        let mm = Math.floor(second / 60);
        let hh = Math.floor(second / 3600);
        return ((hh === 0) ? "" :
            hh.toString().padStart(2, '0') + ":")
            + (mm.toString().padStart(2, '0') + ":")
            + (ss.toString().padStart(2, '0'));
    }
}

module.exports = ReinforceTimer;