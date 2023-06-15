import { useEffect, useRef, useState } from 'react';

import { COLOR } from '../../utils/style';

const Particles = () => {
    const canvas = useRef();

    const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

    const MAX_DOTS = 100;
    const LINK_RADIUS = 150;

    const utils = {
        random: {
            int: (min, max) => Math.floor(Math.random() * (max - min)) + min,
            float: (min, max) => Math.random() * (max - min) + min,
        },
    };

    let dots = {};

    const render = (ctx) => {
        requestAnimationFrame(() => render(ctx));

        const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);

        // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        //     gradient.addColorStop(0, '#0F2027');
        //     gradient.addColorStop(0.5, '#203A43');
        //     gradient.addColorStop(1, '#2C5364');
        // } else {
        //     gradient.addColorStop(0, '#E0EAFC');
        //     gradient.addColorStop(1, '#CFDEF3');
        // }

        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0, '#E0EAFC');
        gradient.addColorStop(1, '#CFDEF3');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let key in dots) {
            dots[key].update();
        }
    };

    useEffect(() => {
        const ctx = canvas.current.getContext('2d');

        const style = {
            fill: COLOR.blue[1],
            line: COLOR.blue[3],
        };

        const Dot = function (x, y, r, vx, vy) {
            this.x = x || 100;
            this.y = y || 75;
            this.r = r || 50;
            this.vx = vx || 1;
            this.vy = vy || 1;

            this.r2 = 0;

            const key = x + y + r + vx + vy;

            dots[key] = this;

            const draw = () => {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r2, 0, 2 * Math.PI);
                ctx.fillStyle = style.fill;
                ctx.fill();
                ctx.strokeStyle = style.line;
                ctx.stroke();
            };

            const isNear = (dot) => {
                const distance = Math.sqrt((this.x - dot.x) ** 2 + (this.y - dot.y) ** 2);
                if (distance < LINK_RADIUS) return true;
                return false;
            };

            const link = (dot) => {
                const distance = Math.sqrt((this.x - dot.x) ** 2 + (this.y - dot.y) ** 2);
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                const width = (LINK_RADIUS - distance) / LINK_RADIUS;
                ctx.lineWidth = width <= 0.02 ? 0.02 : width;
                ctx.strokeStyle = style.line;
                ctx.lineTo(dot.x, dot.y);
                ctx.stroke();
            };

            let isMax = false;
            let speed = 1;

            this.update = () => {
                for (let key in dots) {
                    if (isNear(dots[key])) link(dots[key]);
                }

                if (this.r2 < this.r * 2 && !isMax) {
                    this.r2 += 1;
                    speed -= speed > 0.05 ? 0.05 : 0;
                } else if (!isMax) {
                    isMax = true;
                    speed = 0.1;
                }

                if (isMax && this.r2 > this.r) {
                    this.r2 -= speed;
                    speed += 0.001;
                }

                this.x += this.vx;
                this.y += this.vy;

                if (
                    this.x > ctx.canvas.width + LINK_RADIUS ||
                    this.y > ctx.canvas.height + LINK_RADIUS ||
                    this.x < -LINK_RADIUS ||
                    this.y < -LINK_RADIUS
                ) {
                    delete dots[key];
                }

                if (Object.keys(dots).length < MAX_DOTS) {
                    generateDot();
                }

                draw();
            };
        };

        const newDot = (e) => {
            new Dot(
                e.clientX,
                e.clientY,
                utils.random.int(3, 4),
                utils.random.float(-1, 1),
                utils.random.float(-1, 1)
            );
        };

        /*
        const newSDot = (e) => {
            let vx = utils.random.float(-1, 1);
            let vy = utils.random.float(-1, 1);
            let r = utils.random.int(LINK_RADIUS / 2, LINK_RADIUS);

            new Dot(e.clientX, e.clientY, utils.random.int(3, 4), vx, vy);

            for (let i = 0; i < 360; i += 360 / 12) {
                let x = e.clientX + r * Math.cos(i);
                let y = e.clientY + r * Math.sin(i);
                new Dot(x, y, 0.1, vx, vy);
            }
        };

        window.addEventListener('dblclick', newSDot);
        */

        window.addEventListener('click', newDot);

        const generateDot = () => {
            return new Dot(
                utils.random.int(0, ctx.canvas.width),
                utils.random.int(0, ctx.canvas.height),
                utils.random.int(3, 4),
                utils.random.float(-0.5, 0.5),
                utils.random.float(-0.5, 0.5)
            );
        };

        generateDot();

        requestAnimationFrame(() => render(ctx));

        const handleChange = () => {
            setSize({
                w: window.innerWidth,
                h: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleChange);

        return () => {
            window.removeEventListener('resize', handleChange);
            window.removeEventListener('click', newDot);
            // window.removeEventListener('dblclick', newSDot);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <canvas width={size.w} height={size.h} ref={canvas}></canvas>;
};

export default Particles;
