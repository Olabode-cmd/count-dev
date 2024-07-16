type RowObj = {
  id: number;
  warehouse: string;
  itemName: string;
  batch: number;
  expectedQuantity: number;
  countedQuantity: number;
  variance: number;
  date: string;
};

const tableRecentStock: RowObj[] = [
	{
		id: 5632,
		warehouse: "Pen Avenue Warehouse",
		itemName: 'Smartphones',
		batch: 456876,
		expectedQuantity: 450,
		countedQuantity: 450,
		variance: 0,
		date: "23/06/2023"
	},
	{
		id: 5652,
		warehouse: "Raven Avenue Stores",
		itemName: 'Laptops',
		batch: 421876,
		expectedQuantity: 250,
		countedQuantity: 250,
		variance: 0,
		date: "24/06/2023"
	},
	{
		id: 5732,
		warehouse: "Mary Stores",
		itemName: 'Oil cans',
		batch: 456876,
		expectedQuantity: 450,
		countedQuantity: 450,
		variance: 0,
		date: "23/06/2023"
	},
	{
		id: 5692,
		warehouse: "Pen Avenue Warehouse",
		itemName: 'Smartphones',
		batch: 456816,
		expectedQuantity: 450,
		countedQuantity: 450,
		variance: 0,
		date: "23/06/2023"
	}
];

export default tableRecentStock;
