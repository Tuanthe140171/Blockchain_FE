export const plugins = (strokeStyle = "#EEC909") => {
    return [
        {
            afterDraw: (chart: { tooltip?: any; scales?: any; ctx?: any }) => {
                // eslint-disable-next-line no-underscore-dangle
                if (chart.tooltip && chart.tooltip._active && chart.tooltip._active.length) {
                    // find coordinates of tooltip
                    const activePoint = chart.tooltip._active[0];
                    const { ctx } = chart;
                    const { x, y } = activePoint.element;
                    const topY = chart.scales.y.top;
                    const bottomY = chart.scales.y.bottom;
                    const topX = chart.scales.x.left;
                    const bottomX = chart.scales.x.right;

                    ctx.lineWidth = 1;
                    ctx.setLineDash([3, 3]);
                    ctx.strokeStyle = strokeStyle;

                    // draw vertical line
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.stroke();


                    // Draw horizontal line
                    ctx.beginPath();
                    ctx.moveTo(topX, y);
                    ctx.lineTo(bottomX, y);
                    ctx.stroke();

                    ctx.restore();
                }
            },
        },
    ];
}