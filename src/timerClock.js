class DashedCircle {
  constructor({
    ctx,
    centerX,
    centerY,
    radius,
    color,
    dashSize,
    dashCount,
    dashWidth,
  }) {
    this.ctx = ctx;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.color = color;
    this.dashSize = dashSize;
    this.dashCount = dashCount;
    this.dashWidth = dashWidth;
  }

  CalculateCirclePoints(onFilter = null) {
    let n = this.dashCount * 2;
    let alpha = (Math.PI * 2) / n;
    let points = [];
    let i = 0;

    while (i < n) {
      let theta = alpha * i;
      let theta2 = alpha * (i + 1);
      const data = onFilter
        ? onFilter({
            theta,
            theta2,
            alpha,
            n,
            points,
            index: i,
            radius: this.radius,
            centerX: this.centerX,
            centerY: this.centerY,
            dashSize: this.dashSize,
          })
        : {
            x: Math.cos(theta) * this.radius + this.centerX,
            y: Math.sin(theta) * this.radius + this.centerY,
            ex: Math.cos(theta2) * this.radius + this.centerX,
            ey: Math.sin(theta2) * this.radius + this.centerY,
          };
      data && points.push(data);
      i += 2;
    }

    return points;
  }

  Draw(points) {
    points = points ?? this.CalculateCirclePoints();
    this.ctx.strokeStyle = this.color;
    const previousLineWidth = this.ctx.lineWidth;
    this.ctx.lineWidth = this.dashWidth;
    for (let p = 0; p < points.length; p++) {
      this.ctx.beginPath();
      this.ctx.moveTo(points[p].x, points[p].y);
      this.ctx.lineTo(points[p].ex, points[p].ey);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    this.ctx.lineWidth = previousLineWidth;
  }
}

class TimeirClock {
  constructor({ element, time }) {
    this.canvas = element;
    this.userTime = !time ? new Date() : new Date(time);
    this.init();
  }
  init() {
    console.log(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.startShowClock();
    // this.drawClock();
  }
  startShowClock() {
    this.showClock();
  }
  showClock() {
    this.drawClock();

    return (this.showClockTimer = setTimeout(this.showClock.bind(this), 1000));
  }
  createCircleDashed(
    {
      x,
      y,
      radius,
      dashCount,
      dashSize,
      dashWidth,
      color = "rgb(0,0,0)",
      ctx = this.ctx,
    },
    returnPoints = false
  ) {
    const circle = new DashedCircle({
      ctx,
      centerX: x,
      centerY: y,
      radius,
      color,
      dashSize,
      dashCount,
      dashWidth,
    });
    const reCalcObj = {
      reCalc(step) {
        const theta = this.alpha * (step * 2);
        this.cos = Math.cos(theta);
        this.sin = Math.sin(theta);
        this.x = this.cos * this.radius + this.centerX;
        this.y = this.sin * this.radius + this.centerY;
        this.ex = this.cos * (this.radius - this.dashSize) + this.centerX;
        this.ey = this.sin * (this.radius - this.dashSize) + this.centerY;
      },
    };
    const onFilter = ({ theta, radius, centerX, centerY, dashSize, alpha }) => {
      let cos = Math.cos(theta);
      let sin = Math.sin(theta);
      const infoOBj = Object.create(reCalcObj);
      Object.assign(infoOBj, {
        dashSize,
        alpha,
        centerX,
        centerY,
        radius,
        cos,
        sin,
        x: cos * radius + centerX,
        y: sin * radius + centerY,
        ex: cos * (radius - dashSize) + centerX,
        ey: sin * (radius - dashSize) + centerY,
      });

      return infoOBj;
    };

    // get points and draw
    const pointes = circle.CalculateCirclePoints(onFilter);
    if (returnPoints) return pointes;
    circle.Draw(pointes);
  }
  createClockBoarder({
    clockBoarderCircleX,
    clockBoarderCircleY,
    clockBoarderCircleRadius,
    ctx,
  }) {
    // create main Clock Boarder
    ctx.beginPath();
    ctx.arc(
      clockBoarderCircleX,
      clockBoarderCircleY,
      clockBoarderCircleRadius,
      0,
      2 * Math.PI
    );
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
  }
  createCentralDot({ clockBoarderCircleX, clockBoarderCircleY, ctx }) {
    // show center
    ctx.beginPath();
    ctx.arc(clockBoarderCircleX, clockBoarderCircleY, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
  createDashMarker({
    clockBoarderCircleX,
    clockBoarderCircleY,
    clockBoarderMiniRadius,
    ctx,
  }) {
    //  1 min dashed
    this.createCircleDashed({
      x: clockBoarderCircleX,
      y: clockBoarderCircleY,
      radius: clockBoarderMiniRadius,
      dashCount: 60,
      dashSize: 1,
      dashWidth: 1,
      color: "rgba(0,0,0,.3)",
      ctx,
    });

    //  5 mins dashed
    this.createCircleDashed({
      x: clockBoarderCircleX,
      y: clockBoarderCircleY,
      radius: clockBoarderMiniRadius,
      dashCount: 12,
      dashSize: 5,
      dashWidth: 1,
      ctx,
    });
  }
  putHourTextNumber(info) {
    const fontSize = 15;
    const {
      clockBoarderCircleX: x,
      clockBoarderCircleY: y,
      clockBoarderMiniRadius: radius,
      dashCount = 12,
      dashSize = 8,
      dashWidth = 5,
      color = "rgb(0,0,0)",
      ctx = this.ctx,
      space,
    } = info;
    const circle = new DashedCircle({
      ctx,
      centerX: x,
      centerY: y,
      radius: radius + fontSize,
      color,
      dashSize,
      dashCount,
      dashWidth,
    });

    const previousFontSize = ctx.font;
    ctx.font = `${fontSize}px sans-serif`;
    const onFilter = ({ theta, radius, centerX, centerY, index }) => {
      const cos = Math.cos(theta);
      const sin = Math.sin(theta);
      const txt = String(~~(index / 2) + 1);
      const textSize = ctx.measureText(txt).width;

      return {
        cos,
        sin,
        x: cos * radius + centerX,
        y: sin * radius + centerY,
        ex: cos * (radius + space) + centerX - textSize / 2,
        ey: sin * (radius + space / 2) + centerY + textSize / 2,
      };
    };
    const points = circle.CalculateCirclePoints(onFilter);
    const part1 = points.splice(points.length - 2, 3);
    points.unshift(...part1);

    for (let point = 0; point < points.length; point++) {
      const { ex, ey } = points[point];
      ctx.fillText(point + 1, ex + 0, ey);
    }
    ctx.font = previousFontSize;
  }
  createTimePointer({
    date,
    clockBoarderCircleX,
    clockBoarderCircleY,
    clockBoarderMiniRadius,
    ctx,
    color = "black",
    width = 5,
    pointStep = 30.5,
    stayBack = 0,
    handsOff = 10,
    name,
  }) {
    ctx.beginPath();
    const previousColor = ctx.strokeStyle;
    const previousWidth = ctx.lineWidth;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";

    const dashCount = 60;
    //  1 min dashed
    const points = this.createCircleDashed(
      {
        x: clockBoarderCircleX,
        y: clockBoarderCircleY,
        radius: clockBoarderMiniRadius,
        dashCount,
        dashSize: 1,
        dashWidth: 1,
        color: "rgba(0,0,0,.3)",
        ctx,
      },
      true
    );

    const part1 = points.splice(
      points.length - ~~(points.length / 4),
      points.length
    );
    points.unshift(...part1);
    let currentPoint = points[~~pointStep];
    if (name != "sec") currentPoint.reCalc(pointStep - ~~(points.length / 4));

    const { x, y, cos, sin } = currentPoint;
    const moveX = clockBoarderCircleX - cos * stayBack;
    const moveY = clockBoarderCircleY - sin * stayBack;
    this.ctx.moveTo(moveX, moveY);

    let lineX = x - cos * handsOff;
    let lineY = y - sin * handsOff;

    this.ctx.lineTo(lineX, lineY);

    ctx.stroke();
    ctx.closePath();
    ctx.lineCap = "butt";
    ctx.lineWidth = previousWidth;
    ctx.strokeStyle = previousColor;
  }
  createTimePointers(args) {
    const { date } = args;
    // convert sec and min and hour to number between 0,59
    const sec = date.getSeconds();
    const min = date.getMinutes() + sec / 60;
    const hour = ((date.getHours() % 12) + min / 60) * 5;

    //
    this.createTimePointer({
      ...args,
      width: 2,
      color: "red",
      pointStep: sec,
      stayBack: 10,
      name: "sec",
    });
    this.createTimePointer({
      ...args,
      width: 3,
      color: "black",
      pointStep: min,
      handsOff: 8,
      name: "min",
    });
    this.createTimePointer({
      ...args,
      width: 5,
      color: "black",
      pointStep: hour,
      handsOff: 20,
      name: "hour",
    });
  }

  drawClock(date = new Date()) {
    const ctx = this.ctx;

    // clear the canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const space = 10;
    const clockBoarderCircleX = this.canvas.offsetWidth / 2;
    const clockBoarderCircleY = this.canvas.offsetHeight / 2;
    const clockBoarderCircleRadius = this.canvas.offsetHeight / 2 - space;
    const clockBoarderMiniRadius = clockBoarderCircleRadius / 1.5;

    const info = {
      clockBoarderCircleX,
      clockBoarderCircleY,
      clockBoarderCircleRadius,
      space,
      clockBoarderMiniRadius,
      ctx,
      date,
    };

    this.createClockBoarder(info);

    this.createDashMarker(info);

    // create hours text
    this.putHourTextNumber({ ...info, space: 2 });

    // create TimePointers
    this.createCentralDot(info);
    this.createTimePointers(info);
  }
}
// export default TimeirClock;
