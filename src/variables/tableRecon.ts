type RowObj = {
  productId: string;
  itemDescription: string;
  uom: string;
  ctnsSize: string;
  costPrice: string;
  batchDetails: string;
  logisticsAreaCode: string;
  countedQuantity: number;
  stockPositionQty: number;
  variance: number;
  expiryDate: string;
  action: any;
};

const tableRecon: RowObj[] = [
  {
    productId: "FG-001",
    itemDescription: "EMGYL (METRONIDAZOLE) 400MG TABLETS (10*10)",
    uom: "Pack",
    ctnsSize: "100",
    costPrice: "45,000",
    countedQuantity: 445,
    stockPositionQty: 555,
    variance: 5,
    batchDetails: "BAT5564",
    logisticsAreaCode: "SL0001",
    expiryDate: "23/04/2024",
    action: undefined
  },
  {
    productId: "FG-041",
    itemDescription: "EMPRIN (ACETYL -SALICYLIC ACID) 75MG BLISTER TABLETS (10*10)",
    uom: "Bottle",
    ctnsSize: "100",
    costPrice: "85,000",
    countedQuantity: 545,
    stockPositionQty: 458,
    variance: 15,
    batchDetails: "BAT5598",
    logisticsAreaCode: "SL1129",
    expiryDate: "24/04/2024",
    action: undefined
  },
  {
    productId: "FG-041",
    itemDescription: "EMCILLIN (AMPICILLIN 125MG/5ML BP) SUSPENSION *100ML",
    uom: "Bottle",
    ctnsSize: "100",
    costPrice: "85,000",
    countedQuantity: 545,
    stockPositionQty: 458,
    variance: 15,
    batchDetails: "BAT5577",
    logisticsAreaCode: "SL6721",
    expiryDate: "24/04/2024",
    action: undefined
  },
  {
    productId: "FG-041",
    itemDescription: "EM-VIT-C (VITAMIN C 100MG) TABLETS WHITE * 1000",
    uom: "Bottle",
    ctnsSize: "100",
    costPrice: "85,000",
    countedQuantity: 545,
    stockPositionQty: 458,
    variance: 15,
    batchDetails: "BAT5514",
    logisticsAreaCode: "SL9951",
    expiryDate: "23/04/2024",
    action: undefined
  },
];

export default tableRecon;
