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
    options = {},
  }) {
    this.canvas = element;
    this.userTime = !time ? null : new Date(time);
    this.startPointDate = new Date();
    this.onTick = onTick;
    this.onTock = onTock;
    this.userOption = options;
    this.init();
  }
  init() {
    this.options = {
      scaleWidth: 200,
      scaleHeight: 200,
      fontSize: 15,
      space: 10,
      secondPointerSize: 2,
      minutePointerSize: 5,
      hourPointerSize: 7,
      secondPointerStayBack: 10,
      secondPointerHandsOff: 10,
      minutePointerHandsOff: 20,
      hourPointerHandsOff: 26,
      clockBorderSize: 5,
      markerDashedWidth: 1,
      markerMinuteDashedSize: 1,
      markerHourDashedSize: 5,
      centralDotSize: 5,
      textHourSpace: 5,
      mainBorderColor: "grey",
      mainBorderCoverColor: "white",
      centralDotColor: "grey",
      secondPointerColor: "red",
      minutePointerColor: "black",
      hourPointerColor: "black",
      minDashColor: "rgb(0,0,0)",
      hourDashColor: "rgb(0,0,0)",
      hourTextColor: "rgb(0,0,0)",
      titleColor: "rgb(0,0,0)",
      title: "Theora Vilderson",
      titleFont: "sans-serif",
      hourFont: "monospace",
    };
    this.options.scaleSurface =
      this.options.scaleWidth + this.options.scaleHeight;

    this.options = Object.assign(this.options, this.userOption);
    const canvasWidth =
      this.userOption?.width ||
      +this.canvas.offsetWidth ||
      +this.canvas.width ||
      +this.canvas.clientWidth;
    const canvasHeight =
      this.userOption?.height ||
      +this.canvas.offsetHeight ||
      +this.canvas.Height ||
      +this.canvas.clientHeight;
    if (!canvasWidth || !canvasHeight) {
      this.width = this.canvas.width = this.options.scaleWidth;
      this.height = this.canvas.height = this.options.scaleHeight;
    } else {
      this.height = canvasHeight;
      this.width = canvasWidth;
    }
    // resize if the size isn't match with current size;
    if (this.width !== this.canvas.clientWidth) {
      this.canvas.width = this.width;
    }
    if (this.height !== this.canvas.clientHeight) {
      this.canvas.height = this.height;
    }

    // if the sizes ar not equal then use the minimal size
    if (~~this.height !== ~~this.width) {
      this.height = this.width = Math.min(this.height, this.width);
    }

    // sizes
    this.surfaceSize = this.width + this.height;
    this.scaleTo = this.scaleBase(this.options.scaleSurface, this.surfaceSize);

    this.fontSize = this.scaleTo(this.options.fontSize);
    this.space = this.scaleTo(this.options.space);
    this.clockBorderCircleX = this.width / 2;
    this.clockBorderCircleY = this.height / 2;
    this.clockBorderCircleRadius = this.height / 2 - this.space;
    this.clockBorderMiniRadius = this.clockBorderCircleRadius / 1.5;

    this.secondPointerSize = this.scaleTo(this.options.secondPointerSize);
    this.minutePointerSize = this.scaleTo(this.options.minutePointerSize);
    this.hourPointerSize = this.scaleTo(this.options.hourPointerSize);

    this.secondPointerStayBack = this.scaleTo(
      this.options.secondPointerStayBack
    );
    this.secondPointerHandsOff = this.scaleTo(
      this.options.secondPointerHandsOff
    );
    this.minutePointerHandsOff = this.scaleTo(
      this.options.minutePointerHandsOff
    );
    this.hourPointerHandsOff = this.scaleTo(this.options.hourPointerHandsOff);

    this.clockBorderSize = this.scaleTo(this.options.clockBorderSize);
    this.markerDashedWidth = this.scaleTo(this.options.markerDashedWidth);
    this.markerMinuteDashedSize = this.scaleTo(
      this.options.markerMinuteDashedSize
    );
    this.markerHourDashedSize = this.scaleTo(this.options.markerHourDashedSize);
    this.centralDotSize = this.scaleTo(this.options.centralDotSize);
    this.textHourSpace = this.scaleTo(this.options.textHourSpace);

    // colors
    this.mainBorderColor = this.options.mainBorderColor;
    this.mainBorderCoverColor = this.options.mainBorderCoverColor;
    this.centralDotColor = this.options.centralDotColor;
    this.secondPointerColor = this.options.secondPointerColor;
    this.minutePointerColor = this.options.minutePointerColor;
    this.hourPointerColor = this.options.hourPointerColor;
    this.minDashColor = this.options.minDashColor;
    this.hourDashColor = this.options.hourDashColor;
    this.hourTextColor = this.options.hourTextColor;
    this.titleColor = this.options.titleColor;

    // solid info
    this.ctx = this.canvas.getContext("2d");
    this.pauseClock = false;
    this.title = this.options.title;
    this.titleFont = this.options.titleFont;
    this.hourFont = this.options.hourFont;

    this.pointStepLen = 60;
    this.secondDashCount = 60;
    this.minuteDashCount = 60;
    this.hourDashCount = 12;

    this.id = this.randStr(9);
  }
  scaleBase(pervScale = 200, nowScale = 300) {
    return (size = 1) => {
      return (size * nowScale) / pervScale;
    };
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
    // create main Clock Border Cover
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

  putHourTextNumber(info) {
    const fontSize = this.fontSize;
    const {
      clockBorderCircleX: x,
      clockBorderCircleY: y,
      clockBorderMiniRadius: radius,
      dashCount = 12,
      color = "rgb(0,0,0)",
      ctx = this.ctx,
      space,
    } = info;

    const previousColor = ctx.fillStyle;
    ctx.fillStyle = color;
    const previousFontSize = ctx.font;
    ctx.font = `${fontSize}px ${this.hourFont}`;

    const points = this.createCircleDashed(
      {
        x,
        y,
        radius: radius + this.scaleTo(10),
        dashCount,
        dashSize: this.scaleTo(5),
        dashWidth: this.scaleTo(1),
        color: this.hourDashColor,
        ctx,
      },
      true // this true means that just return points not draw anything
    );
    // push 2 back because
    // circle to start from 12 then 1 then 2  and ...!
    const part1 = points.splice(points.length - 2, 3);
    points.unshift(...part1);

    for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
      // calcing the hour number position
      const thePoint = points[pointIndex];
      let { x, y, cos, sin, radius, centerX, centerY, alpha, index } = thePoint;
      const text = pointIndex + 1 + "";
      const textLen = text.length;
      const textSize = ctx.measureText(text).width / 2;
      const multiNumberSize = (textLen - 1) * (fontSize / (textLen + 1));
      const theta = alpha * (index * 2);
      cos = Math.cos(theta);
      sin = Math.sin(theta);
      x = cos * (radius + space) + centerX - textSize;
      y = sin * (radius + space) + centerY + (textSize - multiNumberSize);
      ctx.fillText(text, x, y);
    }
    // resetStyle
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
    // push quarter back because
    // the circle will start at quarter forward!

    let currentPoint = points[~~pointStep];
    // the second doesn't need the exact position !
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
    ctx.font = `${fontSize}px ${this.titleFont}`;
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
      // stop if an other constructor toke the control
      return this.stopClock();
    const currentPointDate = new Date();
    const betweenPointTime = +currentPointDate - +this.startPointDate;

    date = this.userTime ? new Date(+this.userTime + betweenPointTime) : date;
    // before any draw happen
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
    const hourTextInfo = {
      ...info,
      space: this.textHourSpace,
      color: this.hourTextColor,
    };
    const titleInfo = { ...info, title: this.title };
    this.createClockBorderCover(info);
    this.createClockBorder(info);

    this.createDashMarker(info);

    // create hours text
    this.putHourTextNumber(hourTextInfo);

    this.putTitle(titleInfo);

    this.createCentralDot(info);
    // create TimePointers
    this.createTimePointers(info);

    // after every thin is done
    this.onTock(date);
  }
}
export default TimeirClock;
