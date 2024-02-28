import React, { memo } from 'react';
import Widget from './Widget';

type Locales =
  | 'en'
  | 'in'
  | 'de_DE'
  | 'fr'
  | 'es'
  | 'it'
  | 'pl'
  | 'sv_SE'
  | 'tr'
  | 'ru'
  | 'br'
  | 'id'
  | 'ms_MY'
  | 'th_TH'
  | 'vi_VN'
  | 'ja'
  | 'kr'
  | 'zh_CN'
  | 'zh_TW'
  | 'ar_AE'
  | 'he_IL';

type CopyrightStyles = {
  parent?: React.CSSProperties;
  link?: React.CSSProperties;
  span?: React.CSSProperties;
};

type DateRange = '1D' | '1M' | '3M' | '12M' | '60M' | 'ALL';

type ColorTheme = 'light' | 'dark';

export type MiniChartProps = {
  symbol?: string;
  width?: number | string;
  height?: number | string;
  locale?: Locales;
  dateRange?: DateRange;
  colorTheme?: ColorTheme;
  trendLineColor?: string;
  underLineColor?: string;
  underLineBottomColor?: string;
  isTransparent?: boolean;
  autosize?: boolean;
  largeChartUrl?: string;
  chartOnly?: boolean;
  noTimeScale?: boolean;

  children?: never;

  copyrightStyles?: CopyrightStyles;
};

const MiniChart: React.FC<MiniChartProps> = ({
  symbol = 'FX:EURUSD',
  width = 82,
  height = 32,
  locale = 'en',
  dateRange = '1M',
  colorTheme = 'dark',
  trendLineColor = 'rgba(41, 98, 255, 1)',
  underLineColor = 'rgba(41, 98, 255, 0.3)',
  underLineBottomColor = 'rgba(41, 98, 255, 0)',
  isTransparent = true,
  autosize = false,
  largeChartUrl = undefined,
  chartOnly = true,
  noTimeScale = true,
  copyrightStyles,
  ...props
}) => {
  return (
    <Widget
      scriptHTML={{
        symbol,
        ...(!autosize ? { width } : { width: '100%' }),
        ...(!autosize ? { height } : { height: '100%' }),
        locale,
        dateRange,
        colorTheme,
        isTransparent,
        autosize,
        largeChartUrl,
        chartOnly,
        noTimeScale,
        ...props,
      }}
      scriptSRC="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
      copyrightProps={{
        copyrightStyles,
        href: `https://www.tradingview.com/symbols/${symbol}/`,
        spanText: `${symbol} Rates`,
      }}
    />
  );
};

export default memo(MiniChart);
