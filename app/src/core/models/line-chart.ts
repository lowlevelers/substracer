import { Annotation, EditableAnnotation } from '@visx/annotation';
import { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { PickD3Scale } from '@visx/scale';

export type AnnotationPosition = { x: number; y: number; dx: number; dy: number };

export type LineChartProvidedProps = {
  AnnotationComponent: typeof Annotation | typeof EditableAnnotation;
  anchorLinePosition?: 'auto' | 'all' | 'none';
  annotationPosition: AnnotationPosition;
  approxTooltipHeight: number;
  connectorType: 'line' | 'elbow';
  editLabelPosition: boolean;
  editSubjectPosition: boolean;
  getDate: (d: AppleStock) => number;
  getStockValue: (d: AppleStock) => number;
  horizontalAnchor?: 'start' | 'middle' | 'end';
  labelType: 'svg' | 'html';
  labelWidth: number;
  setAnnotationPosition: (position: AnnotationPosition) => void;
  showAnchorLine: boolean;
  subjectType: 'circle' | 'horizontal-line' | 'vertical-line';
  subtitle: string;
  title: string;
  verticalAnchor?: 'start' | 'middle' | 'end';
  xScale: PickD3Scale<'time', number>;
  yScale: PickD3Scale<'linear', number>;
};
