export type RoomClass = {
    _id: string;
    name: string;
    desc: string;
    pricePerHour: number;
    location: string;
    type: string;
    owner: string;
    img: string;
    backline: string[];

  };
export type BookingClass = {
    _id: string;
    dateTo: string;
    duration: number;
    dateFrom: string;
    roomId: string;
    backline: Backline[];
}
export type Backline = {
  name: string;
  quantity: number;
  price: number;
export type BacklineClass = {
  id: any;
  _id: string;
  name: string;
  desc: string;
  quantity: number;
  price: number;
  img: string;
}

export type Item = {
  name: string;
  slug: string;
  description?: string;
}
export type Content = {
    name: string;
    items: Item[];

};