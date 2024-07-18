type RowObj = {
  id: string;
  type: string;
  dateRange: string;
  generatedBy: string;
  action: any;
};

const tableReport: RowObj[] = [
  {
    id: "REP001",
    type: "Inventory Accuracy",
    dateRange: "Apr 16 - May 16",
    generatedBy: "Mr Tobi Oladele",
    action: undefined,
  },
  {
    id: "REP002",
    type: "Variance Analysis",
    dateRange: "May 14 - Jun 16",
    generatedBy: "Mr Tobi Oladele",
    action: undefined,
  },
  {
    id: "REP003",
    type: "Ageing Accuracy",
    dateRange: "Apr 16 - May 16",
    generatedBy: "Mr Tobi Oladele",
    action: undefined,
  },
  {
    id: "REP004",
    type: "Inventory Accuracy",
    dateRange: "Apr 16 - May 16",
    generatedBy: "Mr Tobi Oladele",
    action: undefined,
  },
];

export default tableReport;