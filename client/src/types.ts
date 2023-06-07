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

export type BacklineClass = {
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