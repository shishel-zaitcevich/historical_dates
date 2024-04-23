export interface DotData {
    number: string;
    title: string;
    x: number;
    y: number;
  }
  
  export interface DotProps {
    index: number;
    dot: DotData;
    dotRef: React.MutableRefObject<HTMLDivElement | null>;
    onClick: (index: number) => void;
  }