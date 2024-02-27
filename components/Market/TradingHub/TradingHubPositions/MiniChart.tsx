import React, { useEffect } from 'react';

interface MiniChartProps {
  width: number;
  height: number;
  symbol: string;
  dateRange: string;
}

export const MiniChart = ({
  width,
  height,
  symbol,
  dateRange,
}: MiniChartProps) => {
  useEffect(() => {
    // This function creates the script tag with the TradingView widget code
    const createScript = () => {
      const script = document.createElement('script');
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: symbol,
        width: width,
        height: height,
        locale: 'en',
        dateRange: dateRange,
        colorTheme: 'dark',
        isTransparent: true,
        autosize: false,
        largeChartUrl: '',
        chartOnly: true,
        noTimeScale: true,
      });

      return script;
    };

    // Append the script to the container
    const widgetContainer = document.querySelector(
      '.tradingview-widget-container__widget'
    );
    const script = createScript();
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }

    // Clean up the script when the component unmounts
    return () => {
      if (widgetContainer) {
        widgetContainer.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        ></a>
      </div>
    </div>
  );
};
