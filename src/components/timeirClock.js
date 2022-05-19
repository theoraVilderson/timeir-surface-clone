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
  constructor({
    element,
    time,
    onTick = function () {},
    onTock = function () {},
  }) {
    this.canvas = element;
    this.userTime = !time ? null : new Date(time);
    this.startPointDate = new Date();
    this.onTick = onTick;
    this.onTock = onTock;
    this.init();
  }
  init() {
    const canvasWidth =
      +this.canvas.offsetWidth ||
      +this.canvas.width ||
      +this.canvas.clientWidth;
    const canvasHeight =
      +this.canvas.offsetHeight ||
      +this.canvas.Height ||
      +this.canvas.clientHeight;
    if (!canvasWidth || !canvasHeight) {
      this.canvas.width = 200;
      this.canvas.height = 200;
      this.height = 200;
      this.width = 200;
    } else {
      this.height = canvasHeight;
      this.width = canvasWidth;
    }

    this.surfaceSize = this.width + this.height;
    this.idealFontSize = 15;
    this.fontSize = this.sizeWithMin(this.surfaceSize / 30, 7);
    this.space = this.surfaceSize / 40;
    this.clockBorderCircleX = this.width / 2;
    this.clockBorderCircleY = this.height / 2;
    this.clockBorderCircleRadius = this.height / 2 - this.space;
    this.clockBorderMiniRadius = this.clockBorderCircleRadius / 1.5;

    this.secondPointerSize = this.sizeWithMin(this.surfaceSize / 150, 0.2);
    this.minutePointerSize = this.sizeWithMin(this.surfaceSize / 90, 0.3);
    this.hourPointerSize = this.sizeWithMin(this.surfaceSize / 60, 0.5);

    this.secondPointerStayBack = this.surfaceSize / 40;
    this.secondPointerHandsOff = this.surfaceSize / 40;
    this.minutePointerHandsOff = this.surfaceSize / 25;
    this.hourPointerHandsOff = this.surfaceSize / 20;

    this.clockBorderSize = this.sizeWithMin(this.surfaceSize / 80, 1);
    this.markerDashedWidth = this.sizeWithMin(this.surfaceSize / 400, 1);
    this.markerMinuteDashedSize = this.sizeWithMin(this.surfaceSize / 400, 1);
    this.markerHourDashedSize = this.sizeWithMin(this.surfaceSize / 80, 2);

    this.ctx = this.canvas.getContext("2d");
    this.pauseClock = false;
    this.title = "Theora Vilderson";

    this.pointStepLen = 60;
    this.secondDashCount = 60;
    this.minuteDashCount = 60;
    this.hourDashCount = 12;
    this.centralDotSize = this.sizeWithMin(this.surfaceSize / 80, 2);
    this.textHourSpace =
      (this.clockBorderCircleRadius -
        this.clockBorderMiniRadius -
        this.space * 2) /
      2;
    this.mainBorderColor = "grey";
    this.mainBorderCoverColor = "white";
    this.centralDotColor = "grey";
    this.secondPointerColor = "red";
    this.minutePointerColor = "black";
    this.hourPointerColor = "black";
    this.minDashColor = "rgb(0,0,0)";
    this.hourDashColor = "rgb(0,0,0)";
    this.hourTextColor = "rgb(0,0,0)";
    this.titleColor = "rgb(0,0,0)";
    this.id = this.randStr(9);

    // this.startClock();
    // this.drawClock();
  }
  sizeWithMin(size, min = 0) {
    return size < min ? min : size;
  }
  randStr(len = 9) {
    return [..."aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ1234567890"]
      .sort((e) => Math.random() - 0.5)
      .join("")
      .slice(0, len);
  }
  startClock() {
    this.pauseClock = false;
    this.signToWork();
    this.showClock();
  }
  signToWork() {
    this.canvas.setAttribute("data-timerclock", this.id);
  }
  stopClock() {
    this.pauseClock = true;
  }
  showClock() {
    this.drawClock();
    if (this.pauseClock)
      return (this.showClockTimer = +!!clearTimeout(this.showClockTimer));
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
    const onFilter = ({
      theta,
      radius,
      centerX,
      centerY,
      dashSize,
      alpha,
      index,
    }) => {
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
        index: ~~(index / 2),
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
  createClockBorder({
    clockBorderCircleX,
    clockBorderCircleY,
    clockBorderCircleRadius,
    ctx,
  }) {
    // create main Clock Border
    ctx.beginPath();
    ctx.arc(
      clockBorderCircleX,
      clockBorderCircleY,
      clockBorderCircleRadius,
      0,
      2 * Math.PI
    );
    const previousColor = ctx.strokeStyle;
    ctx.strokeStyle = this.mainBorderColor;
    ctx.lineWidth = this.clockBorderSize;
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = previousColor;
  }
  createClockBorderCover({
    clockBorderCircleX,
    clockBorderCircleY,
    clockBorderCircleRadius,
    ctx,
  }) {
    // create main Clock Border
    ctx.beginPath();
    ctx.arc(
      clockBorderCircleX,
      clockBorderCircleY,
      clockBorderCircleRadius,
      0,
      2 * Math.PI
    );
    const previousColor = ctx.strokeStyle;
    ctx.fillStyle = this.mainBorderCoverColor;
    ctx.lineWidth = 5;
    ctx.fill();
    ctx.closePath();
    ctx.strokeStyle = previousColor;
  }
  createCentralDot({ clockBorderCircleX, clockBorderCircleY, ctx }) {
    // show center
    ctx.beginPath();
    const previousColor = ctx.fillStyle;
    ctx.fillStyle = this.centralDotColor;
    ctx.arc(
      clockBorderCircleX,
      clockBorderCircleY,
      this.centralDotSize,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = previousColor;
  }
  createDashMarker({
    clockBorderCircleX,
    clockBorderCircleY,
    clockBorderMiniRadius,
    ctx,
  }) {
    //  minutes
    this.createCircleDashed({
      x: clockBorderCircleX,
      y: clockBorderCircleY,
      radius: clockBorderMiniRadius,
      dashCount: this.minuteDashCount,
      dashSize: this.markerMinuteDashedSize,
      dashWidth: this.markerDashedWidth,
      color: this.minDashColor,
      ctx,
    });

    //  hours

    this.createCircleDashed({
      x: clockBorderCircleX,
      y: clockBorderCircleY,
      radius: clockBorderMiniRadius,
      dashCount: this.hourDashCount,
      dashSize: this.markerHourDashedSize,
      dashWidth: this.markerDashedWidth,
      color: this.hourDashColor,
      ctx,
    });
  }
  // putHourTextNumber(info) {
  //   const fontSize = this.fontSize;
  //   const {
  //     clockBorderCircleX: x,
  //     clockBorderCircleY: y,
  //     clockBorderMiniRadius: radius,
  //     dashCount = 12,
  //     dashSize = 8,
  //     dashWidth = 5,
  //     color = "rgb(0,0,0)",
  //     ctx = this.ctx,
  //     space,
  //   } = info;
  //   const circle = new DashedCircle({
  //     ctx,
  //     centerX: x,
  //     centerY: y,
  //     radius: radius + fontSize,
  //     color,
  //     dashSize,
  //     dashCount,
  //     dashWidth,
  //   });

  //   const previousColor = ctx.fillStyle;
  //   ctx.fillStyle = color;
  //   const previousFontSize = ctx.font;
  //   ctx.font = `${fontSize}px sans-serif`;
  //   const onFilter = ({ theta, radius, centerX, centerY, index }) => {
  //     const cos = Math.cos(theta);
  //     const sin = Math.sin(theta);
  //     const txt = String(~~(index / 2) + 1);
  //     const textSize = ctx.measureText(txt).width;

  //     return {
  //       cos,
  //       sin,
  //       x: cos * radius + centerX,
  //       y: sin * radius + centerY,
  //       ex: cos * (radius + space) + centerX - textSize / 2,
  //       ey: sin * (radius + space / 2) + centerY + textSize / 2,
  //     };
  //   };
  //   const points = circle.CalculateCirclePoints(onFilter);
  //   const part1 = points.splice(points.length - 2, 3);
  //   points.unshift(...part1);

  //   for (let point = 0; point < points.length; point++) {
  //     const { ex, ey } = points[point];
  //     ctx.fillText(point + 1, ex + 0, ey);
  //   }
  //   ctx.font = previousFontSize;
  //   ctx.fillStyle = previousColor;
  // }

  putHourTextNumber(info) {
    const fontSize = this.fontSize;
    const {
      clockBorderCircleX: x,
      clockBorderCircleY: y,
      clockBorderMiniRadius: radius,
      dashCount = 12,
      dashSize = 8,
      dashWidth = 5,
      color = "rgb(0,0,0)",
      ctx = this.ctx,
      space,
    } = info;

    const previousColor = ctx.fillStyle;
    ctx.fillStyle = color;
    const previousFontSize = ctx.font;
    ctx.font = `${fontSize}px monospace`;

    const points = this.createCircleDashed(
      {
        x,
        y,
        radius: radius + 10,
        dashCount,
        dashSize: 5,
        dashWidth: 1,
        color: this.hourDashColor,
        ctx,
      },
      true
    );

    const part1 = points.splice(points.length - 2, 3);
    points.unshift(...part1);

    for (let point = 0; point < points.length; point++) {
      let { x, y, cos, sin, radius, centerX, centerY, alpha, index } =
        points[point];
      const text = point + 1 + "";
      const textSize = ctx.measureText(text).width / 2;
      const multiNumberSize =
        (text.length - 1) * (fontSize / (text.length + 1));
      const theta = alpha * (index * 2);
      cos = Math.cos(theta);
      sin = Math.sin(theta);
      x = cos * (radius + space) + centerX - textSize;
      y = sin * (radius + space) + centerY + (textSize - multiNumberSize);
      ctx.fillText(text, x, y);
    }
    ctx.font = previousFontSize;
    ctx.fillStyle = previousColor;
  }
  createTimePointer({
    clockBorderCircleX,
    clockBorderCircleY,
    clockBorderMiniRadius,
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

    const dashCount = this.pointStepLen;
    //  1 min dashed
    const points = this.createCircleDashed(
      {
        x: clockBorderCircleX,
        y: clockBorderCircleY,
        radius: clockBorderMiniRadius,
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
    if (name !== "sec") currentPoint.reCalc(pointStep - ~~(points.length / 4));

    const { x, y, cos, sin } = currentPoint;
    const moveX = clockBorderCircleX - cos * stayBack;
    const moveY = clockBorderCircleY - sin * stayBack;
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

    //create second pointer
    this.createTimePointer({
      ...args,
      width: this.secondPointerSize,
      color: this.secondPointerColor,
      pointStep: sec,
      stayBack: this.secondPointerStayBack,
      handsOff: this.secondPointerHandsOff,
      name: "sec",
    });
    // create minute pointer
    this.createTimePointer({
      ...args,
      width: this.minutePointerSize,
      color: this.minutePointerColor,
      pointStep: min,
      handsOff: this.minutePointerHandsOff,
      name: "min",
    });
    // create hour pointer
    this.createTimePointer({
      ...args,
      width: this.hourPointerSize,
      color: this.hourPointerColor,
      pointStep: hour,
      handsOff: this.hourPointerHandsOff,
      name: "hour",
    });
  }
  putTitle({
    ctx,
    title,
    clockBorderCircleX,
    clockBorderCircleY,
    clockBorderMiniRadius,
    space,
  }) {
    const fontSize = this.fontSize / 2;
    const previousColor = ctx.fillStyle;
    ctx.fillStyle = this.titleColor;
    const previousFontSize = ctx.font;
    ctx.font = `${fontSize}px sans-serif`;
    const textSize = ctx.measureText(title).width / 2;
    ctx.fillText(
      title,
      clockBorderCircleX - textSize,
      clockBorderCircleY + clockBorderMiniRadius - (fontSize * 2 + space)
    );
    ctx.font = previousFontSize;
    ctx.fillStyle = previousColor;
  }

  drawClock(date = new Date()) {
    if (this.id !== this.canvas.getAttribute("data-timerclock"))
      return this.stopClock();
    const currentPointDate = new Date();
    const betweenPointTime = +currentPointDate - +this.startPointDate;

    date = this.userTime ? new Date(+this.userTime + betweenPointTime) : date;
    this.onTick(date);
    const ctx = this.ctx;

    // clear the canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const space = this.space;
    const clockBorderCircleX = this.clockBorderCircleX;
    const clockBorderCircleY = this.clockBorderCircleY;
    const clockBorderCircleRadius = this.clockBorderCircleRadius;
    const clockBorderMiniRadius = this.clockBorderMiniRadius;

    const info = {
      clockBorderCircleX,
      clockBorderCircleY,
      clockBorderCircleRadius,
      space,
      clockBorderMiniRadius,
      ctx,
      date,
    };
    this.createClockBorderCover(info);
    this.createClockBorder(info);

    this.createDashMarker(info);

    // create hours text
    this.putHourTextNumber({
      ...info,
      space: this.textHourSpace,
      color: this.hourTextColor,
    });

    this.putTitle({ ...info, title: this.title });

    this.createCentralDot(info);
    // create TimePointers
    this.createTimePointers(info);

    this.onTock(date);
  }
}
export default TimeirClock;
