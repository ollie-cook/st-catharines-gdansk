'use client'

import { useRef, useEffect } from 'react'
import { type Lines } from '@/app/utils/types'

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const windowWidth = window.innerWidth;
  let canvasDimension;



  if (windowWidth < 640) {
    canvasDimension = 0.9*windowWidth
  } else if (windowWidth < 1024) {
    canvasDimension = 0.6*windowWidth
  } else {
    canvasDimension = 0.4*windowWidth
  }


  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = '#d4d4d4';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        setTimeout(() => drawStar(canvas, context), 5000 * 0);
        setTimeout(() => drawCircle(canvas, context), 5000 * 1);
        setTimeout(() => drawSegments(canvas, context), 5000 * 2);
        setTimeout(() => drawSmallCircle(canvas, context), 5000 * 3);
        setTimeout(() => splitLittleCircles(canvas, context), 5000 * 4);
        setTimeout(() => drawDiamondStars(canvas, context), 5000 * 5);
        
/*
          drawStar(canvas, context)
          drawCircle(canvas, context)
          drawSegments(canvas, context)
          drawSmallCircle(canvas, context)
          splitLittleCircles(canvas, context)
          drawDiamondStars(canvas, context)
          */
      }
    }
    
  }, []);

  return (
    <canvas ref={canvasRef} width={canvasDimension} height={canvasDimension}>

    </canvas>
  )
}


const drawStar = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const width = canvas.width;
  const height = canvas.height;

  const lines: Lines = [
    {
      moveTo: [0,height/2],
      lineTo: [width, height/2]
    },
    {
      moveTo: [width/2, 0],
      lineTo: [width/2, height]
    },
    {
      moveTo: [0, 0],
      lineTo: [width, height]
    },
    {
      moveTo: [0, height],
      lineTo: [width, 0]
    }
  ]

  drawLines(ctx, lines)
}

const drawCircle = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const width = canvas.width;
  const height = canvas.height;

  let startAngle = 0;
  const endAngle = 2 * Math.PI;
  const radius = width / 4;
  const x = width / 2;
  const y = height / 2;

  function drawArc() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, startAngle);
    ctx.stroke();

    startAngle += 0.01; // Change this value to adjust the speed of the animation

    if (startAngle < endAngle) {
      requestAnimationFrame(drawArc);
    }
  }

  drawArc();
}

const drawSegments = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const width = canvas.width;
  const height = canvas.height;

  const lines = [
    {
      moveTo: [width/4, height/2],
      lineTo: [width/2, height/4]
    },
    {
      moveTo: [width/2, height/4],
      lineTo: [3*width/4, height/2]
    },
    {
      moveTo: [3*width/4, height/2],
      lineTo: [width/2, 3*height/4]
    },
    {
      moveTo: [width/2, 3*height/4],
      lineTo: [width/4, height/2]
    },
  ]

  drawLines(ctx, lines)
}

const drawSmallCircle = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const width = canvas.width;
  const height = canvas.height;

  let startAngle = 0;
  const endAngle = 2 * Math.PI;
  const radius = width*Math.sqrt(2)/16;
  const x = 3*width/8;
  const y = 3*height/8;

  function drawArc() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, startAngle);
    ctx.stroke();

    startAngle += 0.01; // Change this value to adjust the speed of the animation

    if (startAngle < endAngle) {
      requestAnimationFrame(drawArc);
    }
  }

  drawArc();
}

const splitLittleCircles = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const width = canvas.width;
  const height = canvas.height;

  const centrePoints = [
    [3*width/8, 3*height/8],
    [5*width/8, 3*height/8],
    [3*width/8, 5*height/8],
    [5*width/8, 5*height/8],
  ]

  centrePoints.forEach(centre => {
    splitOneLittleCircle(ctx, centre[0], centre[1], width*Math.sqrt(2)/16)
  })
}

const splitOneLittleCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  const lines = [
    {
      moveTo: [x-r, y],
      lineTo: [x+r, y]
    },
    {
      moveTo: [x, y-r],
      lineTo: [x, y+r]
    }
  ]

  drawLines(ctx, lines)
}

