export type RoomClass = {
    _id: string;
    name: string;
    desc: string;
    pricePerHour: number;
    location: string;
    type: string;
    owner: string;
    backline: string[];

  };

export type Item = {
  name: string;
  slug: string;
  description?: string;
}
export type Content = {
    name: string;
    items: Item[];

};