type RowObj = {
  whNumber: string;
  name: string;
  location: string;
  status: string;
  responsiblePerson: string;
  action: any;
  logisticAreaCode: string;
  description: string;
  plant: string;
  storageLocation: string;
  address: string;
  type: string;
  storageType: string;
  storageTypeDes: string;
  storageTypeRole: string;
  placementStrategy: string;
  removalStrategy: string;
  capacityCheck: string;
  weightCheck: string;
  hazardousIndicator: string;
  storageSection: string;
  storageSectionDes: string;
  sectionArea: string;
  sectionVolume: string;
  tempControl: string;
  storageBin: string;
  storageBinDes: string;
  binType: string;
  binCapacity: string;
  binWeightCapacity: string;
  binLength: string;
  binWidth: string;
  binHeight: string;
  occupancyStatus: string;
  binHazardousIndicator: string;
  configurationDate: string;
  lastUpdatedDate: string;
};

const tableWarehouses: RowObj[] = [
  {
    name: "Pen Avenue Warehouse",
    location: "Ojo, Lagos",
    whNumber: "WH2342",
    status: "Active",
    responsiblePerson: "Tobi Oladele",
    logisticAreaCode: "20",
    description: "Main warehouse at Ojo",
    plant: "P001",
    storageLocation: "SL001",
    address: "123 Warehouse Street, Lagos",
    type: "Central",
    storageType: "ST01",
    storageTypeDes: "High rack storage",
    storageTypeRole: "General",
    placementStrategy: "Fixed Bin",
    removalStrategy: "FEFO",
    capacityCheck: "YES",
    weightCheck: "YES",
    hazardousIndicator: "NO",
    storageSection: "SS01",
    storageSectionDes: "Fast moving items",
    sectionArea: "500 sq.m.",
    sectionVolume: "1,500 cu.m",
    tempControl: "NO",
    storageBin: "B001",
    storageBinDes: "Rack 1 Level 1",
    binType: "Standard",
    binCapacity: "100kg",
    binWeightCapacity: "200kg",
    binLength: "100cm",
    binWidth: "50cm",
    binHeight: "200cm",
    occupancyStatus: "Occupied",
    binHazardousIndicator: "NO",
    configurationDate: "20/06/2024",
    lastUpdatedDate: "20/06/2024",
    action: undefined
  },
  {
    name: "Raven Stores",
    location: "Ikeja, Lagos",
    whNumber: "WH2142",
    status: "Active",
    responsiblePerson: "John Doe",
    logisticAreaCode: "56",
    description: "Main warehouse at Ikeja",
    plant: "P002",
    storageLocation: "SL001",
    address: "123 Warehouse Street, Lagos",
    type: "Central",
    storageType: "ST01",
    storageTypeDes: "High rack storage",
    storageTypeRole: "General",
    placementStrategy: "Fixed Bin",
    removalStrategy: "FEFO",
    capacityCheck: "YES",
    weightCheck: "YES",
    hazardousIndicator: "NO",
    storageSection: "SS01",
    storageSectionDes: "Fast moving items",
    sectionArea: "700 sq.m.",
    sectionVolume: "1,800 cu.m",
    tempControl: "NO",
    storageBin: "B001",
    storageBinDes: "Rack 1 Level 1",
    binType: "Standard",
    binCapacity: "100kg",
    binWeightCapacity: "200kg",
    binLength: "100cm",
    binWidth: "50cm",
    binHeight: "200cm",
    occupancyStatus: "Occupied",
    binHazardousIndicator: "NO",
    configurationDate: "20/06/2024",
    lastUpdatedDate: "20/06/2024",
    action: undefined
  },
  {
    name: "Pen Stores",
    location: "Ikorodu, Lagos",
    whNumber: "WH2352",
    status: "Stale",
    responsiblePerson: "Mary Doe",
    logisticAreaCode: "21",
    description: "Main warehouse at Ikorodu",
    plant: "P003",
    storageLocation: "SL001",
    address: "123 Warehouse Street, Lagos",
    type: "Central",
    storageType: "ST01",
    storageTypeDes: "High rack storage",
    storageTypeRole: "General",
    placementStrategy: "Fixed Bin",
    removalStrategy: "FEFO",
    capacityCheck: "YES",
    weightCheck: "YES",
    hazardousIndicator: "NO",
    storageSection: "SS01",
    storageSectionDes: "Fast moving items",
    sectionArea: "500 sq.m.",
    sectionVolume: "2,000 cu.m",
    tempControl: "NO",
    storageBin: "B001",
    storageBinDes: "Rack 1 Level 1",
    binType: "Standard",
    binCapacity: "100kg",
    binWeightCapacity: "200kg",
    binLength: "100cm",
    binWidth: "50cm",
    binHeight: "200cm",
    occupancyStatus: "Occupied",
    binHazardousIndicator: "NO",
    configurationDate: "20/06/2024",
    lastUpdatedDate: "20/06/2024",
    action: undefined
  },
  {
    name: "Raven Stores",
    location: "Ikeja, Lagos",
    whNumber: "WH2842",
    status: "Active",
    responsiblePerson: "Emily Doe",
    logisticAreaCode: "12",
    description: "",
    plant: "P004",
    storageLocation: "",
    address: "",
    type: "",
    storageType: "",
    storageTypeDes: "",
    storageTypeRole: "",
    placementStrategy: "",
    removalStrategy: "",
    capacityCheck: "",
    weightCheck: "",
    hazardousIndicator: "",
    storageSection: "",
    storageSectionDes: "",
    sectionArea: "",
    sectionVolume: "",
    tempControl: "",
    storageBin: "",
    storageBinDes: "",
    binType: "",
    binCapacity: "",
    binWeightCapacity: "",
    binLength: "",
    binWidth: "",
    binHeight: "",
    occupancyStatus: "",
    binHazardousIndicator: "",
    configurationDate: "",
    lastUpdatedDate: "",
    action: undefined
  },
];

export default tableWarehouses;
