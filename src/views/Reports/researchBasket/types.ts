export interface TableHeader {
  name: string;
  csvKey: string;
}

export interface CumulativeBasketRequest {
  userId: string;
}

export interface DaywiseBasketRequest {
  userId: string;
  fromDate: string;
  toDate: string;
}

export interface CumulativeBasketRow {
  userId: string;
  researchId: number;
  basketName: string;
  buyLot: number;
  executedBuyQty: number;
  buyValue: number;
  sellLot: number;
  executedSellQty: number;
  sellValue: number;
  netQty: number;
  netValue: number;
}

export interface DaywiseBasketRow {
  userId: string;
  researchId: number;
  basketName: string;
  lotSize: number;
  executedDate: string;
  executedBuyQty: number;
  buyValue: number;
  executedSellQty: number;
  sellValue: number;
}

export interface CorporateActionRequest {
  symbol: string;
  token: string;
  exch: string;
  action: string;
  effectiveDate: string;
  ratio?: string;
  splitQty?: string;
}

export interface CorporateActionRecord {
  [key: string]: any;
  id: number;
  dateTime: string;
  symbol: string;
  action: string;
  ratio: string;
  splitQty: string;
  effectiveDate: string;
  updatedBy: string;
  reverted: number;
}

export interface BasketReportResponse<T> {
  status: string;
  message: string | null;
  result: T[] | string[];
}

export function distinctBasketNames(rows: any[] | null): string[] {
  const names = (rows || [])
    .map((r: any) => r.basketName)
    .filter((name: any) => name != null && name !== "");
  return [...new Set(names)].sort() as string[];
}