const drawDiamondStars = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const width = canvas.width;
  const height = canvas.height;
  const r = width*Math.sqrt(2)/16;

  const coords1 = [
    [width/4, height/2],
    [width/2, height/4],
    [0,0]
  ]

  const x1 = 3*width/8;
  const y1 = 3*height/8;

  const lines1 = [
    {
      moveTo: coords1[0],
      lineTo: [x1-r, y1]
    },
    {
      moveTo: coords1[0],
      lineTo: [x1, y1+r]
    },
    {
      moveTo: coords1[1],
      lineTo: [x1+r, y1]
    },
    {
      moveTo: coords1[1],
      lineTo: [x1, y1-r]
    },
    {
      moveTo: coords1[2],
      lineTo: [x1-r, y1]
    },
    {
      moveTo: coords1[2],
      lineTo: [x1, y1-r]
    },
    {
      moveTo: [width/2, height/2],
      lineTo: [x1, y1+r]
    },
    {
      moveTo: [width/2, height/2],
      lineTo: [x1+r, y1]
    }
  ]

  const coords2=[
    [3*width/4, height/2],
    [width/2, height/4],
    [width,0]
  ]

  const x2 = 5*width/8;
  const y2 = 3*height/8;

  const lines2 = [
    {
      moveTo: coords2[0],
      lineTo: [x2+r, y2]
    },
    {
      moveTo: coords2[0],
      lineTo: [x2, y2+r]
    },
    {
      moveTo: coords2[1],
      lineTo: [x2-r, y2]
    },
    {
      moveTo: coords2[1],
      lineTo: [x2, y2-r]
    },
    {
      moveTo: coords2[2],
      lineTo: [x2+r, y2]
    },
    {
      moveTo: coords2[2],
      lineTo: [x2, y2-r]
    },
    {
      moveTo: [width/2, height/2],
      lineTo: [x2, y2+r]
    },
    {
      moveTo: [width/2, height/2],
      lineTo: [x2-r, y2]
    }
  ]

  const coords3=[
    [width/4, height/2],
    [width/2, 3*height/4],
    [0, height]
  ]

  const x3 = 3*width/8;
  const y3 = 5*height/8;

  const lines3 = [
    {
      moveTo: coords3[0],
      lineTo: [x3-r, y3]
    },
    {
      moveTo: coords3[0],
      lineTo: [x3, y3-r]
    },
    {
      moveTo: coords3[1],
      lineTo: [x3+r, y3]
    },
    {
      moveTo: coords3[1],
      lineTo: [x3, y3+r]
    },
    {
      moveTo: coords3[2],
      lineTo: [x3-r, y3]
    },
    {
      moveTo: coords3[2],
      lineTo: [x3, y3+r]
    },
    {
      moveTo: [width/2, height/2],
      lineTo: [x3, y3-r]
    },
    {
      moveTo: [width/2, height/2],
      lineTo: [x3+r, y3]
    }
  ]

  const coords4=[
    [3*width/4, height/2],
    [width/2, 3*height/4],
    [width, height]
  ]

  const x4 = 5*width/8;
  const y4 = 5*height/8;

  const lines4 = [
    {
      moveTo: coords4[0],
      lineTo: [x4+r, y4]
    },
    {
      moveTo: coords4[0],
      lineTo: [x4, y4-r]
    },
    {
      moveTo: coords4[1],
      lineTo: [x4-r, y4]
    },
    {
      moveTo: coords4[1],
      lineTo: [x4, y4+r]
    },
    {
      moveTo: coords4[2],
      lineTo: [x4+r, y4]
    },
    {
      moveTo: coords4[2],
      lineTo: [x4, y4+r]
    },
    {
      moveTo: [width/2, height/2],
      lineTo: [x4, y4-r]
    },
    {
      moveTo: [width/2, height/2],
      lineTo: [x4-r, y4]
    }
  ]

  const allLines = [
    lines1,
    lines2,
    lines3,
    lines4
  ]

  allLines.forEach(lines => {
    drawLines(ctx, lines)
  })
}

const drawLines = (ctx: CanvasRenderingContext2D, lineCoords: Lines) => {
  lineCoords.forEach(line => {
    /*
    ctx.moveTo(line.moveTo[0], line.moveTo[1])
    ctx.lineTo(line.lineTo[0], line.lineTo[1])
    ctx.stroke();
    */

    let progress = 0;
    const length = Math.sqrt(Math.pow(line.lineTo[0] - line.moveTo[0], 2) + Math.pow(line.lineTo[1] - line.moveTo[1], 2));
    const dx = (line.lineTo[0] - line.moveTo[0]) / length;
    const dy = (line.lineTo[1] - line.moveTo[1]) / length;

    function drawLine() {
      progress += 1;
      ctx.beginPath();
      ctx.moveTo(line.moveTo[0], line.moveTo[1]);
      ctx.lineTo(line.moveTo[0] + dx * progress, line.moveTo[1] + dy * progress);
      ctx.stroke();

      if (progress < length) {
        requestAnimationFrame(drawLine);
      }
    }

    drawLine();
  })
}