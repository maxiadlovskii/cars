export const car = {
  color: "red",
  fuelType: "Petrol",
  manufacturerName: "Audi",
  mileage: { number: 199736, unit: "km" },
  modelName: "S8",
  pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg",
  stockNumber: 10280,
};

export const colors = ["red", "white", "blue"];

export const manufacturers = [
  {
    name: "BMW",
    models: [
      { name: "1er" },
      { name: "2er" },
      { name: "3er" },
      { name: "4er" },
      { name: "5er" },
      { name: "6er" },
    ],
  },
  {
    name: "Mercedes",
    models: [
      { name: "1er" },
      { name: "2er" },
      { name: "3er" },
      { name: "4er" },
      { name: "5er" },
      { name: "6er" },
    ],
  },
];

export const responseMock = {
  data: {
    cars: [car, car, car, car],
  },
};

export const fetcher = (): Promise<any> => Promise.resolve(responseMock);
